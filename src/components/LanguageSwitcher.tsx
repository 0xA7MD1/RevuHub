import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { siteConfig } from '../site-config';

interface LanguageSwitcherProps {
  currentLang?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang: propLang }) => {
  const [currentLang, setCurrentLang] = useState(propLang || 'en');

  useEffect(() => {
    // Get current language from URL
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const parts = path.split('/').filter(Boolean);
      const langFromUrl = parts.length > 0 && (parts[0] === 'en' || parts[0] === 'ar') ? parts[0] : siteConfig.defaultLanguage;
      setCurrentLang(langFromUrl);
    }
  }, []);

  const switchLanguage = (newLang: string) => {
    if (typeof window === 'undefined') return;
    
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    // If the first part is a language code, replace it
    if (parts.length > 0 && (parts[0] === 'en' || parts[0] === 'ar')) {
      parts[0] = newLang;
      window.location.href = `/${parts.join('/')}`;
    } else {
      // If no language code (e.g. root), prepend it
      window.location.href = `/${newLang}${path}`;
    }
  };

  const isRTL = currentLang === 'ar';

  return (
    <div className={`flex items-center gap-1 bg-slate-100 rounded-full p-1 border border-slate-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {Object.entries(siteConfig.languages).map(([code, config]) => (
        <button
          key={code}
          onClick={() => switchLanguage(code)}
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
            currentLang === code 
              ? 'bg-white text-emerald-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {config.label}
        </button>
      ))}
      <Globe className="w-3.5 h-3.5 text-slate-400 mx-1" />
    </div>
  );
};

export default LanguageSwitcher;
