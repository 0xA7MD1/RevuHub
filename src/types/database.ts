export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number;
          title_ar: string;
          title_en: string;
          slug_ar: string;
          slug_en: string;
          seo_title_ar: string | null;
          seo_title_en: string | null;
          category_ar: string | null;
          category_en: string | null;
          excerpt_ar: string | null;
          excerpt_en: string | null;
          content_ar: string;
          content_en: string;
          image_url: string | null;
          image_alt_text_ar: string | null;
          image_alt_text_en: string | null;
          meta_description_ar: string | null;
          meta_description_en: string | null;
          keywords_ar: string[] | null;
          keywords_en: string[] | null;
          published_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          title_ar: string;
          title_en: string;
          slug_ar: string;
          slug_en: string;
          seo_title_ar?: string | null;
          seo_title_en?: string | null;
          category_ar?: string | null;
          category_en?: string | null;
          excerpt_ar?: string | null;
          excerpt_en?: string | null;
          content_ar: string;
          content_en: string;
          image_url?: string | null;
          image_alt_text_ar?: string | null;
          image_alt_text_en?: string | null;
          meta_description_ar?: string | null;
          meta_description_en?: string | null;
          keywords_ar?: string[] | null;
          keywords_en?: string[] | null;
          published_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          title_ar?: string;
          title_en?: string;
          slug_ar?: string;
          slug_en?: string;
          seo_title_ar?: string | null;
          seo_title_en?: string | null;
          category_ar?: string | null;
          category_en?: string | null;
          excerpt_ar?: string | null;
          excerpt_en?: string | null;
          content_ar?: string;
          content_en?: string;
          image_url?: string | null;
          image_alt_text_ar?: string | null;
          image_alt_text_en?: string | null;
          meta_description_ar?: string | null;
          meta_description_en?: string | null;
          keywords_ar?: string[] | null;
          keywords_en?: string[] | null;
          published_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
}
