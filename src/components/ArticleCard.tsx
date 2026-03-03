import React from 'react';
import { Article } from '../types';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { siteConfig } from '../site-config';

interface ArticleCardProps {
  article: Article;
  lang?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const isRtl = currentLang === 'ar';
  const labels = siteConfig.i18n[currentLang];

  // Map fields from DB if necessary
  const publishDate = article.published_at;
  const imageUrl = article.image_url;

  return (
    <article className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 h-full">
      <a 
        href={`/${currentLang}/blog/${article.slug}`} 
        className="block relative aspect-[16/11] overflow-hidden"
      >
        <img 
          src={imageUrl || '/placeholder.svg'} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className={cn(
          "absolute top-6",
          isRtl ? "right-6" : "left-6"
        )}>
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-900 shadow-sm border border-white/20">
            {article.category || 'General'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </a>
      
      <div className="p-8 md:p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            {publishDate ? new Date(publishDate).toLocaleDateString(currentLang, { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-200" />
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-500" />
            {article.reading_time || 5} min
          </div>
        </div>
        
        <a href={`/${currentLang}/blog/${article.slug}`} className="flex-grow group/title">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-5 group-hover/title:text-emerald-600 transition-colors leading-[1.15] tracking-tighter underline-animate">
            {article.title}
          </h3>
        </a>
        
        <p className="text-slate-500 text-[16px] line-clamp-3 mb-8 leading-relaxed font-medium">
          {article.excerpt}
        </p>

        <div className="pt-8 mt-auto border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-xs font-bold text-slate-600">ReviewHub Team</span>
          </div>
          
          <a 
            href={`/${currentLang}/blog/${article.slug}`}
            className="inline-flex items-center gap-2 text-emerald-600 font-black text-[11px] uppercase tracking-[0.2em] group/link underline-gradient"
          >
            {labels.readArticle} 
            <ArrowRight className={cn(
              "w-4 h-4 transition-all group-hover/link:translate-x-2",
              isRtl ? "rotate-180 group-hover/link:-translate-x-2" : ""
            )} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
