import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Giving Back — SuperMouth',
  description: 'SuperMouth\'s philanthropic mission — bringing oral care to underserved communities worldwide.',
}

export default function PhilanthropyPage() {
  return (
    <>
      <section className="bg-sm-dark border-b border-white/10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Our Mission</p>
          <h1 className="font-display font-black text-4xl md:text-6xl mb-6">Giving Back</h1>
          <p className="text-sm-gray text-sm max-w-xl mx-auto">
            Dental disease is the #1 chronic disease in children worldwide — and it's over 90% preventable. We're on a mission to change that.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
              Every purchase helps bring oral care to those who need it most.
            </h2>
            <div className="space-y-4 text-sm text-sm-gray leading-relaxed">
              <p>
                We believe every child deserves access to safe, effective oral care — regardless of where they're born or what resources their family has. Dental disease causes unnecessary pain, missed school days, and lifelong health consequences for millions of children who simply don't have access to the right products and education.
              </p>
              <p>
                A portion of every SuperMouth purchase goes toward programs that bring oral care education, products, and professional services to underserved communities across the country and around the world.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: '90%+', label: 'of dental disease is preventable' },
              { stat: '#1', label: 'chronic disease in children globally' },
              { stat: '125K+', label: 'families already impacted' },
              { stat: '∞', label: 'commitment to change' },
            ].map(item => (
              <div key={item.label} className="bg-white/5 rounded-2xl p-6 text-center">
                <p className="font-display font-black text-3xl text-sm-accent">{item.stat}</p>
                <p className="text-xs text-sm-gray mt-2 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '🏫', title: 'School Programs', desc: 'We partner with schools in underserved communities to bring oral health education and product donations to kids who need them most.' },
            { icon: '🌍', title: 'Global Outreach', desc: 'Working with international health organizations to provide oral care products and education in developing regions around the world.' },
            { icon: '👨‍⚕️', title: 'Professional Support', desc: 'Equipping dental professionals in community health clinics with products and resources to better serve patients with limited means.' },
          ].map(item => (
            <div key={item.title} className="bg-white/5 rounded-2xl p-6">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-sm-gray leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-sm-accent/10 border border-sm-accent/20 rounded-2xl p-10 text-center">
          <h2 className="font-display font-black text-3xl mb-4">Shop with Purpose</h2>
          <p className="text-sm-gray text-sm max-w-xl mx-auto mb-8">
            Every SuperMouth purchase is a vote for better oral health — for your family and for families everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop Now →
            </Link>
            <Link href="/our-story" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              Our Story
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
