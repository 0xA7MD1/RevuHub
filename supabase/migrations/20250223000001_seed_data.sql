INSERT INTO public.articles (
  title,
  slug,
  content,
  excerpt,
  category,
  affiliate_products
) VALUES (
  'Getting Started with Astro and Supabase',
  'getting-started-astro-supabase',
  '# Welcome to Astro\n\nThis is a sample article demonstrating the power of **Astro** and **Supabase**.\n\n## Features\n\n- Static Site Generation\n- Type Safety\n- Fast Performance',
  'Learn how to build a high-performance blog with Astro and Supabase.',
  'Development',
  '[
    {
      "name": "Astro Framework",
      "rating": 5,
      "pros": ["Fast", "Easy to learn", "Content-focused"],
      "cons": ["None"],
      "link": "https://astro.build"
    }
  ]'::jsonb
) ON CONFLICT (slug) DO NOTHING;
