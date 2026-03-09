import React, { useEffect, useRef, useState } from 'react';
import Hero from '../components/Hero';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import { Filter, ChevronDown } from 'lucide-react';
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
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Update articles if props change (though in Astro SSG this rarely happens client-side unless using transitions)
  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  // Get unique categories from articles
  const getCategories = () => {
    const categories = new Set(articles.map(article => article.category).filter(Boolean));
    return Array.from(categories) as string[];
  };

  // Filter and sort articles
  useEffect(() => {
    let filtered = [...articles];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        const dateA = new Date(a.published_at || '');
        const dateB = new Date(b.published_at || '');
        return dateB.getTime() - dateA.getTime();
      } else {
        // For popularity, we'll use a simple heuristic based on keywords length
        // In a real app, this would be based on views, likes, etc.
        const popularityA = (a.keywords?.length || 0) + (a.title.length * 0.1);
        const popularityB = (b.keywords?.length || 0) + (b.title.length * 0.1);
        return popularityB - popularityA;
      }
    });

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, sortBy]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (_event: MouseEvent) => {
      if (isCategoryDropdownOpen) {
        setIsCategoryDropdownOpen(false);
      }
    };

    if (isCategoryDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isCategoryDropdownOpen]);

  useEffect(() => {
    if (filteredArticles.length > 0 && gridRef.current) {
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
  }, [filteredArticles]);

  const t = {
    title: currentLang === 'ar' ? 'أحدث المقالات' : 'Latest Articles',
    newest: currentLang === 'ar' ? 'الأحدث أولاً' : 'Newest First',
    popular: currentLang === 'ar' ? 'الأكثر شيوعاً' : 'Popular',
    allCategories: currentLang === 'ar' ? 'جميع التصنيفات' : 'All Categories',
    filter: currentLang === 'ar' ? 'تصفية' : 'Filter'
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
              {/* Category Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>{t.filter}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory('all');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-right px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors ${
                        selectedCategory === 'all' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
                      }`}
                    >
                      {t.allCategories}
                    </button>
                    {getCategories().map((category) => (
                      <button
                        key={category}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(category);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-right px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors ${
                          selectedCategory === category ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Sort Dropdown */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                className="bg-slate-900 border-none rounded-xl text-sm font-bold text-white py-3 px-6 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer hover:bg-slate-800 transition-colors"
              >
                <option value="newest">{t.newest}</option>
                <option value="popular">{t.popular}</option>
              </select>
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map((article) => (
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
