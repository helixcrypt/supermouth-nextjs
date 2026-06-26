'use client'

import { useState } from 'react'
import Image from 'next/image'

const customerPhotos = [
  { url: 'https://pics.io/public/images/66c4feb375845478f04442e2/cdn', alt: 'Happy customer 1' },
  { url: 'https://pics.io/public/images/66c4feb375845478f04442e1/cdn', alt: 'Happy customer 2' },
  { url: 'https://pics.io/public/images/66c4feb375845478f04442e3/cdn', alt: 'Happy customer 3' },
  { url: 'https://pics.io/public/images/66c4feb475845478f04442e4/cdn', alt: 'Happy customer 4' },
  { url: 'https://pics.io/public/images/671183134800d1c50f7f3fe3/cdn', alt: 'Happy customer 5' },
  { url: 'https://pics.io/public/images/671183134800d1c50f7f3fe7/cdn', alt: 'Happy customer 6' },
  { url: 'https://pics.io/public/images/671183134800d1c50f7f3fe6/cdn', alt: 'Happy customer 7' },
  { url: 'https://pics.io/public/images/671183134800d1c50f7f3fe5/cdn', alt: 'Happy customer 8' },
  { url: 'https://pics.io/public/images/671183134800d1c50f7f3fe4/cdn', alt: 'Happy customer 9' },
  { url: 'https://pics.io/public/images/671183124800d1c50f7f3fe2/cdn', alt: 'Happy customer 10' },
  { url: 'https://pics.io/public/images/671183124800d1c50f7f3fe1/cdn', alt: 'Happy customer 11' },
  { url: 'https://pics.io/public/images/671183124800d1c50f7f3fe0/cdn', alt: 'Happy customer 12' },
  { url: 'https://pics.io/public/images/671183124800d1c50f7f3fde/cdn', alt: 'Happy customer 13' },
  { url: 'https://pics.io/public/images/671183124800d1c50f7f3fdf/cdn', alt: 'Happy customer 14' },
]

const VISIBLE = 3

export default function CustomerCarousel() {
  const [start, setStart] = useState(0)

  const prev = () => setStart(i => Math.max(0, i - 1))
  const next = () => setStart(i => Math.min(customerPhotos.length - VISIBLE, i + 1))

  const canPrev = start > 0
  const canNext = start < customerPhotos.length - VISIBLE

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4">
        {customerPhotos.slice(start, start + VISIBLE).map((photo, i) => (
          <div key={start + i} className="relative aspect-square rounded-2xl overflow-hidden bg-sm-bg">
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        disabled={!canPrev}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-20 hover:bg-sm-bg transition-colors border border-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-sm-navy">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={next}
        disabled={!canNext}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center disabled:opacity-20 hover:bg-sm-bg transition-colors border border-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-sm-navy">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {Array.from({ length: customerPhotos.length - VISIBLE + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className={`w-2 h-2 rounded-full transition-all ${start === i ? 'bg-sm-teal w-4' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}
