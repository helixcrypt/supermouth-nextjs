'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// Video carousel from the original bundles page
const VIDEOS = [
  { title: 'Toothpaste For Every Stage', thumb: '/cdn/video-still.jpg', url: 'https://supermouth.com/supermouth-bundles' },
  { title: 'Power Clean for Braces', thumb: '/cdn/category-toothbrush.png', url: 'https://supermouth.com/supermouth-bundles' },
  { title: 'SuperMouth Flavor Splash', thumb: '/cdn/category-toothpaste.png', url: 'https://supermouth.com/supermouth-bundles' },
  { title: 'SuperMouth Rinse Revolution', thumb: '/cdn/category-mouthwash.png', url: 'https://supermouth.com/supermouth-bundles' },
  { title: 'What if Toothpaste Tastes Like Ice Cream', thumb: '/cdn/banner-0968.png', url: 'https://supermouth.com/supermouth-bundles' },
]

export default function BundleVideoCarousel() {
  const [startIndex, setStartIndex] = useState(0)
  const visible = 4

  const prev = () => setStartIndex(i => Math.max(0, i - 1))
  const next = () => setStartIndex(i => Math.min(VIDEOS.length - visible, i + 1))

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-hidden">
        {VIDEOS.slice(startIndex, startIndex + visible).map(video => (
          <div key={video.title} className="relative flex-shrink-0 w-56 rounded-2xl overflow-hidden bg-sm-navy group cursor-pointer">
            <div className="relative h-48">
              <Image
                src={video.thumb}
                alt={video.title}
                fill
                className="object-cover group-hover:opacity-80 transition-opacity"
              />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sm-navy ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-3 bg-sm-navy">
              <p className="text-white text-xs font-bold leading-snug">{video.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Carousel controls */}
      <button
        onClick={prev}
        disabled={startIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full shadow-lg p-2 disabled:opacity-30 hover:bg-sm-bg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-sm-navy">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        disabled={startIndex >= VIDEOS.length - visible}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full shadow-lg p-2 disabled:opacity-30 hover:bg-sm-bg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-sm-navy">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
