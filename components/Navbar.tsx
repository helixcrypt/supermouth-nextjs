'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

const shopLinks = [
  { label: 'Shop All Products', href: '/shop-all' },
  { label: 'Shop All Systems', href: '/systems-overview' },
  { label: 'Shop All Bundles', href: '/supermouth-bundles' },
  { label: 'Kids', href: '/collections/shop-all-kids' },
  { label: 'Teens & Adults', href: '/collections/ages-13-and-up' },
  { label: 'Orthodontics', href: '/collections/ortho' },
  { label: 'Pregnancy', href: '/collections/pregnancy' },
]

const learnLinks = [
  { label: 'Take Assessment', href: '/assessment' },
  { label: 'Articles & Guides', href: '/learn' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Subscription Benefits', href: '/subscription-benefits' },
]

const whyLinks = [
  { label: 'What Makes Us S.U.P.E.R.', href: '/what-makes-us-super' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Protecting the Planet', href: '/sustainability' },
  { label: 'Giving Back', href: '/philanthropy' },
  { label: 'In the News', href: '/in-the-news' },
  { label: 'Our Happy Customers', href: '/our-happy-customers' },
]

export default function Navbar() {
  const { openCart, itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-sm-navy/95 backdrop-blur border-b border-white/10">
      {/* Promo bar */}
      <div className="bg-sm-accent text-sm-navy text-center text-xs py-2 px-4 font-semibold">
        Up to $75 in store credit back — lock in 15% off subscriptions for life!{' '}
        <Link href="/shop-all" className="underline ml-1">Shop Now</Link>
      </div>

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
            {/* SHOP */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('shop')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide hover:text-sm-accent transition-colors py-4">
                SHOP
              </button>
              {activeDropdown === 'shop' && (
                <div className="absolute top-full left-0 bg-sm-dark border border-white/10 rounded-lg shadow-xl py-2 w-52 z-50">
                  {shopLinks.map(l => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-sm-accent transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* LEARN & EARN */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('learn')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide hover:text-sm-accent transition-colors py-4">
                LEARN & EARN
              </button>
              {activeDropdown === 'learn' && (
                <div className="absolute top-full left-0 bg-sm-dark border border-white/10 rounded-lg shadow-xl py-2 w-52 z-50">
                  {learnLinks.map(l => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-sm-accent transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* WHY SUPERMOUTH */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('why')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm font-semibold tracking-wide hover:text-sm-accent transition-colors py-4">
                WHY SUPERMOUTH?
              </button>
              {activeDropdown === 'why' && (
                <div className="absolute top-full left-0 bg-sm-dark border border-white/10 rounded-lg shadow-xl py-2 w-56 z-50">
                  {whyLinks.map(l => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2 text-sm hover:bg-white/5 hover:text-sm-accent transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link href="/account" className="hidden md:block text-sm font-semibold hover:text-sm-accent transition-colors">
              SIGN IN
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 hover:text-sm-accent transition-colors"
              aria-label="Open cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sm-accent text-sm-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-sm-dark border-t border-white/10 px-4 pb-4">
          <div className="pt-4 space-y-1">
            <p className="text-xs text-sm-gray font-semibold uppercase tracking-widest mb-2">Shop</p>
            {shopLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-accent">
                {l.label}
              </Link>
            ))}
            <p className="text-xs text-sm-gray font-semibold uppercase tracking-widest mt-4 mb-2">Learn & Earn</p>
            {learnLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-accent">
                {l.label}
              </Link>
            ))}
            <p className="text-xs text-sm-gray font-semibold uppercase tracking-widest mt-4 mb-2">Why SuperMouth?</p>
            {whyLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm hover:text-sm-accent">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
