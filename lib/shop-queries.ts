// Storefront API queries for the shop / collection / bundle pages.
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const endpoint = `https://${domain}/api/2024-01/graphql.json`

async function sf<T>(query: string, variables?: object): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })
  const json = await res.json()
  if (!res.ok || json.errors) throw new Error(json.errors?.[0]?.message || `Shopify ${res.status}`)
  return json.data
}

export type ShopProduct = {
  id: string
  title: string
  handle: string
  productType: string
  tags: string[]
  priceRange: { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } }
  compareAtPriceRange: { maxVariantPrice: { amount: string } }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: { id: string; availableForSale: boolean; price: { amount: string } } }[] }
}

const PRODUCT_FIELDS = `
  id title handle productType tags
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  compareAtPriceRange { maxVariantPrice { amount } }
  images(first: 1) { edges { node { url altText } } }
  variants(first: 20) { edges { node { id availableForSale price { amount } } } }
`

export async function getShopProducts(): Promise<ShopProduct[]> {
  const out: ShopProduct[] = []
  let after: string | null = null
  for (let page = 0; page < 5; page++) {
    const d: any = await sf(`query($after: String) { products(first: 100, after: $after, sortKey: BEST_SELLING) { pageInfo { hasNextPage endCursor } nodes { ${PRODUCT_FIELDS} } } }`, { after })
    out.push(...d.products.nodes)
    if (!d.products.pageInfo.hasNextPage) break
    after = d.products.pageInfo.endCursor
  }
  return out
}

export type ShopCollection = { title: string; description: string; handle: string; products: ShopProduct[] } | null

export async function getShopCollection(handle: string): Promise<ShopCollection> {
  const d: any = await sf(`query($handle: String!) { collection(handle: $handle) { title description handle products(first: 100) { nodes { ${PRODUCT_FIELDS} } } } }`, { handle })
  if (!d.collection) return null
  return { ...d.collection, products: d.collection.products.nodes }
}

/** Map of collection handle -> product handles, used by the client-side filters. */
export async function getCollectionMembership(handles: string[]): Promise<Record<string, string[]>> {
  const aliases = handles.map((h, i) => `c${i}: collection(handle: "${h}") { products(first: 150) { nodes { handle } } }`).join('\n')
  const d: any = await sf(`query { ${aliases} }`)
  const out: Record<string, string[]> = {}
  handles.forEach((h, i) => { out[h] = d[`c${i}`]?.products.nodes.map((n: { handle: string }) => n.handle) ?? [] })
  return out
}
