import React from 'react';
import { Badge } from './Badge';
import { Quote, Lightbulb, TrendingUp, Eye, Heart } from 'lucide-react';

interface EnhancedContentProps {
  article: any;
  lang?: string;
}

const EnhancedContent: React.FC<EnhancedContentProps> = ({ article, lang = 'en' }) => {
  const isRtl = lang === 'ar';

  const t = {
    featuredQuote: isRtl ? 'اقتباس مميز' : 'Featured Quote',
    keyTakeaways: isRtl ? 'النقاط الرئيسية' : 'Key Takeaways',
    difficulty: isRtl ? 'مستوى الصعوبة' : 'Difficulty',
    views: isRtl ? 'مشاهدة' : 'Views',
    likes: isRtl ? 'إعجاب' : 'Likes',
    beginner: isRtl ? 'مبتدئ' : 'Beginner',
    intermediate: isRtl ? 'متوسط' : 'Intermediate',
    advanced: isRtl ? 'متقدم' : 'Advanced'
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'intermediate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'advanced': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <>
      {/* Featured Quote */}
      {article.featured_quote && (
        <div className="my-16 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-[3rem] border border-emerald-100/50 relative overflow-hidden">
          <div className="absolute top-8 right-8 text-emerald-200/20">
            <Quote className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-100">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-black text-emerald-800">{t.featuredQuote}</h3>
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed italic">
              "{article.featured_quote}"
            </blockquote>
          </div>
        </div>
      )}

      {/* Article Meta Enhanced */}
      <div className="my-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
        <div className="flex flex-wrap items-center gap-6">
          {article.difficulty_level && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-500">{t.difficulty}:</span>
              <Badge className={getDifficultyColor(article.difficulty_level)}>
                {t[article.difficulty_level as keyof typeof t] || article.difficulty_level}
              </Badge>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="font-medium">{article.view_count || 0}</span>
              <span>{t.views}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="font-medium">{article.like_count || 0}</span>
              <span>{t.likes}</span>
            </div>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string, idx: number) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Key Takeaways */}
      {article.key_takeaways && article.key_takeaways.length > 0 && (
        <div className="my-16 p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[3rem] border border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-900 p-3 rounded-2xl shadow-lg shadow-slate-200">
              <Lightbulb className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">{t.keyTakeaways}</h3>
              <p className="text-slate-500 font-medium">
                {isRtl ? 'أهم النقاط التي يجب تذكرها' : 'Most important points to remember'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.key_takeaways.map((takeaway: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Snippets */}
      {article.code_snippets && article.code_snippets.length > 0 && (
        <div className="my-16">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {isRtl ? 'مقتطفات التعليمات البرمجية' : 'Code Examples'}
            </h3>
            <p className="text-slate-500 font-medium">
              {isRtl ? 'أمثلة عملية لتنفيذ المفاهيم' : 'Practical examples to implement concepts'}
            </p>
          </div>
          
          <div className="space-y-8">
            {article.code_snippets && article.code_snippets.map((snippet: any, idx: number) => (
              <div key={idx} className="bg-slate-950 rounded-[1rem] overflow-hidden shadow-2xl border border-slate-800 my-8">
                <div className="bg-[#161b22] px-6 py-4 border-b border-slate-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#fc625d] shadow-lg shadow-[#fc625d]/20" />
                        <div className="w-3 h-3 rounded-full bg-[#fdbc40] shadow-lg shadow-[#fdbc40]/20" />
                        <div className="w-3 h-3 rounded-full bg-[#35cd4b] shadow-lg shadow-[#35cd4b]/20" />
                      </div>
                      <span className="text-slate-300 text-sm font-medium">
                        {snippet.title || `code.${snippet.language || 'javascript'}`}
                      </span>
                    </div>
                  </div>
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="text-sm font-mono text-slate-300 leading-relaxed">
                    {snippet.code}
                  </code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedContent;
