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
  
  const iconMap = {
    Twitter,
    Instagram,
    Linkedin,
    Github,
  };
  
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
              {labels.footerAbout}
            </p>
            <div className="flex gap-6">
              {siteConfig.footerLinks.social.map((link, i) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap];
                return (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="outline" size="icon" className="bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500 rounded-2xl w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20">
                      <Icon className="w-6 h-6" />
                    </Button>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black text-[11px] uppercase tracking-[0.2em] text-emerald-500 mb-8">{labels.latestArticles}</h4>
              <ul className="space-y-4">
                {siteConfig.categories.map((cat) => (
                  <li key={cat.id}>
                    <a href={`/${currentLang}/category/${cat.id}`} className="text-slate-400 hover:text-white font-bold text-sm transition-colors">
                      {currentLang === 'ar' ? cat.ar : cat.en}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-xs font-black">
            &copy; {new Date().getFullYear()} {currentLang === 'ar' ? siteConfig.name : siteConfig.enName}. {labels.copyright}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
