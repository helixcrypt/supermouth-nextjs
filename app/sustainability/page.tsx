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
    titleColor: 'text-yellow-400',
    borderColor: 'border-yellow-400',
    imgSide: 'right',
    img: 'https://cdn.supermouth.com/website/EWG_table_sustainability.png',
    imgWidth: 280,
    imgHeight: 300,
    bullets: [
      'Our consumable products only contain ingredients rated as a 1 (Low Hazard) by the Environmental Working Group (EWG). The EWG scale ranges from 1 (low hazard) to 10 (high hazard), ensuring our products are safe for you and the planet. This is notable since many toothpastes and mouthwashes currently on the market, both \'conventional\' and \'natural,\' contain ingredients ranging from 2 to 10 on the EWG scale.',
      'We do not use any \'forever chemicals,\' such as PTFE (Polytetrafluoroethylene) or Teflon, which are commonly found in over-the-counter flosses and other products. These chemicals do not break down, can accumulate in the environment and living organisms, and pose significant health and environmental risks.',
    ],
  },
  {
    id: 'eco-packaging',
    title: 'Eco-Friendly Packaging',
    titleColor: 'text-teal-400',
    borderColor: 'border-teal-400',
    imgSide: 'left',
    img: 'https://cdn.supermouth.com/website/SuperMouth_sustainability_toothpaste_tube.png',
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
    titleColor: 'text-orange-400',
    borderColor: 'border-orange-400',
    imgSide: 'right',
    img: 'https://cdn.supermouth.com/website/SuperMouth_sustainability_mouthwash_bottles.png',
    imgWidth: 240,
    imgHeight: 300,
    bullets: [
      'Mouthwash and MouthSpray: Both bottles and caps are recyclable, reducing waste and promoting sustainability.',
    ],
  },
  {
    id: 'recycled-packaging',
    title: 'Recycled and Recyclable Packaging',
    titleColor: 'text-orange-400',
    borderColor: 'border-orange-400',
    imgSide: 'left',
    img: 'https://cdn.supermouth.com/website/SuperMouth_sustainability_recycled_packaging.png',
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
    titleColor: 'text-yellow-400',
    borderColor: 'border-yellow-400',
    imgSide: 'right',
    img: 'https://cdn.supermouth.com/website/SuperMouth_sustainability_reusable_packaging_toy.png',
    imgWidth: 200,
    imgHeight: 280,
    bullets: [
      'Children\'s Products: Most of our children\'s product packaging is designed to turn into toys, backgrounds, piggy banks, and more. This creative approach ensures the packaging is not just thrown away, but instead, serves a purpose, significantly reducing waste.',
    ],
  },
  {
    id: 'energy-efficient',
    title: 'Energy-Efficient Products',
    titleColor: 'text-teal-400',
    borderColor: 'border-teal-400',
    imgSide: 'left',
    img: 'https://cdn.supermouth.com/website/SuperMouth_sustainability_rechargeable_toothbrush.png',
    imgWidth: 220,
    imgHeight: 300,
    bullets: [
      'Rechargeable Batteries: Whenever feasible, we use rechargeable batteries in our powered products, such as electric toothbrushes, to minimize waste and promote sustainability.',
    ],
  },
]

export default function SustainabilityPage() {
  return (
    <div style={{ backgroundColor: '#2d3a8c' }} className="text-white min-h-screen">

      {/* Hero — full width image with text overlay */}
      <section className="relative w-full">
        <Image
          src="https://cdn.supermouth.com/website/SuperMouth_sustainability_hero.jpg"
          alt="SuperMouth Sustainability Initiative"
          width={1440}
          height={500}
          className="w-full h-auto object-cover"
          priority
          onError={(e) => {
            // Fallback if image doesn't exist
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        {/* Fallback hero if image missing */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-lg">
              <h1 className="font-display text-3xl md:text-5xl font-black mb-4 leading-tight"
                style={{ fontFamily: 'cursive', color: '#1a2e6e' }}>
                SuperMouth<br />Sustainability Initiative
              </h1>
              <p className="text-sm-navy text-sm leading-relaxed">
                At SuperMouth, our commitment to sustainability drives everything we do. We strive to be as environmentally friendly as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fallback hero for when CDN image isn't available */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5a623 0%, #f0921c 40%, #2d9cdb 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-16">
            <div>
              <h1 className="font-black text-4xl md:text-5xl mb-4 leading-tight text-sm-navy" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                SuperMouth<br />Sustainability Initiative
              </h1>
              <p className="text-sm-navy text-sm leading-relaxed max-w-md">
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
      <div style={{ backgroundColor: '#2d3a8c' }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-black text-3xl md:text-4xl mb-12 text-white"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Here's How We Make A Difference
          </h2>

          {/* Section cards */}
          <div className="space-y-6">
            {sections.map(section => (
              <div
                key={section.id}
                className={`border rounded-2xl p-8 ${section.borderColor}`}
                style={{ borderWidth: '1px', backgroundColor: 'rgba(255,255,255,0.03)' }}
              >
                <div className={`grid md:grid-cols-2 gap-8 items-center ${section.imgSide === 'left' ? '' : 'md:[&>*:first-child]:order-2'}`}>
                  {/* Content */}
                  <div>
                    <h3 className={`font-black text-xl md:text-2xl mb-5 ${section.titleColor}`}
                      style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                      {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-sm text-white/80 leading-relaxed">
                          <span className="mt-1 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
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

      {/* Closing section — white bg with M logo */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="https://cdn.supermouth.com/website/SuperMouth_sustainability_core_value_logo.png"
                alt="SuperMouth sustainability is a core value"
                width={300}
                height={280}
                className="w-full max-w-xs h-auto object-contain"
              />
            </div>
            <div>
              <p className="font-black text-2xl md:text-3xl leading-snug mb-4 text-orange-500"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
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
      <section style={{ backgroundColor: '#2d3a8c' }} className="py-12 text-center">
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
