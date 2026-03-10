import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsDetail, getNewsList } from "@/lib/microcms";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitText from "@/components/ui/SplitText";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsDetail(slug);
  if (!news) return { title: "Not Found" };

  return {
    title: news.title,
    description: news.body.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);
  if (!news) notFound();

  const relatedNews = await getNewsList({ limit: 3, category: news.category });
  const related = relatedNews.contents.filter((n) => n.id !== news.id).slice(0, 3);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-white pt-44 pb-32 px-8 md:px-16 lg:px-24">
      {/* Breadcrumb */}
      <ScrollReveal className="mb-10">
        <nav className="flex items-center gap-2 text-xs text-black/40">
          <Link href="/" className="hover:text-black transition-colors">
            TOP
          </Link>
          <span>/</span>
          <Link href="/news" className="hover:text-black transition-colors">
            NEWS
          </Link>
          <span>/</span>
          <span className="text-black/60 line-clamp-1">{news.title}</span>
        </nav>
      </ScrollReveal>

      {/* Article */}
      <article className="max-w-3xl">
        {/* Meta */}
        <ScrollReveal className="flex items-center gap-3 mb-6">
          <span className="text-[10px] tracking-widest text-accent font-medium">
            {news.category}
          </span>
          <span className="text-[10px] text-black/30">
            {formatDate(news.publishedAt)}
          </span>
        </ScrollReveal>

        {/* Title */}
        <SplitText
          as="h1"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-[1.4] tracking-tight mb-12"
        >
          {news.title}
        </SplitText>

        {/* Thumbnail */}
        <ScrollReveal className="mb-14">
          <div className="w-full aspect-[16/9] bg-sub rounded-sm flex items-center justify-center text-black/10">
            THUMBNAIL
          </div>
        </ScrollReveal>

        {/* Body */}
        <ScrollReveal>
          <div
            className="prose prose-sm max-w-none text-black/70 leading-[2]
              [&>p]:mb-6 [&>h2]:text-neutral-900 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4
              [&>h3]:text-neutral-900 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3
              [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5
              [&>a]:text-accent [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: news.body }}
          />
        </ScrollReveal>
      </article>

      {/* Related news */}
      {related.length > 0 && (
        <section className="mt-20 pt-16 border-t border-black/10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-10 tracking-tight">
            Related News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group block"
              >
                <div className="w-full aspect-[16/10] bg-sub rounded-sm mb-4 overflow-hidden">
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-black/10 text-xs">
                    THUMBNAIL
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] tracking-widest text-accent">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-black/30">
                    {formatDate(item.publishedAt)}
                  </span>
                </div>
                <h3 className="text-sm text-black/70 group-hover:text-black transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
