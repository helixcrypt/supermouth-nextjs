import { NextResponse } from 'next/server'
import { readCodes, start } from '@/lib/routine/engine'
import { recommend } from '@/lib/routine/recommend'

/**
 * Receives anonymous routine-interview events from the page and writes them to the SuperMouth
 * Supabase project with the server-only service key. Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Version 2 (page-run interview, habit = 'v2'): the page picks the Systems and adds them to the
 * cart, so the session records what went into the cart (expected_systems holds "code size" per
 * person) and emma_match stays empty. Version 1 sessions keep the old quality check: compare the
 * systems Emma named with the systems the tool picks for the same codes.
 */
export const dynamic = 'force-dynamic'

// set by the Supabase Vercel integration (either naming)
const URL_ = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const KINDS = new Set(['start', 'resume', 'question', 'answer', 'unparsed', 'side', 'restart', 'handoff', 'emma_reply', 'shopper_followup', 'fallback'])

const s = (v: unknown, n: number) => (typeof v === 'string' ? v.slice(0, n) : null)

async function sb(path: string, init: RequestInit & { prefer?: string } = {}) {
  return fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY!, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json',
      ...(init.prefer ? { Prefer: init.prefer } : {}),
    },
    cache: 'no-store',
  })
}

/** Short, distinctive parts of a system title that Emma is likely to say. */
function markers(title: string): string[] {
  const t = title.toLowerCase()
  const m: string[] = []
  if (/teething/.test(t)) m.push('teething')
  else if (/pregnancy/.test(t)) m.push('pregnancy')
  else if (/ortho/.test(t)) m.push('ortho')
  else if (/2 to 5/.test(t)) m.push('2 to 5')
  else if (/6 to 12/.test(t)) m.push('6 to 12')
  else if (/teens/.test(t)) m.push('teens')
  return m
}

export async function POST(req: Request) {
  if (!URL_ || !KEY) return NextResponse.json({ ok: false, error: 'logging not configured' }, { status: 503 })
  const body = await req.json().catch(() => null) as any
  const id = s(body?.session_id, 40)
  if (!id || !UUID.test(id)) return NextResponse.json({ ok: false }, { status: 400 })
  const events: any[] = Array.isArray(body?.events) ? body.events.slice(0, 50) : []
  const sess = body?.session && typeof body.session === 'object' ? body.session : {}

  // session row: create on start, then update counters and fields
  const row: Record<string, unknown> = { id, updated_at: new Date().toISOString() }
  if (sess.started) { row.source = s(sess.source, 40); row.device = s(sess.device, 10); row.page = s(sess.page, 200) }
  if (sess.completed) { row.completed = true; row.codes = s(sess.codes, 60); row.goal = s(sess.goal, 40); row.habit = s(sess.habit, 20) }
  await sb('routine_sessions?on_conflict=id', { method: 'POST', prefer: 'resolution=merge-duplicates', body: JSON.stringify(row) })

  const clean = events.filter(e => e && KINDS.has(e.kind)).map(e => ({
    session_id: id, kind: e.kind, step: s(e.step, 20), about: s(e.about, 40), value: s(e.value, 80),
    state: s(e.state, 200), ms: Number.isFinite(e.ms) ? Math.min(Math.max(0, Math.round(e.ms)), 86_400_000) : null,
    text: e.kind === 'emma_reply' ? s(e.text, 3000) : null,
  }))
  if (clean.length) await sb('routine_events', { method: 'POST', body: JSON.stringify(clean) })

  // counters and last step, recomputed from the events (cheap at this size)
  const r = await sb(`routine_events?session_id=eq.${id}&select=kind,step,text,value&order=at.asc`)
  const all: any[] = r.ok ? await r.json() : []
  const lastQ = [...all].reverse().find(e => e.kind === 'question')
  const upd: Record<string, unknown> = {
    last_step: lastQ?.step ?? null,
    answers: all.filter(e => e.kind === 'answer').length,
    side_questions: all.filter(e => e.kind === 'side').length,
    unparsed: all.filter(e => e.kind === 'unparsed').length,
    restarts: all.filter(e => e.kind === 'restart').length,
    followups: all.filter(e => e.kind === 'shopper_followup').length,
  }

  // version 2: what went into the cart, one "code size" per person
  const carted = all.filter(e => e.kind === 'answer' && e.step === 'cart').map(e => String(e.value || ''))
  if (carted.length) upd.expected_systems = carted

  // version 1 quality check on Emma's first reply after the handoff
  const firstReply = all.find(e => e.kind === 'emma_reply')?.text as string | undefined
  if (!carted.length && firstReply && clean.some(e => e.kind === 'emma_reply')) {
    const sr = await sb(`routine_sessions?id=eq.${id}&select=codes,emma_match`)
    const srow = sr.ok ? (await sr.json())[0] : null
    if (srow?.codes && srow.emma_match === null) {
      const st = start()
      st.members = readCodes(srow.codes).members
      st.step = 'done'
      try {
        const rec = await recommend(st)
        const expected = rec.people.map(p => p.system).filter(Boolean) as string[]
        const text = firstReply.toLowerCase()
        const named = expected.map(t => markers(t).every(m => text.includes(m)) && /fluoride|ortho|teething|pregnancy/.test(text))
        upd.expected_systems = expected
        upd.emma_named = named
        upd.emma_match = named.length > 0 && named.every(Boolean)
      } catch { /* leave the check empty */ }
    }
  }
  await sb(`routine_sessions?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(upd) })
  return NextResponse.json({ ok: true })
}
