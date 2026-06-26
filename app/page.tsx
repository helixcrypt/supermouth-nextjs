import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const pressLogos = [
  'Indy Week', 'USA Today', 'CNN', 'Tamron Hall', 'US News', 'WebMD',
  'Healthline', 'Parents Magazine', 'Good Housekeeping', 'Today', 'Prevention',
  'Entrepreneur', 'Huffington Post', 'Forbes', 'Allure', 'Scary Mommy',
  'Health Magazine', 'Bustle', 'Business Insider', 'Cheddar News', 'BuzzFeed',
  'Fox News', 'CNET', 'Refinery29', 'Cosmopolitan', 'Seventeen', 'PopSugar',
  "Woman's World", 'Doctors', 'Dentistry Today', 'Inside Edition', 'MSN',
  "Men's Journal", 'NBC', 'New Beauty', 'CBS', 'ABC', 'Well+Good',
]

const ageCategories = [
  { label: 'Kids', tag: 'FOR KIDS', href: '/collections/shop-all-kids', img: 'https://pics.io/public/images/6a161386906ce9ec00be32d3/cdn', desc: 'Complete care for growing smiles — safe, fun products from first teeth to preteens.' },
  { label: 'Teens & Adults', tag: 'FOR TEENS & ADULTS', href: '/collections/ages-13-and-up', img: 'https://pics.io/public/images/6a1613855e27efbdf961ff04/cdn', desc: 'Complete daily care for confident smiles — advanced products for every routine.' },
  { label: 'Orthodontics', tag: 'FOR ORTHODONTICS', href: '/collections/ortho', img: 'https://pics.io/public/images/6a1613851c5e702c945fbf64/cdn', desc: 'Complete ortho care for braces, aligners, and retainers — protect smiles in transition.' },
  { label: 'Pregnancy', tag: 'FOR PREGNANCY', href: '/collections/pregnancy', img: 'https://pics.io/public/images/6a1613851c5e702c945fbf65/cdn', desc: 'Safe, complete oral care through pregnancy and nursing — support for you and baby.' },
]

const systems = [
  { label: 'Teething to 24 Months', href: '/systems/teething-to-24-months', img: 'https://cdn.supermouth.com/website/0-24_Complete_NFL.png', desc: 'Designed for new smiles — safe teethers, soft brushes, and Hydroxamin® toothpaste curated by leading dentists.' },
  { label: 'Ages 2–5', href: '/systems/2-to-5', img: 'https://cdn.supermouth.com/website/2-5_Complete_NFL.png', desc: 'Flavorful pastes, flossers, and mouth sprays — pH-balanced and packed with vital nutrients.' },
  { label: 'Ages 6–12', href: '/systems/6-to-12', img: 'https://cdn.supermouth.com/website/6-12_Complete_NFL.png', desc: 'Multiple toothbrush choices with AR and music, plus dentist-curated pH-balanced products.' },
  { label: 'Teens & Adults', href: '/systems/teens-and-adults', img: 'https://cdn.supermouth.com/website/teen_adult_complete_nfl.png', desc: 'Style meets function — groundbreaking bristle design, pH-balanced nutrient-rich selection.' },
  { label: 'Pregnancy', href: '/systems/pregnancy', img: 'https://cdn.supermouth.com/website/pregnancy_complete_nfl.png', desc: 'pH-balanced, Hydroxamin® and prebiotic-infused selection, safe and effective for mothers-to-be.' },
  { label: 'Orthodontics', href: '/systems/orthodontics', img: 'https://cdn.supermouth.com/website/Ortho_Basic_Mint_Hydroxamin.jpg', desc: 'Uniquely formulated products for braces, aligners, and retainers with patented ortho bristles.' },
]

const productCategories = [
  { label: 'Toothpaste', href: '/products/supermouth-hydroxamin-w-fluoride-toothpaste-3-4-oz', img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothpaste.png', bullets: ['Hydroxamin® (nano-hydroxyapatite, Vitamins K2 & D3)', 'Fluoride and non-fluoride options', 'pH-balanced for optimal oral health', 'No GMOs, SLS, artificial flavors or preservatives'] },
  { label: 'Mouthwash', href: '/products/supermouth-mouthwash-w-fluoride', img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_mouthwash.png', bullets: ['Alkaline pH of 8.5 supports oral health', 'Fluoride and non-fluoride options', 'Prebiotics for a healthy microbiome', 'No alcohol or harsh chemicals'] },
  { label: 'Toothbrushes', href: '/collections/mouthbrushes', img: 'https://cdn.supermouth.com/website/SM-website_2.0_HomePage_Category_toothbrush.png', bullets: ['Patented SuperBristles remove 30–60X more plaque', 'Musical, manual, electric, and sonic options', 'Augmented reality features', 'Variations for all ages including orthodontics'] },
  { label: 'Mouth Spray', href: '/products/supermouth-mouthspray', img: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0900.png', bullets: ['Perfect on-the-go for post-meals', 'Alkaline pH of 8.5', 'Prebiotics and xylitol', 'Freshens breath, ages 2+'] },
  { label: 'Floss', href: '/products/supermouth-hydroxamin-with-fluoride-mouthfloss', img: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners1066.png', bullets: ['Infused with Hydroxamin®', 'Expands to remove 40% more plaque', 'OrthoFloss with built-in threaders', 'No PTFE/Teflon or petroleum waxes'] },
  { label: 'Tongue Scrapers', href: '/collections/tongue-scrapers', img: 'https://supermouthcdn.blob.core.windows.net/website/230427_Supermouth_Landing_Page_Banners0968.png', bullets: ['Patented designs for all ages', 'Ice cream-shaped for kids', 'Fosters healthy oral microbiome', 'BPA-free'] },
]

const superDifference = [
  { letter: 'S', word: 'SAFE', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_SAFE.png', href: '/learn/a-guide-to-understanding-oral-care-ingredient-safety', desc: 'Nothing mouthrageous® — no artificial flavors, colors, sweeteners, or preservatives. Every ingredient rated #1 for safety by EWG.' },
  { letter: 'U', word: 'UNIFIED', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_UNIFIED.png', href: '/learn/beyond-brushing-flossing-a-comprehensive-guide-to-supercharging-your-oral-care-routine', desc: 'Each product designed for a specific purpose — together forming a complete system for kids, adults, pregnancy, and orthodontics.' },
  { letter: 'P', word: 'PLAYFUL', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_PLAYFUL.png', href: '/learn/taking-the-bore-and-chore-of-brush-time', desc: 'SuperMouth Squad superheroes turn brushing into an adventure with movies, music, comic books, augmented reality, and delicious flavors.' },
  { letter: 'E', word: 'EFFECTIVE', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_EFFECTIVE.png', href: '/learn/are-your-oral-care-products-actually-working', desc: 'Over 200 expertly developed products and nearly 300 patents. Nano-hydroxyapatite, prebiotics, vitamins — results you can feel.' },
  { letter: 'R', word: 'REPUTABLE', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_REPUTABLE.png', href: '/learn/who-s-claiming-your-oral-care-products-work-because-it-matters-1', desc: 'Developed by top dentists and medical experts, trusted by thousands of dental professionals nationwide.' },
]

const whatsNew = [
  { title: 'Stock Up, Get Rewarded', img: 'https://cdn.supermouth.com/website/SM-website_get_started_1_guide_you.jpg', href: '/shop-all' },
  { title: 'Introducing the Ultim8 Ortho SmartBrush System', img: 'https://cdn.supermouth.com/website/SM-website_get_started_2_shop_systems.jpg', href: '/products/supermouth-ultim8-ortho-system' },
  { title: 'Your Ultimate Guide to Oral Care During Orthodontic Treatment', img: 'https://cdn.supermouth.com/website/SM-website_get_started_3_shop_products.jpg', href: '/learn/your-ultimate-guide-to-oral-care-during-orthodontic-treatment' },
]

export default function HomePage() {
  return (
    <>
      {/* PROMO BAR handled by Navbar */}

      {/* HERO */}
      <section className="relative bg-sm-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-sm-accent text-xs font-bold tracking-widest uppercase mb-4">FOUNDED BY DENTISTS · 125,000+ FAMILIES</p>
            <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Your family doesn't need a better toothpaste.{' '}
              <span className="gradient-text">They need a complete oral care system.</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-sm-gray mb-4 flex-wrap">
              <span>★★★★★ <strong className="text-white">4.8/5</strong></span>
              <span>10,000+ verified reviews</span>
              <span>500,000+ orders shipped</span>
            </div>
            <p className="text-sm-gray text-sm mb-6">30-Day Money-Back Guarantee · Love it or full refund</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-sm text-left max-w-2xl mx-auto">
              <p className="text-sm-white/80 leading-relaxed">
                The toothpaste in your bathroom may contain lead. 90% of tested brands do. 65% contain arsenic.† SuperMouth independently third-party tests every batch for heavy metals — so you never have to wonder.
              </p>
              <p className="text-sm-gray/60 text-xs mt-2">† Source: Lead Safe Mama, LLC independent laboratory testing (2025) of 51 toothpaste products, reported by The Guardian and Fortune.</p>
            </div>

            <p className="text-sm-white/80 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
              For families who want the science, not the marketing. A cavity-free toddler and an older kid with cavities need different oral care. So does a pregnant woman with sensitive gums vs. a teen in braces prone to white spots. Yet generic brands sell them the same toothpaste. SuperMouth is <strong>the only brand that engineers a complete system for each life stage</strong> — Babies & Toddlers, Little Kids, Big Kids, Teens & Adults, Pregnancy, and Orthodontics. That's why <strong>thousands of dental and medical professionals nationwide</strong> trust and recommend SuperMouth — <strong>no one else does this</strong>.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
                Shop All Products →
              </Link>
              <Link href="/systems-overview" className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/20 transition-colors border border-white/20">
                Shop Systems — Save 15%
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-sm-gray text-xs">OR SHOP BY PERSON</span>
              <span className="text-sm-gray text-xs mx-1">·</span>
              {['Kids', 'Adults', 'Orthodontics', 'Pregnancy'].map((cat, i) => {
                const hrefs = ['/collections/shop-all-kids', '/collections/ages-13-and-up', '/collections/ortho', '/collections/pregnancy']
                return (
                  <Link key={cat} href={hrefs[i]} className="text-sm-accent text-xs hover:underline font-semibold">
                    {cat}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Age category grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {ageCategories.map(cat => (
              <Link key={cat.label} href={cat.href} className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-white/10">
                <Image src={cat.img} alt={cat.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs text-white/60 font-bold uppercase tracking-wider">{cat.tag}</span>
                </div>
                <div className="absolute bottom-0 p-4">
                  <h3 className="font-display font-bold text-sm">{cat.label}</h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">{cat.desc}</p>
                  <span className="text-xs text-sm-accent mt-2 block">Shop {cat.label} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-sm-blue/30 border-y border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['~300', 'PATENTS'], ['★ 4.8', '10,000+ REVIEWS'], ['125,000+', 'FAMILIES'], ['EWG #1', 'SAFETY RATING']].map(([val, label]) => (
            <div key={label}>
              <p className="font-display font-black text-2xl text-sm-accent">{val}</p>
              <p className="text-xs text-sm-gray font-semibold tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRESS TICKER */}
      <div className="overflow-hidden py-5 border-b border-white/10 bg-white/5">
        <Link href="/in-the-news" className="block">
          <div className="ticker-track flex gap-10 whitespace-nowrap" style={{ width: 'max-content' }}>
            {[...pressLogos, ...pressLogos].map((logo, i) => (
              <span key={i} className="text-sm-gray/60 text-sm font-semibold hover:text-sm-gray transition-colors">{logo}</span>
            ))}
          </div>
        </Link>
      </div>

      {/* DISCOVER WHAT'S NEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-6">Discover what's new!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {whatsNew.map(item => (
            <Link key={item.title} href={item.href} className="group relative rounded-2xl overflow-hidden aspect-video bg-white/10">
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="text-white font-bold text-sm leading-snug">{item.title}</p>
                <span className="text-sm-accent text-xs mt-1 block">Discover →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW TO GET STARTED */}
      <section className="bg-white/5 section-divider py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-8 text-center">how to get started</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: 'https://cdn.supermouth.com/website/SM-website_get_started_1_guide_you.jpg', title: 'Let Us Guide You', desc: 'Take a quick quiz and get a custom plan from our experts — with oral care products tailored to your age, stage, and needs, ready to be delivered to your door.', cta: 'Take Assessment', href: '/assessment' },
              { img: 'https://cdn.supermouth.com/website/SM-website_get_started_2_shop_systems.jpg', title: 'Shop Systems', desc: 'Embrace revolutionary care with our expert-curated systems, tailored for every age and stage, offering best-in-class options for all budgets and needs.', cta: 'Shop Systems', href: '/systems-overview' },
              { img: 'https://cdn.supermouth.com/website/SM-website_get_started_3_shop_products.jpg', title: 'Shop Products', desc: 'Discover our nearly 200 groundbreaking products designed for all ages, from kids to adults. Each item represents the pinnacle of innovation in oral care.', cta: 'Shop Products', href: '/shop-all' },
            ].map(item => (
              <div key={item.title} className="bg-sm-dark rounded-2xl overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-sm-gray mb-4 leading-relaxed">{item.desc}</p>
                  <Link href={item.href} className="text-sm-accent text-sm font-semibold hover:underline">{item.cta} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY AGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2 text-center">shop by age</p>
        <p className="text-center text-sm-gray text-sm mb-10">Find the perfect dental care for the whole family!</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group relative rounded-2xl overflow-hidden bg-white/5">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://supermouthcdn.blob.core.windows.net/website/shop_by_age_kids_various_products.jpeg"
                alt="SuperMouth Kids Products"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display font-bold text-lg mb-2">SuperMouth Kids Products</h3>
              <p className="text-sm text-sm-gray leading-relaxed mb-4">From teething to age 12, explore safe, effective, and fun oral care systems powered by kid-approved flavors, playful accessories, and beloved SuperMouth Squad characters — designed to build healthy habits for life.</p>
              <Link href="/collections/shop-all-kids" className="text-sm-accent text-sm font-semibold hover:underline">Shop All Kids →</Link>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden bg-white/5">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://supermouthcdn.blob.core.windows.net/website/shop_by_age_adults_vanilla_and_ultim8.jpeg"
                alt="SuperMouth Teens & Adults Products"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display font-bold text-lg mb-2">SuperMouth Teens & Adults Products</h3>
              <p className="text-sm text-sm-gray leading-relaxed mb-4">Advanced oral care solutions for teens and adults — featuring powerful ingredients, sleek designs, and cutting-edge technology to support healthier smiles, whiter teeth, and complete mouth wellness.</p>
              <Link href="/collections/ages-13-and-up" className="text-sm-accent text-sm font-semibold hover:underline">Shop All Teens & Adults →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="bg-white/5 section-divider py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">New! — Bundle & Save</p>
          <p className="text-sm-gray text-sm max-w-xl mb-8">Whether you're new to SuperMouth or a longtime fan, our curated bundles let you stock up on favorites and save 15% — perfect for building or upgrading your mouthcare routine.</p>
          <Link href="/supermouth-bundles" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity inline-block">
            Shop All Bundles →
          </Link>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm-accent text-xs font-bold uppercase tracking-widest text-center mb-3">Explore Our Custom Oral Care Systems</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-4">For Every Age and Stage</h2>
        <p className="text-sm-gray text-center text-sm max-w-xl mx-auto mb-12">Delivering safe, effective, and comprehensive solutions across all ages</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {systems.map(sys => (
            <Link key={sys.label} href={sys.href} className="group bg-white/5 rounded-2xl overflow-hidden hover:ring-1 hover:ring-sm-accent/50 transition-all">
              <div className="relative h-48 bg-white/5">
                <Image src={sys.img} alt={sys.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-sm mb-1">{sys.label}</h3>
                <p className="text-xs text-sm-gray line-clamp-2">{sys.desc}</p>
                <span className="text-xs text-sm-accent mt-3 block">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/systems-overview" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop All Systems
          </Link>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="bg-white/5 section-divider py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest text-center mb-3">Browse Our Comprehensive Product Categories</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-12">Safe & Effective for Every Need</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {productCategories.map(cat => (
              <Link key={cat.label} href={cat.href} className="group bg-sm-dark rounded-2xl overflow-hidden hover:bg-white/8 transition-colors">
                <div className="relative h-40 bg-white/10">
                  <Image src={cat.img} alt={cat.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm mb-2 group-hover:text-sm-accent transition-colors">{cat.label}</h3>
                  <ul className="space-y-1">
                    {cat.bullets.slice(0, 3).map(b => (
                      <li key={b} className="text-xs text-sm-gray flex gap-1.5">
                        <span className="text-sm-accent mt-0.5 flex-shrink-0">✓</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop-all" className="border border-sm-accent text-sm-accent font-bold px-8 py-4 rounded-full text-sm hover:bg-sm-accent hover:text-sm-navy transition-all">
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* S.U.P.E.R. DIFFERENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-4">Discover the S.U.P.E.R. Difference</h2>
        <p className="text-sm-gray text-center text-sm max-w-xl mx-auto mb-12">In oral care</p>
        <div className="space-y-4">
          {superDifference.map((item, i) => (
            <div key={item.letter} className={`flex gap-6 items-center ${i % 2 === 1 ? 'flex-row-reverse' : ''} bg-white/5 rounded-2xl p-6 group`}>
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src={item.img} alt={item.word} fill className="object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-display font-black text-3xl text-sm-accent">{item.letter}</span>
                  <span className="font-display font-bold text-sm tracking-widest">{item.word}</span>
                </div>
                <p className="text-sm text-sm-gray leading-relaxed">{item.desc}</p>
                <Link href={item.href} className="text-xs text-sm-accent mt-3 block hover:underline">Read More →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOVIE CTA */}
      <section className="bg-white/5 section-divider py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Our First Family Adventure Movie</p>
          <h2 className="font-display font-black text-3xl md:text-4xl mb-6">Now Playing</h2>
          <Link href="/play" className="relative inline-block group">
            <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden">
              <Image
                src="https://cdn.supermouth.com/website/trosm-teaser.jpg"
                alt="Rise of SuperMouth"
                width={800}
                height={450}
                className="rounded-2xl group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-sm-accent/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-sm-navy ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
