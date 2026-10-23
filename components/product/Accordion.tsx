'use client'

import { useState } from 'react'

const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={`h-6 w-6 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
  </svg>
)

/** Accordion rows. Content is trusted HTML captured from supermouth.com. */
export default function Accordion({ items, size = 'lg', icons }: { items: { title: string; html: string; sub?: string }[]; size?: 'lg' | 'md'; icons?: (string | null)[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-[#394C97]/60 border-y border-[#394C97]/60" style={{ color: '#394C97' }}>
      {items.map((it, i) => (
        <div key={it.title + i}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className={`flex w-full items-center gap-3 text-left ${size === 'lg' ? 'py-5 text-[18px] md:text-[20px]' : 'py-3 text-[16px]'}`}>
            {icons?.[i] && <img src={icons[i]!} alt="" className="h-6 w-auto max-w-[48px] object-contain" />}
            <span className="flex-1">
              <span className={size === 'md' ? 'font-semibold' : ''}>{it.title}</span>
              {it.sub && <span className="ml-1 text-[12px] opacity-80">{it.sub}</span>}
            </span>
            <Chevron open={open === i} />
          </button>
          {open === i && (
            <div className="pb-5 text-[15px] leading-6 [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_ol_li]:list-decimal [&_p]:my-2 [&_strong]:font-semibold [&>div>div>div:first-child]:font-semibold [&>div>div]:mt-3" dangerouslySetInnerHTML={{ __html: it.html }} />
          )}
        </div>
      ))}
    </div>
  )
}
