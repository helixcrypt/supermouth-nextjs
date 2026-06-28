import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Play — SuperMouth',
  description: 'Watch The Rise of SuperMouth — the first family adventure movie from SuperMouth. Now streaming free on YouTube.',
}

export default function PlayPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">

      {/* HERO */}
      <section className="bg-sm-navy text-white py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-3">Now Streaming Free</p>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-4">The Rise of SuperMouth</h1>
          <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
            The first family adventure movie from SuperMouth — where superhero dentists battle villainous candymaker Cavitar to protect smiles across the galaxy.
          </p>
        </div>
      </section>

      {/* FULL MOVIE — YouTube embed */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
          <iframe
            src="https://www.youtube.com/embed/hr2CVNz2LyI"
            title="The Rise of SuperMouth — Official Movie"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Promo code callout */}
        <div className="mt-6 bg-sm-yellow rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-display font-black text-sm-navy text-sm">Hidden Promo Code in the Movie!</p>
            <p className="text-sm-navy/70 text-xs mt-0.5">Watch for the name of Cavitar&apos;s candy — that word is your promo code for 10% off all SuperMouth products.</p>
          </div>
          <Link href="/shop-all" className="bg-sm-navy text-white font-bold px-5 py-2.5 rounded-full text-xs whitespace-nowrap hover:opacity-90 transition-opacity">
            Shop Now
          </Link>
        </div>
      </section>

      {/* ABOUT THE MOVIE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="font-display font-black text-xl text-sm-navy mb-4">About the Movie</h2>
            <p className="text-sm text-sm-gray leading-relaxed mb-3">
              In this family adventure, we meet the SuperMouth Squad — a team of superhero dentists and their comical sidekicks — as they attempt to stop villainous candymaker Cavitar from spreading Sugar Bugs to ruin teeth throughout the galaxy.
            </p>
            <p className="text-sm text-sm-gray leading-relaxed mb-3">
              This hybrid live-action animated film is ultimately about two kids taking to heart the lesson from their late father about using the power of smiles to find their inner strength and reconnect as a family.
            </p>
            <p className="text-sm text-sm-gray leading-relaxed">
              World Premiere at the TCL Chinese Theatres at the 26th annual Dances With Films Festival in Los Angeles. Now streaming free worldwide on YouTube.
            </p>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs font-bold text-sm-gray uppercase tracking-widest mb-2">Credits</p>
              <p className="text-xs text-sm-gray leading-relaxed">Executive Produced by Dr. Kami Hoss &amp; Richard Tiland. Written &amp; Directed by Daniel Robert Cohn. Produced by Evan J. Cholfin.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <h2 className="font-display font-black text-xl text-sm-navy mb-4">The SuperMouth Squad</h2>
            <p className="text-sm text-sm-gray leading-relaxed mb-5">
              Born on Tooth Star Planet, Dr. HaveOneSuperSmile (Dr. H.O.S.S.) was destined to be a Super Dentist. Together with his companion Turbo — a spacecraft — they zoom around the galaxy fighting cavities and crooked teeth.
            </p>
            <div className="space-y-3">
              {[
                { name: 'Dr. HaveOneSuperSmile', role: 'Dr. H.O.S.S. — Squad Leader & Super Dentist', color: 'bg-sm-teal-bg' },
                { name: 'Cavitar', role: 'The Villain — Candymaker spreading Sugar Bugs', color: 'bg-red-50' },
                { name: 'Turbo', role: 'Dr. H.O.S.S.\'s spacecraft companion', color: 'bg-blue-50' },
                { name: 'The SuperMouth Squad', role: 'Superhero dentists & comical sidekicks', color: 'bg-sm-peach' },
              ].map(char => (
                <div key={char.name} className={`${char.color} rounded-xl px-4 py-3 flex items-center gap-3`}>
                  <span className="text-xl flex-shrink-0">🦸</span>
                  <div>
                    <p className="font-bold text-sm text-sm-navy">{char.name}</p>
                    <p className="text-xs text-sm-gray">{char.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER */}
      <section className="bg-sm-navy py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-3">Official Trailer</p>
          <h2 className="font-display font-black text-2xl text-white mb-8">Watch the Trailer</h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/Wu4Wwk1V2-Q"
              title="The Rise of SuperMouth — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* WHAT MAKES US S.U.P.E.R. teaser */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-2">The World of SuperMouth</p>
          <h2 className="font-display font-black text-2xl md:text-3xl text-sm-navy">
            Imagine a world where brush time is adventure time.
          </h2>
          <p className="text-sm-gray text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Toothpaste that tastes like strawberry ice-cream. Toothbrushes that play a tune. Fearless dragons in augmented reality. Menacing Sugar Bugs in comic books. Welcome to SuperMouth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎬', label: 'Movies', desc: 'Original family adventure films featuring the SuperMouth Squad' },
            { icon: '🎵', label: 'Music', desc: 'Original songs and a music video from The Rise of SuperMouth' },
            { icon: '📱', label: 'AR App', desc: 'Augmented reality experiences that bring characters to life' },
            { icon: '📚', label: 'Comic Books', desc: 'Adventures featuring Sugar Bugs and your favorite characters' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl p-5 text-center shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display font-bold text-sm text-sm-navy mb-2">{item.label}</h3>
              <p className="text-xs text-sm-gray leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sm-teal-bg py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-black text-2xl md:text-3xl text-sm-navy mb-4">
            Make Brushing an Adventure at Home
          </h2>
          <p className="text-sm-gray text-sm mb-8 leading-relaxed">
            Shop the SuperMouth Squad products — dentist-invented oral care systems that make brush time fun for every age and stage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/collections/shop-all-kids" className="bg-sm-yellow text-sm-navy font-bold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop Kids Products
            </Link>
            <Link href="/systems-overview" className="bg-sm-navy text-white font-bold px-7 py-3.5 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Systems
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
