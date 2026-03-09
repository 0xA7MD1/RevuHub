export const getTimeAgo = (publishDate: string, lang: 'en' | 'ar' = 'en'): string => {
  const now = new Date();
  const published = new Date(publishDate);
  const diffInMs = now.getTime() - published.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (lang === 'ar') {
    if (diffInDays === 0) return 'اليوم';
    if (diffInDays === 1) return 'أمس';
    if (diffInDays === 2) return 'قبل يومين';
    if (diffInDays <= 7) return `قبل ${diffInDays} أيام`;
    if (diffInDays <= 30) return `قبل ${Math.floor(diffInDays / 7)} أسابيع`;
    if (diffInDays <= 60) return 'قبل شهر';
    if (diffInDays <= 90) return 'قبل شهرين';
    if (diffInDays <= 180) return 'قبل 3 أشهر';
    return 'أكثر من 3 أشهر';
  } else {
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays === 2) return '2 days ago';
    if (diffInDays <= 7) return `${diffInDays} days ago`;
    if (diffInDays <= 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays <= 60) return '1 month ago';
    if (diffInDays <= 90) return '2 months ago';
    if (diffInDays <= 180) return '3 months ago';
    return 'More than 3 months ago';
  }
};
