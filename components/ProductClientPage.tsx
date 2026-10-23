'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Gallery from '@/components/product/Gallery'
import LeftBlocks from '@/components/product/LeftBlocks'
import MoreText from '@/components/product/MoreText'
import { BLUE, CORAL, TEAL, SCRIPT, Stars } from '@/components/product/ui'
import type { ProductHeader } from '@/lib/product-content'

type Money = { amount: string; currencyCode: string }
export interface Variant {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  compareAtPrice: Money | null
  selectedOptions: { name: string; value: string }[]
  image: { url: string; altText: string | null } | null
}
export interface ProductDetail {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  options: { name: string; values: string[] }[]
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: Variant }[] }
}

const fmt = (n: number) => `$${n.toFixed(2)}`

const SWATCH: Record<string, string> = {
  'pearly white': '#F7F7F5', 'sapphire blue': '#2F4A99', 'rose gold': '#E7C2B6', white: '#F7F7F5', blue: '#2F4A99', pink: '#F4B7C5',
}

export default function ProductClientPage({ product, header, reviewCount }: { product: ProductDetail; header: ProductHeader | null; reviewCount: number | null }) {
  const { addItem, isLoading } = useCart()
  const images = product.images.edges.map(e => e.node)
  const variants = product.variants.edges.map(e => e.node)
  const options = product.options.filter(o => !(o.values.length === 1 && o.values[0] === 'Default Title'))

  const firstAvailable = variants.find(v => v.availableForSale) ?? variants[0]
  const [sel, setSel] = useState<Record<string, string>>(Object.fromEntries(firstAvailable?.selectedOptions.map(o => [o.name, o.value]) ?? []))
  const variant = useMemo(() => variants.find(v => v.selectedOptions.every(o => sel[o.name] === o.value)) ?? firstAvailable, [sel, variants, firstAvailable])

  const choose = (name: string, value: string) => {
    const next = { ...sel, [name]: value }
    if (!variants.some(v => v.selectedOptions.every(o => next[o.name] === o.value))) {
      // fall back to any variant with this value, keeping as many other picks as possible
      const alt = variants.find(v => v.selectedOptions.some(o => o.name === name && o.value === value))
      if (alt) { setSel(Object.fromEntries(alt.selectedOptions.map(o => [o.name, o.value]))); return }
    }
    setSel(next)
  }
  const priceFor = (name: string, value: string) => {
    const v = variants.find(x => x.selectedOptions.every(o => (o.name === name ? value : sel[o.name]) === o.value))
    return v ? parseFloat(v.price.amount) : null
  }

  const price = variant ? parseFloat(variant.price.amount) : 0
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null
  const min = parseFloat(product.priceRange.minVariantPrice.amount)
  const max = parseFloat(product.priceRange.maxVariantPrice.amount)
  const cards = header?.optionCards ?? []
  const cardOption = cards.length ? options.find(o => o.values.some(v => cards.some(c => c.value === v))) : undefined
  const colorOption = options.find(o => /colou?r/i.test(o.name) && o.values.every(v => SWATCH[v.toLowerCase()]))
  const otherOptions = options.filter(o => o !== cardOption && o !== colorOption)
  const available = !!variant?.availableForSale
  const add = () => variant && addItem(variant.id)
  const title = header?.productTitle || product.title
  const desc = header?.shortDesc || product.description?.split('\n')[0] || ''

  return (
    <section className="max-w-[1248px] mx-auto px-4 pt-8 md:pt-12 pb-6" style={{ color: BLUE }}>
      <div className="grid lg:grid-cols-[464px_1fr] gap-8 lg:gap-[72px]">
        {/* LEFT: gallery + guarantee */}
        <div className="min-w-0 lg:pl-0">
          <Gallery images={images} title={title} focusUrl={variant?.image?.url} />
          <div className="hidden lg:block"><LeftBlocks blocks={header?.left ?? []} /></div>
        </div>

        {/* RIGHT: info + purchase */}
        <div className="min-w-0">
          {header?.familyTitle && <p className="text-[26px] md:text-[30px] leading-9 font-medium">{header.familyTitle}</p>}
          {header && header.family.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {header.family.map(f => {
                const active = f.href === `/products/${product.handle}`
                return (
                  <Link key={f.href} href={f.href} className={`min-w-[120px] rounded-md border-2 border-[#394C97] px-4 py-1 text-center text-[15px] ${active ? 'bg-[#394C97] text-white' : 'hover:bg-[#394C97]/10'}`}>{f.label}</Link>
                )
              })}
            </div>
          )}
          <h1 className="mt-4 text-[26px] md:text-[30px] leading-9 font-medium">{title}</h1>
          {reviewCount ? (
            <a href="#product-reviews" className="mt-1 inline-flex items-center gap-1 text-[13px]"><Stars size={22} /> ({reviewCount})</a>
          ) : null}
          {header && header.awards.length > 0 && (
            <div className="mt-2 text-[12px]">
              <p className="font-medium tracking-wide" style={{ color: TEAL }}>AWARD WINNER</p>
              {header.awards.map(a => (
                <p key={a.pub + a.title} className="mt-0.5"><span aria-hidden>🏆</span> <span style={{ color: TEAL }}>{a.pub}:</span> <span className="ml-1 font-medium">{a.title}</span></p>
              ))}
            </div>
          )}
          <p className="mt-4 text-[22px] font-semibold">
            {cardOption && min !== max ? <>{fmt(min)} — {fmt(max)}</> : <>{fmt(price)}{compareAt !== null && compareAt > price ? <span className="ml-3 text-[18px] line-through" style={{ color: CORAL }}>{fmt(compareAt)}</span> : null}</>}
          </p>
          {desc && <p className="mt-5 text-[18px] leading-7">{desc}</p>}

          {(header?.superHtml || (!header && product.descriptionHtml)) && (
            <div className="mt-6 border-t border-[#394C97]/60 pt-4">
              <p className="text-center text-[24px]" style={{ ...SCRIPT, color: CORAL }}>What Makes It Super?</p>
              <div className="mt-2"><MoreText html={header?.superHtml || product.descriptionHtml} /></div>
            </div>
          )}

          <div className="mt-6 border-t border-[#394C97]/60 pt-5 space-y-6">
            {colorOption && (
              <div>
                <p className="text-[17px] font-medium">Choose Brush {colorOption.name}</p>
                <div className="mt-4 flex flex-wrap justify-between gap-4">
                  {colorOption.values.map(v => (
                    <button key={v} onClick={() => choose(colorOption.name, v)} className="flex items-center gap-3 text-[15px]" aria-pressed={sel[colorOption.name] === v}>
                      <span className={`grid h-8 w-8 place-items-center rounded-full ${sel[colorOption.name] === v ? 'ring-2 ring-[#394C97] ring-offset-2' : ''}`}>
                        <span className="h-6 w-6 rounded-full border border-[#394C97]/30" style={{ background: SWATCH[v.toLowerCase()] }} />
                      </span>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {cardOption && (
              <div className="space-y-3" role="radiogroup" aria-label={cardOption.name}>
                {cardOption.values.map(v => {
                  const c = cards.find(x => x.value === v)
                  const on = sel[cardOption.name] === v
                  const p = priceFor(cardOption.name, v)
                  const vImg = variants.find(x => x.selectedOptions.every(o => (o.name === cardOption.name ? v : sel[o.name]) === o.value))?.image?.url || c?.img
                  return (
                    <button key={v} role="radio" aria-checked={on} onClick={() => choose(cardOption.name, v)} className={`flex w-full items-center gap-4 rounded-lg border bg-white px-5 py-4 text-left ${on ? 'border-2 border-[#394C97]' : 'border-[#394C97]/20'}`}>
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${on ? 'border-[#394C97]' : 'border-[#394C97]/40'}`}>{on && <span className="h-3.5 w-3.5 rounded-full bg-[#394C97]" />}</span>
                      <span className="flex-1">
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-[17px] leading-6">{v}</span>
                          <span className="text-right shrink-0"><span className="block text-[16px] font-semibold">{p !== null ? fmt(p) : ''}</span>{c?.save && <span className="block text-[12px]" style={{ color: TEAL }}>{c.save}</span>}</span>
                        </span>
                        {c?.desc && <span className="mt-2 block text-center text-[13px] leading-5">{c.desc}</span>}
                      </span>
                      {vImg && <Image src={vImg} alt="" width={56} height={56} className="hidden sm:block h-14 w-14 object-contain" />}
                    </button>
                  )
                })}
              </div>
            )}

            {otherOptions.map(o => (
              <div key={o.name}>
                <label htmlFor={`opt-${o.name}`} className="text-[17px] font-medium">Choose Your {o.name}</label>
                <div className="mt-2 flex items-center gap-3">
                  {variant?.image?.url && <Image src={variant.image.url} alt="" width={40} height={40} className="h-10 w-10 object-contain" />}
                  <select id={`opt-${o.name}`} value={sel[o.name]} onChange={e => choose(o.name, e.target.value)} className="flex-1 rounded-md border border-[#394C97] bg-white px-3 py-2.5 text-[16px]" style={{ color: BLUE }}>
                    {o.values.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            ))}

            {cardOption ? (
              <div className="text-center">
                <button onClick={add} disabled={!available || isLoading} className="rounded-lg bg-[#FFE920] px-12 py-4 text-[18px] font-medium disabled:opacity-40">
                  {!available ? 'Sold Out' : isLoading ? 'Adding…' : `Add to cart now - ${fmt(price)}`}
                </button>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-[#394C97] px-6 py-5 shadow-[0_4px_12px_rgba(57,76,151,0.15)]">
                <p className="text-center text-[22px] font-medium">Purchase Options</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#394C97]"><span className="h-3.5 w-3.5 rounded-full bg-[#394C97]" /></span>
                  <span className="flex-1 text-[18px] font-medium">One-Time Purchase</span>
                  <span className="text-[20px] font-semibold">{fmt(price)}</span>
                </div>
                <p className="mt-3 text-center text-[13px]">Want to save more? <Link href="/subscription-benefits" className="underline">See subscription benefits</Link></p>
                <div className="mt-4 text-center">
                  <button onClick={add} disabled={!available || isLoading} className="rounded-lg bg-[#FFE920] px-10 py-3 text-[17px] font-medium disabled:opacity-40">
                    {!available ? 'Sold Out' : isLoading ? 'Adding…' : 'Add to cart'}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:hidden"><LeftBlocks blocks={header?.left ?? []} /></div>
        </div>
      </div>
    </section>
  )
}
