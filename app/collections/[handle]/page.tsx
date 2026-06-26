import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

// Real hero images and descriptions from supermouth.com
const COLLECTION_META: Record<string, {
  title: string
  desc: string
  desktopHero?: string
  mobileHero?: string
  subheading?: string
}> = {
  'shop-all-kids': {
    title: 'Kids',
    desc: 'From teething to age 12, explore safe, effective, and fun oral care systems powered by kid-approved flavors, playful accessories, and beloved SuperMouth Squad characters — designed to build healthy habits for life.',
    desktopHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_kids.png',
    mobileHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_kids_mobile.png',
  },
  'ages-13-and-up': {
    title: 'Teens & Adults',
    desc: 'Thanks to diets high in sugar, processed carbs, and a potential lack of oral care, teens and adults can be at a higher risk of developing oral disease. Our Teens & Adults collection, curated specifically for teen and adult mouths, combats oral risk factors with premium ingredients, plaque-blasting toothbrushes, hydroxamin®-containing floss, and much more!',
    desktopHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_ages_teens_adults.png',
    mobileHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_ages_teens_adults_mobile.png',
  },
  'ortho': {
    title: 'Orthodontics',
    desc: 'Oral care with braces is easier with SuperMouth\'s Orthodontics Collection, designed for those with braces and other orthodontic devices. Our range includes toothbrushes and flosses uniquely designed for cleaning around brackets and wires, plus toothpastes and mouthwashes fortified with Hydroxamin and fluoride formula to prevent cavities and decalcifications.',
    desktopHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_ortho.png',
    mobileHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_ortho_mobile.png',
    subheading: 'Ortho Care in Action — See how SuperMouth makes braces, aligners, and retainers easier to clean and protect',
  },
  'pregnancy': {
    title: 'Pregnancy',
    desc: 'Congratulations, new mommas! Our pregnancy collection sets mom and baby up for success by optimizing mom\'s oral health, creating a healthy oral microbiome that she\'ll pass onto her baby.',
    desktopHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_pregnancy.png',
    mobileHero: 'https://cdn.supermouth.com/website/SuperMouth_Hero_image_pregnancy_mobile.png',
  },
  'mouthbrushes': {
    title: 'Toothbrushes',
    desc: 'Introducing SuperMouth\'s groundbreaking line of toothbrushes, designed to meet all needs and preferences with manual, electric, sonic, and musical options. Our Ultim8 SmartBrush System features advanced SuperBristles Pro and SuperBristles Ortho, which clean teeth up to 60 times better.',
    desktopHero: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png',
  },
  'mouthpaste': {
    title: 'Toothpaste',
    desc: 'Every mouth needs a hero! Introducing the only kids and adults\' toothpaste made with Hydroxamin™ — your new superpower. Our patent-pending formula cleans the mouth to support a healthy oral ecosystem.',
    desktopHero: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png',
  },
  'mouthwash': {
    title: 'Mouthwash',
    desc: 'Every hero needs a sidekick. Our mouthwash squad is here to save the day from bad breath. Our pH-alkalizing mouthwash helps to feed the good guys (healthy bacteria) for an overall healthier oral microbiome.',
    desktopHero: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_mouthwash.png',
  },
  'mouthfloss': {
    title: 'Floss',
    desc: 'Don\'t let mouth villains slip through the cracks! Our mouthfloss contains minerals and vitamins and expands, removing 40% more plaque than standard floss.',
    desktopHero: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners1066.png',
  },
  'mouthspray-1': {
    title: 'Mouth Spray',
    desc: 'Every time you eat or drink, the pH levels in your mouth drop and become the perfect habitat for harmful bacteria to flourish. Our mouthspray balances the pH, and prebiotics help feed the good bacteria.',
    desktopHero: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0900.png',
  },
  'tongue-scrapers': {
    title: 'Tongue Scrapers',
    desc: 'Patented tongue scraper designs for all ages — including ice cream-shaped scrapers for kids that make oral care fun while supporting a healthy oral microbiome.',
    desktopHero: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0968.png',
  },
  'essential-accessories-1': {
    title: 'Essential Accessories',
    desc: 'Elevate your oral care routine with SuperMouth\'s essential accessories for both kids and adults. From toothpaste dispensers and floss dispensers featuring our beloved Superheroes, to UV sanitizers and SmartCases — crafted to build positive, lifelong oral care habits.',
  },
  'toothpaste': {
    title: 'Toothpaste',
    desc: 'Every mouth needs a hero! The only toothpaste made with Hydroxamin™ — nano-hydroxyapatite, Vitamin K2, and Vitamin D3 — safe for the whole family.',
    desktopHero: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png',
  },
  'mouthwash-category': {
    title: 'Mouthwash',
    desc: 'pH-alkalizing mouthwash that feeds the good bacteria for a healthier oral microbiome. Fluoride and non-fluoride options available.',
    desktopHero: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_mouthwash.png',
  },
  'floss': {
    title: 'Floss',
    desc: 'Infused with Hydroxamin® — expands to remove 40% more plaque than standard floss. OrthoFloss available with built-in threaders.',
    desktopHero: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners1066.png',
  },
  'mouth-spray': {
    title: 'Mouth Spray',
    desc: 'Alkaline pH of 8.5 with prebiotics and xylitol. Perfect on-the-go for post-meals. Ages 2+.',
    desktopHero: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0900.png',
  },
}

export async function generateMetadata({ params }: { params: { handle: string } }) {
  const meta = COLLECTION_META[params.handle]
  return {
    title: `${meta?.title ?? params.handle} — SuperMouth`,
    description: meta?.desc?.slice(0, 160) ?? 'Shop SuperMouth oral care products.',
  }
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  let products: any[] = []
  const meta = COLLECTION_META[params.handle]
  let collectionTitle: string = meta?.title ?? params.handle
  let collectionDesc: string = meta?.desc ?? ''

  try {
    const collection = await getCollectionByHandle(params.handle, 100)
    if (collection) {
      if (collection.title) collectionTitle = collection.title
      if (collection.description) collectionDesc = collection.description
      if (collection.products?.edges) {
        products = collection.products.edges.map((e: any) => e.node)
      }
    }
  } catch (e) {}

  const desktopHero = meta?.desktopHero
  const mobileHero = meta?.mobileHero

  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero — desktop + mobile with real images */}
      {(desktopHero || mobileHero) && (
        <section className="relative w-full">
          {desktopHero && (
            <div className={`${mobileHero ? 'hidden md:block' : 'block'} w-full`}>
              <Image
                src={desktopHero}
                alt={collectionTitle}
                width={1440}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          )}
          {mobileHero && (
            <div className="md:hidden w-full">
              <Image
                src={mobileHero}
                alt={collectionTitle}
                width={768}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          )}
        </section>
      )}

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-xs text-sm-gray mb-4 flex gap-2">
          <Link href="/" className="hover:text-sm-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop-all" className="hover:text-sm-navy transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-sm-navy font-semibold">{collectionTitle}</span>
        </nav>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-4 text-sm-navy">{collectionTitle}</h1>
        {collectionDesc && (
          <p className="text-sm-gray text-sm max-w-2xl leading-relaxed mb-2">{collectionDesc}</p>
        )}
        {meta?.subheading && (
          <p className="text-sm-teal text-sm font-semibold mb-4">{meta.subheading}</p>
        )}
        <p className="text-xs text-sm-gray mt-2">{products.length} product{products.length !== 1 ? 's' : ''}</p>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <div className="text-5xl mb-4">🦷</div>
            <h3 className="font-display font-bold text-xl mb-2 text-sm-navy">Products coming soon!</h3>
            <p className="text-sm-gray text-sm mb-6">Browse all products in the meantime.</p>
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
