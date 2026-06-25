import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Articles & Guides — SuperMouth',
  description: 'Expert oral care education from the dentists behind SuperMouth — guides, tips, and research-backed insights.',
}

const ARTICLES = [
  { title: 'A Guide to Understanding Oral Care Ingredient Safety', slug: 'a-guide-to-understanding-oral-care-ingredient-safety', category: 'Ingredients', readTime: '8 min', excerpt: 'Not all oral care ingredients are created equal. Learn what to look for — and what to avoid — when choosing products for your family.' },
  { title: 'Beyond Brushing & Flossing: A Comprehensive Guide to Supercharging Your Oral Care Routine', slug: 'beyond-brushing-flossing-a-comprehensive-guide-to-supercharging-your-oral-care-routine', category: 'Routine', readTime: '10 min', excerpt: 'Brushing twice a day is just the beginning. Discover the complete oral care routine that leading dentists recommend for optimal health.' },
  { title: 'Taking the Bore and Chore Out of Brush Time', slug: 'taking-the-bore-and-chore-of-brush-time', category: 'Kids', readTime: '5 min', excerpt: 'Getting kids to brush their teeth doesn\'t have to be a battle. Here are the strategies that actually work — backed by pediatric dentists.' },
  { title: 'Are Your Oral Care Products Actually Working?', slug: 'are-your-oral-care-products-actually-working', category: 'Education', readTime: '7 min', excerpt: 'Most people assume their toothpaste and mouthwash are doing their job. But are they? Here\'s how to find out — and what to do if they\'re not.' },
  { title: 'Who\'s Claiming Your Oral Care Products Work? Because It Matters.', slug: 'who-s-claiming-your-oral-care-products-work-because-it-matters-1', category: 'Education', readTime: '6 min', excerpt: 'Marketing claims are everywhere in oral care. Learn how to separate science from spin when evaluating products for your family.' },
  { title: 'Your Ultimate Guide to Oral Care During Orthodontic Treatment', slug: 'your-ultimate-guide-to-oral-care-during-orthodontic-treatment', category: 'Orthodontics', readTime: '9 min', excerpt: 'Braces and aligners create unique oral care challenges. This complete guide covers everything you need to protect your smile during treatment.' },
  { title: 'The Link Between Oral Health and Overall Health', slug: 'oral-health-overall-health', category: 'Health', readTime: '8 min', excerpt: 'Research increasingly shows that what happens in your mouth doesn\'t stay in your mouth. Here\'s what the science says about the oral-systemic connection.' },
  { title: 'Nano-Hydroxyapatite vs. Fluoride: What\'s the Difference?', slug: 'nano-hydroxyapatite-vs-fluoride', category: 'Ingredients', readTime: '7 min', excerpt: 'Both remineralize enamel — but they work differently. A deep dive into the science behind these two leading approaches to cavity prevention.' },
  { title: 'Oral Care During Pregnancy: What\'s Safe and What to Avoid', slug: 'oral-care-pregnancy-safe', category: 'Pregnancy', readTime: '6 min', excerpt: 'Pregnancy changes everything — including your oral health. Here\'s what expecting mothers need to know about keeping their smile healthy and safe.' },
]

const CATEGORIES = ['All', 'Ingredients', 'Routine', 'Kids', 'Education', 'Orthodontics', 'Health', 'Pregnancy']

export default function LearnPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const activeCategory = searchParams?.category || 'All'
  const filtered = activeCategory === 'All'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory)

  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Expert Knowledge</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Articles & Guides</h1>
          <p className="text-sm-gray text-sm max-w-xl">
            Research-backed oral care education from the dentists and medical experts behind SuperMouth.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <a
              key={cat}
              href={cat === 'All' ? '/learn' : `/learn?category=${cat}`}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-sm-accent text-sm-navy border-sm-accent'
                  : 'border-white/20 text-sm-gray hover:border-sm-accent hover:text-sm-accent'
              }`}
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group bg-white/5 rounded-2xl p-6 hover:bg-white/8 transition-all hover:-translate-y-1 border border-transparent hover:border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-sm-accent bg-sm-accent/10 px-2 py-1 rounded-full">{article.category}</span>
                <span className="text-xs text-sm-gray">{article.readTime} read</span>
              </div>
              <h2 className="font-display font-bold text-base leading-snug mb-3 group-hover:text-sm-accent transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-sm-gray leading-relaxed line-clamp-3">{article.excerpt}</p>
              <span className="text-xs text-sm-accent mt-4 block">Read More →</span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
