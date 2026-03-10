import type { Metadata } from "next";
import Link from "next/link";
import SplitText from "@/components/ui/SplitText";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "SOLUTION",
  description: "46Recordsが提供するサービス一覧。アーティストマネジメント、楽曲制作、イベント企画、配信。",
};

const solutions = [
  {
    num: "01",
    title: "Artist Management",
    titleJa: "アーティストマネジメント",
    description:
      "アーティストの発掘・育成から、キャリア戦略の立案・実行まで。一人ひとりの個性と才能を最大限に引き出し、長期的な成長をサポートします。ブランディング、メディア対応、ファンコミュニティの構築まで、包括的にマネジメントを行います。",
    features: ["タレント発掘・スカウト", "キャリアプランニング", "ブランディング", "メディア対応"],
  },
  {
    num: "02",
    title: "Music Production",
    titleJa: "楽曲制作",
    description:
      "作曲・編曲からレコーディング、ミックス・マスタリングまで、最高品質の音楽制作環境を提供。国内外のトップクリエイターとのネットワークを活かし、アーティストのビジョンを形にします。",
    features: ["作曲・編曲", "レコーディング", "ミックス・マスタリング", "コライト"],
  },
  {
    num: "03",
    title: "Event Planning",
    titleJa: "イベント企画",
    description:
      "ライブ・フェスティバルの企画制作から運営まで、トータルプロデュース。アーティストの世界観を忠実に再現し、観客に忘れられない体験を届けます。",
    features: ["ライブ企画・制作", "フェスティバル運営", "ファンミーティング", "配信イベント"],
  },
  {
    num: "04",
    title: "Licensing & Distribution",
    titleJa: "配信・ライセンス管理",
    description:
      "国内外の主要プラットフォームへの楽曲配信とライセンス管理を行います。収益最大化のための戦略的なリリースプランニングから、権利処理まで一貫してサポート。",
    features: ["デジタル配信", "フィジカル流通", "ライセンス管理", "収益分析"],
  },
];

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end pb-16 px-8 md:px-16 lg:px-24">
        <div className="absolute inset-0 bg-gradient-to-b from-sub to-white" />
        <div className="relative z-10">
          <SplitText
            as="h1"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900"
          >
            SOLUTION
          </SplitText>
          <ScrollReveal delay={0.3}>
            <p className="mt-6 text-base text-black/50 max-w-lg leading-relaxed">
              46Recordsは音楽に関わるすべてのプロセスをサポートします。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24">
        {solutions.map((solution, index) => (
          <ScrollReveal key={solution.num}>
            <div
              className={`flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 lg:gap-20 px-8 md:px-16 lg:px-24 py-16 md:py-24 border-t border-black/10`}
            >
              {/* Image placeholder */}
              <div className="lg:w-1/2">
                <div className="w-full aspect-[4/3] bg-sub rounded-sm flex items-center justify-center text-black/10 text-sm">
                  {solution.title}
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <span className="text-xs text-accent tracking-widest mb-4">
                  {solution.num}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-2">
                  {solution.title}
                </h2>
                <p className="text-sm text-black/40 mb-6">{solution.titleJa}</p>
                <p className="text-sm text-black/60 leading-[2] mb-8">
                  {solution.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {solution.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-[11px] text-black/50 px-3 py-1.5 border border-black/10 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-black/10 text-center">
        <ScrollReveal>
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 tracking-tight mb-6">
            お気軽にお問い合わせください
          </h2>
          <p className="text-sm text-black/40 mb-10">
            サービスに関するご質問・ご相談はこちらから
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-white text-sm font-bold tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
          >
            CONTACT US
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
