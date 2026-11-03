import { NextResponse } from 'next/server'
import { decode, readCodes, start, State } from '@/lib/routine/engine'
import { recommend } from '@/lib/routine/recommend'

/**
 * Public, read-only: the product cards for a routine.
 * The chat page sends the state token from Emma's latest reply (or, as a fallback, the
 * routine codes from the handoff) and gets back one system per person with its picture,
 * price and link, picked by the same logic as Emma's routine_recommend tool. The page draws
 * the cards itself so Emma needs only one tool call per reply (Quincer drops replies that
 * make several). Nothing is stored or logged.
 */
export const dynamic = 'force-dynamic'

async function images(gids: string[]): Promise<Record<string, string>> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token || !gids.length) return {}
  try {
    const r = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
      body: JSON.stringify({
        query: 'query($ids:[ID!]!){nodes(ids:$ids){... on ProductVariant{id image{url(transform:{maxWidth:240})} product{featuredImage{url(transform:{maxWidth:240})}}}}}',
        variables: { ids: gids },
      }),
      next: { revalidate: 3600 },
    })
    const j = await r.json()
    const out: Record<string, string> = {}
    for (const n of j?.data?.nodes || []) {
      const u = n?.image?.url || n?.product?.featuredImage?.url
      if (n?.id && u) out[n.id] = u
    }
    return out
  } catch {
    return {}
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { state?: unknown; routine_code?: unknown } | null
  if (!body) return NextResponse.json({ error: 'bad request' }, { status: 400 })
  let st: State | null = typeof body.state === 'string' ? decode(body.state.replace(/^\[\[|\]\]$/g, '')) : null
  if (!st && typeof body.routine_code === 'string') {
    const { members } = readCodes(body.routine_code)
    if (members.length) { st = start(); st.members = members }
  }
  if (!st || !st.members.length) return NextResponse.json({ people: [] }, { headers: { 'Cache-Control': 'no-store' } })

  const rec = await recommend(st)
  const gids = rec.people.flatMap(p => [p.variant_gid, ...p.addons.map((a: any) => a?.variant_gid)]).filter(Boolean) as string[]
  const img = await images(gids)
  const people = rec.people.map(p => ({
    person: p.person,
    code: p.code,
    system: p.system,
    flavor: p.flavor,
    floss: p.floss,
    price: p.price,
    url: p.url && p.variant_gid ? `${p.url}?variant=${p.variant_gid.split('/').pop()}` : p.url,
    image: p.variant_gid ? img[p.variant_gid] : undefined,
    unavailable: !!p.unavailable,
    addons: p.addons.map((a: any) => ({ title: a.title, price: a.price, url: a.url, image: img[a.variant_gid] })),
  }))
  return NextResponse.json({ people }, { headers: { 'Cache-Control': 'no-store' } })
}
