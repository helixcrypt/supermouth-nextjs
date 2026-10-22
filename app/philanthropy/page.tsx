import Image from 'next/image'
import Footer from '@/components/Footer'
import { Page, Hero, Script, YellowLink, CORAL, GOLD } from '@/components/about/ui'

export const metadata = {
  title: 'Giving Back — SuperMouth',
  description: 'Philanthropy that powers healthy smiles: SuperMouth and Project Healthy Smile.',
}

// The four outreach photos sit in a tilted, overlapping collage like the original.
const photos = [
  { src: '/about/phil-68c9c15869103cb7aa87df64.jpg', alt: 'Project Healthy Smile - Small child brushing teeth', clip: 'polygon(0 0, 100% 0, 92% 100%, 4% 86%)' },
  { src: '/about/phil-68c9c15869103cb7aa87df62.jpg', alt: 'Project Healthy Smile - group of children brushing', clip: 'polygon(8% 10%, 100% 0, 96% 92%, 0 100%)' },
  { src: '/about/phil-68c9c15869103cb7aa87df61.jpg', alt: 'Project Healthy Smile - Kids holding a Project Healthy Smile banner', clip: 'polygon(4% 0, 96% 6%, 100% 100%, 0 94%)' },
  { src: '/about/phil-68c9c15869103cb7aa87df63.jpg', alt: 'Project Healthy Smile - 2nd grade class brushing', clip: 'polygon(0 4%, 100% 0, 100% 90%, 8% 100%)' },
]

export default function PhilanthropyPage() {
  return (
    <Page>
      <Hero img="/about/phil-688127f18a32bbbcc922859a.jpg" alt="Toddlers brushing their teeth" contentClass="lg:pl-[173px] !max-w-[700px]" bg="#6ECBB9">
        <h1 className="text-[26px] md:text-[30px] leading-9 font-bold">
          <Script color="#fff" className="text-[34px]">Philanthropy</Script> that powers healthy smiles
        </h1>
        <p className="mt-6 text-[17px] md:text-[18px] leading-7 font-light text-white max-w-[500px]">At SuperMouth, giving back is at the heart of everything we do. Through partnerships with impactful organizations, we provide oral care kits, education, and resources to children and families in underserved communities, ensuring brighter, healthier smiles for all.</p>
      </Hero>

      {/* Mission */}
      <section className="max-w-[1312px] mx-auto px-4 py-4 grid lg:grid-cols-[421px_1fr] gap-4 items-center">
        <Image src="/about/phil-687e50017232cf65d086b7c2.jpg" alt="Health with Heart: a SuperMouth care package" width={421} height={281} className="w-full max-w-[421px] h-auto mx-auto" />
        <div className="lg:pl-2 py-4">
          <h2 className="text-[22px] md:text-[24px] leading-8 font-bold">oral health with heart: the SuperMouth mission</h2>
          <p className="mt-3 text-[17px] md:text-[18px] leading-7">At SuperMouth, our mission is to transform oral health equity by delivering safe, science-based dental care and education to children and communities in need. Through purposeful giving and impactful partnerships, we’re committed to creating brighter futures, one healthy smile at a time.</p>
          <p className="mt-4 text-[17px] md:text-[18px] leading-7">We believe every child deserves the tools and knowledge to build a confident, healthy smile. By partnering with trusted organizations, we’re able to reach families who might not otherwise have access to preventive oral care. Together, we’re not just providing supplies, we’re delivering hope, health, and dignity.</p>
        </div>
      </section>

      {/* Partnership */}
      <section className="bg-[#394C97] text-white">
        <div className="max-w-[1312px] mx-auto px-4 py-8 grid lg:grid-cols-[1fr_616px] gap-6 items-center">
          <div>
            <h2 className="text-[22px] md:text-[24px] leading-8" style={{ color: GOLD }}>SuperMouth &amp; Project Healthy Smiles:<br />A Partnership for Brighter Smiles</h2>
            <p className="mt-4 text-[17px] md:text-[18px] leading-7">As part of our long-term commitment to children’s health, SuperMouth has joined forces with Project Healthy Smile, a nonprofit organization dedicated to improving oral health education and access for underserved youth around the world.</p>
            <p className="mt-4 text-[17px] md:text-[18px] leading-7">Through this ongoing collaboration, SuperMouth is helping deliver non-toxic, dentist-created oral care products and preventative education to children in communities where access to dental care is limited or nonexistent. Together, we&apos;re working to reduce the global burden of childhood dental disease - one smile at a time.</p>
          </div>
          <Image src="/about/phil-68c3a7f2cae53c2a36953b80.png" alt="Project Healthy Smile logo" width={616} height={320} className="w-full max-w-[616px] h-auto mx-auto" />
        </div>
      </section>

      {/* Photo collage */}
      <section className="bg-[#5AC3B2] py-4 sm:py-12">
        <div className="max-w-[1312px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-0">
          {photos.map((p, i) => (
            <div key={p.src} className={`relative aspect-square ${i % 2 ? 'lg:-ml-6' : ''} ${i === 2 ? 'lg:-ml-4' : ''}`} style={{ clipPath: p.clip }}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 320px, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Buy one, give one */}
      <section className="max-w-[1312px] mx-auto px-4 py-8 grid lg:grid-cols-[420px_1fr] gap-8 items-center">
        <Image src="/about/phil-68c9cc7f69103cb7aa87e151.jpg" alt="Yellow SuperBrush Jr. Toothbrush" width={420} height={280} className="w-full max-w-[420px] h-auto mx-auto" />
        <div>
          <h2 className="text-[22px] md:text-[24px] leading-8 font-bold" style={{ color: CORAL }}>Turning purchases into purpose</h2>
          <p className="mt-4 text-[17px] md:text-[18px] leading-7">As part of this initiative, SuperMouth will donate one SuperBrush Jr. to Project Healthy Smile for every purchase of a Glow Globe Musical Toothbrush. This &quot;buy one, give one&quot; campaign underscores the belief that every child deserves access to tools that support a healthy, confident smile.</p>
          <p className="mt-4 text-[17px] md:text-[18px] leading-7">Additionally, SuperMouth has committed to donating oral care products bi-annually ahead of Project Healthy Smile’s outreach missions to underserved countries and communities, providing essential oral hygiene tools to children who need them most.</p>
          <p className="mt-4 text-[17px] md:text-[18px] leading-7">Join in and shop for a cause, you can be part of the movement to help children across the world smile with confidence.</p>
          <YellowLink href="/products/supermouth-glow-globe-toothbrush" className="mt-4">I want to help</YellowLink>
        </div>
      </section>

      <Footer />
    </Page>
  )
}
