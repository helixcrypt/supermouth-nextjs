import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Shop All Systems — SuperMouth',
  description: 'Expert-curated oral care systems for every age and stage — from teething to adulthood, orthodontics and pregnancy.',
}

const systems = [
  {
    label: 'Teething to 24 Months',
    slug: 'teething-to-24-months',
    img: 'https://cdn.supermouth.com/website/0-24_Complete_NFL.png',
    tag: 'Ages 0–2',
    tagColor: 'bg-pink-500/20 text-pink-300',
    desc: 'Designed for new smiles, our Teething System includes safe teethers and soft-bristled brushes, along with toothpaste enriched with Hydroxamin® and prebiotics, curated by leading dentists for optimal early oral care.',
    highlights: ['Safe teethers for sore gums', 'Ultra-soft first toothbrush', 'Hydroxamin® enriched toothpaste', 'Prebiotic formula', 'No fluoride option available', 'Dentist-curated for 0–2'],
    href: '/systems/teething-to-24-months',
  },
  {
    label: 'Ages 2–5',
    slug: '2-to-5',
    img: 'https://cdn.supermouth.com/website/2-5_Complete_NFL.png',
    tag: 'Ages 2–5',
    tagColor: 'bg-yellow-500/20 text-yellow-300',
    desc: 'Featuring flavorful pastes, flossers, and mouth sprays — each pH-balanced and packed with vital nutrients, alongside fun brushes and adorable tongue cleaners. Curated to make oral care both enjoyable and effective for little ones.',
    highlights: ['Kid-approved flavors', 'pH-balanced formulas', 'Fun character toothbrushes', 'Flossers sized for small mouths', 'Mouth spray for on-the-go', 'Tongue cleaners for kids'],
    href: '/systems/2-to-5',
  },
  {
    label: 'Ages 6–12',
    slug: '6-to-12',
    img: 'https://cdn.supermouth.com/website/6-12_Complete_NFL.png',
    tag: 'Ages 6–12',
    tagColor: 'bg-blue-500/20 text-blue-300',
    desc: 'Designed for growing kids, this Transition System offers multiple toothbrush choices with features such as music and augmented reality, plus dentist-curated, pH-balanced products with Hydroxamin® and prebiotics.',
    highlights: ['Musical toothbrush option', 'Augmented reality features', 'Supports transition to permanent teeth', 'Hydroxamin® + prebiotics', 'Multiple brush options', 'pH-balanced formulas'],
    href: '/systems/6-to-12',
  },
  {
    label: 'Teens & Adults',
    slug: 'teens-and-adults',
    img: 'https://cdn.supermouth.com/website/teen_adult_complete_nfl.png',
    tag: 'Ages 13+',
    tagColor: 'bg-purple-500/20 text-purple-300',
    desc: 'The Teen & Adult System blends style with function, offering toothbrushes with groundbreaking bristle design for a perfect fit, alongside a pH-balanced, nutrient-rich selection from toothpaste to mouthwash, floss to mouth spray.',
    highlights: ['Patented SuperBristles', 'Whitening + enamel strength', 'Electric & sonic options', 'UV sanitizer available', 'Fluoride & non-fluoride', 'Complete 6-step system'],
    href: '/systems/teens-and-adults',
  },
  {
    label: 'Pregnancy',
    slug: 'pregnancy',
    img: 'https://cdn.supermouth.com/website/pregnancy_complete_nfl.png',
    tag: 'Pregnancy & Nursing',
    tagColor: 'bg-green-500/20 text-green-300',
    desc: 'The Pregnancy System, recommended by leading dentists, offers a pH-balanced, Hydroxamin® and prebiotic-infused selection, ensuring safe and effective oral care for mothers-to-be through every trimester and beyond.',
    highlights: ['Safe through all trimesters', 'Gentle on sensitive gums', 'No harsh chemicals', 'Hydroxamin® + prebiotics', 'pH-balanced for nausea', 'Dentist-recommended'],
    href: '/systems/pregnancy',
  },
  {
    label: 'Orthodontics',
    slug: 'orthodontics',
    img: 'https://cdn.supermouth.com/website/Ortho_Basic_Mint_Hydroxamin.jpg',
    tag: 'Braces & Aligners',
    tagColor: 'bg-sm-accent/20 text-sm-accent',
    desc: 'Our Ortho System features uniquely formulated toothpaste and mouthwash for orthodontic care, plus ortho-specific floss with a threader and a toothbrush with patented bristles designed for effective cleaning around appliances.',
    highlights: ['Patented ortho bristles', 'OrthoFloss with threader', 'Prevents white spot lesions', 'Works with braces & aligners', 'Retainer care included', 'Orthodontist-developed'],
    href: '/systems/orthodontics',
  },
]

const whySystemsReasons = [
  { icon: '💰', title: 'Save 15%', desc: 'Every system saves you 15% vs buying products individually.' },
  { icon: '🦷', title: 'Expert-Curated', desc: 'Built by dentists who use these products on their own families.' },
  { icon: '✅', title: 'Complete Care', desc: 'Everything you need in one box — no guesswork, no missing pieces.' },
  { icon: '🔄', title: 'Subscribe & Save', desc: 'Set up auto-delivery and lock in an additional discount for life.' },
]

export default function SystemsOverviewPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sm-dark border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Complete Oral Care</p>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-4 leading-tight">
            A System for Every<br />
            <span className="gradient-text">Age & Stage</span>
          </h1>
          <p className="text-sm-gray text-sm max-w-2xl mx-auto mb-8">
            Generic brands sell everyone the same toothpaste. SuperMouth engineers a complete system for each life stage — Babies, Little Kids, Big Kids, Teens & Adults, Pregnancy, and Orthodontics.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {systems.map(s => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-white/20 text-sm-gray hover:border-sm-accent hover:text-sm-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Systems */}
      <section className="bg-sm-accent/5 border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {whySystemsReasons.map(r => (
              <div key={r.title} className="text-center">
                <div className="text-3xl mb-2">{r.icon}</div>
                <h3 className="font-display font-bold text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-sm-gray">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {systems.map((system, i) => (
          <div
            key={system.slug}
            id={system.slug}
            className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
          >
            {/* Image */}
            <div className="relative aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden bg-white/5 group">
              <Image
                src={system.img}
                alt={system.label}
                fill
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${system.tagColor}`}>
                {system.tag}
              </span>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">Complete System</p>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-4 leading-tight">{system.label}</h2>
              <p className="text-sm-gray text-sm leading-relaxed mb-6">{system.desc}</p>

              {/* Highlights */}
              <ul className="grid grid-cols-2 gap-2 mb-8">
                {system.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-xs text-sm-gray">
                    <span className="text-sm-accent mt-0.5 flex-shrink-0">✓</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={system.href}
                  className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
                >
                  Shop {system.label} →
                </Link>
                <Link
                  href="/assessment"
                  className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-white/10 transition-colors"
                >
                  Take the Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="bg-sm-blue/20 border-y border-white/10 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Not sure which system is right for you?</h2>
          <p className="text-sm-gray text-sm mb-8">
            Take our quick assessment and get a personalized recommendation from our dental experts in under 2 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/assessment" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Take the Assessment →
            </Link>
            <Link href="/shop-all" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
