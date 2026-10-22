import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

/**
 * Newsletter signup: records the email in Shopify as a customer who accepts marketing.
 * Uses the public Storefront API (customerCreate). An email that already exists is treated as success.
 */
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: '' }))
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 })
  }

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token) return NextResponse.json({ ok: false }, { status: 500 })

  const query = `mutation($input: CustomerCreateInput!) { customerCreate(input: $input) { customer { id } customerUserErrors { code message } } }`
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
    body: JSON.stringify({ query, variables: { input: { email, acceptsMarketing: true, password: randomBytes(18).toString('base64url') } } }),
    cache: 'no-store',
  })
  const json = await res.json().catch(() => null)
  const errors = json?.data?.customerCreate?.customerUserErrors ?? []
  const ok = res.ok && (json?.data?.customerCreate?.customer || errors.every((e: { code: string }) => e.code === 'TAKEN'))
  return NextResponse.json({ ok: Boolean(ok) }, { status: ok ? 200 : 502 })
}
