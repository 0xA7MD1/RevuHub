export interface Article {
  id: number;
  title: string;
  seo_title?: string | null;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  image_alt_text: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  published_at: string | null;
  updated_at: string | null;
  reading_time?: number; // Calculated field
  lang?: string;
}

export interface Category {
  id: string;
  en: string;
  ar: string;
  [key: string]: string;
}
