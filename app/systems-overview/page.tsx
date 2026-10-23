import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Carousel from '@/components/home/Carousel'
import DoctorCard from '@/components/home/DoctorCard'
import { home } from '@/lib/home-data'

export const metadata = {
  title: 'Shop All Systems — SuperMouth',
  description: 'A System is your entire oral care routine in one dentist-curated box, matched to your life stage.',
}

const BLUE = '#394C97'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

const stages = [
  { label: 'Teething to 24 Months', href: '/systems/teething-to-24-months' },
  { label: '2 to 5 Years', href: '/systems/2-to-5' },
  { label: '6 to 12 Years', href: '/systems/6-to-12' },
  { label: 'Teens & Adults', href: '/systems/teens-and-adults' },
  { label: 'Pregnancy', href: '/systems/pregnancy' },
  { label: 'Orthodontics', href: '/systems/orthodontics' },
]

const systems = [
  { title: 'Teething to 24 Months', href: '/systems/teething-to-24-months', img: '/info/Teething-24_Complete_Vanilla_Hydroxamin_Peek-a-Boo-Teether_Blue-Fingerbrush.png',
    desc: "At this stage of your child's life, the baby teeth are erupting that are critical to their oral health and their oral microbiome.",
    contents: ['Hydroxamin® Toothpaste', 'Finger or Toddler Brush', 'Teether', 'Augmented Reality Sticker', 'System Guide', "Handbook: Owner's Manual"] },
  { title: 'Ages 2-5', href: '/systems/2-to-5', img: '/info/2-5_Basic_Vanilla_Hydroxamin_Dr-Hoss.png',
    desc: 'Five-year-olds typically only brush about 25% of their teeth, which can significantly impact the health of their mouth.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Augmented Reality Sticker', 'System Guide', 'Handbook: A Big Guide to Little Mouths'] },
  { title: 'Ages 6-12', href: '/systems/6-to-12', img: '/info/6-12_Complete_Mint_Fluoride_Tooth-Keri.png',
    desc: 'Kids ages 6–12 are hitting key mouth milestones—losing baby teeth and building the foundation for healthy permanent ones.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'Augmented Reality Sticker', 'System Guide', 'Handbook: Mighty Mouths Handbook'] },
  { title: 'Teens & Adults', href: '/systems/teens-and-adults', img: '/info/13-Plus_Basic_Mint_Fluoride_Rose-Ultim8.png',
    desc: 'This dentist-invented system equips teens and adults with the tools to achieve excellent oral health for life.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'System Guide', 'Handbook: Mouthstanding Mouthcare'] },
  { title: 'Pregnancy', href: '/systems/pregnancy', img: '/info/Pregnancy_Complete_Mint_Fluoride_Blue-Ultim8.png',
    desc: 'This dentist-invented system is uniquely created for pregnant moms to optimize the mouth health of soon-to-be mothers safely.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'System Guide', 'Handbook: Mouthcare for Two'] },
  { title: 'Orthodontics', href: '/systems/orthodontics', img: '/info/Ortho_Complete_Mint_Blue-Ultim8.png',
    desc: 'SuperMouth has developed an exclusive range of products specifically for those sporting orthodontic hardware.',
    contents: ['Hydroxamin® Toothpaste', 'Toothbrush', 'MouthSpray', 'Floss', 'Tongue Scraper', 'Mouthwash', 'System Guide', 'Handbook: Brace Yourself'] },
]

const whySystems = [
  { img: '/info/Product_overview_mouthbrushes_transparent.png', alt: 'SuperMouth Mouthbrushes', color: '#5AC3B2', lines: ['brush options for every development stage', 'ultra-soft bristles for comfort & gentle on enamel', 'brush heads engineered to contour teeth for optimal plaque removal'] },
  { img: '/info/Product_overview_mouthpaste_transparent.png', alt: 'SuperMouth MouthPaste', color: '#F8D41B', lines: ['our paste features:', 'Hydroxamin® that includes nano-hydroxyapatite vitamins K2 and D3', 'prebiotics like inulin', 'packed with xylitol'] },
  { img: '/info/Product_overview_mouthfloss_transparent.png', alt: 'SuperMouth MouthFloss', color: '#F59E44', lines: ['removes plaque and food particles from in between teeth', 'contains vitamins and minerals', 'multiple designs for various stages'] },
  { img: '/info/Product_overview_mouthwash_transparent.png', alt: 'SuperMouth MouthWash', color: '#F4A7B9', lines: ['loosens food particles', 'reduces adhesion of dental plaque', 'distributes nutrients in hard to reach areas', 'coats mouth for long-lasting protection'] },
  { img: '/info/Product_overview_mouthspray_transparent.png', alt: 'SuperMouth MouthSpray', color: '#EC6A5D', lines: ['since you should never brush for 30-60 minutes after meals, use our mouthspray instead to:', 'restore pH balance', 'promote healthy oral microbiome between brushings'] },
  { img: '/info/Product_overview_tonguecleaner_transparent.png', alt: 'SuperMouth Tongue Cleaner', color: '#5AC3B2', lines: ['toothbrush bristles are not designed for effective tongue cleaning', 'this tool helps to scrape bacteria that causes bad breath off your tongue'] },
]

const pillars = [
  { title: 'comprehensive', bg: '#EC6A5D', fg: '#FFFFFF', lines: ['a full-system approach to oral health for the entire family', 'engaging and educational for kids, with resources for parents', 'products and guidance for adult-specific oral care needs'] },
  { title: 'customized', bg: '#F7D348', fg: BLUE, lines: ['curated by dentists and medical experts for every life stage', 'includes plans for pregnancy, orthodontics, and more', 'personalized mouthcare for specific dental needs at any age'] },
  { title: 'convenient', bg: '#5AC3B2', fg: '#FFFFFF', lines: ['flexible purchasing: one-time or subscription with perks', 'subscription ensures age-appropriate products at each life phase', 'adapts with your family’s changing oral health needs'] },
]

const benefits = [
  { title: 'whole mouth health', img: '/info/whole_mouth.jpg', bullets: ['targets teeth, gums, tongue, and oral microbiome', 'coordinated products for comprehensive care'] },
  { title: 'safe, effective, gentle cleaning', img: '/info/safe-effective-gentle_cleaning.jpg', bullets: ['avoids toxins, no artificial colors, flavors or preservatives', 'free from abrasive cleansers, SLS, and harmful additives'] },
  { title: 'essential nutrients provided', img: '/info/essential_nutrients_provided.jpg', bullets: ['minerals such as nano-hydroxyapatite and vitamins like D3 & K2', 'prebiotics like inulin & xylitol support overall mouth health'] },
  { title: 'better compliance through enjoyment', img: '/info/better_compliance.jpg', bullets: ['engaging kids with movies, AR, comics, music, and fun flavors', 'designed for adults with aesthetic appeal and advanced features'] },
  { title: 'balanced pH for oral harmony', img: '/info/balanced_pH.jpg', bullets: ['supports a self-regulating, healthy oral ecosystem', 'creates a hostile environment for harmful microbes'] },
  { title: 'a healthier oral microbiome', img: '/info/healthier_oral_microbiome.jpg', bullets: ['promotes beneficial bacteria growth', 'a cornerstone for overall oral wellness'] },
]

const Wave = ({ fill = 'white' }: { fill?: string }) => (
  <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 360 24" preserveAspectRatio="none" height="24" aria-hidden>
    <path d="M0 24V12C60 0 120 0 180 10s120 10 180-2v16z" fill={fill} />
  </svg>
)

export default function SystemsOverviewPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#1F2E5F]">
        <Image src="/info/SM-website_2.0-_systems_page-header_image-ni.jpg" alt="" fill priority sizes="100vw" className="object-cover object-right opacity-90 md:opacity-100" />
        <div className="relative max-w-[1440px] mx-auto px-4 md:px-[182px] py-6 md:py-3 min-h-[388px] flex items-center">
          <div className="max-w-[500px] text-white bg-[#1F2E5F]/60 md:bg-transparent p-4 md:p-0 rounded-xl">
            <h1 className="text-[30px] leading-9 text-[#F8D41B]" style={SCRIPT}>SuperMouth Systems</h1>
            <p className="mt-3 text-[18px] leading-7">Whole-mouth care made easy</p>
            <p className="mt-4 text-[16px] md:text-[18px] leading-7">A System is your entire oral care routine in one dentist-curated box — toothbrush, toothpaste, mouthwash, floss, and more — every product chosen to work together and matched to your life stage. And each box is a full 90-day supply: one delivery covers 3 months of care.</p>
            <p className="mt-4 text-[16px] md:text-[18px] leading-7">Choose Basic, Plus, or Complete to match your needs and budget. Because everything’s bundled, you’ll enjoy 15% savings — plus 10% more when you subscribe. Whole-mouth care, starting at under 50¢ a day.</p>
          </div>
        </div>
      </section>

      {/* AGE / STAGE PICKER */}
      <section className="pt-6 pb-2 max-w-[1312px] mx-auto px-4">
        <h2 className="text-center text-[22px] md:text-[24px] leading-8 font-bold">start by choosing your age or stage</h2>
        <div className="mt-5 flex flex-wrap justify-center lg:justify-between gap-3">
          {stages.map(s => (
            <Link key={s.href} href={s.href} className="bg-[#FFE920] rounded-lg px-2 py-2 text-[16px] md:text-[18px] leading-7 font-bold hover:opacity-90">{s.label}</Link>
          ))}
        </div>
      </section>

      {/* EXPLORE OUR SYSTEMS */}
      <section className="pt-10 pb-10">
        <h2 className="text-center text-[28px] md:text-[30px] leading-9 font-bold">explore our systems</h2>
        <Carousel className="max-w-[1312px] mx-auto mt-10 px-8" gapClass="px-3 lg:px-10" label="SuperMouth systems">
          {systems.map(s => (
            <div key={s.href} className="flex flex-col h-full rounded-xl border border-[#394C97] bg-white px-5 pt-6 pb-4 shadow-[0_8px_16px_rgba(57,76,151,0.1)]">
              <Image src={s.img} alt={`${s.title} System`} width={245} height={245} className="mx-auto w-[245px] h-[245px] object-contain" />
              <h3 className="mt-3 text-center text-[20px] leading-7 font-bold">{s.title}</h3>
              <p className="text-center text-[16px] leading-6">{s.desc}</p>
              <p className="mt-3 text-center text-[16px] leading-6 font-bold">Complete system contents:</p>
              <ul className="mt-1 mx-auto list-disc pl-5 text-[16px] leading-6">{s.contents.map(c => <li key={c}>{c}</li>)}</ul>
              <Link href={s.href} className="mt-auto mx-auto mt-6 inline-block bg-[#FFE920] rounded-lg px-4 py-2 text-[18px] leading-7 font-bold hover:opacity-90">Shop Now</Link>
            </div>
          ))}
        </Carousel>
      </section>

      {/* WHY SYSTEMS */}
      <section className="py-12 text-white" style={{ background: BLUE }}>
        <h2 className="text-center text-[48px] md:text-[56px] leading-[56px] text-[#EC6A5D]" style={SCRIPT}>why systems?</h2>
        <p className="mt-5 text-center text-[20px] md:text-[24px] leading-8 font-bold px-4">because it&apos;s so much more than brushing &amp; flossing</p>
        <p className="mt-1 text-center text-[16px] md:text-[18px] leading-7 px-4">introducing The Most Comprehensive Oral Care Solution For Your Family</p>
        <div className="max-w-[1280px] mx-auto px-4 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {whySystems.map(w => (
            <div key={w.alt} className="border px-3 pt-3 pb-5 text-center" style={{ borderColor: w.color }}>
              <Image src={w.img} alt={w.alt} width={189} height={189} className="mx-auto w-full max-w-[189px] h-auto" />
              <div className="mt-2 space-y-4 text-[14px] leading-5">{w.lines.map(l => <p key={l}>{l}</p>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-[1312px] mx-auto px-4 pt-16 grid md:grid-cols-3 gap-8">
        {pillars.map(p => (
          <div key={p.title} className="px-8 py-9 text-center" style={{ background: p.bg, color: p.fg }}>
            <h4 className="text-[30px] leading-9 font-bold">{p.title}</h4>
            <div className="mt-5 space-y-4 text-[16px] leading-6">{p.lines.map(l => <p key={l}>{l}</p>)}</div>
          </div>
        ))}
      </section>

      {/* KEY BENEFITS */}
      <section className="max-w-[1312px] mx-auto px-4 pt-16 pb-6">
        <h2 className="text-center text-[44px] md:text-[48px] leading-[56px] text-[#DD7164]" style={SCRIPT}>key benefits</h2>
        <p className="mt-4 text-center text-[20px] md:text-[24px] leading-8 font-bold">our systems include products that, when used together, provide unique benefits to your family&apos;s oral health:</p>
        <div className="mt-8 grid md:grid-cols-3 gap-x-14 gap-y-12">
          {benefits.map(b => (
            <div key={b.title}>
              <h3 className="text-center text-[26px] leading-9 text-[#DD7164]" style={SCRIPT}>{b.title}</h3>
              <div className="relative mt-4 aspect-[376/259] overflow-hidden">
                <Image src={b.img} alt={b.title} fill sizes="(min-width:768px) 376px, 100vw" className="object-cover" />
                <Wave />
              </div>
              <ul className="mt-6 list-disc pl-6 text-[18px] leading-7">{b.bullets.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* DENTAL PROFESSIONALS */}
      <section className="pt-12 pb-10">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">why dental professionals recommend SuperMouth</h2>
        <Carousel className="max-w-[1312px] mx-auto mt-12 px-8" gapClass="px-3 lg:px-10" label="Dental professional testimonials">
          {home.doctors.map(d => <DoctorCard key={d.img} {...d} />)}
        </Carousel>
        <div className="text-center mt-8">
          <Link href="https://supermouthpro.com" className="inline-block bg-[#FFE920] rounded-lg px-3 py-2 text-[18px] leading-7 font-bold hover:opacity-90">Dental Professionals: Join SuperMouth Pro</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
