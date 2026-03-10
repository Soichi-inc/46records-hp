"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { Artist } from "@/types";

interface ArtistsSectionProps {
  artists: Artist[];
}

export default function ArtistsSection({ artists }: ArtistsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

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

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger &&
          sectionRef.current?.contains(t.trigger as Node)
        ) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-32 md:py-40 px-8 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <div ref={titleRef} className="mb-16 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
          ARTISTS
        </h2>
        <p className="mt-4 text-base text-black/40 max-w-lg leading-relaxed">
          46Records所属アーティスト
        </p>
      </div>

      {/* Artist grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
      >
        {artists.map((artist) => (
          <Link
            key={artist.id}
            href={`/artists/${artist.slug}`}
            className="group block"
          >
            <div className="relative w-full aspect-square bg-sub rounded-sm overflow-hidden mb-4">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 z-10" />
              <Image
                src={artist.photo.url}
                alt={artist.name}
                fill
                className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h3 className="text-sm font-bold text-neutral-900 tracking-wider group-hover:text-accent transition-colors duration-300">
              {artist.name}
            </h3>
            <p className="text-[11px] text-black/40 mt-1 tracking-wider">
              {artist.genre}
            </p>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/artists"
          className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] text-black/70 hover:text-black transition-colors duration-300"
        >
          VIEW ALL ARTISTS
          <span className="block w-8 h-[1px] bg-black/40 group-hover:w-16 transition-all duration-300 group-hover:bg-black" />
        </Link>
      </div>
    </section>
  );
}
