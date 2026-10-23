import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import { getProductDetail } from '@/lib/shopify'
import Sections from '@/components/product/Sections'
import SystemClientPage, { type SystemHeader, type TierContent, type TierProducts } from '@/components/product/SystemClientPage'
import type { Section, ReviewsSection } from '@/lib/product-content'

/** Shopify system products in the new store, per tier: [non-fluoride handle, fluoride handle] */
const SYSTEMS: Record<string, { label: string; tiers: Record<string, [string | null, string | null]> }> = {
  'teething-to-24-months': {
    label: 'Teething to 24 Months',
    tiers: { Complete: ['supermouth-hydroxamin-non-fluoride-system-ages-teething-to-24-months', null] },
  },
  '2-to-5': {
    label: 'Ages 2 to 5',
    tiers: {
      Complete: ['supermouth-hydroxamin™-non-fluoride-system-ages-2-to-5', 'supermouth-hydroxamin™-w-fluoride-system-ages-2-to-5'],
      Basic: ['supermouth-hydroxamin-non-fluoride-system-ages-2-to-5-basic', 'supermouth-hydroxamin™-with-fluoride-system-ages-2-to-5-basic'],
    },
  },
  '6-to-12': {
    label: 'Ages 6 to 12',
    tiers: {
      Complete: ['supermouth-hydroxamin-only-system-ages-6-to-12', 'supermouth-hydroxamin-w-fluoride-system-ages-6-to-12'],
      Plus: ['supermouth-hydroxamin™-non-fluoride-system-ages-6-to-12-enhanced', 'supermouth-hydroxamin™-with-fluoride-system-ages-6-to-12-standard'],
      Basic: ['supermouth-hydroxamin™-non-fluoride-system-ages-6-to-12-base', 'supermouth-hydroxamin™-with-fluoride-system-ages-6-to-12-basic'],
    },
  },
  'teens-and-adults': {
    label: 'Teens & Adults',
    tiers: {
      Complete: ['supermouth-hydroxamin™-non-fluoride-system-ages-13', 'supermouth-hydroxamin™-with-fluoride-system-ages-13'],
      Plus: ['supermouth-hydroxamin™-non-fluoride-system-ages-13-and-up-standard', 'supermouth-hydroxamin™-with-fluoride-system-ages-13-and-up-standard'],
      Basic: ['supermouth-hydroxamin™-non-fluoride-system-ages-13-and-up-basic', 'supermouth-hydroxamin™-with-fluoride-system-ages-13-and-up-basic'],
    },
  },
  pregnancy: {
    label: 'Pregnancy',
    tiers: {
      Complete: ['supermouth-hydroxamin™-non-fluoride-pregnancy-system-complete', null],
      Plus: ['supermouth-hydroxamin™-non-fluoride-pregnancy-system-standard', null],
      Basic: ['supermouth-hydroxamin™-non-fluoride-pregnancy-system-basic', null],
    },
  },
  orthodontics: {
    label: 'Orthodontics',
    tiers: {
      Complete: ['supermouth-ortho-system-complete', null],
      Plus: ['supermouth-ortho-system-plus', null],
      Basic: ['supermouth-ortho-system-basic', null],
    },
  },
}

type SystemContent = { header: SystemHeader & { tiers: string[] }; tiers: TierContent[]; sections: Section[] }

function loadContent(slug: string): SystemContent | null {
  try {
    const f = path.join(process.cwd(), 'lib', 'product-content', `sys-${slug}.json`)
    return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null
  } catch {
    return null
  }
}

export function generateStaticParams() {
  return Object.keys(SYSTEMS).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const sys = SYSTEMS[params.slug]
  if (!sys) return {}
  const c = loadContent(params.slug)
  return { title: `SuperMouth Systems ${sys.label} — SuperMouth`, description: c?.header.shortDesc?.slice(0, 160) }
}

export default async function SystemPage({ params }: { params: { slug: string } }) {
  const sys = SYSTEMS[params.slug]
  if (!sys) notFound()
  const content = loadContent(params.slug)

  const products: TierProducts = {}
  for (const [tier, [nf, f]] of Object.entries(sys.tiers)) {
    const [a, b] = await Promise.all([nf ? getProductDetail(nf) : null, f ? getProductDetail(f) : null])
    if (a || b) products[tier] = { nf: a, f: b }
  }

  const header: SystemHeader = content?.header ?? {
    familyTitle: `SuperMouth Systems ${sys.label}`, sub: 'Save 15% or more on all systems', awards: [], note: null, shortDesc: null, left: [], leftLinks: [],
  }
  const reviews = content?.sections.find(s => s.kind === 'reviews') as ReviewsSection | undefined

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]">
      <SystemClientPage header={header} tiers={content?.tiers ?? []} products={products} reviewCount={reviews ? parseInt(reviews.count, 10) : null} />
      {content && <Sections sections={content.sections} />}
      <Footer />
    </div>
  )
}
