import { shop } from './data'

export const BLUE = '#394C97'
export const NAVY = '#131247'
export const TEAL = '#5AC3B2'
export const YELLOW = '#FFE920'
export const SCRIPT = { fontFamily: 'var(--font-script), cursive' } as const

export const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '')
const ratings = shop.ratings as Record<string, { reviews?: number; award?: string }>
export const ratingFor = (title: string) => ratings[norm(title)] ?? null

export const Stars = ({ size = 22 }: { size?: number }) => (
  <span className="inline-flex" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map(n => (
      <svg key={n} width={size} height={size} viewBox="0 0 24 24" fill="#FBD116" aria-hidden><path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3 5.9 20.7l1.5-6.7L2.3 9.4l6.8-.7z" /></svg>
    ))}
  </span>
)

export const Trophy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden>
    <path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3zm0 4H6v1a2 2 0 0 0 1.2 1.8A5 5 0 0 1 7 8.5V7zm10 0v1.5c0 .5-.1.9-.2 1.3A2 2 0 0 0 18 8V7h-1z" />
  </svg>
)

/** Title with a plain word followed by a script word, e.g. "tooth brushes". */
export const SplitTitle = ({ word, script, color = TEAL, className = '' }: { word: string; script: string; color?: string; className?: string }) => (
  <h1 className={`text-center text-[36px] md:text-[48px] leading-[48px] font-bold ${className}`} style={{ color }}>
    {word} <span className="font-normal text-[44px] md:text-[60px]" style={SCRIPT}>{script}</span>
  </h1>
)

const ORDER = shop.order as Record<string, readonly string[]>
/** Keep only the products supermouth.com lists on a given page (all items if no list is captured). */
export function onlyOriginal<T extends { title: string }>(key: string, items: T[]): T[] {
  const order = ORDER[key]
  if (!order) return items
  const kept = items.filter(i => order.includes(norm(i.title)))
  return kept.length >= order.length * 0.6 ? kept : items
}

/** Sort products into the order supermouth.com shows them on a given page; unknown products go last. */
export function sortLikeOriginal<T extends { title: string }>(key: string, items: T[]): T[] {
  const order = ORDER[key]
  if (!order) return items
  const pos = (t: string) => { const i = order.indexOf(norm(t)); return i === -1 ? 9999 : i }
  return [...items].sort((a, b) => pos(a.title) - pos(b.title))
}
