import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArtistDetail, getNewsList } from "@/lib/microcms";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SplitText from "@/components/ui/SplitText";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistDetail(slug);
  if (!artist) return { title: "Not Found" };

  return {
    title: artist.name,
    description: artist.bio?.replace(/<[^>]*>/g, "").slice(0, 160) || `${artist.name} - 46Records`,
  };
}

const socialPlatforms = [
  { key: "Instagram" as const, label: "IG" },
  { key: "Twitter" as const, label: "X" },
  { key: "TikTok" as const, label: "TT" },
];

export default async function ArtistDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const artist = await getArtistDetail(slug);
  if (!artist) notFound();

  // Related news (simple: get latest news)
  const relatedNews = await getNewsList({ limit: 3 });

  return (
    <div className="min-h-screen bg-white pt-44 pb-32">
      {/* Breadcrumb */}
      <ScrollReveal className="px-8 md:px-16 lg:px-24 mb-10">
        <nav className="flex items-center gap-2 text-xs text-black/40">
          <Link href="/" className="hover:text-black transition-colors">
            TOP
          </Link>
          <span>/</span>
          <Link href="/artists" className="hover:text-black transition-colors">
            ARTISTS
          </Link>
          <span>/</span>
          <span className="text-black/60">{artist.name}</span>
        </nav>
      </ScrollReveal>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 px-8 md:px-16 lg:px-24">
        {/* Photo */}
        <ScrollReveal className="lg:w-1/2">
          <div className="relative w-full aspect-[3/4] bg-sub rounded-sm overflow-hidden">
            <Image
              src={artist.profilePhoto?.url || artist.photo.url}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </ScrollReveal>

        {/* Info */}
        <div className="lg:w-1/2 lg:pt-8">
          <SplitText
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight mb-2"
          >
            {artist.name}
          </SplitText>

          <ScrollReveal delay={0.2}>
            <p className="text-sm text-black/40 tracking-wider mb-2">
              {artist.nameEn}
            </p>
          </ScrollReveal>

          {artist.genre && (
            <ScrollReveal delay={0.3}>
              <p className="text-xs text-accent tracking-widest mb-8">
                {artist.genre}
              </p>
            </ScrollReveal>
          )}

          {/* Bio */}
          {artist.bio && (
            <ScrollReveal delay={0.4}>
              <div
                className="text-sm text-black/60 leading-[2] mb-10
                  [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: artist.bio }}
              />
            </ScrollReveal>
          )}

          {/* Social Links */}
          {socialPlatforms.some((p) => artist[p.key]) && (
            <ScrollReveal delay={0.5}>
              <div className="flex gap-4 mb-10">
                {socialPlatforms.map((p) =>
                  artist[p.key] ? (
                    <a
                      key={p.key}
                      href={artist[p.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 border border-black/20 rounded-full text-[10px] text-black/60 hover:text-black hover:border-black transition-all duration-300"
                    >
                      {p.label}
                    </a>
                  ) : null
                )}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.6}>
            <Link
              href="/artists"
              className="inline-flex items-center gap-3 text-sm text-black/40 hover:text-black transition-colors"
            >
              &larr; Back to Artists
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* Related News */}
      {relatedNews.contents.length > 0 && (
        <section className="mt-20 pt-16 px-8 md:px-16 lg:px-24 border-t border-black/10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-10 tracking-tight">
            Related News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedNews.contents.slice(0, 3).map((item) => {
              const d = new Date(item.publishedAt);
              const dateStr = d.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              return (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[16/10] bg-sub rounded-sm mb-4 overflow-hidden">
                    {item.thumbnail?.url ? (
                      <Image
                        src={item.thumbnail.url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-black/10 text-xs">
                        THUMBNAIL
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-widest text-accent">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-black/30">{dateStr}</span>
                  </div>
                  <h3 className="text-sm text-black/70 group-hover:text-black transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
