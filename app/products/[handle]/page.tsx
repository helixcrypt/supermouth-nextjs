import { getProductByHandle, getAllProducts } from '@/lib/shopify'
import ProductClientPage from '@/components/ProductClientPage'
import Footer from '@/components/Footer'
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
  } catch {
    notFound()
  }
  if (!product) notFound()

  return (
    <>
      <ProductClientPage product={product} />
      <Footer />
    </>
  )
}
