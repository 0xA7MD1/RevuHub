
import { Article } from '../types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Top 5 Noise-Canceling Headphones for Remote Work in 2024',
    slug: 'top-noise-canceling-headphones-2024',
    lang: 'en',
    category: 'Technology',
    excerpt: 'We tested over 20 pairs of headphones to find the absolute best options for blocking out home distractions.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    image_alt_text: 'Noise-canceling headphones on a desk',
    meta_description: 'We tested over 20 pairs of headphones to find the absolute best options for blocking out home distractions.',
    keywords: ['headphones', 'noise-canceling', 'remote work', 'office'],
    content: `
# The Best Noise-Canceling Headphones for Your Home Office

Working from home offers flexibility, but it also comes with a unique set of noise challenges—from barking dogs to loud appliances.

## Why ANC Matters
Active Noise Cancellation technology works by using microphones to pick up ambient sound and then producing an "opposite" sound wave to cancel it out.

## Our Top Recommendations
Below are the products that stood out during our rigorous testing period.
    `,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Essential Study Gadgets for College Students',
    slug: 'essential-study-gadgets-2024',
    lang: 'en',
    category: 'Student Life',
    excerpt: 'From smart notebooks to focus timers, these tools will help you ace your exams.',
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    image_alt_text: 'Study gadgets and tech tools for students',
    meta_description: 'From smart notebooks to focus timers, these tools will help you ace your exams.',
    keywords: ['study', 'gadgets', 'students', 'college', 'tech'],
    content: `
# Boost Your GPA with These Tech Tools

University life is demanding, but the right tech can make your study sessions more efficient and less stressful.

## Focus Tools
Staying focused is half the battle. Here are the tools we recommend for staying in the zone.

## Organization
Managing deadlines is easier when your tools work for you, not against you.
    `,
    published_at: new Date().toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: 'أفضل 5 سماعات عازلة للضوضاء للعمل عن بعد في 2024',
    slug: 'best-noise-canceling-headphones-2024-ar',
    lang: 'ar',
    category: 'Technology',
    excerpt: 'اختبرنا أكثر من 20 زوجاً من السماعات للعثور على أفضل الخيارات المطلقة لحجب المشتتات المنزلية.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    image_alt_text: 'سماعات عازلة للضوضاء على مكتب',
    meta_description: 'اختبرنا أكثر من 20 زوجاً من السماعات للعثور على أفضل الخيارات المطلقة لحجب المشتتات المنزلية.',
    keywords: ['سماعات', 'عزل الضوضاء', 'العمل عن بعد', 'مكتب'],
    content: `
# أفضل السماعات العازلة للضوضاء لمكتبك المنزلي

يوفر العمل من المنزل مرونة، ولكنه يأتي أيضًا مع مجموعة فريدة من تحديات الضوضاء.

## لماذا يهم عزل الضوضاء النشط (ANC)؟
تعمل تقنية إلغاء الضوضاء النشطة باستخدام الميكروفونات لالتقاط الصوت المحيط ثم إنتاج موجة صوتية "معاكسة" لإلغائها.

## توصياتنا العليا
فيما يلي المنتجات التي برزت خلال فترة اختبارنا الصارمة.
    `,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    title: 'أدوات الدراسة الأساسية لطلاب الجامعات',
    slug: 'essential-study-gadgets-2024',
    lang: 'ar',
    category: 'Student Life',
    excerpt: 'من الدفاتر الذكية إلى مؤقتات التركيز، ستساعدك هذه الأدوات على التفوق في امتحاناتك.',
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    image_alt_text: 'أدوات الدراسة والتقنية للطلاب',
    meta_description: 'من الدفاتر الذكية إلى مؤقتات التركيز، ستساعدك هذه الأدوات على التفوق في امتحاناتك.',
    keywords: ['دراسة', 'أدوات', 'طلاب', 'جامعة', 'تقنية'],
    content: `
# ارفع معدلك التراكمي باستخدام هذه الأدوات التقنية

الحياة الجامعية متطلبة، لكن التقنية الصحيحة يمكن أن تجعل جلسات الدراسة أكثر كفاءة وأقل توتراً.

## أدوات التركيز
البقاء مركزاً هو نصف المعركة. إليك الأدوات التي نوصي بها للبقاء في منطقة التركيز.

## التنظيم
إدارة المواعيد النهائية أسهل عندما تعمل أدواتك لصالحك، وليس ضدك.
    `,
    published_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  }
];
