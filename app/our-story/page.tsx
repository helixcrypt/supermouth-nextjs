import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Our Story — SuperMouth',
  description: 'How world-class dentists and medical experts came together to revolutionize oral care for every family.',
}

const differentiators = [
  { num: '1', title: 'Education', desc: 'Educating families and professionals about the vital link between oral health and overall health, and what ingredients really matter.' },
  { num: '2', title: 'Tailored Products', desc: 'Designing products for each stage of life, from pregnancy to adulthood.' },
  { num: '3', title: 'Uncompromising Quality', desc: 'Offering the best products in their class, free from harmful ingredients.' },
  { num: '4', title: 'Ingredient-Obsessed', desc: 'Ensuring every ingredient is safe, effective, non-GMO, and used in the right concentration.' },
  { num: '5', title: 'Fun and Engaging', desc: 'Creating beautifully designed and enjoyable products.' },
  { num: '6', title: 'Eco-Friendly', desc: 'Our recyclable packaging transforms into fun toys, and we use sustainable materials and renewable energy.' },
  { num: '7', title: 'Attention to Detail', desc: 'Obsessing over every little detail to enhance the user experience.' },
  { num: '8', title: 'Ecosystem of Superheroes', desc: 'Developing an entire ecosystem for kids, featuring superheroes in various media to make oral care fun.' },
  { num: '9', title: 'Revolutionary Designs', desc: 'Innovating advanced features like our revolutionary bristle designs for children and adults.' },
  { num: '10', title: 'Commitment to Innovation', desc: 'Continuously researching and staying ahead of scientific advancements.' },
]

export default function OurStoryPage() {
  return (
    <div className="bg-sm-navy text-white">
      {/* Hero — full width, no cropping */}
      <section className="relative w-full">
        {/* Desktop hero */}
        <div className="hidden md:block w-full">
          <Image
            src="https://cdn.supermouth.com/website/SuperMouth_Hero_image_our_story.png"
            alt="Our Story"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        {/* Mobile hero */}
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/SuperMouth_Hero_image_our_story_mobile.png"
            alt="Our Story"
            width={768}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute bottom-6 left-6 md:left-12">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-1">WHO WE ARE</p>
          <h1 className="font-display font-black text-4xl md:text-6xl text-white">Our Story</h1>
        </div>
      </section>

      {/* The Spark */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-4">THE SPARK OF INSPIRATION</p>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
              The oral care products we wanted to recommend simply did not exist.
            </h2>
            <div className="space-y-4 text-white/70 text-sm leading-relaxed">
              <p>
                At the heart of SuperMouth is a collective vision shared by world-class dental and medical experts, united by a desire to challenge the status quo of oral care. This story begins in the country's leading dental practices, where our team of general dentists, hygienists, pediatric dentists, and orthodontists realized that the oral care products we wanted to recommend simply did not exist. The market's offerings did not meet our high standards for safety, efficacy, or patient satisfaction.
              </p>
              <p>
                Patients frequently asked, "What toothpaste should I use?" "Is fluoride safe?" "Is mouthwash good for you?" Our answers were often vague because, despite our rigorous education and training, dental professionals receive little to no education about the oral care products we recommend daily. People are often surprised to learn this. Our knowledge was as limited as that of the general public until a collective realization changed everything.
              </p>
            </div>
          </div>
          {/* Image: 400x500 — portrait */}
          <div className="w-full max-w-sm mx-auto">
            <Image
              src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_1_400x500.png"
              alt="Dr. Hoss, SuperMouth Founder"
              width={400}
              height={500}
              className="w-full h-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* A Collective Realization */}
      <section className="bg-sm-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image: 500x300 — landscape */}
            <div className="w-full">
              <Image
                src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_2_500x300.png"
                alt="A Collective Realization"
                width={500}
                height={300}
                className="w-full h-auto rounded-2xl object-contain"
              />
            </div>
            <div>
              <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-4">A COLLECTIVE REALIZATION</p>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                For the first time, we felt the worry every parent experiences.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                As our team members began having children of their own, we faced a new kind of challenge. When our own kids' first baby teeth started to come in, we found ourselves at a loss. What toothpaste should we use? Is there a safe and effective alternative to fluoride for them? What ingredients should we avoid? We didn't know. For the first time, we felt the worry and confusion every parent experiences when trying to do what's best for their child. This collective realization among our team was the catalyst for our decades-long journey into the world of oral care products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Discovering the Truth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-4">DISCOVERING THE TRUTH</p>
            <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
              Dental disease is over 90% preventable — with the right products.
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              We knew dental disease was the number one disease in the world, but we didn't know how to fix it. We assumed other manufacturers knew what they were doing, but as we dug deeper, we discovered they mostly don't. Without formal education on what makes a product safe or effective, the responsibility for the science behind these products had fallen through the cracks. This has led to oral disease becoming the most common chronic illness in children and the number one disease globally. Yet, it's over 90% preventable with the right products.
            </p>
          </div>
          {/* Image: 400x400 — square */}
          <div className="w-full max-w-sm mx-auto">
            <Image
              src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_3_400x400.png"
              alt="Discovering the Truth"
              width={400}
              height={400}
              className="w-full h-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* Creating SuperMouth */}
      <section className="bg-sm-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image: 400x400 — square */}
            <div className="w-full max-w-sm mx-auto">
              <Image
                src="https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_4_400x400.png"
                alt="Creating SuperMouth"
                width={400}
                height={400}
                className="w-full h-auto rounded-2xl object-contain"
              />
            </div>
            <div>
              <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-4">CREATING SUPERMOUTH</p>
              <h2 className="font-display font-black text-3xl md:text-4xl mb-6 leading-tight">
                Determined to make a difference, we created SuperMouth.
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Our mission was clear: to revolutionize oral health with safe, effective, and fun products. We also knew we had to customize oral care so that a one-year-old with no cavities, a ten-year-old with lots of cavities, a teenager with braces, a pregnant mother, and a dad with a history of gum disease could each get the right products tailored to their individual needs. We made a commitment to study and research everything about oral care, becoming world-leading experts in this field. To launch the company, we gathered world-class dentists and medical experts, along with children's entertainment and design experts, to build revolutionary products in each category. This commitment is evident in our 200+ products and nearly 300 patents.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[['200+', 'Products'], ['~300', 'Patents'], ['125K+', 'Families']].map(([val, label]) => (
                  <div key={label} className="text-center bg-white/10 rounded-xl p-4">
                    <p className="font-display font-black text-2xl text-sm-yellow">{val}</p>
                    <p className="text-xs text-white/60 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="font-display font-black text-3xl md:text-4xl mb-3 text-center">Here's What Sets Us Apart</h2>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {differentiators.map(item => (
            <div key={item.num} className="flex gap-5 bg-sm-dark rounded-2xl p-6">
              <span className="font-display font-black text-3xl text-sm-yellow/30 flex-shrink-0 leading-none w-8">{item.num}.</span>
              <div>
                <h3 className="font-display font-bold text-base mb-1 text-white">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-sm-dark py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-black text-3xl md:text-4xl mb-6">Our Promise</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            We're not just selling toothpaste or toothbrushes. We're here to transform oral care. Our products are used by our own families, and we're dedicated to ensuring they're the best for yours too. By trying our products, you can discover why thousands of dental professionals use SuperMouth products for themselves and their own families and recommend them to their patients. Together, we can make dental disease a thing of the past and bring healthy, happy smiles to every family.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Join us on this journey. Let's revolutionize oral care, one super mouth at a time.
          </p>
          <p className="text-white/60 text-sm italic mb-8">
            Warm regards,<br />
            <strong className="text-white not-italic">The SuperMouth Founders</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
            <Link href="/what-makes-us-super" className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors">
              What Makes Us S.U.P.E.R.
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
