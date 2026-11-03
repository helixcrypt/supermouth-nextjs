import { NextResponse } from 'next/server'
import { start, decode, encode, answer, question, setMode, record, readCodes, codeFor, label, State } from '@/lib/routine/engine'
import { recommend, stepDown } from '@/lib/routine/recommend'

/**
 * Emma routine interview: MCP server (JSON-RPC over HTTP POST).
 * Auth: Authorization: Bearer <ROUTINE_MCP_TOKEN>. With no token configured, every call is refused.
 * Stateless: the interview travels in the `state` string; nothing about the shopper is stored.
 */

export const dynamic = 'force-dynamic'

const STATE_RULE = 'Pass state back exactly as given on your next routine call. Ask the question in your own words and show the buttons as tap choices (at most 3). Do not skip or reorder questions.'

const TOOLS = [
  {
    name: 'interview_start',
    description: 'Start the routine interview when the shopper taps Build my routine, or give a routine code to skip the questions. Returns the first question, its buttons and a state string.',
    inputSchema: {
      type: 'object',
      properties: {
        routine_code: { type: 'string', description: 'Routine code(s) the shopper gave, e.g. "AFM KNS". Omit to start a new interview.' },
        mode: { type: 'string', enum: ['full', 'short'], description: 'short when the shopper wants it quick.' },
        channel: { type: 'string', enum: ['web', 'phone', 'portal'] },
        referred_by_office: { type: 'boolean', description: 'true only when a dental office referred the shopper.' },
      },
    },
  },
  {
    name: 'interview_next',
    description: "Send the shopper's answer to the current question (the button label, a number, or their words). Returns the next question and buttons, or step done. Answer side questions yourself first, then repeat the current question.",
    inputSchema: {
      type: 'object',
      required: ['state', 'answer'],
      properties: {
        state: { type: 'string' },
        answer: { type: 'string' },
        goal: { type: 'string', description: "Optional: the shopper's goal in their words if they mention one at any point." },
      },
    },
  },
  {
    name: 'interview_mode',
    description: 'Switch to the short flow (the shopper is in a hurry or says "just send me something"), or back to full.',
    inputSchema: { type: 'object', required: ['state', 'mode'], properties: { state: { type: 'string' }, mode: { type: 'string', enum: ['short', 'full'] } } },
  },
  {
    name: 'recommend',
    description: 'After step done: one system per person with product links, add-ons, family-wide discounts and the rules for presenting them.',
    inputSchema: { type: 'object', required: ['state'], properties: { state: { type: 'string' } } },
  },
  {
    name: 'step_down',
    description: "When a shopper still says no to one person's system after you answered the objection: returns the next smaller system for that person, or limit_reached. At most 2 per person.",
    inputSchema: {
      type: 'object', required: ['state', 'person'],
      properties: { state: { type: 'string' }, person: { type: 'string', description: 'Who, as shown in the record (e.g. "you", "child 2") or a number starting at 1.' } },
    },
  },
]

function view(st: State, extra: Record<string, unknown> = {}) {
  const q = question(st)
  const codes = st.members.map(codeFor).filter(Boolean)
  return {
    state: encode(st),
    step: q.step,
    about: q.about,
    ask: q.ask,
    buttons: q.choices,
    typed_answer: q.typed || undefined,
    note: q.note,
    record: record(st),
    routine_codes: q.step === 'r' || q.step === 'done' ? codes.join(' ') : undefined,
    rule: STATE_RULE,
    ...extra,
  }
}

function loadState(args: any): State | { error: string } {
  const st = decode(String(args?.state ?? ''))
  return st || { error: 'state is missing or was changed. Use the exact state string from your last routine call. If it is lost, call interview_start again.' }
}

async function callTool(name: string, args: any) {
  switch (name) {
    case 'interview_start': {
      const st = start({ channel: args?.channel, office: !!args?.referred_by_office, mode: args?.mode })
      if (args?.routine_code) {
        const { members, errors } = readCodes(args.routine_code)
        if (!members.length) return { ok: false, error: `That code could not be read (${errors.join('; ')}). Say so kindly and offer to build the routine instead.`, ...view(st) }
        st.members = members
        st.goal = st.goal || ''
        st.habit = 's'
        st.step = 'r'
        return { ok: true, from_code: true, code_errors: errors.length ? errors : undefined, ...view(st), ask: 'Confirm the routine in plain words from the record, then ask if it is still right. If they say yes, call interview_next with "That\'s right" and then recommend.' }
      }
      return { ok: true, ...view(st) }
    }
    case 'interview_next': {
      const st = loadState(args)
      if ('error' in st) return { ok: false, error: st.error }
      const r = answer(st, args?.answer, args?.goal)
      return { ok: r.ok, error: r.error, ...view(r.state), note: r.question.note ?? view(r.state).note }
    }
    case 'interview_mode': {
      const st = loadState(args)
      if ('error' in st) return { ok: false, error: st.error }
      return { ok: true, ...view(setMode(st, String(args?.mode))) }
    }
    case 'recommend': {
      const st = loadState(args)
      if ('error' in st) return { ok: false, error: st.error }
      if (st.step !== 'done' && st.step !== 'r') return { ok: false, error: 'The interview is not finished. Continue with the current question.', ...view(st) }
      const rec = await recommend(st)
      return { ok: true, state: encode(st), routine_codes: st.members.map(codeFor).filter(Boolean).join(' '), ...rec }
    }
    case 'step_down': {
      const st = loadState(args)
      if ('error' in st) return { ok: false, error: st.error }
      const who = String(args?.person ?? '').toLowerCase().trim()
      let idx = st.members.findIndex((_, i) => label(st, i) === who)
      if (idx < 0 && /^\d+$/.test(who)) idx = Number(who) - 1
      if (idx < 0 && /^(me|i|myself)$/.test(who)) idx = st.members.findIndex(m => m.role === 'M')
      if (idx < 0 || !st.members[idx]) return { ok: false, error: 'Could not tell which person.', record: record(st), state: encode(st) }
      const r = await stepDown(st, idx)
      return { ...r, state: encode(st) }
    }
  }
  throw Object.assign(new Error(`Unknown tool: ${name}`), { code: -32601 })
}

function rpc(id: unknown, result?: unknown, error?: { code: number; message: string }) {
  return NextResponse.json(error ? { jsonrpc: '2.0', id, error } : { jsonrpc: '2.0', id, result })
}

function authorized(req: Request) {
  const token = process.env.ROUTINE_MCP_TOKEN
  if (!token) return false
  return req.headers.get('authorization') === `Bearer ${token}`
}

export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const msg = await req.json().catch(() => null) as any
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return rpc(msg?.id ?? null, undefined, { code: -32600, message: 'Invalid request' })
  if (msg.id === undefined) return new NextResponse(null, { status: 202 })    // notification
  switch (msg.method) {
    case 'initialize':
      return rpc(msg.id, {
        protocolVersion: msg.params?.protocolVersion || '2025-03-26',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'supermouth-routine', version: '1.0.0' },
        instructions: 'Routine interview for SuperMouth. Call interview_start, then interview_next with each answer, passing state back unchanged. When step is done, call recommend.',
      })
    case 'ping':
      return rpc(msg.id, {})
    case 'tools/list':
      return rpc(msg.id, { tools: TOOLS })
    case 'tools/call':
      try {
        const args = msg.params?.arguments || {}
        const out = await callTool(msg.params?.name, args)
        // log shape only: tool, steps and errors, never the shopper's words
        console.log(JSON.stringify({ routine: msg.params?.name, in_step: decode(String(args.state ?? ''))?.step ?? (args.state ? 'BAD_STATE' : null), out_step: (out as any).step ?? null, ok: (out as any).ok, error: (out as any).error ?? null, answer_len: typeof args.answer === 'string' ? args.answer.length : null }))
        return rpc(msg.id, { content: [{ type: 'text', text: JSON.stringify(out) }], isError: (out as any).ok === false })
      } catch (e: any) {
        if (e?.code === -32601) return rpc(msg.id, undefined, { code: -32602, message: e.message })
        return rpc(msg.id, { content: [{ type: 'text', text: JSON.stringify({ ok: false, error: 'Tool failed. Continue the conversation without it and offer the shop links.' }) }], isError: true })
      }
    default:
      return rpc(msg.id, undefined, { code: -32601, message: 'Method not found' })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Use POST (MCP JSON-RPC).' }, { status: 405 })
}
