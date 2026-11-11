// Checks which messages count as "add to my cart" and which products they name.
// Run: npx tsx scripts/test_emma_cart.ts
;(globalThis as any).window = globalThis
import { isCartRequest, productsNamed } from '../lib/emma-cart-client'
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
process.exit(bad ? 1 : 0)
