/** Checks for the version 2 routine engine (lib/routine2/engine.ts). Run: npx tsx scripts/test_routine2.ts */
import { newPerson, formulaOf, tierOf, smallerTiers, dropForTier, codeFor, peopleFromCodes, pathway, steps, products, priceLines, Person } from '../lib/routine2/engine'

let pass = 0, fail = 0
function check(name: string, cond: boolean, detail = '') { if (cond) { pass++; console.log('PASS', name) } else { fail++; console.log('FAIL', name, detail) } }
const adult = (o: Partial<Person> = {}) => Object.assign(newPerson('me'), o)

// fluoride rule (exception F)
check('stated fluoride honored', formulaOf(adult({ fluoride: 'f' })) === 'F')
check('stated fluoride-free honored with cavities', formulaOf(adult({ fluoride: 'ff', cavities: 'recent' })) === 'N')
check('recommend, low risk -> fluoride-free', formulaOf(adult({ fluoride: 'choose', cavities: 'none' })) === 'N')
check('recommend, recent cavities -> fluoride', formulaOf(adult({ fluoride: 'choose', cavities: 'recent' })) === 'F')
check('recommend, doctor risk -> fluoride', formulaOf(adult({ fluoride: 'choose', cavities: 'risk' })) === 'F')
check('recommend, braces -> ortho', formulaOf(adult({ fluoride: 'choose', ortho: true })) === 'O')
check('fluoride + braces -> ortho', formulaOf(adult({ fluoride: 'f', ortho: true })) === 'O')
check('fluoride-free + braces -> fluoride-free', formulaOf(adult({ fluoride: 'ff', ortho: true })) === 'N')
check('pregnant, recommend, low risk -> fluoride-free', formulaOf(adult({ fluoride: 'choose', pregnant: true })) === 'N')
check('pregnant + braces, recommend -> Ortho', formulaOf(adult({ fluoride: 'choose', pregnant: true, ortho: true })) === 'O')
check('pregnant + braces, recommend -> Orthodontics pathway', pathway(adult({ fluoride: 'choose', pregnant: true, ortho: true })) === 'Orthodontics')
check('pregnant + braces, fluoride -> Ortho', formulaOf(adult({ fluoride: 'f', pregnant: true, ortho: true })) === 'O')
check('pregnant + braces, fluoride-free -> Pregnancy pathway', pathway(adult({ fluoride: 'ff', pregnant: true, ortho: true })) === 'Pregnancy')
check('code POM round-trips to pregnant + Ortho', (() => { const c = codeFor(adult({ pregnant: true, ortho: true, fluoride: 'choose', flavor: 'Mint' })); const b = peopleFromCodes([c])[0]; return c === 'POM' && b.pregnant && b.ortho && formulaOf(b) === 'O' })())
check('pregnant, no braces -> Pregnancy pathway', pathway(adult({ fluoride: 'choose', pregnant: true })) === 'Pregnancy')
const baby = Object.assign(newPerson('child'), { age: 'baby' as const, fluoride: 'f' as const })
check('baby always fluoride-free', formulaOf(baby) === 'N')

// size from routine (exception G)
check('adult full routine -> Complete', tierOf(adult()) === 'Complete')
const noMw = adult({ dropped: ['mw'] })
check('drop mouthwash -> Plus', tierOf(noMw) === 'Plus')
check('drop all extras -> Basic', tierOf(adult({ dropped: ['mw', 'tc', 'sp'] })) === 'Basic')
const little = Object.assign(newPerson('child'), { age: 'little' as const, flavor: 'Strawberry' as const })
check('little kid -> Complete', tierOf(little) === 'Complete')
check('little kid drop tc and sp -> Basic', tierOf(Object.assign({ ...little }, { dropped: ['tc', 'sp'] })) === 'Basic')
check('little kid smaller is Basic only', JSON.stringify(smallerTiers(little)) === '["Basic"]')
check('adult smaller is Plus, Basic', JSON.stringify(smallerTiers(adult())) === '["Plus","Basic"]')
check('baby has no smaller', smallerTiers(baby).length === 0)
const p2 = adult(); dropForTier(p2, 'Plus')
check('dropForTier Plus', tierOf(p2) === 'Plus')

// keep and add
const k = adult({ routineNow: { morning: ['br'], day: [], night: ['fl', 'br'] } })
const ks = steps(k)
check('brush kept', ks.find(s => s.text === 'Brush')!.keep)
check('floss kept', ks.find(s => s.text === 'Floss')!.keep)
check('mouthwash added', !ks.find(s => s.text === 'Mouthwash')!.keep)

// products
check('little kid gets flossers', products(little).some(p => p.name === 'Superhero flossers'))
check('ortho gets OrthoBrush', products(adult({ ortho: true, fluoride: 'f' })).some(p => p.name.startsWith('OrthoBrush')))
check('teething adds teether', products(Object.assign({ ...baby }, { teething: true })).some(p => p.key === 'te'))

// codes
check('code AFM', codeFor(adult({ fluoride: 'f' })) === 'AFM')
check('code ANS', codeFor(adult({ fluoride: 'ff', flavor: 'Strawberry' })) === 'ANS')
check('code AOM for braces', codeFor(adult({ fluoride: 'f', ortho: true })) === 'AOM')
check('code PNSB for pregnant fluoride-free braces', codeFor(adult({ pregnant: true, ortho: true, fluoride: 'ff', flavor: 'Strawberry' })) === 'PNSB')
check('code LNS for little kid', codeFor(little) === 'LNS')
const back = peopleFromCodes('AFM pnsb lfc')
check('codes read', !!back && back.length === 3 && codeFor(back[0]) === 'AFM' && codeFor(back[1]) === 'PNSB' && codeFor(back[2]) === 'LFC')
check('bad code rejected', peopleFromCodes('XYZ') === null)
check('mint for 2 to 5 rejected', peopleFromCodes('LFM') === null)
check('fluoride baby rejected', peopleFromCodes('BFS') === null)

// price
const pr = priceLines(99.21)
check('separate price', Math.abs(pr.separate - 116.72) < 0.01, String(pr.separate))
check('one-time is System price', pr.oneTime === 99.21)

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
