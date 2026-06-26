import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Protecting the Planet — SuperMouth',
  description: 'SuperMouth\'s commitment to sustainability — environmentally safe ingredients, eco-friendly packaging, and innovative reusable designs.',
}

const sections = [
  {
    id: 'ingredients',
    title: 'Environmentally Safe Ingredients',
    titleColor: '#f5d800',
    borderColor: '#f5d800',
    imgSide: 'right',
    img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png',
    imgWidth: 280,
    imgHeight: 300,
    bullets: [
      'Our consumable products only contain ingredients rated as a 1 (Low Hazard) by the Environmental Working Group (EWG). The EWG scale ranges from 1 (low hazard) to 10 (high hazard), ensuring our products are safe for you and the planet. This is notable since many toothpastes and mouthwashes currently on the market, both \'conventional\' and \'natural,\' contain ingredients ranging from 2 to 10 on the EWG scale.',
      'We do not use any \'forever chemicals,\' such as PTFE (Polytetrafluoroethylene) or Teflon, which are commonly found in over-the-counter flosses and other products. These chemicals do not break down, can accumulate in the environment and living organisms, and pose significant health and environmental risks.',
    ],
    table: [
      { ingredient: 'xylitol', rating: 1 },
      { ingredient: 'hydroxyapatite', rating: 1 },
      { ingredient: 'vitamin K2', rating: 1 },
      { ingredient: 'vitamin D3', rating: 1 },
      { ingredient: 'quillaja extract', rating: 1 },
      { ingredient: 'vitamin C (as sodium ascorbate)', rating: 1 },
      { ingredient: 'stevia leaf extract', rating: 1 },
      { ingredient: 'cranberry seed oil', rating: 1 },
      { ingredient: 'xanthan gum', rating: 1 },
      { ingredient: 'inulin', rating: 1 },
    ],
  },
  {
    id: 'eco-packaging',
    title: 'Eco-Friendly Packaging',
    titleColor: '#4ab8c4',
    borderColor: '#4ab8c4',
    imgSide: 'left',
    img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png',
    imgWidth: 200,
    imgHeight: 350,
    bullets: [
      'Toothpaste Tubes: Up to 50% of our toothpaste tubes are made from Post-Consumer Recycled (PCR) materials.',
      'Toothpaste Caps: These use up to 30% PCR materials.',
      'Mono-material Construction: Both our toothpaste tubes and caps are made from the same material, facilitating easier sorting and recycling.',
      'Biodegradable Additives: Our toothpaste tubes and caps include a biodegradable additive that aids in the decomposition of polyamide-based plastics in microbe-rich landfills.',
      'Renewable Energy and Water Reuse: The manufacturer of our toothpaste tubes and caps uses solar panels to provide up to 30% of their energy needs and implements a rainwater reuse system.',
    ],
  },
  {
    id: 'recyclable-bottles',
    title: 'Recyclable Bottles',
    titleColor: '#f97316',
    borderColor: '#f97316',
    imgSide: 'right',
    img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_mouthwash.png',
    imgWidth: 240,
    imgHeight: 300,
    bullets: [
      'Mouthwash and MouthSpray: Both bottles and caps are recyclable, reducing waste and promoting sustainability.',
    ],
  },
  {
    id: 'recycled-packaging',
    title: 'Recycled and Recyclable Packaging',
    titleColor: '#f97316',
    borderColor: '#f97316',
    imgSide: 'left',
    img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png',
    imgWidth: 220,
    imgHeight: 280,
    bullets: [
      'Cardboard and Paper Packaging: All cardboard and paper packaging for our consumable products are made from 100% recycled material and are fully recyclable.*',
      'Printed Materials: All of our manuals and many printed marketing materials are produced with biodegradable vegetable ink and recycled materials, and are recyclable.',
    ],
  },
  {
    id: 'reusable-designs',
    title: 'Innovative and Reusable Designs',
    titleColor: '#f5d800',
    borderColor: '#f5d800',
    imgSide: 'right',
    img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png',
    imgWidth: 200,
    imgHeight: 280,
    bullets: [
      "Children's Products: Most of our children's product packaging is designed to turn into toys, backgrounds, piggy banks, and more. This creative approach ensures the packaging is not just thrown away, but instead, serves a purpose, significantly reducing waste.",
    ],
  },
  {
    id: 'energy-efficient',
    title: 'Energy-Efficient Products',
    titleColor: '#4ab8c4',
    borderColor: '#4ab8c4',
    imgSide: 'left',
    img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png',
    imgWidth: 220,
    imgHeight: 300,
    bullets: [
      'Rechargeable Batteries: Whenever feasible, we use rechargeable batteries in our powered products, such as electric toothbrushes, to minimize waste and promote sustainability.',
    ],
  },
]

export default function SustainabilityPage() {
  const navyBg = '#2d3a8c'

  return (
    <div style={{ backgroundColor: navyBg }} className="text-white min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5a623 0%, #f0921c 40%, #2d9cdb 70%, #1a5fa8 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-16">
            <div>
              <h1 className="font-black text-4xl md:text-5xl mb-4 leading-tight"
                style={{ color: '#1a2e6e', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                SuperMouth<br />Sustainability Initiative
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: '#1a2e6e' }}>
                At SuperMouth, our commitment to sustainability drives everything we do. We strive to be as environmentally friendly as possible.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png"
                alt="SuperMouth Products"
                width={400}
                height={300}
                className="w-full max-w-sm h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Here's How We Make A Difference */}
      <div style={{ backgroundColor: navyBg }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-black text-3xl md:text-4xl mb-12 text-white"
            style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
            Here's How We Make A Difference
          </h2>

          <div className="space-y-6">
            {sections.map(section => (
              <div
                key={section.id}
                className="rounded-2xl p-8"
                style={{ border: `1px solid ${section.borderColor}`, backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <div className={`grid md:grid-cols-2 gap-8 items-start ${section.imgSide === 'left' ? '' : 'md:[&>*:first-child]:order-2'}`}>
                  {/* Content */}
                  <div>
                    <h3 className="font-black text-xl md:text-2xl mb-5"
                      style={{ color: section.titleColor, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                          <span className="mt-1 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* EWG Table for ingredients section */}
                    {section.table && (
                      <div className="mt-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                        <div className="grid grid-cols-2 px-4 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                          <span className="text-xs font-bold" style={{ color: '#f5666a' }}>SuperMouth ingredients</span>
                          <span className="text-xs font-bold text-right" style={{ color: '#f5666a' }}>ewg rating</span>
                        </div>
                        {section.table.map((row, i) => (
                          <div key={i} className="grid grid-cols-2 px-4 py-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <span className="text-xs text-white/70">{row.ingredient}</span>
                            <span className="text-xs text-right font-bold" style={{ color: '#4ade80' }}>{row.rating}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="flex items-center justify-center">
                    <Image
                      src={section.img}
                      alt={section.title}
                      width={section.imgWidth}
                      height={section.imgHeight}
                      className="w-auto h-auto max-h-72 object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing section — white bg */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center text-center">
              <div>
                <div className="text-8xl mb-4">🌍</div>
                <div className="text-6xl font-black text-sm-teal">m</div>
              </div>
            </div>
            <div>
              <p className="font-black text-2xl md:text-3xl leading-snug mb-4"
                style={{ color: '#f97316', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                At SuperMouth, sustainability isn't just a goal — it's a core value.
              </p>
              <p className="text-sm-gray text-sm leading-relaxed">
                We are continuously looking for ways to reduce our environmental impact and contribute to a healthier planet. Join us in our commitment to a sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: navyBg }} className="py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop Sustainably →
            </Link>
            <Link href="/our-story" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
