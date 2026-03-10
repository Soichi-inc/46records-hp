import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "46Records | Music Label",
    template: "%s | 46Records",
  },
  description:
    "音楽を通じて、アーティストと世界をつなぐ。46Recordsは、次世代のアーティストを発掘し、彼らの音楽を国内外に届けるレーベルです。",
  openGraph: {
    title: "46Records | Music Label",
    description:
      "音楽を通じて、アーティストと世界をつなぐ。次世代のアーティストを発掘し、音楽を届けるレーベル。",
    siteName: "46Records",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
