'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = { quote: string; full: string; name: string; practice: string; img: string }

export default function DoctorCard({ quote, full, name, practice, img }: Props) {
  const [open, setOpen] = useState(false)
  const hasMore = full.length > quote.length

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <div className="flex flex-col h-full min-h-[384px] rounded-xl border border-[#394C97] bg-white px-4 py-4 text-center shadow-[0_8px_16px_rgba(57,76,151,0.1)]" style={{ color: '#394C97' }}>
        <Image src={img} alt={name} width={96} height={96} className="mx-auto w-24 h-24 rounded-full object-cover border-2 border-[#394C97]" />
        <p className="pt-4 text-left text-[16px] leading-6 line-clamp-6">{quote}</p>
        {hasMore && <button onClick={() => setOpen(true)} className="mt-1 text-[14px] hover:underline">Read More</button>}
        <p className="mt-auto pt-6 text-[18px] leading-7 font-bold">{name}</p>
        {practice && <p className="text-[16px] leading-6">{practice}</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={`Testimonial from ${name}`}>
          <div className="relative max-w-[560px] max-h-[85vh] overflow-y-auto rounded-xl bg-white p-6 text-center shadow-xl" style={{ color: '#394C97' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute right-3 top-2 text-[28px] leading-none hover:opacity-60">×</button>
            <Image src={img} alt={name} width={96} height={96} className="mx-auto w-24 h-24 rounded-full object-cover border-2 border-[#394C97]" />
            <p className="mt-4 text-left text-[16px] leading-6">{full}</p>
            <p className="mt-5 text-[18px] leading-7 font-bold">{name}</p>
            {practice && <p className="text-[16px] leading-6">{practice}</p>}
          </div>
        </div>
      )}
    </>
  )
}
