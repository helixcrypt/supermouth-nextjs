'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ratingFor, Stars, Trophy, BLUE, NAVY } from '@/components/shop/ui'

type Money = { amount: string; currencyCode?: string }
interface Product {
  id: string
  title: string
  handle: string
  priceRange: { minVariantPrice: Money; maxVariantPrice?: Money }
  compareAtPriceRange?: { maxVariantPrice: Money }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: { id: string; availableForSale: boolean; price: { amount: string } } }[] }
  tags: string[]
}

const fmt = (n: number) => `$${n.toFixed(2)}`

/** Product card matching supermouth.com: optional award header, image, title, stars, price range. */
export default function ProductCard({ product }: { product: Product }) {
  const { addItem, isLoading } = useCart()

  const image = product.images.edges[0]?.node
  const variants = product.variants.edges.map(e => e.node)
  const firstVariant = variants[0]
  const multi = variants.length > 1
  const min = parseFloat(product.priceRange.minVariantPrice.amount)
  const max = product.priceRange.maxVariantPrice ? parseFloat(product.priceRange.maxVariantPrice.amount) : min
  const compare = product.compareAtPriceRange ? parseFloat(product.compareAtPriceRange.maxVariantPrice.amount) : 0
  const onSale = compare > max && min === max
  const isAvailable = variants.some(v => v.availableForSale)
  const r = ratingFor(product.title)

  const add = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!firstVariant?.availableForSale || multi) return
    await addItem(firstVariant.id)
  }

  return (
    <Link href={`/products/${product.handle}`} className="group flex flex-col h-full bg-white rounded-lg border border-[#E2E5EF] shadow-[0_2px_8px_rgba(57,76,151,0.08)] overflow-hidden hover:shadow-[0_6px_18px_rgba(57,76,151,0.16)] transition-shadow" style={{ color: BLUE }}>
      {r?.award ? (
        <div className="flex h-11 shrink-0">
          <span className="grid place-items-center w-11 bg-[#FBD116]"><Trophy /></span>
          <span className="flex-1 min-w-0 px-3 py-1 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
            <span className="block text-[11px] leading-4 font-semibold text-[#5AC3B2]">AWARD WINNER</span>
            <span className="block text-[12px] leading-4 font-semibold truncate" style={{ color: NAVY }}>{r.award}</span>
          </span>
        </div>
      ) : (
        <div className="h-11 shrink-0" />
      )}

      <div className="relative mx-3 md:mx-4 mt-2 aspect-square">
        {image && (
          <Image src={image.url} alt={image.altText ?? product.title} fill sizes="(min-width:1024px) 260px, 45vw" className="object-contain group-hover:scale-[1.03] transition-transform duration-300" />
        )}
      </div>

      <div className="flex flex-col flex-1 px-3 md:px-4 pt-4 pb-4 text-center">
        <h3 className="text-[15px] md:text-[18px] leading-6 md:leading-7 font-medium line-clamp-3 min-h-[48px] md:min-h-[56px]">{product.title}</h3>
        {r?.reviews ? (
          <p className="mt-1 flex items-center justify-center gap-1 text-[12px]"><Stars size={20} /> ({r.reviews})</p>
        ) : <div className="h-[22px]" />}
        <p className="mt-1 text-[16px] md:text-[18px] leading-7 font-bold">
          {onSale ? (
            <><span className="block text-[14px] font-normal text-gray-400 line-through">{fmt(compare)}</span><span className="text-[#DD7164]">{fmt(min)}</span></>
          ) : max > min ? `${fmt(min)} — ${fmt(max)}` : fmt(min)}
        </p>

        <div className="mt-auto pt-3">
          {!isAvailable ? (
            <span className="block w-full rounded-lg bg-gray-100 py-2 text-[14px] font-bold text-gray-400">Sold Out</span>
          ) : multi ? (
            <span className="block w-full rounded-lg bg-[#FFE920] py-2 text-[14px] font-bold group-hover:opacity-90">Select Options</span>
          ) : (
            <button onClick={add} disabled={isLoading} className="block w-full rounded-lg bg-[#FFE920] py-2 text-[14px] font-bold hover:opacity-90 disabled:opacity-50">
              {isLoading ? 'Adding…' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
