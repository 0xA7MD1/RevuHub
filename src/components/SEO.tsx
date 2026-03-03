
import React from 'react';
import { siteConfig } from '../site-config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  article?: boolean;
  publishedAt?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  article, 
  publishedAt, 
  author = siteConfig.name 
}) => {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const fullDesc = description || siteConfig.description;
  const fullUrl = url || 'https://reviewhub.sa';
  const fullImage = image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200';

  React.useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  // Structured Data (JSON-LD)
  const schema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": [fullImage],
    "datePublished": publishedAt,
    "author": [{
      "@type": "Organization",
      "name": siteConfig.name,
      "url": "https://reviewhub.sa"
    }]
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": "https://reviewhub.sa",
    "description": siteConfig.description
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};

export default SEO;
