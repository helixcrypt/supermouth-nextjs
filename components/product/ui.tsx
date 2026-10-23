// Shared visual atoms for product & system pages (palette matches supermouth.com)
export const BLUE = '#394C97'
export const NAVY = '#131247'
export const TEAL = '#5AC3B2'
export const CORAL = '#DD7164'
export const SCRIPT = { fontFamily: 'var(--font-script), cursive' } as const

export function Stars({ rating = 5, size = 20 }: { rating?: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map(n => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3 5.9 20.7l1.5-6.7L2.3 9.4l6.8-.7z" fill={n < Math.round(rating) ? '#F8D41B' : 'none'} stroke="#F8D41B" strokeWidth="1.5" />
        </svg>
      ))}
    </span>
  )
}

export function ScriptHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-center text-[34px] md:text-[44px] leading-tight ${className}`} style={{ ...SCRIPT, color: CORAL }}>{children}</h2>
}

export const Trophy = () => <span aria-hidden className="mr-1">🏆</span>
