'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const BLUE = '#394C97'

const yt = (id: string) => `https://www.youtube.com/embed/${id}`

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="18" height="36" viewBox="0 0 22 44" fill="none" aria-hidden>
    <path d={dir === 'left' ? 'M20 2L2 22l18 20' : 'M2 2l18 20L2 42'} stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Main movie player with "watch the movie" / "watch the trailer" switch. */
export function MoviePlayer({ movie, trailer }: { movie: string; trailer: string }) {
  const [id, setId] = useState(movie)
  return (
    <>
      <div className="relative w-full pt-[56.25%] mt-6">
        <iframe key={id} src={yt(id)} title={id === movie ? 'The Rise of SuperMouth | Official Movie' : 'The Rise of SuperMouth | Trailer'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4 md:gap-16">
        <button onClick={() => setId(movie)} className={`w-[300px] max-w-full rounded-lg py-3 text-[24px] md:text-[30px] font-semibold ${id === movie ? 'bg-[#F8D41B]' : 'bg-[#F1D45F]'}`} style={{ color: BLUE }}>watch the movie</button>
        <button onClick={() => setId(trailer)} className={`w-[300px] max-w-full rounded-lg py-3 text-[24px] md:text-[30px] font-semibold ${id === trailer ? 'bg-[#F8D41B]' : 'bg-[#F1D45F]'}`} style={{ color: BLUE }}>watch the trailer</button>
      </div>
    </>
  )
}

type Character = { name: string; label: string; img: string; video: string; bio: readonly string[] }

/** Character spotlight: clip + bio for the selected character, picker carousel underneath. */
export function Characters({ characters }: { characters: readonly Character[] }) {
  const [i, setI] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const c = characters[i]
  const scroll = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 items-center bg-[#4AA7C8] p-4 md:p-6 text-white">
        <div className="relative w-full pt-[56.25%]">
          <iframe key={c.video} src={yt(c.video)} title={`${c.name} character clip`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" className="absolute inset-0 w-full h-full border-0" />
        </div>
        <div className="text-[14px] leading-6 space-y-3">
          {c.bio.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </div>

      <div className="relative mt-3 px-6">
        <button onClick={() => scroll(-1)} aria-label="Previous characters" className="absolute left-0 top-[44px] z-10 p-1"><Chevron dir="left" /></button>
        <div ref={track} className="flex gap-4 md:gap-6 overflow-x-auto snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {characters.map((ch, n) => (
            <button key={ch.name} onClick={() => setI(n)} className="snap-start shrink-0 w-[150px] md:w-[208px] text-center" aria-pressed={n === i}>
              <span className={`block mx-auto w-[120px] h-[120px] md:w-[208px] md:h-[208px] rounded-full overflow-hidden ${n === i ? 'ring-4 ring-white' : ''}`}>
                <Image src={ch.img} alt={ch.name} width={208} height={208} className="w-full h-full object-cover" />
              </span>
              <span className="block mt-1 text-[14px] text-white">{ch.label}</span>
            </button>
          ))}
        </div>
        <button onClick={() => scroll(1)} aria-label="More characters" className="absolute right-0 top-[44px] z-10 p-1"><Chevron dir="right" /></button>
      </div>
    </div>
  )
}

type Tile = { img: string; alt: string; href: string | null }

/** Products featured in the movie. The comic book tile plays the comic video. */
export function ProductTiles({ tiles, comicVideo }: { tiles: readonly Tile[]; comicVideo: string }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
        {tiles.map(t => {
          const img = <Image src={t.img} alt={t.alt} width={395} height={395} className="w-full h-auto" />
          if (t.href === 'comic') return (
            <button key={t.alt} onClick={() => setOpen(true)} aria-label="Play the SuperMouth comic book video" className="block hover:opacity-90">{img}</button>
          )
          return t.href ? <Link key={t.alt} href={t.href} className="block hover:opacity-90">{img}</Link> : <div key={t.alt}>{img}</div>
        })}
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="SuperMouth comic book video">
          <div className="relative w-full max-w-[960px]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute -top-10 right-0 text-white text-[32px] leading-none">×</button>
            <video src={comicVideo} controls autoPlay playsInline className="w-full h-auto bg-black" />
          </div>
        </div>
      )}
    </>
  )
}

type Shot = { img: string; alt: string }

/** Image gallery: large frame plus thumbnail strip. */
export function Gallery({ shots }: { shots: readonly Shot[] }) {
  const [i, setI] = useState(0)
  const track = useRef<HTMLDivElement>(null)
  const go = (d: number) => {
    const n = (i + d + shots.length) % shots.length
    setI(n)
    const el = track.current?.children[n] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }
  return (
    <div>
      <div className="relative w-full aspect-[16/9] bg-black">
        <Image src={shots[i].img} alt={shots[i].alt} fill sizes="(min-width:1280px) 1280px, 100vw" className="object-contain" />
      </div>
      <div className="relative mt-3 px-6">
        <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1"><Chevron dir="left" /></button>
        <div ref={track} className="flex gap-4 md:gap-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((s, n) => (
            <button key={s.img} onClick={() => setI(n)} aria-label={`Show ${s.alt}`} className={`shrink-0 w-[140px] md:w-[208px] aspect-[16/9] relative rounded ${n === i ? 'ring-2 ring-white' : ''}`}>
              <Image src={s.img} alt="" fill sizes="208px" className="object-cover rounded" />
            </button>
          ))}
        </div>
        <button onClick={() => go(1)} aria-label="Next image" className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1"><Chevron dir="right" /></button>
      </div>
    </div>
  )
}
