import Image from 'next/image'
import Footer from '@/components/Footer'
import Carousel from '@/components/home/Carousel'
import DoctorCard from '@/components/home/DoctorCard'
import { home } from '@/lib/home-data'
import { Page, Hero, Script, YellowLink, CORAL } from '@/components/about/ui'

export const metadata = {
  title: 'Our Happy Customers — SuperMouth',
  description: 'Hear what our customers have to say about SuperMouth products.',
}

const userPhotos = [
  ['66c4feb375845478f04442e2', 'Happy Customers One'], ['66c4feb375845478f04442e1', 'Happy Customers Two'],
  ['66c4feb375845478f04442e3', 'Happy Customers Three'], ['66c4feb475845478f04442e4', 'Happy Customers Four'],
  ['671183134800d1c50f7f3fe3', 'Happy Customers - CM 1'], ['671183134800d1c50f7f3fe7', 'Happy Customers - CM 2'],
  ['671183134800d1c50f7f3fe6', 'Happy Customers - CM 3'], ['671183134800d1c50f7f3fe5', 'Happy Customers - CM 4'],
  ['671183134800d1c50f7f3fe4', 'Happy Customers - CM 5'], ['671183124800d1c50f7f3fe2', 'Happy Customers - CM 6'],
  ['671183124800d1c50f7f3fe1', 'Happy Customers - CM 7'], ['671183124800d1c50f7f3fe0', 'Happy Customers - CM 8'],
  ['671183124800d1c50f7f3fde', 'Happy Customers - CM 9'], ['671183124800d1c50f7f3fdf', 'Happy Customers - CM 10'],
]

const testimonials = [
  ['My mom-in law got a sample pack for my very picky son at a convention. He has always hated brushing his teeth. We started with the chocolate, which he loved! He ended up loving them all, even the mint! Haven’t been able to get him to try mint until now!! I love that it’s more natural than the other stuff. It made brushing teeth so much more enjoyable for the whole family!', 'Nikki_Oh'],
  ['I have been using SuperMouth Hydroxamin with fluoride MouthWash for a year and have received comments from my dentist on how much better my teeth look and did I change anything in my dental hygiene. Just Supermouth toothpaste and Mouthwash and she was amazed, as am I!', 'Patrick F.'],
  ['I just received my box and tried out the manual toothbrush...let me tell you it hugs your teeth to get them clean is the best way to describe it! Way different than any other toothbrush I\'ve used and I\'m a bit of a tooth fanatic. This is going to make it so much easier for my youngest child to cleaner teeth.', 'Kathy B.'],
  ['I can\'t believe this is good for you. Can\'t be. I look forward to it like a milkshake! Hard not to swallow LOL. Very awesome mouthwash.', 'Jacqui C.'],
  ['My dentist recommended this line of products because I\'ve suffered from Sjögren\'s syndrome since I was a child. My mouth has absolutely no saliva. These products immediately improve my mouth chemistry.', 'Mariana B.'],
  ['I have been looking for the holy Grail of toothpastes for my picky son, and I think I found it! This is such a great toothpaste. I love the combination of fluoride and hydroxyapatite. I gave up toothpastes with SLS years ago due to sensitivity (the inside of my mouth would just slough off and I got so many canker sores). I am using a toothpaste from a different company. I think when I am finished with my current supply I am going to replace it with SuperMouth!', 'Tamara T.'],
  ['First do no harm. Vit D in toothpaste? Awesome No potential carcinogens', 'John B.'],
]

const Stars = () => (
  <span className="inline-flex gap-1" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map(n => (
      <svg key={n} width="22" height="22" viewBox="0 0 24 24" fill="#F1D45F" aria-hidden><path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3 5.9 20.7l1.5-6.7L2.3 9.4l6.8-.7z" /></svg>
    ))}
  </span>
)

export default function HappyCustomersPage() {
  return (
    <Page>
      <Hero img="/about/cust-6670c1ac7cc7b6a311f9af1e.jpg" alt="Father and son brushing their teeth" bg="#5AC3B2">
        <h1 className="text-[30px] leading-9 font-bold">our happy <Script color="#fff" className="text-[36px]">customers</Script></h1>
        <p className="mt-6 text-[18px] leading-7 font-light">hear what our customers have<br />to say about SuperMouth Products</p>
      </Hero>

      {/* SuperMouth Users photo carousel */}
      <section className="py-6">
        <h2 className="text-center text-[34px] md:text-[38px] leading-10"><Script color={CORAL}>SuperMouth Users</Script></h2>
        <Carousel className="max-w-[1312px] mx-auto mt-4 px-10" slideClass="w-full" gapClass="px-0" label="SuperMouth users photos">
          {userPhotos.map(([id, alt]) => (
            <div key={id} className="flex justify-center">
              <Image src={`/about/cust-${id}.png`} alt={alt} width={400} height={400} className="w-full max-w-[400px] h-auto" />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Customer testimonials */}
      <section className="bg-[#394C97] text-white py-6">
        <h2 className="text-center text-[34px] md:text-[38px] leading-10"><Script color="#F1D45F">Customer Testimonials</Script></h2>
        <Carousel className="max-w-[1312px] mx-auto mt-4 px-10" slideClass="w-full" gapClass="px-2 md:px-6" arrowColor="#F1D45F" label="Customer testimonials">
          {testimonials.map(([quote, name]) => (
            <div key={name} className="text-center">
              <Stars />
              <p className="mt-6 max-w-[1180px] mx-auto text-[16px] leading-6">{quote}</p>
              <p className="mt-8 text-[18px] leading-7 font-bold text-[#F1D45F]">{name}</p>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Dental professionals */}
      <section className="pt-10 pb-8">
        <h2 className="text-center text-[26px] md:text-[30px] leading-9 font-bold px-4">why dental professionals recommend SuperMouth</h2>
        <Carousel className="max-w-[1312px] mx-auto mt-12 px-8 md:px-12" slideClass="w-full" gapClass="px-2 md:px-6" label="Dental professional testimonials">
          {home.doctors.map(d => <DoctorCard key={d.img} {...d} />)}
        </Carousel>
        <div className="text-center mt-8"><YellowLink href="https://supermouthpro.com" className="px-3">Dental Professionals: Join SuperMouth Pro</YellowLink></div>
      </section>

      <Footer />
    </Page>
  )
}
