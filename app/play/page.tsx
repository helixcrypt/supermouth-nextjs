import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Play — SuperMouth',
  description: 'Watch Rise of SuperMouth — the first family adventure movie from SuperMouth.',
}

export default function PlayPage() {
  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Now Playing</p>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-4">Rise of SuperMouth</h1>
          <p className="text-sm-gray text-sm max-w-xl mx-auto">Our first family adventure movie — where the SuperMouth Squad saves smiles and the world.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Video placeholder */}
        <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/10 mb-12 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-sm-accent/90 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-sm-navy ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm-gray text-sm">Stream coming soon — check back shortly!</p>
          </div>
        </div>

        {/* About */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-display font-bold text-2xl mb-4">About the Movie</h2>
            <p className="text-sm text-sm-gray leading-relaxed mb-4">
              Rise of SuperMouth is our first original family adventure movie, featuring the beloved SuperMouth Squad — the superhero characters that have inspired kids to love brushing their teeth.
            </p>
            <p className="text-sm text-sm-gray leading-relaxed">
              Join Captain Calcium, Flossie, and the entire Squad as they go on an epic adventure to protect smiles everywhere. Designed to make oral care fun, educational, and genuinely exciting for kids of all ages.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-display font-bold text-2xl mb-4">The SuperMouth Squad</h2>
            {[
              { name: 'Captain Calcium', role: 'Enamel Defender' },
              { name: 'Flossie', role: 'Plaque Fighter' },
              { name: 'Minty', role: 'Breath Guardian' },
              { name: 'Dr. Brush', role: 'Squad Leader' },
            ].map(hero => (
              <div key={hero.name} className="flex items-center gap-4 bg-white/5 rounded-xl p-3">
                <div className="w-10 h-10 bg-sm-accent/20 rounded-full flex items-center justify-center text-lg">🦸</div>
                <div>
                  <p className="font-bold text-sm">{hero.name}</p>
                  <p className="text-xs text-sm-gray">{hero.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-sm-accent/10 border border-sm-accent/20 rounded-2xl p-10 text-center">
          <h3 className="font-display font-bold text-2xl mb-2">Make Brushing an Adventure</h3>
          <p className="text-sm-gray text-sm mb-6">Shop the SuperMouth Squad products and bring the characters to life at home.</p>
          <Link href="/collections/shop-all-kids" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop Kids Products →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
