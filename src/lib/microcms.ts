import { createClient } from "microcms-js-sdk";
import type { News, Artist, NewsCategory } from "@/types";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const client =
  serviceDomain && apiKey
    ? createClient({
        serviceDomain,
        apiKey,
      })
    : null;

interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

export async function getNewsList(params?: {
  limit?: number;
  offset?: number;
  category?: NewsCategory;
}): Promise<MicroCMSListResponse<News>> {
  if (!client) {
    return {
      contents: dummyNews,
      totalCount: dummyNews.length,
      offset: 0,
      limit: 10,
    };
  }

  const filters = params?.category
    ? `category[equals]${params.category}`
    : undefined;

  const data = await client.getList<News>({
    endpoint: "news",
    queries: {
      limit: params?.limit ?? 10,
      offset: params?.offset ?? 0,
      filters,
      orders: "-publishedAt",
    },
  });

  return data;
}

export async function getNewsDetail(slug: string): Promise<News | null> {
  if (!client) {
    return dummyNews.find((n) => n.slug === slug) ?? null;
  }

  const data = await client.getList<News>({
    endpoint: "news",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  return data.contents[0] ?? null;
}

export async function getArtistsList(): Promise<
  MicroCMSListResponse<Artist>
> {
  if (!client) {
    return {
      contents: dummyArtists,
      totalCount: dummyArtists.length,
      offset: 0,
      limit: 100,
    };
  }

  const data = await client.getList<Artist>({
    endpoint: "artists",
    queries: {
      limit: 100,
      orders: "sortOrder",
    },
  });

  return data;
}

export async function getArtistDetail(slug: string): Promise<Artist | null> {
  if (!client) {
    return dummyArtists.find((a) => a.slug === slug) ?? null;
  }

  const data = await client.getList<Artist>({
    endpoint: "artists",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  return data.contents[0] ?? null;
}

// --- Dummy Data ---

const dummyNews: News[] = [
  {
    id: "1",
    title: "46Records 公式サイトオープン",
    slug: "official-site-open",
    category: "OTHER",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>46Recordsの公式サイトがオープンしました。今後、アーティスト情報やリリース情報をこちらで発信していきます。</p>",
    publishedAt: "2026-03-01T00:00:00.000Z",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: "2026-03-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "新アーティスト所属決定のお知らせ",
    slug: "new-artist-announcement",
    category: "OTHER",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>新たなアーティストが46Recordsに所属することが決定しました。詳細は後日発表いたします。</p>",
    publishedAt: "2026-02-20T00:00:00.000Z",
    createdAt: "2026-02-20T00:00:00.000Z",
    updatedAt: "2026-02-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "1st Single「Horizon」リリース決定",
    slug: "first-single-horizon",
    category: "RELEASE",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>46Records第1弾シングル「Horizon」のリリースが決定しました。配信日は2026年4月を予定しています。</p>",
    publishedAt: "2026-02-15T00:00:00.000Z",
    createdAt: "2026-02-15T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z",
  },
  {
    id: "4",
    title: "初ライブイベント開催決定",
    slug: "first-live-event",
    category: "LIVE",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>46Records初となるライブイベントの開催が決定しました。出演アーティスト・会場等の詳細は追って発表します。</p>",
    publishedAt: "2026-02-10T00:00:00.000Z",
    createdAt: "2026-02-10T00:00:00.000Z",
    updatedAt: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "5",
    title: "コラボレーションプロジェクト始動",
    slug: "collaboration-project",
    category: "OTHER",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>他レーベルとのコラボレーションプロジェクトが始動します。</p>",
    publishedAt: "2026-02-01T00:00:00.000Z",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "6",
    title: "2nd Single「Pulse」制作開始",
    slug: "second-single-pulse",
    category: "RELEASE",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>2ndシングル「Pulse」の制作が開始されました。</p>",
    publishedAt: "2026-01-25T00:00:00.000Z",
    createdAt: "2026-01-25T00:00:00.000Z",
    updatedAt: "2026-01-25T00:00:00.000Z",
  },
  {
    id: "7",
    title: "春フェス出演アーティスト発表",
    slug: "spring-fes-artists",
    category: "LIVE",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>春のフェスティバルに出演するアーティストを発表します。</p>",
    publishedAt: "2026-01-15T00:00:00.000Z",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "8",
    title: "レーベルビジョンを公開",
    slug: "label-vision",
    category: "OTHER",
    thumbnail: { url: "/images/news-placeholder.jpg", width: 800, height: 450 },
    body: "<p>46Recordsのビジョンと今後の展望を公開しました。</p>",
    publishedAt: "2026-01-10T00:00:00.000Z",
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-01-10T00:00:00.000Z",
  },
];

const dummyArtists: Artist[] = [
  {
    id: "1",
    name: "星野 ルカ",
    slug: "hoshino-ruka",
    nameEn: "Ruka Hoshino",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>東京出身のシンガーソングライター。透明感のある歌声とエモーショナルな楽曲で注目を集める。</p>",
    genre: "Pop / Singer-Songwriter",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "X", url: "#" },
      { platform: "Spotify", url: "#" },
    ],
    sortOrder: 1,
  },
  {
    id: "2",
    name: "KAZE",
    slug: "kaze",
    nameEn: "KAZE",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>独自の世界観で楽曲を紡ぐプロデューサー/アーティスト。エレクトロニックとオーガニックサウンドの融合を追求。</p>",
    genre: "Electronic / Ambient",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "X", url: "#" },
    ],
    sortOrder: 2,
  },
  {
    id: "3",
    name: "藤原 ミナ",
    slug: "fujiwara-mina",
    nameEn: "Mina Fujiwara",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>R&Bとネオソウルを軸に、日本語と英語を操るバイリンガルシンガー。</p>",
    genre: "R&B / Neo Soul",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Spotify", url: "#" },
    ],
    sortOrder: 3,
  },
  {
    id: "4",
    name: "ECHO DRIFT",
    slug: "echo-drift",
    nameEn: "ECHO DRIFT",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>3ピースバンド。ポストロックとシューゲイザーの影響を受けたサウンドスケープ。</p>",
    genre: "Post-Rock / Shoegaze",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "X", url: "#" },
    ],
    sortOrder: 4,
  },
  {
    id: "5",
    name: "YUI",
    slug: "yui",
    nameEn: "YUI",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>ダンスミュージックとJ-POPを融合させた新世代アーティスト。</p>",
    genre: "Dance Pop",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "X", url: "#" },
      { platform: "TikTok", url: "#" },
    ],
    sortOrder: 5,
  },
  {
    id: "6",
    name: "黒田 タクミ",
    slug: "kuroda-takumi",
    nameEn: "Takumi Kuroda",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>ジャズとヒップホップの境界を行き来するマルチインストゥルメンタリスト。</p>",
    genre: "Jazz / Hip-Hop",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Spotify", url: "#" },
    ],
    sortOrder: 6,
  },
  {
    id: "7",
    name: "NOVA",
    slug: "nova",
    nameEn: "NOVA",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>未来的なサウンドデザインとポップセンスを併せ持つ音楽プロデューサー。</p>",
    genre: "Future Bass / Pop",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "X", url: "#" },
    ],
    sortOrder: 7,
  },
  {
    id: "8",
    name: "白石 アオイ",
    slug: "shiraishi-aoi",
    nameEn: "Aoi Shiraishi",
    photo: { url: "/images/artist-placeholder.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-placeholder.jpg", width: 1200, height: 800 },
    bio: "<p>アコースティックギターと歌を武器に、心に寄り添う音楽を届けるフォークシンガー。</p>",
    genre: "Folk / Acoustic",
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "X", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    sortOrder: 8,
  },
];
