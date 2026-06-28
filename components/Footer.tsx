import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  shop: [
    { label: 'Shop All Systems', href: '/systems-overview' },
    { label: 'Shop All Products', href: '/shop-all' },
    { label: 'Shop All Bundles', href: '/supermouth-bundles' },
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
    { label: 'In the News', href: '/in-the-news' },
    { label: 'Play', href: '/play' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'For Dental Pros', href: 'https://supermouthpro.com' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-sm-navy text-white mt-0">
      {/* Newsletter */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl">Want more from our mouths?</h3>
            <p className="text-white/60 text-sm mt-1">Sign up for tips, guides, and exclusive offers.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm flex-1 md:w-64 placeholder-white/40 focus:outline-none focus:border-sm-yellow text-white"
            />
            <button className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 hover:text-sm-yellow transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Image
            src="/cdn/logo-reversed.png"
            alt="SuperMouth"
            width={140}
            height={35}
            className="h-8 w-auto"
          />
          <div className="flex flex-wrap gap-4 text-xs text-white/40">
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
        <p className="text-xs text-white/30 mt-6 text-center">
          SuperMouth.com is designed for informational purposes only and is not a substitute for compliance with applicable federal laws.
        </p>
      </div>
    </footer>
  )
}
