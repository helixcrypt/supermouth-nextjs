'use client'

import { useState } from 'react'
import Accordion, { Chevron } from '@/components/info/Accordion'
import type { FaqGroup } from '@/components/info/faq-data'

/** FAQ categories: script-font headers that expand/collapse their questions (first open by default). */
export default function FaqCategories({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ [groups[0]?.cat]: true })
  return (
    <div>
      {groups.map(g => {
        const isOpen = !!open[g.cat]
        return (
          <div key={g.cat} className="py-8 md:py-12 border-b border-[#394C97]">
            <button onClick={() => setOpen(o => ({ ...o, [g.cat]: !isOpen }))} aria-expanded={isOpen} className="w-full flex items-center justify-between text-left">
              <span className="text-[#DD7164] text-[34px] md:text-[48px] leading-[56px]" style={{ fontFamily: 'var(--font-script), cursive' }}>{g.cat}</span>
              <span className="text-[#394C97]"><Chevron open={isOpen} className="w-10 h-10 md:w-12 md:h-12" /></span>
            </button>
            {isOpen && <div className="mt-2"><Accordion items={g.items} /></div>}
          </div>
        )
      })}
    </div>
  )
}
