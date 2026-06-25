import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Our Story — SuperMouth',
  description: 'How world-class dentists and medical experts came together to revolutionize oral care for every family.',
}

const differentiators = [
  { num: '01', title: 'Education', desc: 'Educating families and professionals about the vital link between oral health and overall health, and what ingredients really matter.' },
  { num: '02', title: 'Tailored Products', desc: 'Designing products for each stage of life, from pregnancy to adulthood — because a one-size-fits-all approach simply doesn\'t work.' },
  { num: '03', title: 'Uncompromising Quality', desc: 'Offering the best products in their class, free from harmful ingredients — no GMOs, no SLS, no artificial colors, sweeteners, or preservatives.' },
  { num: '04', title: 'Ingredient-Obsessed', desc: 'Ensuring every ingredient is safe, effective, non-GMO, and used in the right concentration. We study everything so you don\'t have to.' },
  { num: '05', title: 'Fun and Engaging', desc: 'Creating beautifully designed and enjoyable products — because oral care should be something families look forward to, not dread.' },
  { num: '06', title: 'Eco-Friendly', desc: 'Our recyclable packaging transforms into fun toys, and we use sustainable materials and renewable energy wherever possible.' },
  { num: '07', title: 'Attention to Detail', desc: 'Obsessing over every little detail to enhance the user experience — from bristle design to flavor profiles to packaging.' },
  { num: '08', title: 'Ecosystem of Superheroes', desc: 'Developing an entire ecosystem for kids featuring superheroes in movies, comics, and AR to make oral care a genuine adventure.' },
  { num: '09', title: 'Revolutionary Designs', desc: 'Innovating advanced features like our patented SuperBristles that remove 30–60X more plaque than conventional brushes.' },
  { num: '10', title: 'Commitment to Innovation', desc: 'Continuously researching and staying ahead of scientific advancements — nearly 300 patents and counting.' },
]

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative h-72 md:h-96 w-full">
          <Image
            src="https://cdn.supermouth.com/website/SuperMouth_Hero_image_our_story.png"
            alt="Our Story"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sm-navy/60 via-transparent to-sm-navy" />
          <div className="absolute inset-0 flex items-end pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-2">Who We Are</p>
              <h1 className="font-display font-black text-4xl md:text-6xl">Our Story</h1>
            </div>
          </div>
        </div>
      </section>

      {/* The Spark */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">The Spark of Inspiration</p>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
              The oral care products we wanted to recommend simply did not exist.
            </h2>
            <div className="space-y-4 text-sm-gray text-sm leading-relaxed">
              <p>
                At the heart of SuperMouth is a collective vision shared by world-class dental and medical experts, united by a desire to challenge the status quo of oral care. This story begins in the country's leading dental practices, where our team of general dentists, hygienists, pediatric dentists, and orthodontists realized that the oral care products we wanted to recommend simply did not exist.
              </p>
              <p>
                Patients frequently asked, "What toothpaste should I use?" "Is fluoride safe?" "Is mouthwash good for you?" Our answers were often vague because, despite our rigorous education and training, dental professionals receive little to no education about the oral care products we recommend daily. Our knowledge was as limited as that of the general public — until a collective realization changed everything.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_1_400x500.png"
              alt="Dr. Hoss, SuperMouth Founder"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* A Collective Realization */}
      <section className="bg-white/5 section-divider py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-72 rounded-2xl overflow-hidden order-2 md:order-1">
              <Image
                src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_2_500x300.png"
                alt="A Collective Realization"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">A Collective Realization</p>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                For the first time, we felt the worry every parent experiences.
              </h2>
              <div className="space-y-4 text-sm-gray text-sm leading-relaxed">
                <p>
                  As our team members began having children of their own, we faced a new kind of challenge. When our own kids' first baby teeth started to come in, we found ourselves at a loss. What toothpaste should we use? Is there a safe and effective alternative to fluoride? What ingredients should we avoid?
                </p>
                <p>
                  For the first time, we felt the worry and confusion every parent experiences when trying to do what's best for their child. This collective realization among our team was the catalyst for our decades-long journey into the world of oral care products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovering the Truth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Discovering the Truth</p>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
              Dental disease is over 90% preventable — with the right products.
            </h2>
            <div className="space-y-4 text-sm-gray text-sm leading-relaxed">
              <p>
                We knew dental disease was the number one disease in the world, but we didn't know how to fix it. We assumed other manufacturers knew what they were doing, but as we dug deeper, we discovered they mostly don't. Without formal education on what makes a product safe or effective, the responsibility for the science behind these products had fallen through the cracks.
              </p>
              <p>
                This has led to oral disease becoming the most common chronic illness in children and the number one disease globally. Yet, it's over 90% preventable with the right products.
              </p>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_3_400x400.png"
              alt="Discovering the Truth"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Creating SuperMouth */}
      <section className="bg-sm-blue/20 border-y border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_4_400x400.png"
                alt="Creating SuperMouth"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Creating SuperMouth</p>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                Determined to make a difference, we built SuperMouth.
              </h2>
              <div className="space-y-4 text-sm-gray text-sm leading-relaxed">
                <p>
                  Our mission was clear: to revolutionize oral health with safe, effective, and fun products. We knew we had to customize oral care so that a one-year-old with no cavities, a ten-year-old with lots of cavities, a teenager with braces, a pregnant mother, and a dad with a history of gum disease could each get products tailored to their individual needs.
                </p>
                <p>
                  We gathered world-class dentists and medical experts, along with children's entertainment and design experts, to build revolutionary products in each category. This commitment is evident in our 200+ products and nearly 300 patents.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[['200+', 'Products'], ['~300', 'Patents'], ['125K+', 'Families']].map(([val, label]) => (
                  <div key={label} className="text-center bg-white/5 rounded-xl p-4">
                    <p className="font-display font-black text-2xl text-sm-accent">{val}</p>
                    <p className="text-xs text-sm-gray mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-3">Here's What Sets Us Apart</p>
          <h2 className="font-display font-black text-3xl md:text-4xl">10 Ways We're Different</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {differentiators.map(item => (
            <div key={item.num} className="flex gap-5 bg-white/5 rounded-2xl p-6 hover:bg-white/8 transition-colors">
              <span className="font-display font-black text-3xl text-sm-accent/30 flex-shrink-0 leading-none">
                {item.num}
              </span>
              <div>
                <h3 className="font-display font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-sm-gray leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-sm-accent/10 border-y border-sm-accent/20 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm-accent text-xs font-bold uppercase tracking-widest mb-4">Our Promise</p>
          <h2 className="font-display font-black text-3xl md:text-4xl mb-6">
            We're not just selling toothpaste. We're transforming oral care.
          </h2>
          <p className="text-sm-gray text-sm leading-relaxed mb-8">
            Our products are used by our own families, and we're dedicated to ensuring they're the best for yours too. By trying our products, you can discover why thousands of dental professionals use SuperMouth for themselves and recommend them to their patients. Together, we can make dental disease a thing of the past.
          </p>
          <p className="text-sm-white/60 text-sm italic mb-10">
            Warm regards, <br />
            <strong className="text-white not-italic">The SuperMouth Founders</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-accent text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
            <Link href="/what-makes-us-super" className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              What Makes Us S.U.P.E.R.
            </Link>
          </div>
        </div>
      </section>

      {/* For Dental Pros CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-sm-gray text-sm mb-3">Are you a dental professional?</p>
        <a
          href="https://supermouthpro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm-accent font-semibold hover:underline text-sm"
        >
          Join SuperMouth Pro → Thousands of dental professionals already recommend us.
        </a>
      </section>

      <Footer />
    </>
  )
}
