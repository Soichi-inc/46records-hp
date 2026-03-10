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
    name: "安藤優",
    slug: "ando-yu",
    nameEn: "Ando Yu",
    photo: { url: "/images/artist-ando-yu.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-ando-yu.jpg", width: 1200, height: 800 },
    bio: "<p>山形県出身、東京都在住のシンガーソングライター/ラッパー。1998年10月23日生まれ。</p><p>Produce 101 Japan出演を経て、Boom Triggerのリーダーとして活動。BMSGオーディションにも参加。2024年より46Records所属アーティストとして活動開始。J-Popとヒップホップ/ラップを融合した独自のスタイルで注目を集める。</p>",
    genre: "J-Pop / Hip-Hop",
    socialLinks: [
      { platform: "X", url: "https://x.com/andouyuudesu" },
      { platform: "Instagram", url: "https://www.instagram.com/andouyuudesu" },
      { platform: "YouTube", url: "https://www.youtube.com/@andouyoutube" },
      { platform: "Spotify", url: "https://open.spotify.com/artist/14OBA0A48FRdVfllxsSOkx" },
      { platform: "TikTok", url: "https://www.tiktok.com/@andouyuudesu" },
    ],
    sortOrder: 1,
  },
  {
    id: "2",
    name: "YORO",
    slug: "yoro",
    nameEn: "YORO",
    photo: { url: "/images/artist-yoro.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-yoro.jpg", width: 1200, height: 800 },
    bio: "<p>神奈川県横浜市出身のラッパー/ソングライター。2023年より活動開始。</p><p>アーティスト名の由来は「YOLO (You Only Live Once)」と本名「RYO」を掛け合わせた造語。音楽イベント「BLUE SOUNDS」の主催者としても知られる。Instagramフォロワー4.1万人。</p>",
    genre: "J-Pop / Hip-Hop",
    socialLinks: [
      { platform: "X", url: "https://twitter.com/ok_yoro" },
      { platform: "Instagram", url: "https://www.instagram.com/ok_yoro/" },
      { platform: "YouTube", url: "https://youtube.com/@ok_yoro" },
      { platform: "Spotify", url: "https://open.spotify.com/artist/2T8R46HMzNN8KSuh7iCD0h" },
      { platform: "TikTok", url: "https://www.tiktok.com/@ok_yoro" },
    ],
    sortOrder: 2,
  },
  {
    id: "3",
    name: "HINATA",
    slug: "hinata",
    nameEn: "HINATA",
    photo: { url: "/images/artist-hinata.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-hinata.jpg", width: 1200, height: 800 },
    bio: "<p>大阪府出身、東京都在住。2000年生まれの新世代シンガーソングライター。</p><p>作詞・作曲・ミキシングまでをすべて自身で手がける。Neo-Soulをベースに、R&Bやソウルを融合した独自のサウンドが特徴。</p>",
    genre: "R&B / Soul",
    socialLinks: [
      { platform: "Instagram", url: "https://www.instagram.com/_diamusic_/" },
      { platform: "Spotify", url: "https://open.spotify.com/artist/046dJ97cr01tZCk26ji7u4" },
      { platform: "YouTube", url: "https://www.youtube.com/@46Records_official" },
    ],
    sortOrder: 3,
  },
  {
    id: "4",
    name: "HADY",
    slug: "hady",
    nameEn: "HADY",
    photo: { url: "/images/artist-hady.jpg", width: 600, height: 600 },
    profilePhoto: { url: "/images/artist-hady.jpg", width: 1200, height: 800 },
    bio: "<p>韓国出身のバイリンガルアーティスト。来日13年。</p><p>オリコン1位の実績を持ち、CODE-V、IDEA、NIKのメンバーとして活動。ヒップホップ/ラップとK-Popを融合したスタイルで、日韓両国のファンから支持を集める。</p>",
    genre: "Hip-Hop / K-Pop",
    socialLinks: [
      { platform: "X", url: "https://x.com/ideahady" },
      { platform: "Instagram", url: "https://www.instagram.com/ideahady/" },
      { platform: "Spotify", url: "https://open.spotify.com/artist/3kYUVzzyETlKrIpZprBCaQ" },
      { platform: "TikTok", url: "https://www.tiktok.com/@hady971123" },
    ],
    sortOrder: 4,
  },
];
