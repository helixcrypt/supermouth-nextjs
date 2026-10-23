import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import { articles, getArticle } from '@/lib/articles'

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug)
  if (!a) return {}
  return { title: `${a.title} | SuperMouth`, description: a.description || a.excerpt, openGraph: { images: a.hero ? [a.hero] : [] } }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug)
  if (!a) notFound()

  return (
    <div className="bg-white font-[family-name:var(--font-montserrat)] tracking-[-0.01em]">
      <article className="max-w-[1280px] mx-auto px-4 pt-6 md:pt-12 pb-12">
        <div className="md:w-2/3 mx-auto">
          <h1 className="text-center text-[26px] md:text-[30px] leading-9 font-bold text-[#394C97]">{a.title}</h1>
          {a.hero && (
            <Image src={a.hero} alt={a.heroAlt || a.title} width={1200} height={675} priority className="mt-2 w-full h-auto" />
          )}
          <div
            className="article-body pt-6 text-[16px] leading-[1.6] text-[#1f2340]
              [&_p]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mb-1
              [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-[20px] [&_h2]:leading-7 [&_h2]:font-bold [&_h2]:text-[#394C97]
              [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-[17px] [&_h3]:font-bold [&_h3]:text-[#2BB3A6]
              [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:font-bold [&_h4]:text-[#2BB3A6]
              [&_a]:underline [&_a]:text-[#394C97] [&_b]:font-bold [&_strong]:font-bold
              [&_img]:my-4 [&_img]:mx-auto [&_img]:h-auto [&_img]:max-w-full
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#5AC3B2] [&_blockquote]:pl-4 [&_blockquote]:italic
              [&_hr]:my-6 [&_hr]:border-[#5AC3B2]
              [&_table]:w-full [&_table]:my-4 [&_table]:text-[14px] [&_td]:border [&_td]:border-[#394C97]/20 [&_td]:p-2 [&_th]:border [&_th]:border-[#394C97]/20 [&_th]:p-2
              [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:my-4"
            dangerouslySetInnerHTML={{ __html: a.body }}
          />
        </div>
      </article>

      <Footer />
    </div>
  )
}
