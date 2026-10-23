import CollectionView from '@/components/shop/CollectionView'
import { shop } from '@/components/shop/data'

export const revalidate = 60

const CONFIG = shop.collections as Record<string, any>
const titleFromHandle = (h: string) => h.replace(/-\d+$/, '').split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const cfg = CONFIG[params.handle]
  const t = cfg?.hero?.title ? `${cfg.hero.script ? cfg.hero.script + ' ' : ''}${cfg.hero.title}` : cfg?.hero?.word ? `${cfg.hero.word} ${cfg.hero.script}` : titleFromHandle(params.handle)
  return { title: `${t} — SuperMouth` }
}

export default function CollectionPage({ params }: { params: { handle: string } }) {
  return <CollectionView handle={params.handle} />
}
