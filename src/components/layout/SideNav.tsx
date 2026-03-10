"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

const navItems = [
  { label: "ARTISTS", href: "/artists" },
  { label: "SOLUTION", href: "/solution" },
  { label: "NEWS", href: "/news" },
  { label: "ARTISTS", href: "/artists" },
  { label: "SOLUTION", href: "/solution" },
  { label: "NEWS", href: "/news" },
];

export default function SideNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;

    const inner = innerRef.current;
    const totalHeight = inner.scrollHeight / 2;

    gsap.to(inner, {
      y: -totalHeight,
      duration: 20,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y: number) => {
          return parseFloat(y as unknown as string) % totalHeight;
        }),
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-0 h-screen w-12 z-40 hidden lg:flex flex-col items-center justify-center overflow-hidden"
    >
      <div ref={innerRef} className="flex flex-col items-center gap-8">
        {[...navItems, ...navItems].map((item, index) => (
          <Link
            key={`${item.label}-${index}`}
            href={item.href}
            className="text-[10px] tracking-[0.3em] text-black/30 hover:text-black transition-colors duration-300 whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
