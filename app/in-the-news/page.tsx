'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import DoctorCarousel from '@/components/DoctorCarousel'

const pressLogos = ['Good Housekeeping', 'Today', 'Prevention', 'Entrepreneur', 'HuffPost']

const featuredMedia = [
  {
    img: 'https://cdn.supermouth.com/website/press_mensjournal_feature.jpg',
    fallbackBg: '#1a1a2e',
    outlet: "MEN'S JOURNAL",
    outletColor: '#c8a951',
    headline: "Men's Journal Names SuperMouth Ultim8 Best Sonic Toothbrush of 2025",
    href: 'https://www.mensjournal.com/grooming/best-grooming-products',
  },
  {
    img: 'https://cdn.supermouth.com/website/press_cnn_feature.jpg',
    fallbackBg: '#cc0000',
    outlet: 'CNN',
    outletColor: '#cc0000',
    headline: "Your dentist knows you're not flossing. Here's how to nail your oral health routine",
    href: 'https://www.cnn.com/cnn-underscored/health-fitness/oral-hygiene-routine',
  },
  {
    img: 'https://cdn.supermouth.com/website/press_cheddar_feature.jpg',
    fallbackBg: '#00b140',
    outlet: 'CHEDDAR',
    outletColor: '#00b140',
    headline: 'Teaching Kids How to Brush Their Teeth the Right Way',
    href: 'https://cheddar.com/media/teaching-kids-how-to-brush-their-teeth-the-right-way',
  },
]

const additionalMedia = [
  { outlet: 'TechRadar', outletColor: '#0093d0', headline: 'ULTIM8 Recognized as Best Self-Cleaning Electric Toothbrush', href: 'https://www.techradar.com/best/electric-toothbrushes', bg: '#e8f4fd' },
  { outlet: 'Daily Mom', outletColor: '#e91e8c', headline: "SuperMouth's Ultim8 SmartBrush Named Top Mother's Day Gift", href: 'https://dailymom.com', bg: '#fde8f4' },
  { outlet: 'CNET', outletColor: '#cc0000', headline: "CNET Names SuperMouth Ultim8 as 2025's Best Soft-Bristled Electric Brush", href: 'https://www.cnet.com/health/personal-care/best-electric-toothbrush/', bg: '#fde8e8' },
  { outlet: 'Tamron Hall', outletColor: '#6b21a8', headline: 'SuperMouth Ultim8 SmartBrush System Featured on the Tamron Hall Show', href: 'https://www.youtube.com/watch?v=OIPIqIG6fFw', bg: '#f3e8fd' },
  { outlet: 'AskMen', outletColor: '#1a56db', headline: '2025 AskMen Grooming Awards — Best Sonic Toothbrush', href: 'https://www.askmen.com/grooming/skin/grooming-awards-2025-face-care-products.html', bg: '#e8effe' },
  { outlet: 'Seventeen', outletColor: '#e91e8c', headline: 'The Best Teeth Whitening Kits', href: 'https://www.seventeen.com/beauty/g42640642/best-teeth-whitening-kits/', bg: '#fde8f4' },
  { outlet: 'PopSugar', outletColor: '#ff6b9d', headline: 'The 10 Best Electric Toothbrushes to Elevate Your Brushing Game', href: 'https://www.popsugar.com/beauty/dentist-recommended-electric-toothbrushes-48078961', bg: '#fff0f6' },
  { outlet: 'KTLA', outletColor: '#003087', headline: 'Dr. Kami Hoss on Why Oral Hygiene is Very Important for Kids and Adults', href: 'https://ktla.com', bg: '#e8effe' },
  { outlet: 'HuffPost', outletColor: '#00857a', headline: "Dentists Can Tell a Lot About Someone's Health Just by Looking in Their Mouth", href: 'https://www.huffpost.com/entry/what-dentists-know-by-looking-mouth_l_64bc53c4e4b038c60ccab400', bg: '#e8f8f7' },
  { outlet: "Woman's World", outletColor: '#c2185b', headline: 'Top Dental Tips for Reversing Gum Disease', href: 'https://www.womansworld.com/wellness/gum-disease-self-care', bg: '#fce8f0' },
  { outlet: 'Camille Styles', outletColor: '#78350f', headline: 'Top Dentist Shares the Surprising Connection Between Oral Care and Gut Health', href: 'https://camillestyles.com/wellness/gut-health-oral-hygiene/', bg: '#fdf3e8' },
  { outlet: 'Yahoo! Health', outletColor: '#6001d2', headline: 'The First-rate Tested Toothbrushes for Healthy Gums and Teeth', href: 'https://www.yahoo.com/lifestyle/best-electric-toothbrush-221127494.html', bg: '#f0e8fe' },
]

const allAwards = [
  { year: 2026, pub: 'HEALTH', title: 'Best for Braces', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'TECH RADAR', title: 'Best Self Cleaning Brush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'GOOD HOUSEKEEPING', title: 'Best for Braces', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'GOOD HOUSEKEEPING', title: 'Best for Kids', product: 'Smile Sidekick Sonic Mouthbrush', href: 'https://supermouth.com/products/dr-hoss-smile-sidekick-toothbrush' },
  { year: 2026, pub: 'FORBES VETTED', title: 'Best Electric Toothbrush for Toddlers', product: 'Turbo Sonic Toothbrush', href: 'https://supermouth.com/products/turbo-sonic-mouthbrush' },
  { year: 2026, pub: 'YAHOO! HEALTH', title: 'Honorable Mention', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'CNET', title: 'Best Soft-Bristled Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'NEW BEAUTY', title: 'Best Floss', product: 'Hydroxamin with Fluoride Mouth Floss', href: 'https://supermouth.com/products/supermouth-hydroxamin-with-fluoride-mouthfloss' },
  { year: 2026, pub: 'CNN UNDERSCORED', title: 'Editor Favorite', product: 'Flouride Nano-Hydroxyapatite Toothpaste', href: 'https://supermouth.com/products/supermouth-hydroxamin-w-fluoride-toothpaste-3-4-oz' },
  { year: 2025, pub: 'POP SUGAR', title: 'Best Electric Toothbrush System', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2025, pub: 'ASK MEN', title: 'Best Sonic Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2025, pub: "MEN'S JOURNAL", title: 'Best Sonic Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
]

export default function InTheNewsPage() {
  const [awardFilter, setAwardFilter] = useState<'all' | 2026 | 2025>('all')

  const filteredAwards = awardFilter === 'all'
    ? allAwards
    : allAwards.filter(a => a.year === awardFilter)

  return (
    <div className="bg-sm-bg text-sm-navy">

      {/* Hero — full width image with text overlaid on left */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#4ab8c4' }}>
        <div className="relative">
          {/* Full width background image */}
          <Image
            src="https://cdn.supermouth.com/images/SM-website_2.0-_in_the_news_page-header_image-ni.jpg"
            alt="SuperMouth in the news"
            width={1440}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
          {/* Text overlay on left side */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <div className="max-w-md">
                <p className="text-sm-navy text-xs font-bold uppercase tracking-widest mb-2">IN THE NEWS</p>
                <h1 className="font-display font-black text-3xl md:text-4xl text-sm-navy mb-5 leading-tight">
                  Making Headlines Everywhere:<br />
                  SuperMouth in the Media Spotlight
                </h1>
                <div className="space-y-2">
                  {[
                    '"An Oral Hygiene Brand Made a Superhero Film to Inspire Kids to Brush Their Teeth" - Adweek',
                    '"SuperMouth revolutionises the market with ice-cream flavoured mouthwashes" - Laura Pérez',
                    '"Adventure Film \'The Rise of SuperMouth\' That Just Might Get Your Kids To Brush" - Accesswire',
                  ].map((quote, i) => (
                    <p key={i} className="text-sm-navy/80 text-xs italic leading-relaxed bg-white/40 rounded-lg px-3 py-2 backdrop-blur-sm">
                      {quote}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press logo bar */}
      <div className="bg-white border-y border-gray-100 py-5">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-10">
          {pressLogos.map(logo => (
            <span key={logo} className="text-sm-gray font-bold text-sm">{logo}</span>
          ))}
        </div>
      </div>

      {/* Featured + Additional Media */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Featured */}
        <p className="text-center font-black text-lg mb-5" style={{ fontFamily: 'cursive', color: '#f97316' }}>
          featured media
        </p>
        <div className="border border-gray-200 rounded-2xl p-5 bg-white mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {featuredMedia.map(item => (
              <a key={item.outlet} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                {/* Colored placeholder matching original style */}
                <div className="h-36 flex items-center justify-center" style={{ backgroundColor: item.fallbackBg }}>
                  <span className="font-black text-white text-xl opacity-80">{item.outlet}</span>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs font-black mb-1" style={{ color: item.outletColor }}>{item.outlet}</p>
                  <p className="text-xs font-semibold text-sm-navy leading-snug group-hover:text-sm-teal transition-colors">{item.headline}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Additional */}
        <p className="text-center font-black text-lg mb-5" style={{ fontFamily: 'cursive', color: '#f97316' }}>
          additional media
        </p>
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {additionalMedia.map(item => (
              <a key={item.outlet + item.headline} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-24 flex items-center justify-center px-3" style={{ backgroundColor: item.bg }}>
                  <span className="font-black text-sm text-center leading-tight" style={{ color: item.outletColor }}>
                    {item.outlet}
                  </span>
                </div>
                <div className="p-2 bg-white">
                  <p className="text-xs font-bold mb-0.5" style={{ color: item.outletColor }}>{item.outlet}</p>
                  <p className="text-xs text-sm-navy leading-snug line-clamp-3 group-hover:text-sm-teal transition-colors">{item.headline}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-5">
            <button className="bg-sm-yellow text-sm-navy font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity">
              See More Press Coverage
            </button>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <p className="text-center font-black text-lg mb-1" style={{ fontFamily: 'cursive', color: '#f97316' }}>
          awards & recognition
        </p>
        <p className="text-center text-xs text-sm-gray mb-5 max-w-2xl mx-auto">
          Editors and journalists at the world's leading health and lifestyle publications have recognized SuperMouth across products, ingredients, and innovation.
        </p>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {(['all', 2026, 2025] as const).map(filter => (
            <button
              key={String(filter)}
              onClick={() => setAwardFilter(filter)}
              className={`px-5 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${
                awardFilter === filter
                  ? 'bg-sm-navy text-white border-sm-navy'
                  : 'bg-white text-sm-navy border-gray-200 hover:border-sm-navy'
              }`}
            >
              {filter === 'all' ? 'All' : filter}
            </button>
          ))}
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAwards.map((award, i) => (
            <Link key={i} href={award.href}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow group flex items-start gap-3">
              <div className="flex-shrink-0 text-center w-12">
                <span className="text-xl">🏆</span>
                <p className="text-xs font-bold text-sm-teal mt-0.5">{award.year}</p>
              </div>
              <div>
                <p className="text-xs font-black text-sm-gray tracking-widest mb-0.5">{award.pub}</p>
                <p className="text-sm font-bold text-sm-navy leading-snug group-hover:text-sm-teal transition-colors">{award.title}</p>
                <p className="text-xs text-sm-gray mt-0.5">{award.product}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-5">
          <button className="bg-sm-yellow text-sm-navy font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity">
            See More Awards
          </button>
        </div>

        <div className="mt-5 bg-sm-navy text-white rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">About These Awards</p>
          <p className="text-sm text-white/70">
            Every recognition listed here reflects an editorial decision made by journalists and editors at publications trusted by millions of consumers worldwide.
          </p>
        </div>
      </section>

      {/* Why Dental Professionals — carousel */}
      <section className="bg-sm-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display font-black text-xl text-center mb-10">
            why dental professionals recommend SuperMouth
          </h2>
          <DoctorCarousel />
          <div className="text-center mt-10">
            <Link href="https://supermouthpro.com" target="_blank"
              className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Dental Professionals: Join SuperMouth Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Explore SuperMouth */}
      <section className="bg-sm-navy border-t border-white/10 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-white font-display font-black text-xl text-center mb-8 uppercase tracking-widest">
            Explore SuperMouth
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '📬', title: 'Media Inquiries', desc: "For interview requests, expert commentary, or additional information, reach out to our PR team here. We're ready to collaborate on your next story.", cta: 'Contact PR Team', href: '/contact' },
              { icon: '🦷', title: 'SuperMouth Pro', desc: 'Dental and medical professionals — explore how you can partner with us to bring revolutionary oral care solutions to your patients. Discover more here.', cta: 'Join SuperMouth Pro', href: 'https://supermouthpro.com' },
              { icon: '🔬', title: 'Explore & Learn', desc: 'Dive into the latest articles, research, and educational content to stay informed about oral health and innovations. Start exploring now.', cta: 'Read Articles', href: '/learn' },
            ].map(box => (
              <div key={box.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{box.icon}</div>
                <h3 className="font-display font-bold text-white text-sm mb-3">{box.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-5">{box.desc}</p>
                <Link href={box.href} className="text-sm-yellow text-xs font-bold hover:underline">
                  {box.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
