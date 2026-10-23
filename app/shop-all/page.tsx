import Footer from '@/components/Footer'
import { ShopAllHero } from '@/components/shop/Hero'
import FilterGrid from '@/components/shop/FilterGrid'
import { shop } from '@/components/shop/data'
import { sortLikeOriginal, onlyOriginal } from '@/components/shop/ui'
import { getShopProducts, getCollectionMembership, type ShopProduct } from '@/lib/shop-queries'

export const revalidate = 60

export const metadata = {
  title: 'Shop All Products — SuperMouth',
  description: 'Shop all SuperMouth products: toothbrushes, toothpaste, mouthwash, mouth spray, floss, tongue scrapers, and essential accessories for every age and stage.',
}

export default async function ShopAllPage() {
  let products: ShopProduct[] = []
  let membership: Record<string, string[]> = {}
  try {
    ;[products, membership] = await Promise.all([
      getShopProducts(),
      getCollectionMembership([...shop.ageFilters.map(a => a[1]), ...shop.categoryFilters.map(c => c[1])]),
    ])
  } catch (e) {
    console.error('Shop All fetch error:', e)
  }

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em] text-[#394C97]">
      <ShopAllHero hero={shop.shopAll} />
      <FilterGrid products={sortLikeOriginal('shop-all', onlyOriginal('shop-all', products))} membership={membership} mode="shopAll" ageOptions={shop.ageFilters} categoryOptions={shop.categoryFilters} />
      <Footer />
    </div>
  )
}
