-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
  id SERIAL NOT NULL,
  title TEXT NOT NULL,
  seo_title TEXT NULL,
  slug VARCHAR(255) NOT NULL,
  category VARCHAR(150) NULL,
  excerpt TEXT NULL,
  content TEXT NOT NULL,
  image_url TEXT NULL,
  image_alt_text TEXT NULL,
  meta_description TEXT NULL,
  keywords TEXT NULL,
  affiliate_products JSONB NULL DEFAULT '[]'::JSONB,
  lang VARCHAR(10) NULL DEFAULT 'ar'::VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT articles_pkey PRIMARY KEY (id),
  CONSTRAINT articles_slug_key UNIQUE (slug)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_lang ON articles(lang);

-- Grant permissions
GRANT SELECT ON articles TO anon;
GRANT ALL PRIVILEGES ON articles TO authenticated;

-- Row Level Security (RLS) policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DROP POLICY IF EXISTS "Allow public read access" ON articles;
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT USING (true);
