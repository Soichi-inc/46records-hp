"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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

    // Parallax on image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: -80 },
        {
          y: 80,
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
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden"
    >
      {/* Background image with parallax (will be replaced with video) */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={imageRef} className="absolute -top-[80px] -bottom-[80px] left-0 right-0">
          <Image
            src="/images/hero/backstage.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black z-10"
      />

      {/* Center logo/text */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center justify-center h-full gap-6">
        <Image
          src="/images/logo/logo-outline.png"
          alt="46Records"
          width={400}
          height={400}
          className="w-[200px] md:w-[300px] invert opacity-80"
        />
        <p className="text-white/40 text-xs md:text-sm tracking-[0.5em] uppercase font-light">
          Music Label & Management
        </p>
      </div>
    </section>
  );
}
