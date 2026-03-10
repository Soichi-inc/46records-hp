"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { NewsCategory } from "@/types";

const categories: { label: string; value: string }[] = [
  { label: "ALL", value: "" },
  { label: "RELEASE", value: "RELEASE" },
  { label: "LIVE", value: "LIVE" },
  { label: "OTHER", value: "OTHER" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className="flex gap-6 md:gap-8">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleClick(cat.value)}
          className={`relative text-sm tracking-[0.15em] pb-2 transition-colors duration-300 ${
            currentCategory === cat.value
              ? "text-neutral-900"
              : "text-black/40 hover:text-black/70"
          }`}
        >
          {cat.label}
          {currentCategory === cat.value && (
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent" />
          )}
        </button>
      ))}
    </div>
  );
}
