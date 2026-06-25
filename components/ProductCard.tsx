'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

interface Product {
  id: string
  title: string
  handle: string
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: { id: string; availableForSale: boolean; price: { amount: string } } }[] }
  tags: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, isLoading } = useCart()
  const image = product.images.edges[0]?.node
  const variant = product.variants.edges[0]?.node
  const price = parseFloat(product.priceRange.minVariantPrice.amount)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!variant?.availableForSale) return
    await addItem(variant.id)
  }

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sm-accent/10">
        {/* Image */}
        <div className="relative aspect-square bg-white/10 overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm-gray">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          )}
          {product.tags.includes('new') && (
            <span className="absolute top-3 left-3 bg-sm-green text-sm-navy text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-sm-accent transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <p className="font-bold text-sm-accent">${price.toFixed(2)}</p>
            <button
              onClick={handleAddToCart}
              disabled={!variant?.availableForSale || isLoading}
              className="bg-sm-accent text-sm-navy text-xs font-bold px-3 py-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {!variant?.availableForSale ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
