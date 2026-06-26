'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AddToCartButton from '@/components/AddToCartButton'

interface Variant {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string; currencyCode: string }
  compareAtPrice: { amount: string; currencyCode: string } | null
  selectedOptions: { name: string; value: string }[]
}

interface Product {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  vendor: string
  tags: string[]
  productType: string
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: Variant }[] }
}

export default function ProductClientPage({ product }: { product: Product }) {
  const images = product.images.edges.map(e => e.node)
  const variants = product.variants.edges.map(e => e.node)

  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0])
  const [selectedImage, setSelectedImage] = useState(0)

  // Build option groups from variants
  const optionNames = Array.from(
    new Set(variants.flatMap(v => v.selectedOptions.map(o => o.name)))
  )

  // Track selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries(variants[0]?.selectedOptions.map(o => [o.name, o.value]) ?? [])
  )

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)

    // Find matching variant
    const match = variants.find(v =>
      v.selectedOptions.every(o => newOptions[o.name] === o.value)
    )
    if (match) setSelectedVariant(match)
  }

  // Get all values for an option
  const getOptionValues = (optionName: string) =>
    Array.from(new Set(variants.map(v =>
      v.selectedOptions.find(o => o.name === optionName)?.value ?? ''
    ).filter(Boolean)))

  // Check if a specific option value is available (has an available variant)
  const isOptionAvailable = (optionName: string, value: string) => {
    return variants.some(v =>
      v.availableForSale &&
      v.selectedOptions.find(o => o.name === optionName)?.value === value &&
      Object.entries(selectedOptions).every(([name, val]) =>
        name === optionName || v.selectedOptions.find(o => o.name === name)?.value === val
      )
    )
  }

  const price = parseFloat(selectedVariant?.price?.amount ?? '0')
  const compareAt = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : null
  const discount = compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : null
  const mainImage = images[selectedImage] ?? images[0]

  return (
    <div className="bg-sm-bg text-sm-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-sm-gray mb-8 flex gap-2">
          <Link href="/" className="hover:text-sm-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop-all" className="hover:text-sm-navy transition-colors">Shop All</Link>
          <span>/</span>
          <span className="text-sm-navy font-semibold">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
              {mainImage && (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  className="object-contain p-4"
                  priority
                />
              )}
              {discount && (
                <span className="absolute top-4 left-4 bg-sm-green text-white text-xs font-bold px-3 py-1 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white border-2 transition-all ${
                      selectedImage === i ? 'border-sm-teal' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <Image src={img.url} alt={img.altText ?? product.title} fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.vendor && (
              <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-2">{product.vendor}</p>
            )}
            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-4 text-sm-navy">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-black text-2xl text-sm-navy">${price.toFixed(2)}</span>
              {compareAt && (
                <span className="text-sm-gray line-through text-lg">${compareAt.toFixed(2)}</span>
              )}
              {discount && (
                <span className="bg-sm-green/20 text-sm-green text-xs font-bold px-2 py-1 rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm text-sm-gray">4.8/5 — 10,000+ reviews</span>
            </div>

            {/* Variant selectors */}
            {optionNames.map(optionName => {
              // Skip "Title" — it's the default single-variant placeholder
              if (optionName === 'Title') return null
              const values = getOptionValues(optionName)
              return (
                <div key={optionName} className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-2">
                    {optionName}:{' '}
                    <span className="text-sm-navy normal-case font-semibold tracking-normal">
                      {selectedOptions[optionName]}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {values.map(value => {
                      const isSelected = selectedOptions[optionName] === value
                      const available = isOptionAvailable(optionName, value)
                      return (
                        <button
                          key={value}
                          onClick={() => available && handleOptionChange(optionName, value)}
                          disabled={!available}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                            isSelected
                              ? 'border-sm-navy bg-sm-navy text-white'
                              : available
                              ? 'border-gray-200 text-sm-navy hover:border-sm-navy bg-white'
                              : 'border-gray-100 text-gray-300 line-through cursor-not-allowed bg-gray-50'
                          }`}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Availability */}
            <p className={`text-xs font-semibold mb-4 ${selectedVariant?.availableForSale ? 'text-sm-green' : 'text-red-500'}`}>
              {selectedVariant?.availableForSale ? '✓ In Stock' : '✗ Out of Stock'}
            </p>

            {/* Add to cart */}
            <AddToCartButton
              variantId={selectedVariant?.id}
              available={selectedVariant?.availableForSale ?? false}
            />

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: '🔒', label: '30-Day Money-Back Guarantee' },
                { icon: '🚚', label: 'Free shipping over $50' },
                { icon: '⭐', label: 'EWG #1 Safety Rating' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <p className="text-xs text-sm-gray leading-tight">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.descriptionHtml && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="font-display font-bold text-lg mb-4 text-sm-navy">About This Product</h2>
                <div
                  className="prose prose-sm max-w-none text-sm-gray leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs text-sm-gray border border-gray-200 px-2 py-1 rounded-full bg-white">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
