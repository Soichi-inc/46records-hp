"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <div className="flex items-center justify-between px-6 md:px-10 py-3">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity flex items-center"
          >
            {/* White logo for dark hero, black logo for scrolled white bg */}
            <Image
              src="/images/logo/logo-white-transparent.png"
              alt="46Records"
              width={353}
              height={120}
              className={`h-7 md:h-8 w-auto absolute transition-opacity duration-500 ${
                isScrolled ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            <Image
              src="/images/logo/logo-black-transparent.png"
              alt="46Records"
              width={353}
              height={120}
              className={`h-7 md:h-8 w-auto transition-opacity duration-500 ${
                isScrolled ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="relative z-50 flex flex-col items-center justify-center w-10 h-10 gap-1.5 group"
            aria-label="メニューを開く"
          >
            <span className={`block w-6 h-[1.5px] transition-all duration-300 group-hover:w-8 ${
              isScrolled ? "bg-neutral-900" : "bg-white"
            }`} />
            <span className={`block w-8 h-[1.5px] transition-all duration-300 ${
              isScrolled ? "bg-neutral-900" : "bg-white"
            }`} />
            <span className={`block w-4 h-[1.5px] transition-all duration-300 group-hover:w-8 ${
              isScrolled ? "bg-neutral-900" : "bg-white"
            }`} />
          </button>
        </div>
      </header>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
