'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Press = { title: string; href: string; img: string; alt: string }
type Award = { outlet: string; award: string; product: string; href: string }

const BTN = 'inline-block bg-[#FFE920] text-[#394C97] text-[16px] font-bold px-3 py-2 rounded-lg hover:opacity-90'

/** "additional media" grid; shows 12 then reveals the rest, as on supermouth.com. */
export function AdditionalMedia({ items }: { items: readonly Press[] }) {
  const [all, setAll] = useState(false)
  const shown = all ? items : items.slice(0, 12)
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {shown.map(p => (
          <a key={p.href} href={p.href} target="_blank" rel="noopener" className="group text-center">
            <Image src={p.img} alt={p.alt} width={395} height={263} className="w-full aspect-[3/2] object-cover" />
            <p className="mt-4 text-[16px] leading-6 group-hover:opacity-80">{p.title}</p>
          </a>
        ))}
      </div>
      {items.length > 12 && (
        <div className="text-center mt-10">
          <button onClick={() => setAll(a => !a)} className={BTN}>{all ? 'See Less Press Coverage' : 'See More Press Coverage'}</button>
        </div>
      )}
    </>
  )
}

/** Awards & recognition cards; shows 12 then reveals the rest. */
export function AwardsGrid({ items }: { items: readonly Award[] }) {
  const [all, setAll] = useState(false)
  const shown = all ? items : items.slice(0, 12)
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((a, n) => (
          <Link key={n} href={a.href} className="block rounded-xl border-2 border-[#394C97] bg-white p-6 shadow-[0_6px_14px_rgba(57,76,151,0.15)] hover:-translate-y-0.5 transition-transform">
            <span className="text-[30px] leading-none" aria-hidden>🏆</span>
            <p className="mt-3 pb-4 border-b border-[#394C97]/20 text-[20px] text-[#2BB3A6]">{a.outlet}</p>
            <p className="mt-4 text-[16px] leading-6 font-bold">{a.award}</p>
            {a.product && <p className="mt-2 text-[14px] italic">{a.product}</p>}
          </Link>
        ))}
      </div>
      {items.length > 12 && (
        <div className="text-center mt-8">
          <button onClick={() => setAll(a => !a)} className={BTN}>{all ? 'See Fewer Awards' : 'See More Awards'}</button>
        </div>
      )}
    </>
  )
}
