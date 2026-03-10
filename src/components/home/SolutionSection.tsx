"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const services = [
  {
    num: "01",
    title: "Artist Management",
    titleJa: "アーティストマネジメント",
    description: "アーティストの発掘・育成から、キャリア戦略の立案・実行まで。",
  },
  {
    num: "02",
    title: "Music Production",
    titleJa: "楽曲制作",
    description: "レコーディングからミックス・マスタリングまで、最高品質の音楽制作。",
  },
  {
    num: "03",
    title: "Event Planning",
    titleJa: "イベント企画",
    description: "ライブ・フェスティバルの企画制作から運営まで、トータルプロデュース。",
  },
  {
    num: "04",
    title: "Distribution",
    titleJa: "配信・ライセンス",
    description: "国内外の主要プラットフォームへの楽曲配信とライセンス管理。",
  },
];

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Cards stagger animation
    const cards = cardsRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (
          t.trigger &&
          sectionRef.current?.contains(t.trigger as Node)
        ) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-32 md:py-40 px-8 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <div ref={titleRef} className="mb-16 md:mb-20">
        <div className="flex items-center gap-6 mb-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">
            OUR SOLUTION
          </h2>
        </div>
        <p className="text-base text-black/40 max-w-lg leading-relaxed">
          46Recordsは音楽に関わるすべてのプロセスをサポートします。
        </p>
      </div>

      {/* Service cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
      >
        {services.map((service) => (
          <div
            key={service.num}
            className="group p-8 md:p-10 bg-sub rounded-sm border border-black/5 hover:border-black/15 transition-all duration-500"
          >
            <span className="text-xs text-accent tracking-widest">
              {service.num}
            </span>
            <h3 className="mt-4 text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              {service.title}
            </h3>
            <p className="mt-1 text-sm text-black/40">{service.titleJa}</p>
            <p className="mt-4 text-sm text-black/60 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/solution"
          className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] text-black/70 hover:text-black transition-colors duration-300"
        >
          VIEW MORE
          <span className="block w-8 h-[1px] bg-black/40 group-hover:w-16 transition-all duration-300 group-hover:bg-black" />
        </Link>
      </div>
    </section>
  );
}
