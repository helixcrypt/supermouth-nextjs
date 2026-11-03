import { NextResponse } from 'next/server'
import { record, codeFor, question, State } from '@/lib/routine/engine'
import { replay, applyDeclines, toList } from '@/lib/routine/replay'
import { recommend } from '@/lib/routine/recommend'

/**
 * Emma routine interview: MCP server (JSON-RPC over HTTP POST).
 * Auth: Authorization: Bearer <ROUTINE_MCP_TOKEN>. With no token configured, every call is refused.
 * Stateless: Quincer does not keep tool results between turns, so Emma sends the shopper's
 * interview answers so far on every call and the server replays them. Nothing is stored.
 */

export const dynamic = 'force-dynamic'

const COMMON = {
  answers: {
    type: 'array', items: { type: 'string' },
    description: "Every reply the shopper has given to routine questions since the interview began, in order, exactly as they tapped or typed it (for example [\"Just me\", \"Neither\", \"Fluoride\"]). Empty at the start. Leave out side questions.",
  },
  mode: { type: 'string', enum: ['full', 'short'], description: 'short if the shopper wanted it quick from the start.' },
  short_after: { type: 'integer', description: 'If the shopper asked to speed up partway, how many answers had been given at that moment.' },
  routine_code: { type: 'string', description: 'Routine code(s) the shopper gave instead of answering questions, e.g. "AFM KNS".' },
  channel: { type: 'string', enum: ['web', 'phone', 'portal'] },
  referred_by_office: { type: 'boolean', description: 'true only when a dental office referred the shopper.' },
}

const TOOLS = [
  {
    name: 'routine_interview',
    description: 'The routine interview. Call it once per turn while the interview is running: send all the shopper\'s interview answers so far, and it returns the one question to ask now with its buttons. Call with an empty answers list when the shopper taps Build my routine, or with routine_code when they give a code.',
    inputSchema: { type: 'object', properties: COMMON },
  },
  {
    name: 'routine_recommend',
    description: "When routine_interview returns step done: one system per person with product links, add-ons, family-wide discounts and presentation rules. If the shopper says no to a person's system after you answered the objection, call again with that person added to declined; it returns the next smaller system, or limit_reached.",
    inputSchema: {
      type: 'object',
      properties: {
        ...COMMON,
        declined: { type: 'array', items: { type: 'string' }, description: 'One entry per "no" the shopper gave to a person\'s system, naming the person as in the record (e.g. "you", "child 2"). Repeat a person for a second no.' },
      },
    },
  },
]

const RULE = 'Ask only this question, in your own words, then stop and wait for the reply. The choices appear as buttons. On the next turn call routine_interview once with all answers including the new one.'

function view(st: State, r: ReturnType<typeof replay>) {
  const q = question(st)
  const done = q.step === 'r' || q.step === 'done'
  const rec = record(st)
  return {
    ok: true,
    step: q.step,
    about: q.about,
    ask: q.ask,
    buttons: q.choices,
    typed_answer: q.typed || undefined,
    note: q.note,
    record: done ? rec : rec.map(({ code, ...rest }) => rest),
    routine_codes: done ? st.members.map(codeFor).filter(Boolean).join(' ') : undefined,
    answers_applied: r.applied.length ? r.applied : undefined,
    skipped_answers: r.skipped.length ? r.skipped : undefined,
    last_answer_problem: r.lastRejected,
    from_code: r.fromCode || undefined,
    code_errors: r.codeErrors,
    rule: q.step === 'done' ? 'The interview is complete. Call routine_recommend with the same answers.' : RULE,
  }
}

async function callTool(name: string, args: any) {
  switch (name) {
    case 'routine_interview': {
      const r = replay(args)
      if (args?.routine_code && !r.fromCode) {
        return { ...view(r.st, r), ok: false, error: `That code could not be read (${(r.codeErrors || []).join('; ')}). Say so kindly and offer to build the routine instead.` }
      }
      return view(r.st, r)
    }
    case 'routine_recommend': {
      const r = replay(args)
      const q = question(r.st)
      if (q.step !== 'done' && q.step !== 'r') {
        return { ...view(r.st, r), not_ready: true, instruction: 'The interview is not finished. Do not recommend products yet; ask the current question.' }
      }
      const d = applyDeclines(r.st, args?.declined)
      const rec = await recommend(r.st)
      return { ok: true, routine_codes: r.st.members.map(codeFor).filter(Boolean).join(' '), declines_applied: d.applied, declines_not_matched: d.unknown.length ? d.unknown : undefined, ...rec }
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
  if (msg?.method === 'tools/call') {
    // TEMP: which identity headers Quincer sends (values only for id-like, non-secret headers)
    const hs: Record<string, string> = {}
    req.headers.forEach((v, k) => { if (!/^(x-vercel|x-forwarded|x-real-ip|accept|connection|content-|host|forwarded|sec-|user-agent|x-matched|x-invocation|authorization)/i.test(k)) hs[k] = /token|secret|key|auth/i.test(k) ? '*' : v.slice(0, 80) })
    console.log(JSON.stringify({ routine_headers: hs, meta: msg.params?._meta ?? null }))
  }
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return rpc(msg?.id ?? null, undefined, { code: -32600, message: 'Invalid request' })
  if (msg.id === undefined) return new NextResponse(null, { status: 202 })    // notification
  switch (msg.method) {
    case 'initialize':
      return rpc(msg.id, {
        protocolVersion: msg.params?.protocolVersion || '2025-03-26',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'supermouth-routine', version: '2.0.0' },
        instructions: 'Routine interview for SuperMouth. Each turn, call routine_interview once with all of the shopper\'s interview answers so far. When step is done, call routine_recommend.',
      })
    case 'ping':
      return rpc(msg.id, {})
    case 'tools/list':
      return rpc(msg.id, { tools: TOOLS })
    case 'tools/call':
      try {
        const args = msg.params?.arguments || {}
        const out: any = await callTool(msg.params?.name, args)
        // log shape only: tool, number of answers, step and problems; never the shopper's words
        console.log(JSON.stringify({ routine: msg.params?.name, answers: toList(args.answers).length, code: !!args.routine_code, declined: toList(args.declined).length || undefined, step: out.step ?? null, ok: out.ok, skipped: out.skipped_answers?.length || undefined, problem: out.last_answer_problem ?? out.error ?? null }))
        // TEMP (shadow-site testing only, remove before supermouth.com): rejected answers, truncated
        if (out.skipped_answers?.length) console.log(JSON.stringify({ routine_debug_skipped: out.skipped_answers.map((s: string) => s.slice(0, 40)), answers_tail: toList(args.answers).slice(-4).map((s: string) => s.slice(0, 40)) }))
        return rpc(msg.id, { content: [{ type: 'text', text: JSON.stringify(out) }], isError: false })
      } catch (e: any) {
        if (e?.code === -32601) return rpc(msg.id, undefined, { code: -32602, message: e.message })
        console.log(JSON.stringify({ routine_error: String(e?.message || e).slice(0, 200) }))
        return rpc(msg.id, { content: [{ type: 'text', text: JSON.stringify({ ok: false, error: 'Tool failed. Continue the conversation without it and offer the shop links.' }) }], isError: true })
      }
    default:
      return rpc(msg.id, undefined, { code: -32601, message: 'Method not found' })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Use POST (MCP JSON-RPC).' }, { status: 405 })
}
