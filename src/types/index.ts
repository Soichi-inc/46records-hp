export type NewsCategory = "RELEASE" | "LIVE" | "OTHER";

export interface News {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  body: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  nameEn: string;
  photo: {
    url: string;
    width: number;
    height: number;
  };
  profilePhoto?: {
    url: string;
    width: number;
    height: number;
  };
  bio?: string;
  genre?: string;
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  sortOrder: number;
}

export interface SolutionItem {
  title: string;
  titleJa: string;
  description: string;
  image: string;
}
