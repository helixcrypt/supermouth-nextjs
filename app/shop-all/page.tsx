import { getAllProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Shop All Products — SuperMouth',
  description: 'Browse nearly 200 groundbreaking oral care products designed for all ages.',
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
    <>
      <section className="bg-sm-dark border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">SuperMouth Store</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Shop All Products</h1>
          <p className="text-sm-gray text-sm max-w-xl">
            Groundbreaking oral care products designed for every age and stage.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-sm-gray">
            <span>★★★★★ <strong className="text-white">4.8/5</strong> — 10,000+ reviews</span>
            <span>500,000+ orders shipped</span>
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(f => (
            <Link
              key={f.value}
              href={f.value ? `/shop-all?type=${encodeURIComponent(f.value)}` : '/shop-all'}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                activeType === f.value
                  ? 'bg-sm-accent text-sm-navy border-sm-accent'
                  : 'border-white/20 text-sm-gray hover:border-sm-accent hover:text-sm-accent'
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Sort links */}
        <div className="flex items-center gap-3 mb-6 text-xs">
          <span className="text-sm-gray">Sort:</span>
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
                  ? 'border-sm-accent text-sm-accent'
                  : 'border-white/10 text-sm-gray hover:text-white'
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
          <div className="text-center py-20 bg-white/5 rounded-2xl">
            <div className="text-5xl mb-4">🦷</div>
            <h3 className="font-display font-bold text-xl mb-2">Products coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">We're adding products to the store. Check back shortly.</p>
            <Link href="/systems-overview" className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
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
    </>
  )
}
