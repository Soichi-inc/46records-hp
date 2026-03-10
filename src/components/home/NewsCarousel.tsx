"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { News } from "@/types";

interface NewsCarouselProps {
  news: News[];
}

export default function NewsCarousel({ news }: NewsCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !titleRef.current) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const track = trackRef.current;
    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-0 md:h-screen overflow-hidden"
    >
      {/* Section title */}
      <div
        ref={titleRef}
        className="px-8 md:px-16 lg:px-24 md:absolute md:top-16 md:left-0 md:z-10 mb-10 md:mb-0"
      >
        <div className="flex items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
            NEWS
          </h2>
          <Link
            href="/news"
            className="text-xs tracking-[0.2em] text-black/40 hover:text-black transition-colors"
          >
            VIEW ALL &rarr;
          </Link>
        </div>
      </div>

      {/* Horizontal scroll track (desktop) / Vertical cards (mobile) */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 px-8 md:px-16 lg:px-24 md:h-full md:pt-24"
        style={{ willChange: "transform" }}
      >
        {news.map((item, index) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="group flex-shrink-0 w-full md:w-[350px] lg:w-[400px]"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-[16/10] bg-sub rounded-sm overflow-hidden mb-4">
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-full h-full bg-sub group-hover:scale-105 transition-transform duration-500">
                {/* Replace with next/image when actual images are available */}
                <div className="w-full h-full flex items-center justify-center text-black/10 text-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] tracking-widest text-accent font-medium">
                {item.category}
              </span>
              <span className="text-[10px] text-black/30">
                {formatDate(item.publishedAt)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm md:text-base text-black/80 group-hover:text-black transition-colors leading-relaxed line-clamp-2">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
