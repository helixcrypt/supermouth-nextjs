import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Shop All Bundles — SuperMouth',
  description: 'Stock up and save 15% with SuperMouth bundles — curated sets for every age, stage, and routine.',
}

export default async function BundlesPage() {
  let products: any[] = []

  try {
    const collection = await getCollectionByHandle('bundles', 50)
    if (collection?.products?.edges) {
      products = collection.products.edges.map((e: any) => e.node)
    }
  } catch (e) {
    // fall through
  }

  const bundleHighlights = [
    { icon: '💰', title: 'Save 15%', desc: 'Every bundle saves you 15% vs buying items separately.' },
    { icon: '📦', title: 'Everything Included', desc: 'Complete routines in one box — no guesswork.' },
    { icon: '🎁', title: 'Perfect Gifts', desc: 'Beautifully packaged, ready to give.' },
    { icon: '🔄', title: 'Subscribe & Save More', desc: 'Add a subscription for an additional recurring discount.' },
  ]

  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">New!</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Bundle & Save</h1>
          <p className="text-sm-gray text-sm max-w-xl">
            Whether you're new to SuperMouth or a longtime fan, our curated bundles let you stock up on favorites and save 15% — perfect for building or upgrading your routine.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {bundleHighlights.map(h => (
              <div key={h.title} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{h.icon}</div>
                <h3 className="font-bold text-sm mb-1">{h.title}</h3>
                <p className="text-xs text-sm-gray">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="font-display font-bold text-xl mb-2">Bundles coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">We're putting together incredible bundles. Browse all products in the meantime.</p>
            <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
