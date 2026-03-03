import { getArticles } from '../lib/api';

export async function GET({ site }: { site: URL }) {
  const base = site ? site.href : 'https://example.com/';
  const enArticles = await getArticles('en');
  const arArticles = await getArticles('ar');

  const pages = [
    {
      url: base,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${base}en/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      url: `${base}ar/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
    ...(enArticles?.map((article) => ({
      url: `${base}en/blog/${article.slug}`,
      lastmod: new Date(article.updated_at || new Date().toISOString()).toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    })) || []),
    ...(arArticles?.map((article) => ({
      url: `${base}ar/blog/${article.slug}`,
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
