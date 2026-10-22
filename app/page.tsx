import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Carousel from '@/components/home/Carousel'
import HeroCarousel from '@/components/home/HeroCarousel'
import AwardsBar from '@/components/home/AwardsBar'
import NewsletterForm from '@/components/home/NewsletterForm'
import DoctorCard from '@/components/home/DoctorCard'
import { home } from '@/lib/home-data'

// supermouth.com palette
const BLUE = '#394C97'
const NAVY = '#131247'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

const YellowBtn = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link href={href} className={`inline-block bg-[#FFE920] text-[#394C97] text-[18px] leading-7 font-bold p-2 rounded-lg hover:opacity-90 transition-opacity ${className}`}>
    {children}
  </Link>
)

const Stars = ({ size = 22 }: { size?: number }) => (
  <span className="inline-flex" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map(n => (
      <svg key={n} width={size} height={size} viewBox="0 0 24 24" fill="#FBD116" aria-hidden><path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3 5.9 20.7l1.5-6.7L2.3 9.4l6.8-.7z" /></svg>
    ))}
  </span>
)

const Trophy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
    <path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3zm0 4H6v1a2 2 0 0 0 1.2 1.8A5 5 0 0 1 7 8.5V7zm10 0v1.5c0 .5-.1.9-.2 1.3A2 2 0 0 0 18 8V7h-1z" />
  </svg>
)

const Wave = () => (
  <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 360 30" preserveAspectRatio="none" height="30" aria-hidden>
    <path d="M0 30V14C60 0 120 0 180 12s120 12 180-2v20z" fill="white" />
  </svg>
)

export default function HomePage() {
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>

      {/* 1. HERO */}
      <section style={{ background: 'linear-gradient(to right bottom, rgba(185,194,228,0.5) 0%, #fff 50%, rgba(134,206,207,0.3) 100%)' }}>
        <div className="max-w-[1248px] mx-auto px-4 pt-12 pb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[12px] leading-4 font-bold tracking-[0.025em]">
            <span className="w-2 h-2 rounded-full bg-[#5AC3B2]" /> FOUNDED BY DENTISTS · 125,000+ FAMILIES
          </span>
          <h1 className="mt-6 text-[34px] leading-[44px] md:text-[48px] md:leading-[60px] font-bold tracking-[-0.01em]">
            Your family doesn&apos;t need a better toothpaste. They need a complete oral care system,{' '}
            <span className="text-[#DD7164] font-normal text-[44px] md:text-[60px]" style={SCRIPT}>personalized</span> to every{' '}
            <span className="text-[#5AC3B2] font-normal text-[44px] md:text-[60px]" style={SCRIPT}>mouth</span>.
          </h1>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[584px_1fr] gap-10 lg:gap-20">
            <div className="min-w-0">
              <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-white px-4 py-3 text-[14px]">
                <Stars size={14} /> <b className="-ml-2">4.8/5</b> <span>10,000+ verified reviews</span> <span>500,000+ orders shipped</span>
              </div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#5AC3B2]/50 bg-[#5AC3B2]/15 px-4 py-2 text-[14px]">
                <span className="grid place-items-center w-4 h-4 rounded-sm bg-[#5AC3B2] text-white text-[11px]">✓</span>
                30-Day Money-Back Guarantee · Love it or full refund
              </div>
              <div className="mt-5 rounded-r-lg border-l-4 border-[#DD7164] bg-[#DD7164]/10 px-5 py-4 text-[16px] leading-6">
                <p><b>The toothpaste in your bathroom may contain lead.</b> 90% of tested brands do. 65% contain arsenic.† SuperMouth independently third-party tests every batch for heavy metals — so you never have to wonder.</p>
                <p className="mt-2 text-[11px] leading-4">† Source: Lead Safe Mama, LLC independent laboratory testing (2025) of 51 toothpaste products, reported by The Guardian and Fortune.</p>
              </div>
              <p className="mt-8 text-[18px] leading-7 font-bold italic">For families who want the science, not the marketing.</p>
              <p className="mt-5 text-[16px] leading-[26px] opacity-90">
                A cavity-free dad and a kid who keeps getting cavities need different oral care. So does a pregnant woman with sensitive gums vs. a teen in braces prone to white spots. Yet generic brands sell them the same toothpaste. <b>SuperMouth personalizes oral care to every mouth</b> — and the only way to do that is to make all of it. That&apos;s why we engineered <b>a complete system for each life stage</b>: Babies &amp; Toddlers, Little Kids, Big Kids, Teens &amp; Adults, Pregnancy, and Orthodontics. It&apos;s why <b>thousands of dental and medical professionals nationwide</b> trust and recommend SuperMouth — <b>one-size-fits-all brands can&apos;t do this</b>.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/shop-all" className="flex items-center bg-[#FFE920] rounded-xl px-5 py-3 text-[18px] leading-7 font-bold hover:opacity-90">Shop All Products →</Link>
                <Link href="/systems-overview" className="flex-1 min-w-[260px] rounded-xl bg-[#6C5CD1] px-5 py-3 text-center text-white hover:opacity-90">
                  <span className="block text-[18px] leading-7 font-bold">Shop Systems</span>
                  <span className="block text-[13px]">Everything you need in one box - Save 15%</span>
                </Link>
              </div>
              <p className="mt-6 text-[18px] font-bold tracking-[0.025em] opacity-70">OR SHOP BY PERSON</p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[['Kids', '/collections/shop-all-kids'], ['Adults', '/collections/ages-13-and-up'], ['Orthodontics', '/collections/ortho'], ['Pregnancy', '/collections/pregnancy']].map(([l, h]) => (
                  <Link key={l} href={h} className="text-center bg-[#FFE920] rounded-full px-4 py-2 text-[16px] font-bold hover:opacity-90">{l}</Link>
                ))}
              </div>
            </div>
            <div className="min-w-0 px-4 lg:px-0">
              <HeroCarousel slides={home.heroSlides} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MOST-LOVED PRODUCTS */}
      <section className="bg-[#EDF0F9] py-9">
        <div className="max-w-[1248px] mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-bold uppercase">Our Most-Loved Products</h2>
            <Link href="/shop-all" className="text-[16px] font-bold text-[#5AC3B2] hover:opacity-80">View All Products →</Link>
          </div>
          <div className="mt-9 flex gap-10 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {home.mostLoved.map(p => (
              <Link key={p.title} href={p.href} className="snap-start shrink-0 w-[286px] bg-white rounded-xl shadow-[0_2px_12px_rgba(57,76,151,0.12)] overflow-hidden hover:-translate-y-0.5 transition-transform">
                <div className="flex h-11">
                  <span className="grid place-items-center w-11 bg-[#FBD116]"><Trophy /></span>
                  <span className="flex-1 min-w-0 px-3 py-1 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                    <span className="block text-[11px] leading-4 font-semibold text-[#5AC3B2]">AWARD WINNER</span>
                    <span className="block text-[12px] leading-4 font-semibold truncate" style={{ color: NAVY }}>{p.award}</span>
                  </span>
                </div>
                <div className="px-4 pb-6 text-center">
                  <Image src={p.img} alt={p.title} width={254} height={254} className="mx-auto my-4 w-[254px] h-[254px] object-contain" />
                  <p className="text-[18px] leading-7 font-bold min-h-[56px]">{p.title}</p>
                  <p className="mt-1 flex items-center justify-center gap-1 text-[13px]"><Stars /> ({p.reviews})</p>
                  <p className="mt-2 text-[18px] leading-7 font-bold">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT MAKES OUR FORMULAS DIFFERENT */}
      <section className="bg-[#5AC3B2] py-7" style={{ color: NAVY }}>
        <div className="max-w-[1248px] mx-auto px-4">
          <h2 className="text-center text-[28px] md:text-[36px] leading-10 font-bold">What makes our formulas different</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
            {home.features.map((f, n) => (
              <div key={f.title} className={`flex gap-4 px-0 lg:px-6 py-3 lg:py-0 ${n ? 'lg:border-l border-white/50' : 'lg:pl-0'}`}>
                <span className="shrink-0 w-8 h-8 [&_svg]:w-8 [&_svg]:h-8 text-white" dangerouslySetInnerHTML={{ __html: f.svg }} />
                <div>
                  <h3 className="text-[18px] leading-7 font-bold">{f.title}</h3>
                  <p className="text-[14px] leading-[19px] opacity-70">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl px-6 py-6 text-center" style={{ background: NAVY }}>
            <p className="flex items-center justify-center gap-3 text-[18px] font-bold tracking-[0.04em] text-white">
              <span className="w-6 h-6 [&_svg]:w-6 [&_svg]:h-6 text-[#DD7164]" dangerouslySetInnerHTML={{ __html: home.neverSvg }} />
              NEVER IN OUR PRODUCTS. EVER.
            </p>
            <p className="mt-4 text-[16px] leading-6 text-white/75">{home.never}</p>
          </div>
        </div>
      </section>

      {/* 4. AWARDED & FEATURED IN */}
      <AwardsBar quotes={home.awardQuotes} pills={home.awardPills} />

      {/* 5. JUST LAUNCHED */}
      <section className="py-12">
        <div className="max-w-[1248px] mx-auto px-4">
          <p className="text-[12px] font-bold tracking-[0.3em] text-[#5AC3B2]">WHAT&apos;S NEW</p>
          <h2 className="mt-3 text-[36px] md:text-[48px] leading-[48px] font-bold">Just launched.</h2>
          <p className="mt-4 text-[18px] leading-7 opacity-70">New products, new science, and guides from our dentists.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {home.justLaunched.map(c => (
              <Link key={c.title} href={c.href} className="group rounded-xl bg-white shadow-[0_4px_16px_rgba(57,76,151,0.12)] overflow-hidden">
                <Image src={c.img} alt={c.title} width={389} height={260} className="w-full h-[260px] object-cover" />
                <h3 className="p-6 text-[20px] leading-7 font-bold group-hover:opacity-80">{c.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW TO GET STARTED */}
      <section className="py-12 text-white" style={{ background: BLUE }}>
        <h2 className="text-center text-[36px] leading-10 font-bold">how to get started</h2>
        <div className="max-w-[1312px] mx-auto px-4 mt-6 grid md:grid-cols-3 gap-6">
          {home.getStarted.map(c => (
            <div key={c.title} className="text-center">
              <Image src={c.img} alt={c.title} width={411} height={309} className="w-full h-auto" />
              <h3 className="mt-6 text-[18px] leading-7 font-bold">{c.title}</h3>
              <p className="mt-3 text-[16px] leading-6 px-2">{c.desc}</p>
              <YellowBtn href={c.href} className="mt-6 w-[274px] max-w-full text-center">{c.btn}</YellowBtn>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SHOP BY AGE */}
      <section className="py-12 bg-white">
        <h2 className="text-center text-[36px] leading-10 font-bold text-[#DD7164]">shop by age</h2>
        <p className="mt-6 text-center text-[20px] leading-7">Find the perfect dental care for the whole family!</p>
        <div className="max-w-[1120px] mx-auto px-4 mt-6 grid md:grid-cols-2 gap-12">
          {home.shopByAge.map(c => (
            <div key={c.title} className="text-center">
              <Image src={c.img} alt={c.alt} width={512} height={341} className="w-full h-auto rounded-xl" />
              <h3 className="pt-4 pb-2 text-[20px] leading-7 font-bold">{c.title}</h3>
              <p className="pb-4 text-[16px] leading-6">{c.desc}</p>
              <YellowBtn href={c.href}>{c.btn}</YellowBtn>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BUNDLE & SAVE */}
      <section className="bg-[#5AC3B2] py-9 text-white">
        <h2 className="text-center text-[36px] leading-10 font-bold">
          <span className="font-normal" style={SCRIPT}>New!</span>- <span className="text-[#FFE920]">Bundle &amp; Save</span>
        </h2>
        <p className="max-w-[860px] mx-auto mt-2 px-4 text-center text-[18px] leading-7">{home.bundleIntro}</p>
        <Carousel className="max-w-[1240px] mx-auto mt-6 px-8" slideClass="w-full md:w-1/2 lg:w-1/3" gapClass="px-3 lg:px-6" label="Bundles">
          {home.bundles.map(b => (
            <div key={b.href} className="flex flex-col min-h-[450px] h-full rounded-xl bg-white px-6 py-8 text-center">
              <Image src={b.img} alt={b.title} width={300} height={200} className="mx-auto h-[200px] w-auto object-contain" />
              <p className="mt-6 text-[16px] leading-6 font-medium" style={{ color: BLUE }}>{b.title}</p>
              <YellowBtn href={b.href} className="mt-auto mx-auto w-[160px]">Shop Now</YellowBtn>
            </div>
          ))}
        </Carousel>
        <div className="text-center mt-6"><YellowBtn href="/supermouth-bundles">Shop All Bundles</YellowBtn></div>
      </section>

      {/* 9. SYSTEMS */}
      <section className="pt-10 pb-4">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">explore our custom oral care systems for every age and stage</h2>
        <p className="mt-6 text-center text-[18px] md:text-[20px] leading-7 px-4">delivering safe, effective, and comprehensive solutions across all ages</p>
        <Carousel className="max-w-[1312px] mx-auto mt-6 px-8" gapClass="px-3 lg:px-10" arrowColor="#3B82F6" label="Systems">
          {home.systems.map(s => (
            <div key={s.href} className="flex flex-col min-h-[500px] h-full rounded-xl border border-[#394C97] bg-white px-5 pt-8 pb-4 text-center shadow-[0_8px_16px_rgba(57,76,151,0.1)]">
              <Image src={s.img} alt={s.alt} width={240} height={210} className="mx-auto h-[210px] w-auto object-contain" />
              <h3 className="mt-4 text-[20px] leading-7 font-bold">{s.title}</h3>
              <p className="mt-1 mb-5 text-[16px] leading-6">{s.desc}</p>
              <YellowBtn href={s.href} className="mt-auto mx-auto px-4">Shop Now</YellowBtn>
            </div>
          ))}
        </Carousel>
        <div className="text-center mt-4"><YellowBtn href="/systems-overview">Shop All Systems</YellowBtn></div>
      </section>

      {/* 10. PRODUCT CATEGORIES */}
      <section className="pt-10 pb-6">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">browse our comprehensive product categories</h2>
        <p className="mt-6 text-center text-[18px] md:text-[20px] leading-7 px-4">our safe and effective products are tailored for your ever changing needs</p>
        <Carousel className="max-w-[1312px] mx-auto mt-6 px-8" gapClass="px-3 lg:px-10" arrowColor="#3B82F6" label="Product categories">
          {home.categories.map(c => (
            <div key={c.title} className="flex flex-col h-full rounded-xl border border-[#394C97] bg-white overflow-hidden shadow-[0_8px_16px_rgba(57,76,151,0.1)]">
              <div className="relative h-[340px] shrink-0">
                <Image src={c.img} alt={c.title} fill sizes="(min-width:1024px) 360px, 90vw" className="object-cover" />
                <Wave />
              </div>
              <h3 className="text-center pt-3 pb-4 text-[20px] leading-7 font-bold">{c.title}</h3>
              <ul className="list-disc pl-10 pr-5 text-[16px] leading-6">
                {c.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
              <div className="mt-auto pt-5 pb-4 text-center"><YellowBtn href={c.href} className="px-4">Shop Now</YellowBtn></div>
            </div>
          ))}
        </Carousel>
        <div className="text-center mt-10"><YellowBtn href="/shop-all">Shop All</YellowBtn></div>
      </section>

      {/* 11. WHY SUPERMOUTH VIDEO */}
      <section className="py-14 text-white" style={{ background: BLUE }}>
        <h2 className="text-center text-[44px] md:text-[56px] leading-[56px] text-[#FFE920]" style={SCRIPT}>why SuperMouth?</h2>
        <p className="max-w-[840px] mx-auto mt-4 px-4 text-center text-[18px] md:text-[20px] leading-7">
          Discover what makes SuperMouth unlike anything you&apos;ve seen in oral care - safer, smarter, and more fun. Watch now to see why families everywhere are making the switch.
        </p>
        <div className="max-w-[768px] mx-auto mt-12 px-4">
          <div className="relative w-full pt-[56.25%]">
            <iframe src="https://fast.wistia.net/embed/iframe/62xamcq9si?videoFoam=true" title="Why SuperMouth?" allow="autoplay; fullscreen" allowFullScreen loading="lazy" className="absolute inset-0 w-full h-full border-0" />
          </div>
        </div>
      </section>

      {/* 12. S.U.P.E.R. DIFFERENCE */}
      <section className="pb-6">
        <h2 className="text-center py-6 text-[26px] md:text-[30px] leading-9 font-bold px-4">discover the S.U.P.E.R. difference in oral care</h2>
        <div className="max-w-[1312px] mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {home.superCards.map(c => (
            <div key={c.href} className="p-3" style={{ background: BLUE }}>
              <div className="flex flex-col h-full border border-[#FBD116] px-3 pt-3 pb-5 text-center text-white">
                <Image src={c.img} alt={c.alt} width={224} height={131} className="mx-auto w-[224px] h-auto" />
                <p className="mt-2 text-[12px] leading-4">{c.text}</p>
                <Link href={c.href} className="mt-auto pt-8 text-[12px] text-[#FBD116] hover:underline">READ MORE</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. DENTAL PROFESSIONALS */}
      <section className="pt-10 pb-4">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">why dental professionals recommend SuperMouth</h2>
        <Carousel className="max-w-[1312px] mx-auto mt-12 px-8" gapClass="px-3 lg:px-10" label="Dental professional testimonials">
          {home.doctors.map(d => <DoctorCard key={d.img} {...d} />)}
        </Carousel>
        <div className="text-center mt-8"><YellowBtn href="https://supermouthpro.com" className="px-3">Dental Professionals: Join SuperMouth Pro</YellowBtn></div>
      </section>

      {/* 14. MOVIE */}
      <section className="mt-4 pt-6 pb-8 text-white text-center" style={{ background: BLUE }}>
        <h2 className="px-3 text-[28px] md:text-[36px] leading-10 font-bold">our first family adventure movie - now playing</h2>
        <Link href="/play" className="block max-w-[640px] mx-auto mt-6 px-4">
          <Image src="/home/trosm-teaser.jpg" alt="The Rise of SuperMouth trailer poster" width={640} height={362} className="w-full h-auto" />
        </Link>
        <YellowBtn href="/play" className="mt-4">Watch Now</YellowBtn>
      </section>

      {/* 15. NEWSLETTER */}
      <section className="relative overflow-hidden bg-[#0a0a5c] bg-cover bg-center" style={{ backgroundImage: "url('/home/SM-homepage-sign-up-background-image.png')" }}>
        <div className="relative max-w-[1280px] mx-auto px-4 min-h-[395px] flex items-center gap-8">
          <Image src="/home/SM-homepage-sign-Up-Product-shot.png" alt="Glow globe brush floating in space" width={192} height={331} className="hidden md:block w-[192px] h-auto ml-[160px]" />
          <div className="text-white">
            <p className="text-[18px] md:text-[20px] leading-7">Sign up for our mailing list to continue learning ways to make your mouth super</p>
            <div className="mt-6"><NewsletterForm /></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
