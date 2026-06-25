import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Protecting the Planet — SuperMouth',
  description: 'SuperMouth\'s commitment to sustainability — eco-friendly packaging, renewable energy, and sustainable materials.',
}

export default function SustainabilityPage() {
  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Our Commitment</p>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-6">Protecting the Planet</h1>
          <p className="text-sm-gray text-sm max-w-xl mx-auto">
            We believe healthy smiles and a healthy planet go hand in hand. Every decision we make considers our impact on the environment.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '♻️', title: 'Recyclable Packaging', desc: 'Our packaging is designed to be recycled or repurposed — many pieces transform into fun toys for kids, giving every box a second life.' },
            { icon: '⚡', title: 'Renewable Energy', desc: 'We use renewable energy sources in our manufacturing and operations wherever possible, reducing our carbon footprint at every step.' },
            { icon: '🌱', title: 'Sustainable Materials', desc: 'We source sustainable materials and continuously work to reduce plastic use, choosing alternatives that are kinder to the environment.' },
            { icon: '🧪', title: 'Clean Ingredients', desc: 'No harsh chemicals means no harsh runoff. Our water-safe formulas are as gentle on ecosystems as they are on your family.' },
            { icon: '📦', title: 'Minimal Waste', desc: 'We design packaging with minimal waste in mind — right-sized boxes, no unnecessary fillers, and materials that can be reused.' },
            { icon: '🔬', title: 'Responsible Testing', desc: 'We\'re committed to responsible, ethical testing practices with no animal testing — ever.' },
          ].map(item => (
            <div key={item.title} className="bg-white/5 rounded-2xl p-6 hover:bg-white/8 transition-colors">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-sm-gray leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-sm-green/10 border border-sm-green/20 rounded-2xl p-10 text-center">
          <h2 className="font-display font-black text-3xl mb-4">A Healthier Future Starts in the Mouth</h2>
          <p className="text-sm-gray text-sm max-w-xl mx-auto mb-8">
            We're on a mission to make oral care better for families and for the planet. Every purchase supports a company that cares about both.
          </p>
          <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Shop Sustainably →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
