// Run: npx --yes tsx --env-file=.env.local scripts/check_routine_stock.ts
import catalog from '../lib/routine/catalog.json'
import { liveStock, recommend } from '../lib/routine/recommend'
import { readCodes, start } from '../lib/routine/engine'

async function main() {
  const gids = [...new Set([...catalog.systems, ...catalog.addons].map(s => s.gid))]
  const live = await liveStock(gids)
  if (!live) { console.log('Stock check unavailable (no env or API error)'); return }
  const found = Object.keys(live).length
  const out = catalog.systems.filter(s => !live[s.gid]?.available)
  console.log(`variants found: ${found} of ${gids.length}; systems out of stock: ${out.length}`)
  for (const s of out) console.log('  out:', s.title, '/', s.flavor, s.floss || '')
  const st = start()
  st.members = readCodes('AFM PNVB LFC KNV AOS').members
  st.step = 'done'
  const rec = await recommend(st)
  for (const p of rec.people) console.log(p.code, '->', p.system, '/', p.flavor, p.floss || '', p.price, p.substitution_notice || '', p.addons.map((a: any) => a.title).join(' + '))
  console.log('free shipping:', rec.family_discounts.free_shipping, 'stock checked:', rec.stock_checked)
}
main()
