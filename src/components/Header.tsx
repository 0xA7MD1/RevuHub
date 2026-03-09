import React, { useState, useEffect, useRef } from 'react';
import { Menu, Zap, SearchIcon, Bell } from 'lucide-react';
import { siteConfig } from '../site-config';
import LanguageSwitcher from './LanguageSwitcher';
import gsap from 'gsap';

interface HeaderProps {
  lang?: string;
}

const Header: React.FC<HeaderProps> = ({ lang = 'en' }) => {
  const currentLang = (lang || siteConfig.defaultLanguage) as 'en' | 'ar';
  const labels = siteConfig.i18n[currentLang];
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Entrance animation
    if (headerRef.current) {
        gsap.fromTo(headerRef.current, 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
        );
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-[100] w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-2xl border-b border-slate-100 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
          : 'bg-white/0 py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-12">
            <a href={`/${currentLang}`} className="flex items-center gap-3 group">
              <div className="bg-emerald-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-emerald-200/50">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                {currentLang === 'ar' ? siteConfig.name : siteConfig.enName}
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6 flex-1 max-w-2xl mx-8">
            <div className="hidden md:flex items-center bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-100 focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:bg-white focus-within:border-emerald-200 transition-all duration-300 w-full group">
              <SearchIcon className="w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder={labels.searchPlaceholder} 
                className="bg-transparent border-none text-[13px] font-bold px-3 w-full outline-none placeholder:text-slate-400 text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-6 w-px bg-slate-100 hidden sm:block mx-2" />
              <LanguageSwitcher currentLang={currentLang} />
            </div>
            
            <button className="lg:hidden p-2.5 text-slate-900 bg-slate-50 rounded-xl border border-slate-100">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
