import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { articles, featuredSlugs, PAGE_SIZE } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Learn | SuperMouth',
  description: 'Explore the science behind superior oral care: articles and guides from the dentists behind SuperMouth.',
}

const BLUE = '#394C97'
const SCRIPT = { fontFamily: 'var(--font-script), cursive' }

export default function LearnPage({ searchParams }: { searchParams: { page?: string } }) {
  const pages = Math.ceil(articles.length / PAGE_SIZE)
  const page = Math.min(Math.max(1, parseInt(searchParams.page || '1', 10) || 1), pages)
  const list = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const featured = featuredSlugs.map(s => articles.find(a => a.slug === s)).filter(Boolean) as typeof articles

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>
      {/* Hero */}
      <section className="relative h-[300px] md:h-[388px] overflow-hidden bg-[#5AC3B2]">
        <Image src="/learn/hero.jpg" alt="SuperMouth dental team" fill priority sizes="100vw" className="hidden md:block object-cover object-center" />
        <Image src="/learn/hero-square.jpg" alt="SuperMouth dental team" fill priority sizes="100vw" className="md:hidden object-cover object-right opacity-60" />
        <div className="relative h-full max-w-[1280px] mx-auto px-6 md:px-[180px] flex items-center">
          <h1 className="text-[26px] md:text-[30px] leading-9 font-bold">
            explore the <span className="text-white font-normal text-[32px] md:text-[36px]" style={SCRIPT}>science</span>
            <br />behind superior oral care
          </h1>
        </div>
      </section>

      {/* Latest articles, alternating image left/right */}
      <section className="max-w-[1312px] mx-auto px-4 md:px-4 pt-4">
        {list.map((a, n) => (
          <article key={a.slug} className={`flex flex-col md:items-center py-2 ${n % 2 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <Link href={`/learn/${a.slug}`} className="relative block w-full md:w-1/2 aspect-[16/9] shrink-0">
              {a.thumb && <Image src={a.thumb} alt={a.title} fill sizes="(min-width:768px) 640px, 100vw" className="object-cover" />}
            </Link>
            <div className="md:w-1/2 px-1 md:px-4 py-6 md:py-0">
              <h2 className="text-[22px] md:text-[24px] leading-8 font-bold">
                <Link href={`/learn/${a.slug}`} className="hover:opacity-80">{a.cardTitle}</Link>
              </h2>
              <p className="mt-4 text-[15px] leading-6">{a.excerpt}</p>
              <div className="text-center">
                <Link href={`/learn/${a.slug}`} className="inline-block mt-1 bg-[#FFE920] rounded-lg px-3 py-2 text-[18px] leading-7 font-bold hover:opacity-90">Continue Reading</Link>
              </div>
            </div>
          </article>
        ))}

        <nav className="flex justify-center gap-3 py-4" aria-label="Article pages">
          {page > 1 && (
            <Link href={page === 2 ? '/learn' : `/learn?page=${page - 1}`} className="bg-white border-2 border-[#FFE920] rounded-lg px-3 py-2 text-[16px] font-bold hover:bg-[#FFE920]/30">Previous Articles</Link>
          )}
          {page < pages && (
            <Link href={`/learn?page=${page + 1}`} className="bg-[#FFE920] rounded-lg px-3 py-2 text-[16px] font-bold hover:opacity-90">Explore More Articles</Link>
          )}
        </nav>
      </section>

      {/* Featured articles */}
      <section className="max-w-[1280px] mx-auto px-4 pt-12 pb-16">
        <h2 className="text-center text-[30px] md:text-[36px] leading-10 font-bold">
          <span className="text-[#DD7164] font-normal text-[38px] md:text-[44px]" style={SCRIPT}>featured</span> articles
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9">
          {featured.map(a => (
            <Link key={a.slug} href={`/learn/${a.slug}`} className="group text-center">
              <div className="relative aspect-[16/9]">
                {a.thumb && <Image src={a.thumb} alt={a.title} fill sizes="(min-width:1024px) 395px, (min-width:640px) 50vw, 100vw" className="object-cover" />}
              </div>
              <p className="mt-2 px-4 text-[18px] leading-7 font-bold group-hover:opacity-80">{a.cardTitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
