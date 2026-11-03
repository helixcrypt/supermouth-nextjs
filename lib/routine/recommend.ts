import catalog from './catalog.json'
import { Member, State, codeFor, label, GOALS } from './engine'

type Sys = (typeof catalog.systems)[number]
type Addon = (typeof catalog.addons)[number]

const LADDER: Record<string, string[]> = {
  B: ['Complete'],
  L: ['Complete', 'Basic'],
  K: ['Complete', 'Plus', 'Basic'],
  A: ['Complete', 'Plus', 'Basic'],
  P: ['Complete', 'Plus', 'Basic'],
}
const FLAVOR = { M: 'Mint', S: 'Strawberry', C: 'Chocolate', V: 'Vanilla' } as Record<string, string>
const FLAVOR_ORDER = ['Strawberry', 'Mint', 'Vanilla', 'Chocolate']
const MAX_STEP_DOWNS = 2
const SITE = process.env.ROUTINE_SITE_URL || 'https://www.gregorypatterson.com'

/** Which catalog group a member's answers map to. */
export function groupFor(m: Member): { bracket: string; formula: string } {
  if (m.formula === 'O') return { bracket: 'A', formula: 'O' }
  if (m.bracket === 'P' && m.formula === 'F') return { bracket: 'A', formula: 'F' }   // pregnant, chose fluoride
  return { bracket: m.bracket, formula: m.formula }
}

function ladderFor(m: Member): string[] {
  const g = groupFor(m)
  return LADDER[g.bracket] || LADDER.A
}

// ---------- live stock (Shopify Storefront API) ----------

type Live = Record<string, { available: boolean; price?: number }>

export async function liveStock(gids: string[]): Promise<Live | null> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  if (!domain || !token || !gids.length) return null
  try {
    const out: Live = {}
    for (let i = 0; i < gids.length; i += 100) {
      const ids = gids.slice(i, i + 100)
      const r = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': token },
        body: JSON.stringify({
          query: 'query($ids:[ID!]!){nodes(ids:$ids){... on ProductVariant{id availableForSale price{amount}}}}',
          variables: { ids },
        }),
        cache: 'no-store',
      })
      const j = await r.json()
      for (const n of j?.data?.nodes || []) if (n?.id) out[n.id] = { available: !!n.availableForSale, price: n.price ? Number(n.price.amount) : undefined }
    }
    return out
  } catch {
    return null
  }
}

function isAvailable(live: Live | null, gid: string): boolean {
  if (!live) return true            // stock unknown: assume available, Shopify cart will say otherwise
  return live[gid]?.available ?? false
}

// ---------- picking ----------

interface Pick {
  sys: Sys
  substituted?: string
}

function candidates(m: Member, tier: string): Sys[] {
  const g = groupFor(m)
  return catalog.systems.filter(s => s.bracket === g.bracket && s.formula === g.formula && s.tier === tier)
}

function choose(m: Member, tier: string, live: Live | null): Pick | null {
  const all = candidates(m, tier)
  if (!all.length) return null
  const want = FLAVOR[m.flavor] || 'Mint'
  const wantFloss = m.floss === 'L' ? 'Floss' : m.floss === 'R' ? 'Flossers' : ''
  const ok = (s: Sys) => (!wantFloss || !s.floss || s.floss === wantFloss)
  const exact = all.find(s => s.flavor === want && ok(s))
  if (exact && isAvailable(live, exact.gid)) return { sys: exact }
  // nearest in-stock flavor, same floss type first, never mint for ages 2 to 5
  const order = [want, ...FLAVOR_ORDER.filter(f => f !== want)].filter(f => !(m.bracket === 'L' && f === 'Mint'))
  for (const pass of [true, false]) {
    for (const f of order) {
      const s = all.find(x => x.flavor === f && (pass ? ok(x) : true) && isAvailable(live, x.gid))
      if (s) return { sys: s, substituted: s.flavor !== want ? `${want} is out of stock, so this uses ${s.flavor}` : `${wantFloss} is out of stock in ${want}, so this uses ${s.floss}` }
    }
  }
  return null
}

/** Tiers still sellable for this member, in ladder order. */
function sellableTiers(m: Member, live: Live | null): string[] {
  return ladderFor(m).filter(t => choose(m, t, live))
}

function addonsFor(m: Member, live: Live | null) {
  if (!(m.bracket === 'P' && m.formula === 'N' && m.braces === 'b')) return { addons: [], optional: [] }
  const want = FLAVOR[m.flavor] || 'Mint'
  const pickAddon = (key: string): Addon | undefined => {
    const list = catalog.addons.filter(a => a.key === key)
    return list.find(a => a.flavor === want && isAvailable(live, a.gid)) || list.find(a => isAvailable(live, a.gid))
  }
  const fmt = (a?: Addon) => a && { title: a.title, variant: a.variant, price: live?.[a.gid]?.price ?? a.price, variant_gid: a.gid, url: `${SITE}/products/${encodeURIComponent(a.handle)}` }
  return {
    addons: [fmt(pickAddon('ortho_brush')), fmt(pickAddon('ortho_spray'))].filter(Boolean),
    optional: [{ ...fmt(pickAddon('ortho_floss')), note: 'Contains fluoride. Offer only if she is fine with fluoride in floss.' }].filter(x => x.title),
  }
}

// ---------- public ----------

export async function recommend(st: State) {
  const gids = [...new Set([...catalog.systems, ...catalog.addons].map(s => s.gid))]
  const live = await liveStock(gids)
  const people = st.members.map((m, i) => {
    const tiers = sellableTiers(m, live)
    const tier = tiers[Math.min(m.tier, tiers.length - 1)]
    const p = tier ? choose(m, tier, live) : null
    const add = addonsFor(m, live)
    const s = p?.sys
    return {
      person: label(st, i),
      code: codeFor(m),
      system: s ? s.title : null,
      tier_internal: tier || null,
      flavor: s?.flavor,
      floss: s?.floss || undefined,
      price: s ? (live?.[s.gid]?.price ?? s.price) : null,
      variant_gid: s?.gid,
      url: s ? `${SITE}/products/${encodeURIComponent(s.handle)}` : null,
      substitution_notice: p?.substituted,
      unavailable: !s ? 'No system in stock for these answers. Say so and offer to help with individual products.' : undefined,
      step_downs_left: Math.max(0, Math.min(MAX_STEP_DOWNS - m.tier, tiers.length - 1 - Math.min(m.tier, tiers.length - 1))),
      addons: add.addons,
      optional_addons: add.optional,
    }
  })
  const total = people.reduce((a, p) => a + (p.price || 0) + p.addons.reduce((b: number, x: any) => b + (x?.price || 0), 0), 0)
  const anyComplete = people.some(p => p.tier_internal === 'Complete')
  return {
    people,
    family_discounts: {
      bundle: '15% bundle savings (already built into each system price)',
      office: st.office ? '10% office discount on the whole order' : null,
      free_shipping: anyComplete || total >= 50,
    },
    goal: st.goal ? GOALS[st.goal] : null,
    habit: st.habit === 's' ? 'solid: use reinforcement language' : st.habit === 'r' ? 'room to build: use habit-bridge language' : null,
    stock_checked: !!live,
    say_rules: [
      'Present one system per person by product name, never by tier name (Complete, Plus, Basic).',
      'Do not state dollar prices; the product cards show them. Mention percentages only, once, for the whole order.',
      'Mention free shipping only if free_shipping is true.',
      'If a substitution_notice is present, say it in one short line.',
      'No subscription talk during the interview.',
      'Weave in the goal blurb; credit the science at the shopper\'s level; never name competitors.',
      'End with the routine codes and the closing line.',
    ],
  }
}

export async function stepDown(st: State, personIndex: number) {
  const m = st.members[personIndex]
  if (!m) return { ok: false, error: 'No such person.' }
  const gids = catalog.systems.map(s => s.gid)
  const live = await liveStock(gids)
  const tiers = sellableTiers(m, live)
  const current = Math.min(m.tier, tiers.length - 1)
  if (m.tier >= MAX_STEP_DOWNS || current >= tiers.length - 1) {
    return { ok: true, limit_reached: true, note: 'No further step-down for this person. Accept their decision gracefully; offer to keep the current system or skip this person.' }
  }
  m.tier = current + 1
  const p = choose(m, tiers[m.tier], live)
  return {
    ok: true, limit_reached: false,
    person: label(st, personIndex),
    system: p?.sys.title, flavor: p?.sys.flavor, floss: p?.sys.floss || undefined,
    price: p ? (live?.[p.sys.gid]?.price ?? p.sys.price) : null,
    variant_gid: p?.sys.gid,
    url: p ? `${SITE}/products/${encodeURIComponent(p.sys.handle)}` : null,
    substitution_notice: p?.substituted,
    step_downs_left: Math.max(0, Math.min(MAX_STEP_DOWNS - m.tier, tiers.length - 1 - m.tier)),
    note: 'Give one clinical reason for what the smaller system leaves out, then accept their answer. No second push at this level.',
  }
}
