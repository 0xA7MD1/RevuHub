
import { supabase } from './supabase';
import { MOCK_ARTICLES } from './mock-data';
import { Article } from '../types';

type Lang = 'en' | 'ar';

const normalizeLang = (lang?: string): Lang => (lang === 'ar' ? 'ar' : 'en');

const toStringArray = (value: unknown): string[] | null => {
  if (!value) return null;
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string');
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    return trimmed
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
  return null;
};

const mapArticleRow = (row: any, lang: Lang): Article => {
  const isAr = lang === 'ar';
  return {
    id: Number(row.id),
    title: isAr ? row.title_ar : row.title_en,
    seo_title: isAr ? row.seo_title_ar : row.seo_title_en,
    slug: isAr ? row.slug_ar : row.slug_en,
    category: isAr ? row.category_ar : row.category_en,
    excerpt: isAr ? row.excerpt_ar : row.excerpt_en,
    content: isAr ? row.content_ar : row.content_en,
    image_url: row.image_url ?? null,
    image_alt_text: (isAr ? row.image_alt_text_ar : row.image_alt_text_en) ?? null,
    meta_description: (isAr ? row.meta_description_ar : row.meta_description_en) ?? null,
    keywords: toStringArray(isAr ? row.keywords_ar : row.keywords_en),
    published_at: row.published_at ?? null,
    updated_at: row.updated_at ?? null,
  };
};

export const getArticles = async (lang: string = 'en'): Promise<Article[]> => {
  if (!supabase) {
    return MOCK_ARTICLES.filter(a => a.lang === lang);
  }

  try {
    const normalizedLang = normalizeLang(lang);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return MOCK_ARTICLES.filter(a => a.lang === lang);

    return (data as any[]).map(row => mapArticleRow(row, normalizedLang));
  } catch (err) {
    console.error('Error fetching articles:', err);
    return MOCK_ARTICLES.filter(a => a.lang === lang);
  }
};

export const getArticlesByCategory = async (category: string, lang: string = 'en'): Promise<Article[]> => {
  if (!supabase) {
    return MOCK_ARTICLES.filter(a => a.lang === lang && (a.category || '').toLowerCase() === category.toLowerCase());
  }

  try {
    const normalizedLang = normalizeLang(lang);
    const categoryColumn = normalizedLang === 'ar' ? 'category_ar' : 'category_en';
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .ilike(categoryColumn as any, `%${category}%`)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    // Fallback logic if DB schema doesn't match yet
    if (!data || data.length === 0) return MOCK_ARTICLES.filter(a => a.lang === lang && (a.category || '').toLowerCase() === category.toLowerCase());

    return (data as any[]).map(row => mapArticleRow(row, normalizedLang));
  } catch (err) {
    console.error('Error fetching articles by category:', err);
    return MOCK_ARTICLES.filter(a => a.lang === lang && (a.category || '').toLowerCase() === category.toLowerCase());
  }
};

export const getArticleBySlug = async (slug: string, lang: string = 'en'): Promise<Article | null> => {
  if (!supabase) {
    return MOCK_ARTICLES.find(a => a.slug === slug && a.lang === lang) || null;
  }

  try {
    const normalizedLang = normalizeLang(lang);
    const slugColumn = normalizedLang === 'ar' ? 'slug_ar' : 'slug_en';
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq(slugColumn as any, slug)
      .single();

    if (error) throw error;
    return mapArticleRow(data, normalizedLang);
  } catch (err) {
    console.error('Error fetching article by slug:', err);
    return MOCK_ARTICLES.find(a => a.slug === slug && a.lang === lang) || null;
  }
};
