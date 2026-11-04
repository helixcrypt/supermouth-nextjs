/**
 * Emma routine interview, version 2 (SuperMouth's November 2026 prototype).
 *
 * Pure logic, no DOM: the page (lib/routine2/local.ts) asks the questions and calls these
 * functions. One person at a time. The routine is built from what the person already uses,
 * and the steps kept decide the System size. Routine codes (three letters per person) are
 * kept from version 1 so a returning shopper can skip the questions.
 */

export type Age = 'baby' | 'little' | 'big' | 'teen'
export type Tod = 'morning' | 'day' | 'night'
export type Item = 'br' | 'fl' | 'mw' | 'tc' | 'sp' | 'wf'

export interface Person {
  who: 'me' | 'child' | 'adult'
  age: Age
  label: string
  teeth?: 'none' | 'few' | '68' | 'more'
  teething?: boolean
  routineNow: Record<Tod, Item[]>
  other: string[]
  cavities: 'none' | 'recent' | 'risk' | 'unsure'
  concerns: string[]
  ortho: boolean
  pregnant: boolean
  special: string[]
  fluoride: 'f' | 'ff' | 'choose'
  flavor: 'Mint' | 'Strawberry' | 'Vanilla' | 'Chocolate'
  dropped: Item[]
  fromCode?: boolean
}

export const NAMES: Record<Item, string> = { br: 'brushing with toothpaste', fl: 'floss', mw: 'mouthwash', tc: 'tongue cleaner', sp: 'mouth spray', wf: 'water flosser' }
export const TOD_LABEL: Record<Tod, string> = { morning: 'Morning (before breakfast)', day: 'During the day (after meals)', night: 'Night (before bedtime)' }

export function newPerson(who: Person['who']): Person {
  return {
    who, age: who === 'child' ? 'big' : 'teen', label: who === 'me' ? 'You' : who === 'adult' ? 'Family member' : 'Child',
    routineNow: { morning: [], day: [], night: [] }, other: [], cavities: 'none', concerns: [],
    ortho: false, pregnant: false, special: [], fluoride: 'choose', flavor: 'Mint', dropped: [],
  }
}

export const isMe = (p: Person) => p.who === 'me'
export const pronoun = (p: Person) => (isMe(p) ? 'you' : 'they')

// ---------- formula, pathway, size ----------

export function isRisk(p: Person) { return p.cavities === 'recent' || p.cavities === 'risk' }

/** F fluoride, N fluoride-free, O ortho (contains fluoride). */
export function formulaOf(p: Person): 'F' | 'N' | 'O' {
  if (p.age === 'baby') return 'N'                      // the only baby system is fluoride-free
  let f: 'F' | 'N'
  if (p.fluoride === 'f') f = 'F'
  else if (p.fluoride === 'ff') f = 'N'
  else f = (p.ortho && !p.pregnant) || isRisk(p) ? 'F' : 'N'
  if (p.ortho && !p.pregnant && f === 'F') return 'O'
  return f
}

export function formulaName(p: Person) {
  const f = formulaOf(p)
  return f === 'O' ? 'Ortho (with fluoride)' : f === 'F' ? 'Nano-Hydroxyapatite with Fluoride' : 'Nano-Hydroxyapatite Only'
}

export function fluorideNote(p: Person) {
  if (p.age === 'baby') return ''
  if (isRisk(p)) return formulaOf(p) === 'N'
    ? `${isMe(p) ? 'you prefer' : 'they prefer'} fluoride-free, so Hydroxamin® does the enamel work; with recent cavities, mention that to ${isMe(p) ? 'your' : 'their'} doctor`
    : "with recent cavities the fluoride edition is the one I'd choose"
  return 'at low cavity risk the fluoride-free edition is right for most people'
}

export function pathway(p: Person) {
  if (p.pregnant) return 'Pregnancy'
  if (p.ortho) return 'Orthodontics'
  return { baby: 'Babies & Toddlers', little: 'Little Kids', big: 'Big Kids', teen: 'Teens & Adults' }[p.age]
}

// ---------- routine ----------

export interface Step { tod: Tod; text: string; keys: Item[]; reason: string; keep: boolean }

export function steps(p: Person): Step[] {
  const d = p.dropped
  const used = new Set<Item>([...p.routineNow.morning, ...p.routineNow.day, ...p.routineNow.night])
  const S: Step[] = []
  const st = (tod: Tod, text: string, keys: Item[], reason: string) => S.push({ tod, text, keys, reason, keep: keys.some(k => used.has(k)) })
  if (p.age === 'baby') {
    st('morning', 'Brush or wipe the gums and teeth', ['br'], 'twice a day with a parent, from the first tooth')
    if (p.teething) st('day', 'Teether when teething', [], 'soothes gums while teeth come in')
    st('night', 'Brush again before bed', ['br'], 'the night clean matters most')
  } else if (p.age === 'little') {
    if (!d.includes('tc')) st('morning', 'Tongue cleaner, once a day', ['tc'], 'the coating on the tongue is where most bad breath starts; the ice-cream shape makes it a game')
    st('morning', 'Brush, with your help', ['br'], 'two minutes, a parent finishing the job')
    if (!d.includes('sp')) st('day', 'Mouth spray after snacks', ['sp'], 'neutralizes the acid from snacks between brushings, when brushing right away can wear softened enamel')
    st('night', 'Flossers where teeth touch', ['fl'], "cleans between teeth where a brush can't reach, which is where cavities between teeth start")
    st('night', 'Brush before bed', ['br'], 'the night clean matters most')
  } else {
    if (!d.includes('tc')) st('morning', 'Clean your tongue', ['tc'], 'the coating on the tongue is where most bad breath starts, and a toothbrush is made for teeth')
    st('morning', 'Brush', ['br'], 'two minutes, before breakfast')
    if (!d.includes('sp')) st('day', 'Mouth spray after meals', ['sp'], 'acids from food soften enamel for about half an hour, so brushing right after eating can wear it; an alkaline spray neutralizes the acid instead')
    st('night', 'Floss', ['fl'], "cleans the surfaces between teeth a brush can't reach, where most cavities between teeth start")
    st('night', 'Brush', ['br'], '')
    if (!d.includes('mw')) st('night', 'Mouthwash', ['mw'], "alkaline and alcohol-free; reaches between teeth and along the gums, and works overnight when the mouth is driest. Spit, don't rinse")
  }
  return S
}

/** System size from the steps kept. */
export function tierOf(p: Person): 'Complete' | 'Plus' | 'Basic' {
  if (p.age === 'baby') return 'Complete'
  const keys = new Set(steps(p).flatMap(s => s.keys))
  if (p.age === 'little') return keys.has('tc') || keys.has('sp') ? 'Complete' : 'Basic'
  return keys.has('mw') ? 'Complete' : keys.has('tc') || keys.has('sp') ? 'Plus' : 'Basic'
}

/** Smaller sizes than the current one, largest first. */
export function smallerTiers(p: Person): ('Plus' | 'Basic')[] {
  const t = tierOf(p)
  if (p.age === 'baby' || t === 'Basic') return []
  if (p.age === 'little') return ['Basic']
  return t === 'Complete' ? ['Plus', 'Basic'] : ['Basic']
}

export function dropForTier(p: Person, tier: 'Complete' | 'Plus' | 'Basic') {
  const base = p.dropped.filter(k => !['mw', 'tc', 'sp'].includes(k))
  p.dropped = tier === 'Basic' ? [...base, 'mw', 'tc', 'sp'] : tier === 'Plus' ? [...base, 'mw'] : base
}

export const systemName = (p: Person) => `${pathway(p)} ${tierOf(p)} System`

// ---------- products shown with the routine ----------

export interface Prod { key: string; name: string; why: string; tod: Tod; step: string }

export function products(p: Person): Prod[] {
  const kid = p.age === 'little' || p.age === 'big'
  const f = formulaName(p)
  const out: Prod[] = []
  const add = (key: string, name: string, why: string, tod: Tod, step: string) => out.push({ key, name, why, tod, step })
  if (p.age === 'baby') {
    add('br', p.teeth === 'few' || p.teeth === 'none' ? 'Finger brush' : 'Toddler toothbrush', p.teeth === 'few' || p.teeth === 'none' ? 'For the first few teeth' : 'For 6 to 8 teeth and up', 'morning', 'Brush or wipe the gums and teeth')
    add('tp', `Babies & Toddlers toothpaste · ${p.flavor}`, 'Safe if swallowed; fluoride-free at usual risk', 'morning', 'Brush or wipe the gums and teeth')
    if (p.teething) add('te', 'Teether', 'For active teething', 'day', 'Teether when teething')
    return out
  }
  const ss = steps(p)
  const has = (k: Item) => ss.some(s => s.keys.includes(k))
  if (has('tc')) add('tc', kid ? 'Ice-cream tongue cleaner' : 'Tongue cleaner', kid ? 'Single scoop for 2 to 5, double scoop for 6 to 12' : 'Brush on one side to loosen the coating, scraper on the other to lift it off; ten seconds a day', 'morning', ss.find(s => s.keys.includes('tc'))!.text)
  add('br', p.ortho ? 'OrthoBrush, manual' : kid ? 'Kids toothbrush' : 'Manual toothbrush, ultra-soft', p.ortho ? 'Shaped for brackets and wires' : kid ? 'Sized for small mouths' : 'Ultra-soft bristles', 'morning', ss.find(s => s.keys.includes('br'))!.text)
  add('tp', `${kid ? 'Kids toothpaste' : 'Toothpaste'} · ${f}, ${p.flavor}`, `Hydroxamin® nano-hydroxyapatite with D3 and K2 for enamel; ${fluorideNote(p)}`, 'morning', ss.find(s => s.keys.includes('br'))!.text)
  if (has('sp')) add('sp', 'Alkaline mouth spray', 'pH 8.5 with prebiotics; neutralizes acid after meals and freshens without wearing softened enamel', 'day', ss.find(s => s.keys.includes('sp'))!.text)
  add('fl', p.age === 'little' ? 'Superhero flossers' : p.ortho && formulaOf(p) === 'O' ? 'Ortho floss with threader' : 'Expanding floss', p.age === 'little' ? 'Easy for small hands and helping hands' : p.ortho ? 'Built-in threader for under wires' : 'Slips in easily, then expands between teeth', 'night', ss.find(s => s.keys.includes('fl'))!.text)
  if (has('mw')) add('mw', 'Alkaline mouthwash, alcohol-free', "pH 8.5, no alcohol, no burn; once at night, spit, don't rinse", 'night', 'Mouthwash')
  return out
}

// ---------- wording ----------

export function recapText(p: Person, code: string) {
  const w = pronoun(p)
  const are = isMe(p) ? "you're" : "they're"
  const stage = { baby: 'a baby or toddler', little: 'a little kid', big: 'a big kid', teen: p.who === 'child' ? 'a teen' : 'an adult' }[p.age]
  if (p.fromCode) return `Here's what I have from the code: ${are} ${stage}${p.ortho ? ', in braces or aligners' : ''}${p.pregnant ? ', pregnant' : ''}, ${({ F: 'fluoride', N: 'fluoride-free', O: 'ortho (with fluoride)' } as Record<string, string>)[formulaOf(p)]} toothpaste, ${p.flavor} flavor (**${code}**). Is that right?`
  if (p.age === 'baby') {
    const teeth = { none: 'no teeth yet', few: 'a few teeth', '68': '6 to 8 teeth', more: 'more than 8 teeth' }[p.teeth || 'few']
    return `Here's what I heard: ${are} a baby or toddler with ${teeth}${p.teething ? ', teething right now' : ''}. ${p.flavor} flavor. Routine code **${code}**. Did I get that right?`
  }
  const cav = { none: 'no recent cavities', recent: 'recent cavities', risk: 'higher cavity risk', unsure: 'an unsure cavity history' }[p.cavities]
  const con = p.concerns.length ? `want help with ${p.concerns.join(', ').toLowerCase()}` : 'have no particular concerns'
  const rn = p.routineNow
  const used = [...rn.morning, ...rn.day, ...rn.night]
  const now = used.length
    ? `already ${rn.morning.length ? `start the morning with ${rn.morning.map(k => NAMES[k]).join(' then ')}` : ''}${rn.morning.length && rn.night.length ? ' and ' : ''}${rn.night.length ? `end the night with ${rn.night.map(k => NAMES[k]).join(' then ')}` : ''}${!rn.morning.length && !rn.night.length && rn.day.length ? `use ${rn.day.map(k => NAMES[k]).join(' and ')} during the day` : ''}${p.other.length ? `, plus ${p.other.join(' and ')}` : ''}`
    : 'are starting fresh'
  const extra = (p.ortho ? ', in braces or aligners' : '') + (p.pregnant ? ', pregnant' : '') + (p.special.length ? `, with ${p.special.join(' and ')}` : '')
  return `Here's what I heard: ${are} ${stage}${extra}, with ${cav}; ${w} ${con}; and ${w} ${now}. ${p.flavor} flavor. Routine code **${code}**. Did I get that right?`
}

export function routineIntro(p: Person) {
  const kept = [...new Set(steps(p).filter(s => s.keep).flatMap(s => s.keys))].filter(k => k !== 'br')
  const word: Record<string, string> = { fl: 'flossing', mw: 'mouthwash', tc: 'the tongue cleaner', sp: 'the spray' }
  return kept.length
    ? `${isMe(p) ? "You're" : "They're"} already doing the right things with ${kept.map(k => word[k]).join(' and ')}; keep that. Here's the routine I'd build around it, in the order you'd do it, and why each new step matters.`
    : "Here's the routine I'd recommend, in the order you'd do it, and why each step matters."
}

// ---------- routine codes (kept from version 1) ----------

const FLAVOR_LETTER: Record<string, string> = { Mint: 'M', Strawberry: 'S', Chocolate: 'C', Vanilla: 'V' }
const LETTER_FLAVOR: Record<string, Person['flavor']> = { M: 'Mint', S: 'Strawberry', C: 'Chocolate', V: 'Vanilla' }

export function bracketOf(p: Person) {
  if (p.pregnant) return 'P'
  return { baby: 'B', little: 'L', big: 'K', teen: 'A' }[p.age]
}

/** Three letters: stage, formula, flavor (PNxB for pregnant, fluoride-free and in braces). */
export function codeFor(p: Person) {
  const f = formulaOf(p)
  return bracketOf(p) + f + (FLAVOR_LETTER[p.flavor] || 'M') + (p.pregnant && p.ortho && f === 'N' ? 'B' : '')
}

/** Read one or more codes ("AFM KNS"). Returns people, or null for a code that doesn't read. */
export function peopleFromCodes(text: string): Person[] | null {
  const raw = String(text || '').toUpperCase().replace(/[^A-Z]/g, ' ').trim()
  const tokens: string[] = []
  for (const chunk of raw.split(/\s+/).filter(Boolean)) {
    let s = chunk
    while (s.length >= 3) {
      const take = s.length >= 4 && s[0] === 'P' && s[1] === 'N' && s[3] === 'B' ? 4 : 3
      tokens.push(s.slice(0, take)); s = s.slice(take)
    }
    if (s.length) return null
  }
  if (!tokens.length) return null
  const out: Person[] = []
  let adults = 0
  for (const t of tokens) {
    const [b, f, fl, extra] = t.split('')
    if (!'BLKAP'.includes(b) || !'FNO'.includes(f) || !'MSCVX'.includes(fl)) return null
    if (b === 'B' && f !== 'N') return null
    if (b === 'L' && fl === 'M') return null
    if (extra && !(b === 'P' && f === 'N' && extra === 'B')) return null
    const adult = b === 'A' || b === 'P'
    const who: Person['who'] = adult && adults < 2 ? (adults++ === 0 ? 'me' : 'adult') : 'child'
    const p = newPerson(who)
    p.age = b === 'B' ? 'baby' : b === 'L' ? 'little' : b === 'K' ? 'big' : 'teen'
    p.pregnant = b === 'P'
    p.ortho = f === 'O' || extra === 'B'
    p.fluoride = f === 'N' ? 'ff' : 'f'
    p.flavor = LETTER_FLAVOR[fl] || (adult ? 'Mint' : 'Strawberry')
    p.label = who === 'me' ? 'You' : who === 'adult' ? 'Family member' : { baby: 'Baby', little: 'Little one', big: 'Big kid', teen: 'Teen' }[p.age]
    p.fromCode = true
    out.push(p)
  }
  return out
}

// ---------- price ----------

/** Live System price is the one-time price (15% off separate). Subscription is 25% off separate. */
export function priceLines(systemPrice: number) {
  const separate = systemPrice / 0.85
  const sub = separate * 0.75
  return { separate, oneTime: systemPrice, sub, perDayCents: Math.round((sub / 90) * 100) }
}
