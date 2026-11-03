import { start, answer, setMode, readCodes, question, State, Member, label } from './engine'

/**
 * Quincer does not keep tool results between turns, so each turn Emma sends every
 * answer the shopper has given in the interview so far. We replay them from the start.
 * Answers that do not fit the question they land on (side questions, chit-chat) are skipped.
 */
export interface ReplayInput {
  answers?: unknown
  mode?: unknown
  short_after?: unknown
  routine_code?: unknown
  channel?: unknown
  referred_by_office?: unknown
}

export interface ReplayResult {
  st: State
  skipped: string[]
  applied: string[]
  lastRejected?: string
  codeErrors?: string[]
  fromCode: boolean
}

export function toList(a: unknown): string[] {
  if (Array.isArray(a)) return a.map(x => String(x ?? '').trim()).filter(Boolean).slice(0, 60)
  if (typeof a === 'string' && a.trim()) {
    try { const j = JSON.parse(a); if (Array.isArray(j)) return toList(j) } catch { /* plain text */ }
    return a.split(/\n|\|/).map(s => s.trim()).filter(Boolean).slice(0, 60)
  }
  return []
}

export function replay(input: ReplayInput): ReplayResult {
  const answers = toList(input.answers)
  const shortAfter = input.short_after === undefined || input.short_after === null || input.short_after === '' ? null : Number(input.short_after)
  const mode = String(input.mode ?? '') === 'short' && shortAfter === null ? 'short' : 'full'
  let st = start({ channel: String(input.channel ?? 'web'), office: input.referred_by_office === true || input.referred_by_office === 'true', mode })
  let fromCode = false
  let codeErrors: string[] | undefined

  const code = String(input.routine_code ?? '').trim()
  if (code) {
    const { members, errors } = readCodes(code)
    codeErrors = errors.length ? errors : undefined
    if (members.length) {
      st.members = members
      st.habit = 's'
      st.goal = st.goal || ''
      st.step = 'r'
      fromCode = true
    }
  }

  const skipped: string[] = []
  const applied: string[] = []
  let lastRejected: string | undefined
  answers.forEach((a, n) => {
    if (shortAfter !== null && n === shortAfter && st.mode !== 'S') st = setMode(st, 'short')
    if (st.step === 'done') return
    // a question back to Emma is a side question, not an answer (unless it is exactly a button label)
    const exact = question(st).choices.some(c => c.toLowerCase() === a.toLowerCase())
    if (!exact && /\?\s*$/.test(a)) { skipped.push(a); return }
    const before = question(st)
    const r = answer(st, a)
    if (r.ok) { st = r.state; lastRejected = undefined; applied.push(`${before.about ? before.about + ': ' : ''}${before.ask.slice(0, 50)} => ${a.slice(0, 40)}`) }
    else { skipped.push(a); lastRejected = r.error }
  })
  if (shortAfter !== null && answers.length <= shortAfter && String(input.mode) === 'short' && st.mode !== 'S') st = setMode(st, 'short')
  return { st, skipped, applied, lastRejected, codeErrors, fromCode }
}

/** Apply the shopper's "no" to systems: each entry names a person (as in the record, or a number). */
export function applyDeclines(st: State, declined: unknown): { applied: Record<string, number>; unknown: string[] } {
  const list = toList(declined)
  const applied: Record<string, number> = {}
  const unknown: string[] = []
  for (const raw of list) {
    const who = raw.toLowerCase().trim()
    let idx = st.members.findIndex((_, i) => label(st, i) === who)
    if (idx < 0 && /^\d+$/.test(who)) idx = Number(who) - 1
    if (idx < 0 && /^(me|i|myself|mine)$/.test(who)) idx = st.members.findIndex((m: Member) => m.role === 'M')
    if (idx < 0 && /partner|spouse|wife|husband/.test(who)) idx = st.members.findIndex((m: Member) => m.role === 'T')
    if (idx < 0 || !st.members[idx]) { unknown.push(raw); continue }
    st.members[idx].tier += 1
    applied[label(st, idx)] = st.members[idx].tier
  }
  return { applied, unknown }
}

export { question }
