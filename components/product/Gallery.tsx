'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Img = { url: string; altText: string | null }

const Arrow = ({ dir }: { dir: 'l' | 'r' }) => (
  <svg width="22" height="40" viewBox="0 0 22 44" fill="none" aria-hidden><path d={dir === 'l' ? 'M20 2L2 22l18 20' : 'M2 2l18 20L2 42'} stroke="#394C97" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** Main image with arrows plus a 3-up thumbnail strip, as on supermouth.com. */
export default function Gallery({ images, title, focusUrl }: { images: Img[]; title: string; focusUrl?: string | null }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!focusUrl) return
    const n = images.findIndex(im => im.url.split('?')[0] === focusUrl.split('?')[0])
    if (n >= 0) setI(n)
  }, [focusUrl, images])
  if (!images.length) return <div className="aspect-square rounded-xl bg-[#EDF0F9]" />
  const go = (d: number) => setI(n => (n + d + images.length) % images.length)
  const start = Math.min(Math.max(0, i - 1), Math.max(0, images.length - 3))
  const thumbs = images.slice(start, start + 3)

  return (
    <div>
      <div className="relative">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image src={images[i].url} alt={images[i].altText || title} fill sizes="(min-width:1024px) 464px, 100vw" className="object-contain" priority />
        </div>
        {images.length > 1 && (
          <>
            <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-70"><Arrow dir="l" /></button>
            <button onClick={() => go(1)} aria-label="Next image" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-70"><Arrow dir="r" /></button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {thumbs.map((im, k) => {
            const idx = start + k
            return (
              <button key={im.url + idx} onClick={() => setI(idx)} aria-label={`Show image ${idx + 1}`} className={`relative aspect-square overflow-hidden ${idx === i ? 'ring-2 ring-[#394C97]' : 'opacity-90 hover:opacity-100'}`}>
                <Image src={im.url} alt="" fill sizes="150px" className="object-cover" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
