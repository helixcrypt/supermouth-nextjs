import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'In the News — SuperMouth',
  description: 'SuperMouth as seen in USA Today, CNN, Forbes, WebMD, Parents Magazine, and more.',
}

const PRESS = [
  { name: 'USA Today', category: 'National News' },
  { name: 'CNN', category: 'National News' },
  { name: 'Forbes', category: 'Business' },
  { name: 'WebMD', category: 'Health' },
  { name: 'Healthline', category: 'Health' },
  { name: 'Parents Magazine', category: 'Family' },
  { name: 'Good Housekeeping', category: 'Lifestyle' },
  { name: 'Today Show', category: 'National News' },
  { name: 'Prevention', category: 'Health' },
  { name: 'Entrepreneur', category: 'Business' },
  { name: 'Huffington Post', category: 'News' },
  { name: 'Allure', category: 'Beauty' },
  { name: 'Scary Mommy', category: 'Parenting' },
  { name: 'Health Magazine', category: 'Health' },
  { name: 'Bustle', category: 'Lifestyle' },
  { name: 'Business Insider', category: 'Business' },
  { name: 'BuzzFeed', category: 'Lifestyle' },
  { name: 'Fox News', category: 'National News' },
  { name: 'Refinery29', category: 'Beauty' },
  { name: 'Cosmopolitan', category: 'Beauty' },
  { name: 'Seventeen', category: 'Teen' },
  { name: 'PopSugar', category: 'Lifestyle' },
  { name: "Woman's World", category: 'Lifestyle' },
  { name: 'Dentistry Today', category: 'Professional' },
  { name: 'Inside Edition', category: 'National News' },
  { name: 'MSN', category: 'News' },
  { name: "Men's Journal", category: 'Lifestyle' },
  { name: 'NBC', category: 'National News' },
  { name: 'New Beauty', category: 'Beauty' },
  { name: 'CBS', category: 'National News' },
  { name: 'ABC', category: 'National News' },
  { name: 'Well+Good', category: 'Wellness' },
  { name: 'Tamron Hall', category: 'TV' },
  { name: 'US News', category: 'National News' },
  { name: 'Indy Week', category: 'News' },
  { name: 'CNET', category: 'Technology' },
]

const categories = ['All', ...Array.from(new Set(PRESS.map(p => p.category)))]

export default function InTheNewsPage() {
  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Media Coverage</p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-4">In the News</h1>
          <p className="text-sm-gray text-sm max-w-xl mx-auto">
            SuperMouth has been featured by the world's leading media outlets — from national TV to the most trusted health publications.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 text-center">
          {[['36+', 'Media Outlets'], ['125K+', 'Families Reached'], ['★ 4.8', '10,000+ Reviews']].map(([val, label]) => (
            <div key={label} className="bg-white/5 rounded-2xl p-6">
              <p className="font-display font-black text-3xl text-sm-accent">{val}</p>
              <p className="text-xs text-sm-gray mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Press grid */}
        <h2 className="font-display font-bold text-2xl mb-8">As Seen In</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {PRESS.map(outlet => (
            <div key={outlet.name} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/8 hover:border-sm-accent/30 transition-all">
              <p className="font-bold text-sm text-white/80">{outlet.name}</p>
              <p className="text-xs text-sm-gray mt-1">{outlet.category}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-sm-accent/10 border border-sm-accent/20 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl mb-2">Press Inquiries</h3>
          <p className="text-sm-gray text-sm mb-6">Interested in featuring SuperMouth in your publication or show?</p>
          <Link href="/contact" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Contact Our Press Team →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
