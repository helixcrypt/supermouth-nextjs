'use client'

import { useState } from 'react'
import { SCRIPT } from './ui'

const Chevron = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden><path d="M5 9l7 7 7-7" /></svg>
)

/** "Learn More" section with a collapsible FAQs panel, as on supermouth.com collection pages. */
export default function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState<number | null>(null)
  return (
    <section className="max-w-[1280px] mx-auto px-4 pt-6 pb-10 text-[#394C97]">
      <h2 className="text-center text-[44px] md:text-[56px] leading-[56px] text-[#DD7164]" style={SCRIPT}>Learn More</h2>
      <div className="mt-6 border-y-2 border-[#394C97]/40">
        <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex w-full items-center justify-between py-4 text-[18px] md:text-[20px] font-medium">
          FAQs <Chevron open={open} />
        </button>
        {open && (
          <div className="pb-4">
            {items.map((it, i) => (
              <div key={it.q} className="border-t border-[#394C97]/20">
                <button onClick={() => setQ(q === i ? null : i)} aria-expanded={q === i} className="flex w-full items-center justify-between gap-4 py-3 text-left text-[16px] md:text-[17px] font-bold">
                  {it.q} <Chevron open={q === i} />
                </button>
                {q === i && <p className="pb-4 text-[15px] md:text-[16px] leading-6">{it.a}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
