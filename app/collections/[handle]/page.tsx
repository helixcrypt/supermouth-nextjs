import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const COLLECTION_META: Record<string, { title: string; desc: string; hero?: string }> = {
  'shop-all-kids': { title: 'Kids Oral Care', desc: 'Safe, fun, and effective oral care from first teeth to age 12.', hero: 'https://pics.io/public/images/6a161386906ce9ec00be32d3/cdn' },
  'ages-13-and-up': { title: 'Teens & Adults', desc: 'Advanced oral care for confident smiles — complete daily routines.', hero: 'https://pics.io/public/images/6a1613855e27efbdf961ff04/cdn' },
  'ortho': { title: 'Orthodontics', desc: 'Specialized oral care for braces, aligners, and retainers.', hero: 'https://pics.io/public/images/6a1613851c5e702c945fbf64/cdn' },
  'pregnancy': { title: 'Pregnancy & Nursing', desc: 'Safe, gentle oral care through every trimester and beyond.', hero: 'https://pics.io/public/images/6a1613851c5e702c945fbf65/cdn' },
  'mouthbrushes': { title: 'Toothbrushes', desc: 'Patented SuperBristles that remove 30-60X more plaque.' },
  'tongue-scrapers': { title: 'Tongue Scrapers', desc: 'Innovative tongue care for a healthier oral microbiome.' },
  'essential-accessories-1': { title: 'Accessories', desc: 'Everything to complete your oral care routine.' },
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const meta = COLLECTION_META[params.handle]
  return {
    title: `${meta?.title ?? params.handle} — SuperMouth`,
    description: meta?.desc ?? 'Shop SuperMouth oral care products.',
  }
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  let products: any[] = []
  const meta = COLLECTION_META[params.handle]
  let collectionTitle: string = meta?.title ?? params.handle
  let collectionDesc: string = meta?.desc ?? ''
  let hero: string | undefined = meta?.hero

  try {
    const collection = await getCollectionByHandle(params.handle, 100)
    if (collection) {
      if (collection.title) collectionTitle = collection.title
      if (collection.description) collectionDesc = collection.description
      if (collection.image?.url) hero = collection.image.url
      if (collection.products?.edges) {
        products = collection.products.edges.map((e: any) => e.node)
      }
    }
  } catch (e) {
    // fall through to empty state
  }

  return (
    <>
      <section className={`relative border-b border-white/10 py-16 ${hero ? '' : 'bg-sm-dark'}`}>
        {hero && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image src={hero} alt={collectionTitle} fill className="object-cover opacity-20" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-sm-navy/80 to-sm-navy" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-sm-gray mb-6 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop-all" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white">{collectionTitle}</span>
          </nav>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">{collectionTitle}</h1>
          {collectionDesc && <p className="text-sm-gray text-sm max-w-xl">{collectionDesc}</p>}
          <p className="text-xs text-sm-gray mt-4">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl">
            <div className="text-5xl mb-4">🦷</div>
            <h3 className="font-display font-bold text-xl mb-2">Products coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">Browse all products in the meantime.</p>
            <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
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
      </div>
      <Footer />
    </>
  )
}
