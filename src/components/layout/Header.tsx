"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import HamburgerMenu from "./HamburgerMenu";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          <Link
            href="/"
            className="text-neutral-900 text-xl md:text-2xl font-bold tracking-widest hover:opacity-80 transition-opacity"
          >
            46Records
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="relative z-50 flex flex-col items-center justify-center w-10 h-10 gap-1.5 group"
            aria-label="メニューを開く"
          >
            <span className="block w-6 h-[1.5px] bg-neutral-900 transition-all duration-300 group-hover:w-8" />
            <span className="block w-8 h-[1.5px] bg-neutral-900 transition-all duration-300" />
            <span className="block w-4 h-[1.5px] bg-neutral-900 transition-all duration-300 group-hover:w-8" />
          </button>
        </div>
      </header>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
