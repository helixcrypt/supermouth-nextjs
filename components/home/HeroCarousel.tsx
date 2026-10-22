'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Slide = { eyebrow: string; title: string; desc: string; cta: string; href: string; img: string }

const BLUE = '#394C97'

const Badge = ({ className, big, small }: { className: string; big: string; small: string }) => (
  <div className={`absolute z-10 rounded-xl px-3 py-2 shadow-lg ${className}`}>
    <div className="text-[20px] leading-7 font-bold">{big}</div>
    <div className="text-[9px] leading-3 font-bold tracking-[0.06em] uppercase">{small}</div>
  </div>
)

export default function HeroCarousel({ slides }: { slides: readonly Slide[] }) {
  const [i, setI] = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI(n => (n + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [paused, slides.length])

  return (
    <div className="relative mx-auto w-full max-w-[516px] pt-6 pb-10 md:px-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Badge className="bg-white text-[#394C97] -left-3 md:-left-10 top-0" big="~300" small="Patents" />
      <Badge className="bg-[#394C97] text-white -right-3 md:-right-8 top-[120px]" big="★ 4.8" small="10,000+ Reviews" />
      <Badge className="bg-[#394C97] text-white -left-3 md:-left-8 top-[386px]" big="125,000+" small="Families" />
      <Badge className="bg-white text-[#394C97] -right-1 md:right-[-16px] bottom-0" big="EWG #1" small="Safety Rating" />

      <div className="relative overflow-hidden rounded-2xl border border-white/80 shadow-sm" style={{ background: 'linear-gradient(160deg, #E6E9F5 0%, #DDE2F2 100%)' }}>
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map(s => (
            <div key={s.title} className="w-full shrink-0 px-8 pt-8 pb-16 text-center" style={{ color: BLUE }}>
              <span className="inline-block bg-white rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.04em]">{s.eyebrow}</span>
              <Image src={s.img} alt={s.title} width={192} height={192} className="mx-auto my-5 w-[192px] h-[192px] object-cover" />
              <h2 className="text-[30px] leading-9 font-bold">{s.title}</h2>
              <p className="mt-3 text-[16px] leading-6 max-w-[320px] mx-auto">{s.desc}</p>
              <Link href={s.href} className="inline-block mt-6 bg-[#FFE920] rounded-full px-5 py-2 text-[16px] font-bold hover:opacity-90">
                {s.cta} <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {slides.map((s, n) => (
          <button key={s.title} onClick={() => setI(n)} aria-label={`Show ${s.title}`} className="h-2 rounded-full transition-all" style={{ width: n === i ? 24 : 8, background: n === i ? BLUE : 'rgba(57,76,151,0.3)' }} />
        ))}
      </div>
    </div>
  )
}
