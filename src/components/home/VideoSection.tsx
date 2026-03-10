"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return;

    // Overlay fades on scroll
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0.6 },
      {
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Text reveal
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black"
    >
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero/backstage.jpg"
        >
          <source src="/videos/hero-landscape.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-10"
      />

      {/* Center logo/text */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center justify-center h-full gap-6">
        <Image
          src="/images/logo/logo-white-transparent.png"
          alt="46Records"
          width={353}
          height={120}
          className="w-[200px] md:w-[300px] opacity-80"
        />
        <p className="text-white/40 text-xs md:text-sm tracking-[0.5em] uppercase font-light">
          Music Label & Management
        </p>
      </div>
    </section>
  );
}
