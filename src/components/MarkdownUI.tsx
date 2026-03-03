import React from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle, X } from 'lucide-react';

// Callout Component - Stylish info box for notes or warnings
interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
}

export const Callout: React.FC<CalloutProps> = ({ 
  children, 
  type = 'info', 
  title 
}) => {
  const typeStyles = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: Info,
      iconColor: 'text-blue-600 dark:text-blue-400',
      titleColor: 'text-blue-900 dark:text-blue-100'
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 dark:text-amber-400',
      titleColor: 'text-amber-900 dark:text-amber-100'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-950/20',
      border: 'border-red-200 dark:border-red-800',
      icon: AlertCircle,
      iconColor: 'text-red-600 dark:text-red-400',
      titleColor: 'text-red-900 dark:text-red-100'
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: CheckCircle,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      titleColor: 'text-emerald-900 dark:text-emerald-100'
    }
  };

  const currentStyle = typeStyles[type];
  const Icon = currentStyle.icon;

  return (
    <div className={`my-6 p-4 rounded-2xl border ${currentStyle.bg} ${currentStyle.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${currentStyle.iconColor}`} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold text-sm mb-2 ${currentStyle.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// WavyText Component - Span with wavy emerald underline
interface WavyTextProps {
  children: React.ReactNode;
  className?: string;
}

export const WavyText: React.FC<WavyTextProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <span 
      className={`
        underline decoration-wavy decoration-emerald-500 underline-offset-4
        hover:decoration-emerald-600 transition-colors
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// Highlight Component - Text highlighter with soft background
interface HighlightProps {
  children: React.ReactNode;
  color?: 'emerald' | 'blue' | 'amber' | 'rose';
  className?: string;
}

export const Highlight: React.FC<HighlightProps> = ({ 
  children, 
  color = 'emerald',
  className = '' 
}) => {
  const colorStyles = {
    emerald: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200',
    blue: 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200',
    amber: 'bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200',
    rose: 'bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-200'
  };

  return (
    <span 
      className={`
        ${colorStyles[color]} 
        rounded px-1.5 py-0.5
        font-medium
        ${className}
      `}
    >
      {children}
    </span>
  );
};

// InlineCode Component - Enhanced inline code styling
interface InlineCodeProps {
  children: React.ReactNode;
  className?: string;
}

export const InlineCode: React.FC<InlineCodeProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <code 
      className={`
        bg-slate-100 dark:bg-slate-800 
        text-slate-800 dark:text-slate-200 
        px-1.5 py-0.5 
        rounded-md 
        text-sm font-mono
        border border-slate-200 dark:border-slate-700
        ${className}
      `}
    >
      {children}
    </code>
  );
};

// Kbd Component - Keyboard key styling
interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export const Kbd: React.FC<KbdProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <kbd 
      className={`
        px-2 py-1 
        text-xs font-mono
        bg-slate-100 dark:bg-slate-800
        border border-slate-300 dark:border-slate-600
        rounded-md
        shadow-sm
        ${className}
      `}
    >
      {children}
    </kbd>
  );
};
