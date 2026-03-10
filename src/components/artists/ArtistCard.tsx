"use client";

import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <Link href={`/artists/${artist.slug}`} className="group block">
        {/* Photo */}
        <div className="relative w-full aspect-square bg-sub rounded-sm overflow-hidden mb-4">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 z-10" />
          <Image
            src={artist.photo.url}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-neutral-900 tracking-wider group-hover:text-accent transition-colors duration-300">
          {artist.name}
        </h3>
        <p className="text-[11px] text-black/40 mt-1 tracking-wider">
          {artist.nameEn}
        </p>
      </Link>
    </ScrollReveal>
  );
}
