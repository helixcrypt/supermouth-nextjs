'use client'

/**
 * Page-run routine interview, shown inside Emma's chat window.
 *
 * Why: inside Quincer, the model does not reliably call the routine tool on every turn of a
 * 15-question interview, and it only sees the last ~10 messages. So the page asks the
 * questions itself, in Emma's bubble style with tap buttons, using the same engine as the tool
 * (lib/routine/engine.ts). Nothing goes to Quincer during the questions. When the shopper
 * confirms the recap, the page sends Emma one message with the routine codes, and Emma takes
 * over for recommendations, objections and step-downs.
 *
 * Side questions typed during the interview go to Emma as normal; the current question is
 * asked again after she answers. Progress is kept in sessionStorage so a reload resumes.
 */

import { start, answer, question, record, codeFor, encode, decode, readCodes, GOALS, State, Member, label } from './routine/engine'
import { logStart, logResume, logEvent, logHandoff, logShopperFollowup } from './routine-log-client'
import { showRoutineCards, resetRoutineCards } from './routine-cards-client'

const KEY = 'sm_routine_local_v1'
const START_TEXT = /^\s*(build my routine|find my routine|find my oral care routine)\s*[.!]*\s*$/i
const QUESTIONISH = /\?\s*$|^(what|how|why|is|are|can|could|does|do|should|which|where|when|will|would)\b/i

let active: State | null = null
let resumeAfterEmma = false
let codeEntry = false              // waiting for the shopper to type a routine code
let postHandoffReplies = 0         // Emma replies after a handoff that get our buttons
let handoffPeople: string[] = []   // the people in the last confirmed routine, for "which one?" buttons
let handoffCodes = ''              // the routine codes sent at the handoff, for the product cards
export const inPostHandoff = () => postHandoffReplies > 0

const CODE_ASK_TEXT = /^\s*i have a routine code\s*[.!]*\s*$/i
// Quincer's generic reply when a turn fails
const FALLBACK = /^(i'd be happy to help you with that\. could you tell me a bit more about what you need\?|happy to keep helping\W+is there anything else i can do for you\?)\s*$/i
// Quincer's own suggestions that push a smaller system before any objection
const UNWANTED_CHIP = /cheaper|cheapest|lower price|budget option|compare these/i
const AFTER_RECOMMEND: [string, string][] = [
  ['Looks good', 'Looks good, thanks!'],
  ['Something is too much', 'One of these systems is too much for us.'],
  ['I have a question', 'I have a question.'],
]

/** Marks a side question sent to Emma mid-interview; the page hides it in the shopper's bubble. */
export const SIDE_MARK = '(Side question during my routine) '
function askEmmaSide(text: string) {
  if (active) logEvent({ kind: 'side', step: question(active).step })
  resumeAfterEmma = true
  removeChips()
  w().ChatWidget?.open?.(SIDE_MARK + text)
}

/** Hide the side-question mark in the shopper's bubbles. */
export function hideSideMarks(root: Element) {
  root.querySelectorAll('.cw-msg-user').forEach(u => {
    const t = u.firstChild
    if (t && t.nodeType === 3 && t.nodeValue && t.nodeValue.startsWith(SIDE_MARK)) t.nodeValue = t.nodeValue.slice(SIDE_MARK.length)
  })
}

const w = () => window as any
const box = () => document.querySelector('.cw-messages')

export const isLocalInterviewActive = () => !!active

function save() {
  try {
    if (active) sessionStorage.setItem(KEY, encode(active))
    else sessionStorage.removeItem(KEY)
  } catch { /* storage blocked: progress just won't survive a reload */ }
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

/** Plain text with **bold** and line breaks, escaped. */
function fmt(s: string) {
  return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')
}

function scrollEnd(el: Element) {
  try { el.scrollIntoView({ block: 'end', behavior: 'smooth' }) } catch { /* ignore */ }
}

function removeChips() {
  box()?.querySelectorAll('.cw-reply-chips').forEach(n => n.remove())
}

function addBot(text: string) {
  const b = box()
  if (!b) return
  removeChips()
  if (!b.querySelector('.cw-msg-persona')) {
    const p = document.createElement('div')
    p.className = 'cw-msg-persona'
    p.textContent = 'Emma'
    b.appendChild(p)
  }
  const d = document.createElement('div')
  d.className = 'cw-msg cw-msg-bot sm-local'
  const ref = b.querySelector('.cw-msg-bot[style]') as HTMLElement | null
  if (ref) d.setAttribute('style', ref.getAttribute('style') || '')
  d.innerHTML = fmt(text)
  b.appendChild(d)
  scrollEnd(d)
}

function addUser(text: string) {
  const b = box()
  if (!b) return
  removeChips()
  const d = document.createElement('div')
  d.className = 'cw-msg cw-msg-user sm-local'
  d.textContent = text
  b.appendChild(d)
  scrollEnd(d)
}

function showChips(labels: string[], onPick: (label: string) => void = l => handle(l, true)) {
  const b = box()
  if (!b || !labels.length) return
  removeChips()
  const wrap = document.createElement('div')
  wrap.className = 'cw-slot-chips cw-reply-chips sm-routine-chips'
  const row = document.createElement('div')
  row.className = 'cw-slot-chips-row'
  for (const l of labels) {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'cw-slot-chip'
    btn.textContent = l
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      if (btn.getAttribute('disabled')) return
      wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
      onPick(l)
    })
    row.appendChild(btn)
  }
  wrap.appendChild(row)
  b.appendChild(wrap)
  scrollEnd(wrap)
}

// ---------- shopper-facing wording ----------

const FLAVOR: Record<string, string> = { M: 'Mint', S: 'Strawberry', C: 'Chocolate', V: 'Vanilla', X: 'no flavor preference' }
const STAGE: Record<string, string> = { B: 'baby or toddler', L: 'little kid (2 to 5)', K: 'big kid (6 to 12)', A: 'teen or adult', P: 'pregnant' }
const FORMULA: Record<string, string> = { F: 'fluoride', N: 'fluoride-free', O: 'ortho formula (contains fluoride)' }

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }

function suggestion(st: State, m: Member): string {
  const who = label(st, st.idx)
  if (m.formula === 'u') return 'Both work well. Fluoride helps prevent cavities; the fluoride-free system supports enamel remineralization with nano-hydroxyapatite. Which would you like?'
  if (m.bracket === 'P' && m.braces === 'b') return "Congratulations! For pregnancy I'd suggest the SuperMouth pregnancy system. It's fluoride-free and built around nano-hydroxyapatite, which helps remineralize and strengthen enamel. For your braces, I'd add the OrthoBrush and the ortho mouth spray. The ortho system is the other option; it contains fluoride. Which sounds right?"
  if (m.bracket === 'P') return "Congratulations! For pregnancy I'd suggest the SuperMouth pregnancy system. It's fluoride-free and built around nano-hydroxyapatite, which helps remineralize and strengthen enamel, and many expecting moms like keeping ingredients simple right now. If you'd rather stay with fluoride, that's a fine choice too. Which sounds right?"
  const forWho = who === 'you' ? '' : ` for ${who}`
  if (m.formula === 'f') return `With a few cavities in the last couple of years, fluoride is the usual choice${forWho}, since it helps prevent cavities. The fluoride-free system is also an option. Which sounds right?`
  return `That history is good, so the fluoride-free system is a great fit${forWho}. It supports enamel remineralization with nano-hydroxyapatite. Fluoride works well too. Which would you like?`
}

function recap(st: State): string {
  const rec = record(st)
  const lines = rec.map((r, i) => {
    const m = st.members[i]
    const parts = [STAGE[m.bracket] || r.stage, m.braces === 'b' ? 'braces or aligners' : '', FORMULA[m.formula] || r.formula, FLAVOR[m.flavor] || r.flavor, m.floss === 'R' ? 'flossers' : m.floss === 'L' ? 'floss' : ''].filter(Boolean)
    return `• ${cap(r.person)}: ${parts.join(', ')} (**${codeFor(m)}**)`
  })
  const codes = st.members.map(codeFor).filter(Boolean).join(' ')
  return `Here's what I have:\n${lines.join('\n')}\n\nYour routine code${st.members.length > 1 ? 's' : ''}: **${codes}**. Write ${st.members.length > 1 ? 'them' : 'it'} down or take a screenshot, and next time I can skip the questions.\n\nDoes that look right?`
}

function textFor(st: State): string {
  const q = question(st)
  const m = st.members[st.idx]
  switch (q.step) {
    case 'g': return suggestion(st, m)
    case 'oc': return "The ortho formula contains fluoride, and it's designed to help prevent decalcification around braces. If you'd prefer fluoride-free, I can switch to the standard fluoride-free system instead. Which would you like?"
    case 'r': return recap(st)
    case 'rc': return q.choices.length ? 'Whose answers should we change?' : `Whose answers should we change? Type a name or number: ${q.note || ''}`
    case 'a': return 'How old is each child? Type a number for each, like "4 and 9", or months for babies, like "10 months".'
    default: return q.ask
  }
}

function ask(prefix = '') {
  if (!active) return
  const q = question(active)
  logEvent({ kind: 'question', step: q.step, about: q.about })
  addBot((prefix ? prefix + '\n\n' : '') + textFor(active))
  showChips(q.choices)
}

// ---------- flow ----------

function finish() {
  if (!active) return
  const st = active
  const codes = st.members.map(codeFor).filter(Boolean).join(' ')
  const goal = st.goal ? GOALS[st.goal] : 'not given'
  const habit = st.habit === 'r' ? 'room to build' : st.habit === 's' ? 'pretty solid' : 'not given'
  logHandoff(codes, goal, habit, encode(st))
  postHandoffReplies = 4
  handoffPeople = st.members.map((_, i) => cap(label(st, i)))
  handoffCodes = codes
  resetRoutineCards()
  active = null
  save()
  removeChips()
  const msg = `My routine is confirmed. Routine code: ${codes}. Goal: ${goal}. Brushing: ${habit}. Please recommend my systems.`
  w().ChatWidget?.open?.(msg)
}

/** Process an answer typed or tapped during the interview. */
function handle(text: string, fromChip = false) {
  if (!active) return
  addUser(text)
  const before = question(active)
  const kidsBefore = active.members.length
  const probe = decode(encode(active))!
  const r = answer(probe, text)
  if (r.ok) {
    // log the button label, or for typed answers only what was understood (never the raw text)
    const value = fromChip ? text
      : before.step === 'a' ? r.state.members.slice(kidsBefore).map(m => m.bracket).join(',')
      : '[typed]'
    logEvent({ kind: before.step === 'r' && /start over/i.test(text) ? 'restart' : 'answer', step: before.step, about: before.about, value, state: encode(r.state) })
    active = r.state
    save()
    const q = question(active)
    if (q.step === 'done') { finish(); return }
    if (r.question.note && /Explain/.test(r.question.note)) {
      // "Tell me more": let Emma explain, then ask again
      askEmmaSide('Tell me more about fluoride versus fluoride-free toothpaste.')
      return
    }
    ask()
    return
  }
  logEvent({ kind: 'unparsed', step: before.step })
  ask(fromChip ? '' : "Sorry, I didn't catch that.")
}

/** Start the interview in Emma's window. */
export function startLocalInterview(source = 'menu') {
  let tries = 0
  const go = () => {
    const ready = w().ChatWidget?.open && document.querySelector('.cw-messages')
    if (!ready) { if (++tries < 60) setTimeout(go, 250); return }
    try { w().ChatWidget.open() } catch { /* opens on next try */ }
    active = start()
    save()
    logStart(source)
    addUser('Build my routine')
    ask("Let's build your routine. I'll ask a few quick questions; tap an answer or type it.")
  }
  go()
}

function openWidgetThen(fn: () => void) {
  let tries = 0
  const go = () => {
    const ready = w().ChatWidget?.open && document.querySelector('.cw-messages')
    if (!ready) { if (++tries < 60) setTimeout(go, 250); return }
    try { w().ChatWidget.open() } catch { /* opens on next try */ }
    fn()
  }
  go()
}

/** "I have a routine code": the page asks for it and reads it. */
export function startCodeEntry(source = 'menu') {
  openWidgetThen(() => {
    active = null
    save()
    logStart(source)
    addUser('I have a routine code')
    addBot('Great, that saves time. Type your routine code, for example **AFM** or, for a family, **AFM KNS LFC**.')
    codeEntry = true
  })
}

/** A routine code arrived with the page (a ?code= link) or was typed. */
export function startFromCode(code: string, source = 'code_link') {
  openWidgetThen(() => {
    logStart(source)
    addUser(`My routine code is ${code}`)
    tryCode(code)
  })
}

function tryCode(text: string) {
  codeEntry = false
  const { members } = readCodes(text)
  if (!members.length) {
    logEvent({ kind: 'unparsed', step: 'code' })
    addBot("That code didn't read. Codes are three letters per person, like **AFM** or **KNS**. Want to try again, or build your routine?")
    showChips(['Try again', 'Build my routine'], pick => {
      if (pick === 'Try again') { addUser('Try again'); addBot('Go ahead and type your code.'); codeEntry = true }
      else startLocalInterview('code_retry')
    })
    return
  }
  const st = start()
  st.members = members
  st.habit = 's'
  st.step = 'r'
  active = st
  save()
  logEvent({ kind: 'answer', step: 'code', value: members.map(codeFor).join(' '), state: encode(st) })
  ask()
}

/** After a reload, pick up where the shopper left off. */
export function resumeLocalInterview() {
  let s: string | null = null
  try { s = sessionStorage.getItem(KEY) } catch { /* ignore */ }
  const st = s ? decode(s) : null
  if (!st) return
  let tries = 0
  const go = () => {
    if (!document.querySelector('.cw-messages')) { if (++tries < 60) setTimeout(go, 250); return }
    active = st
    logResume()
    ask("Let's pick up where we left off.")
  }
  go()
}

/**
 * Called after each Emma reply:
 * - after a side question, ask the current routine question again;
 * - if Quincer's turn failed (its generic fallback), offer "Try again";
 * - after a recommendation, replace Quincer's own suggestions with ours;
 * - anywhere, drop Quincer suggestions that push a cheaper system unasked.
 */
export function afterEmmaReply() {
  if (active && resumeAfterEmma) {
    resumeAfterEmma = false
    setTimeout(() => ask(), 300)
    return
  }
  setTimeout(() => {
    const b = box()
    if (!b || active) return
    const bots = b.querySelectorAll('.cw-msg-bot:not(.sm-local)')
    const last = bots[bots.length - 1] as HTMLElement | undefined
    const text = (last?.innerText || '').trim()
    if (FALLBACK.test(text)) {
      const users = [...b.querySelectorAll('.cw-msg-user')].map(u => (u as HTMLElement).innerText.trim()).filter(Boolean)
      const again = users[users.length - 1]
      logEvent({ kind: 'fallback' })
      if (again) showChips(['Try again'], () => w().ChatWidget?.open?.(again))
      return
    }
    if (postHandoffReplies > 0) {
      const first = postHandoffReplies === 4
      postHandoffReplies--
      // Emma asks which person: offer each person as a button
      if (!first && handoffPeople.length > 1 && handoffPeople.length <= 3 && /\?\s*$/.test(text) && /\b(which|who|whose)\b/i.test(text)) {
        showChips(handoffPeople.slice(0, 3), pick => w().ChatWidget?.open?.(pick))
        return
      }
      // the recommendation itself, or a recommendation after a step-down: our three buttons
      if (first || /SuperMouth [^.?!]*System/i.test(text)) {
        if (last) showRoutineCards(last, handoffCodes)
        showChips(AFTER_RECOMMEND.map(([l]) => l), pick => {
          const msg = AFTER_RECOMMEND.find(([l]) => l === pick)?.[1] || pick
          if (pick === 'Looks good') postHandoffReplies = 0
          w().ChatWidget?.open?.(msg)
        })
        return
      }
    }
    // anywhere else: keep Quincer's buttons but drop ones that push a cheaper system unasked
    b.querySelectorAll('.cw-reply-chips:not(.sm-routine-chips) .cw-slot-chip').forEach(c => {
      if (UNWANTED_CHIP.test(c.textContent || '')) c.remove()
    })
    b.querySelectorAll('.cw-reply-chips:not(.sm-routine-chips)').forEach(row => {
      if (!row.querySelector('.cw-slot-chip')) row.remove()
    })
  }, 500)
}

/** Replace em and en dashes in Emma's bubbles (Quincer ignores the no-dash rule). */
export function fixDashes(root: Element) {
  root.querySelectorAll('.cw-msg-bot').forEach(bot => {
    if (!/[\u2013\u2014]/.test(bot.textContent || '')) return
    const walker = document.createTreeWalker(bot, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    for (const n of nodes) {
      const v = n.nodeValue || ''
      if (!/[\u2013\u2014]/.test(v)) continue
      const next = v
        .replace(/(\d)\s*\u2013\s*(\d)/g, '$1 to $2')
        .replace(/\s*[\u2013\u2014]\s*/g, ', ')
        .replace(/,\s*,/g, ',')
      if (next !== v) n.nodeValue = next
    }
  })
}

/**
 * Capture clicks on Quincer's own "Build my routine" buttons and typed messages, so the
 * interview runs on the page. Returns a cleanup function.
 */
export function installRoutineInterception(): () => void {
  const onClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null
    const chip = t?.closest?.('.cw-slot-chip') as HTMLElement | null
    if (chip && !chip.closest('.sm-routine-chips') && START_TEXT.test(chip.textContent || '')) {
      e.preventDefault(); e.stopImmediatePropagation()
      startLocalInterview('starter_chip')
      return
    }
    if (chip && !chip.closest('.sm-routine-chips') && CODE_ASK_TEXT.test(chip.textContent || '')) {
      e.preventDefault(); e.stopImmediatePropagation()
      startCodeEntry('starter_chip')
      return
    }
    if (chip && !active && !chip.closest('.sm-routine-chips')) logShopperFollowup()
    const send = t?.closest?.('.cw-send')
    if (send && interceptTyped()) { e.preventDefault(); e.stopImmediatePropagation() }
  }
  const onKey = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null
    if (e.key !== 'Enter' || e.shiftKey || !t?.classList?.contains('cw-input')) return
    if (interceptTyped()) { e.preventDefault(); e.stopImmediatePropagation() }
  }
  document.addEventListener('click', onClick, true)
  document.addEventListener('keydown', onKey, true)
  return () => { document.removeEventListener('click', onClick, true); document.removeEventListener('keydown', onKey, true) }
}

/** Decide whether a typed message belongs to the page interview. True = we handled it. */
function interceptTyped(): boolean {
  const input = document.querySelector('.cw-input') as HTMLInputElement | null
  const text = (input?.value || '').trim()
  if (!input || !text) return false
  const clear = () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
  if (codeEntry) { clear(); addUser(text); tryCode(text); return true }
  if (!active) {
    if (START_TEXT.test(text)) { clear(); startLocalInterview('typed'); return true }
    if (CODE_ASK_TEXT.test(text)) { clear(); startCodeEntry('typed'); return true }
    logShopperFollowup()
    return false
  }
  // during the interview: a question to Emma goes to Emma (unless it is exactly a button),
  // anything else is treated as an answer on the page
  const exact = question(active).choices.some(c => c.toLowerCase() === text.toLowerCase())
  clear()
  if (!exact && QUESTIONISH.test(text)) { askEmmaSide(text); return true }
  handle(text)
  return true
}
