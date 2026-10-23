import type React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Carousel from '@/components/home/Carousel'
import VideoCarousel from './VideoCarousel'
import Accordion from './Accordion'
import { BLUE, CORAL, NAVY, TEAL, Stars, ScriptHeading } from './ui'
import type { Section, ComparisonSection, ReviewsSection } from '@/lib/product-content'

const isLocal = (src: string | null | undefined) => !!src && src.startsWith('/')

function Img({ src, alt, className, w = 600, h = 600 }: { src: string | null; alt: string; className?: string; w?: number; h?: number }) {
  if (!src) return null
  return isLocal(src) || src.includes('cdn.shopify.com')
    ? <Image src={src} alt={alt} width={w} height={h} className={className} />
    : <img src={src} alt={alt} className={className} loading="lazy" />
}

function Comparison({ s }: { s: ComparisonSection }) {
  // Colour the highlighted words of the title the way the original does
  let title: (string | React.JSX.Element)[] = [s.title]
  for (const sp of s.titleSpans.filter(x => x.t.trim())) {
    title = title.flatMap((part): (string | React.JSX.Element)[] => {
      if (typeof part !== 'string' || !part.includes(sp.t)) return [part]
      const [a, ...rest] = part.split(sp.t)
      return [a, <span key={sp.t} style={{ color: sp.c }}>{sp.t}</span>, rest.join(sp.t)]
    })
  }
  const Mark = ({ ok }: { ok: boolean }) => ok
    ? <svg viewBox="0 0 20 20" className="mx-auto h-7 w-7" fill="#FBD116" aria-label="yes"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>
    : <svg viewBox="0 0 20 20" className="mx-auto h-6 w-6" fill="#EC6A5E" aria-label="no"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
  const last = s.cols.length - 1
  return (
    <section className="py-8 text-white" style={{ background: BLUE }}>
      <h2 className="text-center text-[24px] md:text-[28px] font-bold px-4" style={{ color: TEAL }}>{title}</h2>
      <div className="max-w-[1312px] mx-auto px-4 mt-6 grid lg:grid-cols-[300px_1fr] gap-6 items-center">
        <div className="hidden lg:block"><Img src={s.img} alt="" className="w-full h-auto" w={300} h={420} /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="py-3 pr-3 text-left font-semibold">{s.featLabel}</th>
                {s.cols.map((c, i) => (
                  <th key={i} className={`w-[100px] px-2 py-3 text-center font-normal leading-tight border-l border-white/40 ${i === last ? 'w-[150px] border-x-2 !border-[#FBD116]' : ''}`}>
                    {i === last && s.logo ? <img src={s.logo} alt="SuperMouth" className="mx-auto h-8 w-auto" /> : c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map(r => (
                <tr key={r.label} className="border-t border-white/40">
                  <td className="py-3 pr-3">{r.label}</td>
                  {r.marks.map((m, i) => <td key={i} className={`border-l border-white/40 ${i === last ? 'border-x-2 !border-[#FBD116]' : ''}`}><Mark ok={m} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
          {s.after.length > 0 && <div className="mt-4 space-y-1 text-center text-[14px]">{s.after.map(a => <p key={a}>{a}</p>)}</div>}
        </div>
      </div>
    </section>
  )
}

function Reviews({ s }: { s: ReviewsSection }) {
  return (
    <section id="product-reviews" className="max-w-[1312px] mx-auto px-4 py-10" style={{ color: BLUE }}>
      <ScriptHeading>Customer Reviews</ScriptHeading>
      <p className="mt-2 flex items-center justify-center gap-2 text-[14px]"><Stars size={22} /> ({s.count})</p>
      <div className="mt-8 space-y-7">
        {s.reviews.map((r, i) => (
          <article key={i}>
            <Stars rating={r.rating} size={22} />
            <p className="mt-1 flex items-center gap-1 font-bold">{r.name}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill={TEAL} aria-label="verified buyer"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>
            </p>
            {r.title && <p className="mt-2 font-bold">{r.title}</p>}
            <p className="text-[15px]">{r.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] opacity-70">Showing the most recent of {s.count} verified reviews.</p>
    </section>
  )
}

export default function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, idx) => {
        switch (s.kind) {
          case 'videos':
            return s.items.length ? <VideoCarousel key={idx} title={s.title} subtitle={s.subtitle} items={s.items} /> : null
          case 'featureCards':
            return (
              <section key={idx} className="py-8" style={{ color: BLUE }}>
                {s.title && <h2 className="text-center text-[26px] md:text-[30px] font-bold px-4 mb-6">{s.title}</h2>}
                <Carousel className="max-w-[1312px] mx-auto px-8" gapClass="px-3 lg:px-5" arrowColor="#3B82F6" label="Features">
                  {s.cards.map(c => (
                    <div key={c.title} className="h-full rounded-lg border border-[#394C97] bg-white p-2 text-center shadow-[0_4px_10px_rgba(57,76,151,0.12)]">
                      <Img src={c.img} alt={c.title} className="w-full aspect-[16/9] object-cover rounded" w={560} h={315} />
                      <h3 className="mt-5 px-3 text-[20px] leading-7 font-semibold">{c.title}</h3>
                      <div className="mt-4 space-y-3 px-3 pb-6 text-[15px] leading-6">{c.paras.map(p => <p key={p}>{p}</p>)}</div>
                    </div>
                  ))}
                </Carousel>
              </section>
            )
          case 'callout':
            return (
              <section key={idx} className="max-w-[1290px] mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center gap-8 rounded-lg px-8 py-10 text-white" style={{ background: '#3653A0' }}>
                  {s.icon && <span className="shrink-0 w-[90px] md:mx-14 [&_svg]:w-full [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: s.icon }} />}
                  <div className="max-w-[820px]">
                    <h2 className="text-[20px] font-bold">{s.title}</h2>
                    <div className="mt-3 space-y-2 text-[14px] leading-5 [&_strong]:font-bold [&_em]:italic">
                      {s.parasHtml.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                    </div>
                  </div>
                </div>
              </section>
            )
          case 'featureGrid': {
            const [title, subtitle, ...rest] = s.lines
            const pairs: [string, string][] = []
            for (let i = 0; i + 1 < rest.length; i += 2) pairs.push([rest[i], rest[i + 1]])
            return (
              <section key={idx} className="bg-[#F6F7F9] py-10" style={{ color: BLUE }}>
                <h2 className="text-center text-[24px] md:text-[30px] font-bold px-4">{title}</h2>
                {subtitle && <p className="mt-4 text-center text-[18px] px-4">{subtitle}</p>}
                <div className="max-w-[1312px] mx-auto mt-6 px-4 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 text-center">
                  {pairs.map(([t, d]) => (
                    <div key={t}><h3 className="text-[20px] font-bold">{t}</h3><p className="mt-3 text-[15px] leading-6">{d}</p></div>
                  ))}
                </div>
              </section>
            )
          }
          case 'getToKnow':
            return (
              <section key={idx} className="max-w-[1312px] mx-auto px-4 py-10" style={{ color: BLUE }}>
                <h2 className="text-center text-[26px] md:text-[30px] font-bold">{s.title}</h2>
                <div className="mt-10 grid md:grid-cols-2 gap-8 items-center">
                  <ul className="space-y-5">
                    {s.bullets.map(b => (
                      <li key={b.label} className="flex gap-4 text-[17px] leading-7">
                        <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0" aria-hidden><circle cx="12" cy="12" r="12" fill={TEAL} /><path d="M7 12.5l3.2 3.2L17 9" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <p><b className="font-bold">{b.label}:</b> {b.text}</p>
                      </li>
                    ))}
                  </ul>
                  <Img src={s.img} alt={s.title} className="w-full h-auto" w={640} h={480} />
                </div>
              </section>
            )
          case 'comparison':
            return <Comparison key={idx} s={s} />
          case 'companions':
          case 'loveToo': {
            const blue = s.kind === 'loveToo'
            return (
              <section key={idx} className={`py-6 ${blue ? 'text-white' : 'bg-[#F6F7F9]'}`} style={blue ? { background: BLUE } : { color: BLUE }}>
                <h2 className="text-center text-[20px] md:text-[22px] font-semibold px-4">{s.title}</h2>
                <Carousel className="max-w-[1312px] mx-auto mt-4 px-8" slideClass="w-1/2 md:w-1/3 lg:w-1/4" gapClass="px-2 md:px-3" arrowColor={blue ? '#FFFFFF' : '#3B82F6'} arrows={s.items.length > 4} label={s.title}>
                  {s.items.map(it => (
                    <Link key={it.href} href={it.href} className="block h-full rounded-lg bg-white p-2 pb-4 text-center shadow-sm hover:-translate-y-0.5 transition-transform" style={{ color: BLUE }}>
                      <Img src={it.img} alt={it.title} className="w-full aspect-square object-contain" w={300} h={300} />
                      <p className="mt-3 text-[14px] md:text-[15px] leading-5">{it.title}</p>
                    </Link>
                  ))}
                </Carousel>
              </section>
            )
          }
          case 'accordions':
            return (
              <section key={idx} className="max-w-[1312px] mx-auto px-4 py-8">
                <ScriptHeading className="mb-4">{s.title}</ScriptHeading>
                <Accordion items={s.items} />
              </section>
            )
          case 'faq':
            return (
              <section key={idx} className="max-w-[960px] mx-auto px-4 py-10" style={{ color: BLUE }}>
                <h2 className="text-center text-[26px] md:text-[30px] font-medium mb-6">{s.title}</h2>
                <Accordion items={s.items.map(f => ({ title: f.q, html: f.a }))} size="lg" />
              </section>
            )
          case 'awards':
            return (
              <section key={idx} className="max-w-[1312px] mx-auto px-4 py-10" style={{ color: BLUE }}>
                <h2 className="text-center text-[26px] md:text-[30px] font-medium">{s.title}</h2>
                {s.intro.map(t => <p key={t} className="mt-2 text-center text-[16px]">{t}</p>)}
                <div className="mt-8 grid md:grid-cols-2 gap-5 items-start">
                  {s.items.map((a, i) => (
                    <div key={i} className="rounded-xl border border-[#394C97]/15 bg-white p-6 shadow-[0_4px_14px_rgba(57,76,151,0.1)]">
                      <h3 className="text-[17px] font-semibold uppercase">🏆 {a.title}</h3>
                      <p className="text-[14px] font-semibold">{a.pub}</p>
                      <blockquote className="mt-4 border-l-4 border-[#FBD116] pl-4 text-[14px] italic leading-6">{a.quote}</blockquote>
                      {a.source && <p className="mt-4 text-[14px]">— {a.source}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )
          case 'reviews':
            return s.reviews.length ? <Reviews key={idx} s={s} /> : null
          case 'html':
            return (
              <section key={idx} className="max-w-[1100px] mx-auto px-4 py-8 text-[16px] leading-7 [&_h2]:text-[26px] [&_h2]:font-bold [&_h3]:text-[20px] [&_h3]:font-semibold [&_li]:ml-6 [&_li]:list-disc [&_p]:my-3 [&_strong]:font-semibold [&>div>div:first-child]:text-center" style={{ color: BLUE }}>
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </section>
            )
          default:
            return null
        }
      })}
    </>
  )
}

export { CORAL, NAVY }
