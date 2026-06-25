import { getAllProducts } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Shop All Products — SuperMouth',
  description: 'Browse nearly 200 groundbreaking oral care products designed for all ages, from babies to adults.',
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
  let error = false

  try {
    products = await getAllProducts(200)
  } catch (e) {
    error = true
  }

  // Filter by product type if selected
  const activeType = searchParams.type || ''
  const filtered = activeType
    ? products.filter(p => p.productType === activeType)
    : products

  // Sort
  const sort = searchParams.sort || 'default'
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
    if (sort === 'price-desc') return parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
    if (sort === 'title') return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <>
      {/* Header */}
      <section className="bg-sm-dark border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">SuperMouth Store</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Shop All Products</h1>
          <p className="text-sm-gray text-sm max-w-xl">
            Nearly 200 groundbreaking oral care products designed for every age and stage — from babies to adults.
          </p>
          <div className="flex items-center gap-6 mt-4 text-xs text-sm-gray">
            <span>★★★★★ <strong className="text-white">4.8/5</strong> — 10,000+ reviews</span>
            <span>500,000+ orders shipped</span>
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter + Sort bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <a
                key={f.value}
                href={f.value ? `/shop-all?type=${encodeURIComponent(f.value)}${sort !== 'default' ? `&sort=${sort}` : ''}` : '/shop-all'}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  activeType === f.value
                    ? 'bg-sm-accent text-sm-navy border-sm-accent'
                    : 'border-white/20 text-sm-gray hover:border-sm-accent hover:text-sm-accent'
                }`}
              >
                {f.label}
              </a>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-sm-gray">Sort:</span>
            <select
              defaultValue={sort}
              onChange={e => {
                const url = new URL(window.location.href)
                url.searchParams.set('sort', e.target.value)
                window.location.href = url.toString()
              }}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sm-accent cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="title">A–Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm-gray text-xs mb-6">
          {sorted.length} product{sorted.length !== 1 ? 's' : ''}
          {activeType ? ` in ${activeType}` : ''}
        </p>

        {/* Error state */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center mb-8">
            <p className="text-red-400 text-sm">Unable to load products. Please check your Shopify connection.</p>
          </div>
        )}

        {/* Empty state */}
        {!error && sorted.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🦷</div>
            <h3 className="font-display font-bold text-xl mb-2">No products found</h3>
            <p className="text-sm-gray text-sm mb-6">
              {activeType
                ? `No products in "${activeType}" yet. Try another category or check back soon.`
                : 'No products have been added to this store yet.'}
            </p>
            <a href="/shop-all" className="text-sm-accent text-sm hover:underline">View all products →</a>
          </div>
        )}

        {/* Product grid */}
        {sorted.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sorted.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
