import React, { useEffect } from 'react';
import { Article as ArticleType } from '../types';
import EnhancedContent from '../components/ui/EnhancedContent';
import { parseMarkdownToReactWithToc, type TocItem } from '../utils/markdownParser';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  ArrowLeft, Clock, Calendar, User, 
  Share2,
  List, ChevronRight, Zap
} from 'lucide-react';
import { siteConfig } from '../site-config';
import { cn } from '../lib/utils';

interface ArticleProps {
  article: ArticleType;
  content: string; // Changed from htmlContent to content (markdown string)
  lang?: string;
}

const Article: React.FC<ArticleProps> = ({ article, content, lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const isRtl = currentLang === 'ar';

  const [parsedContent, setParsedContent] = React.useState<React.ReactNode>(null);
  const [toc, setToc] = React.useState<TocItem[]>([]);
  const [activeTocId, setActiveTocId] = React.useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  // Parse markdown content when component mounts or content changes
  useEffect(() => {
    if (content) {
      parseMarkdownToReactWithToc(content)
        .then(({ content: rendered, toc: items }) => {
          setParsedContent(rendered);
          setToc(items);
        })
        .catch(() => {
          setParsedContent(<p>{content}</p>);
          setToc([]);
        });
    }
  }, [content]);

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const headingIds = toc.map((t) => t.id);
    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).id;
          if (id) setActiveTocId(id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 1],
      }
    );

    for (const el of elements) observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  // Map fields
  const publishDate = article.published_at;
  const imageUrl = article.image_url;

  return (
    <main className="bg-white min-h-screen">
      <article className="relative">
        {/* Header Section */}
        <div className="relative w-full h-[55vh] min-h-[450px]">
          <img src={imageUrl || '/placeholder.svg'} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 max-w-5xl mx-auto px-6 pb-12">
            <a href={`/${currentLang}`} className="inline-block mb-6">
              <Button variant="ghost" className="text-white hover:bg-white/20 gap-2">
                <ArrowLeft className={cn("w-4 h-4", isRtl ? "rotate-180" : "")} />
                {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
              </Button>
            </a>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge variant="success">{article.category}</Badge>
              <span className="text-white/80 text-sm font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.reading_time || 7} {isRtl ? 'دقائق' : 'mins'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-8">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-white/90 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-white/20">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-black">{siteConfig.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4 text-emerald-400" />
                {publishDate ? new Date(publishDate).toLocaleDateString(currentLang, { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Content Column */}
            <div className="lg:col-span-8">
              {/* Main Text Content */}
              <div className="markdown-content prose prose-slate prose-lg max-w-none 
                prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-p:leading-[1.8] prose-p:text-slate-600 prose-p:mb-6
                prose-img:rounded-3xl prose-img:shadow-xl
                prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
                prose-code:text-emerald-400 prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:border prose-code:border-slate-700
              ">
                {parsedContent || <p>Loading content...</p>}
              </div>

              {/* Enhanced Content Section */}
              <EnhancedContent article={article} lang={currentLang} />

              {/* Final Conclusion Box */}
              <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <Zap className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6 text-emerald-400">{isRtl ? 'الخلاصة' : 'Conclusion'}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed font-medium">
                    {isRtl ? 'شكراً لقراءتك. تابعنا للحصول على أحدث المقالات.' : 'Thanks for reading. Follow us for the latest articles.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="sticky top-32 space-y-10">
                {/* Table of Contents */}
                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                  <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 mb-6 pb-4 border-b border-slate-50">
                    <List className="w-4 h-4" /> {isRtl ? 'محتويات المراجعة' : 'Inside this Guide'}
                  </h4>
                  <nav className="space-y-1" aria-label={isRtl ? 'قائمة المحتويات' : 'Table of contents'}>
                    {toc.length === 0 ? (
                      <p className="text-sm text-slate-500 font-medium">
                        {isRtl ? 'لا توجد عناوين داخل المقال.' : 'No headings found in this article.'}
                      </p>
                    ) : (
                      toc
                        .filter((t) => t.level >= 1 && t.level <= 4)
                        .map((item) => {
                          const isActive = activeTocId === item.id;
                          const indent = item.level <= 2 ? 0 : item.level === 3 ? 12 : 20;
                          return (
                            <button
                              key={item.id}
                              onClick={() => scrollToHeading(item.id)}
                              className={cn(
                                'w-full text-start group flex items-center justify-between py-2 px-3 rounded-xl transition-all',
                                isActive ? 'bg-emerald-50' : 'hover:bg-slate-50'
                              )}
                              style={{ paddingInlineStart: 12 + indent }}
                            >
                              <span
                                className={cn(
                                  'text-[14px] font-bold transition-colors line-clamp-2',
                                  isActive ? 'text-emerald-700' : 'text-slate-600 group-hover:text-emerald-600'
                                )}
                              >
                                {item.text}
                              </span>
                              <ChevronRight
                                className={cn(
                                  'w-4 h-4 text-slate-300 transition-all',
                                  isRtl ? 'rotate-180' : '',
                                  isActive ? 'opacity-100 text-emerald-500' : 'opacity-0 group-hover:opacity-100'
                                )}
                              />
                            </button>
                          );
                        })
                    )}
                  </nav>
                </div>

                {/* Newsletter Box */}
                <div className="p-8 bg-emerald-600 rounded-[2.5rem] text-white shadow-xl shadow-emerald-900/20">
                  <h4 className="text-2xl font-black mb-4">{isRtl ? 'اشترك في النشرة' : 'Join the Newsletter'}</h4>
                  <p className="text-emerald-50 text-sm mb-6 leading-relaxed opacity-90">{isRtl ? 'احصل على أحدث المقالات في بريدك.' : 'Get the latest articles delivered to your inbox.'}</p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm placeholder:text-white/50 focus:bg-white/20 outline-none transition-all" 
                      placeholder={isRtl ? 'بريدك الإلكتروني' : 'Your email address'}
                    />
                    <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-black h-14">
                      {isRtl ? 'اشترك' : 'Subscribe'}
                    </Button>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="flex justify-center gap-4">
                  {['Twitter', 'Facebook', 'LinkedIn'].map((i) => (
                    <Button key={i} variant="outline" size="icon" className="w-14 h-14 rounded-2xl hover:border-emerald-500 hover:text-emerald-600 shadow-sm">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Article;
