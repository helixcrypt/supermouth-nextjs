'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Quote = { quote: string; source: string; href: string }

/** "Awarded & Featured In": rotating award quote plus a scrolling row of outlet pills. */
export default function AwardsBar({ quotes, pills }: { quotes: readonly Quote[]; pills: readonly string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % quotes.length), 3500)
    return () => clearInterval(t)
  }, [quotes.length])
  const q = quotes[i]

  return (
    <section className="bg-[#F8F5F1] py-6 overflow-hidden">
      <p className="text-center text-[28px] md:text-[36px] leading-10 font-bold text-[#131247]">Awarded &amp; Featured In</p>
      <Link href={q.href} className="block text-center mt-3 text-[16px] md:text-[18px] font-bold text-[#131247] hover:opacity-80 min-h-[28px]">
        {q.quote} — <span className="text-[#5AC3B2]">{q.source}</span>
      </Link>
      <Link href="/in-the-news" className="block mt-5 max-w-[1216px] mx-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]" aria-label="See all press coverage">
        <div className="flex w-max gap-4 animate-[sm-marquee_45.5s_linear_infinite] hover:[animation-play-state:paused]">
          {[...pills, ...pills].map((p, n) => (
            <span key={n} className="whitespace-nowrap rounded-full border-2 border-[#394C97] bg-white px-6 py-3 text-[15px] font-bold text-[#131247]">{p}</span>
          ))}
        </div>
      </Link>
      <style>{`@keyframes sm-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </section>
  )
}
