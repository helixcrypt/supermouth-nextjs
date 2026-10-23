import fs from 'fs'
import path from 'path'
import order from './_order.json'

// Articles captured from supermouth.com/learn. One JSON file per article (sanitized HTML body).
export type ArticleSummary = { slug: string; title: string; cardTitle: string; excerpt: string; thumb: string | null }
export type Article = ArticleSummary & { description: string; hero: string | null; heroAlt: string; body: string }

/** Newest first, same order as supermouth.com/learn. */
export const articles: ArticleSummary[] = order as ArticleSummary[]

export const PAGE_SIZE = 5

/** Featured grid on the learn page, in supermouth.com's order. */
export const featuredSlugs = [
  'while-we-debate-fluoride-manufacturers-slip-in-far-worse-ingredients',
  'nano-vs-micro-hydroxyapatite-whats-the-difference',
  'ultim8-smartbrush-system',
  'the-science-of-supermouth-revolutionizing-oral-health-care',
  'rethinking-oral-care-12-common-misconceptions',
  'why-age-and-stage-based-systems',
  'everything-you-thought-you-knew-about-brushing-and-flossing-is-wrong',
  'winning-the-fight-against-bad-breath-the-supermouth-system',
  'myth-7-demystified-the-complex-truth-about-natural-toothpaste-and-other-natural-claims',
  'is-mouthwash-good-for-you',
  'the-fluoride-controversy-exploring-choices-in-oral-care',
  'the-wise-investment-in-preventative-oral-care',
  'antibiotics-prebiotics-and-probiotics-in-oral-care-harnessing-nature-s-wisdom',
  'myth-2-busting-the-myth-not-all-oral-bacteria-are-bad',
  'the-ph-balance-of-your-mouth-affects-your-oral-health',
]

export function getArticle(slug: string): Article | null {
  if (!articles.some(a => a.slug === slug)) return null
  const file = path.join(process.cwd(), 'lib', 'articles', `${slug}.json`)
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Article
}
