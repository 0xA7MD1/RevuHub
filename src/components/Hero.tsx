import React, { useEffect, useRef } from 'react';
import { siteConfig } from '../site-config';
import { Button } from './ui/Button';
import { Sparkles, ArrowDown, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  lang?: string;
}

const Hero: React.FC<HeroProps> = ({ lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const labels = siteConfig.i18n[currentLang];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(badgeRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(titleRef.current, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        '-=0.6'
      )
      .fromTo(subRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1 }, 
        '-=0.8'
      )
      .fromTo(buttonsRef.current?.children || [], 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, stagger: 0.1 }, 
        '-=0.8'
      )
      .fromTo(statsRef.current?.children || [], 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1 }, 
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-24 pb-20 md:pt-40 md:pb-40 bg-white overflow-hidden border-b border-slate-100">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-50/50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Side */}
          <div className="lg:col-span-7 text-center lg:text-start">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-emerald-100/50">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              {currentLang === 'ar' ? 'تحديثات حصرية 2024' : 'Exclusive 2024 Updates'}
            </div>
            
            <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
              {(labels.heroTitle || '').split('..').map((part, i) => (
                <span key={i} className={i === 1 ? "text-emerald-600 block mt-2" : "block"}>
                  {part}
                </span>
              ))}
            </h1>
            
            <p ref={subRef} className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl lg:mx-0 mx-auto mb-12 font-medium">
              {labels.heroSubtitle}
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-2xl shadow-2xl shadow-emerald-200/50 hover:scale-105 transition-transform">
                {currentLang === 'ar' ? 'اكتشف المراجعات' : 'Explore Reviews'}
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-2xl gap-2 border-slate-200 hover:bg-slate-50">
                {currentLang === 'ar' ? 'تعرف علينا' : 'About Us'}
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Visual Side / Stats Side */}
          <div className="lg:col-span-5">
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between aspect-square group hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-500">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-1 group-hover:text-white transition-colors tracking-tighter">500+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-100 transition-colors">
                    {currentLang === 'ar' ? 'مراجعة تقنية' : 'Tech Reviews'}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-[2.5rem] flex flex-col justify-between aspect-square mt-8 lg:mt-12 group hover:bg-emerald-600 transition-all duration-500">
                <div className="bg-slate-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-emerald-400 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-4xl font-black text-white mb-1 tracking-tighter">100%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-100 transition-colors">
                    {currentLang === 'ar' ? 'محتوى موثوق' : 'Trusted Content'}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between aspect-square -mt-8 lg:-mt-12 group hover:border-emerald-500 transition-all duration-500">
                <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                  <TrendingUp className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-1 tracking-tighter">15k+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest transition-colors">
                    {currentLang === 'ar' ? 'قارئ شهري' : 'Monthly Readers'}
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex flex-col justify-between aspect-square group hover:bg-slate-900 hover:border-slate-800 transition-all duration-500">
                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-4xl font-black text-emerald-900 mb-1 group-hover:text-white transition-colors tracking-tighter">#1</div>
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                    {currentLang === 'ar' ? 'دليل الشراء' : 'Buying Guide'}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
