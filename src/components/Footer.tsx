import React from 'react';
import { Zap, Mail, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { siteConfig } from '../site-config';
import { Button } from './ui/Button';

interface FooterProps {
  lang?: string;
}

const Footer: React.FC<FooterProps> = ({ lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const labels = siteConfig.i18n[currentLang];
  
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Branding Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-900/20">
                <Zap className="w-7 h-7 text-white fill-current" />
              </div>
              <span className="text-3xl font-black tracking-tighter">
                {currentLang === 'ar' ? siteConfig.name : siteConfig.enName}
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
              {labels.footerAbout || 'Your trusted source for tech reviews and buying guides.'}
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <Button key={i} variant="outline" size="icon" className="bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 rounded-2xl">
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-emerald-500 mb-8">{labels.latestArticles}</h4>
              <ul className="space-y-4">
                {siteConfig.categories.map(cat => (
                  <li key={cat.id}>
                    <a href={`/${currentLang}/category/${cat.id}`} className="text-slate-400 hover:text-white font-bold text-sm transition-colors">
                      {currentLang === 'ar' ? cat.ar : cat.en}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-emerald-500 mb-8">{labels.company || 'Company'}</h4>
              <ul className="space-y-4">
                {['aboutUs', 'contact', 'privacy', 'terms'].map(key => (
                  <li key={key}>
                    <a href="#" className="text-slate-400 hover:text-white font-bold text-sm transition-colors">
                      {(labels as any)[key] || key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-emerald-500 mb-8">{labels.newsletterTitle}</h4>
              <div className="space-y-4">
                 <p className="text-slate-500 text-xs font-bold leading-relaxed">{labels.newsletterSub}</p>
                 <div className="flex flex-col gap-3">
                   <input className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600" placeholder={labels.emailPlaceholder} />
                   <Button size="sm" className="w-full rounded-2xl h-12 bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20">{labels.subscribe}</Button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-xs font-black">
            &copy; {new Date().getFullYear()} {currentLang === 'ar' ? siteConfig.name : siteConfig.enName}. {labels.copyright || 'All rights reserved'}.
          </div>
          <div className="flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-emerald-400 transition-colors">{labels.privacy || 'Privacy'}</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">{labels.terms || 'Terms'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
