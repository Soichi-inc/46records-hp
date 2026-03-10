"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const galleryImages = [
  { src: "/images/gallery/live-vocal.jpg", aspect: "aspect-[3/4]", span: "" },
  { src: "/images/gallery/group-shoot-3.jpg", aspect: "aspect-[4/3]", span: "md:col-span-2" },
  { src: "/images/gallery/flower-portrait.jpg", aspect: "aspect-[3/4]", span: "" },
  { src: "/images/gallery/moody-portrait.jpg", aspect: "aspect-[4/3]", span: "" },
  { src: "/images/gallery/yoro-ando.jpg", aspect: "aspect-[3/4]", span: "" },
  { src: "/images/gallery/wide-shot.jpg", aspect: "aspect-[16/9]", span: "md:col-span-2" },
  { src: "/images/gallery/studio-portrait.jpg", aspect: "aspect-[3/4]", span: "" },
  { src: "/images/gallery/outdoor.jpg", aspect: "aspect-[4/3]", span: "" },
  { src: "/images/gallery/live-red.jpg", aspect: "aspect-[3/4]", span: "" },
  { src: "/images/events/hady-artwork.jpg", aspect: "aspect-square", span: "" },
  { src: "/images/gallery/backstage-group.jpg", aspect: "aspect-[4/3]", span: "md:col-span-2" },
  { src: "/images/gallery/duo-outdoor.jpg", aspect: "aspect-[3/4]", span: "" },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !titleRef.current) return;

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

    // Staggered card reveals with scale
    const cards = gridRef.current.children;
    Array.from(cards).forEach((card, i) => {
      const img = card.querySelector("img");

      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card as Element,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Parallax on each image
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card as Element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });

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
      className="relative bg-neutral-950 py-32 md:py-40 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Section title */}
      <div ref={titleRef} className="mb-16 md:mb-20 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          GALLERY
        </h2>
        <p className="mt-4 text-sm text-white/30 tracking-widest uppercase">
          Behind the scenes
        </p>
      </div>

      {/* Masonry-like grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`relative ${img.aspect} overflow-hidden rounded-sm ${img.span} group cursor-pointer`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={img.span ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
