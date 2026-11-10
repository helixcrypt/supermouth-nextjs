// Checks which age stage a chat message points to. Run: npx tsx scripts/test_emma_stage.ts
import { stageOf } from '../lib/emma-panel-filter'

const cases: [string, string | null][] = [
  ['I need a toothbrush for an adult/teen', 'A'],
  ["Here are the teen/adult toothbrush options, I've pulled them up for you.", 'A'],
  ['What age range is he in: Teen/Adult (13+), or a different stage?', null],
  ['Now I need a toothpaste for my teenage son', 'A'],
  ['A toothbrush for my 4 year old', 'L'],
  ['My daughter is 9', 'K'],
  ['Something for my baby, she is teething', 'B'],
  ["I'm pregnant, what toothpaste should I use?", 'P'],
  ['Which flavor would you like?', null],
  ['A toothbrush for my kids, ages 2 to 5 and an adult', null],
]
let bad = 0
for (const [t, want] of cases) {
  const got = stageOf(t)
  if (got !== want) bad++
  console.log(got === want ? 'ok  ' : 'FAIL', JSON.stringify(t), got, got === want ? '' : `want ${want}`)
}
process.exit(bad ? 1 : 0)
