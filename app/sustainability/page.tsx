import Image from 'next/image'
import Footer from '@/components/Footer'
import { Page, Hero, Script, CORAL } from '@/components/about/ui'

export const metadata = {
  title: 'Protecting the Planet — SuperMouth',
  description: 'SuperMouth\'s commitment to sustainability: environmentally safe ingredients, eco-friendly packaging, and innovative reusable designs.',
}

type Block = { title: string; color: string; border: string; img: string; alt: string; imgSide: 'left' | 'right'; items: string[]; tall?: boolean }

const blocks: Block[] = [
  {
    title: 'Environmentally Safe Ingredients', color: '#FFE91F', border: '#FFE91F', imgSide: 'right', tall: true,
    img: '/about/sust-SM-website-2.0--sustainability-page-ewg-graph.png', alt: 'SuperMouth ingredients and their EWG ratings',
    items: [
      'Our consumable products only contain ingredients rated as a 1 (Low Hazard) by the Environmental Working Group (EWG). The EWG scale ranges from 1 (low hazard) to 10 (high hazard), ensuring our products are safe for you and the planet. This is notable since many toothpastes and mouthwashes currently on the market, both ‘conventional’ and ‘natural,’ contain ingredients ranging from 2 to 10 on the EWG scale.',
      'We do not use any ‘forever chemicals,’ such as PTFE (Polytetrafluoroethylene) or Teflon, which are commonly found in over-the-counter flosses and other products. These chemicals do not break down, can accumulate in the environment and living organisms, and pose significant health and environmental risks.',
    ],
  },
  {
    title: 'Eco-Friendly Packaging', color: '#45A9C5', border: '#45A9C5', imgSide: 'left',
    img: '/about/sust-SM-website-2.0--sustainability-page-ecofriendly.png', alt: 'Eco friendly packaging',
    items: [
      'Toothpaste Tubes: Up to 50% of our toothpaste tubes are made from Post-Consumer Recycled (PCR) materials.',
      'Toothpaste Caps: These use up to 30% PCR materials.',
      'Mono-material Construction: Both our toothpaste tubes and caps are made from the same material, facilitating easier sorting and recycling.',
      'Biodegradable Additives: Our toothpaste tubes and caps include a biodegradable additive that aids in the decomposition of polyamide-based plastics in microbe-rich landfills.',
      'Renewable Energy and Water Reuse: The manufacturer of our toothpaste tubes and caps uses solar panels to provide up to 30% of their energy needs and implements a rainwater reuse system.',
    ],
  },
  {
    title: 'Recyclable Bottles', color: '#E95A4C', border: '#E95A4C', imgSide: 'right',
    img: '/about/sust-SM-website-2.0--sustainability-page-recycllable-bottles.png', alt: 'Recyclable bottles',
    items: ['Mouthwash and MouthSpray: Both bottles and caps are recyclable, reducing waste and promoting sustainability.'],
  },
  {
    title: 'Recycled and Recyclable Packaging', color: '#E0C2C5', border: '#E0C2C5', imgSide: 'left',
    img: '/about/sust-SM-website-2.0--sustainability-page-recycled.png', alt: 'Recycled packaging',
    items: [
      'Cardboard and Paper Packaging: All cardboard and paper packaging for our consumable products are made from 100% recycled material and are fully recyclable.*',
      'Printed Materials: All of our manuals and many printed marketing materials are produced with biodegradable vegetable ink and recycled materials, and are recyclable.',
    ],
  },
  {
    title: 'Innovative and Reusable Designs', color: '#FFE91F', border: '#FFE91F', imgSide: 'right',
    img: '/about/sust-SM-website-2.0--sustainability-page-reusable-designs.png', alt: 'Innovative designs',
    items: ['Children’s Products: Most of our children’s product packaging is designed to turn into toys, backgrounds, piggy banks, and more. This creative approach ensures the packaging is not just thrown away, but instead, serves a purpose, significantly reducing waste.'],
  },
  {
    title: 'Energy-Efficient Products', color: '#45A9C5', border: '#45A9C5', imgSide: 'left',
    img: '/about/sust-sustainability_page-energy_efficient_v2.png', alt: 'Energy efficient products',
    items: ['Rechargeable Batteries: Whenever feasible, we use rechargeable batteries in our powered products, such as electric toothbrushes, to minimize waste and promote sustainability.'],
  },
]

export default function SustainabilityPage() {
  return (
    <Page>
      <Hero img="/about/sust-SM-website-2.0--sustainability-page-header-image.png" alt="SuperMouth toothbrushes in an enchanted forest" bg="#FFD27A">
        <h1 className="text-[32px] md:text-[36px] leading-10" style={{ color: '#394C97' }}>
          <Script>SuperMouth</Script><br /><Script>Sustainability Initiative</Script>
        </h1>
        <p className="mt-6 text-[18px] leading-7">At SuperMouth, our commitment to sustainability drives everything we do. We strive to be as environmentally friendly as possible.</p>
      </Hero>

      <section className="bg-[#394C97] text-white pt-14 pb-4">
        <h2 className="text-center text-[38px] md:text-[44px] leading-[48px] px-4"><Script>Here’s How We Make A Difference</Script></h2>
        <div className="max-w-[1312px] mx-auto px-4 mt-12 space-y-8">
          {blocks.map(b => (
            <div key={b.title} className="border-2 px-6 md:px-8 py-8" style={{ borderColor: b.border }}>
              <div className={`grid gap-8 items-center ${b.imgSide === 'right' ? 'lg:grid-cols-[1fr_300px]' : 'lg:grid-cols-[300px_1fr]'}`}>
                <div className={b.imgSide === 'left' ? 'lg:order-2' : ''}>
                  <h3 className="text-[30px] md:text-[34px] leading-10"><Script color={b.color}>{b.title}</Script></h3>
                  <ul className="mt-4 list-disc pl-6 space-y-4 text-[17px] md:text-[18px] leading-7 max-w-[780px]">
                    {b.items.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </div>
                <Image src={b.img} alt={b.alt} width={350} height={500} className={`mx-auto w-[220px] lg:w-[280px] h-auto ${b.imgSide === 'left' ? 'lg:order-1' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-[#394C97] h-6" />

      <section className="max-w-[1312px] mx-auto px-4 py-8 grid md:grid-cols-[350px_1fr] gap-6 items-center">
        <Image src="/about/sust-SM-website-2.0--sustainability-page-at-supermouth.png" alt="SuperMouth" width={350} height={350} className="mx-auto w-[200px] md:w-[300px] h-auto" />
        <div>
          <p className="text-[30px] md:text-[34px] leading-9"><Script color={CORAL}>At SuperMouth, sustainability isn’t just a goal<br />— it’s a core value.</Script></p>
          <p className="mt-2 text-[18px] md:text-[20px] leading-7">We are continuously looking for ways to reduce our environmental impact and contribute to a healthier planet. Join us in our commitment to a sustainable future.</p>
        </div>
      </section>

      <Footer />
    </Page>
  )
}
