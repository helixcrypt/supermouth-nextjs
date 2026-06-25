import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'What Makes Us S.U.P.E.R. — SuperMouth',
  description: 'Discover the five pillars that make SuperMouth unlike anything you\'ve seen in oral care.',
}

const SUPER = [
  {
    letter: 'S',
    word: 'SAFE',
    img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_SAFE.png',
    href: '/learn/a-guide-to-understanding-oral-care-ingredient-safety',
    color: 'from-blue-500/20 to-blue-600/5',
    accent: 'text-blue-400',
    headline: 'Nothing mouthrageous®',
    desc: 'No artificial flavors, colors, sweeteners, or preservatives. No antibiotics, no SLS, no GMOs, and no "forever chemicals" like PTFE or Teflon. Every ingredient is carefully selected and rated #1 for safety by EWG — making our products safe enough for children and effective enough for adults.',
    points: ['EWG #1 Safety Rating', 'No SLS or harsh detergents', 'No artificial sweeteners or colors', 'No GMOs or "forever chemicals"', 'Third-party tested for heavy metals', 'Safe from birth through adulthood'],
  },
  {
    letter: 'U',
    word: 'UNIFIED',
    img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_UNIFIED.png',
    href: '/learn/beyond-brushing-flossing-a-comprehensive-guide-to-supercharging-your-oral-care-routine',
    color: 'from-purple-500/20 to-purple-600/5',
    accent: 'text-purple-400',
    headline: 'A complete system, not just a product',
    desc: 'Each product is designed for a specific purpose — but together, they form a complete system customized for kids, adults, pregnancy, and orthodontics. Whether it\'s our toothpaste with patented Liquid Enamel Technology™ or our orthodontic mouthwash, everything works in harmony to help you reach your oral health goals at every stage of life.',
    points: ['6 life-stage systems', 'Toothpaste + mouthwash + floss + more', 'Products work synergistically', 'Tailored to each life stage', 'Complete daily routines', 'Expert-curated bundles'],
  },
  {
    letter: 'P',
    word: 'PLAYFUL',
    img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_PLAYFUL.png',
    href: '/learn/taking-the-bore-and-chore-of-brush-time',
    color: 'from-yellow-500/20 to-yellow-600/5',
    accent: 'text-yellow-400',
    headline: 'Oral care as an adventure',
    desc: 'For kids, our SuperMouth Squad of superheroes turns brushing into an adventure with movies, music, comic books, augmented reality, and delicious flavors. For adults, our sleek tools combine advanced technology, stunning designs, and smart features that make oral care something you\'ll actually look forward to — every single day.',
    points: ['SuperMouth Squad characters', 'Augmented reality experiences', 'Musical toothbrush options', 'Kid-approved flavors', 'Movies and comic books', 'Sleek adult designs'],
  },
  {
    letter: 'E',
    word: 'EFFECTIVE',
    img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_EFFECTIVE.png',
    href: '/learn/are-your-oral-care-products-actually-working',
    color: 'from-green-500/20 to-green-600/5',
    accent: 'text-green-400',
    headline: 'Results you can feel and trust',
    desc: 'With over 200 expertly developed products and nearly 300 patents, SuperMouth delivers results you can feel. From nano-hydroxyapatite and prebiotics to formulas enhanced with essential vitamins and minerals, our systems support enamel strength, gum health, and a thriving oral microbiome — at every age.',
    points: ['200+ products', 'Nearly 300 patents', 'Nano-hydroxyapatite (Hydroxamin®)', 'Prebiotics for microbiome health', 'Vitamins K2 & D3', 'Patented SuperBristles technology'],
  },
  {
    letter: 'R',
    word: 'REPUTABLE',
    img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_REPUTABLE.png',
    href: '/learn/who-s-claiming-your-oral-care-products-work-because-it-matters-1',
    color: 'from-red-500/20 to-red-600/5',
    accent: 'text-red-400',
    headline: 'Trusted by thousands of dental professionals',
    desc: 'Developed by top dentists and medical experts, SuperMouth is trusted by thousands of dental professionals nationwide. Our commitment to science, safety, and research-backed innovation makes us the go-to resource for world-class oral health — proven, recommended, and held to the highest standards.',
    points: ['Founded by dentists', '125,000+ families served', 'Recommended by dental professionals', '10,000+ verified reviews', '★ 4.8/5 average rating', '500,000+ orders shipped'],
  },
]

export default function WhatMakesUsSuperPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-sm-dark border-b border-white/10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Our Philosophy</p>
          <h1 className="font-display font-black text-5xl md:text-7xl mb-6 tracking-tight">
            S<span className="text-sm-gray/40">.</span>U<span className="text-sm-gray/40">.</span>P<span className="text-sm-gray/40">.</span>E<span className="text-sm-gray/40">.</span>R<span className="text-sm-gray/40">.</span>
          </h1>
          <p className="text-sm-gray text-sm max-w-xl mx-auto mb-8">
            Five pillars that define everything we make and every decision we take. Discover what makes SuperMouth unlike anything you've seen in oral care.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {SUPER.map(s => (
              <a key={s.letter} href={`#${s.word.toLowerCase()}`}
                className="px-4 py-2 border border-white/20 rounded-full text-xs font-bold text-sm-gray hover:border-sm-accent hover:text-sm-accent transition-colors">
                {s.letter} — {s.word}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* S.U.P.E.R. sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {SUPER.map((item, i) => (
          <div
            key={item.letter}
            id={item.word.toLowerCase()}
            className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
          >
            {/* Visual */}
            <div className={`relative rounded-3xl bg-gradient-to-br ${item.color} p-12 flex items-center justify-center aspect-square max-w-md mx-auto w-full`}>
              <div className="absolute top-6 left-6">
                <span className={`font-display font-black text-6xl ${item.accent} opacity-30`}>{item.letter}</span>
              </div>
              <Image
                src={item.img}
                alt={item.word}
                width={240}
                height={240}
                className="object-contain relative z-10"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`font-display font-black text-5xl ${item.accent}`}>{item.letter}</span>
                <span className="font-display font-black text-2xl tracking-widest">{item.word}</span>
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-4 leading-tight">{item.headline}</h2>
              <p className="text-sm-gray text-sm leading-relaxed mb-6">{item.desc}</p>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {item.points.map(p => (
                  <li key={p} className="flex items-start gap-2 text-xs text-sm-gray">
                    <span className="text-sm-accent mt-0.5 flex-shrink-0">✓</span>{p}
                  </li>
                ))}
              </ul>
              <Link href={item.href} className={`text-sm font-semibold ${item.accent} hover:underline`}>
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-sm-accent/10 border-y border-sm-accent/20 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-4">Experience the S.U.P.E.R. difference</h2>
          <p className="text-sm-gray text-sm mb-8">Join 125,000+ families who've made the switch to oral care that actually works.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
            <Link href="/assessment" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
