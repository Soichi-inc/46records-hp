"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const footerLinks = [
  { label: "NEWS", href: "/news" },
  { label: "ARTISTS", href: "/artists" },
  { label: "SOLUTION", href: "/solution" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/46records_official" },
  { label: "YouTube", href: "https://www.youtube.com/@46records_official" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === footerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-widest text-neutral-900 hover:opacity-80 transition-opacity"
            >
              46Records
            </Link>
            <p className="mt-4 text-sm text-black/40 leading-relaxed">
              音楽を通じて、
              <br />
              アーティストと世界をつなぐ。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-widest uppercase text-black/40 mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-black/60 hover:text-black transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs tracking-widest uppercase text-black/40 mb-4">
              Social
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black/60 hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-black/30">
            &copy; 2026 46Records. ALL RIGHTS RESERVED.
          </p>
          <Link
            href="/contact"
            className="text-xs text-black/30 hover:text-black transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </footer>
  );
}
