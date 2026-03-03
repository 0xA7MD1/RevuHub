import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import { Filter } from 'lucide-react';
import { siteConfig } from '../site-config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  articles: Article[];
  lang?: string;
}

const Home: React.FC<HomeProps> = ({ articles: initialArticles, lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const gridRef = useRef<HTMLDivElement>(null);

  // Update articles if props change (though in Astro SSG this rarely happens client-side unless using transitions)
  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  useEffect(() => {
    if (articles.length > 0 && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.article-card-wrapper');
      
      // Kill previous animations to avoid conflicts
      gsap.killTweensOf(cards);

      gsap.fromTo(cards, 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }
  }, [articles]);

  const t = {
    title: currentLang === 'ar' ? 'أحدث المقالات' : 'Latest Articles',
    newest: currentLang === 'ar' ? 'الأحدث أولاً' : 'Newest First',
    popular: currentLang === 'ar' ? 'الأكثر شيوعاً' : 'Popular'
  };

  return (
    <main className="bg-white pb-32">
      <Hero lang={currentLang} />
      
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-2 underline-animate">{t.title}</h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-sm font-bold">
                <Filter className="w-4 h-4" />
                <span>{currentLang === 'ar' ? 'تصفية' : 'Filter'}</span>
              </div>
              <select className="bg-slate-900 border-none rounded-xl text-sm font-bold text-white py-3 px-6 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer hover:bg-slate-800 transition-colors">
                <option>{t.newest}</option>
                <option>{t.popular}</option>
              </select>
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => (
              <div key={article.id} className="article-card-wrapper opacity-0">
                <ArticleCard article={article} lang={currentLang} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;
