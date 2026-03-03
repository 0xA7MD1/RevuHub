import React, { useState } from 'react';
import { Copy, Check, Play, Terminal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CodeEditorProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  executable?: boolean;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  language = 'javascript', 
  title,
  showLineNumbers = true,
  executable = false,
  className 
}) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const lines = code.split('\n');
  const maxLineNumberWidth = lines.length.toString().length;

  return (
    <div className={cn(
      "bg-slate-950 rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-800",
      className
    )}>
      {/* Mac-style header */}
      <div className="bg-slate-900/50 backdrop-blur-sm px-6 py-4 border-b border-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Window controls */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/20" />
            </div>
            
            {/* File name */}
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 text-sm font-medium">
                {title || `code.${language}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {executable && (
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className={cn("w-3 h-3", isRunning && "animate-pulse")} />
                {isRunning ? 'Running...' : 'Run'}
              </button>
            )}
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium rounded-lg transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <div className="flex">
          {/* Line numbers */}
          {showLineNumbers && (
            <div className="bg-slate-900/30 text-slate-600 text-sm font-mono px-4 py-6 select-none border-r border-slate-800/50">
              {lines.map((_, index) => (
                <div 
                  key={index} 
                  className="text-right"
                  style={{ minWidth: `${maxLineNumberWidth * 0.6}rem` }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}

          {/* Code */}
          <div className="flex-1 px-6 py-6">
            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-900/50 backdrop-blur-sm px-6 py-2 border-t border-slate-800/50">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-xs font-medium">
            {language} • {lines.length} lines
          </span>
          <span className="text-slate-600 text-xs">
            UTF-8 • LF
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
