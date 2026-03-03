import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../site-config';

interface CategoryProps {
  articles: Article[];
  categoryId: string;
  lang?: string;
}

const Category: React.FC<CategoryProps> = ({ articles, categoryId, lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const category = siteConfig.categories.find(c => c.id === categoryId);

  if (!category) return null;

  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href={`/${currentLang}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 font-medium transition-colors">
          <ArrowLeft className={`w-4 h-4 ${currentLang === 'ar' ? 'rotate-180' : ''}`} /> 
          {currentLang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </a>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {category[currentLang as 'en' | 'ar']}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            {currentLang === 'ar' 
              ? `استكشف أفضل المراجعات والأدلة في قسم ${category.ar}.` 
              : `Explore our expert reviews and guides in the ${category.en} section.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} lang={currentLang} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 text-lg">
                {currentLang === 'ar' ? 'لا توجد مقالات في هذا القسم حالياً.' : 'No articles found in this category yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Category;
