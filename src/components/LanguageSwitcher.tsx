import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { siteConfig } from '../site-config';

interface LanguageSwitcherProps {
  currentLang?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang: propLang }) => {
  const [currentLang, setCurrentLang] = useState(propLang || 'en');
  const [slugMappingReady, setSlugMappingReady] = useState(false);

  useEffect(() => {
    // Get current language from URL
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const parts = path.split('/').filter(Boolean);
      const langFromUrl = parts.length > 0 && (parts[0] === 'en' || parts[0] === 'ar') ? parts[0] : siteConfig.defaultLanguage;
      setCurrentLang(langFromUrl);
      
      // Listen for slug mapping ready event
      const handleSlugMappingReady = (event: CustomEvent) => {
        console.log('Slug mapping ready event received:', event.detail);
        setSlugMappingReady(true);
      };
      
      window.addEventListener('slugMappingReady', handleSlugMappingReady as EventListener);
      
      // Check if slug mapping is already available
      if (window.slugMapping) {
        console.log('Slug mapping already available:', window.slugMapping);
        setSlugMappingReady(true);
      }
      
      return () => {
        window.removeEventListener('slugMappingReady', handleSlugMappingReady as EventListener);
      };
    }
  }, []);

  const switchLanguage = (newLang: string) => {
    if (typeof window === 'undefined') return;
    
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    console.log('Switching language from', parts[0], 'to', newLang);
    console.log('Current path:', path);
    console.log('Path parts:', parts);
    console.log('Slug mapping ready:', slugMappingReady);
    
    // If the first part is a language code, replace it
    if (parts.length > 0 && (parts[0] === 'en' || parts[0] === 'ar')) {
      parts[0] = newLang;
      
      // Check if this is an article page and handle slug translation
      if (parts.length >= 3 && parts[1] === 'blog') {
        const currentSlug = parts[2];
        console.log('Current slug:', currentSlug);
        console.log('Available slug mapping:', window.slugMapping);
        
        // Try to use the slug mapping if available (set by the article page)
        if (typeof window !== 'undefined' && window.slugMapping && slugMappingReady) {
          const slugMapping = window.slugMapping;
          const targetSlug = slugMapping[currentSlug];
          
          console.log('Target slug from mapping:', targetSlug);
          
          if (targetSlug) {
            parts[2] = targetSlug;
            const newUrl = `/${parts.join('/')}`;
            console.log('Navigating to:', newUrl);
            window.location.href = newUrl;
            return;
          } else {
            // If no mapping found, redirect to blog homepage
            console.log('No slug mapping found for:', currentSlug);
            window.location.href = `/${newLang}/blog`;
            return;
          }
        } else {
          // If no slug mapping available, wait a bit and try again
          console.log('No slug mapping available or not ready, waiting...');
          setTimeout(() => {
            if (window.slugMapping) {
              console.log('Slug mapping found after delay:', window.slugMapping);
              const slugMapping = window.slugMapping;
              const targetSlug = slugMapping[currentSlug];
              
              if (targetSlug) {
                parts[2] = targetSlug;
                const newUrl = `/${parts.join('/')}`;
                console.log('Navigating to (after delay):', newUrl);
                window.location.href = newUrl;
                return;
              }
            }
            console.log('Still no slug mapping, redirecting to blog homepage');
            window.location.href = `/${newLang}/blog`;
          }, 200);
          return;
        }
      }
      
      const newUrl = `/${parts.join('/')}`;
      console.log('Navigating to (non-article):', newUrl);
      window.location.href = newUrl;
    } else {
      // If no language code (e.g. root), prepend it
      const newUrl = `/${newLang}${path}`;
      console.log('Navigating to (no lang code):', newUrl);
      window.location.href = newUrl;
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
