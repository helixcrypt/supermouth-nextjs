import { NextResponse } from 'next/server'
import catalog from '@/lib/routine/catalog.json'
import { Member } from '@/lib/routine/engine'
import { choose, liveStock, sellableTiers } from '@/lib/routine/recommend'

/**
 * Public, read-only: the SuperMouth System for each person in a version 2 routine.
 * The page sends each person's routine code and the System size their routine needs
 * (Complete, Plus or Basic); this picks the in-stock System with live Shopify price,
 * picture and variant, so the page can show it and add it to the cart. Nothing is stored.
 */
export const dynamic = 'force-dynamic'

const SITE = process.env.ROUTINE_SITE_URL || 'https://www.gregorypatterson.com'

function memberFromCode(code: string): Member | null {
  const c = String(code || '').toUpperCase()
  const [b, f, fl, extra] = c.split('')
  if (!'BLKAP'.includes(b || '_') || !'FNO'.includes(f || '_') || !'MSCVX'.includes(fl || '_')) return null
  return { role: 'C', bracket: b, braces: f === 'O' || extra === 'B' ? 'b' : '-', formula: f, flavor: fl === 'X' ? 'M' : fl, floss: b === 'L' ? 'R' : '-', tier: 0 }
}

async function images(gids: string[]): Promise<Record<string, string>> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token || !gids.length) return {}
  try {
    const r = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
      body: JSON.stringify({ query: 'query($ids:[ID!]!){nodes(ids:$ids){... on ProductVariant{id image{url(transform:{maxWidth:240})} product{featuredImage{url(transform:{maxWidth:240})}}}}}', variables: { ids: gids } }),
      next: { revalidate: 3600 },
    })
    const j = await r.json()
    const out: Record<string, string> = {}
    for (const n of j?.data?.nodes || []) { const u = n?.image?.url || n?.product?.featuredImage?.url; if (n?.id && u) out[n.id] = u }
    return out
  } catch { return {} }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { people?: { code?: string; tier?: string }[] } | null
  const people = Array.isArray(body?.people) ? body!.people!.slice(0, 8) : []
  if (!people.length) return NextResponse.json({ people: [] })
  const live = await liveStock([...new Set(catalog.systems.map(s => s.gid))])
  const picks = people.map(p => {
    const m = memberFromCode(p.code || '')
    if (!m) return { code: p.code, error: 'bad code' }
    const sellable = sellableTiers(m, live)
    const want = String(p.tier || 'Complete')
    // the size asked for if it is in stock, else the nearest smaller, else the nearest larger
    const order = ['Complete', 'Plus', 'Basic']
    const i = order.indexOf(want)
    const tryOrder = [...order.slice(Math.max(0, i)), ...order.slice(0, Math.max(0, i)).reverse()]
    const tier = tryOrder.find(t => sellable.includes(t))
    const pick = tier ? choose(m, tier, live) : null
    if (!pick) return { code: p.code, error: 'none in stock' }
    const s = pick.sys
    return {
      code: p.code, tier, asked: want, title: s.title, flavor: s.flavor, floss: s.floss || undefined,
      price: live?.[s.gid]?.price ?? s.price, gid: s.gid,
      url: `${SITE}/products/${encodeURIComponent(s.handle)}?variant=${s.gid.split('/').pop()}`,
      substituted: pick.substituted,
    }
  })
  const img = await images(picks.map(p => (p as any).gid).filter(Boolean))
  return NextResponse.json({ people: picks.map(p => ({ ...p, image: (p as any).gid ? img[(p as any).gid] : undefined })) }, { headers: { 'Cache-Control': 'no-store' } })
}
