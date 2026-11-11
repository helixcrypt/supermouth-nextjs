// Checks which messages count as "add to my cart" and which products they name.
// Run: npx tsx scripts/test_emma_cart.ts
;(globalThis as any).window = globalThis
import { isCartRequest, productsNamed, narrow } from '../lib/emma-cart-client'
import TITLES from '../lib/product-titles.json'
const t = (h: string) => (TITLES as Record<string, string>)[h]

const intent: [string, boolean][] = [
  ['Please add the SuperBrush Manual Toothbrush to my cart', true],
  ['add it to my cart', true],
  ['Add both', true],
  ['Add these to your cart', true],
  ['Yes, add it to my cart', true],
  ['Can you add it to my cart?', true],
  ['Can you add a toothpaste for my husband too?', false],
  ['Add a family member', false],
  ['How do I add something to my cart?', false],
  ['Remove the floss from my cart', false],
  ['I need a toothbrush for an adult/teen', false],
  ['add the superbrush', true],
]
const names: [string, string[]][] = [
  ['Please add the SuperBrush Manual Toothbrush to my cart', ['SuperBrush Manual Toothbrush']],
  ['add the superbrush', ['SuperBrush Manual Toothbrush']],
  ['Add the Fluoride-Free Nano-Hydroxyapatite Floss', ['SuperMouth Fluoride-Free Nano-Hydroxyapatite Floss']],
  ['add it to my cart', []],
]
let bad = 0
for (const [s, want] of intent) {
  const got = isCartRequest(s)
  if (got !== want) bad++
  console.log(got === want ? 'ok  ' : 'FAIL', 'intent', JSON.stringify(s), got)
}
for (const [s, want] of names) {
  const got = productsNamed(s).slice(0, want.length || 1).map(t)
  const ok = want.length ? got.join('|') === want.join('|') : productsNamed(s).length === 0
  if (!ok) bad++
  console.log(ok ? 'ok  ' : 'FAIL', 'names ', JSON.stringify(s), JSON.stringify(productsNamed(s).slice(0, 3).map(t)))
}
// "add it" after Emma showed six mouthwash cards for a fluoride-free adult question
const panel = ['supermouth-hydroxamin-non-fluoride-mouthwash-bundle', 'supermouth-hydroxamin-with-fluoride-mouthwash-bundle', 'supermouth-ortho-mouthwash-bundle',
  'nano-hydroxyapatite-mouthwash-for-braces-and-aligners', 'supermouth-hydroxamin-with-fluoride-mouthwash', 'supermouth-hydroxamin-non-fluoride-mouthwash']
const inCatalog = panel.filter(h => t(h))
const wantMw = Object.keys(TITLES).filter(h => /^SuperMouth Fluoride-Free Nano-Hydroxyapatite Mouthwash$/.test(t(h)))
const allMw = Object.keys(TITLES).filter(h => /mouthwash/i.test(t(h)))
const got = narrow(allMw, "What's your fluoride-free mouthwash for adults?\nHere's our fluoride-free mouthwash for teens and adults. It's alcohol-free with nano-hydroxyapatite.")
const ok = got.join('|') === wantMw.join('|')
if (!ok) bad++
console.log(ok ? 'ok  ' : 'FAIL', 'narrow', JSON.stringify(got.map(t)), inCatalog.length >= 0 ? '' : '')
process.exit(bad ? 1 : 0)
