import { getAllProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Shop All Products — SuperMouth',
  description: 'Shop all SuperMouth products. Find toothbrushes, toothpaste, mouthwash, mouthspray, floss, tongue scrapers, and essential accessories.',
}

const FILTERS = [
  { label: 'All', value: '' },
  { label: 'Toothpaste', value: 'Toothpaste' },
  { label: 'Mouthwash', value: 'Mouthwash' },
  { label: 'Toothbrushes', value: 'Toothbrushes' },
  { label: 'Floss', value: 'Floss' },
  { label: 'Mouth Spray', value: 'Mouth Spray' },
  { label: 'Tongue Scrapers', value: 'Tongue Scrapers' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Bundles', value: 'Bundles' },
]

export default async function ShopAllPage({
  searchParams,
}: {
  searchParams: { type?: string; sort?: string }
}) {
  let products: any[] = []
  try {
    products = await getAllProducts(200)
  } catch (e) {
    console.error('Shop All fetch error:', e)
  }

  const activeType = searchParams?.type || ''
  const sort = searchParams?.sort || 'default'

  const filtered = activeType
    ? products.filter((p: any) => p.productType === activeType)
    : products

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sort === 'price-asc') return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
    if (sort === 'price-desc') return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
    if (sort === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero — exact images from original */}
      <section className="relative w-full">
        <div className="hidden md:block w-full">
          <Image
            src="/cdn/header-shop.jpg"
            alt="Shop All Products"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/SM-website_2.0-shop_products_page-header_image_mobile_400x400.jpg"
            alt="Shop All Products"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg mb-2">Your Ultimate Oral Care Destination</h1>
          <p className="text-white/80 text-sm drop-shadow">World-class solutions for every age and stage — crafted to perfection</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(f => (
            <Link
              key={f.value}
              href={f.value ? `/shop-all?type=${encodeURIComponent(f.value)}` : '/shop-all'}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                activeType === f.value
                  ? 'bg-sm-navy text-white border-sm-navy'
                  : 'border-sm-navy/20 text-sm-navy hover:border-sm-navy hover:bg-white'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Sort links */}
        <div className="flex items-center gap-3 mb-6 text-xs">
          <span className="text-sm-gray font-semibold">Sort:</span>
          {[
            { label: 'Featured', value: 'default' },
            { label: 'A–Z', value: 'title' },
            { label: 'Price ↑', value: 'price-asc' },
            { label: 'Price ↓', value: 'price-desc' },
          ].map(s => (
            <Link
              key={s.value}
              href={`/shop-all?${activeType ? `type=${encodeURIComponent(activeType)}&` : ''}sort=${s.value}`}
              className={`px-3 py-1.5 rounded-full border text-xs transition-all ${
                sort === s.value
                  ? 'border-sm-navy bg-sm-navy text-white'
                  : 'border-sm-navy/20 text-sm-gray hover:text-sm-navy'
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <p className="text-sm-gray text-xs mb-6">
          {sorted.length} product{sorted.length !== 1 ? 's' : ''}{activeType ? ` in ${activeType}` : ''}
        </p>

        {sorted.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">🦷</div>
            <h3 className="font-display font-bold text-xl mb-2 text-sm-navy">Products coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">We're adding products to the store. Check back shortly.</p>
            <Link href="/systems-overview" className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop Systems →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sorted.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
