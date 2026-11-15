/**
 * 200 simulated shoppers through Emma's routine interview (version 2), scored against the rules.
 *
 * Each shopper answers the same questions the page asks (lib/routine-local.ts), in the same
 * order, and the page's own engine (lib/routine2/engine.ts) builds the routine, products,
 * size and code. The System comes from the live site's /api/routine-system, as in the chat.
 * Every result is checked against an answer key written separately from the engine.
 *
 * Run: npx tsx scripts/sim_routine200.ts [count] [seed]   (writes scripts/out/sim_routine200.json and .csv)
 */
import * as fs from 'fs'
import {
  Person, Item, Tod, newPerson, steps, products, tierOf, smallerTiers, dropForTier, codeFor, peopleFromCodes,
  pathway, formulaOf, recapText, priceLines,
} from '../lib/routine2/engine'

const SITE = process.env.SITE || 'https://www.gregorypatterson.com'
const N = Number(process.argv[2] || 200)
let seed = Number(process.argv[3] || 20261115)
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 }
const pick = <T,>(xs: T[], w?: number[]): T => {
  if (!w) return xs[Math.floor(rnd() * xs.length)]
  const t = w.reduce((a, b) => a + b, 0); let r = rnd() * t
  for (let i = 0; i < xs.length; i++) { r -= w[i]; if (r <= 0) return xs[i] }
  return xs[xs.length - 1]
}
const chance = (p: number) => rnd() < p

// ---------- shoppers, answering in the page's order ----------

interface Run {
  id: number; kind: 'interview' | 'code'; story: string; p: Person
  smaller?: 'Plus' | 'Basic' | null; simplified?: string
}

function someItems(pool: Item[], p: number): Item[] {
  return pool.filter(() => chance(p)).sort(() => rnd() - 0.5)
}

function shopper(id: number): Run {
  const who = pick<Person['who']>(['me', 'child', 'adult'], [45, 40, 15])
  const p = newPerson(who)
  const bits: string[] = [who]
  if (who === 'child') {
    p.age = pick<Person['age']>(['baby', 'little', 'big', 'teen'], [20, 30, 30, 20])
    if (p.age === 'little' && p.flavor === 'Mint') p.flavor = 'Strawberry'   // the page does this on the age answer
  }
  bits.push(p.age)
  if (p.age === 'baby') {
    p.teeth = pick(['none', 'few', '68', 'more'])
    p.teething = chance(0.5)
    p.flavor = pick(['Strawberry', 'Vanilla', 'Chocolate'])
    bits.push(`teeth ${p.teeth}`, p.teething ? 'teething' : 'not teething', p.flavor)
    return { id, kind: 'interview', story: bits.join(', '), p }
  }
  // what they use now (the page asks morning, day, night)
  p.routineNow.morning = someItems(['br', 'fl', 'mw', 'tc'], 0.45); if (chance(0.8) && !p.routineNow.morning.includes('br')) p.routineNow.morning.unshift('br')
  p.routineNow.day = someItems(['sp', 'mw', 'fl'], 0.15)
  p.routineNow.night = someItems(['br', 'fl', 'mw', 'wf'], 0.45); if (chance(0.7) && !p.routineNow.night.includes('br')) p.routineNow.night.push('br')
  if (chance(0.05)) p.other.push('a rinse from the dentist')
  p.cavities = pick<Person['cavities']>(['none', 'recent', 'risk', 'unsure'], [45, 25, 15, 15])
  p.concerns = ['Sensitivity', 'Bleeding gums', 'Dry mouth', 'Bad breath', 'Staining'].filter(() => chance(0.2))
  // special considerations: braces, aligners; pregnancy only offered to teens/adults
  // the page offers braces and aligners from age 6 up
  const braces = p.age !== 'little' && chance(0.25)
  const aligners = p.age !== 'little' && !braces && chance(0.08)
  p.ortho = braces || aligners
  p.pregnant = p.age === 'teen' && who !== 'child' && chance(0.18)
  if (chance(0.04)) p.special.push('an implant')
  p.fluoride = pick<Person['fluoride']>(['f', 'ff', 'choose'], [30, 30, 40])
  p.flavor = p.age === 'little' ? pick(['Strawberry', 'Vanilla', 'Chocolate']) : pick(['Mint', 'Strawberry', 'Vanilla', 'Chocolate'], [55, 15, 15, 15])
  bits.push(p.cavities + ' cavities', braces ? 'braces' : aligners ? 'aligners' : '', p.pregnant ? 'pregnant' : '', `fluoride:${p.fluoride}`, p.flavor)
  // "Does that feel manageable?" Not quite, drop some extras
  let simplified: string | undefined
  if (chance(0.2)) {
    const opts = steps(p).filter(s => s.keys.some(k => ['tc', 'sp', 'mw'].includes(k))).map(s => s.keys[0])
    const drop = opts.filter(() => chance(0.5)) as Item[]
    if (drop.length) { p.dropped = [...new Set([...p.dropped, ...drop])]; simplified = drop.join('+') }
    else if (opts.length) { p.dropped = [...new Set([...p.dropped, ...(opts as Item[])])]; simplified = 'lighter version' }
  }
  // "Show me a smaller option"
  let smaller: Run['smaller'] = null
  if (chance(0.15)) { const t = smallerTiers(p); if (t.length) { smaller = pick(t); dropForTier(p, smaller) } }
  if (simplified) bits.push(`dropped ${simplified}`)
  if (smaller) bits.push(`chose ${smaller}`)
  return { id, kind: 'interview', story: bits.filter(Boolean).join(', '), p, smaller, simplified }
}

// ---------- answer key (written from the rules, not from the engine) ----------

const STAGE_WORDS: Record<string, RegExp> = {
  'Babies & Toddlers': /teething|24 months/i,
  'Little Kids': /2 to 5/i,
  'Big Kids': /6 to 12/i,
  'Teens & Adults': /teens?|adults|13/i,
  Pregnancy: /pregnan/i,
  Orthodontics: /ortho/i,
}

function expectedFormula(p: Person): 'F' | 'N' | 'O' {
  if (p.age === 'baby') return 'N'
  const risk = p.cavities === 'recent' || p.cavities === 'risk'
  let fl: boolean
  if (p.fluoride === 'f') fl = true
  else if (p.fluoride === 'ff') fl = false
  else fl = p.ortho || risk                     // braces get fluoride (pregnant included, Kami Nov 4); risk gets fluoride
  if (p.ortho && fl) return 'O'
  return fl ? 'F' : 'N'
}
function expectedPathway(p: Person) {
  const f = expectedFormula(p)
  if (p.pregnant && f === 'N') return 'Pregnancy'   // pregnant + fluoride gets the adult fluoride System (spec)
  if (p.ortho && f === 'O') return 'Orthodontics'   // the Ortho System has fluoride; fluoride-free braces get their stage's System + OrthoBrush (rule 7)
  return { baby: 'Babies & Toddlers', little: 'Little Kids', big: 'Big Kids', teen: 'Teens & Adults' }[p.age]
}

interface Check { rule: string; ok: boolean; note?: string }

function score(r: Run, sys: any): Check[] {
  const p = r.p, C: Check[] = []
  const add = (rule: string, ok: boolean, note = '') => C.push({ rule, ok, note: ok ? '' : note })
  const f = formulaOf(p), path = pathway(p), tier = tierOf(p), code = codeFor(p)
  const ss = steps(p), keys = new Set(ss.flatMap(s => s.keys)), prods = products(p), pk = new Set(prods.map(x => x.key))

  add('Fluoride choice', f === expectedFormula(p), `got ${f}, expected ${expectedFormula(p)}`)
  add('Pathway', path === expectedPathway(p), `got ${path}, expected ${expectedPathway(p)}`)
  if (p.age === 'baby' || p.age === 'little') add('No mouthwash under 6', !keys.has('mw') && !pk.has('mw'), 'mouthwash in routine or products')
  if (p.age === 'baby') {
    add('Baby: no floss, spray or tongue cleaner', !['fl', 'sp', 'tc'].some(k => keys.has(k as Item) || pk.has(k)), [...keys].join(','))
    add('Teether only when teething', pk.has('te') === !!p.teething, `teether ${pk.has('te')}, teething ${p.teething}`)
  }
  if (p.age === 'little' || p.age === 'baby') add('No Mint for under 6', p.flavor !== 'Mint', 'Mint chosen for a young child')
  if (p.age === 'little' || p.age === 'baby') add('No braces System under 6', pathway(p) !== 'Orthodontics', 'Ortho System for a young child')
  // size follows the steps kept
  const want = p.age === 'baby' ? 'Complete'
    : p.age === 'little' ? (keys.has('tc') || keys.has('sp') ? 'Complete' : 'Basic')
    : keys.has('mw') ? 'Complete' : keys.has('tc') || keys.has('sp') ? 'Plus' : 'Basic'
  add('Size matches the routine', tier === want, `got ${tier}, expected ${want}`)
  if (p.age === 'little') add('Ages 2 to 5 has no Plus', tier !== 'Plus', 'Plus for a little kid')
  if (r.smaller) add('Smaller choice honored', tier === r.smaller, `asked ${r.smaller}, got ${tier}`)
  // braces products
  if (p.ortho && p.age !== 'baby') {
    add('Braces: OrthoBrush', prods.some(x => /OrthoBrush/.test(x.name)), 'no OrthoBrush')
    add('Braces: floss matches formula', f === 'O' ? prods.some(x => /Ortho floss/.test(x.name)) : !prods.some(x => /Ortho floss/.test(x.name)), `formula ${f}`)
  }
  // code round trip
  const back = peopleFromCodes(code)?.[0]
  add('Routine code reads back', !!back && formulaOf(back) === f && pathway(back) === path && back.flavor === p.flavor && back.ortho === p.ortho && back.pregnant === p.pregnant, `code ${code}`)
  if (p.ortho && f === 'N') add('Braces kept in the code', code.endsWith('B'), `code ${code}`)
  // recap says what matters
  const rc = recapText(p, code)
  add('Recap: flavor and code', rc.includes(p.flavor) && rc.includes(code), 'missing flavor or code')
  if (p.ortho) add('Recap: braces', /braces or aligners/.test(rc), 'braces not in recap')
  if (p.pregnant) add('Recap: pregnancy', /pregnant/.test(rc), 'pregnancy not in recap')
  // live System
  if (!sys || sys.error) { add('System found', false, sys?.error || 'no answer'); return C }
  add('System found', true)
  const t = String(sys.title || '')
  add('System stage', STAGE_WORDS[path].test(t), `${path} vs "${t}"`)
  const ff = /non[\s-]*fluoride|fluoride[\s-]*free|hydroxamin only|-only|only system/i.test(t)
  const wf = /with fluoride|w\/ fluoride|w fluoride|\bfluoride system/i.test(t) && !ff
  if (path === 'Orthodontics') add('System formula', f === 'O' || !/ortho/i.test(t), `formula ${f}, "${t}"`)
  else if (path === 'Pregnancy' || path === 'Babies & Toddlers') add('System formula', !wf, `"${t}" should be fluoride-free`)
  else add('System formula', f === 'N' ? ff || !wf : wf || !ff, `formula ${f}, "${t}"`)
  add('System size', sys.tier === tier || !!sys.substituted || sys.tier !== sys.asked, `wanted ${tier}, got ${sys.tier}`)
  if (sys.tier !== tier) add('Size change explained', sys.tier !== sys.asked || !!sys.substituted, 'silent size change')
  const sf = String(sys.flavor || '')
  add('System flavor', !sf || sf.toLowerCase().includes(p.flavor.toLowerCase()) || !!sys.substituted, `chose ${p.flavor}, System ${sf}`)
  const price = Number(sys.price)
  add('Price shown', price > 0, `price ${sys.price}`)
  if (price > 0) { const pl = priceLines(price); add('Price math', Math.abs(pl.separate * 0.85 - price) < 0.01, 'separate x 0.85 != price') }
  return C
}

// ---------- returning shoppers with codes ----------

function codeRun(id: number, from: Run): Run {
  const back = peopleFromCodes(codeFor(from.p))![0]
  back.routineNow = { morning: ['br'], day: [], night: ['fl', 'br', ...(back.age === 'teen' ? ['mw' as Item] : [])] }
  return { id, kind: 'code', story: `returning with code ${codeFor(from.p)}`, p: back }
}

// ---------- run ----------

async function systems(list: { code: string; tier: string }[]) {
  const out: any[] = []
  for (let i = 0; i < list.length; i += 8) {
    const r = await fetch(`${SITE}/api/routine-system`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ people: list.slice(i, i + 8) }) })
    const j: any = await r.json()
    out.push(...(j.people || []))
  }
  return out
}

;(async () => {
  const runs: Run[] = []
  const nInterview = Math.round(N * 0.9)
  for (let i = 1; i <= nInterview; i++) runs.push(shopper(i))
  for (let i = nInterview + 1; i <= N; i++) runs.push(codeRun(i, runs[Math.floor(rnd() * nInterview)]))
  const sys = await systems(runs.map(r => ({ code: codeFor(r.p), tier: tierOf(r.p) })))
  const rows = runs.map((r, i) => {
    const checks = score(r, sys[i])
    const failed = checks.filter(c => !c.ok)
    return { id: r.id, kind: r.kind, story: r.story, code: codeFor(r.p), pathway: pathway(r.p), tier: tierOf(r.p), system: sys[i]?.title || sys[i]?.error, systemTier: sys[i]?.tier, systemFlavor: sys[i]?.flavor, price: sys[i]?.price, substituted: sys[i]?.substituted || '', checks: checks.length, passed: checks.length - failed.length, failed: failed.map(c => `${c.rule}: ${c.note}`) }
  })
  fs.mkdirSync('scripts/out', { recursive: true })
  fs.writeFileSync('scripts/out/sim_routine200.json', JSON.stringify(rows, null, 1))
  const q = (s: any) => `"${String(s ?? '').replace(/"/g, '""')}"`
  fs.writeFileSync('scripts/out/sim_routine200.csv', ['id,kind,story,code,pathway,tier,system,system_tier,system_flavor,price,substituted,checks,passed,failed']
    .concat(rows.map(r => [r.id, r.kind, q(r.story), r.code, q(r.pathway), r.tier, q(r.system), r.systemTier, q(r.systemFlavor), r.price, q(r.substituted), r.checks, r.passed, q(r.failed.join(' | '))].join(','))).join('\n'))
  // summary
  const allChecks = rows.reduce((a, r) => a + r.checks, 0), allPassed = rows.reduce((a, r) => a + r.passed, 0)
  const clean = rows.filter(r => !r.failed.length).length
  const byRule: Record<string, number> = {}
  rows.forEach(r => r.failed.forEach(f => { const k = f.split(':')[0]; byRule[k] = (byRule[k] || 0) + 1 }))
  const tally = (k: keyof typeof rows[0]) => rows.reduce((a: Record<string, number>, r) => { const v = String(r[k]); a[v] = (a[v] || 0) + 1; return a }, {})
  console.log(JSON.stringify({ runs: rows.length, cleanRuns: clean, checks: allChecks, passed: allPassed, failuresByRule: byRule, pathways: tally('pathway'), tiers: tally('tier'), substituted: rows.filter(r => r.substituted).length }, null, 1))
  rows.filter(r => r.failed.length).slice(0, 40).forEach(r => console.log(`#${r.id} [${r.code} ${r.tier}] ${r.story}\n   System: ${r.system} (${r.systemTier}, ${r.systemFlavor})\n   ${r.failed.join('\n   ')}`))
})()
