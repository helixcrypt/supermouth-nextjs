import CollectionView from '@/components/shop/CollectionView'

export const revalidate = 60

export const metadata = {
  title: 'Best Children‘s Oral Care (Teething to 12 Years) — SuperMouth',
  description: 'Dentist-designed, kid-approved, parent-assured oral care for kids: toothbrushes, toothpaste, floss, mouthwash, and more for every stage from teething to 12 years.',
}

// supermouth.com serves the kids shop at /shop-all-kids; it renders the shop-all-kids collection.
export default function ShopAllKidsPage() {
  return <CollectionView handle="shop-all-kids" />
}
