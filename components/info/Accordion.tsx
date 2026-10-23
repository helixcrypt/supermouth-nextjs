'use client'

import { useState } from 'react'

type Item = { q: string; a: string }

export const Chevron = ({ open, className = 'w-6 h-6' }: { open: boolean; className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className={`${className} shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
)

/** Question/answer list styled like supermouth.com's FAQ rows. Answers are trusted HTML captured from the site. */
export default function Accordion({ items, size = 'lg' }: { items: Item[]; size?: 'lg' | 'md' }) {
  const [open, setOpen] = useState<number | null>(null)
  const qSize = size === 'lg' ? 'text-[18px] md:text-[20px] leading-7' : 'text-[16px] md:text-[18px] leading-7'
  return (
    <div>
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className="border-b border-gray-300 px-4 py-4">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`w-full flex items-center gap-4 text-left font-bold text-[#394C97] ${qSize}`}
            >
              <span className="flex-1">{it.q}</span>
              <Chevron open={isOpen} />
            </button>
            {isOpen && (
              <div
                className="pt-3 text-[16px] leading-7 text-[#394C97] [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-[#0BAAC0] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: it.a }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
