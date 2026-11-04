'use client'

/**
 * Emma's routine interview, version 2 (SuperMouth's November 2026 prototype), run by the page
 * inside Emma's chat window.
 *
 * The page asks every question with tap buttons and builds the routine, products, System and
 * price itself (lib/routine2/engine.ts, /api/routine-system), so no Quincer tool calls are
 * needed. Typed questions go to Emma (she answers from her FAQ and articles), and the current
 * question comes back after she answers. Systems go into the site's Shopify cart, one line per
 * person, marked "For <person>". Routine codes (three letters per person) let a returning
 * shopper skip the questions. Progress is kept in sessionStorage so a reload resumes.
 *
 * Flow spec: the "Emma Routine Flow v2" page. Version 1 (v2.28 phone script) is in git history.
 */

import {
  Person, Item, Tod, newPerson, steps, products, tierOf, smallerTiers, dropForTier, systemName,
  recapText, routineIntro, codeFor, peopleFromCodes, priceLines, pronoun, isMe, TOD_LABEL, NAMES, pathway,
} from './routine2/engine'
import { logStart, logResume, logEvent, logHandoff, logShopperFollowup } from './routine-log-client'

const KEY = 'sm_routine_v2'
const START_TEXT = /^\s*(build my routine|find my routine|find my oral care routine|shop for my family)\s*[.!]*\s*$/i
const CODE_ASK_TEXT = /^\s*i have a routine code\s*[.!]*\s*$/i
const QUESTIONISH = /\?\s*$|^(what|how|why|is|are|can|could|does|do|should|which|where|when|will|would)\b/i
const RED = /swollen|swelling|severe pain|infection|abscess|pus|trauma|knocked|lesion|lump|bleeding a lot|won'?t stop bleeding|broken tooth|tooth (really )?hurts/i
const FALLBACK = /^(i'd be happy to help you with that\. could you tell me a bit more about what you need\?|happy to keep helping\W+is there anything else i can do for you\?)\s*$/i
const UNWANTED_CHIP = /cheaper|cheapest|lower price|budget option|compare these/i

export const SIDE_MARK = '(Side question during my routine) '

// ---------- state ----------

interface Snap { step: string; cur: Person | null; people: Person[]; queue: Person[] }
interface Saved { people: Person[]; queue: Person[]; cur: Person | null; step: string; introduced: boolean; hist?: Snap[] }
let S: Saved | null = null
let resumeAfterEmma = false
let codeEntry = false
let typedHandler: ((t: string) => void) | null = null   // "Something else" and similar typed answers
let reask: (() => void) | null = null                    // shows the current question again

export const isLocalInterviewActive = () => !!S
export const inPostHandoff = () => false

function save() {
  try { if (S) sessionStorage.setItem(KEY, JSON.stringify(S)); else sessionStorage.removeItem(KEY) } catch { /* ignore */ }
}

const w = () => window as any
const box = () => document.querySelector('.cw-messages')

// ---------- chat elements ----------

function esc(s: string) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}
function fmt(s: string) { return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>') }
function scrollEnd(el: Element) { try { el.scrollIntoView({ block: 'end', behavior: 'smooth' }) } catch { /* ignore */ } }
function removeChips() { box()?.querySelectorAll('.cw-reply-chips').forEach(n => n.remove()) }

function bubble(): HTMLDivElement | null {
  const b = box()
  if (!b) return null
  removeChips()
  if (!b.querySelector('.cw-msg-persona')) {
    const p = document.createElement('div'); p.className = 'cw-msg-persona'; p.textContent = 'Emma'; b.appendChild(p)
  }
  const d = document.createElement('div')
  d.className = 'cw-msg cw-msg-bot sm-local'
  const ref = b.querySelector('.cw-msg-bot[style]') as HTMLElement | null
  if (ref) d.setAttribute('style', ref.getAttribute('style') || '')
  b.appendChild(d)
  return d
}
function say(text: string) { const d = bubble(); if (!d) return; d.innerHTML = fmt(text); scrollEnd(d) }
function sayHtml(html: string) { const d = bubble(); if (!d) return; d.innerHTML = html; scrollEnd(d) }
function addUser(text: string) {
  const b = box(); if (!b) return
  removeChips()
  const d = document.createElement('div'); d.className = 'cw-msg cw-msg-user sm-local'; d.textContent = text
  b.appendChild(d); scrollEnd(d)
}

function chipRow(): [HTMLDivElement, HTMLDivElement] {
  const wrap = document.createElement('div'); wrap.className = 'cw-slot-chips cw-reply-chips sm-routine-chips'
  const row = document.createElement('div'); row.className = 'cw-slot-chips-row'; row.style.flexWrap = 'wrap'
  wrap.appendChild(row)
  return [wrap, row]
}
function chipBtn(label: string): HTMLButtonElement {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'cw-slot-chip'; b.textContent = label; return b
}

// ---------- Back ----------

/** Questions you can step back to (steps that only show text are skipped). */
const ASKS = new Set(['who', 'age', 'teeth', 'teething', 'morning', 'day', 'night', 'cavities', 'concerns', 'special', 'fluoride', 'flavor', 'recap', 'fix', 'manageable', 'simplify', 'better', 'prod_morning', 'prod_day', 'prod_night', 'system', 'smaller', 'less', 'anyone'])
const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x))

function canBack(): boolean {
  if (!S || !S.hist || S.hist.length < 2) return false
  const prev = S.hist[S.hist.length - 2]
  // never step back past a System that went into the cart
  return S.step !== 'anyone' && prev.people.length === S.people.length
}

function back() {
  if (!S || !canBack()) return
  typedHandler = null
  S.hist!.pop()
  const prev = S.hist![S.hist!.length - 1]
  S.cur = clone(prev.cur); S.people = clone(prev.people); S.queue = clone(prev.queue)
  addUser('← Back')
  say("Let's go back a step.")
  logEvent({ kind: 'answer', step: S.step, value: 'back' })
  S.step = prev.step; save()
  STEPS[prev.step]()
}

function addBack(row: HTMLElement, wrap: HTMLElement) {
  if (!canBack()) return
  const btn = chipBtn('← Back')
  btn.style.opacity = '.75'
  btn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation()
    wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
    back()
  })
  row.appendChild(btn)
}

/** Single choice: tap one. */
function chips<T>(list: [string, T][], on: (v: T, label: string) => void) {
  const b = box(); if (!b) return
  removeChips()
  const [wrap, row] = chipRow()
  for (const [label, v] of list) {
    const btn = chipBtn(label)
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      if (btn.getAttribute('disabled')) return
      wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
      addUser(label); typedHandler = null
      logEvent({ kind: 'answer', step: S?.step, value: label })
      on(v, label)
    })
    row.appendChild(btn)
  }
  addBack(row, wrap)
  b.appendChild(wrap); scrollEnd(wrap)
}

const ON_STYLE = 'outline:2px solid currentColor;outline-offset:-2px;font-weight:600'

/** Several choices, then Done. "Something else" takes a typed answer. */
function multi(list: [string, string][], opts: { none?: string; other?: string }, on: (vals: string[], extra: string[], label: string) => void) {
  const b = box(); if (!b) return
  removeChips()
  const [wrap, row] = chipRow()
  const picked = new Set<string>(); const extra: string[] = []
  const mark = (btn: HTMLElement, on: boolean) => { if (on) btn.setAttribute('style', ON_STYLE); else btn.removeAttribute('style') }
  let noneBtn: HTMLButtonElement | null = null
  for (const [label, v] of list) {
    const btn = chipBtn(label)
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      if (picked.has(v)) picked.delete(v); else picked.add(v)
      mark(btn, picked.has(v)); if (noneBtn) mark(noneBtn, false)
    })
    row.appendChild(btn)
  }
  if (opts.none) {
    noneBtn = chipBtn(opts.none)
    noneBtn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      picked.clear(); extra.length = 0
      row.querySelectorAll('.cw-slot-chip').forEach(x => (x as HTMLElement).removeAttribute('style'))
      mark(noneBtn!, true); finish()
    })
    row.appendChild(noneBtn)
  }
  if (opts.other) {
    const ob = chipBtn('Something else')
    ob.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      say(`Type it in the box below (${opts.other}), then tap Done.`)
      b.appendChild(wrap); scrollEnd(wrap)
      typedHandler = t => { extra.push(t); const tag = chipBtn(t); mark(tag, true); row.insertBefore(tag, ob); addUser(t); b.appendChild(wrap); scrollEnd(wrap) }
    })
    row.appendChild(ob)
  }
  const done = chipBtn('Done')
  done.style.fontWeight = '700'
  const finish = () => {
    wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
    const labels = [...list.filter(([, v]) => picked.has(v)).map(([l]) => l), ...extra]
    const label = labels.length ? labels.join(', ') : (opts.none || 'None')
    addUser(label); typedHandler = null
    logEvent({ kind: 'answer', step: S?.step, value: label })
    on([...picked], [...extra], label)
  }
  done.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); finish() })
  row.appendChild(done)
  addBack(row, wrap)
  b.appendChild(wrap); scrollEnd(wrap)
}

/** Tap items in the order used; numbers show the order. */
function orderPicker(tod: Tod, on: (order: Item[], extra: string[]) => void) {
  const b = box(); if (!b) return
  removeChips()
  const [wrap, row] = chipRow()
  const list: [string, Item][] = [['🪥 Brush / toothpaste', 'br'], ['🧵 Floss', 'fl'], ['🫙 Mouthwash', 'mw'], ['👅 Tongue cleaner', 'tc'], ['💨 Mouth spray', 'sp'], ['💧 Water flosser', 'wf']]
  const order: Item[] = []; const extra: string[] = []
  const btns: [HTMLButtonElement, Item, string][] = []
  const paint = () => btns.forEach(([btn, v, label]) => {
    const n = order.indexOf(v)
    btn.textContent = n >= 0 ? `${n + 1}. ${label}` : label
    if (n >= 0) btn.setAttribute('style', ON_STYLE); else btn.removeAttribute('style')
  })
  for (const [label, v] of list) {
    const btn = chipBtn(label); btns.push([btn, v, label])
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation()
      const i = order.indexOf(v); if (i >= 0) order.splice(i, 1); else order.push(v); paint()
    })
    row.appendChild(btn)
  }
  const finish = (label: string) => {
    wrap.querySelectorAll('.cw-slot-chip').forEach(x => x.setAttribute('disabled', 'true'))
    addUser(label); typedHandler = null
    logEvent({ kind: 'answer', step: S?.step, value: label })
    on([...order], [...extra])
  }
  const done = chipBtn('Done'); done.style.fontWeight = '700'
  done.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); const l = [...order.map(k => NAMES[k]), ...extra]; finish(l.length ? l.join(' → ') : 'Nothing') })
  const none = chipBtn(`Nothing ${tod === 'day' ? 'during the day' : tod === 'morning' ? 'in the morning' : 'at night'}`)
  none.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); order.length = 0; extra.length = 0; finish(none.textContent || 'Nothing') })
  const other = chipBtn('Something else')
  other.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation()
    say('Type it in the box below (for example, a water flosser or a rinse from your dentist), then tap Done.')
    b.appendChild(wrap); scrollEnd(wrap)
    typedHandler = t => { extra.push(t); addUser(t); const tag = chipBtn(t); tag.setAttribute('style', ON_STYLE); row.insertBefore(tag, done); b.appendChild(wrap); scrollEnd(wrap) }
  })
  row.append(done, none, other)
  addBack(row, wrap)
  b.appendChild(wrap); scrollEnd(wrap)
}

// ---------- the interview ----------

const STEPS: Record<string, () => void> = {}
function go(name: string) {
  if (!S) return
  S.step = name
  if (ASKS.has(name) && S.hist?.[S.hist.length - 1]?.step !== name) {
    S.hist = [...(S.hist || []), { step: name, cur: clone(S.cur), people: clone(S.people), queue: clone(S.queue) }].slice(-40)
  }
  save()
  logEvent({ kind: 'question', step: name, about: S.cur ? S.cur.label : undefined })
  STEPS[name]()
}

const cur = () => S!.cur!
const you = () => pronoun(cur())

function labelFor(p: Person) {
  const base = p.who === 'me' ? 'You' : p.who === 'adult' ? 'Family member' : { baby: 'Baby', little: 'Little one', big: 'Big kid', teen: 'Teen' }[p.age]
  const n = S!.people.filter(x => x.label === base || x.label.startsWith(base + ' ')).length
  return n ? `${base} ${n + 1}` : base
}
const forWhom = (p: Person) => (p.who === 'me' ? 'you' : p.label.toLowerCase())

STEPS.who = () => {
  say(S!.people.length ? "Who's next?" : 'Is this for you or someone in your family?')
  const opts: [string, Person['who']][] = [['Me', 'me'], ['My child', 'child'], ['Another adult in my family', 'adult']]
  chips(S!.people.some(p => p.who === 'me') ? opts.filter(o => o[1] !== 'me') : opts, v => {
    S!.cur = newPerson(v)
    if (v === 'child') return go('age')
    S!.cur.label = labelFor(S!.cur); go('morning')
  })
}
STEPS.age = () => {
  say('How old are they?')
  chips<Person['age']>([['Baby or toddler (0 to 2)', 'baby'], ['Little kid (2 to 5)', 'little'], ['Big kid (6 to 12)', 'big'], ['Teen (13+)', 'teen']], v => {
    cur().age = v; cur().label = labelFor(cur())
    if (v === 'little' && cur().flavor === 'Mint') cur().flavor = 'Strawberry'
    go(v === 'baby' ? 'teeth' : 'morning')
  })
}
STEPS.teeth = () => {
  say('How many teeth so far?')
  chips<NonNullable<Person['teeth']>>([['None yet', 'none'], ['A few', 'few'], ['6 to 8', '68'], ['More than 8', 'more']], v => { cur().teeth = v; go('teething') })
}
STEPS.teething = () => {
  say('Teething right now?')
  chips([['Yes', true], ['No', false]], v => { cur().teething = v; go('flavor') })
}
STEPS.morning = () => {
  say(`Let's start with what ${you()} do today. **In the morning**, tap what ${you()} use in the order ${you()} use it, then tap Done.`)
  orderPicker('morning', (o, x) => { cur().routineNow.morning = o; cur().other.push(...x); go('day') })
}
STEPS.day = () => {
  say('**During the day**, after meals or snacks?')
  orderPicker('day', (o, x) => { cur().routineNow.day = o; cur().other.push(...x); go('night') })
}
STEPS.night = () => {
  say('And **at night**, in order?')
  orderPicker('night', (o, x) => { cur().routineNow.night = o; cur().other.push(...x); go('cavities') })
}
STEPS.cavities = () => {
  say(isMe(cur()) ? "Any cavities recently, or has your doctor said you're at higher risk?" : "Any cavities recently, or has the doctor said they're at higher risk?")
  chips<Person['cavities']>([['None in the last few years', 'none'], ['One or more recently', 'recent'], ['Doctor says higher risk', 'risk'], ['Not sure', 'unsure']], v => { cur().cavities = v; go('concerns') })
}
STEPS.concerns = () => {
  say(`Anything ${you()}'re dealing with? Tap all that apply, then Done.`)
  multi([['Sensitivity', 'Sensitivity'], ['Bleeding gums', 'Bleeding gums'], ['Dry mouth', 'Dry mouth'], ['Bad breath', 'Bad breath'], ['Staining', 'Staining']], { none: 'None of these', other: 'a few words' }, (vals, extra) => {
    cur().concerns = [...vals, ...extra]
    if (vals.includes('Bleeding gums')) say('Bleeding when you floss often settles as the routine improves; if it keeps up, it deserves a look from your dental team.')
    go('special')
  })
}
STEPS.special = () => {
  say('Any special considerations? Tap all that apply, then Done.')
  const opts: [string, string][] = [['Braces', 'braces'], ['Clear aligners', 'aligners']]
  if (cur().age === 'teen') opts.push(['Pregnancy', 'preg'])
  multi(opts, { none: 'None', other: 'for example, a bridge or an implant' }, (vals, extra) => {
    cur().ortho = vals.includes('braces') || vals.includes('aligners')
    cur().pregnant = vals.includes('preg')
    cur().special = extra
    go('fluoride')
  })
}
STEPS.fluoride = () => {
  say("Prefer fluoride, fluoride-free, or would you like me to recommend based on what you've told me?")
  chips<Person['fluoride']>([['Fluoride', 'f'], ['Fluoride-free', 'ff'], ['Recommend for me', 'choose']], v => { cur().fluoride = v; go('flavor') })
}
STEPS.flavor = () => {
  say('Which flavor?')
  const kid = cur().age === 'baby' || cur().age === 'little'
  const f: [string, Person['flavor']][] = kid ? [['🍓 Strawberry', 'Strawberry'], ['🍦 Vanilla', 'Vanilla'], ['🍫 Chocolate', 'Chocolate']] : [['🌿 Mint', 'Mint'], ['🍓 Strawberry', 'Strawberry'], ['🍦 Vanilla', 'Vanilla'], ['🍫 Chocolate', 'Chocolate']]
  chips(f, v => { cur().flavor = v; go('recap') })
}
STEPS.recap = () => {
  say(recapText(cur(), codeFor(cur())))
  chips([["That's right", true], ['Let me fix something', false]], ok => {
    if (ok) return go('routine')
    if (cur().fromCode) { const who = cur().who; S!.cur = newPerson(who); S!.cur.label = labelFor(S!.cur); return go(who === 'child' ? 'age' : 'morning') }
    go('fix')
  })
}
STEPS.fix = () => {
  say('No problem. What should I change?')
  const opts: [string, string][] = cur().age === 'baby'
    ? [["Who it's for", 'who'], ['Teeth', 'teeth'], ['Teething', 'teething'], ['Flavor', 'flavor']]
    : [["Who it's for", 'who'], ['What I use now', 'morning'], ['Cavities', 'cavities'], ['Concerns', 'concerns'], ['Fluoride', 'fluoride'], ['Flavor', 'flavor']]
  chips(opts, v => {
    if (v === 'who') { S!.cur = null; return go('who') }
    if (v === 'morning') { cur().routineNow = { morning: [], day: [], night: [] }; cur().other = [] }
    go(v)
  })
}

function routineCard(p: Person) {
  const g: Record<Tod, ReturnType<typeof steps>> = { morning: [], day: [], night: [] }
  steps(p).forEach(s => g[s.tod].push(s))
  let h = ''
  for (const t of ['morning', 'day', 'night'] as Tod[]) {
    if (!g[t].length) continue
    h += `<div style="margin:4px 0 8px"><strong>${esc(TOD_LABEL[t])}</strong>`
    g[t].forEach((s, i) => {
      const tag = s.keep ? 'KEEP' : 'ADD'
      h += `<div style="margin-top:3px"><span style="font-size:11px;font-weight:700;letter-spacing:.04em;opacity:.7">${i + 1} · ${tag}</span> ${esc(s.text)}${s.reason && !s.keep ? `<span style="opacity:.75"> · ${esc(s.reason)}</span>` : ''}</div>`
    })
    h += '</div>'
  }
  sayHtml(h)
}

STEPS.routine = () => {
  const p = cur()
  say(routineIntro(p))
  routineCard(p)
  if (p.other.length) say(`About the ${p.other.join(' and ')}: keep using it if you like it; nothing here replaces it.`)
  go('manageable')
}
STEPS.manageable = () => {
  say("Does that feel manageable? If not, tell me what's in the way; the best routine is the one you'll keep.")
  chips([['Yes, that works', true], ['Not quite', false]], v => go(v ? 'bridge' : 'simplify'))
}
STEPS.simplify = () => {
  const lab: Record<string, string> = { tc: 'The tongue cleaner in the morning', sp: 'The mouth spray during the day', mw: 'The mouthwash at night' }
  const opts = steps(cur()).filter(s => s.keys.some(k => ['tc', 'sp', 'mw'].includes(k))).map(s => [lab[s.keys[0]], s.keys[0]] as [string, string])
  say('Which part feels hard? Tap any, then Done, or tell me in your own words.')
  multi([...opts, ["It's the time it takes", '__time']], { other: 'what gets in the way' }, (vals, extra) => {
    const drop = vals.filter(v => v !== '__time') as Item[]
    if (extra.length || vals.includes('__time')) say(`Understood${extra.length ? `: ${extra.join('; ')}` : ''}. The morning and night steps take about two minutes each; the daytime spray is optional and the tongue cleaner takes ten seconds. Let's drop whatever you won't do and keep what protects you most.`)
    if (!drop.length && !extra.length && !vals.includes('__time')) return go('bridge')
    if (!drop.length) { say("Here's the lighter version: brushing and flossing, with the rest whenever you're ready."); cur().dropped = [...new Set([...cur().dropped, ...(opts.map(o => o[1]) as Item[])])] }
    else cur().dropped = [...new Set([...cur().dropped, ...drop])]
    routineCard(cur())
    go('better')
  })
}
STEPS.better = () => {
  say('Better?')
  chips([['Yes, that works', true], ['Still too much', false]], ok => {
    if (!ok) { cur().dropped = [...new Set([...cur().dropped, 'tc', 'sp', 'mw'] as Item[])]; say("Then brushing and flossing it is. That's the foundation, and the rest can come later.") }
    go('bridge')
  })
}
STEPS.bridge = () => {
  if (!S!.introduced) {
    say("Here's something important: oral care products from different brands aren't necessarily designed to work together. For example, an acidic mouthwash may work against an alkaline toothpaste, while an antiseptic rinse can disrupt the beneficial bacteria that prebiotics help support.\n\nThat's why SuperMouth is different. Our dentist-developed products are designed as one coordinated system, with innovative ingredients and tools tailored to your needs.\n\n**Innovation in every product. Coordinated to work together. Personalized to you.**\n\nNow let me show you the products I'd recommend for your routine, and why.")
    S!.introduced = true
  } else say("Same approach for them: the SuperMouth products that fit this routine, in the order they're used.")
  go('prod_morning')
}

function productsAt(t: Tod, next: string) {
  const list = products(cur()).filter(p => p.tod === t)
  if (!list.length) return go(next)
  let h = `<strong>${esc(TOD_LABEL[t])}</strong>`
  for (const p of list) h += `<div style="margin-top:6px"><strong>${esc(p.name)}</strong><div style="opacity:.8;font-size:.95em">${esc(p.why)}</div></div>`
  sayHtml(h)
  if (next === 'system') return go('system')
  say('Make sense so far?')
  chips([['Yes, go on', true], ['I have a question', false]], v => {
    if (v) return go(next)
    say("Ask away, and I'll pick up where we left off.")
    S!.step = next; save()      // after Emma answers, the next part comes up
  })
}
STEPS.prod_morning = () => productsAt('morning', products(cur()).some(p => p.tod === 'day') ? 'prod_day' : 'prod_night')
STEPS.prod_day = () => productsAt('day', 'prod_night')
STEPS.prod_night = () => productsAt('night', 'system')

// ---------- System, price, cart ----------

interface Sys { code: string; tier: string; title: string; flavor: string; floss?: string; price: number; gid: string; url: string; image?: string; substituted?: string; error?: string }

async function fetchSystems(people: { code: string; tier: string }[]): Promise<Sys[]> {
  try {
    const r = await fetch('/api/routine-system', { method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store', body: JSON.stringify({ people }) })
    return (await r.json())?.people || []
  } catch { return [] }
}

function systemCard(s: Sys, sub: string) {
  const b = box(); if (!b) return
  const a = document.createElement('a')
  a.href = s.url; a.className = 'sm-card'
  a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault(); e.stopPropagation()
    window.dispatchEvent(new CustomEvent('sm:navigate', { detail: s.url }))
  }, true)
  a.setAttribute('style', 'display:flex;gap:10px;align-items:center;padding:8px;border:1px solid rgba(0,0,0,.12);border-radius:10px;background:#fff;color:#1d2a33;text-decoration:none;margin:4px 0 8px;max-width:92%')
  a.innerHTML = `${s.image ? `<img src="${esc(s.image)}" alt="" style="width:56px;height:56px;object-fit:contain;flex:none;border-radius:6px;background:#f6f8f9">` : ''}<div style="min-width:0;flex:1;font-size:13px;line-height:1.3"><div style="font-weight:600">${esc(s.title)}</div><div style="color:#5b6a74">${esc(sub)}</div><div style="display:flex;justify-content:space-between;margin-top:2px"><span style="font-weight:600">$${s.price.toFixed(2)}</span><span style="color:#0f7c8c;font-weight:600">View product</span></div></div>`
  b.appendChild(a); scrollEnd(a)
}

let lastSystem: Sys | null = null
let added = false   // the last person's System went into the cart

STEPS.system = async () => {
  const p = cur()
  const code = codeFor(p)
  const [s] = await fetchSystems([{ code, tier: tierOf(p) }])
  if (!s || s.error) {
    say(`I couldn't find a ${systemName(p)} in stock right now. I can help you choose individual products instead.`)
    return chips([['Help me choose products', true], ['Skip this person', false]], v => {
      S!.cur = null; added = false
      if (!v) return go('anyone')
      S!.step = 'anyone'; save()
      askEmma(`Help me choose individual products for ${forWhom(p)}: ${pathway(p)}, ${p.flavor}.`)
    })
  }
  lastSystem = s
  const sizeNote = s.tier !== tierOf(p) ? ` (the ${tierOf(p)} size is out of stock, so this is the ${s.tier})` : ''
  say(`What we've put together is ${isMe(p) ? 'your' : 'their'} **${pathway(p)} ${s.tier} System**${sizeNote}: a full 90-day supply, including an oral health handbook for ${isMe(p) ? 'your' : 'their'} stage of life and a simple guide to the daily routine.`)
  systemCard(s, [p.who === 'me' ? '' : `For ${forWhom(p)}`, s.flavor, s.floss].filter(Boolean).join(' · '))
  if (s.substituted) say(s.substituted + '.')
  const pr = priceLines(s.price)
  const free = s.tier === 'Complete' || s.price >= 50
  say(`Purchased separately, these products would cost **$${pr.separate.toFixed(2)}**. As a System, you save 15%, bringing it to **$${pr.oneTime.toFixed(2)}** for 90 days, about ${Math.round((pr.oneTime / 90) * 100)} cents a day.${free ? ' Shipping is free, and' : ''} you're covered by our 30-day money-back guarantee.\n\nHow does that sound?`)
  chips([['Add to cart', 'add'], ['Show me a smaller option', 'small']], v => v === 'add' ? addToCart(s) : go('smaller'))
}

STEPS.smaller = async () => {
  const p = cur()
  const tiers = smallerTiers(p)
  if (!tiers.length) {
    say("This is already the smallest System for this routine. If you'd rather start with one product, toothpaste is the usual first step.")
    return chips([['Just the toothpaste', 'tp'], [`Add the ${tierOf(p)} System`, 'add']], v => v === 'tp' ? justToothpaste() : (lastSystem ? addToCart(lastSystem) : go('system')))
  }
  say('Here are the smaller Systems for this routine. Each keeps the same formula and flavor; the difference is what\'s left out.')
  const code = codeFor(p)
  const list = (await fetchSystems(tiers.map(t => ({ code, tier: t })))).filter(s => !s.error)
  const left: Record<string, string> = { Plus: 'leaves out the mouthwash', Basic: 'toothbrush, toothpaste and floss only' }
  list.forEach(s => systemCard(s, `${s.tier}: ${left[s.tier] || ''}`))
  const opts: [string, string][] = list.map(s => [`${s.tier}, $${s.price.toFixed(2)}`, s.tier])
  opts.push([`Keep ${tierOf(p)}`, 'keep'], ['Something smaller still', 'less'])
  chips(opts, v => {
    if (v === 'keep') return lastSystem ? addToCart(lastSystem) : go('system')
    if (v === 'less') return go('less')
    const s = list.find(x => x.tier === v)!
    dropForTier(p, v as 'Plus' | 'Basic')
    addToCart(s)
  })
}
STEPS.less = () => {
  say('Then start with one product, or a pre-matched bundle for one part of the routine.')
  chips([['Just the toothpaste', 'tp'], ['Toothpaste and floss bundle', 'b1'], ['Back to the Systems', 'back']], v => {
    if (v === 'back') return go('smaller')
    if (v === 'tp') return justToothpaste()
    const p = cur()
    S!.cur = null; S!.step = 'anyone'; added = false; save()
    askEmma(`Show me the toothpaste and floss bundle for ${forWhom(p)}: ${p.fluoride === 'f' ? 'with fluoride' : 'fluoride-free'}, ${p.flavor}.`)
  })
}
function justToothpaste() {
  const p = cur()
  S!.cur = null; S!.step = 'anyone'; added = false; save()
  askEmma(`I'd like just the toothpaste for ${forWhom(p)}: ${pathway(p)}, ${p.ortho ? 'ortho formula' : p.fluoride === 'f' ? 'with fluoride' : 'fluoride-free'}, ${p.flavor}.`)
}

async function addToCart(s: Sys) {
  const p = cur()
  const cart = w().__smCart
  let ok = false
  try { if (cart?.addItem) { await cart.addItem(s.gid, 1, [{ key: 'For', value: p.who === 'me' ? 'you' : p.label }, { key: '_code', value: codeFor(p) }, { key: '_size', value: s.tier }], false); ok = true } } catch { /* below */ }
  if (!ok) { say(`I couldn't reach the cart just now. You can add it from the product page: ${s.title}.`); return }
  S!.people.push(p); S!.cur = null; added = true; save()
  logEvent({ kind: 'answer', step: 'cart', value: `${codeFor(p)} ${s.tier}` })
  if (S!.queue.length) {
    S!.cur = S!.queue.shift()!; S!.cur.label = labelFor(S!.cur); save()
    say("It's in your cart. Next person from your codes:")
    return go('recap')
  }
  go('anyone')
}
STEPS.anyone = () => {
  say(`${added ? "Done. It's in your cart. " : ''}Would you like help with anyone else in your family?`)
  added = false
  chips([['Add a family member', 'more'], ["I'm done", 'done']], v => v === 'more' ? (S!.cur = null, go('who')) : finish())
}

function finish() {
  if (!S) return
  const codes = S.people.map(codeFor).join(' ')
  logHandoff(codes, S.people.flatMap(p => p.concerns).join(', ') || 'none', 'v2', '')
  say(`You're set. ${S.people.length > 1 ? 'Your routine codes' : 'Your routine code'}: **${codes}**. Write ${S.people.length > 1 ? 'them' : 'it'} down or take a screenshot, and next time I can skip the questions. Open your cart to review, or check out whenever you're ready. I'm here if you have any questions.`)
  S = null; save()
  chips([['View my cart', 'cart']], () => w().__smCart?.openCart?.())
}

// ---------- Emma (typed questions) ----------

function askEmma(text: string) {
  resumeAfterEmma = !!S
  removeChips()
  logEvent({ kind: 'side', step: S?.step })
  w().ChatWidget?.open?.(SIDE_MARK + text)
}

export function hideSideMarks(root: Element) {
  root.querySelectorAll('.cw-msg-user').forEach(u => {
    const t = u.firstChild
    if (t && t.nodeType === 3 && t.nodeValue && t.nodeValue.startsWith(SIDE_MARK)) t.nodeValue = t.nodeValue.slice(SIDE_MARK.length)
  })
}

// ---------- entry points ----------

function openWidgetThen(fn: () => void) {
  let tries = 0
  const tick = () => {
    const ready = w().ChatWidget?.open && document.querySelector('.cw-messages')
    if (!ready) { if (++tries < 60) setTimeout(tick, 250); return }
    try { w().ChatWidget.open() } catch { /* opens on next try */ }
    fn()
  }
  tick()
}

export function startLocalInterview(source = 'menu') {
  openWidgetThen(() => {
    S = { people: [], queue: [], cur: null, step: 'who', introduced: false }
    codeEntry = false; typedHandler = null
    logStart(source)
    addUser('Find my routine')
    say("Let's find your routine. I'll ask a few quick questions, one person at a time; tap an answer or type a question anytime.")
    go('who')
  })
}

export function startCodeEntry(source = 'menu') {
  openWidgetThen(() => {
    S = null; save()
    logStart(source)
    addUser('I have a routine code')
    say('Great, that saves time. Type your routine code, for example **AFM** or, for a family, **AFM KNS LFC**.')
    codeEntry = true
  })
}

export function startFromCode(code: string, source = 'code_link') {
  openWidgetThen(() => { logStart(source); addUser(`My routine code is ${code}`); tryCode(code) })
}

function tryCode(text: string) {
  codeEntry = false
  const people = peopleFromCodes(text)
  if (!people) {
    logEvent({ kind: 'unparsed', step: 'code' })
    say("That code didn't read. Codes are three letters per person, like **AFM** or **KNS**. Want to try again, or find your routine?")
    return chips([['Try again', 'again'], ['Find my routine', 'find']], v => {
      if (v === 'again') { say('Go ahead and type your code.'); codeEntry = true } else startLocalInterview('code_retry')
    })
  }
  S = { people: [], queue: people.slice(1), cur: people[0], step: 'recap', introduced: false }
  S.cur!.label = labelFor(S.cur!)
  logEvent({ kind: 'answer', step: 'code', value: people.map(codeFor).join(' ') })
  go('recap')
}

// ---------- keeping the chat after a reload ----------

const CHAT_KEY = 'sm_chat_html_v1'
let snapTimer: ReturnType<typeof setTimeout> | undefined

/** Save the chat window's messages (only once the page has drawn some of its own). */
export function snapshotChat() {
  clearTimeout(snapTimer)
  snapTimer = setTimeout(() => {
    const b = box()
    if (!b || !b.querySelector('.sm-local')) return
    try {
      const html = b.innerHTML
      if (html.length < 400_000) sessionStorage.setItem(CHAT_KEY, html)
    } catch { /* storage full or blocked */ }
  }, 600)
}

/** After a reload, put back the messages Quincer doesn't restore (the page-drawn interview). */
function restoreChat(): boolean {
  const b = box()
  if (!b || b.querySelector('.sm-local')) return false
  let html: string | null = null
  try { html = sessionStorage.getItem(CHAT_KEY) } catch { /* ignore */ }
  if (!html) return false
  b.innerHTML = html
  // old buttons lost their actions: drop the page's own, and Quincer's
  b.querySelectorAll('.cw-reply-chips').forEach(n => n.remove())
  b.querySelectorAll('.sm-cards a, a.sm-card').forEach(a => a.addEventListener('click', e => {
    const href = (a as HTMLAnchorElement).href
    if (!href || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey) return
    e.preventDefault(); e.stopPropagation()
    window.dispatchEvent(new CustomEvent('sm:navigate', { detail: href }))
  }, true))
  try { b.scrollTop = b.scrollHeight } catch { /* ignore */ }
  return true
}

/** Hide "Talk instead" while the page runs the interview (voice can't follow the page's questions). */
export function syncTalkButton() {
  document.querySelectorAll('button, a').forEach(el => {
    if (!/^talk instead$/i.test((el.textContent || '').trim())) return
    const h = el as HTMLElement
    if (S) { if (h.style.display !== 'none') { h.dataset.smHidden = '1'; h.style.display = 'none' } }
    else if (h.dataset.smHidden) { delete h.dataset.smHidden; h.style.display = '' }
  })
}

export function resumeLocalInterview() {
  let raw: string | null = null
  try { raw = sessionStorage.getItem(KEY) } catch { /* ignore */ }
  let saved: Saved | null = null
  if (raw) { try { saved = JSON.parse(raw) } catch { saved = null } }
  if (saved && !STEPS[saved.step]) saved = null
  let tries = 0
  const tick = () => {
    if (!document.querySelector('.cw-messages')) { if (++tries < 80) setTimeout(tick, 250); return }
    // give Quincer a moment to restore its own messages first
    setTimeout(() => {
      const restored = restoreChat()
      if (!saved) return
      S = saved
      logResume()
      if (!restored) say("Let's pick up where we left off.")
      else {
        // the question is asked again below with live buttons, so drop its restored copy
        const lastEl = box()?.lastElementChild
        if (lastEl?.classList.contains('cw-msg-bot') && lastEl.classList.contains('sm-local')) lastEl.remove()
      }
      const step = S.step
      if (S.hist?.length && S.hist[S.hist.length - 1].step === step) STEPS[step]()
      else go(step)
    }, 900)
  }
  tick()
}

/** After each Emma reply: bring back the current question, or offer Try again on a failed turn. */
export function afterEmmaReply() {
  if (S && resumeAfterEmma) {
    resumeAfterEmma = false
    setTimeout(() => { if (S) go(S.step) }, 300)
    return
  }
  setTimeout(() => {
    const b = box()
    if (!b || S) return
    const bots = b.querySelectorAll('.cw-msg-bot:not(.sm-local)')
    const last = bots[bots.length - 1] as HTMLElement | undefined
    const text = (last?.innerText || '').trim()
    if (FALLBACK.test(text)) {
      const users = [...b.querySelectorAll('.cw-msg-user')].map(u => (u as HTMLElement).innerText.trim()).filter(Boolean)
      const again = users[users.length - 1]
      logEvent({ kind: 'fallback' })
      if (again) {
        const [wrap, row] = chipRow(); const btn = chipBtn('Try again')
        btn.addEventListener('click', () => { wrap.remove(); w().ChatWidget?.open?.(again) })
        row.appendChild(btn); b.appendChild(wrap)
      }
      return
    }
    b.querySelectorAll('.cw-reply-chips:not(.sm-routine-chips) .cw-slot-chip').forEach(c => { if (UNWANTED_CHIP.test(c.textContent || '')) c.remove() })
  }, 500)
}

/** Replace em and en dashes in Emma's bubbles (Quincer ignores the no-dash rule). */
export function fixDashes(root: Element) {
  root.querySelectorAll('.cw-msg-bot').forEach(bot => {
    if (!/[–—]/.test(bot.textContent || '')) return
    const walker = document.createTreeWalker(bot, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) nodes.push(walker.currentNode as Text)
    for (const n of nodes) {
      const v = n.nodeValue || ''
      if (!/[–—]/.test(v)) continue
      const next = v.replace(/(\d)\s*–\s*(\d)/g, '$1 to $2').replace(/\s*[–—]\s*/g, ', ').replace(/,\s*,/g, ',')
      if (next !== v) n.nodeValue = next
    }
  })
}

/** Capture Quincer's own starter buttons and typed messages that belong to the interview. */
export function installRoutineInterception(): () => void {
  const onClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null
    const chip = t?.closest?.('.cw-slot-chip') as HTMLElement | null
    if (chip && !chip.closest('.sm-routine-chips') && START_TEXT.test(chip.textContent || '')) {
      e.preventDefault(); e.stopImmediatePropagation(); startLocalInterview('starter_chip'); return
    }
    if (chip && !chip.closest('.sm-routine-chips') && CODE_ASK_TEXT.test(chip.textContent || '')) {
      e.preventDefault(); e.stopImmediatePropagation(); startCodeEntry('starter_chip'); return
    }
    if (chip && !S && !chip.closest('.sm-routine-chips')) logShopperFollowup()
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

/** True when the page handled the typed message. */
function interceptTyped(): boolean {
  const input = document.querySelector('.cw-input') as HTMLInputElement | null
  const text = (input?.value || '').trim()
  if (!input || !text) return false
  const clear = () => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
  if (codeEntry) { clear(); addUser(text); tryCode(text); return true }
  if (!S) {
    if (START_TEXT.test(text)) { clear(); startLocalInterview('typed'); return true }
    if (CODE_ASK_TEXT.test(text)) { clear(); startCodeEntry('typed'); return true }
    if (RED.test(text)) { clear(); addUser(text); say("That needs your doctor to take a look soon; please book that before changing your routine. When you've been seen, I'm happy to build a routine around what they recommend."); return true }
    logShopperFollowup()
    return false
  }
  clear()
  if (typedHandler) { const h = typedHandler; typedHandler = null; h(text); return true }
  // a typed button label counts as tapping it
  const chip = [...(box()?.querySelectorAll('.sm-routine-chips .cw-slot-chip:not([disabled])') || [])]
    .find(c => (c.textContent || '').replace(/^[^A-Za-z0-9]+/, '').trim().toLowerCase() === text.toLowerCase()) as HTMLElement | undefined
  if (chip) { chip.click(); return true }
  addUser(text)
  if (RED.test(text)) {
    say("That needs your doctor to take a look soon; please book that before changing your routine. When you've been seen, I'm happy to build a routine around what they recommend.")
    return true
  }
  if (/^\s*(start over|restart)\s*$/i.test(text)) { logEvent({ kind: 'restart' }); S = null; save(); startLocalInterview('restart'); return true }
  // anything else (a question, a comment) goes to Emma; the current question comes back after
  logEvent({ kind: QUESTIONISH.test(text) ? 'side' : 'unparsed', step: S.step })
  resumeAfterEmma = true
  removeChips()
  w().ChatWidget?.open?.(SIDE_MARK + text)
  // the shopper bubble we added stays; Quincer adds its own copy, so drop ours
  const mine = [...(box()?.querySelectorAll('.cw-msg-user.sm-local') || [])].pop()
  mine?.remove()
  return true
}
