import React from 'react';
import { AffiliateProduct } from '../types';
import { Star, Check, X, ExternalLink, Trophy, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: AffiliateProduct;
  lang?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang = 'en' }) => {
  const isRtl = lang === 'ar';
  
  const t = {
    ratingLabel: isRtl ? 'تقييمنا' : 'Our Rating',
    pros: isRtl ? 'المميزات' : 'Pros',
    cons: isRtl ? 'العيوب' : 'Cons',
    button: isRtl ? 'تحقق من السعر الحالي' : 'Check Current Price',
    bestOverall: isRtl ? 'خيارنا الأفضل' : 'Best Overall',
    verified: isRtl ? 'مراجعة موثقة' : 'Verified Review'
  };

  return (
    <div className="my-20 bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] transition-all duration-700 group">
      <div className="lg:flex">
        {/* Image Section */}
        <div className="lg:w-[45%] bg-slate-50 flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
             <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-200/50">
               <Trophy className="w-3.5 h-3.5" />
               {t.bestOverall}
             </div>
             <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-slate-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border border-slate-100">
               <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
               {t.verified}
             </div>
          </div>
          
          {/* Decorative background for image */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #10b981 0%, transparent 70%)' }} />
          
          <img 
            src={product.image || '/placeholder.svg'} 
            alt={product.name} 
            className="max-w-full h-auto rounded-3xl shadow-2xl transition-transform duration-1000 group-hover:scale-105 relative z-10"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-[55%] p-10 lg:p-16 flex flex-col justify-between bg-white">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
              <div className="flex-1">
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-100 fill-slate-100'}`} 
                    />
                  ))}
                  <span className="ms-3 text-sm font-black text-slate-400 tracking-widest">{product.rating} / 5.0</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-emerald-50 w-24 h-24 rounded-[2rem] border border-emerald-100 shadow-sm">
                <span className="text-[9px] text-emerald-600 uppercase font-black tracking-[0.2em] mb-1">{t.ratingLabel}</span>
                <span className="text-3xl font-black text-emerald-700 tracking-tighter">{product.rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] border-b border-emerald-50 pb-4">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  {t.pros}
                </h4>
                <ul className="space-y-4">
                  {product.pros.map((pro, idx) => (
                    <li key={idx} className="text-[15px] text-slate-600 flex items-start gap-3 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span className="font-medium">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] border-b border-rose-50 pb-4">
                  <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  {t.cons}
                </h4>
                <ul className="space-y-4">
                  {product.cons.map((con, idx) => (
                    <li key={idx} className="text-[15px] text-slate-600 flex items-start gap-3 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-300 flex-shrink-0" />
                      <span className="font-medium">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <a 
            href={product.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 w-full bg-slate-950 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-[0.2em] py-6 px-10 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-emerald-200 group/btn"
          >
            {t.button}
            <ExternalLink className={`w-5 h-5 transition-all duration-500 ${isRtl ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'} group-hover:-translate-y-2`} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
