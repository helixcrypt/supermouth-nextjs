import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import AwardsBar from '@/components/home/AwardsBar'
import Carousel from '@/components/home/Carousel'
import DoctorCard from '@/components/home/DoctorCard'
import { AdditionalMedia, AwardsGrid } from '@/components/media/NewsParts'
import { home } from '@/lib/home-data'
import { news } from './data'

export const metadata: Metadata = {
  title: 'In the News | SuperMouth',
  description: 'Making headlines everywhere: SuperMouth in the media spotlight, plus awards and recognition from leading publications.',
}

const BLUE = '#394C97'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

const explore = [
  { title: 'Media Inquiries', icon: '/learn/news/icon-media.png', href: '/contact', text: 'For interview requests, expert commentary, or additional information, reach out to our PR team here. We’re ready to collaborate on your next story.' },
  { title: 'SuperMouth Pro', icon: '/learn/news/icon-pro.png', href: 'https://supermouthpro.com', text: 'Dental and medical professionals—explore how you can partner with us to bring revolutionary oral care solutions to your patients. Discover more here.' },
  { title: 'Explore & Learn', icon: '/learn/news/icon-learn.png', href: '/learn', text: 'Dive into the latest articles, research, and educational content to stay informed about oral health and innovations. Start exploring now.' },
]

export default function InTheNewsPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>
      {/* Hero */}
      <section className="relative h-[260px] md:h-[388px] overflow-hidden bg-[#12A9C1]">
        <Image src="/learn/news/hero.jpg" alt="SuperMouth products with press quotes" fill priority sizes="100vw" className="hidden md:block object-cover object-center" />
        <Image src="/learn/news/hero-mobile.jpg" alt="SuperMouth products" fill priority sizes="100vw" className="md:hidden object-cover object-right opacity-70" />
        <div className="relative h-full max-w-[1280px] mx-auto px-6 md:px-[100px] flex flex-col justify-center">
          <h1 className="text-[30px] leading-9 font-bold">in the <span className="text-white font-normal text-[36px]" style={SCRIPT}>news</span></h1>
          <p className="mt-3 text-[16px] leading-7 text-white/90 md:text-[#C9F1F4]">Making Headlines Everywhere:<br />SuperMouth in the Media Spotlight</p>
        </div>
      </section>

      <AwardsBar quotes={home.awardQuotes} pills={home.awardPills} />

      {/* Featured media */}
      <section className="max-w-[1312px] mx-auto px-4 pt-8">
        <div className="rounded-xl border-2 border-[#394C97] px-4 md:px-8 py-8">
          <h2 className="text-center text-[30px] md:text-[36px] leading-10 font-bold">
            <span className="text-[#DD7164] font-normal text-[40px] md:text-[46px]" style={SCRIPT}>featured</span> media
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            {news.featured.map(p => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener" className="group text-center">
                <Image src={p.img} alt={p.alt} width={383} height={255} className="w-full aspect-[3/2] object-cover" />
                <p className="mt-4 text-[16px] leading-6 group-hover:opacity-80">{p.title}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Additional media */}
      <section className="max-w-[1280px] mx-auto px-4 pt-10">
        <h2 className="text-center text-[30px] md:text-[36px] leading-10 font-bold mb-10">
          <span className="text-[#DD7164] font-normal text-[40px] md:text-[46px]" style={SCRIPT}>additional</span> media
        </h2>
        <AdditionalMedia items={news.additional} />
      </section>

      {/* Awards */}
      <section className="max-w-[1280px] mx-auto px-4 pt-12">
        <h2 className="text-center text-[30px] md:text-[36px] leading-10 font-bold">
          <span className="text-[#DD7164] font-normal text-[40px] md:text-[46px]" style={SCRIPT}>awards</span> &amp; recognition
        </h2>
        <p className="max-w-[640px] mx-auto mt-4 mb-8 text-center text-[16px] leading-6">Editors and journalists at the world&apos;s leading health and lifestyle publications have recognized SuperMouth across products, ingredients, and innovation.</p>
        <AwardsGrid items={news.awards} />
        <div className="mt-10 rounded-lg px-6 py-5 text-white" style={{ background: BLUE }}>
          <p className="text-[12px] font-bold tracking-[0.1em] text-[#FFE920]">ABOUT THESE AWARDS</p>
          <p className="mt-1 text-[14px] leading-6">{news.about}</p>
        </div>
      </section>

      {/* Dental professionals */}
      <section className="pt-12 pb-4">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">why dental professionals recommend SuperMouth</h2>
        <Carousel className="max-w-[1312px] mx-auto mt-10 px-8" gapClass="px-3 lg:px-10" label="Dental professional testimonials">
          {home.doctors.map(d => <DoctorCard key={d.img} {...d} />)}
        </Carousel>
        <div className="text-center mt-8">
          <a href="https://supermouthpro.com" className="inline-block bg-[#FFE920] text-[18px] font-bold px-3 py-2 rounded-lg hover:opacity-90">Dental Professionals: Join SuperMouth Pro</a>
        </div>
      </section>

      {/* Explore SuperMouth */}
      <section className="bg-[#F0F1F3] mt-8 pt-8 pb-10">
        <h2 className="text-center text-[20px] font-bold tracking-[0.02em]">EXPLORE SUPERMOUTH</h2>
        <div className="max-w-[1312px] mx-auto px-4 mt-6 grid md:grid-cols-3 gap-6">
          {explore.map(e => {
            const inner = (
              <>
                <Image src={e.icon} alt="" width={130} height={130} className="mx-auto w-[130px] h-[130px]" />
                <p className="mt-2 text-[18px] font-bold">{e.title}</p>
                <p className="mt-3 text-[16px] leading-6">{e.text}</p>
              </>
            )
            const cls = 'block rounded px-8 py-6 text-center text-white hover:opacity-95'
            return e.href.startsWith('http')
              ? <a key={e.title} href={e.href} target="_blank" rel="noopener" className={cls} style={{ background: BLUE }}>{inner}</a>
              : <Link key={e.title} href={e.href} className={cls} style={{ background: BLUE }}>{inner}</Link>
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
