import { getProductByHandle, getAllProducts } from '@/lib/shopify'
import AddToCartButton from '@/components/AddToCartButton'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const products = await getAllProducts(200)
    return products.map((p: any) => ({ handle: p.handle }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  try {
    const product = await getProductByHandle(params.handle)
    if (!product) return {}
    return {
      title: `${product.title} — SuperMouth`,
      description: product.description?.slice(0, 160),
    }
  } catch {
    return {}
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  let product: any = null

  try {
    product = await getProductByHandle(params.handle)
  } catch (e) {
    notFound()
  }

  if (!product) notFound()

  const images = product.images.edges.map((e: any) => e.node)
  const variants = product.variants.edges.map((e: any) => e.node)
  const mainImage = images[0]
  const price = parseFloat(variants[0]?.price?.amount ?? '0')
  const compareAt = variants[0]?.compareAtPrice ? parseFloat(variants[0].compareAtPrice.amount) : null
  const discount = compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : null

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-sm-gray mb-8 flex gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop-all" className="hover:text-white transition-colors">Shop All</Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            {mainImage && (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5">
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  className="object-cover"
                  priority
                />
                {discount && (
                  <span className="absolute top-4 left-4 bg-sm-green text-sm-navy text-xs font-bold px-3 py-1 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </div>
            )}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(1, 5).map((img: any, i: number) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                    <Image src={img.url} alt={img.altText ?? product.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.vendor && (
              <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">{product.vendor}</p>
            )}
            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-4">{product.title}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-bold text-2xl text-sm-accent">${price.toFixed(2)}</span>
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

            {/* Variants */}
            {variants.length > 1 && (
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-sm-gray mb-2">Options</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v: any) => (
                    <span
                      key={v.id}
                      className={`px-3 py-2 rounded-lg text-xs border font-medium ${
                        v.availableForSale
                          ? 'border-white/20 hover:border-sm-accent cursor-pointer'
                          : 'border-white/10 text-sm-gray/40 line-through cursor-not-allowed'
                      }`}
                    >
                      {v.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <AddToCartButton
              variantId={variants[0]?.id}
              available={variants[0]?.availableForSale}
            />

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: '🔒', label: '30-Day Money-Back Guarantee' },
                { icon: '🚚', label: 'Free shipping over $50' },
                { icon: '⭐', label: 'EWG #1 Safety Rating' },
              ].map(item => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <p className="text-xs text-sm-gray leading-tight">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.descriptionHtml && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h2 className="font-display font-bold text-lg mb-4">About This Product</h2>
                <div
                  className="prose prose-invert prose-sm max-w-none text-sm-gray leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span key={tag} className="text-xs text-sm-gray border border-white/10 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
