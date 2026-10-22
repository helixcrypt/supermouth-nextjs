import Image from 'next/image'
import Footer from '@/components/Footer'
import { Page, Hero, Script, CORAL, GOLD } from '@/components/about/ui'

export const metadata = {
  title: 'Our Story — SuperMouth',
  description: 'How world-class dentists and medical experts came together to revolutionize oral care for every family.',
}

const apart = [
  ['Education', 'Educating families and professionals about the vital link between oral health and overall health, and what ingredients really matter.'],
  ['Tailored Products', 'Designing products for each stage of life, from pregnancy to adulthood.'],
  ['Uncompromising Quality', 'Offering the best products in their class, free from harmful ingredients.'],
  ['Ingredient-Obsessed', 'Ensuring every ingredient is safe, effective, non-GMO, and used in the right concentration.'],
  ['Fun and Engaging', 'Creating beautifully designed and enjoyable products.'],
  ['Eco-Friendly', 'Our recyclable packaging transforms into fun toys, and we use sustainable materials and renewable energy.'],
  ['Attention to Detail', 'Obsessing over every little detail to enhance the user experience.'],
  ['Ecosystem of Superheroes', 'Developing an entire ecosystem for kids, featuring superheroes in various media to make oral care fun.'],
  ['Revolutionary Designs', 'Innovating advanced features like our revolutionary bristle designs for children and adults.'],
  ['Commitment to Innovation', 'Continuously researching and staying ahead of scientific advancements.'],
]

const H = ({ children, color = CORAL, size = 'text-[32px] md:text-[36px]' }: { children: React.ReactNode; color?: string; size?: string }) => (
  <h2 className={`${size} leading-10`}><Script color={color}>{children}</Script></h2>
)

export default function OurStoryPage() {
  return (
    <Page>
      <Hero bg="#8DE0D4" img="/about/story-SuperMouth_Hero_image_our_story.jpg" alt="SuperMouth tooth on a stack of books" contentClass="lg:pl-[372px]">
        <h1 className="text-[30px] leading-9 font-bold">Our <Script color="#fff" className="text-[36px]">Story</Script></h1>
      </Hero>

      {/* The Spark of Inspiration */}
      <section className="max-w-[1280px] mx-auto lg:px-0 grid lg:grid-cols-[400px_1fr] gap-10">
        <Image src="/about/story-SuperMouth_our_story_page_image_1_400x500.jpg" alt="Image of Dr. Hoss" width={400} height={500} className="w-full max-w-[400px] h-auto mx-auto lg:mx-0" />
        <div className="px-4 lg:pl-0 lg:pr-6 pt-2 lg:pt-10">
          <H>The Spark of Inspiration</H>
          <p className="mt-6 text-[18px] md:text-[20px] leading-7">At the heart of SuperMouth is a collective vision shared by world-class dental and medical experts, united by a desire to challenge the status quo of oral care. This story begins in the country’s leading dental practices, where our team of general dentists, hygienists, pediatric dentists, and orthodontists realized that the oral care products we wanted to recommend simply did not exist. The market’s offerings did not meet our high standards for safety, efficacy, or patient satisfaction.</p>
          <p className="mt-4 text-[18px] md:text-[20px] leading-7">Patients frequently asked, “What toothpaste should I use?” “Is fluoride safe?” “Is mouthwash good for you?” Our answers were often vague because, despite our rigorous education and training, dental professionals receive little to no education about the oral care products we recommend daily. People are often surprised to learn this. Our knowledge was as limited as that of the general public until a collective realization changed everything.</p>
        </div>
      </section>

      {/* A Collective Realization */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-6 pt-10 grid lg:grid-cols-[1fr_500px] gap-10 items-center">
        <div>
          <H>A Collective Realization</H>
          <p className="mt-6 text-[18px] md:text-[20px] leading-7 max-w-[720px]">As our team members began having children of their own, we faced a new kind of challenge. When our own kids’ first baby teeth started to come in, we found ourselves at a loss. What toothpaste should we use? Is there a safe and effective alternative to fluoride for them? What ingredients should we avoid? We didn’t know. For the first time, we felt the worry and confusion every parent experiences when trying to do what’s best for their child. This collective realization among our team was the catalyst for our decades-long journey into the world of oral care products.</p>
        </div>
        <Image src="/about/story-SuperMouth_our_story_page_image_2_500x300.jpg" alt="Collective Realization" width={500} height={300} className="w-full max-w-[500px] h-auto mx-auto" />
      </section>

      {/* Discovering the Truth */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-0 py-10 grid lg:grid-cols-[400px_1fr] gap-10 items-center">
        <Image src="/about/story-SuperMouth_our_story_page_image_3_400x400.jpg" alt="Discovering the Truth" width={400} height={400} className="w-full max-w-[400px] h-auto mx-auto lg:mx-0 order-2 lg:order-1" />
        <div className="lg:pr-6 order-1 lg:order-2">
          <H>Discovering the Truth</H>
          <p className="mt-6 text-[18px] md:text-[20px] leading-7">We knew dental disease was the number one disease in the world, but we didn’t know how to fix it. We assumed other manufacturers knew what they were doing, but as we dug deeper, we discovered they mostly don’t. Without formal education on what makes a product safe or effective, the responsibility for the science behind these products had fallen through the cracks. This has led to oral disease becoming the most common chronic illness in children and the number one disease globally. Yet, it’s over 90% preventable with the right products.</p>
        </div>
      </section>

      {/* Creating SuperMouth */}
      <section className="bg-[#394C97] text-white py-10">
        <div className="text-center"><H color={GOLD} size="text-[36px] md:text-[44px]">Creating SuperMouth</H></div>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 mt-8 grid lg:grid-cols-[1fr_400px] gap-10 items-center">
          <p className="text-[18px] md:text-[20px] leading-7 max-w-[820px]">Determined to make a difference, we created SuperMouth. Our mission was clear: to revolutionize oral health with safe, effective, and fun products. We also knew we had to customize oral care products so that a one-year-old with no cavities, a ten-year-old with lots of cavities, a teenager with braces, a pregnant mother, and a dad with a history of gum disease and bad breath could each get the right products tailored to their individual needs. We made a commitment to study and research everything about oral care, becoming world-leading experts in this field and owning this science. To launch the company, we gathered world-class dentists and medical experts, along with children’s entertainment and design experts, to build revolutionary products in each category. This commitment is evident in our 200+ products and nearly 300 patents.</p>
          <Image src="/about/story-SuperMouth_our_story_page_image_4_400x400.jpg" alt="SuperMouth products" width={400} height={400} className="w-full max-w-[400px] h-auto mx-auto" />
        </div>
      </section>

      {/* Here's What Sets Us Apart */}
      <section className="bg-[#0BAAC0] text-white py-10">
        <div className="text-center"><H color="#fff" size="text-[36px] md:text-[44px]">Here&apos;s What Sets Us Apart</H></div>
        <ol className="max-w-[900px] mx-auto px-6 mt-10 grid md:grid-cols-2 md:grid-flow-col md:grid-rows-5 gap-x-14 gap-y-8">
          {apart.map(([t, d], i) => (
            <li key={t}>
              <p className="text-[26px] md:text-[28px] leading-8"><Script color={GOLD}>{i + 1}. {t}</Script></p>
              <p className="mt-1 pl-6 text-[18px] leading-7">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Our Promise */}
      <section className="py-16 px-4 text-center">
        <H>Our Promise</H>
        <p className="max-w-[620px] mx-auto mt-8 text-[18px] md:text-[20px] leading-7">We’re not just selling toothpaste or toothbrushes. We’re here to transform oral care. Our products are used by our own families, and we’re dedicated to ensuring they’re the best for yours too. By trying our products, you can discover why thousands of dental professionals use SuperMouth products for themselves and their own families and recommend them to their patients. Together, we can make dental disease a thing of the past and bring healthy, happy smiles to every family.</p>
        <p className="max-w-[400px] mx-auto mt-8 text-[22px] md:text-[24px] leading-8 font-bold">Join us on this journey. Let’s revolutionize oral care, one <em>super</em> mouth at a time.</p>
        <p className="mt-8 text-[22px] md:text-[24px] font-bold">Warm regards,</p>
        <p className="mt-4 text-[34px] md:text-[40px] leading-10"><Script color={CORAL}>The SuperMouth Founders</Script></p>
      </section>

      <Footer />
    </Page>
  )
}
