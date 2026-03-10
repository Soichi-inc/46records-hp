"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import SplitText from "@/components/ui/SplitText";
import ScrollReveal from "@/components/ui/ScrollReveal";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.email("有効なメールアドレスを入力してください"),
  company: z.string().optional(),
  type: z.string().min(1, "お問い合わせ種別を選択してください"),
  message: z.string().min(1, "お問い合わせ内容を入力してください"),
});

type ContactForm = z.infer<typeof contactSchema>;

const inquiryTypes = [
  "アーティストに関するお問い合わせ",
  "楽曲利用について",
  "イベント出演依頼",
  "デモ音源の送付",
  "メディア取材",
  "その他",
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    // Validate with Zod
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      setIsSubmitting(false);
      return;
    }

    // For now, console.log the data (replace with API call later)
    console.log("Form submitted:", result.data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-44 pb-32 px-8 md:px-16 lg:px-24">
      {/* Page Title */}
      <div className="mb-20">
        <SplitText
          as="h1"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900"
        >
          CONTACT
        </SplitText>
        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-sm text-black/40 max-w-lg leading-[2]">
            お問い合わせは下記フォームよりお送りください。
            <br />
            内容を確認の上、折り返しご連絡いたします。
          </p>
          <p className="mt-4 text-sm text-black/40">
            Email:{" "}
            <a
              href="mailto:46records.info@gmail.com"
              className="text-black/60 hover:text-black transition-colors underline underline-offset-4"
            >
              46records.info@gmail.com
            </a>
          </p>
        </ScrollReveal>
      </div>

      {isSubmitted ? (
        <ScrollReveal>
          <div className="max-w-2xl py-20">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              送信完了
            </h2>
            <p className="text-sm text-black/60 leading-relaxed">
              お問い合わせいただきありがとうございます。
              <br />
              内容を確認の上、担当者より折り返しご連絡いたします。
            </p>
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl space-y-12"
          >
            {/* Name */}
            <div>
              <label className="block text-xs text-black/40 tracking-widest uppercase mb-4">
                お名前 <span className="text-accent">*</span>
              </label>
              <input
                {...register("name", { required: "お名前を入力してください" })}
                className="w-full bg-sub border border-black/10 focus:border-black/30 rounded-sm px-5 py-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-black/20"
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-accent">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-black/40 tracking-widest uppercase mb-4">
                メールアドレス <span className="text-accent">*</span>
              </label>
              <input
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "有効なメールアドレスを入力してください",
                  },
                })}
                type="email"
                className="w-full bg-sub border border-black/10 focus:border-black/30 rounded-sm px-5 py-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-black/20"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-accent">{errors.email.message}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs text-black/40 tracking-widest uppercase mb-4">
                会社名 / 組織名
              </label>
              <input
                {...register("company")}
                className="w-full bg-sub border border-black/10 focus:border-black/30 rounded-sm px-5 py-4 text-sm text-neutral-900 outline-none transition-colors placeholder:text-black/20"
                placeholder="株式会社○○"
              />
            </div>

            {/* Inquiry Type */}
            <div>
              <label className="block text-xs text-black/40 tracking-widest uppercase mb-4">
                お問い合わせ種別 <span className="text-accent">*</span>
              </label>
              <select
                {...register("type", {
                  required: "お問い合わせ種別を選択してください",
                })}
                className="w-full bg-sub border border-black/10 focus:border-black/30 rounded-sm px-5 py-4 text-sm text-neutral-900 outline-none transition-colors appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="bg-white">
                  選択してください
                </option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type} className="bg-white">
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-2 text-xs text-accent">{errors.type.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs text-black/40 tracking-widest uppercase mb-4">
                お問い合わせ内容 <span className="text-accent">*</span>
              </label>
              <textarea
                {...register("message", {
                  required: "お問い合わせ内容を入力してください",
                })}
                rows={8}
                className="w-full bg-sub border border-black/10 focus:border-black/30 rounded-sm px-5 py-4 text-sm text-neutral-900 outline-none transition-colors resize-none placeholder:text-black/20"
                placeholder="お問い合わせ内容をご記入ください"
              />
              {errors.message && (
                <p className="mt-2 text-xs text-accent">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-5 bg-black text-white text-sm font-bold tracking-widest hover:bg-accent hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SENDING..." : "SEND"}
              </button>
            </div>
          </form>
        </ScrollReveal>
      )}
    </div>
  );
}
