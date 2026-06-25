import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const COLLECTION_META: Record<string, { title: string; desc: string; hero?: string }> = {
  'shop-all-kids': { title: 'Kids Oral Care', desc: 'Safe, fun, and effective oral care from first teeth to age 12 — built by pediatric dentists.', hero: 'https://pics.io/public/images/6a161386906ce9ec00be32d3/cdn' },
  'ages-13-and-up': { title: 'Teens & Adults', desc: 'Advanced oral care for confident smiles — complete daily routines for every adult.', hero: 'https://pics.io/public/images/6a1613855e27efbdf961ff04/cdn' },
  'ortho': { title: 'Orthodontics', desc: 'Specialized oral care for braces, aligners, and retainers — protect smiles in transition.', hero: 'https://pics.io/public/images/6a1613851c5e702c945fbf64/cdn' },
  'pregnancy': { title: 'Pregnancy & Nursing', desc: 'Safe, gentle oral care through every trimester and beyond — for you and your baby.', hero: 'https://pics.io/public/images/6a1613851c5e702c945fbf65/cdn' },
  'mouthbrushes': { title: 'Toothbrushes', desc: 'Patented SuperBristles that remove 30–60X more plaque — for every age and stage.' },
  'tongue-scrapers': { title: 'Tongue Scrapers', desc: 'Innovative tongue care for a healthier oral microbiome and fresher breath.' },
  'essential-accessories-1': { title: 'Accessories', desc: 'Everything to complete your oral care routine — UV sanitizers, cases, dispensers and more.' },
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const meta = COLLECTION_META[params.handle]
  return {
    title: `${meta?.title ?? params.handle} — SuperMouth`,
    description: meta?.desc ?? 'Shop SuperMouth oral care products.',
  }
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  let collection: any = null
  let products: any[] = []

  try {
    collection = await getCollectionByHandle(params.handle, 100)
    if (collection?.products?.edges) {
      products = collection.products.edges.map((e: any) => e.node)
    }
  } catch (e) {
    // fall through to empty state
  }

  const meta = COLLECTION_META[params.handle]
  const title = collection?.title ?? meta?.title ?? params.handle
  const desc = collection?.description || meta?.desc ?? ''
  const hero = collection?.image?.url ?? meta?.hero

  return (
    <>
      {/* Header */}
      <section className={`relative border-b border-white/10 py-16 ${hero ? '' : 'bg-sm-dark'}`}>
        {hero && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image src={hero} alt={title} fill className="object-cover opacity-20" />
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
            <span className="text-white">{title}</span>
          </nav>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">{title}</h1>
          {desc && <p className="text-sm-gray text-sm max-w-xl">{desc}</p>}
          <p className="text-xs text-sm-gray mt-4">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl">
            <div className="text-5xl mb-4">🦷</div>
            <h3 className="font-display font-bold text-xl mb-2">Products coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">We're stocking this collection. Browse all products in the meantime.</p>
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
