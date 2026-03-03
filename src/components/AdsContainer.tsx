
import React from 'react';

interface AdsContainerProps {
  label?: string;
}

const AdsContainer: React.FC<AdsContainerProps> = ({ label = "Advertisement" }) => {
  return (
    <div className="my-10 p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
      <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center mb-4">
        {label}
      </div>
      <div className="w-full h-24 md:h-32 bg-slate-200/50 rounded flex items-center justify-center">
        <span className="text-slate-400 text-xs font-medium italic">Ad Space (Responsive)</span>
      </div>
    </div>
  );
};

export default AdsContainer;
