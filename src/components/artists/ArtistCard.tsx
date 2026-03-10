"use client";

import Link from "next/link";
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
          <div className="w-full h-full bg-sub group-hover:scale-110 transition-transform duration-700 flex items-center justify-center text-white/10 text-xs">
            PHOTO
          </div>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold text-white tracking-wider group-hover:text-accent transition-colors duration-300">
          {artist.name}
        </h3>
        <p className="text-[11px] text-white/40 mt-1 tracking-wider">
          {artist.nameEn}
        </p>
      </Link>
    </ScrollReveal>
  );
}
