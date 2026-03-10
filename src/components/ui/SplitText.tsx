"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.03,
  trigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const text = children;

    // Split into lines
    const lines = text.split("\n").filter(Boolean);
    el.innerHTML = "";

    const lineElements: HTMLElement[] = [];

    lines.forEach((line) => {
      const lineWrapper = document.createElement("div");
      lineWrapper.style.overflow = "hidden";
      lineWrapper.style.display = "block";

      const lineInner = document.createElement("div");
      lineInner.style.display = "inline-block";

      // Split into chars
      const chars = line.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.textContent = char === " " ? "\u00A0" : char;
        lineInner.appendChild(span);
      });

      lineWrapper.appendChild(lineInner);
      el.appendChild(lineWrapper);
      lineElements.push(lineInner);
    });

    const allChars = el.querySelectorAll("span");

    const animConfig: gsap.TweenVars = {
      y: "100%",
      opacity: 0,
    };

    if (trigger) {
      gsap.fromTo(allChars, animConfig, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      });
    } else {
      gsap.fromTo(allChars, animConfig, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger,
        delay,
        ease: "power3.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [children, delay, stagger, trigger]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={containerRef as any}
      className={className}
    />
  );
}
