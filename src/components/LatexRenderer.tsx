import { useEffect, useRef } from 'react';
import katex from 'katex';

interface LatexRendererProps {
  content: string;
  display?: boolean;
  className?: string;
}

export function LatexRenderer({ content, display = false, className = '' }: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(content, containerRef.current, {
          displayMode: display,
          throwOnError: false,
          strict: false,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
        if (containerRef.current) {
          containerRef.current.textContent = content;
        }
      }
    }
  }, [content, display]);

  return (
    <div 
      ref={containerRef} 
      className={`${display ? 'katex-display' : 'inline'} ${className}`}
    />
  );
}

interface LatexBlockProps {
  code: string;
  className?: string;
}

export function LatexBlock({ code, className = '' }: LatexBlockProps) {
  return (
    <div className={`math-block ${className}`}>
      <LatexRenderer content={code} display />
    </div>
  );
}
