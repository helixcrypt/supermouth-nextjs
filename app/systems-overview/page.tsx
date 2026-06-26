import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Shop All Systems — SuperMouth',
  description: 'Expert-curated oral care systems for every age and stage.',
}

const systems = [
  {
    label: 'Teething to 24 Months',
    slug: 'teething-to-24-months',
    img: 'https://cdn.supermouth.com/landing-pages/Teething-24_Complete_Vanilla_Hydroxamin_Peek-a-Boo-Teether_Blue-Fingerbrush.png',
    tag: 'Ages 0–2',
    tagColor: 'bg-pink-100 text-pink-700',
    desc: 'At this stage of your child\'s life, the baby teeth are erupting that are critical to their oral health and their oral microbiome.',
    contents: ['Hydroxamin® Toothpaste', 'Finger or Toddler Brush', 'Teether', 'Augmented Reality Sticker', 'System Guide', 'Handbook: Owner\'s Manual'],
  },
  {
    label: 'Ages 2–5',
    slug: '2-to-5',
    img: 'https://cdn.supermouth.com/landing-pages/2-5_Basic_Vanilla_Hydroxamin_Dr-Hoss.png',
    tag: 'Ages 2–5',
    tagColor: 'bg-yellow-100 text-yellow-700',
    desc: 'Five-year-olds typically only brush about 25% of their teeth, which can significantly impact the health of their mouth.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Augmented Reality Sticker', 'System Guide', 'Handbook: A Big Guide to Little Mouths'],
  },
  {
    label: 'Ages 6–12',
    slug: '6-to-12',
    img: 'https://cdn.supermouth.com/landing-pages/6-12_Complete_Mint_Fluoride_Tooth-Keri.png',
    tag: 'Ages 6–12',
    tagColor: 'bg-blue-100 text-blue-700',
    desc: 'Kids ages 6–12 are hitting key mouth milestones — losing baby teeth and building the foundation for healthy permanent ones.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'Augmented Reality Sticker', 'System Guide', 'Handbook: Mighty Mouths Handbook'],
  },
  {
    label: 'Teens & Adults',
    slug: 'teens-and-adults',
    img: 'https://cdn.supermouth.com/landing-pages/13-Plus_Basic_Mint_Fluoride_Rose%20Ultim8.png',
    tag: 'Ages 13+',
    tagColor: 'bg-purple-100 text-purple-700',
    desc: 'This dentist-invented system equips teens and adults with the tools to achieve excellent oral health for life.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'System Guide', 'Handbook: Mouthstanding Mouthcare'],
  },
  {
    label: 'Pregnancy',
    slug: 'pregnancy',
    img: 'https://cdn.supermouth.com/landing-pages/Pregnancy_Complete_Mint_Fluoride_Blue%20Ultim8.png',
    tag: 'Pregnancy & Nursing',
    tagColor: 'bg-green-100 text-green-700',
    desc: 'This dentist-invented system is uniquely created for pregnant moms to optimize the mouth health of soon-to-be mothers safely.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'System Guide', 'Handbook: Mouthcare for Two'],
  },
  {
    label: 'Orthodontics',
    slug: 'orthodontics',
    img: 'https://cdn.supermouth.com/landing-pages/Ortho_Complete_Mint_Blue%20Ultim8.png',
    tag: 'Braces & Aligners',
    tagColor: 'bg-teal-100 text-teal-700',
    desc: 'SuperMouth has developed an exclusive range of products specifically for those sporting orthodontic hardware.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'System Guide', 'Handbook: Brace Yourself'],
  },
]

export default function SystemsOverviewPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero */}
      <section className="relative w-full">
        <div className="hidden md:block w-full">
          <Image
            src="https://cdn.supermouth.com/images/SM-website_2.0-_systems_page-header_image-ni.jpg"
            alt="SuperMouth Systems"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/SM-systems_page-header_image-mobile.png"
            alt="SuperMouth Systems"
            width={768}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg mb-2">SuperMouth Systems</h1>
          <p className="text-white/80 text-sm max-w-xl drop-shadow">Complete oral care made easy — choose Basic, Plus, or Complete to match your needs and budget. Save 15% on bundles, 10% more when you subscribe.</p>
        </div>
      </section>

      {/* Age jump links */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-sm-gray self-center mr-2">Start by choosing your age or stage:</p>
          {systems.map(s => (
            <a key={s.slug} href={`#${s.slug}`}
              className="bg-sm-yellow text-sm-navy font-bold text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Systems */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <h2 className="font-display font-black text-2xl md:text-3xl text-center text-sm-navy">Explore Our Systems</h2>
        {systems.map((system, i) => (
          <div key={system.slug} id={system.slug}
            className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
            {/* Image — natural size, no cropping */}
            <div className="w-full flex justify-center">
              <Image
                src={system.img}
                alt={system.label}
                width={500}
                height={500}
                className="w-full max-w-sm h-auto object-contain"
              />
            </div>
            {/* Content */}
            <div>
              <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${system.tagColor}`}>
                {system.tag}
              </span>
              <h3 className="font-display font-black text-3xl mb-4 text-sm-navy">{system.label}</h3>
              <p className="text-sm-gray text-sm leading-relaxed mb-6">{system.desc}</p>
              <div className="bg-white rounded-2xl p-5 mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-3">Complete System Contents:</p>
                <ul className="grid grid-cols-2 gap-1.5">
                  {system.contents.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-sm-navy">
                      <span className="text-sm-green mt-0.5 flex-shrink-0">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/systems/${system.slug}`}
                  className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
                  Shop {system.label} →
                </Link>
                <Link href="/assessment"
                  className="border border-sm-navy/20 text-sm-navy font-semibold px-6 py-3 rounded-full text-sm hover:bg-white transition-colors">
                  Take the Quiz
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="bg-sm-navy text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display font-black text-3xl mb-4">Not sure which system is right for you?</h2>
          <p className="text-white/70 text-sm mb-8">Take our quick assessment and get a personalized recommendation in under 2 minutes.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/assessment" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Take the Assessment →
            </Link>
            <Link href="/shop-all" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
