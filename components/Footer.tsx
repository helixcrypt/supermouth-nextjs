import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from '@/components/home/NewsletterForm'
import { socialLinks } from '@/lib/social-icons'

// Matches the supermouth.com footer. Legal pages we don't host point to supermouth.com.
const col1 = [
  { label: 'CONTACT US', href: '/contact' },
  { label: 'DO NOT SELL MY PERSONAL INFORMATION', href: 'https://supermouth.com/data-sharing-opt-out' },
  { label: 'TERMS OF SERVICE', href: 'https://supermouth.com/terms-of-service' },
  { label: 'PRIVACY POLICY', href: 'https://supermouth.com/privacy-policy' },
  { label: 'BECOME AN AFFILIATE', href: 'https://app.impact.com/campaign-campaign-info-v2/Supermouth.brand' },
]

const col2 = [
  { label: 'SHOP ALL SYSTEMS', href: '/systems-overview' },
  { label: 'SHOP ALL PRODUCTS', href: '/shop-all' },
  { label: 'SHOP ALL BUNDLES', href: '/supermouth-bundles' },
  { label: 'SUBSCRIPTION BENEFITS', href: '/subscription-benefits' },
  { label: 'ARTICLES & GUIDES', href: '/learn' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'WHAT MAKES US S.U.P.E.R.', href: '/what-makes-us-super' },
  { label: 'OUR STORY', href: '/our-story' },
  { label: 'PROTECTING THE PLANET', href: '/sustainability' },
  { label: 'GIVING BACK', href: '/philanthropy' },
  { label: 'OUR HAPPY CUSTOMERS', href: '/our-happy-customers' },
  { label: 'PLAY', href: '/play' },
  { label: 'IN THE NEWS', href: '/in-the-news' },
  { label: 'DOCUMENTATION', href: 'https://supermouth.com/documentation' },
]

const FooterLink = ({ href, label }: { href: string; label: string }) => {
  const external = href.startsWith('http')
  return (
    <li>
      <Link href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})} className="text-[14px] leading-5 hover:underline">
        {label}
      </Link>
    </li>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#F0F1F3] text-[#394C97]">
      <div className="max-w-[1312px] mx-auto px-4 pt-4 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div>
            <Link href="/" aria-label="SuperMouth home">
              <Image src="/home/SuperMouth-Full_Logo.png" alt="SuperMouth" width={160} height={47} className="w-[160px] h-auto" />
            </Link>
            <ul className="mt-5 flex gap-5">
              {socialLinks.map(s => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener" aria-label={s.name} className="block w-6 h-6 [&_svg]:w-6 [&_svg]:h-6 hover:opacity-70" dangerouslySetInnerHTML={{ __html: s.svg }} />
                </li>
              ))}
            </ul>
          </div>
          <ul className="space-y-4 pt-2">{col1.map(l => <FooterLink key={l.label} {...l} />)}</ul>
          <ul className="space-y-4 pt-2">{col2.map(l => <FooterLink key={l.label} {...l} />)}</ul>
          <div className="pt-2">
            <p className="text-[18px] leading-7 font-bold">Want More from Our Mouths?</p>
            <p className="text-[16px] leading-6">Enter your email to sign up for our newsletter</p>
            <div className="mt-6 [&_input]:border-[#394C97] [&_input]:text-[#394C97] [&_input]:placeholder-[#394C97]/60 [&_p]:text-[#394C97]">
              <NewsletterForm />
            </div>
          </div>
        </div>
        <p className="mt-12 max-w-[960px] mx-auto text-center text-[14px] leading-5">
          SuperMouth.com is designed for informational purposes only and is not a substitute for compliance with the provisions of the Federal Food, Drug, and Cosmetic (FD&amp;C) Act, the Fair Packaging and Labeling (FP&amp;L) Act, and the regulations published under the authority of these laws.
        </p>
      </div>
    </footer>
  )
}
