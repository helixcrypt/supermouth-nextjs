'use client'

/**
 * Anonymous logging of Emma's routine interview, for testing, quality control and insight.
 * One random session id per interview (no name, email or IP). Events are queued and sent in
 * small batches to /api/routine-log, which writes them to the SuperMouth Supabase project.
 * Typed text is never logged except as the parsed choice; side questions are counted, not stored.
 */

type Ev = { kind: string; step?: string; about?: string; value?: string; state?: string; ms?: number; text?: string }

let sessionId: string | null = null
let queue: Ev[] = []
let lastAt = 0
let timer: ReturnType<typeof setTimeout> | null = null
let emmaRepliesToLog = 0
let session: Record<string, unknown> = {}

const KEY = 'sm_routine_log_session'

function uuid(): string {
  try { return crypto.randomUUID() } catch { return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16) }) }
}

function flush(useBeacon = false) {
  if (!sessionId || (!queue.length && !Object.keys(session).length)) return
  const body = JSON.stringify({ session_id: sessionId, session, events: queue })
  queue = []
  session = {}
  try {
    if (useBeacon && navigator.sendBeacon) navigator.sendBeacon('/api/routine-log', new Blob([body], { type: 'application/json' }))
    else fetch('/api/routine-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
  } catch { /* logging must never break the chat */ }
}

function schedule() {
  if (timer) return
  timer = setTimeout(() => { timer = null; flush() }, 1500)
}

if (typeof window !== 'undefined') {
  window.addEventListener('pagehide', () => flush(true))
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(true) })
}

export function logStart(source: string) {
  sessionId = uuid()
  try { sessionStorage.setItem(KEY, sessionId) } catch { /* ignore */ }
  lastAt = Date.now()
  session = { started: true, source, device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop', page: location.pathname }
  queue.push({ kind: 'start', value: source })
  schedule()
}

/** After a reload, keep logging into the same session. */
export function logResume() {
  try { sessionId = sessionStorage.getItem(KEY) } catch { sessionId = null }
  if (!sessionId) return
  lastAt = Date.now()
  queue.push({ kind: 'resume' })
  schedule()
}

export function logEvent(e: Ev) {
  if (!sessionId) return
  const now = Date.now()
  queue.push({ ...e, ms: e.ms ?? (lastAt ? now - lastAt : undefined) })
  lastAt = now
  schedule()
}

/** Interview finished: record the codes and watch Emma's next replies for the quality check. */
export function logHandoff(codes: string, goal: string, habit: string, state: string) {
  if (!sessionId) return
  session = { ...session, completed: true, codes, goal, habit }
  logEvent({ kind: 'handoff', value: codes, state })
  emmaRepliesToLog = 4
  flush()
}

/** Called after each Emma reply; logs her text for a few replies after the handoff. */
export function logEmmaReply(text: string) {
  if (!sessionId || emmaRepliesToLog <= 0) return
  emmaRepliesToLog--
  logEvent({ kind: 'emma_reply', text: text.slice(0, 3000) })
  flush()
}

/** The shopper sent Emma a message after the handoff (counted, not stored). */
export function logShopperFollowup() {
  if (!sessionId || emmaRepliesToLog <= 0) return
  logEvent({ kind: 'shopper_followup' })
}
