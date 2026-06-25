import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  shop: [
    { label: 'Shop All Systems', href: '/systems-overview' },
    { label: 'Shop All Products', href: '/shop-all' },
    { label: 'Shop All Bundles', href: '/supermouth-bundles' },
    { label: 'Subscription Benefits', href: '/subscription-benefits' },
  ],
  learn: [
    { label: 'Articles & Guides', href: '/learn' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'What Makes Us S.U.P.E.R.', href: '/what-makes-us-super' },
    { label: 'Our Story', href: '/our-story' },
  ],
  company: [
    { label: 'Protecting the Planet', href: '/sustainability' },
    { label: 'Giving Back', href: '/philanthropy' },
    { label: 'Our Happy Customers', href: '/our-happy-customers' },
    { label: 'Play', href: '/play' },
    { label: 'In the News', href: '/in-the-news' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'For Dental Pros', href: 'https://supermouthpro.com' },
    { label: 'Become an Affiliate', href: 'https://app.impact.com/campaign-campaign-info-v2/Supermouth.brand' },
  ],
}

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/mysupermouth', icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
  { label: 'Instagram', href: 'https://www.instagram.com/mysupermouth', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'TikTok', href: 'https://tiktok.com/@mysupermouth', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
]

export default function Footer() {
  return (
    <footer className="bg-sm-dark border-t border-white/10 mt-20">
      {/* Newsletter */}
      <div className="bg-sm-accent/10 border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl">Want more from our mouths?</h3>
            <p className="text-sm-gray text-sm mt-1">Sign up for tips, guides, and exclusive offers.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm flex-1 md:w-64 placeholder-sm-gray focus:outline-none focus:border-sm-accent"
            />
            <button className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-sm-white/70 hover:text-sm-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-4">Learn</h4>
            <ul className="space-y-2">
              {footerLinks.learn.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-sm-white/70 hover:text-sm-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-sm-white/70 hover:text-sm-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm text-sm-white/70 hover:text-sm-accent transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src="https://cdn.supermouth.com/website/Supermouth-full-logo_reversed.png"
            alt="SuperMouth"
            width={140}
            height={35}
            className="h-8 w-auto"
          />
          <div className="flex gap-4">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center text-sm-gray hover:text-sm-accent transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-sm-gray">
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/data-sharing-opt-out" className="hover:text-white transition-colors">Do Not Sell My Info</Link>
          </div>
        </div>
        <p className="text-xs text-sm-gray/50 mt-6 text-center">
          SuperMouth.com is designed for informational purposes only and is not a substitute for compliance with applicable federal laws.
        </p>
      </div>
    </footer>
  )
}
