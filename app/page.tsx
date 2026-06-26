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
  { label: 'Kids', tag: 'FOR KIDS', href: '/collections/shop-all-kids', img: 'https://pics.io/public/images/6a161386906ce9ec00be32d3/cdn', desc: 'Complete care for growing smiles — safe, fun products from first teeth to preteens.', bg: 'bg-sm-peach' },
  { label: 'Teens & Adults', tag: 'FOR TEENS & ADULTS', href: '/collections/ages-13-and-up', img: 'https://pics.io/public/images/6a1613855e27efbdf961ff04/cdn', desc: 'Complete daily care for confident smiles — advanced products for every routine.', bg: 'bg-sm-teal-bg' },
  { label: 'Orthodontics', tag: 'FOR ORTHODONTICS', href: '/collections/ortho', img: 'https://pics.io/public/images/6a1613851c5e702c945fbf64/cdn', desc: 'Complete ortho care for braces, aligners, and retainers — protect smiles in transition.', bg: 'bg-blue-100' },
  { label: 'Pregnancy', tag: 'FOR PREGNANCY', href: '/collections/pregnancy', img: 'https://pics.io/public/images/6a1613851c5e702c945fbf65/cdn', desc: 'Safe, complete oral care through pregnancy and nursing — support for you and baby.', bg: 'bg-purple-100' },
]

const systems = [
  { label: 'Teething to 24 Months', href: '/systems/teething-to-24-months', img: 'https://cdn.supermouth.com/website/0-24_Complete_NFL.png' },
  { label: 'Ages 2–5', href: '/systems/2-to-5', img: 'https://cdn.supermouth.com/website/2-5_Complete_NFL.png' },
  { label: 'Ages 6–12', href: '/systems/6-to-12', img: 'https://cdn.supermouth.com/website/6-12_Complete_NFL.png' },
  { label: 'Teens & Adults', href: '/systems/teens-and-adults', img: 'https://cdn.supermouth.com/website/teen_adult_complete_nfl.png' },
  { label: 'Pregnancy', href: '/systems/pregnancy', img: 'https://cdn.supermouth.com/website/pregnancy_complete_nfl.png' },
  { label: 'Orthodontics', href: '/systems/orthodontics', img: 'https://cdn.supermouth.com/website/Ortho_Basic_Mint_Hydroxamin.jpg' },
]

const superDifference = [
  { letter: 'S', word: 'SAFE', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_SAFE.png', href: '/learn/a-guide-to-understanding-oral-care-ingredient-safety', desc: 'Nothing mouthrageous® — no artificial flavors, colors, sweeteners, or preservatives. Every ingredient rated #1 for safety by EWG.' },
  { letter: 'U', word: 'UNIFIED', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_UNIFIED.png', href: '/learn/beyond-brushing-flossing-a-comprehensive-guide-to-supercharging-your-oral-care-routine', desc: 'Each product designed for a specific purpose — together forming a complete system for kids, adults, pregnancy, and orthodontics.' },
  { letter: 'P', word: 'PLAYFUL', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_PLAYFUL.png', href: '/learn/taking-the-bore-and-chore-of-brush-time', desc: 'SuperMouth Squad superheroes turn brushing into an adventure with movies, music, comic books, augmented reality, and delicious flavors.' },
  { letter: 'E', word: 'EFFECTIVE', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_EFFECTIVE.png', href: '/learn/are-your-oral-care-products-actually-working', desc: 'Over 200 expertly developed products and nearly 300 patents. Nano-hydroxyapatite, prebiotics, vitamins — results you can feel.' },
  { letter: 'R', word: 'REPUTABLE', img: 'https://cdn.supermouth.com/website/S.U.P.E.R_graphic_REPUTABLE.png', href: '/learn/who-s-claiming-your-oral-care-products-work-because-it-matters-1', desc: 'Developed by top dentists and medical experts, trusted by thousands of dental professionals nationwide.' },
]

export default function HomePage() {
  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-sm-navy mb-6">
              <span className="w-2 h-2 bg-sm-green rounded-full"></span>
              FOUNDED BY DENTISTS · 125,000+ FAMILIES
            </div>

            <h1 className="font-display font-black text-4xl md:text-5xl leading-tight mb-6 text-sm-navy">
              Your family doesn't need a better toothpaste. They need a{' '}
              <span className="text-orange-500 italic">complete</span>{' '}
              oral care{' '}
              <span className="text-sm-teal italic">system.</span>
            </h1>

            <div className="bg-white rounded-2xl p-5 mb-4 inline-block">
              <p className="text-yellow-500 font-bold text-sm">★★★★★ 4.8/5</p>
              <p className="text-sm text-sm-gray">10,000+ verified reviews</p>
              <p className="text-sm text-sm-gray">500,000+ orders shipped</p>
            </div>

            <div className="bg-sm-teal-bg rounded-2xl px-5 py-3 mb-5 inline-flex items-center gap-2 text-sm text-sm-navy font-medium">
              <span className="text-sm-green">✓</span>
              30-Day Money-Back Guarantee · Love it or full refund
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-xl p-5 mb-6 text-sm text-sm-navy">
              <p className="font-bold mb-1">The toothpaste in your bathroom may contain lead.</p>
              <p className="text-sm-gray leading-relaxed">90% of tested brands do. 65% contain arsenic.† SuperMouth independently third-party tests every batch for heavy metals — so you never have to wonder.</p>
              <p className="text-xs text-sm-gray/70 mt-2">† Source: Lead Safe Mama, LLC independent laboratory testing (2025) of 51 toothpaste products, reported by The Guardian and Fortune.</p>
            </div>

            <p className="text-sm text-sm-gray leading-relaxed mb-8">
              A cavity-free toddler and an older kid with cavities need different oral care. So does a pregnant woman with sensitive gums vs. a teen in braces prone to white spots. Yet generic brands sell them the same toothpaste. SuperMouth is{' '}
              <strong className="text-sm-navy">the only brand that engineers a complete system for each life stage</strong>{' '}
              — Babies & Toddlers, Little Kids, Big Kids, Teens & Adults, Pregnancy, and Orthodontics. That's why{' '}
              <strong className="text-sm-navy">thousands of dental and medical professionals nationwide</strong>{' '}
              trust and recommend SuperMouth — <strong className="text-sm-navy">no one else does this</strong>.
            </p>

            <div className="flex flex-wrap gap-3 mb-5">
              <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">
                Shop All Products →
              </Link>
              <Link href="/systems-overview" className="bg-sm-purple text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity">
                Shop Systems<br />
                <span className="text-xs font-normal opacity-80">Everything you need in one box - Save 15%</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-sm-gray text-xs font-semibold">OR SHOP BY PERSON</span>
              {[
                { label: 'Kids', href: '/collections/shop-all-kids' },
                { label: 'Adults', href: '/collections/ages-13-and-up' },
                { label: 'Orthodontics', href: '/collections/ortho' },
                { label: 'Pregnancy', href: '/collections/pregnancy' },
              ].map(item => (
                <Link key={item.label} href={item.href}
                  className="bg-sm-yellow text-sm-navy font-bold text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — age category cards */}
          <div className="grid grid-cols-2 gap-3">
            {ageCategories.map(cat => (
              <Link key={cat.label} href={cat.href} className={`group relative rounded-2xl overflow-hidden ${cat.bg} p-4 min-h-[220px] flex flex-col justify-between`}>
                <div>
                  <p className="text-xs font-bold text-sm-navy/50 uppercase tracking-wider mb-1">{cat.tag}</p>
                  <h3 className="font-display font-bold text-sm-navy text-base">{cat.label}</h3>
                  <p className="text-xs text-sm-gray mt-1 leading-snug">{cat.desc}</p>
                </div>
                <div className="relative h-24 mt-3">
                  <Image src={cat.img} alt={cat.label} fill className="object-contain object-bottom" />
                </div>
                <span className="bg-sm-yellow text-sm-navy font-bold text-xs px-3 py-1.5 rounded-full inline-block mt-2 self-start">
                  Shop {cat.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            ['~300', 'PATENTS'],
            ['★ 4.8', '10,000+ REVIEWS'],
            ['125,000+', 'FAMILIES'],
            ['EWG #1', 'SAFETY RATING'],
          ].map(([val, label]) => (
            <div key={label} className="bg-sm-navy text-white rounded-2xl p-5 text-center">
              <p className="font-display font-black text-xl">{val}</p>
              <p className="text-xs text-white/60 font-bold tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRESS TICKER */}
      <div className="overflow-hidden py-5 border-y border-sm-navy/10 bg-white">
        <Link href="/in-the-news">
          <div className="ticker-track flex gap-12 whitespace-nowrap" style={{ width: 'max-content' }}>
            {[...pressLogos, ...pressLogos].map((logo, i) => (
              <span key={i} className="text-sm-gray text-sm font-semibold hover:text-sm-navy transition-colors">{logo}</span>
            ))}
          </div>
        </Link>
      </div>

      {/* HOW TO GET STARTED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-8 text-center">how to get started</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: 'https://cdn.supermouth.com/website/SM-website_get_started_1_guide_you.jpg', title: 'Let Us Guide You', desc: 'Take a quick quiz and get a custom plan from our experts — with oral care products tailored to your age, stage, and needs.', cta: 'Take Assessment', href: '/assessment' },
            { img: 'https://cdn.supermouth.com/website/SM-website_get_started_2_shop_systems.jpg', title: 'Shop Systems', desc: 'Embrace revolutionary care with our expert-curated systems, tailored for every age and stage, offering best-in-class options for all budgets.', cta: 'Shop Systems', href: '/systems-overview' },
            { img: 'https://cdn.supermouth.com/website/SM-website_get_started_3_shop_products.jpg', title: 'Shop Products', desc: 'Discover our nearly 200 groundbreaking products designed for all ages. Each item represents the pinnacle of innovation in oral care.', cta: 'Shop Products', href: '/shop-all' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
              <div className="relative h-52 overflow-hidden">
                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 text-sm-navy">{item.title}</h3>
                <p className="text-sm text-sm-gray mb-4 leading-relaxed">{item.desc}</p>
                <Link href={item.href} className="text-sm-purple text-sm font-semibold hover:underline">{item.cta} →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY AGE */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-2 text-center">shop by age</p>
          <p className="text-center text-sm-gray text-sm mb-10">Find the perfect dental care for the whole family!</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group rounded-2xl overflow-hidden bg-sm-peach">
              <div className="relative h-60 overflow-hidden">
                <Image src="https://supermouthcdn.blob.core.windows.net/website/shop_by_age_kids_various_products.jpeg" alt="Kids" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 text-sm-navy">SuperMouth Kids Products</h3>
                <p className="text-sm text-sm-gray leading-relaxed mb-4">From teething to age 12, explore safe, effective, and fun oral care systems powered by kid-approved flavors and beloved SuperMouth Squad characters.</p>
                <Link href="/collections/shop-all-kids" className="bg-sm-yellow text-sm-navy font-bold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity inline-block">Shop All Kids →</Link>
              </div>
            </div>
            <div className="group rounded-2xl overflow-hidden bg-sm-teal-bg">
              <div className="relative h-60 overflow-hidden">
                <Image src="https://supermouthcdn.blob.core.windows.net/website/shop_by_age_adults_vanilla_and_ultim8.jpeg" alt="Adults" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2 text-sm-navy">SuperMouth Teens & Adults Products</h3>
                <p className="text-sm text-sm-gray leading-relaxed mb-4">Advanced oral care solutions for teens and adults — featuring powerful ingredients, sleek designs, and cutting-edge technology.</p>
                <Link href="/collections/ages-13-and-up" className="bg-sm-yellow text-sm-navy font-bold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity inline-block">Shop All Teens & Adults →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm-teal text-xs font-bold uppercase tracking-widest text-center mb-3">Explore Our Custom Oral Care Systems</p>
        <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-4 text-sm-navy">For Every Age and Stage</h2>
        <p className="text-sm-gray text-center text-sm max-w-xl mx-auto mb-12">Delivering safe, effective, and comprehensive solutions across all ages</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {systems.map(sys => (
            <Link key={sys.label} href={sys.href} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-sm-bg">
                <Image src={sys.img} alt={sys.label} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-sm text-sm-navy mb-2">{sys.label}</h3>
                <span className="text-xs text-sm-purple font-semibold">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/systems-overview" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop All Systems
          </Link>
        </div>
      </section>

      {/* S.U.P.E.R. DIFFERENCE */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-4 text-sm-navy">Discover the S.U.P.E.R. Difference</h2>
          <p className="text-sm-gray text-center text-sm mb-12">In oral care</p>
          <div className="space-y-4">
            {superDifference.map((item, i) => (
              <div key={item.letter} className={`flex gap-6 items-center ${i % 2 === 1 ? 'flex-row-reverse' : ''} bg-sm-bg rounded-2xl p-6`}>
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image src={item.img} alt={item.word} fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display font-black text-3xl text-sm-teal">{item.letter}</span>
                    <span className="font-display font-bold text-sm tracking-widest text-sm-navy">{item.word}</span>
                  </div>
                  <p className="text-sm text-sm-gray leading-relaxed">{item.desc}</p>
                  <Link href={item.href} className="text-xs text-sm-purple mt-3 block hover:underline font-semibold">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOVIE CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-4">Our First Family Adventure Movie</p>
        <h2 className="font-display font-black text-3xl md:text-4xl mb-6 text-sm-navy">Now Playing</h2>
        <Link href="/play" className="relative inline-block group">
          <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <Image src="https://cdn.supermouth.com/website/trosm-teaser.jpg" alt="Rise of SuperMouth" width={800} height={450} className="rounded-2xl group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-sm-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-sm-navy ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <Footer />
    </div>
  )
}
