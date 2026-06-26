'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

type NavLink = {
  label: string
  href: string
  divider?: boolean
}

const shopLinks: NavLink[] = [
  { label: 'Shop All Products', href: '/shop-all' },
  { label: 'Shop All Systems', href: '/systems-overview' },
  { label: 'Shop All Bundles', href: '/supermouth-bundles' },
  { label: '', href: '#', divider: true },
  { label: 'Kids', href: '/collections/shop-all-kids' },
  { label: 'Teens & Adults', href: '/collections/ages-13-and-up' },
  { label: 'Orthodontics', href: '/collections/ortho' },
  { label: 'Pregnancy', href: '/collections/pregnancy' },
  { label: '', href: '#', divider: true },
  { label: 'Toothpaste', href: '/collections/toothpaste' },
  { label: 'Mouthwash', href: '/collections/mouthwash' },
  { label: 'Toothbrushes', href: '/collections/mouthbrushes' },
  { label: 'Floss', href: '/collections/floss' },
  { label: 'Mouth Spray', href: '/collections/mouth-spray' },
  { label: 'Tongue Scrapers', href: '/collections/tongue-scrapers' },
  { label: 'Accessories', href: '/collections/essential-accessories-1' },
]

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
      <div className="bg-sm-navy text-white border-b border-white/10">
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
              {[
                { key: 'shop', label: 'SHOP', links: shopLinks },
                { key: 'learn', label: 'LEARN & EARN', links: learnLinks },
                { key: 'why', label: 'WHY SUPERMOUTH?', links: whyLinks },
              ].map(menu => (
                <div
                  key={menu.key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(menu.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="text-sm font-semibold tracking-wide hover:text-sm-yellow transition-colors py-4">
                    {menu.label}
                  </button>
                  {activeDropdown === menu.key && (
                    <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-xl shadow-xl py-2 w-60 z-50 max-h-[80vh] overflow-y-auto">
                      {menu.links.map((l, i) =>
                        l.divider ? (
                          <div key={i} className="border-t border-gray-100 my-1" />
                        ) : (
                          <Link
                            key={l.href + i}
                            href={l.href}
                            className="block px-4 py-2.5 text-sm text-sm-navy hover:bg-sm-bg hover:text-sm-purple transition-colors font-medium"
                          >
                            {l.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="https://supermouthpro.com"
                target="_blank"
                className="text-sm font-semibold italic hover:text-sm-yellow transition-colors"
              >
                For Dental Pros
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/assessment"
                className="hidden md:block bg-sm-yellow text-sm-navy font-bold px-4 py-2 rounded-full text-xs hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                TAKE ASSESSMENT
              </Link>
              <Link href="/account" className="hidden md:block text-sm font-semibold border border-white/40 px-3 py-1.5 rounded-full text-xs hover:bg-white/10 transition-colors">
                SIGN IN
              </Link>

              {/* Cart */}
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

              {/* Mobile toggle */}
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
        <div className="md:hidden bg-sm-navy text-white border-t border-white/10 px-4 pb-6 overflow-y-auto max-h-[80vh]">
          <div className="pt-4 space-y-1">
            {[
              { label: 'SHOP', links: shopLinks },
              { label: 'LEARN & EARN', links: learnLinks },
              { label: 'WHY SUPERMOUTH?', links: whyLinks },
            ].map(section => (
              <div key={section.label}>
                <p className="text-xs text-white/50 font-bold uppercase tracking-widest mt-4 mb-2">{section.label}</p>
                {section.links.map((l, i) =>
                  l.divider ? (
                    <div key={i} className="border-t border-white/10 my-2" />
                  ) : (
                    <Link key={l.href + i} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-yellow">
                      {l.label}
                    </Link>
                  )
                )}
              </div>
            ))}
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
