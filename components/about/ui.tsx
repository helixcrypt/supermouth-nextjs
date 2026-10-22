import Image from 'next/image'
import Link from 'next/link'

// supermouth.com palette
export const BLUE = '#394C97'
export const NAVY = '#131247'
export const TEAL = '#5AC3B2'
export const YELLOW = '#FFE920'
export const CORAL = '#EC6A5E'
export const GOLD = '#F8D41B'

export const scriptStyle = { fontFamily: 'var(--font-script), cursive' }

/** Handwritten accent text (stands in for SuperMouth's licensed Cherry Cordial font). */
export const Script = ({ children, color, className = '' }: { children: React.ReactNode; color?: string; className?: string }) => (
  <span className={`font-normal ${className}`} style={{ ...scriptStyle, color }}>{children}</span>
)

export const YellowLink = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link href={href} className={`inline-block bg-[#FFE920] text-[#394C97] text-[18px] leading-7 font-bold p-2 rounded-lg hover:opacity-90 transition-opacity ${className}`}>
    {children}
  </Link>
)

/** Root wrapper so these pages use the same type as the homepage. */
export const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]" style={{ color: BLUE }}>{children}</div>
)

/**
 * Full-width 388px photo banner with text on the left half, as on supermouth.com.
 * Below lg the photo is shown as a strip above the text so the copy never sits on the busy image.
 */
export function Hero({ img, alt, children, height = 388, contentClass = 'lg:pl-[182px]', priority = true, bg = '#EEF2F8' }: {
  img: string; alt: string; children: React.ReactNode; height?: number; contentClass?: string; priority?: boolean; scrim?: string; bg?: string
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: bg }}>
      <div className="relative h-[220px] sm:h-[280px] lg:absolute lg:inset-0 lg:h-auto">
        <Image src={img} alt={alt} fill priority={priority} sizes="100vw" className="object-cover object-[78%_center] lg:object-center" />
      </div>
      <div className="relative max-w-[1440px] mx-auto flex items-center px-4 lg:min-h-[var(--hero-h)]" style={{ ['--hero-h' as string]: `${height}px` }}>
        <div className={`py-8 lg:py-10 max-w-[560px] ${contentClass}`}>{children}</div>
      </div>
    </section>
  )
}
