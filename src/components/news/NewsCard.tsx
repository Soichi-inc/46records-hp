"use client";

import Link from "next/link";
import type { News } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface NewsCardProps {
  news: News;
  index: number;
}

export default function NewsCard({ news, index }: NewsCardProps) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/news/${news.slug}`} className="group block">
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] bg-sub rounded-sm overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-full h-full bg-sub group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-black/10 text-xs">
            THUMBNAIL
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] tracking-widest text-accent font-medium">
            {news.category}
          </span>
          <span className="text-[10px] text-black/30">
            {formatDate(news.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm text-black/80 group-hover:text-black transition-colors leading-relaxed line-clamp-2">
          {news.title}
        </h3>
      </Link>
    </ScrollReveal>
  );
}
