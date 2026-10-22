'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

// Mega menu palette, matched to supermouth.com
const BLUE = '#394C97'
const TEAL = '#5AC3B2'

type Row = { label: string; href: string; tag?: string; teal?: boolean; highlight?: boolean; isNew?: boolean }

const learnLinks: Row[] = [
  { label: 'Take an Assessment', href: '/assessment' },
  { label: 'Rewards & Referrals', href: '/rewards', isNew: true },
  { label: 'Subscription Benefits', href: '/subscription-benefits' },
  { label: 'Articles & Guides', href: '/learn' },
  { label: 'FAQs', href: '/faqs' },
]

const whyLinks: Row[] = [
  { label: 'What Makes Us S.U.P.E.R.', href: '/what-makes-us-super' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Protecting the Planet', href: '/sustainability' },
  { label: 'Giving Back', href: '/philanthropy' },
  { label: 'Our Happy Customers', href: '/our-happy-customers' },
  { label: 'Play', href: '/play' },
  { label: 'In the News', href: '/in-the-news' },
]

const shopByPerson: Row[] = [
  { label: 'Babies & Toddlers', href: '/collections/teething-to-24-months', tag: '0–24 mo' },
  { label: 'Little Kids', href: '/collections/ages-2-to-5', tag: 'Ages 2–5' },
  { label: 'Big Kids', href: '/collections/ages-6-to-12', tag: 'Ages 6–12' },
  { label: 'All Kids →', href: '/collections/shop-all-kids', tag: 'Ages 0–12', teal: true },
  { label: 'Teens & Adults', href: '/collections/ages-13-and-up' },
  { label: 'Pregnancy', href: '/collections/pregnancy', tag: 'All trimesters & nursing' },
  { label: 'Orthodontics', href: '/collections/ortho', tag: 'Braces & aligners' },
]

const shopProducts: Row[] = [
  { label: 'Toothpastes', href: '/collections/mouthpaste' },
  { label: 'Mouthwashes', href: '/collections/mouthwash' },
  { label: 'Floss & Flossers', href: '/collections/mouthfloss' },
  { label: 'Mouth Sprays', href: '/collections/mouthspray-1' },
  { label: 'Tongue Cleaners', href: '/collections/tongue-scrapers' },
  { label: 'Essential Accessories', href: '/collections/essential-accessories-1' },
]

const brushGroups: { title: string; rows: Row[] }[] = [
  { title: 'Adults', rows: [
    { label: 'ULTIM8 Electric Toothbrush', href: '/products/ultim8-electric-toothbrush', highlight: true },
    { label: 'Adult Manual Toothbrushes', href: '/products/supermouth-manual-s-toothbrush-for-adults' },
  ]},
  { title: 'Kids', rows: [
    { label: 'All Kids Toothbrushes →', href: '/collections/mouthbrushes', teal: true },
    { label: 'Kids Electric Toothbrushes', href: '/collections/mouthbrushes' },
    { label: 'Kids Manual Toothbrushes', href: '/collections/mouthbrushes' },
    { label: 'Kids Musical Toothbrushes', href: '/collections/mouthbrushes' },
  ]},
  { title: 'Braces & Aligners', rows: [
    { label: 'ULTIM8 Electric Toothbrush for Braces', href: '/products/supermouth-ultim8-ortho-system', highlight: true, isNew: true },
    { label: 'Manual Toothbrush for Braces', href: '/products/ortho-toothbrush-s-bristles-braces' },
  ]},
  { title: 'Replacement Heads', rows: [
    { label: 'ULTIM8 Brush Heads', href: '/products/ultim8-replacement-brush-heads' },
    { label: 'Kids Brush Heads', href: '/products/replacement-brush-heads' },
  ]},
]

const systemLinks: Row[] = [
  { label: 'Babies & Toddlers', tag: '0–24 mo', href: '/systems/teething-to-24-months' },
  { label: 'Little Kids', tag: 'Ages 2–5', href: '/systems/2-to-5' },
  { label: 'Big Kids', tag: 'Ages 6–12', href: '/systems/6-to-12' },
  { label: 'Teens & Adults', href: '/systems/teens-and-adults' },
  { label: 'Pregnancy', tag: 'All trimesters & nursing', href: '/systems/pregnancy' },
  { label: 'Orthodontics', tag: 'Braces & aligners', href: '/systems/orthodontics' },
]

const topSellers: Row[] = [
  { label: 'Nano-Hydroxyapatite Toothpaste', href: '/products/supermouth-hydroxamin-w-fluoride-toothpaste-3-4-oz' },
  { label: 'Nano-Hydroxyapatite Mouthwash', href: '/products/supermouth-mouthwash-w-fluoride' },
  { label: 'ULTIM8 Electric Toothbrush', href: '/products/ultim8-electric-toothbrush' },
  { label: 'Orthodontic System', href: '/systems/orthodontics' },
]

type MenuKey = 'shop' | 'learn' | 'why' | null

export default function Navbar() {
  const { openCart, itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState<MenuKey>(null)

  const closeAll = () => {
    setActive(null)
    setMobileOpen(false)
  }

  // ── Shared pieces ─────────────────────────────────────────
  const ColHeader = ({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) => (
    <div className="flex items-center gap-2 pb-2 mb-3 border-b-[3px]" style={{ borderColor: TEAL }}>
      <h3 className="text-[14px] leading-5 font-bold uppercase tracking-[0.025em]" style={{ color: BLUE }}>{children}</h3>
      {extra}
    </div>
  )

  const AllLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} onClick={closeAll} className="block py-1 mb-2 text-[16px] leading-6 font-bold hover:opacity-80" style={{ color: TEAL }}>{children}</Link>
  )

  const RowLink = ({ r }: { r: Row }) => (
    <Link
      href={r.href}
      onClick={closeAll}
      className={`flex items-baseline justify-between gap-3 py-1 text-[16px] leading-6 hover:opacity-70 transition-opacity ${r.highlight ? 'bg-[#FFF6D6] -mx-2 px-2 rounded' : ''} ${r.teal ? 'font-bold' : ''}`}
      style={{ color: r.teal ? TEAL : BLUE }}
    >
      <span>{r.label}</span>
      {r.isNew && <span className="text-[12px] leading-4 font-semibold px-2 py-0.5 rounded bg-[#FDE4DF] text-[#E2614B] flex-shrink-0 self-center">NEW</span>}
      {r.tag && <span className="text-[14px] leading-5 font-normal text-right max-w-[55%]" style={{ color: 'rgba(57,76,151,0.6)' }}>{r.tag}</span>}
    </Link>
  )

  const ArrowList = ({ rows }: { rows: Row[] }) => (
    <ul className="space-y-6">
      {rows.map(r => (
        <li key={r.href}>
          <Link href={r.href} onClick={closeAll} className="inline-flex items-center gap-2 text-[16px] leading-6 hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
            <span>{r.label}</span>
            {r.isNew && <span className="text-[12px] leading-4 font-bold text-white px-2 py-0.5 rounded" style={{ background: BLUE }}>NEW</span>}
            <Image src="/cdn/blue-arrow-forward.svg" alt="" width={40} height={24} className="w-10 h-6" />
          </Link>
        </li>
      ))}
    </ul>
  )

  const panelClass = 'absolute left-1/2 -translate-x-1/2 top-full w-[1200px] max-w-[calc(100vw-32px)] bg-white rounded-b-2xl z-50 border-2'

  const navItem = (key: Exclude<MenuKey, null>, label: string) => (
    <button
      onMouseEnter={() => setActive(key)}
      onFocus={() => setActive(key)}
      onClick={() => setActive(active === key ? null : key)}
      className={`h-16 px-3 text-[18px] leading-5 whitespace-nowrap transition-colors ${active === key ? 'text-[#FFE920]' : 'hover:text-[#FFE920]'}`}
      aria-expanded={active === key}
    >
      {label}
    </button>
  )

  return (
    <header className="sticky top-0 z-50">
      {/* Nav bar. Menus are absolutely positioned under this bar; leaving the whole bar (incl. open panel) closes them. */}
      <div className="text-white relative" style={{ background: BLUE }} onMouseLeave={() => setActive(null)}>
        <div className="max-w-[1536px] mx-auto px-4 2xl:px-0">
          <div className="flex items-center justify-between h-16">

            <Link href="/" onClick={closeAll} onMouseEnter={() => setActive(null)} className="flex-shrink-0">
              <Image src="/cdn/supermouth-logo.png" alt="SuperMouth" width={160} height={48} className="h-10 lg:h-12 w-auto" priority />
            </Link>

            <div className="hidden xl:flex items-center">
              <nav className="flex items-center">
                {navItem('shop', 'SHOP')}
                {navItem('learn', 'LEARN & EARN')}
                {navItem('why', 'WHY SUPERMOUTH?')}
                <Link href="https://supermouthpro.com" target="_blank" onClick={closeAll} onMouseEnter={() => setActive(null)} className="px-3 text-[18px] leading-5 italic whitespace-nowrap hover:text-[#FFE920] transition-colors">
                  For Dental Pros
                </Link>
              </nav>
              <div className="flex items-center" onMouseEnter={() => setActive(null)}>
                <Link href="/assessment" onClick={closeAll} className="mx-3 bg-[#FFE920] text-[16px] leading-6 px-3 py-1 rounded hover:opacity-90 transition-opacity whitespace-nowrap" style={{ color: BLUE }}>
                  TAKE ASSESSMENT
                </Link>
                <Link href="/account" onClick={closeAll} className="mx-3 text-[#FFE920] border border-[#FFE920] text-[16px] leading-6 font-medium px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
                  SIGN IN
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4" onMouseEnter={() => setActive(null)}>
              <button onClick={openCart} className="relative p-2 hover:text-[#FFE920] transition-colors" aria-label="Open cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sm-yellow text-sm-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{itemCount}</span>
                )}
              </button>
              <button className="xl:hidden p-2" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── SHOP mega menu ─────────────────────────────── */}
        {active === 'shop' && (
          <div className={`${panelClass} hidden xl:block`} style={{ borderColor: BLUE }}>
            <div className="px-6 pt-6">
              <div className="grid grid-cols-[1fr_1fr_1.15fr_1.3fr] gap-6">
                <div>
                  <ColHeader>Shop by Person</ColHeader>
                  <AllLink href="/shop-all">Shop All →</AllLink>
                  <div>{shopByPerson.map(r => <RowLink key={r.label} r={r} />)}</div>
                </div>

                <div>
                  <ColHeader>Shop Products</ColHeader>
                  <AllLink href="/shop-all">Shop All Products →</AllLink>
                  <div>{shopProducts.map(r => <RowLink key={r.label} r={r} />)}</div>
                </div>

                <div>
                  <ColHeader>Toothbrushes</ColHeader>
                  <AllLink href="/collections/mouthbrushes">All Toothbrushes →</AllLink>
                  {brushGroups.map(g => (
                    <div key={g.title} className="mb-3">
                      <p className="text-[14px] leading-5 font-bold uppercase tracking-[0.025em] mt-3 mb-1" style={{ color: BLUE }}>{g.title}</p>
                      <div>{g.rows.map(r => <RowLink key={r.label} r={r} />)}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <ColHeader extra={<span className="text-[12px] leading-4 font-semibold text-white px-2 py-0.5 rounded" style={{ background: TEAL }}>SAVE 15%</span>}>
                    Systems & Bundles
                  </ColHeader>
                  <p className="text-[13px] italic mb-3" style={{ color: 'rgba(57,76,151,0.7)' }}>Save up to 25% with subscription</p>
                  <p className="text-[14px] leading-5 font-bold uppercase tracking-[0.025em] mb-1" style={{ color: BLUE }}>Systems</p>
                  <p className="text-[13px] italic mb-2" style={{ color: 'rgba(57,76,151,0.7)' }}>Everything you need in one box — dentist-curated for your age &amp; stage</p>
                  <AllLink href="/systems-overview">All Systems →</AllLink>
                  <div className="mb-4">{systemLinks.map(r => <RowLink key={r.label} r={r} />)}</div>
                  <p className="text-[14px] leading-5 font-bold uppercase tracking-[0.025em] mb-1" style={{ color: BLUE }}>Bundles</p>
                  <p className="text-[13px] italic mb-2" style={{ color: 'rgba(57,76,151,0.7)' }}>Save 15% on pre-bundled sets of nano-hydroxyapatite, fluoride, flavor varieties &amp; more</p>
                  <AllLink href="/supermouth-bundles">All Bundles →</AllLink>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-[#EEEFF6] px-4 py-2">
                <p className="text-[14px]" style={{ color: BLUE }}>
                  <span className="font-bold">Not sure where to start?</span> Take an assessment to get a personalized routine for your family in 2 minutes.
                </p>
                <Link href="/assessment" onClick={closeAll} className="flex-shrink-0 text-white text-[14px] font-semibold tracking-wide px-5 py-2 rounded hover:opacity-90" style={{ background: '#6E5BAA' }}>
                  TAKE ASSESSMENT
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
                <span className="text-[14px] font-bold uppercase tracking-[0.025em]" style={{ color: BLUE }}>Top Sellers</span>
                {topSellers.map(r => (
                  <Link key={r.label} href={r.href} onClick={closeAll} className="text-[14px] hover:opacity-70" style={{ color: BLUE }}>{r.label}</Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── LEARN & EARN ───────────────────────────────── */}
        {active === 'learn' && (
          <div className={`${panelClass} hidden xl:block`} style={{ borderColor: BLUE }}>
            <div className="grid grid-cols-[310px_1fr] py-6">
              <div className="px-6 border-r" style={{ borderColor: BLUE }}>
                <ArrowList rows={learnLinks} />
              </div>
              <div className="px-12">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { img: '/cdn/systems-nav_image.jpg', alt: 'SuperMouth product lineup', title: 'What is a Mouthcare System?', desc: 'Learn about our product packages', href: '/systems-overview' },
                    { img: '/cdn/benefits_of_subscribing-navimage.jpg', alt: 'Family smiling', title: 'Benefits of Subscribing', desc: 'Get SuperMouth product at the best price', href: '/subscription-benefits' },
                  ].map(c => (
                    <Link key={c.href} href={c.href} onClick={closeAll} className="text-center group">
                      <Image src={c.img} alt={c.alt} width={287} height={197} className="mx-auto w-[287px] h-[197px] object-cover" />
                      <p className="mt-2 text-[20px] leading-7 font-semibold group-hover:opacity-80" style={{ color: BLUE }}>{c.title}</p>
                      <p className="text-[18px] leading-7" style={{ color: BLUE }}>{c.desc}</p>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <p className="text-[20px] leading-7 font-semibold" style={{ color: BLUE }}>Not sure where to start?</p>
                  <p className="text-[18px] leading-7" style={{ color: BLUE }}>Take an Assessment to learn about your dental needs</p>
                  <Link href="/assessment" onClick={closeAll} className="inline-block mt-2 bg-[#FFE920] text-[18px] leading-7 font-bold px-2 py-2 rounded hover:opacity-90" style={{ color: BLUE }}>
                    Take an Assessment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── WHY SUPERMOUTH? ────────────────────────────── */}
        {active === 'why' && (
          <div className={`${panelClass} hidden xl:block`} style={{ borderColor: BLUE }}>
            <div className="grid grid-cols-[310px_1fr] py-6">
              <div className="px-6 border-r" style={{ borderColor: BLUE }}>
                <ArrowList rows={whyLinks} />
              </div>
              <Link href="/what-makes-us-super" onClick={closeAll} className="flex flex-col items-center justify-center px-12 text-center group">
                <Image src="/cdn/megamenu-super.png" alt="S.U.P.E.R.: safe, unified, playful, effective, reputable" width={646} height={166} className="w-[646px] h-auto" />
                <p className="pt-4 text-[20px] leading-7 font-medium group-hover:opacity-80" style={{ color: BLUE }}>Our mission is to make your mouthcare S.U.P.E.R.</p>
                <p className="text-[18px] leading-7 max-w-[460px]" style={{ color: BLUE }}>Learn about our philosophy and how we can help you improve your dental care routine.</p>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Announcement bar sits under the nav, as on supermouth.com */}
      <div className="bg-[#131247] text-white text-center text-[14px] lg:text-[16px] font-medium leading-6 py-2 px-4">
        Up to $75 in store credit back and lock in a 15% discount on subscriptions for life!{' '}
        <Link href="/shop-all" onClick={closeAll} className="underline ml-1 font-semibold">Shop Now</Link>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-[#394C97] text-white border-t border-white/10 px-4 pb-6 overflow-y-auto max-h-[85vh]">
          <div className="pt-4 space-y-1">
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Shop by Person</p>
            {[{ label: 'Shop All', href: '/shop-all' }, ...shopByPerson].map(l => <Link key={l.href + l.label} href={l.href} onClick={closeAll} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Shop Products</p>
            {[{ label: 'Shop All Products', href: '/shop-all' }, ...shopProducts, { label: 'All Toothbrushes', href: '/collections/mouthbrushes' }].map(l => <Link key={l.href + l.label} href={l.href} onClick={closeAll} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Systems & Bundles</p>
            {[{ label: 'All Systems - Save 15%', href: '/systems-overview' }, { label: 'All Bundles', href: '/supermouth-bundles' }].map(l => <Link key={l.href} href={l.href} onClick={closeAll} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Learn & Earn</p>
            {learnLinks.map(l => <Link key={l.href} href={l.href} onClick={closeAll} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Why SuperMouth?</p>
            {whyLinks.map(l => <Link key={l.href} href={l.href} onClick={closeAll} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}
            <div className="pt-4">
              <Link href="/assessment" onClick={closeAll} className="block w-full text-center bg-sm-yellow text-sm-navy font-bold py-3 rounded-full text-sm">TAKE ASSESSMENT</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
