"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0.7 },
      {
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
    >
      {/* Video placeholder — replace src with actual video */}
      <div className="absolute inset-0 bg-gradient-to-br from-sub via-black to-sub">
        {/* Uncomment when video is ready:
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        */}
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
      />

      {/* Optional center text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-white/20 text-lg md:text-xl tracking-[0.5em] uppercase font-light">
          46Records
        </p>
      </div>
    </section>
  );
}
