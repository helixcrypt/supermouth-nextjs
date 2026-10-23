'use client'

import { useMemo, useState, type ReactNode } from 'react'
import ProductCard from '@/components/ProductCard'
import type { ShopProduct } from '@/lib/shop-queries'

type Opt = readonly [string, string]
type Select = { label: string; options: readonly Opt[]; test: (p: ShopProduct, value: string) => boolean }

const TYPE_TESTS: Record<string, RegExp> = {
  electric: /sonic|electric|turbo|ultim8/i,
  manual: /manual|superbrush|finger brush|toddler/i,
  musical: /musical|song|glow globe|bristles musical/i,
  heads: /replacement|brush heads/i,
}

/** Gray "Filter By:" bar with dropdowns, then a 4-column product grid. Optional content between them. */
export default function FilterGrid({
  products,
  membership = {},
  mode,
  ageOptions = [],
  categoryOptions = [],
  between,
}: {
  products: ShopProduct[]
  membership?: Record<string, string[]>
  mode: 'shopAll' | 'kids' | 'type' | 'none'
  ageOptions?: readonly Opt[]
  categoryOptions?: readonly Opt[]
  between?: ReactNode
}) {
  const inCol = (p: ShopProduct, handle: string) => (membership[handle] ?? []).includes(p.handle)
  const selects: Select[] = useMemo(() => {
    if (mode === 'shopAll') return [
      { label: 'Select Age and Stage', options: ageOptions, test: inCol },
      { label: 'Select Category', options: categoryOptions, test: inCol },
    ]
    if (mode === 'kids') return [
      { label: 'Select Age', options: ageOptions, test: inCol },
      { label: 'Select Category', options: categoryOptions, test: inCol },
    ]
    if (mode === 'type') return [
      { label: 'Select Type', options: [['Electric & Sonic', 'electric'], ['Manual', 'manual'], ['Musical', 'musical'], ['Replacement Heads', 'heads']] as const, test: (p, v) => TYPE_TESTS[v].test(p.title) },
    ]
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, membership])

  const [values, setValues] = useState<string[]>(() => selects.map(() => ''))
  const shown = products.filter(p => selects.every((s, i) => !values[i] || s.test(p, values[i])))

  return (
    <>
      {selects.length > 0 && (
        <div className="bg-[#F4F4F4] py-6">
          <div className="max-w-[1280px] mx-auto px-4 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-[#394C97]">
            <span className="text-[18px] md:text-[20px]">Filter By:</span>
            {selects.map((s, i) => (
              <label key={s.label} className="relative">
                <span className="sr-only">{s.label}</span>
                <select
                  value={values[i]}
                  onChange={e => setValues(v => v.map((x, j) => (j === i ? e.target.value : x)))}
                  className="appearance-none rounded-md border border-[#394C97] bg-white pl-4 pr-10 py-2 text-[15px] md:text-[18px] font-bold text-[#394C97] cursor-pointer"
                >
                  <option value="">{s.label}</option>
                  {s.options.map(([l, v]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#394C97" strokeWidth="2.5" aria-hidden><path d="M5 9l7 7 7-7" /></svg>
              </label>
            ))}
            {values.some(Boolean) && (
              <button onClick={() => setValues(selects.map(() => ''))} className="text-[15px] underline">Clear</button>
            )}
          </div>
        </div>
      )}
      {between}
      <section className="max-w-[1280px] mx-auto px-3 md:px-4 py-4 md:py-6">
        {shown.length === 0 ? (
          <p className="py-16 text-center text-[18px] text-[#394C97]">No products match these filters.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {shown.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  )
}
