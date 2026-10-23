import Footer from '@/components/Footer'
import { BannerHero, CenteredHero, KidsHero } from '@/components/shop/Hero'
import Comparison from '@/components/shop/Comparison'
import VideoStrip from '@/components/shop/VideoStrip'
import Faq from '@/components/shop/Faq'
import FilterGrid from '@/components/shop/FilterGrid'
import { shop } from '@/components/shop/data'
import { sortLikeOriginal } from '@/components/shop/ui'
import { getShopCollection, getCollectionMembership, type ShopProduct } from '@/lib/shop-queries'

const CONFIG = shop.collections as Record<string, any>
const STRIPS = shop.strips as Record<string, any>
const COMPARE = shop.compare as Record<string, any>

// Kids toothbrushes isn't its own Shopify collection: pick the kids brushes out of all toothbrushes.
const KIDS_BRUSH = /kid|jr|toddler|baby|finger|musical|song|sonic|glow globe|turbo|smile sidekick|bristles|teether/i
const NOT_KIDS = /ultim8|adult|ortho/i

const titleFromHandle = (h: string) => h.replace(/-\d+$/, '').split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')

export default async function CollectionView({ handle }: { handle: string }) {
  const cfg = CONFIG[handle] ?? {}
  const sourceHandle: string = cfg.source ?? handle

  let collection = null
  try { collection = await getShopCollection(handle === 'kids-toothbrushes' ? 'kids-toothbrushes' : sourceHandle) } catch (e) { console.error('collection fetch', e) }
  if (!collection && cfg.source) {
    try { collection = await getShopCollection(cfg.source) } catch (e) { console.error('collection fetch', e) }
  }

  let products: ShopProduct[] = collection?.products ?? []
  if (handle === 'kids-toothbrushes' && collection?.handle !== 'kids-toothbrushes') {
    products = products.filter(p => KIDS_BRUSH.test(p.title) && !NOT_KIDS.test(p.title))
  }

  products = sortLikeOriginal(handle, products)

  let membership: Record<string, string[]> = {}
  const ageOptions = cfg.filter === 'kids' ? shop.ageFilters.slice(0, 3) : shop.ageFilters
  if (cfg.filter === 'kids') {
    try { membership = await getCollectionMembership([...ageOptions.map(a => a[1]), ...shop.categoryFilters.map(c => c[1])]) } catch (e) { console.error('membership', e) }
  }

  const hero = cfg.hero
  const strip = cfg.strip ? STRIPS[cfg.strip] : null
  const stripEl = strip ? <VideoStrip title={strip.title} sub={strip.sub} items={strip.items} /> : null
  // Kids toothbrushes shows its video strip between the filter bar and the grid; other pages show it under the hero.
  const stripBetween = cfg.filter === 'type'

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em] text-[#394C97]">
      {hero?.kind === 'banner' && <BannerHero hero={hero} />}
      {hero?.kind === 'kids' && <KidsHero hero={hero} />}
      {(hero?.kind === 'centered' || !hero) && (
        <CenteredHero
          hero={hero ?? { word: '', script: collection?.title ?? titleFromHandle(handle) }}
          fallbackTitle={collection?.title ?? titleFromHandle(handle)}
          fallbackText={collection?.description || undefined}
        />
      )}
      {cfg.compare && <Comparison cmp={COMPARE[cfg.compare]} logo={shop.logoReversed} />}
      {!stripBetween && stripEl}
      <FilterGrid
        products={products}
        membership={membership}
        mode={cfg.filter ?? 'none'}
        ageOptions={ageOptions}
        categoryOptions={shop.categoryFilters}
        between={stripBetween ? stripEl : undefined}
      />
      {cfg.faq && <Faq items={cfg.faq} />}
      <Footer />
    </div>
  )
}

