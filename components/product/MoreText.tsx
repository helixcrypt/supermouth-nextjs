'use client'

import { useState } from 'react'

/** "What Makes It Super?"-style text that clamps to 3 lines with a More... toggle. */
export default function MoreText({ html, text, lines = 3 }: { html?: string | null; text?: string | null; lines?: number }) {
  const [open, setOpen] = useState(false)
  if (!html && !text) return null
  const clamp = open ? '' : lines === 3 ? 'line-clamp-3' : 'line-clamp-4'
  return (
    <div className="text-[17px] leading-7" style={{ color: '#394C97' }}>
      {html
        ? <div className={`${clamp} [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-3 [&_strong]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold`} dangerouslySetInnerHTML={{ __html: html }} />
        : <p className={clamp}>{text}</p>}
      <button onClick={() => setOpen(o => !o)} className="mt-1 ml-1 text-[17px] font-medium underline underline-offset-2">{open ? 'Less' : 'More...'}</button>
    </div>
  )
}
