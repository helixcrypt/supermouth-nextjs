'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import DoctorCarousel from '@/components/DoctorCarousel'

const pressLogos = [
  { name: 'Good Housekeeping', img: 'https://cdn.supermouth.com/website/press_logo_goodhousekeeping.png', fallback: 'Good\nHousekeeping' },
  { name: 'Today', img: 'https://cdn.supermouth.com/website/press_logo_today.png', fallback: 'TODAY' },
  { name: 'Prevention', img: 'https://cdn.supermouth.com/website/press_logo_prevention.png', fallback: 'Prevention' },
  { name: 'Entrepreneur', img: 'https://cdn.supermouth.com/website/press_logo_entrepreneur.png', fallback: 'Entrepreneur' },
  { name: 'HuffPost', img: 'https://cdn.supermouth.com/website/press_logo_huffpost.png', fallback: 'IHUFFPOSTI' },
]

const featuredMedia = [
  {
    img: 'https://cdn.supermouth.com/website/press_mensjournal_ultim8.jpg',
    outlet: "Men's Journal",
    headline: "Men's Journal Names SuperMouth Ultim8 Best Sonic Toothbrush of 2025",
    href: 'https://www.mensjournal.com/grooming/best-grooming-products',
  },
  {
    img: 'https://cdn.supermouth.com/website/press_cnn_flossing.jpg',
    outlet: 'CNN',
    headline: "Your dentist knows you're not flossing. Here's how to nail your oral health routine",
    href: 'https://www.cnn.com/cnn-underscored/health-fitness/oral-hygiene-routine',
  },
  {
    img: 'https://cdn.supermouth.com/website/press_cheddar_kids.jpg',
    outlet: 'Cheddar',
    headline: 'Teaching Kids How to Brush Their Teeth the Right Way',
    href: 'https://cheddar.com/media/teaching-kids-how-to-brush-their-teeth-the-right-way',
  },
]

const additionalMedia = [
  { img: 'https://cdn.supermouth.com/website/press_techradar.jpg', outlet: 'TechRadar', headline: 'ULTIM8 Recognized as Best Self-Cleaning Electric Toothbrush', href: 'https://www.techradar.com/best/electric-toothbrushes' },
  { img: 'https://cdn.supermouth.com/website/press_dailymom.jpg', outlet: 'Daily Mom', headline: "SuperMouth's Ultim8 SmartBrush Named Top Mother's Day Gift", href: 'https://dailymom.com/discover/creative-cozy-and-luxurious-mothers-day-gifts-for-every-mom/' },
  { img: 'https://cdn.supermouth.com/website/press_cnet.jpg', outlet: 'CNET', headline: "CNET Names SuperMouth Ultim8 as 2025's Best Soft-Bristled Electric Brush", href: 'https://www.cnet.com/health/personal-care/best-electric-toothbrush/' },
  { img: 'https://cdn.supermouth.com/website/press_tamronhall.jpg', outlet: 'Tamron Hall', headline: 'SuperMouth Ultim8 SmartBrush System Featured on the Tamron Hall Show', href: 'https://www.youtube.com/watch?v=OIPIqIG6fFw' },
  { img: 'https://cdn.supermouth.com/website/press_askmen.jpg', outlet: 'AskMen', headline: '2025 AskMen Grooming Awards — Best Sonic Toothbrush', href: 'https://www.askmen.com/grooming/skin/grooming-awards-2025-face-care-products.html' },
  { img: 'https://cdn.supermouth.com/website/press_seventeen.jpg', outlet: 'Seventeen', headline: 'The Best Teeth Whitening Kits', href: 'https://www.seventeen.com/beauty/g42640642/best-teeth-whitening-kits/' },
  { img: 'https://cdn.supermouth.com/website/press_popsugar.jpg', outlet: 'PopSugar', headline: 'The 10 Best Electric Toothbrushes to Elevate Your Brushing Game', href: 'https://www.popsugar.com/beauty/dentist-recommended-electric-toothbrushes-48078961' },
  { img: 'https://cdn.supermouth.com/website/press_ktla.jpg', outlet: 'KTLA', headline: "Dr. Kami Hoss on Why Oral Hygiene is Very Important for Kids and Adults", href: 'https://ktla.com/video/dr-kami-hoss-discuss-the-importance-of-oral-hygiene-for-kids/8879706/' },
  { img: 'https://cdn.supermouth.com/website/press_huffpost.jpg', outlet: 'HuffPost', headline: "Dentists Can Tell a Lot About Someone's Health Just by Looking in Their Mouth", href: 'https://www.huffpost.com/entry/what-dentists-know-by-looking-mouth_l_64bc53c4e4b038c60ccab400' },
  { img: 'https://cdn.supermouth.com/website/press_womansworld.jpg', outlet: "Woman's World", headline: 'Top Dental Tips for Reversing Gum Disease', href: 'https://www.womansworld.com/wellness/gum-disease-self-care' },
  { img: 'https://cdn.supermouth.com/website/press_camille.jpg', outlet: 'Camille Styles', headline: 'Top Dentist Shares the Surprising Connection Between Oral Care and Gut Health', href: 'https://camillestyles.com/wellness/gut-health-oral-hygiene/' },
  { img: 'https://cdn.supermouth.com/website/press_yahoo.jpg', outlet: 'Yahoo! Health', headline: 'The First-rate Tested Toothbrushes for Healthy Gums and Teeth', href: 'https://www.yahoo.com/lifestyle/best-electric-toothbrush-221127494.html' },
]

const allAwards = [
  { year: 2026, pub: 'Health', title: 'Best for Braces', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'Tech Radar', title: 'Best Self Cleaning Brush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'Good Housekeeping', title: 'Best for Braces', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'Good Housekeeping', title: 'Best for Kids', product: 'Smile Sidekick Sonic Mouthbrush', href: 'https://supermouth.com/products/dr-hoss-smile-sidekick-toothbrush' },
  { year: 2026, pub: 'Forbes Vetted', title: 'Best Electric Toothbrush for Toddlers', product: 'Turbo Sonic Toothbrush', href: 'https://supermouth.com/products/turbo-sonic-mouthbrush' },
  { year: 2026, pub: 'Yahoo! Health', title: 'Honorable Mention', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'CNET', title: 'Best Soft-Bristled Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2026, pub: 'New Beauty', title: 'Best Floss', product: 'Hydroxamin with Fluoride Mouth Floss', href: 'https://supermouth.com/products/supermouth-hydroxamin-with-fluoride-mouthfloss' },
  { year: 2026, pub: 'CNN Underscored', title: 'Editor Favorite', product: 'Flouride Nano-Hydroxyapatite Toothpaste', href: 'https://supermouth.com/products/supermouth-hydroxamin-w-fluoride-toothpaste-3-4-oz' },
  { year: 2025, pub: 'Pop Sugar', title: 'Best Electric Toothbrush System', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2025, pub: 'Ask Men', title: 'Best Sonic Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { year: 2025, pub: "Men's Journal", title: 'Best Sonic Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
]

export default function InTheNewsPage() {
  const [awardFilter, setAwardFilter] = useState<'all' | 2026 | 2025>('all')

  const filteredAwards = awardFilter === 'all'
    ? allAwards
    : allAwards.filter(a => a.year === awardFilter)

  return (
    <div className="bg-sm-bg text-sm-navy">

      {/* Hero — teal bg, quotes left, products right */}
      <section style={{ backgroundColor: '#4ab8c4' }} className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-10 md:py-14">
            <div>
              <p className="text-sm-navy text-xs font-bold uppercase tracking-widest mb-3">in the news</p>
              <h1 className="font-display font-black text-3xl md:text-4xl text-sm-navy mb-6 leading-tight">
                Making Headlines Everywhere:<br />
                SuperMouth in the Media Spotlight
              </h1>
              <div className="space-y-3">
                {[
                  '"An Oral Hygiene Brand Made a Superhero Film to Inspire Kids to Brush Their Teeth" - Adweek',
                  '"SuperMouth revolutionises the market with ice-cream flavoured mouthwashes" - Laura Pérez',
                  '"Adventure Film \'The Rise of SuperMouth\' That Just Might Get Your Kids To Brush" - Accesswire',
                ].map((quote, i) => (
                  <p key={i} className="text-sm-navy/80 text-xs italic leading-relaxed bg-white/20 rounded-xl px-4 py-2">
                    {quote}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://cdn.supermouth.com/images/SM-website_2.0-_in_the_news_page-header_image-ni.jpg"
                alt="SuperMouth in the news"
                width={600}
                height={350}
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Press logo bar */}
      <div className="bg-white border-y border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8">
          {pressLogos.map(logo => (
            <div key={logo.name} className="text-sm-gray font-bold text-sm text-center leading-tight">
              {logo.name}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Media */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center font-black text-lg mb-6" style={{ fontFamily: 'cursive', color: '#f97316' }}>
          featured media
        </p>
        <div className="border border-gray-200 rounded-2xl p-6 mb-10 bg-white">
          <div className="grid md:grid-cols-3 gap-5">
            {featuredMedia.map(item => (
              <a key={item.headline} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative h-40 bg-sm-bg overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.headline}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-sm-teal uppercase tracking-widest mb-1">{item.outlet}</p>
                  <p className="text-xs font-semibold text-sm-navy leading-snug">{item.headline}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Additional Media */}
        <p className="text-center font-black text-lg mb-6" style={{ fontFamily: 'cursive', color: '#f97316' }}>
          additional media
        </p>
        <div className="border border-gray-200 rounded-2xl p-6 bg-white mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {additionalMedia.map(item => (
              <a key={item.headline} href={item.href} target="_blank" rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative h-28 bg-sm-bg overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.headline}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-bold text-sm-teal">{item.outlet}</p>
                  <p className="text-xs text-sm-navy leading-snug line-clamp-2">{item.headline}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-6">
            <button className="bg-sm-yellow text-sm-navy font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity">
              See More Press Coverage
            </button>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-center font-black text-lg mb-2" style={{ fontFamily: 'cursive', color: '#f97316' }}>
          awards & recognition
        </p>
        <p className="text-center text-sm text-sm-gray mb-6 max-w-2xl mx-auto">
          Editors and journalists at the world's leading health and lifestyle publications have recognized SuperMouth across products, ingredients, and innovation.
        </p>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {(['all', 2026, 2025] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setAwardFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                awardFilter === filter
                  ? 'bg-sm-navy text-white border-sm-navy'
                  : 'bg-white text-sm-navy border-gray-200 hover:border-sm-navy'
              }`}
            >
              {filter === 'all' ? 'All' : filter}
            </button>
          ))}
        </div>

        {/* Award cards — 3 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAwards.map((award, i) => (
            <Link key={i} href={award.href}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-center">
                  <span className="text-2xl">🏆</span>
                  <p className="text-xs font-bold text-sm-teal mt-1">{award.year}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-sm-gray uppercase tracking-widest mb-1">{award.pub}</p>
                  <p className="text-sm font-bold text-sm-navy leading-snug group-hover:text-sm-teal transition-colors">
                    {award.title}
                  </p>
                  <p className="text-xs text-sm-gray mt-1">{award.product}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="bg-sm-yellow text-sm-navy font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity">
            See More Awards
          </button>
        </div>

        {/* About these awards */}
        <div className="mt-6 bg-sm-navy text-white rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">About These Awards</p>
          <p className="text-sm text-white/70">
            Every recognition listed here reflects an editorial decision made by journalists and editors at publications trusted by millions of consumers worldwide.
          </p>
        </div>
      </section>

      {/* Why Dental Professionals — carousel */}
      <section className="bg-sm-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-display font-black text-2xl text-center mb-10">
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

      {/* Explore SuperMouth — 3 info boxes */}
      <section className="bg-sm-navy border-t border-white/10 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-white font-display font-black text-xl text-center mb-8 uppercase tracking-widest">
            Explore SuperMouth
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '📬',
                title: 'Media Inquiries',
                desc: 'For interview requests, expert commentary, or additional information, reach out to our PR team here. We\'re ready to collaborate on your next story.',
                cta: 'Contact PR Team',
                href: '/contact',
              },
              {
                icon: '🦷',
                title: 'SuperMouth Pro',
                desc: 'Dental and medical professionals — explore how you can partner with us to bring revolutionary oral care solutions to your patients. Discover more here.',
                cta: 'Join SuperMouth Pro',
                href: 'https://supermouthpro.com',
              },
              {
                icon: '🔬',
                title: 'Explore & Learn',
                desc: 'Dive into the latest articles, research, and educational content to stay informed about oral health and innovations. Start exploring now.',
                cta: 'Read Articles',
                href: '/learn',
              },
            ].map(box => (
              <div key={box.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{box.icon}</div>
                <h3 className="font-display font-bold text-white text-base mb-3">{box.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-5">{box.desc}</p>
                <Link href={box.href}
                  className="text-sm-yellow text-xs font-bold hover:underline">
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
