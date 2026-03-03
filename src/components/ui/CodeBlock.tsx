import React from 'react';
import PrismCode from './PrismCode';

interface CodeBlockProps {
  children: string;
  className?: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  className,
  language = 'javascript',
  title,
  showLineNumbers = true
}) => {
  // Extract language from className if not provided
  const detectedLanguage = language || className?.replace('language-', '') || 'javascript';
  
  return (
    <PrismCode
      code={children.trim()}
      language={detectedLanguage}
      title={title}
      showLineNumbers={showLineNumbers}
      className={className}
    />
  );
};

export default CodeBlock;
