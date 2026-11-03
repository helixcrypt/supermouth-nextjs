// npx --yes tsx scripts/debug_replay.ts '["Family with kids","Just me","4 and 8","Pregnant","No","No preference","Go with that"]'
import { replay } from '../lib/routine/replay'
import { question } from '../lib/routine/engine'
const r = replay({ answers: JSON.parse(process.argv[2] || '[]') })
console.log(JSON.stringify({ step: question(r.st).step, skipped: r.skipped, problem: r.lastRejected, members: r.st.members }))
