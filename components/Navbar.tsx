'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

type NavLink = { label: string; href: string; tag?: string; teal?: boolean; highlight?: boolean; isNew?: boolean }

const learnLinks: NavLink[] = [
  { label: 'Take Assessment', href: '/assessment' },
  { label: 'Articles & Guides', href: '/learn' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Subscription Benefits', href: '/subscription-benefits' },
  { label: 'Rewards Program', href: '/rewards' },
]

const whyLinks: NavLink[] = [
  { label: 'What Makes Us S.U.P.E.R.', href: '/what-makes-us-super' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Protecting the Planet', href: '/sustainability' },
  { label: 'Giving Back', href: '/philanthropy' },
  { label: 'Our Happy Customers', href: '/our-happy-customers' },
  { label: 'In the News', href: '/in-the-news' },
  { label: 'Play', href: '/play' },
]

export default function Navbar() {
  const { openCart, itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50">
      {/* Promo bar */}
      <div className="bg-sm-navy text-white text-center text-xs py-2 px-4">
        Up to $75 in store credit back and lock in a 15% discount on subscriptions for life!{' '}
        <Link href="/shop-all" className="underline ml-1 font-semibold">Shop Now</Link>
      </div>

      {/* Main nav */}
      <div className="bg-sm-navy text-white border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://cdn.supermouth.com/website/Supermouth-full-logo_reversed.png"
                alt="SuperMouth"
                width={160}
                height={40}
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">

              {/* SHOP — 4-column Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('shop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-sm font-semibold tracking-wide hover:text-sm-yellow transition-colors py-4">SHOP</button>
                {activeDropdown === 'shop' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-sm-navy shadow-2xl border border-gray-100 rounded-2xl z-50 w-[820px] p-6">
                    <div className="grid grid-cols-4 gap-6">
                      {/* Column 1 */}
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-navy mb-3">Shop by Person</p>
                        <div className="border-t-2 border-sm-teal mb-3" />
                        <Link href="/shop-all" className="block text-sm font-bold text-sm-teal hover:opacity-80 mb-3">Shop All →</Link>
                        <ul className="space-y-2">
                          {[
                            { label: 'Babies & Toddlers', href: '/collections/shop-all-kids', tag: '0–24 mo' },
                            { label: 'Little Kids', href: '/collections/shop-all-kids', tag: 'Ages 2–5' },
                            { label: 'Big Kids', href: '/collections/shop-all-kids', tag: 'Ages 6–12' },
                            { label: 'All Kids', href: '/collections/shop-all-kids', tag: 'Ages 0–12', teal: true },
                            { label: 'Teens & Adults', href: '/collections/ages-13-and-up' },
                            { label: 'Pregnancy', href: '/collections/pregnancy', tag: 'All trimesters & nursing' },
                            { label: 'Orthodontics', href: '/collections/ortho', tag: 'Braces & aligners' },
                          ].map(item => (
                            <li key={item.label}>
                              <Link href={item.href} className={`text-sm hover:text-sm-teal transition-colors flex items-baseline justify-between gap-2 ${item.teal ? 'font-bold text-sm-teal' : 'text-sm-navy'}`}>
                                <span>{item.label}{item.teal ? ' →' : ''}</span>
                                {item.tag && <span className="text-xs text-sm-gray flex-shrink-0">{item.tag}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 2 */}
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-navy mb-3">Shop Products</p>
                        <div className="border-t-2 border-sm-teal mb-3" />
                        <Link href="/shop-all" className="block text-sm font-bold text-sm-teal hover:opacity-80 mb-3">Shop All Products →</Link>
                        <ul className="space-y-2">
                          {[
                            { label: 'Toothpastes', href: '/collections/mouthpaste' },
                            { label: 'Mouthwashes', href: '/collections/mouthwash' },
                            { label: 'Floss & Flossers', href: '/collections/mouthfloss' },
                            { label: 'Mouth Sprays', href: '/collections/mouthspray-1' },
                            { label: 'Tongue Cleaners', href: '/collections/tongue-scrapers' },
                            { label: 'Essential Accessories', href: '/collections/essential-accessories-1' },
                          ].map(item => (
                            <li key={item.label}>
                              <Link href={item.href} className="text-sm text-sm-navy hover:text-sm-teal transition-colors">{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 3 */}
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-navy mb-3">Toothbrushes</p>
                        <div className="border-t-2 border-sm-teal mb-3" />
                        <Link href="/collections/mouthbrushes" className="block text-sm font-bold text-sm-teal hover:opacity-80 mb-3">All Toothbrushes →</Link>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-gray mt-3 mb-2">Adults</p>
                        <ul className="space-y-1.5 mb-3">
                          {[
                            { label: 'ULTIM8 Electric Toothbrush', href: '/products/ultim8-electric-toothbrush', highlight: true },
                            { label: 'Adult Manual Toothbrushes', href: '/collections/mouthbrushes' },
                          ].map(item => (
                            <li key={item.label}>
                              <Link href={item.href} className={`text-sm hover:text-sm-teal transition-colors ${item.highlight ? 'bg-yellow-50 px-2 py-1 rounded-lg block' : 'text-sm-navy'}`}>{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-gray mt-3 mb-2">Kids</p>
                        <ul className="space-y-1.5 mb-3">
                          {[
                            { label: 'All Kids Toothbrushes', href: '/collections/mouthbrushes', teal: true },
                            { label: 'Kids Electric Toothbrushes', href: '/collections/mouthbrushes' },
                            { label: 'Kids Manual Toothbrushes', href: '/collections/mouthbrushes' },
                            { label: 'Kids Musical Toothbrushes', href: '/collections/mouthbrushes' },
                          ].map(item => (
                            <li key={item.label}>
                              <Link href={item.href} className={`text-sm hover:text-sm-teal transition-colors ${item.teal ? 'font-bold text-sm-teal' : 'text-sm-navy'}`}>{item.label}{item.teal ? ' →' : ''}</Link>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-gray mt-3 mb-2">Braces & Aligners</p>
                        <ul className="space-y-1.5">
                          {[
                            { label: 'ULTIM8 for Braces', href: '/products/supermouth-ultim8-ortho-system', highlight: true, isNew: true },
                            { label: 'Manual Toothbrush for Braces', href: '/products/ortho-toothbrush-s-bristles-braces' },
                          ].map(item => (
                            <li key={item.label}>
                              <Link href={item.href} className={`text-sm hover:text-sm-teal transition-colors flex items-center gap-2 ${item.highlight ? 'bg-yellow-50 px-2 py-1 rounded-lg' : 'text-sm-navy'}`}>
                                <span>{item.label}</span>
                                {item.isNew && <span className="text-xs bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded flex-shrink-0">NEW</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Column 4 */}
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-navy mb-3">Systems & Bundles</p>
                        <div className="border-t-2 border-sm-teal mb-3" />
                        <div className="border-2 border-sm-teal rounded-xl px-3 py-2 mb-3 inline-block">
                          <span className="font-black text-sm-teal text-sm">SAVE 15%</span>
                        </div>
                        <p className="text-xs text-sm-gray mb-4">Save up to 25% with subscription</p>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-navy mb-1">Systems</p>
                        <p className="text-xs text-sm-gray italic mb-2">Everything you need in one box — dentist-curated for your age & stage</p>
                        <Link href="/systems-overview" className="block text-sm font-bold text-sm-teal hover:opacity-80 mb-3">All Systems →</Link>
                        <ul className="space-y-1.5 mb-4">
                          {[
                            { label: 'Babies & Toddlers', tag: '0–24 mo' },
                            { label: 'Little Kids', tag: 'Ages 2–5' },
                            { label: 'Big Kids', tag: 'Ages 6–12' },
                            { label: 'Teens & Adults' },
                            { label: 'Pregnancy', tag: 'All trimesters & nursing' },
                            { label: 'Orthodontics', tag: 'Braces & aligners' },
                          ].map(item => (
                            <li key={item.label}>
                              <Link href="/systems-overview" className="text-sm text-sm-navy hover:text-sm-teal transition-colors flex items-baseline justify-between gap-2">
                                <span>{item.label}</span>
                                {item.tag && <span className="text-xs text-sm-gray flex-shrink-0">{item.tag}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs font-black uppercase tracking-widest text-sm-navy mb-1">Bundles</p>
                        <p className="text-xs text-sm-gray italic mb-2">Save 15% on pre-bundled sets of nano-hydroxyapatite, fluoride, flavor varieties & more</p>
                        <Link href="/supermouth-bundles" className="block text-sm font-bold text-sm-teal hover:opacity-80">All Bundles →</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* LEARN & EARN — links left, featured article right */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('learn')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-sm font-semibold tracking-wide hover:text-sm-yellow transition-colors py-4">LEARN & EARN</button>
                {activeDropdown === 'learn' && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 w-[480px]">
                    <div className="grid grid-cols-2">
                      {/* Links */}
                      <div className="py-4 px-5 border-r border-gray-100">
                        <p className="text-xs font-black uppercase tracking-widest text-sm-gray mb-3">Learn & Earn</p>
                        {learnLinks.map(l => (
                          <Link key={l.href} href={l.href}
                            className="block py-2.5 text-sm text-sm-navy hover:text-sm-teal transition-colors font-medium border-b border-gray-50 last:border-0">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                      {/* Featured article graphic */}
                      <div className="relative overflow-hidden rounded-r-2xl">
                        <Link href="/learn">
                          <Image
                            src="https://cdn.supermouth.com/website/Blogs_and_News_Hero_Image_option_4_%282%29.png"
                            alt="Explore the science behind superior oral care"
                            width={400}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 p-4">
                            <p className="text-white text-xs font-bold uppercase tracking-wide mb-1">Featured</p>
                            <p className="text-white font-display font-bold text-sm leading-snug">Explore the science behind superior oral care</p>
                            <span className="text-sm-yellow text-xs mt-2 block font-semibold">Read Articles →</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* WHY SUPERMOUTH — links left, hero image right */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('why')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-sm font-semibold tracking-wide hover:text-sm-yellow transition-colors py-4">WHY SUPERMOUTH?</button>
                {activeDropdown === 'why' && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 w-[520px]">
                    <div className="grid grid-cols-2">
                      {/* Links */}
                      <div className="py-4 px-5 border-r border-gray-100">
                        <p className="text-xs font-black uppercase tracking-widest text-sm-gray mb-3">Why SuperMouth?</p>
                        {whyLinks.map(l => (
                          <Link key={l.href} href={l.href}
                            className="block py-2.5 text-sm text-sm-navy hover:text-sm-teal transition-colors font-medium border-b border-gray-50 last:border-0">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                      {/* Featured graphic — WhySuperMouthHeader */}
                      <div className="relative overflow-hidden rounded-r-2xl">
                        <Link href="/what-makes-us-super">
                          <Image
                            src="https://cdn.supermouth.com/website/WhySuperMouthHeader.jpg"
                            alt="Why SuperMouth"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-0 p-4">
                            <p className="text-white font-display font-bold text-sm leading-snug mb-1">
                              Revolutionizing oral care with safe, effective, and fun products
                            </p>
                            <p className="text-white/70 text-xs mb-2">Founded by dentists who could not find the right oral care products — so they invented them!</p>
                            <span className="text-sm-yellow text-xs font-semibold">Read Our Story →</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="https://supermouthpro.com" target="_blank"
                className="text-sm font-semibold italic hover:text-sm-yellow transition-colors">
                For Dental Pros
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link href="/assessment"
                className="hidden md:block bg-sm-yellow text-sm-navy font-bold px-4 py-2 rounded-full text-xs hover:opacity-90 transition-opacity whitespace-nowrap">
                TAKE ASSESSMENT
              </Link>
              <Link href="/account"
                className="hidden md:block text-sm font-semibold border border-white/40 px-3 py-1.5 rounded-full text-xs hover:bg-white/10 transition-colors">
                SIGN IN
              </Link>
              <button onClick={openCart} className="relative p-2 hover:text-sm-yellow transition-colors" aria-label="Open cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sm-yellow text-sm-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-sm-navy text-white border-t border-white/10 px-4 pb-6 overflow-y-auto max-h-[85vh]">
          <div className="pt-4 space-y-1">
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Shop by Person</p>
            {[
              { label: 'Shop All', href: '/shop-all' },
              { label: 'Babies & Toddlers', href: '/collections/shop-all-kids' },
              { label: 'Little Kids (2–5)', href: '/collections/shop-all-kids' },
              { label: 'Big Kids (6–12)', href: '/collections/shop-all-kids' },
              { label: 'All Kids', href: '/collections/shop-all-kids' },
              { label: 'Teens & Adults', href: '/collections/ages-13-and-up' },
              { label: 'Pregnancy', href: '/collections/pregnancy' },
              { label: 'Orthodontics', href: '/collections/ortho' },
            ].map(l => <Link key={l.href + l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}

            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Shop Products</p>
            {[
              { label: 'Shop All Products', href: '/shop-all' },
              { label: 'Toothpastes', href: '/collections/mouthpaste' },
              { label: 'Mouthwashes', href: '/collections/mouthwash' },
              { label: 'Toothbrushes', href: '/collections/mouthbrushes' },
              { label: 'Floss & Flossers', href: '/collections/mouthfloss' },
              { label: 'Mouth Sprays', href: '/collections/mouthspray-1' },
              { label: 'Tongue Cleaners', href: '/collections/tongue-scrapers' },
              { label: 'Essential Accessories', href: '/collections/essential-accessories-1' },
            ].map(l => <Link key={l.href + l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}

            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Systems & Bundles</p>
            {[
              { label: 'All Systems — Save 15%', href: '/systems-overview' },
              { label: 'All Bundles', href: '/supermouth-bundles' },
            ].map(l => <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}

            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Learn & Earn</p>
            {learnLinks.map(l => <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}

            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">Why SuperMouth?</p>
            {whyLinks.map(l => <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-yellow">{l.label}</Link>)}

            <div className="pt-4">
              <Link href="/assessment" onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-sm-yellow text-sm-navy font-bold py-3 rounded-full text-sm">
                TAKE ASSESSMENT
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
