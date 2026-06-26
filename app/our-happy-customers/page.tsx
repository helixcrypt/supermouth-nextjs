import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Our Happy Customers — SuperMouth',
  description: 'Reviews and feedback from our happy customers.',
}

const customerPhotos = [
  'https://pics.io/public/images/66c4feb375845478f04442e2/cdn',
  'https://pics.io/public/images/66c4feb375845478f04442e1/cdn',
  'https://pics.io/public/images/66c4feb375845478f04442e3/cdn',
  'https://pics.io/public/images/66c4feb475845478f04442e4/cdn',
  'https://pics.io/public/images/671183134800d1c50f7f3fe3/cdn',
  'https://pics.io/public/images/671183134800d1c50f7f3fe7/cdn',
  'https://pics.io/public/images/671183134800d1c50f7f3fe6/cdn',
  'https://pics.io/public/images/671183134800d1c50f7f3fe5/cdn',
  'https://pics.io/public/images/671183134800d1c50f7f3fe4/cdn',
  'https://pics.io/public/images/671183124800d1c50f7f3fe2/cdn',
  'https://pics.io/public/images/671183124800d1c50f7f3fe1/cdn',
  'https://pics.io/public/images/671183124800d1c50f7f3fe0/cdn',
  'https://pics.io/public/images/671183124800d1c50f7f3fde/cdn',
  'https://pics.io/public/images/671183124800d1c50f7f3fdf/cdn',
]

const reviews = [
  { name: 'Nikki_Oh', stars: 5, text: 'My mom-in law got a sample pack for my very picky son at a convention. He has always hated brushing his teeth. We started with the chocolate, which he loved! He ended up loving them all, even the mint! Haven\'t been able to get him to try mint until now!! I love that it\'s more natural than the other stuff. It made brushing teeth so much more enjoyable for the whole family!' },
  { name: 'Patrick F.', stars: 5, text: 'I have been using SuperMouth Hydroxamin with fluoride MouthWash for a year and have received comments from my dentist on how much better my teeth look and did I change anything in my dental hygiene. Just Supermouth toothpaste and Mouthwash and she was amazed, as am I!' },
  { name: 'Kathy B.', stars: 5, text: 'I just received my box and tried out the manual toothbrush...let me tell you it hugs your teeth to get them clean is the best way to describe it! Way different than any other toothbrush I\'ve used and I\'m a bit of a tooth fanatic. This is going to make it so much easier for my youngest child to cleaner teeth.' },
  { name: 'Jacqui C.', stars: 5, text: 'I can\'t believe this is good for you. Can\'t be. I look forward to it like a milkshake! Hard not to swallow LOL. Very awesome mouthwash.' },
  { name: 'Mariana B.', stars: 5, text: 'My dentist recommended this line of products because I\'ve suffered from Sjögren\'s syndrome since I was a child. My mouth has absolutely no saliva. These products immediately improve my mouth chemistry.' },
  { name: 'Tamara T.', stars: 5, text: 'I have been looking for the holy Grail of toothpastes for my picky son, and I think I found it! This is such a great toothpaste. I love the combination of fluoride and hydroxyapatite. I gave up toothpastes with SLS years ago due to sensitivity. I am going to replace it with SuperMouth!' },
  { name: 'John B.', stars: 5, text: 'First do no harm. Vit D in toothpaste? Awesome. No potential carcinogens.' },
  { name: 'Sarah M.', stars: 5, text: 'We love SuperMouth! My kids actually ask to brush their teeth now. The chocolate flavor is their absolute favorite and I love that the ingredients are safe and clean.' },
  { name: 'Dr. Lisa H.', stars: 5, text: 'As a dental hygienist, I\'m very selective about what I recommend. SuperMouth checks every box — safe ingredients, effective formulas, and kids actually enjoy using them. I recommend it to all my patients.' },
]

const drTestimonials = [
  {
    img: 'https://cdn.supermouth.com/website/testimonial_yuko2024.jpg',
    name: 'Dr. Yuko Torigoe',
    practice: 'Harmony Dental',
    quote: 'I discovered SuperMouth at the IAOMT conference in Orlando last year while seeking the safest dental products for our holistic practice. Dr. Hoss\' lecture caught my attention, and sampling their toothpaste reassured me of its safety.',
  },
  {
    img: 'https://cdn.supermouth.com/website/testimonial_Dr_Christina_Do_2.jpg',
    name: 'Dr. Christina Do',
    practice: 'Smiles4OC',
    quote: 'My son loves to dance to the tunes of SuperMouth. We have transformed our bedtime routine from a chore to a playtime. Brushing and flossing were always met with resistance and tears from my son. But luckily for our family, we discovered SuperMouth.',
  },
  {
    img: 'https://cdn.supermouth.com/website/img-dr_rebecca_pikos.jpg',
    name: 'Dr. Rebecca Pikos',
    practice: 'Shiny Happy Smiles',
    quote: 'As a mom of young children, I\'m conscious of the products we use in our household. As a pediatric dentist, I\'m focused on efficacy in caries reduction. Thankfully, SuperMouth offers products that pose the lowest possible risk of toxicity.',
  },
  {
    img: 'https://cdn.supermouth.com/website/img-dr_ali_ghatri.jpg',
    name: 'Dr. Ali Ghatri',
    practice: 'Let\'s Smile Dental',
    quote: 'I am thrilled with your products! Your toothbrushes are exceptional, with soft bristles that are incredibly comforting. Other brands\' soft-bristle brushes feel like needles to me. Your brushes made such a difference.',
  },
  {
    img: 'https://cdn.supermouth.com/website/img-dr_cyndee_johnson.jpg',
    name: 'Dr. Cyndee Johnson',
    practice: 'Global Dental Advisor',
    quote: 'As a dental hygienist and global dental advisor with four decades of experience, I\'ve finally found a line of products I can wholeheartedly recommend to every patient.',
  },
  {
    img: 'https://cdn.supermouth.com/website/SuperMouth_our_story_page_image_1_400x500.png',
    name: 'Dr. Joanna Theodorou & Dr. Chau McGovern',
    practice: '',
    quote: 'We chose SuperMouth because their clean products and educational materials make a big difference in how families approach dental care.',
  },
]

export default function OurHappyCustomersPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero */}
      <section className="relative w-full">
        <div className="hidden md:block w-full">
          <Image
            src="https://pics.io/public/images/66c65d0efd6a94ef4459ba0b/cdn"
            alt="Our Happy Customers"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="md:hidden w-full">
          <Image
            src="https://pics.io/public/images/6670c1ac7cc7b6a311f9af1e/cdn"
            alt="Our Happy Customers"
            width={768}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-2">Our Happy Customers</p>
          <h1 className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg">
            Hear what our customers have to say about SuperMouth Products
          </h1>
        </div>
      </section>

      {/* Customer photo collage */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-teal text-xs font-bold uppercase tracking-widest text-center mb-6">SuperMouth Users</p>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {customerPhotos.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-sm-bg">
                <Image
                  src={url}
                  alt={`Happy customer ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-black text-3xl text-center mb-3 text-sm-navy">Customer Testimonials</h2>
        <p className="text-sm-gray text-sm text-center mb-10">Real reviews from real SuperMouth families</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-sm-gray leading-relaxed mb-4 italic">"{review.text}"</p>
              <p className="text-sm font-bold text-sm-navy">— {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dental Professional Testimonials */}
      <section className="bg-sm-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest text-center mb-3">Why Dental Professionals Recommend SuperMouth</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-12">Trusted by Thousands of Dental Professionals</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drTestimonials.map((dr, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-white/10">
                    <Image
                      src={dr.img}
                      alt={dr.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{dr.name}</p>
                    {dr.practice && <p className="text-xs text-sm-yellow">{dr.practice}</p>}
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed italic">"{dr.quote}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="https://supermouthpro.com" target="_blank"
              className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              For Dental Professionals →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">Join 125,000+ Happy Families</h2>
          <p className="text-sm-gray text-sm mb-8">Experience the SuperMouth difference — 30-day money-back guarantee on every order.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop-all" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
            <Link href="/assessment" className="bg-sm-purple text-white font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
              Take the Assessment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
