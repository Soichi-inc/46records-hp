"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "NEWS", href: "/news" },
  { label: "ARTISTS", href: "/artists" },
  { label: "SOLUTION", href: "/solution" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Spotify", href: "#" },
];

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const sideInfoRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current || !menuItemsRef.current || !sideInfoRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.set(overlayRef.current, { display: "flex" })
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )
      .fromTo(
        menuItemsRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .fromTo(
        sideInfoRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
      const duration = tlRef.current.duration() * 1000;
      setTimeout(() => {
        document.body.style.overflow = "";
      }, duration);
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm hidden"
      style={{ display: "none" }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-6 md:right-10 z-10 flex items-center justify-center w-10 h-10 text-white hover:text-accent transition-colors"
        aria-label="メニューを閉じる"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </button>

      <div className="flex w-full h-full">
        {/* Left: Menu Items */}
        <div className="flex-1 flex items-center px-10 md:px-20 lg:px-32">
          <div ref={menuItemsRef} className="flex flex-col gap-2 md:gap-4">
            {menuItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block text-4xl md:text-6xl lg:text-7xl font-bold text-white hover:text-accent transition-colors duration-300 tracking-wider"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div
          ref={sideInfoRef}
          className="hidden md:flex flex-col justify-end pb-16 pr-16 w-80 text-white/60"
        >
          <div className="mb-10">
            <p className="text-xs tracking-widest uppercase mb-4 text-white/40">
              Social
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase mb-4 text-white/40">
              Contact
            </p>
            <p className="text-sm leading-relaxed">
              info@46records.com
              <br />
              Tokyo, Japan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
