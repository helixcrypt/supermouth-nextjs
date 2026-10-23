import Link from 'next/link'
import type { LeftBlock } from '@/lib/product-content'

const Shield = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0" fill="none" stroke="#394C97" strokeWidth="2.5" aria-hidden>
    <path d="M24 4l16 6v11c0 11-7 19-16 23C15 40 8 32 8 21V10l16-6z" strokeLinejoin="round" />
    <path d="M16 24l6 6 11-12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Left-column blocks under the gallery ("The ... Difference", satisfaction guarantee, system links). */
export default function LeftBlocks({ blocks, links }: { blocks: LeftBlock[]; links?: { label: string; href: string }[] }) {
  if (!blocks.length && !links?.length) return null
  return (
    <div className="mt-8 border-b border-[#394C97]/60" style={{ color: '#394C97' }}>
      {blocks.map(b => {
        const guarantee = /guarantee/i.test(b.title)
        return guarantee ? (
          <div key={b.title} className="border-t border-[#394C97]/60 py-6">
            <div className="flex items-center gap-4">
              <Shield />
              <h3 className="text-[18px] leading-6 font-medium max-w-[200px]">{b.title}</h3>
            </div>
            <p className="mt-5 px-4 text-[16px] leading-7">{b.text}</p>
          </div>
        ) : (
          <div key={b.title} className="pb-8 text-center">
            <h3 className="text-[20px] font-semibold">{b.title}</h3>
            <p className="mt-2 text-[16px] leading-7">{b.text}</p>
          </div>
        )
      })}
      {links && links.length > 0 && (
        <div className="border-t border-[#394C97]/60 py-5 space-y-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="mx-auto block max-w-[332px] rounded-full border-2 border-[#394C97] py-3 text-center text-[16px] font-medium hover:bg-[#394C97] hover:text-white transition-colors">{l.label}</Link>
          ))}
        </div>
      )}
    </div>
  )
}
