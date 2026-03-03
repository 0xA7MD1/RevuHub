export const siteConfig = {
  name: 'ريفيو هب',
  enName: 'ReviewHub',
  description: 'High-performance tech blog',
  defaultLanguage: 'en',
  languages: {
    en: { label: 'English', dir: 'ltr' },
    ar: { label: 'العربية', dir: 'rtl' },
  },
  categories: [
    { id: 'tech', en: 'Technology', ar: 'تكنولوجيا' },
    { id: 'health', en: 'Health', ar: 'صحة' },
    { id: 'business', en: 'Business', ar: 'أعمال' },
  ],
  i18n: {
    en: {
      searchPlaceholder: 'Search articles...',
      readArticle: 'Read Article',
      latestArticles: 'Latest Articles',
      newestFirst: 'Newest First',
      popular: 'Popular',
      filter: 'Filter',
      loading: 'Loading...',
      heroTitle: 'Future..Tech Reviews',
      heroSubtitle: 'Discover in-depth reviews, expert analysis, and the latest trends in technology. Your guide to smarter buying decisions.',
    },
    ar: {
      searchPlaceholder: 'ابحث عن المقالات...',
      readArticle: 'اقرأ المقال',
      latestArticles: 'أحدث المقالات',
      newestFirst: 'الأحدث أولاً',
      popular: 'الأكثر شيوعاً',
      filter: 'تصفية',
      loading: 'جاري التحميل...',
      heroTitle: 'مراجعات..تقنية المستقبل',
      heroSubtitle: 'اكتشف مراجعات متعمقة، تحليلات الخبراء، وأحدث اتجاهات التكنولوجيا. دليلك لقرارات شراء أذكى.',
    },
  },
};
