'use client'

import { useEffect, useState } from 'react'
import Carousel from '@/components/home/Carousel'

type Item = { title: string; thumb: string | null; mediaId: string | null }

export default function VideoCarousel({ title, subtitle, items }: { title: string; subtitle?: string; items: Item[] }) {
  const [open, setOpen] = useState<Item | null>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="py-10" style={{ color: '#394C97' }}>
      <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">{title}</h2>
      {subtitle && <p className="mt-1 text-center text-[16px] px-4">{subtitle}</p>}
      <Carousel className="max-w-[1312px] mx-auto mt-6 px-8" slideClass="w-[60%] sm:w-1/3 lg:w-1/5" gapClass="px-2" label={title}>
        {items.map(v => (
          <button
            key={v.title}
            onClick={() => v.mediaId && setOpen(v)}
            className="group relative block h-[320px] w-full overflow-hidden rounded-lg bg-[#1f1f1f] bg-cover bg-center text-left"
            style={v.thumb ? { backgroundImage: `url('${v.thumb}')` } : undefined}
            aria-label={`Play video: ${v.title}`}
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/25 backdrop-blur-sm transition group-hover:bg-white/40">
              <svg viewBox="0 0 20 20" fill="white" className="ml-1 h-7 w-7" aria-hidden><path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" /></svg>
            </span>
            <span className="absolute bottom-4 left-4 right-4 text-[15px] font-medium leading-snug text-white">{v.title}</span>
          </button>
        ))}
      </Carousel>

      {open && open.mediaId && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className="relative w-full max-w-[900px]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="absolute -top-10 right-0 text-[32px] leading-none text-white" aria-label="Close video">×</button>
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe src={`https://fast.wistia.net/embed/iframe/${open.mediaId}?autoPlay=true&videoFoam=true`} title={open.title} allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
