import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type ArticleSitemapRow = Pick<Database['public']['Tables']['articles']['Row'], 'slug_en' | 'updated_at'>;

export async function GET({ site }: { site: URL }) {
  const { data: articles } = (await supabase
    .from('articles')
    .select('slug_en, updated_at')) as { data: ArticleSitemapRow[] | null };

  const pages = [
    {
      url: site ? site.href : 'https://example.com/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    ...(articles?.map((article) => ({
      url: `${site ? site.href : 'https://example.com/'}blog/${article.slug_en}`,
      lastmod: new Date(article.updated_at || new Date().toISOString()).toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    })) || []),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastmod}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}
