import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'In The News — SuperMouth',
  description: 'Making Headlines Everywhere: SuperMouth in the Media Spotlight.',
}

const pressLogos = [
  'Indy Week', 'USA Today', 'CNN', 'Tamron Hall', 'US News', 'WebMD',
  'Healthline', 'Parents Magazine', 'Good Housekeeping', 'Today', 'Prevention',
  'Entrepreneur', 'Huffington Post', 'Forbes', 'Allure', 'Scary Mommy',
  'Health Magazine', 'Bustle', 'Business Insider', 'Cheddar News', 'BuzzFeed',
  'Fox News', 'CNET', 'Refinery29', 'Cosmopolitan', 'Seventeen', 'PopSugar',
  "Woman's World", 'Doctors', 'Dentistry Today', 'Inside Edition', 'MSN',
  "Men's Journal", 'NBC', 'New Beauty', 'CBS', 'ABC', 'Well+Good',
]

const featuredMedia = [
  {
    outlet: "Men's Journal Award",
    headline: "Men's Journal Names SuperMouth Ultim8 Best Sonic Toothbrush of 2025",
    href: 'https://www.mensjournal.com/grooming/best-grooming-products',
    tag: '🏆 Award',
    bg: 'bg-yellow-50 border-yellow-200',
  },
  {
    outlet: 'CNN Underscored',
    headline: "Your dentist knows you're not flossing. Here's how to nail your oral health routine",
    href: 'https://www.cnn.com/cnn-underscored/health-fitness/oral-hygiene-routine',
    tag: '📰 Feature',
    bg: 'bg-red-50 border-red-200',
  },
  {
    outlet: 'Cheddar News',
    headline: 'Teaching Kids How to Brush Their Teeth the Right Way',
    href: 'https://cheddar.com/media/teaching-kids-how-to-brush-their-teeth-the-right-way',
    tag: '📺 TV',
    bg: 'bg-blue-50 border-blue-200',
  },
]

const additionalMedia = [
  { outlet: 'TechRadar', headline: 'ULTIM8 Recognized as Best Self-Cleaning Electric Toothbrush', href: 'https://www.techradar.com/best/electric-toothbrushes' },
  { outlet: 'Daily Mom', headline: "SuperMouth's Ultim8 SmartBrush Named Top Mother's Day Gift", href: 'https://dailymom.com/discover/creative-cozy-and-luxurious-mothers-day-gifts-for-every-mom/' },
  { outlet: 'CNET', headline: "CNET Names SuperMouth Ultim8 as 2025's Best Soft-Bristled Electric Brush", href: 'https://www.cnet.com/health/personal-care/best-electric-toothbrush/' },
  { outlet: 'Tamron Hall Show', headline: 'SuperMouth Ultim8 SmartBrush System Featured on the Tamron Hall Show', href: 'https://www.youtube.com/watch?v=OIPIqIG6fFw' },
  { outlet: 'AskMen', headline: '2025 AskMen Grooming Awards — Best Sonic Toothbrush', href: 'https://www.askmen.com/grooming/skin/grooming-awards-2025-face-care-products.html' },
  { outlet: 'Seventeen', headline: 'The Best Teeth Whitening Kits', href: 'https://www.seventeen.com/beauty/g42640642/best-teeth-whitening-kits/' },
  { outlet: 'PopSugar', headline: 'The 10 Best Electric Toothbrushes to Elevate Your Brushing Game', href: 'https://www.popsugar.com/beauty/dentist-recommended-electric-toothbrushes-48078961' },
  { outlet: 'KTLA', headline: "Dr. Kami Hoss on Why Oral Hygiene is Very Important for Kids and Adults", href: 'https://ktla.com/video/dr-kami-hoss-discuss-the-importance-of-oral-hygiene-for-kids/8879706/' },
  { outlet: 'HuffPost', headline: "Dentists Can Tell a Lot About Someone's Health Just by Looking in Their Mouth", href: 'https://www.huffpost.com/entry/what-dentists-know-by-looking-mouth_l_64bc53c4e4b038c60ccab400' },
  { outlet: "Woman's World", headline: 'Top Dental Tips for Reversing Gum Disease', href: 'https://www.womansworld.com/wellness/gum-disease-self-care' },
  { outlet: 'Camille Styles', headline: 'Top Dentist Shares the Surprising Connection Between Oral Care and Gut Health', href: 'https://camillestyles.com/wellness/gut-health-oral-hygiene/' },
  { outlet: 'Yahoo! Health', headline: 'The First-rate Tested Toothbrushes for Healthy Gums and Teeth', href: 'https://www.yahoo.com/lifestyle/best-electric-toothbrush-221127494.html' },
]

const awards2026 = [
  { pub: 'Health', title: 'Best for Braces', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: 'Tech Radar', title: 'Best Self Cleaning Brush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: 'Good Housekeeping', title: 'Best for Braces', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: 'Good Housekeeping', title: 'Best for Kids', product: 'Smile Sidekick Sonic Mouthbrush', href: 'https://supermouth.com/products/dr-hoss-smile-sidekick-toothbrush' },
  { pub: 'Forbes Vetted', title: 'Best Electric Toothbrush for Toddlers', product: 'Turbo Sonic Toothbrush', href: 'https://supermouth.com/products/turbo-sonic-mouthbrush' },
  { pub: 'Yahoo! Health', title: 'Honorable Mention', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: 'CNET', title: 'Best Soft-Bristled Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: 'New Beauty', title: 'Best Floss', product: 'Hydroxamin with Fluoride Mouth Floss', href: 'https://supermouth.com/products/supermouth-hydroxamin-with-fluoride-mouthfloss' },
  { pub: 'CNN Underscored', title: 'Editor Favorite', product: 'Fluoride Nano-Hydroxyapatite Toothpaste', href: 'https://supermouth.com/products/supermouth-hydroxamin-w-fluoride-toothpaste-3-4-oz' },
]

const awards2025 = [
  { pub: 'Pop Sugar', title: 'Best Electric Toothbrush System', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: 'Ask Men', title: 'Best Sonic Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
  { pub: "Men's Journal", title: 'Best Sonic Toothbrush', product: 'Ultim8 Signature', href: 'https://supermouth.com/products/ultim8-electric-toothbrush' },
]

export default function InTheNewsPage() {
  return (
    <div className="bg-sm-bg text-sm-navy">
      {/* Hero */}
      <section className="relative w-full">
        <div className="hidden md:block w-full">
          <Image
            src="https://cdn.supermouth.com/images/SM-website_2.0-_in_the_news_page-header_image-ni.jpg"
            alt="In The News"
            width={1440}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="md:hidden w-full">
          <Image
            src="https://cdn.supermouth.com/website/in_the_news_page-header_image_mobile_no_text_v2.png"
            alt="In The News"
            width={768}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-2">In The News</p>
          <h1 className="font-display font-black text-3xl md:text-5xl text-white drop-shadow-lg">
            Making Headlines Everywhere:<br />SuperMouth in the Media Spotlight
          </h1>
        </div>
      </section>

      {/* Press logo ticker */}
      <div className="bg-white border-y border-gray-100 py-5 overflow-hidden">
        <div className="ticker-track flex gap-10 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...pressLogos, ...pressLogos].map((logo, i) => (
            <span key={i} className="text-sm-gray text-sm font-semibold">{logo}</span>
          ))}
        </div>
      </div>

      {/* Featured Media */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm-teal text-xs font-bold uppercase tracking-widest mb-3">Featured Media</p>
        <h2 className="font-display font-black text-3xl mb-10 text-sm-navy">Top Coverage</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {featuredMedia.map(item => (
            <a key={item.headline} href={item.href} target="_blank" rel="noopener noreferrer"
              className={`border rounded-2xl p-6 hover:shadow-md transition-shadow group ${item.bg}`}>
              <span className="text-xs font-bold px-2 py-1 bg-white rounded-full text-sm-gray mb-3 inline-block">{item.tag}</span>
              <p className="text-xs font-bold uppercase tracking-widest text-sm-gray mb-2">{item.outlet}</p>
              <p className="font-display font-bold text-sm text-sm-navy leading-snug group-hover:text-sm-teal transition-colors">{item.headline}</p>
              <span className="text-sm-teal text-xs mt-3 block font-semibold">Read Article →</span>
            </a>
          ))}
        </div>

        {/* Additional media grid */}
        <h3 className="font-display font-bold text-xl mb-6 text-sm-navy">Additional Media</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalMedia.map(item => (
            <a key={item.headline} href={item.href} target="_blank" rel="noopener noreferrer"
              className="bg-white rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100">
              <p className="text-xs font-bold text-sm-teal uppercase tracking-widest mb-2">{item.outlet}</p>
              <p className="text-sm font-semibold text-sm-navy leading-snug group-hover:text-sm-teal transition-colors">{item.headline}</p>
              <span className="text-sm-gray text-xs mt-2 block">Read Article →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="bg-sm-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm-yellow text-xs font-bold uppercase tracking-widest mb-3 text-center">Awards & Recognition</p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-center mb-3">Recognized by the World's Leading Publications</h2>
          <p className="text-white/60 text-sm text-center mb-10 max-w-2xl mx-auto">
            Editors and journalists at the world's leading health and lifestyle publications have recognized SuperMouth across products, ingredients, and innovation.
          </p>

          {/* 2026 Awards */}
          <h3 className="font-display font-bold text-xl mb-4 text-sm-yellow">2026</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {awards2026.map((award, i) => (
              <Link key={i} href={award.href}
                className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                <span className="text-xl flex-shrink-0">🏆</span>
                <div>
                  <p className="text-xs font-bold text-sm-yellow">{award.pub}</p>
                  <p className="text-sm font-semibold text-white leading-snug">{award.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{award.product}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* 2025 Awards */}
          <h3 className="font-display font-bold text-xl mb-4 text-sm-yellow">2025</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {awards2025.map((award, i) => (
              <Link key={i} href={award.href}
                className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group">
                <span className="text-xl flex-shrink-0">🏆</span>
                <div>
                  <p className="text-xs font-bold text-sm-yellow">{award.pub}</p>
                  <p className="text-sm font-semibold text-white leading-snug">{award.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{award.product}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* About awards */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">About These Awards</p>
            <p className="text-sm text-white/70 max-w-2xl mx-auto">
              Every recognition listed here reflects an editorial decision made by journalists and editors at publications trusted by millions of consumers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Press inquiries CTA */}
      <section className="bg-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-black text-3xl mb-4 text-sm-navy">Press Inquiries</h2>
          <p className="text-sm-gray text-sm mb-8">Interested in featuring SuperMouth in your publication or show? We'd love to connect.</p>
          <Link href="/contact" className="bg-sm-yellow text-sm-navy font-bold px-8 py-4 rounded-full text-sm hover:opacity-90 transition-opacity">
            Contact Our Press Team →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
