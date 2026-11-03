// Run: npx --yes tsx scripts/test_routine.ts
import { start, answer, encode, decode, setMode, readCodes, codeFor, question, State } from '../lib/routine/engine'
import { recommend, stepDown } from '../lib/routine/recommend'

let pass = 0, fail = 0
function check(name: string, cond: boolean, detail = '') {
  if (cond) { pass++; console.log('PASS', name) } else { fail++; console.log('FAIL', name, detail) }
}

/** Play a list of answers, round-tripping the state string each turn like Emma would. */
function play(answers: string[], opts: any = {}): { st: State; steps: string[]; buttons: string[][] } {
  let s = encode(start(opts))
  const steps: string[] = [], buttons: string[][] = []
  for (const a of answers) {
    const st = decode(s)!
    const q = question(st)
    steps.push(q.step); buttons.push(q.choices)
    const r = answer(st, a)
    if (!r.ok) throw new Error(`step ${q.step} rejected "${a}": ${r.error}`)
    s = encode(r.state)
  }
  return { st: decode(s)!, steps, buttons }
}

async function main() {
  // 1 Adult, fluoride, mint
  {
    const { st, steps } = play(['Just me', 'Neither', 'Fluoride', 'Mint', 'clean ingredients', 'Pretty solid', "That's right"])
    check('1 code AFM', codeFor(st.members[0]) === 'AFM', codeFor(st.members[0]))
    check('1 step order', steps.join(',') === 'h,s,f,v,goal,hb,r', steps.join(','))
    const rec = await recommend(st)
    check('1 complete system', /Teens & Adults - Complete/.test(rec.people[0].system || ''), rec.people[0].system || '')
    check('1 goal', rec.goal === 'clean ingredients', String(rec.goal))
  }
  // 2 Pregnant, no preference -> suggestion -> Go with that
  {
    const { st, steps } = play(['Just me', 'Pregnant', 'No', 'No preference', 'Go with that', 'Strawberry', 'gums', 'Room to build', "That's right"])
    check('2 code PNS', codeFor(st.members[0]) === 'PNS', codeFor(st.members[0]))
    check('2 no cavity question for pregnancy', !steps.includes('c'), steps.join(','))
    const rec = await recommend(st)
    check('2 pregnancy system', /Pregnancy System/.test(rec.people[0].system || ''), rec.people[0].system || '')
  }
  // 2b Pregnant, no preference -> Show me the other -> fluoride adult system
  {
    const { st } = play(['Just me', 'Pregnant', 'No', 'No preference', 'Show me the other', 'Mint', 'x', 'Pretty solid', "That's right"])
    check('2b code PFM', codeFor(st.members[0]) === 'PFM', codeFor(st.members[0]))
    const rec = await recommend(st)
    check('2b adult fluoride system', /with Fluoride System for Teens & Adults/.test(rec.people[0].system || ''), rec.people[0].system || '')
  }
  // 3 Pregnant and braces, no preference -> pregnancy system + ortho add-ons
  {
    const { st } = play(['Just me', 'Pregnant', 'Yes', 'No preference', 'Go with that', 'Vanilla', 'cavities', 'Pretty solid', "That's right"])
    check('3 code PNVB', codeFor(st.members[0]) === 'PNVB', codeFor(st.members[0]))
    const rec = await recommend(st)
    const p = rec.people[0]
    check('3 pregnancy system', /Pregnancy System/.test(p.system || ''), p.system || '')
    check('3 add-ons brush and spray', p.addons.length === 2, JSON.stringify(p.addons.map((a: any) => a.title)))
    check('3 optional fluoride floss', p.optional_addons.length === 1 && /Ortho Floss/.test((p.optional_addons[0] as any).title), JSON.stringify(p.optional_addons))
  }
  // 4 Family: adult, 4-year-old, 8-year-old
  {
    const { st, buttons, steps } = play(['Family with kids', 'Just me', '4 and 8', 'Neither', 'Fluoride-free', 'Mint', 'Fluoride', 'Chocolate', 'Flossers', 'No preference', '2 or more', 'Go with that', 'Strawberry', 'whitening', 'Pretty solid', "That's right"])
    const codes = st.members.map(codeFor).join(' ')
    check('4 codes', codes === 'ANM LFC KFS', codes)
    const flavorBtns = buttons[steps.indexOf('v', 6)]
    check('4 no mint for 4-year-old', flavorBtns && !flavorBtns.includes('Mint'), JSON.stringify(flavorBtns))
    check('4 floss question only for 2 to 5', steps.filter(s => s === 'o').length === 1, steps.join(','))
    check('4 max 3 buttons everywhere', buttons.every(b => b.length <= 3))
    const rec = await recommend(st)
    check('4 three systems', rec.people.filter(p => p.system).length === 3, JSON.stringify(rec.people.map(p => p.system)))
    check('4 flossers variant', rec.people[1].floss === 'Flossers', String(rec.people[1].floss))
    check('4 discounts once, no office', rec.family_discounts.office === null && rec.family_discounts.free_shipping === true)
  }
  // 5 No preference, 2 or more cavities -> fluoride suggested with choice
  {
    const { st, steps, buttons } = play(['Just me', 'Neither', 'No preference', '3', 'Go with that', 'Mint', 'cavity', 'Pretty solid', "That's right"])
    check('5 fluoride from 3 cavities', codeFor(st.members[0]) === 'AFM', codeFor(st.members[0]))
    check('5 suggestion buttons', JSON.stringify(buttons[steps.indexOf('g')]) === JSON.stringify(['Go with that', 'Show me the other', 'Tell me more']))
  }
  // 6 Step-down for one child only, max 2
  {
    const { st } = play(['Family with kids', 'Two of us', '9', 'Neither', 'Fluoride', 'Mint', 'Neither', 'Fluoride', 'Mint', 'Fluoride-free', 'Vanilla', 'breath', 'Pretty solid', "That's right"])
    const a = await stepDown(st, 2)
    const b = await stepDown(st, 2)
    const c = await stepDown(st, 2)
    check('6 first step-down', a.ok && !(a as any).limit_reached, JSON.stringify(a))
    check('6 second step-down', b.ok && !(b as any).limit_reached, JSON.stringify(b))
    check('6 third refused', (c as any).limit_reached === true, JSON.stringify(c))
    check('6 adults untouched', st.members[0].tier === 0 && st.members[1].tier === 0)
  }
  // 7 Side question: a non-answer is rejected and the same step stays
  {
    const st = decode(encode(start()))!
    answer(st, 'Just me')
    const r = answer(st, 'is nano-hydroxyapatite safe?')
    check('7 side question keeps step', !r.ok && r.question.step === 's', JSON.stringify(r.question.step))
  }
  // 8 Return with a code
  {
    const { members, errors } = readCodes('AFM kns')
    check('8 reads two codes', members.length === 2 && !errors.length, JSON.stringify(errors))
    const fam = readCodes('AFMKNSLNC')
    check('8 reads run-together codes', fam.members.map(codeFor).join(' ') === 'AFM KNS LNC', fam.members.map(codeFor).join(' '))
    const preg = readCodes('PNVB')
    check('8 pregnancy braces code', codeFor(preg.members[0]) === 'PNVB')
  }
  // 9 Bad code
  {
    const r = readCodes('ZZZ')
    check('9 bad code rejected', r.members.length === 0 && r.errors.length === 1, JSON.stringify(r))
    check('9 baby fluoride rejected', readCodes('BFM').members.length === 0)
    check('9 mint for 2 to 5 rejected', readCodes('LNM').members.length === 0)
  }
  // 10 Short flow
  {
    let s = encode(start({ mode: 'short' }))
    const steps: string[] = []
    for (const a of ['gums', 'Just me', 'Neither', 'No preference', 'Not sure', 'Fluoride-free', 'Mint']) {
      const st = decode(s)!; steps.push(question(st).step); const r = answer(st, a); if (!r.ok) throw new Error(r.error); s = encode(r.state)
    }
    const st = decode(s)!
    check('10 short flow ends done', question(st).step === 'done', question(st).step)
    check('10 short flow no habit or recap', !steps.includes('hb') && !steps.includes('r'), steps.join(','))
  }
  // Ortho: braces + fluoride-free -> conflict -> stay with ortho
  {
    const { st, steps } = play(['Just me', 'Braces or aligners', 'Fluoride-free', 'Stay with ortho', 'Chocolate', 'x', 'Pretty solid', "That's right"])
    check('ortho conflict asked', steps.includes('oc'), steps.join(','))
    check('ortho code AOC', codeFor(st.members[0]) === 'AOC', codeFor(st.members[0]))
    const rec = await recommend(st)
    check('ortho system', /Ortho System - Complete/.test(rec.people[0].system || ''), rec.people[0].system || '')
  }
  // Baby skips fluoride question
  {
    const { st, steps } = play(['Family with kids', 'Just me', '10 months', 'Neither', 'Fluoride', 'Mint', 'Strawberry', 'x', 'Pretty solid', "That's right"])
    check('baby code BNS', codeFor(st.members[1]) === 'BNS', codeFor(st.members[1]))
    check('baby fluoride question skipped', steps.filter(s => s === 'f').length === 1, steps.join(','))
  }
  // Teen asked about braces
  {
    const { steps } = play(['Family with kids', 'Just me', '14', 'Neither', 'Fluoride', 'Mint', 'Yes', 'Fluoride'])
    check('teen braces question', steps.includes('t'), steps.join(','))
  }
  // Tampered state rejected
  {
    const s = encode(start())
    check('tampered state rejected', decode(s.replace('.h.', '.r.')) === null)
  }
  console.log(`\n${pass} passed, ${fail} failed`)
  process.exit(fail ? 1 : 0)
}
main()
