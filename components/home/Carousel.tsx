'use client'

import { Children, useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Tailwind width classes for each slide, e.g. "w-full md:w-1/2 lg:w-1/3" */
  slideClass?: string
  gapClass?: string
  arrowColor?: string
  arrows?: boolean
  className?: string
  label?: string
}

const Chevron = ({ dir, color }: { dir: 'left' | 'right'; color: string }) => (
  <svg width="22" height="44" viewBox="0 0 22 44" fill="none" aria-hidden>
    <path d={dir === 'left' ? 'M20 2L2 22l18 20' : 'M2 2l18 20L2 42'} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Scroll-snap carousel with thin chevron arrows, matching supermouth.com's sliders. */
export default function Carousel({ children, slideClass = 'w-full md:w-1/2 lg:w-1/3', gapClass = 'px-3 md:px-5', arrowColor = '#394C97', arrows = true, className = '', label }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const page = (dir: number) => {
    const el = track.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    const atStart = el.scrollLeft <= 4
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
    else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    else el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className={`relative ${className}`} role="region" aria-label={label}>
      <div ref={track} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Children.map(children, child => (
          <div className={`shrink-0 snap-start flex [&>*]:w-full ${slideClass} ${gapClass}`}>{child}</div>
        ))}
      </div>
      {arrows && (
        <>
          <button onClick={() => page(-1)} aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-0 md:-translate-x-6 p-2 hover:opacity-70">
            <Chevron dir="left" color={arrowColor} />
          </button>
          <button onClick={() => page(1)} aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0 md:translate-x-6 p-2 hover:opacity-70">
            <Chevron dir="right" color={arrowColor} />
          </button>
        </>
      )}
    </div>
  )
}
