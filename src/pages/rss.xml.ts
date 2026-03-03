import rss from '@astrojs/rss';
import { getArticles } from '../lib/api';

export async function GET(context: any) {
  const articles = await getArticles('en');

  return rss({
    title: 'Modern Tech Blog',
    description: 'Exploring the latest in web development, performance optimization, and technical SEO.',
    site: context.site || 'https://example.com',
    items: articles?.map((post) => ({
      title: post.title,
      pubDate: new Date(post.published_at || post.updated_at || new Date().toISOString()),
      description: post.excerpt || '',
      link: `/blog/${post.slug}/`,
    })) || [],
    customData: `<language>en-us</language>`,
  });
}
