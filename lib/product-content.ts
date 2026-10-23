import fs from 'fs'
import path from 'path'

/**
 * Per-product page content captured from supermouth.com (server-only).
 * Files live in lib/product-content/<handle>.json; images referenced there are self-hosted in /public/product.
 */

export type Award = { pub: string; title: string }
export type OptionCard = { value: string; save: string | null; desc: string; img: string | null }
export type LeftBlock = { title: string; text: string }

export type VideoSection = { kind: 'videos'; title: string; subtitle?: string; items: { title: string; thumb: string | null; mediaId: string | null }[] }
export type FeatureCardsSection = { kind: 'featureCards'; title: string | null; cards: { img: string; title: string; paras: string[] }[] }
export type CalloutSection = { kind: 'callout'; title: string; parasHtml: string[]; icon: string | null; img?: string | null }
export type FeatureGridSection = { kind: 'featureGrid'; lines: string[] }
export type GetToKnowSection = { kind: 'getToKnow'; title: string; bullets: { label: string; text: string }[]; img: string | null }
export type ComparisonSection = { kind: 'comparison'; title: string; titleSpans: { t: string; c: string }[]; featLabel: string; cols: string[]; rows: { label: string; marks: boolean[] }[]; after: string[]; img: string | null; logo: string | null }
export type LinkCardsSection = { kind: 'companions' | 'loveToo'; title: string; items: { title: string; href: string; img: string }[] }
export type AccordionSection = { kind: 'accordions'; title: string; items: { title: string; html: string }[] }
export type FaqSection = { kind: 'faq'; title: string; items: { q: string; a: string }[] }
export type AwardsSection = { kind: 'awards'; title: string; intro: string[]; items: { title: string; pub: string; quote: string; source: string }[] }
export type ReviewsSection = { kind: 'reviews'; title: string; count: string; reviews: { rating: number; name: string; title: string | null; body: string }[] }
export type HtmlSection = { kind: 'html'; html: string; imgs: string[]; bg: string }

export type Section =
  | VideoSection | FeatureCardsSection | CalloutSection | FeatureGridSection | GetToKnowSection | ComparisonSection
  | LinkCardsSection | AccordionSection | FaqSection | AwardsSection | ReviewsSection | HtmlSection

export type ProductHeader = {
  familyTitle: string | null
  family: { label: string; href: string }[]
  productTitle: string | null
  awards: Award[]
  shortDesc: string | null
  superHtml: string | null
  left: LeftBlock[]
  optionCards: OptionCard[]
}

export type ProductContent = { header: ProductHeader; sections: Section[]; redirect?: string }

const DIR = path.join(process.cwd(), 'lib', 'product-content')

export function getProductContent(handle: string): ProductContent | null {
  try {
    const safe = decodeURIComponent(handle).replace(/[^a-z0-9™\-]/gi, '')
    const file = path.join(DIR, `${safe}.json`)
    if (!fs.existsSync(file)) return null
    return JSON.parse(fs.readFileSync(file, 'utf8')) as ProductContent
  } catch {
    return null
  }
}

export function reviewSummary(c: ProductContent | null): { count: number } | null {
  const r = c?.sections.find(s => s.kind === 'reviews') as ReviewsSection | undefined
  return r && r.count ? { count: parseInt(r.count, 10) } : null
}
