// Checks how Emma's questions turn into buttons. Run: npx tsx scripts/test_emma_chips.ts
// (No DOM here, so "same as before" is checked with a stub chat.)
;(globalThis as any).window = globalThis
import { buttonsFor } from '../lib/emma-chips-client'

const chat = (users: string[]) => ({ querySelectorAll: () => users.map(t => ({ innerText: t })) }) as any

const cases: [string, string[], string[]][] = [
  ['Got it, Teen/Adult. So I pick the right formula: fluoride, fluoride-free, or not sure?', [], ['Fluoride', 'Fluoride-free', 'Not sure']],
  ['Happy to add one for him. For his toothpaste, should I go fluoride or fluoride-free?', ['Teen/Adult (13+)', 'Fluoride-free', 'Cool Mint', 'Yes'], ['Fluoride-free (same as before)', 'Fluoride']],
  ["Here's the fluoride-free toothpaste: $16.99, in Chocolate, Cool Mint, Dubai Chocolate, Strawberry or Vanilla.\n\nWhich flavor sounds good to you?", [], ['Chocolate', 'Cool Mint', 'Dubai Chocolate', 'Strawberry', 'Vanilla']],
  ['Available in Chocolate, Cool Mint, Strawberry or Vanilla. Which flavor would he like?', ['Fluoride-free', 'Cool Mint'], ['Cool Mint (same as before)', 'Chocolate', 'Strawberry', 'Vanilla']],
  ['Would you like both in Cool Mint to match your toothpaste?', [], ['Yes', 'No']],
  ['Your trio is $45.97.\n\nWould you like me to build this into a full routine, or add these to your cart?', [], ['Build my routine', 'Add these to your cart']],
  ['Hi! What brings you here today?', [], []],
  ['Which stage fits you best?', [], []],
  ['Is it for you or someone else?', [], ['You', 'Someone else']],
  ['That is all set.', [], []],
  ['Tap the card to add it.\n\nWhich flavor would he like: Mint, Cool Mint, Chocolate, Strawberry or Vanilla?', ['Fluoride-free', 'Cool Mint please', 'Fluoride-free, same as before'], ['Cool Mint (same as before)', 'Chocolate', 'Strawberry', 'Vanilla']],
  ['Would you like the same flavor as yours?', [], ['Yes', 'No']],
]
let bad = 0
for (const [reply, users, want] of cases) {
  const got = buttonsFor(reply, chat(users)).map(b => b.label)
  const ok = got.join('|') === want.join('|')
  if (!ok) bad++
  console.log(ok ? 'ok  ' : 'FAIL', JSON.stringify(got), ok ? '' : `want ${JSON.stringify(want)}`)
}
process.exit(bad ? 1 : 0)
