import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { MoviePlayer, Characters, ProductTiles, Gallery } from '@/components/media/PlayParts'
import { play } from './data'

export const metadata: Metadata = {
  title: 'Play | The Rise of SuperMouth',
  description: 'Make brush time adventure time: watch The Rise of SuperMouth, meet the SuperMouth Squad, and listen to "smile" from the soundtrack.',
}

const SCRIPT = { fontFamily: 'var(--font-script), cursive' }
const BLUE = '#394C97'
const YELLOW_BTN = 'inline-block w-[300px] max-w-full rounded-lg bg-[#F1D45F] py-3 text-center text-[24px] md:text-[30px] font-semibold hover:opacity-90'

export default function PlayPage() {
  return (
    <div className="font-[family-name:var(--font-montserrat)] tracking-[-0.01em] text-white">
      {/* Intro + movie */}
      <section className="bg-[#131247] pt-8 pb-12">
        <div className="max-w-[1312px] mx-auto px-4">
          <h1 className="text-center text-[40px] md:text-[56px] leading-[1.1] text-[#F1D45F]" style={SCRIPT}>make brush time, adventure time!</h1>
          <p className="max-w-[840px] mx-auto mt-2 text-center text-[18px] md:text-[24px] leading-[1.25]">
            Imagine a world where toothpaste tastes like strawberry ice-cream and toothbrushes play a tune that inspires a dance and a smile. Here, fearless dragons are brought to life with augmented reality, menacing Sugar Bugs are unleashed in comic books, and your favorite superhero dentists star in their own movie. Welcome to SuperMouth, where brush time is now adventure time.
          </p>
          <Image src={play.logo} alt="The Rise of SuperMouth" width={500} height={191} className="mx-auto mt-6 w-[300px] md:w-[500px] h-auto" />
          <h2 className="mt-4 text-center text-[24px] md:text-[30px]">our first family adventure movie - now playing</h2>
          <MoviePlayer movie={play.movie} trailer={play.trailer} />

          <div className="mt-8 grid md:grid-cols-[288px_1fr] gap-8 items-center">
            <Image src={play.poster} alt="The Rise of SuperMouth movie poster" width={288} height={427} className="mx-auto w-[220px] md:w-[288px] h-auto" />
            <div className="text-[16px] md:text-[20px] leading-[1.4] space-y-3">
              <p>Run Time: 35 minutes<br />Genre: Action, Comedy, Fantasy</p>
              <p>In this family adventure, we meet the SuperMouth Squad, a team of superhero dentists and their comical sidekicks, as they attempt to stop villainous candymaker Cavitar from spreading Sugar Bugs to ruin teeth throughout the galaxy.</p>
              <p>This hybrid live-action animated film is ultimately about two kids taking to heart the lesson from their father about using the power of smiles to find their inner strength and reconnect as a family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Characters + soundtrack */}
      <section className="py-12" style={{ background: BLUE }}>
        <div className="max-w-[1312px] mx-auto px-4">
          <Characters characters={play.characters} />
          <h2 className="mt-10 text-center text-[28px] md:text-[36px] font-bold">&quot;smile&quot; from the movie soundtrack</h2>
          <div className="relative w-full pt-[56.25%] mt-6">
            <iframe src={`https://www.youtube.com/embed/${play.soundtrack}`} title='"smile" from The Rise of SuperMouth soundtrack' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" className="absolute inset-0 w-full h-full border-0" />
          </div>
          <div className="mt-6 flex justify-center">
            {([['spotify', play.music.spotify, 'Listen on Spotify'], ['apple music', play.music.apple, 'Listen on Apple Music'], ['amazon music', play.music.amazon, 'Listen on Amazon Music']] as const).map(([k, href, label]) => (
              <a key={k} href={href} target="_blank" rel="noopener" aria-label={label} className="block w-9 mx-2 hover:opacity-80" dangerouslySetInnerHTML={{ __html: play.icons[k] }} />
            ))}
          </div>
        </div>
      </section>

      {/* Products in the movie */}
      <section className="bg-[#EC6A5E] py-10">
        <div className="max-w-[1280px] mx-auto px-4">
          <h2 className="text-center text-[28px] md:text-[36px] font-bold">discover all the products featured in the movie!</h2>
          <div className="mt-8"><ProductTiles tiles={play.tiles} comicVideo={play.comicVideo} /></div>
          <div className="text-center mt-8">
            <Link href="/collections/shop-all-kids" className={YELLOW_BTN} style={{ color: BLUE }}>make oral care fun</Link>
          </div>
        </div>
      </section>

      {/* Watch and save */}
      <section className="bg-[#49A8C6] py-10 text-center">
        <h2 className="text-[56px] md:text-[80px] leading-none text-[#F1D45F]" style={SCRIPT}>watch and save!</h2>
        <p className="max-w-[860px] mx-auto mt-6 px-4 text-[22px] md:text-[36px] leading-[1.15]">
          Watch the movie and keep an eye out for the name of Cavitar&apos;s candy. That word is the promo code for a one-time 10% discount on all SuperMouth products!
        </p>
        <a href={`https://youtu.be/${play.movie}`} target="_blank" rel="noopener" className={`${YELLOW_BTN} mt-6`} style={{ color: BLUE }}>watch the movie</a>
      </section>

      {/* Gallery */}
      <section className="pt-8 pb-6" style={{ background: BLUE }}>
        <div className="max-w-[1312px] mx-auto px-4">
          <h2 className="text-center text-[28px] md:text-[36px] font-bold mb-8">image gallery</h2>
          <Gallery shots={play.gallery} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
