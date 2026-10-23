import Image from 'next/image'
import Footer from '@/components/Footer'
import VideoStrip from '@/components/shop/VideoStrip'
import FilterGrid from '@/components/shop/FilterGrid'
import { shop } from '@/components/shop/data'
import { SCRIPT, sortLikeOriginal } from '@/components/shop/ui'
import { getShopCollection, type ShopProduct } from '@/lib/shop-queries'

export const revalidate = 60

export const metadata = {
  title: 'Bundle & Save — SuperMouth',
  description: 'Save up to 15% with curated SuperMouth bundles: dentist-backed formulas, delicious flavors, and clean, safe ingredients.',
}

// Bold phrases in the hero copy, as on supermouth.com
const BOLD = ['dentist-backed formulations', 'delicious flavors', 'clean, safe ingredients', 'first-timers', 'gifts', 'smile-friendly solution', 'fluoride protection', 'nano-hydroxyapatite support', 'orthodontic care']
function emphasize(text: string) {
  const re = new RegExp(`(${BOLD.map(b => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return text.split(re).map((part, i) => (BOLD.includes(part) ? <b key={i}>{part}</b> : part))
}

export default async function BundlesPage() {
  let products: ShopProduct[] = []
  try {
    products = (await getShopCollection('bundles'))?.products ?? []
  } catch (e) {
    console.error('Bundles fetch error:', e)
  }
  const b = shop.bundles
  const strip = shop.strips.bundles

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em] text-[#394C97]">
      {/* Hero */}
      <section className="bg-[#0AA9C2] text-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-10 grid md:grid-cols-2 gap-8 items-center min-h-[368px]">
          <div className="max-w-[560px]">
            <h1 className="text-[18px] leading-7 font-bold">{b.title}</h1>
            <p className="mt-5 text-[16px] leading-6">{emphasize(b.text)}</p>
          </div>
          <div className="relative w-full aspect-[432/288] max-w-[432px] mx-auto">
            <Image src={b.img} alt="SuperMouth bundles" fill priority sizes="432px" className="object-contain" />
          </div>
        </div>
      </section>

      <div className="pt-4">
        <VideoStrip title={strip.title} sub={strip.sub} items={strip.items} />
      </div>

      <FilterGrid products={sortLikeOriginal('bundles', products)} mode="none" />

      {/* Bundle for the whole family */}
      <section className="mt-4 bg-[#131247] text-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full aspect-[560/315]">
            <Image src={b.familyImg} alt="Family brushing together" fill sizes="(min-width:768px) 560px, 100vw" className="object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-[40px] md:text-[48px] leading-[52px] text-[#FFE920]" style={SCRIPT}>{b.familyTitle}</h2>
            <p className="mt-3 text-[15px] md:text-[16px] leading-6">{emphasize(b.familyText)}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
