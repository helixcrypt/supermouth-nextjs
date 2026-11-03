/**
 * Emma routine interview engine (v2.28 logic, adapted for web).
 *
 * Stateless: the whole interview lives in a short `state` string that the tool
 * returns on every call and Emma passes back on the next one. Nothing is stored.
 *
 * State format:  R1.<mode>.<ctx>.<step>.<idx>.<goal>.<habit>.<members>.<check>
 *   mode   F full | S short
 *   ctx    channel (w web, p phone, d dentist portal) + office flag (0 none, 1 referred), e.g. w0
 *   step   current question key (see STEP below)
 *   idx    member index the step is about
 *   goal   one letter (see GOALS) or -
 *   habit  s solid | r room to build | -
 *   members  member tokens joined by "_" (or "-" when none yet)
 *   check  2-char checksum to catch copy errors
 *
 * Member token (7 chars): role, bracket, braces, formula, flavor, floss, tier
 *   role     M me | T partner | C child
 *   bracket  B baby | L little kid | K big kid | A teen/adult | P pregnant | ? not yet
 *   braces   b yes | - no | ? not asked
 *   formula  F fluoride | N non-fluoride | O ortho | ? not asked
 *            n no preference, awaiting cavities | f/x suggested fluoride/non-fluoride, awaiting confirm
 *            u no lean (not sure about cavities) | c ortho conflict (wants non-fluoride while in braces)
 *   flavor   M mint | S strawberry | C chocolate | V vanilla | X none | ? not asked
 *   floss    L floss | R flossers | - not applicable | ? not asked (ages 2 to 5 only)
 *   tier     0 Complete, 1 next step down, 2 second step down
 */

export type Choice = string
export interface Member {
  role: 'M' | 'T' | 'C'
  bracket: string
  braces: string
  formula: string
  flavor: string
  floss: string
  tier: number
}
export interface State {
  mode: 'F' | 'S'
  channel: 'w' | 'p' | 'd'
  office: boolean
  step: string
  idx: number
  goal: string
  habit: string
  members: Member[]
}

export const GOALS: Record<string, string> = {
  c: 'cavity prevention', s: 'sensitivity', g: 'gum health', w: 'whitening',
  i: 'clean ingredients', b: 'fresh breath',
}
const FLAVOR_NAME: Record<string, string> = { M: 'Mint', S: 'Strawberry', C: 'Chocolate', V: 'Vanilla', X: 'no preference' }
const BRACKET_NAME: Record<string, string> = {
  B: 'baby or toddler (under 2)', L: 'little kid (2 to 5)', K: 'big kid (6 to 12)', A: 'teen or adult', P: 'pregnant',
}
const FORMULA_NAME: Record<string, string> = { F: 'fluoride', N: 'fluoride-free', O: 'ortho (contains fluoride)' }

// ---------- encoding ----------

function checksum(s: string): string {
  let h = 7
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 1296
  return h.toString(36).padStart(2, '0')
}

export function encode(st: State): string {
  const mem = st.members.length
    ? st.members.map(m => m.role + m.bracket + m.braces + m.formula + m.flavor + m.floss + String(m.tier)).join('_')
    : '-'
  const body = ['R1', st.mode, st.channel + (st.office ? '1' : '0'), st.step, String(st.idx), st.goal || '-', st.habit || '-', mem].join('.')
  return body + '.' + checksum(body)
}

export function decode(s: string): State | null {
  if (typeof s !== 'string') return null
  const parts = s.trim().split('.')
  if (parts.length !== 9 || parts[0] !== 'R1') return null
  const body = parts.slice(0, 8).join('.')
  if (checksum(body) !== parts[8]) return null
  const [, mode, ctx, step, idx, goal, habit, mem] = parts
  if (mode !== 'F' && mode !== 'S') return null
  const members: Member[] = mem === '-' ? [] : mem.split('_').map(t => ({
    role: t[0] as Member['role'], bracket: t[1], braces: t[2], formula: t[3], flavor: t[4], floss: t[5], tier: Number(t[6]) || 0,
  }))
  return {
    mode, channel: (ctx[0] as State['channel']) || 'w', office: ctx[1] === '1', step, idx: Number(idx) || 0,
    goal: goal === '-' ? '' : goal, habit: habit === '-' ? '' : habit, members,
  }
}

// ---------- answer parsing ----------

const norm = (a: unknown) => String(a ?? '').toLowerCase().replace(/[^a-z0-9 +]/g, ' ').replace(/\s+/g, ' ').trim()
function pick(answer: unknown, choices: Choice[], synonyms: Record<number, string[]> = {}): number {
  const a = norm(answer)
  if (!a) return -1
  const n = Number(a)
  if (Number.isInteger(n) && n >= 1 && n <= choices.length && a.length <= 2) return n - 1
  for (let i = 0; i < choices.length; i++) if (norm(choices[i]) === a) return i
  const has = (word: string) => new RegExp(`(^| )${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($| |s )`).test(a + ' ') || (word.length > 4 && a.includes(word))
  for (let i = 0; i < choices.length; i++) {
    for (const syn of synonyms[i] || []) if (has(syn)) return i
  }
  for (let i = 0; i < choices.length; i++) if (has(norm(choices[i])) || (a.length >= 4 && norm(choices[i]).startsWith(a))) return i
  return -1
}

export function parseGoal(text: unknown): string {
  const a = norm(text)
  if (/cavit|decay|enamel|strong/.test(a)) return 'c'
  if (/sensitiv/.test(a)) return 's'
  if (/gum|bleed|microbiome/.test(a)) return 'g'
  if (/white|stain|bright/.test(a)) return 'w'
  if (/ingredient|clean|natural|toxic|chemical/.test(a)) return 'i'
  if (/breath|fresh/.test(a)) return 'b'
  return ''
}

// ---------- the question for each step ----------

export interface Question {
  step: string
  about?: string
  ask: string
  choices: Choice[]
  typed?: boolean
  note?: string
}

export function label(st: State, i: number): string {
  const m = st.members[i]
  if (!m) return ''
  if (m.role === 'M') return 'you'
  if (m.role === 'T') return 'your partner'
  const kids = st.members.filter(x => x.role === 'C')
  const k = kids.indexOf(m)
  return kids.length === 1 ? 'your child' : `child ${k + 1}`
}

function flavorChoices(m: Member, more: boolean): Choice[] {
  if (m.bracket === 'L') return ['Strawberry', 'Chocolate', 'Vanilla']
  return more ? ['Chocolate', 'Vanilla', 'Back to Mint or Strawberry'] : ['Mint', 'Strawberry', 'More flavors']
}

export function question(st: State): Question {
  const m = st.members[st.idx]
  const who = label(st, st.idx)
  switch (st.step) {
    case 'goal':
      return { step: 'goal', ask: 'What matters most to you in an oral care routine?', choices: ['Cavity prevention', 'Gum health', 'More options'] }
    case 'goal2':
      return { step: 'goal2', ask: 'Which of these matters most?', choices: ['Sensitivity', 'Whitening', 'More options'] }
    case 'goal3':
      return { step: 'goal3', ask: 'Which of these matters most?', choices: ['Fresh breath', 'Clean ingredients', 'Back to the first ones'] }
    case 'h':
      return { step: 'h', ask: 'Who are we putting a routine together for?', choices: ['Just me', 'Me and a partner', 'Family with kids'] }
    case 'ha':
      return { step: 'ha', ask: 'How many adults are in the house?', choices: ['Just me', 'Two of us'] }
    case 'a':
      return { step: 'a', ask: 'How old is each child? A number for each is perfect, and months for babies.', choices: [], typed: true }
    case 's':
      return { step: 's', about: who, ask: who === 'you' ? 'Are any of these true for you right now?' : `Are any of these true for ${who} right now?`, choices: ['Pregnant', 'Braces or aligners', 'Neither'] }
    case 'sb':
      return { step: 'sb', about: who, ask: 'Braces or aligners too?', choices: ['Yes', 'No'] }
    case 't':
      return { step: 't', about: who, ask: `Does ${who} have braces or aligners?`, choices: ['Yes', 'No'] }
    case 'f':
      return { step: 'f', about: who, ask: `Any preference on toothpaste for ${who}?`, choices: ['Fluoride', 'Fluoride-free', 'No preference'] }
    case 'c':
      return { step: 'c', about: who, ask: who === 'you' ? 'How many cavities have you had in the last two years?' : `How many cavities has ${who} had in the last two years?`, choices: ['0 or 1', '2 or more', 'Not sure'] }
    case 'g': {
      if (m.formula === 'u') return { step: 'g', about: who, ask: 'Both work well. Fluoride helps prevent cavities; the fluoride-free system supports enamel remineralization with nano-HA. Which would you like?', choices: ['Fluoride', 'Fluoride-free', 'Tell me more'] }
      const sugg = suggestionLine(st, m)
      return { step: 'g', about: who, ask: sugg, choices: ['Go with that', 'Show me the other', 'Tell me more'] }
    }
    case 'oc':
      return { step: 'oc', about: who, ask: 'Give the full picture once: the ortho formula does contain fluoride, and it is designed to help prevent decalcification around braces. If fluoride-free is the preference, respect it. Then ask which they want.', choices: ['Stay with ortho', 'Switch to fluoride-free'] }
    case 'v':
      return { step: 'v', about: who, ask: `Which flavor would ${who === 'you' ? 'you' : who} like?`, choices: flavorChoices(m, false) }
    case 'v2':
      return { step: 'v2', about: who, ask: 'Which of these?', choices: flavorChoices(m, true) }
    case 'o':
      return { step: 'o', about: who, ask: `For ${who}, regular floss or easy-grip flossers?`, choices: ['Flossers', 'Floss'] }
    case 'hb':
      return { step: 'hb', ask: 'How is brushing going day to day?', choices: ['Pretty solid', 'Room to build'] }
    case 'r':
      return { step: 'r', ask: 'Read back the record below in plain words, show each routine code in bold, ask them to write the codes down or take a screenshot, then ask if it is right.', choices: ["That's right", 'Change something', 'Start over'] }
    case 'rc': {
      const names = st.members.map((_, i) => label(st, i))
      return names.length <= 3
        ? { step: 'rc', ask: 'Whose answers should we change?', choices: names.map(capitalize) }
        : { step: 'rc', ask: 'Whose answers should we change? (name or number)', choices: [], typed: true, note: names.map((n, i) => `${i + 1}. ${n}`).join('; ') }
    }
    case 'done':
      return { step: 'done', ask: 'Interview complete. Call recommend with this state.', choices: [] }
  }
  return { step: st.step, ask: 'Unknown step.', choices: [] }
}

function suggestionLine(st: State, m: Member): string {
  if (m.bracket === 'P' && m.braces === 'b') return 'Suggest the pregnancy system (fluoride-free), plus ortho tools for braces sold separately (OrthoBrush and ortho mouth spray). Mention the ortho system is the other option and it contains fluoride. Ask which sounds right.'
  if (m.bracket === 'P') return "Use the approved pregnancy line: suggest the SuperMouth pregnancy system (fluoride-free, nano-hydroxyapatite helps remineralize and strengthen enamel), and say staying with fluoride is a fine choice too. Do not say or imply fluoride is unsafe."
  if (m.formula === 'f') return 'Use the approved line: with a few cavities in the last couple of years, fluoride is the usual choice, since it helps prevent cavities; the fluoride-free system is also an option. Ask which sounds right.'
  return 'Use the approved line: their history is good, so the fluoride-free system is a great fit; it supports enamel remineralization with nano-HA; fluoride works well too. Ask which they would like.'
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// ---------- flow ----------

function nextMemberStep(st: State, i: number): [string, number] {
  // first unanswered step for member i, or move on
  for (let j = i; j < st.members.length; j++) {
    const m = st.members[j]
    if (m.bracket === '?') return ['s', j]
    if (m.braces === '?') return [m.bracket === 'P' ? 'sb' : 't', j]
    if (m.formula === '?') return ['f', j]
    if (m.formula === 'n') return ['c', j]
    if (m.formula === 'f' || m.formula === 'x' || m.formula === 'u') return ['g', j]
    if (m.formula === 'c') return ['oc', j]
    if (m.flavor === '?') return ['v', j]
    if (m.floss === '?') return ['o', j]
  }
  if (st.mode === 'F' && !st.goal) return ['goal', 0]
  if (st.mode === 'F' && !st.habit) return ['hb', 0]
  return st.mode === 'S' ? ['done', 0] : ['r', 0]
}

function advance(st: State): State {
  const [step, idx] = nextMemberStep(st, 0)
  st.step = step
  st.idx = idx
  return st
}

function newMember(role: Member['role'], bracket = '?'): Member {
  return { role, bracket, braces: '?', formula: '?', flavor: '?', floss: '-', tier: 0 }
}

function setBracketDefaults(m: Member) {
  if (m.bracket === 'B') { m.braces = '-'; m.formula = 'N' }      // only baby system is fluoride-free
  if (m.bracket === 'L' || m.bracket === 'K') m.braces = '-'      // ortho rule applies 13 and up (open item)
  if (m.bracket === 'L') m.floss = '?'
}

export function bracketForAge(years: number): string {
  if (years < 2) return 'B'
  if (years <= 5) return 'L'
  if (years <= 12) return 'K'
  return 'A'
}

export function parseAges(text: unknown): number[] {
  const s = String(text ?? '').toLowerCase()
  const out: number[] = []
  const re = /(\d+(?:\.\d+)?)\s*(months?|mos?|m\b|weeks?|wks?|years?|yrs?|y\b)?/g
  let mt: RegExpExecArray | null
  while ((mt = re.exec(s))) {
    const n = parseFloat(mt[1])
    const unit = mt[2] || ''
    if (/^m/.test(unit) && !/^my/.test(unit)) out.push(n / 12)
    else if (/^w/.test(unit)) out.push(n / 52)
    else out.push(n)
  }
  if (!out.length && /newborn|infant|baby/.test(s)) out.push(0.5)
  return out.filter(n => n >= 0 && n < 30).slice(0, 8)
}

export interface StepResult {
  ok: boolean
  error?: string
  state: State
  question: Question
}

export function start(opts: { channel?: string; office?: boolean; mode?: string } = {}): State {
  const st: State = {
    mode: opts.mode === 'short' ? 'S' : 'F',
    channel: (['w', 'p', 'd'].includes(String(opts.channel)[0]) ? String(opts.channel)[0] : 'w') as State['channel'],
    office: !!opts.office, step: 'h', idx: 0, goal: '', habit: '', members: [],
  }
  if (st.mode === 'S') st.step = 'goal'
  return st
}

export function setMode(st: State, mode: string): State {
  st.mode = mode === 'short' ? 'S' : 'F'
  if (st.mode === 'S') {
    // short flow: Complete System default, no habits, no recap confirmation
    st.members.forEach(m => { m.tier = 0 })
    if (st.step === 'hb' || st.step === 'r') st.step = 'done'
    if (!st.goal && st.members.length === 0) st.step = 'goal'
  }
  return st
}

export function answer(st: State, raw: unknown, goalText?: unknown): StepResult {
  if (goalText) { const g = parseGoal(goalText); if (g) st.goal = g }
  const q = question(st)
  const m = st.members[st.idx]
  const bad = (msg: string): StepResult => ({ ok: false, error: msg, state: st, question: q })
  const i = pick(raw, q.choices, SYN[st.step] || {})

  if (!norm(raw)) return bad('No answer given. Ask the question and wait for the shopper to reply before calling again.')
  switch (st.step) {
    case 'goal':
    case 'goal2':
    case 'goal3': {
      const picked = i >= 0 ? q.choices[i] : ''
      if (picked === 'More options') { st.step = st.step === 'goal' ? 'goal2' : 'goal3'; return { ok: true, state: st, question: question(st) } }
      if (picked === 'Back to the first ones') { st.step = 'goal'; return { ok: true, state: st, question: question(st) } }
      const g = parseGoal(picked || raw)
      if (!g) return bad('Could not tell the goal. Ask again with the same buttons.')
      st.goal = g
      if (!st.members.length) st.step = 'h'
      else advance(st)
      break
    }
    case 'h':
      if (i < 0) return bad('Answer was not one of the choices.')
      if (i === 0) st.members = [newMember('M')]
      if (i === 1) st.members = [newMember('M'), newMember('T')]
      if (i === 2) { st.members = [newMember('M')]; st.step = 'ha'; return { ok: true, state: st, question: question(st) } }
      advance(st)
      break
    case 'ha':
      if (i < 0) return bad('Answer was not one of the choices.')
      if (i === 1 && !st.members.some(x => x.role === 'T')) st.members.push(newMember('T'))
      st.step = 'a'
      return { ok: true, state: st, question: question(st) }
    case 'a': {
      const ages = parseAges(raw)
      if (!ages.length) return bad('No ages found. Ask for a number for each child.')
      for (const age of ages) {
        const k = newMember('C', bracketForAge(age))
        setBracketDefaults(k)
        st.members.push(k)
      }
      advance(st)
      break
    }
    case 's':
      if (i < 0) return bad('Answer was not one of the choices.')
      if (i === 0) { m.bracket = 'P'; m.braces = '?' }
      if (i === 1) { m.bracket = 'A'; m.braces = 'b' }
      if (i === 2) { m.bracket = 'A'; m.braces = '-' }
      advance(st)
      break
    case 'sb':
    case 't':
      if (i < 0) return bad('Answer was not one of the choices.')
      m.braces = i === 0 ? 'b' : '-'
      advance(st)
      break
    case 'f':
      if (i < 0) return bad('Answer was not one of the choices.')
      if (m.braces === 'b' && m.bracket !== 'P') {
        // ortho rules: fluoride or no preference -> ortho; fluoride-free -> conflict script
        m.formula = i === 1 ? 'c' : 'O'
      } else if (m.bracket === 'P') {
        // pregnancy: stated preference honored; no preference -> suggest the pregnancy system
        m.formula = i === 0 ? (m.braces === 'b' ? 'O' : 'F') : i === 1 ? 'N' : (st.mode === 'S' ? 'N' : 'x')
      } else {
        m.formula = i === 0 ? 'F' : i === 1 ? 'N' : 'n'
      }
      advance(st)
      break
    case 'c': {
      // a bare number is a cavity count, not a button number
      const num = /^\d+$/.test(norm(raw)) ? parseInt(norm(raw), 10) : NaN
      const ci = Number.isNaN(num) ? i : (num >= 2 ? 1 : 0)
      if (ci < 0) return bad('Answer was not one of the choices.')
      if (st.mode === 'S') m.formula = ci === 1 ? 'F' : ci === 0 ? 'N' : 'u'
      else m.formula = ci === 1 ? 'f' : ci === 0 ? 'x' : 'u'
      advance(st)
      break
    }
    case 'g':
      if (i < 0) return bad('Answer was not one of the choices.')
      if (m.formula === 'u') {
        if (i === 2) return { ok: true, state: st, question: { ...q, note: 'Explain both options briefly from the knowledge base, then ask again with the same buttons.' } }
        m.formula = i === 0 ? 'F' : 'N'
      } else {
        if (i === 2) return { ok: true, state: st, question: { ...q, note: 'Explain the suggested option and the alternative briefly, then ask again with the same buttons.' } }
        const suggested = m.formula === 'f' ? 'F' : 'N'
        const other = suggested === 'F' ? 'N' : 'F'
        let f = i === 0 ? suggested : other
        if (m.bracket === 'P' && m.braces === 'b' && f === 'F') f = 'O'
        m.formula = f
      }
      advance(st)
      break
    case 'oc':
      if (i < 0) return bad('Answer was not one of the choices.')
      m.formula = i === 0 ? 'O' : 'N'
      if (m.formula === 'N') m.braces = '-'   // standard fluoride-free system
      advance(st)
      break
    case 'v': {
      const ch = flavorChoices(m, false)
      const a = norm(raw)
      if (/any|no pref|doesn t matter|whatever|surprise/.test(a)) { m.flavor = defaultFlavor(m); advance(st); break }
      const direct = flavorFromText(a, m)
      if (direct) { m.flavor = direct; advance(st); break }
      if (i < 0) return bad('Answer was not one of the choices.')
      if (ch[i] === 'More flavors') { st.step = 'v2'; return { ok: true, state: st, question: question(st) } }
      m.flavor = ch[i][0]
      advance(st)
      break
    }
    case 'v2': {
      // "Back to Mint or Strawberry" names flavors, so check it before reading a flavor from the text
      if (i === 2) { st.step = 'v'; return { ok: true, state: st, question: question(st) } }
      const direct = flavorFromText(norm(raw), m)
      if (direct) { m.flavor = direct; advance(st); break }
      if (i < 0) return bad('Answer was not one of the choices.')
      if (i === 2) { st.step = 'v'; return { ok: true, state: st, question: question(st) } }
      m.flavor = i === 0 ? 'C' : 'V'
      advance(st)
      break
    }
    case 'o':
      if (i < 0) return bad('Answer was not one of the choices.')
      m.floss = i === 0 ? 'R' : 'L'
      advance(st)
      break
    case 'hb':
      if (i < 0) return bad('Answer was not one of the choices.')
      st.habit = i === 0 ? 's' : 'r'
      st.step = 'r'
      break
    case 'r':
      if (i < 0) return bad('Answer was not one of the choices.')
      if (i === 0) st.step = 'done'
      if (i === 1) {
        if (st.members.length === 1) { resetMember(st.members[0]); advance(st) }
        else st.step = 'rc'
      }
      if (i === 2) return { ok: true, state: start({ channel: st.channel, office: st.office }), question: question(start()) }
      break
    case 'rc': {
      const names = st.members.map((_, j) => label(st, j))
      let j = pick(raw, names.map(capitalize))
      if (j < 0) { const n = parseInt(norm(raw), 10); if (n >= 1 && n <= names.length) j = n - 1 }
      if (j < 0) return bad('Could not tell which person. Ask again.')
      resetMember(st.members[j])
      advance(st)
      break
    }
    case 'done':
      return bad('Interview is complete. Call recommend.')
  }
  return { ok: true, state: st, question: question(st) }
}

function resetMember(m: Member) {
  const keepBracket = m.role === 'C' ? m.bracket : '?'
  Object.assign(m, newMember(m.role, keepBracket))
  if (m.role === 'C') setBracketDefaults(m)
}

function defaultFlavor(m: Member): string {
  if (m.bracket === 'L' || m.bracket === 'K' || m.bracket === 'B') return 'S'
  return 'M'
}

function flavorFromText(a: string, m: Member): string {
  const allowed = m.bracket === 'L' ? 'SCV' : 'MSCV'
  const map: [RegExp, string][] = [[/mint/, 'M'], [/straw/, 'S'], [/choc/, 'C'], [/vanil/, 'V']]
  for (const [re, f] of map) if (re.test(a) && allowed.includes(f)) return f
  return ''
}

const SYN: Record<string, Record<number, string[]>> = {
  h: { 0: ['just me', 'only me', 'myself', 'me only'], 1: ['partner', 'spouse', 'husband', 'wife', 'two of us', 'couple'], 2: ['kids', 'children', 'family', 'son', 'daughter'] },
  ha: { 0: ['one', 'just me', 'single', 'only me'], 1: ['two', 'both', 'partner', 'spouse'] },
  s: { 0: ['pregnan', 'expecting'], 1: ['brace', 'aligner', 'invisalign', 'ortho'], 2: ['neither', 'none', 'no', 'nope'] },
  sb: { 0: ['yes', 'yep', 'yeah'], 1: ['no', 'nope'] },
  t: { 0: ['yes', 'yep', 'yeah'], 1: ['no', 'nope'] },
  f: { 0: ['with fluoride', 'fluoride please'], 1: ['free', 'non fluoride', 'no fluoride', 'without', 'natural', 'hydroxyapatite'], 2: ['no pref', 'either', 'not sure', 'don t know', 'whatever', 'recommend', 'unsure'] },
  c: { 0: ['none', 'zero', 'one', '0', '1', 'no cavit'], 1: ['two', 'three', 'several', 'many', 'lots', 'few', '2', '3', '4'], 2: ['not sure', 'don t know', 'unsure', 'no idea'] },
  g: { 0: ['go with', 'sounds good', 'yes', 'ok', 'sure', 'that one'], 1: ['other', 'instead', 'switch'], 2: ['more', 'explain', 'why', 'tell me'] },
  oc: { 0: ['stay', 'ortho', 'keep'], 1: ['switch', 'free', 'non fluoride', 'no fluoride'] },
  o: { 0: ['flosser', 'pick', 'easy'], 1: ['regular', 'string', 'floss'] },
  hb: { 0: ['solid', 'good', 'great', 'fine', 'twice'], 1: ['room', 'build', 'hit or miss', 'struggle', 'not great', 'bad', 'improve'] },
  r: { 0: ['right', 'correct', 'yes', 'looks good', 'perfect'], 1: ['change', 'fix', 'wrong', 'edit'], 2: ['start over', 'restart', 'reset'] },
}

// ---------- routine code ----------

export function codeFor(m: Member): string {
  const f = m.formula
  if (!'FNO'.includes(f) || m.bracket === '?' || m.flavor === '?') return ''
  return m.bracket + f + m.flavor + (m.bracket === 'P' && f === 'N' && m.braces === 'b' ? 'B' : '')
}

export function readCodes(text: unknown): { members: Member[]; errors: string[] } {
  const raw = String(text ?? '').toUpperCase().replace(/[^A-Z]/g, ' ').trim()
  const tokens: string[] = []
  for (const chunk of raw.split(/\s+/).filter(Boolean)) {
    let s = chunk
    while (s.length >= 3) {
      const take = s.length >= 4 && s[0] === 'P' && s[1] === 'N' && s[3] === 'B' ? 4 : 3
      tokens.push(s.slice(0, take))
      s = s.slice(take)
    }
    if (s.length) tokens.push(s)
  }
  const members: Member[] = []
  const errors: string[] = []
  let adults = 0
  for (const t of tokens) {
    const [b, f, fl, extra] = t.split('')
    const okB = 'BLKAP'.includes(b || '')
    const okF = 'FNO'.includes(f || '')
    const okFl = 'MSCVX'.includes(fl || '')
    let err = ''
    if (t.length < 3 || !okB || !okF || !okFl) err = 'not a routine code'
    else if (b === 'B' && f !== 'N') err = 'baby systems are fluoride-free only (BN)'
    else if (f === 'O' && b !== 'A') err = 'ortho is for teens and adults (AO)'
    else if (b === 'L' && fl === 'M') err = 'mint is not offered for ages 2 to 5'
    else if (extra && !(b === 'P' && f === 'N' && extra === 'B')) err = 'unexpected extra letter'
    if (err) { errors.push(`${t}: ${err}`); continue }
    const isAdult = b === 'A' || b === 'P'
    const role: Member['role'] = isAdult && adults < 2 ? (adults++ === 0 ? 'M' : 'T') : 'C'
    const m: Member = {
      role, bracket: b, braces: f === 'O' || extra === 'B' ? 'b' : '-', formula: f,
      flavor: fl === 'X' ? (b === 'A' || b === 'P' ? 'M' : 'S') : fl, floss: b === 'L' ? 'R' : '-', tier: 0,
    }
    members.push(m)
  }
  if (!tokens.length) errors.push('no code found')
  return { members, errors }
}

// ---------- plain-words record ----------

export function record(st: State) {
  return st.members.map((m, i) => ({
    person: label(st, i),
    stage: BRACKET_NAME[m.bracket] || 'not asked yet',
    braces: m.braces === 'b' ? 'yes' : m.braces === '-' ? 'no' : 'not asked yet',
    formula: FORMULA_NAME[m.formula] || (m.formula === '?' ? 'not asked yet' : 'deciding'),
    flavor: FLAVOR_NAME[m.flavor] || 'not asked yet',
    floss: m.floss === 'R' ? 'flossers' : m.floss === 'L' ? 'floss' : undefined,
    code: codeFor(m) || undefined,
  }))
}
