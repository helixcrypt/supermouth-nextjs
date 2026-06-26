import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Bundle & Save — SuperMouth',
  description: 'Upgrade your oral care and save up to 15%! Curated bundles with dentist-backed formulations.',
}

export default async function BundlesPage() {
  let products: any[] = []
  try {
    const collection = await getCollectionByHandle('bundles', 50)
    if (collection?.products?.edges) {
      products = collection.products.edges.map((e: any) => e.node)
    }
  } catch (e) {}

  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero — desktop + mobile */}
      <section className="relative w-full">
        <div className="hidden md:block w-full">
          <Image
            src="https://cdn.supermouth.com/website/Bundle_Banner.jpg"
            alt="Bundle & Save"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/SM-website%202.0-%20bundles%20page-header%20image%20mobile%20400x400-v2.jpg"
            alt="Bundle & Save"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-display font-black text-4xl md:text-5xl mb-4 text-sm-navy">Bundle & Save</h1>
        <p className="text-sm-gray text-sm max-w-2xl leading-relaxed mb-10">
          Upgrade your oral care and save up to 15%! Our curated bundles blend <strong>dentist-backed formulations</strong>, <strong>delicious flavors</strong>, and <strong>clean, safe ingredients</strong> — perfect for <strong>first-timers</strong>, <strong>gifts</strong>, or anyone craving a fresh routine.
        </p>

        <h2 className="font-display font-bold text-xl mb-6 text-sm-navy">Bundled Products</h2>
        <p className="text-sm-gray text-sm mb-8">Keep Every MouthCare Essential Neat, Clean, and Ready to Use</p>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="font-display font-bold text-xl mb-2 text-sm-navy">Bundles coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">We're putting together incredible bundles. Browse all products in the meantime.</p>
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Bundle for the whole family — video thumbnail section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full rounded-2xl overflow-hidden">
              <Image
                src="https://cdn.supermouth.com/videos/SupermouthAnchor_Final_4kWEB.00_02_35_12.Still006.jpg"
                alt="Bundle for the whole family"
                width={800}
                height={450}
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
            <div>
              <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">Bundle for the Whole Family</h2>
              <p className="text-sm-gray text-sm leading-relaxed mb-6">
                From toddlers to teens to adults, SuperMouth has a <strong>smile-friendly solution</strong> for everyone. Each bundle targets specific oral care needs — whether you want <strong>fluoride protection</strong>, <strong>nano-hydroxyapatite support</strong>, or a complete routine for <strong>orthodontic care</strong>. It's all about making healthy habits easier and more enjoyable, so you can keep the whole family grinning from ear to ear.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
                  Shop All Products →
                </Link>
                <Link href="/systems-overview" className="bg-sm-purple text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
                  Shop Systems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
