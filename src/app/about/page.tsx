import type { Metadata } from "next";
import SplitText from "@/components/ui/SplitText";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "What's 46Records",
  description: "46Recordsについて。レーベル理念、ビジョン、沿革。",
};

const timeline = [
  { year: "2024", event: "設立。BLUE SOUNDS始動" },
  { year: "2025", event: "所属アーティスト4名に" },
  { year: "2026", event: "公式サイトオープン。事務所移転" },
];

const companyInfo = [
  { label: "名称", value: "46Records合同会社" },
  { label: "所在地", value: "〒107-0061 東京都港区北青山2-14-4 the ARGYLE aoyama 6F" },
  { label: "アクセス", value: "東京メトロ銀座線「外苑前駅」3番出口から徒歩2分 / 東京メトロ半蔵門線・千代田線「表参道駅」A3出口から徒歩6分" },
  { label: "設立", value: "2024年" },
  { label: "代表", value: "挾間 彬" },
  { label: "事業内容", value: "アーティストマネジメント / 楽曲制作 / イベント企画 / 楽曲配信" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with background video */}
      <section className="relative h-[60vh] flex items-end pb-16 px-8 md:px-16 lg:px-24 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero/backstage.jpg"
        >
          <source src="/videos/hero-landscape.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <SplitText
            as="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg"
          >
            {"What's\n46Records"}
          </SplitText>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-[1.2] tracking-tight mb-10">
              WE BELIEVE IN
              <br />
              THE POWER OF MUSIC
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-black/60 leading-[2] max-w-2xl">
              音楽には、国境を越え、世代を超えて人々をつなぐ力があります。
              46Recordsは、その力を信じ、次世代のアーティストとともに
              新しい音楽の形を創り続けます。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="mt-6 text-base md:text-lg text-black/60 leading-[2] max-w-2xl">
              私たちは、アーティストの個性と才能を最大限に引き出し、
              彼らの音楽を世界中のリスナーに届けることをミッションとしています。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-black/10">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-16">
            History
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl">
          {timeline.map((item, index) => (
            <ScrollReveal key={item.year} delay={index * 0.1}>
              <div className="flex gap-8 md:gap-16 py-8 border-b border-black/10">
                <span className="text-2xl md:text-3xl font-bold text-accent tabular-nums min-w-[80px]">
                  {item.year}
                </span>
                <p className="text-base text-black/60 pt-2">{item.event}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-black/10">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-16">
            Company
          </h2>
        </ScrollReveal>

        <div className="max-w-3xl">
          {companyInfo.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 0.08}>
              <div className="flex flex-col md:flex-row gap-2 md:gap-16 py-6 border-b border-black/10">
                <span className="text-sm text-black/40 min-w-[120px] shrink-0">
                  {item.label}
                </span>
                <span className="text-sm text-black/80 whitespace-pre-line">
                  {item.label === "アクセス"
                    ? item.value.split(" / ").join("\n")
                    : item.value}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
