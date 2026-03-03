
import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-95',
      secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-95',
      outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
      ghost: 'hover:bg-slate-100 text-slate-600',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs font-medium rounded-lg',
      md: 'h-11 px-6 text-sm font-semibold rounded-xl',
      lg: 'h-14 px-8 text-base font-bold rounded-2xl',
      icon: 'h-10 w-10 p-0 flex items-center justify-center rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
