import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'
import { getCollectionByHandle } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

const SYSTEMS: Record<string, any> = {
  'teething-to-24-months': {
    label: 'Teething to 24 Months',
    tag: 'Ages 0–2',
    img: '/cdn/system-0-24.png',
    collectionHandle: 'teething-to-24-months',
    desc: 'Designed for new smiles, our Teething System includes safe teethers and soft-bristled brushes, along with toothpaste enriched with Hydroxamin® and prebiotics, curated by leading dentists for optimal early oral care.',
    longDesc: `Starting oral care early is one of the most important gifts you can give your child. Even before teeth appear, cleaning your baby's gums with a soft cloth sets the foundation for a lifetime of healthy habits.\n\nOur Teething System was designed by pediatric dentists who understand that the first 24 months are critical for establishing oral health patterns. Every product in this system has been carefully formulated to be safe for the youngest members of your family — with no harsh chemicals, no artificial ingredients, and no compromises.`,
  },
  '2-to-5': {
    label: 'Ages 2–5',
    tag: 'Little Kids',
    img: '/cdn/system-2-5.png',
    collectionHandle: 'ages-2-to-5',
    desc: 'Featuring flavorful pastes, flossers, and mouth sprays — each pH-balanced and packed with vital nutrients, alongside fun brushes and adorable tongue cleaners.',
    longDesc: `The ages 2–5 system is all about building habits that last a lifetime, while making oral care genuinely fun. Kids at this stage are developing their brushing technique and learning to enjoy the routine.\n\nOur flavors are specially formulated to appeal to young palates — not too minty, not too sweet — while delivering the nutrients growing teeth need most. Every product is free from artificial colors, sweeteners, and preservatives.`,
  },
  '6-to-12': {
    label: 'Ages 6–12',
    tag: 'Big Kids',
    img: '/cdn/system-6-12.png',
    collectionHandle: 'ages-6-to-12',
    desc: 'Designed for growing kids, this Transition System supports the shift from baby to permanent teeth with music, augmented reality, and dentist-curated formulas.',
    longDesc: `The transition from baby teeth to permanent teeth is one of the most important periods in oral development. Kids ages 6–12 are losing teeth, gaining new ones, and developing the oral care habits they'll carry into adulthood.\n\nOur system for this age group includes tools that make brushing exciting — from musical toothbrushes to augmented reality experiences — while providing the nutritional support that developing permanent teeth need.`,
  },
  'teens-and-adults': {
    label: 'Teens & Adults',
    tag: 'Ages 13+',
    img: '/cdn/system-teens-adults.png',
    collectionHandle: 'ages-13-and-up',
    desc: 'The Teen & Adult System blends style with function — groundbreaking bristle design, complete nutrient-rich care from toothpaste to mouthwash.',
    longDesc: `Teens and adults need oral care that delivers real results without compromise. Our system is built around our patented SuperBristles technology, which removes 30–60X more plaque than conventional brushes — while remaining gentle on enamel and gums.\n\nFrom whitening support to gum health, from fresh breath to enamel fortification, the Teens & Adults system covers every aspect of a complete oral care routine.`,
  },
  'pregnancy': {
    label: 'Pregnancy',
    tag: 'Pregnancy & Nursing',
    img: '/cdn/system-pregnancy.png',
    collectionHandle: 'pregnancy',
    desc: 'The Pregnancy System offers pH-balanced, Hydroxamin® and prebiotic-infused oral care — safe and effective for mothers-to-be through every trimester.',
    longDesc: `Pregnancy brings unique oral health challenges. Hormonal changes increase the risk of gum disease, morning sickness can erode enamel, and many conventional products contain ingredients you'd rather avoid during pregnancy.\n\nOur Pregnancy System was formulated specifically for these challenges — with gentle, pH-balanced products that protect both mother and baby, ingredients that are safe through all trimesters, and flavors that work even when nausea is present.`,
  },
  'orthodontics': {
    label: 'Orthodontics',
    tag: 'Braces & Aligners',
    img: '/cdn/system-ortho.jpg',
    collectionHandle: 'ortho',
    desc: 'Our Ortho System features uniquely formulated products for braces, aligners, and retainers — with patented bristles designed for cleaning around appliances.',
    longDesc: `Orthodontic treatment is a significant investment in your smile. Protecting that investment requires oral care specifically designed for the unique challenges that braces, aligners, and retainers create.\n\nOur Ortho System was developed with orthodontists to prevent the white spot lesions, cavities, and gum issues that often occur during treatment. Every product in this system is engineered to work around — and with — your orthodontic appliances.`,
  },
}

export function generateStaticParams() {
  return Object.keys(SYSTEMS).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const system = SYSTEMS[params.slug]
  if (!system) return {}
  return {
    title: `${system.label} System — SuperMouth`,
    description: system.desc,
  }
}

export default async function SystemPage({ params }: { params: { slug: string } }) {
  const system = SYSTEMS[params.slug]
  if (!system) notFound()

  let products: any[] = []
  try {
    const collection = await getCollectionByHandle(system.collectionHandle)
    if (collection?.products?.edges) {
      products = collection.products.edges.map((e: any) => e.node)
    }
  } catch (e) {
    // Collection may not exist yet in sample store — show empty gracefully
  }

  const systemSlugs = Object.keys(SYSTEMS)
  const currentIndex = systemSlugs.indexOf(params.slug)
  const nextSlug = systemSlugs[currentIndex + 1]
  const nextSystem = nextSlug ? SYSTEMS[nextSlug] : null

  return (
    <>
      {/* Hero */}
      <section className="bg-sm-dark border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-sm-gray mb-6 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/systems-overview" className="hover:text-white transition-colors">Systems</Link>
            <span>/</span>
            <span className="text-white">{system.label}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-sm-accent/20 text-sm-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                {system.tag}
              </span>
              <h1 className="font-display font-black text-4xl md:text-5xl mb-4 leading-tight">
                {system.label}<br />
                <span className="gradient-text">Complete System</span>
              </h1>
              <p className="text-sm-gray text-sm leading-relaxed mb-6">{system.desc}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
                  Shop Products →
                </Link>
                <Link href="/systems-overview" className="border border-white/20 text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                  All Systems
                </Link>
              </div>
            </div>
            <div className="relative aspect-square max-w-sm mx-auto w-full">
              <Image
                src={system.img}
                alt={system.label}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl mb-6">Why This System?</h2>
        {system.longDesc.split('\n\n').map((para: string, i: number) => (
          <p key={i} className="text-sm-gray text-sm leading-relaxed mb-4">{para}</p>
        ))}
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display font-black text-2xl mb-2">Products in This System</h2>
        <p className="text-sm-gray text-sm mb-8">Everything you need — nothing you don't.</p>

        {products.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-10 text-center">
            <p className="text-sm-gray text-sm mb-4">Products for this system are coming soon.</p>
            <Link href="/shop-all" className="text-sm-accent text-sm hover:underline">Browse all products →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Next system CTA */}
      {nextSystem && (
        <section className="bg-white/5 border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs text-sm-gray uppercase tracking-widest mb-1">Next System</p>
              <h3 className="font-display font-bold text-xl">{nextSystem.label}</h3>
            </div>
            <Link
              href={`/systems/${nextSlug}`}
              className="bg-sm-accent text-sm-navy font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity flex-shrink-0"
            >
              View {nextSystem.label} System →
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
