import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

export const metadata = {
  title: 'Bundle & Save — SuperMouth',
  description: 'Upgrade your oral care and save up to 15%! Curated bundles with dentist-backed formulations, delicious flavors, and clean safe ingredients.',
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

      {/* Hero — two-column layout matching original: text left, image right */}
      <section className="bg-sm-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-0 items-center min-h-[200px]">
            {/* Left — text */}
            <div className="py-10 pr-6">
              <h1 className="font-display font-black text-3xl md:text-4xl text-white mb-4">Bundle & Save</h1>
              <p className="text-white/90 text-sm leading-relaxed">
                Upgrade your oral care and save up to 15%! Our curated bundles blend{' '}
                <strong>dentist-backed formulations</strong>,{' '}
                <strong>delicious flavors</strong>, and{' '}
                <strong>clean, safe ingredients</strong> — perfect for{' '}
                <strong>first-timers</strong>,{' '}
                <strong>gifts</strong>, or anyone craving a fresh routine.
              </p>
            </div>
            {/* Right — product image */}
            <div className="hidden md:flex justify-end items-end h-full">
              <Image
                src="https://cdn.supermouth.com/website/SM-website%202.0-%20bundles%20page-header%20image%20mobile%20400x400-v2.jpg"
                alt="Bundle & Save"
                width={400}
                height={400}
                className="h-full w-auto object-contain max-h-56"
              />
            </div>
          </div>
        </div>
        {/* Mobile — show image below text */}
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/SM-website%202.0-%20bundles%20page-header%20image%20mobile%20400x400-v2.jpg"
            alt="Bundle & Save"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      {/* Bundled Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display font-black text-2xl text-center mb-2 text-sm-navy">Bundled Products</h2>
        <p className="text-sm-teal text-sm font-semibold text-center mb-8">Keep Every MouthCare Essential Neat, Clean, and Ready to Use</p>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
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

      {/* Social proof video section — placeholder for social embed */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-xl mb-2 text-sm-navy">See SuperMouth in Action</h2>
          <p className="text-sm-gray text-sm mb-8">Real people, real results — from our community on TikTok & Instagram</p>

          {/* Video cards — links to social content */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { title: 'Toothpaste For Every Stage', handle: '@mysupermouth', platform: 'TikTok', bg: 'bg-sm-teal-bg' },
              { title: 'Power Clean for Braces', handle: '@mysupermouth', platform: 'TikTok', bg: 'bg-sm-peach' },
              { title: 'SuperMouth Flavor Splash', handle: '@mysupermouth', platform: 'TikTok', bg: 'bg-yellow-100' },
              { title: 'SuperMouth Rinse Revolution', handle: '@mysupermouth', platform: 'TikTok', bg: 'bg-purple-100' },
              { title: 'What if Toothpaste Tastes Like Ice Cream', handle: '@mysupermouth', platform: 'TikTok', bg: 'bg-blue-100' },
            ].map(video => (
              <a
                key={video.title}
                href="https://www.tiktok.com/@mysupermouth"
                target="_blank"
                rel="noopener noreferrer"
                className={`${video.bg} rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow`}
              >
                <div className="relative h-40 flex items-center justify-center">
                  {/* Play button */}
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sm-navy ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="absolute top-2 right-2 text-xs font-bold text-sm-navy bg-white/80 px-2 py-0.5 rounded-full">{video.platform}</span>
                </div>
                <div className="p-3 bg-sm-navy">
                  <p className="text-white text-xs font-bold leading-snug">{video.title}</p>
                  <p className="text-white/50 text-xs mt-1">{video.handle}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-sm-gray mt-4 text-center">
            Follow us{' '}
            <a href="https://www.tiktok.com/@mysupermouth" target="_blank" rel="noopener noreferrer" className="text-sm-teal hover:underline font-semibold">@mysupermouth</a>
            {' '}for more
          </p>
        </div>
      </section>

      {/* Bundle for the whole family — image + text side by side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full rounded-2xl overflow-hidden">
            <Image
              src="/cdn/video-still.jpg"
              alt="Bundle for the whole family"
              width={800}
              height={450}
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
          <div>
            <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">Bundle for the Whole Family</h2>
            <p className="text-sm-gray text-sm leading-relaxed mb-6">
              From toddlers to teens to adults, SuperMouth has a <strong className="text-sm-navy">smile-friendly solution</strong> for everyone. Each bundle targets specific oral care needs — whether you want <strong className="text-sm-navy">fluoride protection</strong>, <strong className="text-sm-navy">nano-hydroxyapatite support</strong>, or a complete routine for <strong className="text-sm-navy">orthodontic care</strong>. It's all about making healthy habits easier and more enjoyable, so you can keep the whole family grinning from ear to ear.
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
      </section>

      <Footer />
    </div>
  )
}
