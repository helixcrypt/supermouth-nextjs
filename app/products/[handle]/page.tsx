import { getProductDetail, getAllProducts } from '@/lib/shopify'
import { getProductContent, reviewSummary } from '@/lib/product-content'
import ProductClientPage from '@/components/ProductClientPage'
import Sections from '@/components/product/Sections'
import Footer from '@/components/Footer'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const products = await getAllProducts(200)
    return products.map((p: any) => ({ handle: p.handle }))
  } catch {
    return []
  }
}

export async function generateMetadata(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params
  const product = await getProductDetail(decodeURIComponent(params.handle))
  if (!product) return {}
  return {
    title: `${product.title} — SuperMouth`,
    description: product.description?.slice(0, 160),
  }
}

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params
  const handle = decodeURIComponent(params.handle)
  const product = await getProductDetail(handle)
  if (!product) notFound()

  const content = getProductContent(handle)
  // supermouth.com sends some product URLs (system bundles) to their system page
  if (content?.redirect) redirect(content.redirect)
  const reviews = reviewSummary(content)

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]">
      <ProductClientPage product={product} header={content?.header ?? null} reviewCount={reviews?.count ?? null} />
      {content && <Sections sections={content.sections} />}
      <Footer />
    </div>
  )
}
