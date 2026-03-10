import { Suspense } from "react";
import { getNewsList } from "@/lib/microcms";
import type { NewsCategory } from "@/types";
import CategoryFilter from "@/components/news/CategoryFilter";
import NewsCard from "@/components/news/NewsCard";
import SplitText from "@/components/ui/SplitText";

export const metadata = {
  title: "NEWS",
  description: "46Recordsの最新ニュース、リリース情報、ライブ情報をお届けします。",
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category as NewsCategory | undefined;
  const newsData = await getNewsList({ limit: 12, category });

  return (
    <div className="min-h-screen bg-white pt-44 pb-32 px-8 md:px-16 lg:px-24">
      {/* Page Title */}
      <div className="mb-16">
        <SplitText
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900"
        >
          NEWS
        </SplitText>
      </div>

      {/* Category Filter */}
      <div className="mb-16">
        <Suspense fallback={null}>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {newsData.contents.map((news, index) => (
          <NewsCard key={news.id} news={news} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {newsData.contents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-black/40 text-sm">記事がありません。</p>
        </div>
      )}
    </div>
  );
}
