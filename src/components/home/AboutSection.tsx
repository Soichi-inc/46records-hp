"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const headlineLines = [
  "WE CONNECT",
  "ARTISTS",
  "AND THE WORLD",
  "THROUGH",
  "MUSIC.",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !linesRef.current || !descRef.current || !btnRef.current) return;

    const lines = linesRef.current.children;

    // Headline animation: each line reveals on scroll
    Array.from(lines).forEach((line) => {
      gsap.fromTo(
        line,
        { opacity: 0.1, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line as Element,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    // Parallax on background image
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // Description fade up
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Button fade up
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 90%",
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
      className="relative min-h-screen flex flex-col justify-center py-32 md:py-40 px-8 md:px-16 lg:px-24 bg-white overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute right-0 top-0 w-[50%] h-full overflow-hidden hidden md:block">
        <div ref={bgImageRef} className="absolute inset-0 -top-[50px] -bottom-[50px]">
          <Image
            src="/images/gallery/group-park.jpg"
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="50vw"
          />
        </div>
      </div>

      {/* Large headline */}
      <div ref={linesRef} className="mb-16 md:mb-20 relative z-10">
        {headlineLines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.15] tracking-tight text-neutral-900">
              {line}
            </h2>
          </div>
        ))}
      </div>

      {/* Japanese description */}
      <div ref={descRef} className="max-w-2xl relative z-10">
        <p className="text-base md:text-lg text-black/60 leading-[2] tracking-wide">
          音楽を通じて、アーティストと世界をつなぐ。
          <br />
          46Recordsは、次世代のアーティストを発掘し、
          <br />
          彼らの音楽を国内外に届けるレーベルです。
        </p>
      </div>

      {/* VIEW MORE button */}
      <div ref={btnRef} className="mt-12 relative z-10">
        <Link
          href="/about"
          className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] text-black/70 hover:text-black transition-colors duration-300"
        >
          VIEW MORE
          <span className="block w-8 h-[1px] bg-black/40 group-hover:w-16 transition-all duration-300 group-hover:bg-black" />
        </Link>
      </div>
    </section>
  );
}
