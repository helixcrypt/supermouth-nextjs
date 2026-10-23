'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Gallery from './Gallery'
import LeftBlocks from './LeftBlocks'
import MoreText from './MoreText'
import Accordion from './Accordion'
import { BLUE, CORAL, TEAL, SCRIPT, Stars } from './ui'
import type { ProductDetail, Variant } from '@/components/ProductClientPage'

export type SystemHeader = {
  familyTitle: string
  sub: string | null
  awards: { pub: string; title: string }[]
  note: string | null
  shortDesc: string | null
  left: { title: string; text: string }[]
  leftLinks: { label: string; href: string }[]
}
export type TierContent = {
  tier: string
  superTitle: string | null
  superText: string | null
  components: { name: string; count: string; icon: string | null; html: string }[]
  tip: string | null
}
/** Shopify products for each tier, without / with fluoride */
export type TierProducts = Record<string, { nf: ProductDetail | null; f: ProductDetail | null }>

const fmt = (n: number) => `$${n.toFixed(2)}`

export default function SystemClientPage({ header, tiers, products, reviewCount }: { header: SystemHeader; tiers: TierContent[]; products: TierProducts; reviewCount: number | null }) {
  const { addItem, isLoading } = useCart()
  const tierNames = tiers.length ? tiers.map(t => t.tier).filter(t => products[t]) : Object.keys(products)
  const [tier, setTier] = useState(tierNames[0])
  const pair = products[tier] ?? { nf: null, f: null }
  const hasChoice = !!(pair.nf && pair.f)
  const [fluoride, setFluoride] = useState(false)
  const product = (fluoride && pair.f) || pair.nf || pair.f
  const content = tiers.find(t => t.tier === tier)

  const variants: Variant[] = product ? product.variants.edges.map(e => e.node) : []
  const options = product ? product.options.filter(o => !(o.values.length === 1 && o.values[0] === 'Default Title')) : []
  const [sel, setSel] = useState<Record<string, string>>({})
  const variant = useMemo(() => variants.find(v => v.selectedOptions.every(o => (sel[o.name] ?? variants[0]?.selectedOptions.find(x => x.name === o.name)?.value) === o.value)) ?? variants[0], [variants, sel])
  const price = variant ? parseFloat(variant.price.amount) : 0
  const images = product ? product.images.edges.map(e => e.node) : []

  return (
    <section className="max-w-[1248px] mx-auto px-4 pt-8 md:pt-12 pb-6" style={{ color: BLUE }}>
      <div className="grid lg:grid-cols-[464px_1fr] gap-8 lg:gap-[72px]">
        <div className="min-w-0">
          <Gallery images={images} title={header.familyTitle} focusUrl={variant?.image?.url} />
          <div className="hidden lg:block"><LeftBlocks blocks={header.left} links={header.leftLinks} /></div>
        </div>

        <div className="min-w-0">
          <h1 className="text-[28px] md:text-[34px] leading-tight font-medium">{header.familyTitle.replace(/^(SuperMouth Systems)\s+/, '$1\n').split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}</h1>
          {header.sub && <p className="mt-1 text-[18px]" style={{ color: TEAL }}>{header.sub}</p>}
          {header.awards.length > 0 && (
            <div className="mt-2 text-[12px]">
              <p className="font-medium tracking-wide" style={{ color: TEAL }}>AWARD WINNER</p>
              {header.awards.map(a => <p key={a.pub} className="mt-0.5"><span aria-hidden>🏆</span> <span style={{ color: TEAL }}>{a.pub}:</span> <span className="ml-1 font-medium">{a.title}</span></p>)}
            </div>
          )}

          {tierNames.length > 1 && (
            <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${tierNames.length}, minmax(0, 1fr))` }}>
              {tierNames.map(t => (
                <button key={t} onClick={() => { setTier(t); setSel({}) }} aria-pressed={t === tier} className={`rounded-md border-2 border-[#394C97] py-2 text-[18px] ${t === tier ? 'bg-[#394C97] text-white' : 'hover:bg-[#394C97]/10'}`}>{t}</button>
              ))}
            </div>
          )}

          {reviewCount ? <a href="#product-reviews" className="mt-3 inline-flex items-center gap-1 text-[13px]"><Stars size={22} /> ({reviewCount})</a> : null}
          <p className="mt-2 text-[26px] font-medium">{fmt(price)}</p>
          {header.note && <p className="mt-1 text-[14px] font-medium" style={{ color: TEAL }}>{header.note}</p>}
          <div className="mt-4"><MoreText text={header.shortDesc} /></div>

          {content && (
            <div className="mt-4">
              {content.superTitle && <p className="text-center text-[24px]" style={{ ...SCRIPT, color: CORAL }}>{content.superTitle}</p>}
              {content.superText && <div className="mt-2 px-1 text-[16px] leading-7 [&_strong]:font-semibold [&_b]:font-semibold" dangerouslySetInnerHTML={{ __html: content.superText }} />}
              {content.components.length > 0 && (
                <div className="mt-4">
                  <Accordion size="md" items={content.components.map(c => ({ title: c.name, sub: c.count, html: c.html }))} icons={content.components.map(c => c.icon)} />
                </div>
              )}
              {content.tip && (
                <div className="mt-4 border-b border-[#394C97]/60 pb-4">
                  <p className="text-center text-[24px]" style={{ ...SCRIPT, color: CORAL }}>Extra Tip</p>
                  <p className="mt-2 px-1 text-[16px] leading-7">{content.tip}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 space-y-5">
            {options.map(o => (
              <div key={o.name}>
                <label htmlFor={`sys-${o.name}`} className="text-[17px] font-medium">Choose your system {o.name.toLowerCase()}</label>
                <select id={`sys-${o.name}`} value={sel[o.name] ?? variant?.selectedOptions.find(x => x.name === o.name)?.value} onChange={e => setSel(s => ({ ...s, [o.name]: e.target.value }))} className="mt-2 w-full rounded-md border border-[#394C97] bg-white px-3 py-2.5 text-[16px]" style={{ color: BLUE }}>
                  {o.values.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            ))}
            {hasChoice && (
              <div className="flex items-center justify-between gap-4 border-b border-[#394C97]/60 pb-4">
                <p className="text-[17px] font-medium">Would you like Fluoride?</p>
                <div className="flex gap-1">
                  {[['No', false], ['Yes', true]].map(([l, v]) => (
                    <button key={l as string} onClick={() => { setFluoride(v as boolean); setSel({}) }} aria-pressed={fluoride === v} className={`rounded-full border border-[#394C97] px-6 py-1.5 text-[14px] ${fluoride === v ? 'bg-[#394C97] text-white' : ''}`}>{l as string}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-lg border-2 border-[#394C97] px-6 py-5 shadow-[0_4px_12px_rgba(57,76,151,0.15)]">
              <p className="text-center text-[22px] font-medium">Purchase Options</p>
              <p className="mt-3 text-center text-[14px] leading-5">Your box is a full 90-day supply — 3 months of care, delivered once.</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#394C97]"><span className="h-3.5 w-3.5 rounded-full bg-[#394C97]" /></span>
                <span className="flex-1 text-[18px] font-medium">One-Time Purchase</span>
                <span className="text-[20px] font-semibold">{fmt(price)}</span>
              </div>
              <p className="mt-3 text-center text-[13px]">Prefer automatic delivery? <Link href="/subscription-benefits" className="underline">See subscription benefits</Link></p>
              <div className="mt-4 text-center">
                <button onClick={() => variant && addItem(variant.id)} disabled={!variant?.availableForSale || isLoading} className="rounded-lg bg-[#FFE920] px-10 py-3 text-[17px] font-medium disabled:opacity-40">
                  {!variant ? 'Unavailable' : !variant.availableForSale ? 'Sold Out' : isLoading ? 'Adding…' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
          <div className="lg:hidden"><LeftBlocks blocks={header.left} links={header.leftLinks} /></div>
        </div>
      </div>
    </section>
  )
}
