'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Item = { label: string; media: string; thumb: string }

/** Row of tall video thumbnails (Wistia); clicking one plays it in a popup. Matches supermouth.com strips. */
export default function VideoStrip({ title, sub, items }: { title: string; sub: string; items: readonly Item[] }) {
  const [open, setOpen] = useState<Item | null>(null)
  const track = useRef<HTMLDivElement>(null)
  const page = (dir: number) => {
    const el = track.current
    if (!el) return
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    if (dir > 0 && end) el.scrollTo({ left: 0, behavior: 'smooth' })
    else el.scrollBy({ left: dir * (el.clientWidth - 120), behavior: 'smooth' })
  }

  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <section className="bg-white py-4">
      <h2 className="text-center px-4 text-[24px] md:text-[30px] leading-9 font-bold text-[#394C97]">{title}</h2>
      <p className="text-center px-4 text-[16px] md:text-[18px] leading-7 text-[#394C97]">{sub}</p>
      <div className="relative max-w-[1312px] mx-auto mt-4 px-4">
        <div ref={track} className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map(it => (
            <button key={it.media + it.label} onClick={() => setOpen(it)} className="group relative shrink-0 snap-start w-[200px] md:w-[240px] aspect-[240/426] rounded-lg overflow-hidden bg-[#131247] text-left" aria-label={`Play ${it.label || 'video'}`}>
              <Image src={it.thumb} alt="" fill sizes="240px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-20 h-20 rounded-full bg-black/40">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden><path d="M7 4.5v15l13-7.5z" /></svg>
              </span>
              {it.label && <span className="absolute left-5 right-3 bottom-4 text-white text-[16px] md:text-[18px] leading-7 font-medium">{it.label}</span>}
            </button>
          ))}
        </div>
        <button onClick={() => page(-1)} aria-label="Previous videos" className="absolute left-5 top-1/2 -translate-y-1/2 p-2 text-[#394C97] hover:opacity-70">
          <svg width="22" height="44" viewBox="0 0 22 44" fill="none" aria-hidden><path d="M20 2L2 22l18 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={() => page(1)} aria-label="Next videos" className="absolute right-5 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white shadow text-[#394C97] hover:opacity-70">
          <svg width="12" height="24" viewBox="0 0 22 44" fill="none" aria-hidden><path d="M2 2l18 20L2 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label={open.label || 'Video'} onClick={() => setOpen(null)}>
          <div className="relative w-full max-w-[420px] aspect-[9/16] max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Close video" className="absolute -top-10 right-0 text-white text-[32px] leading-none">×</button>
            <iframe src={`https://fast.wistia.net/embed/iframe/${open.media}?autoPlay=true&videoFoam=true`} title={open.label || 'SuperMouth video'} allow="autoplay; fullscreen" allowFullScreen className="w-full h-full border-0 rounded-lg bg-black" />
          </div>
        </div>
      )}
    </section>
  )
}
