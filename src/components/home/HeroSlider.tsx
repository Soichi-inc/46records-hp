"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";

const slides = [
  {
    title: "CONNECT\nTHROUGH\nMUSIC",
    subtitle: "音楽で、世界をつなぐ。",
    bg: "#111",
  },
  {
    title: "DISCOVER\nNEW\nARTISTS",
    subtitle: "次世代のアーティストを発掘する。",
    bg: "#0A0A0A",
  },
  {
    title: "CREATE\nTHE\nFUTURE",
    subtitle: "音楽の未来を創る。",
    bg: "#080808",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const animateSlide = useCallback((index: number) => {
    if (!titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline();

    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in",
    })
      .call(() => {
        setCurrent(index);
      })
      .set([titleRef.current, subtitleRef.current], { y: 30 })
      .to([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

    // Progress bar
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" }
      );
    }
  }, []);

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        counterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      );

    // Progress bar initial
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" }
      );
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = (current + 1) % slides.length;
      animateSlide(next);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current, animateSlide]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: slides[current].bg }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

      {/* Video placeholder — replace with actual video */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-black via-dark to-black opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24">
        <div ref={titleRef}>
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white whitespace-pre-line">
            {slides[current].title}
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="mt-6 text-base md:text-lg text-white/70 font-light tracking-wide font-[var(--font-noto-sans-jp)]"
        >
          {slides[current].subtitle}
        </p>
      </div>

      {/* Slide counter */}
      <div
        ref={counterRef}
        className="absolute bottom-10 right-8 md:right-16 z-20 flex items-center gap-4"
      >
        <span className="text-sm text-white/80 font-light tabular-nums">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-white origin-left"
          />
        </div>
        <span className="text-sm text-white/40 font-light tabular-nums">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-8 md:left-16 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
