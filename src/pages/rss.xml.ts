import rss from '@astrojs/rss';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type ArticleRow = Database['public']['Tables']['articles']['Row'];

export async function GET(context: any) {
  const { data: articles } = (await supabase
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false })) as { data: ArticleRow[] | null };

  return rss({
    title: 'Modern Tech Blog',
    description: 'Exploring the latest in web development, performance optimization, and technical SEO.',
    site: context.site || 'https://example.com',
    items: articles?.map((post) => ({
      title: post.title_en,
      pubDate: new Date(post.published_at || post.updated_at || new Date().toISOString()),
      description: post.excerpt_en || '',
      link: `/blog/${post.slug_en}/`,
    })) || [],
    customData: `<language>en-us</language>`,
  });
}
