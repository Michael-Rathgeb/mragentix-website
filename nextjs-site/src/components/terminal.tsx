'use client';

import { useEffect, useRef, useState } from 'react';

interface TerminalLine {
  type: 'command' | 'success' | 'info' | 'cursor' | 'text' | 'accent';
  text?: string;
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  animated?: boolean;
  className?: string;
}

export default function Terminal({ title = '~', lines, animated = false, className = '' }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState(animated ? 0 : lines.length);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleLines(0);
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= lines.length) clearInterval(interval);
          }, 600);
          observer.disconnect();
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animated, lines.length]);

  return (
    <div ref={ref} className={`terminal ${className}`}>
      <div className="terminal__chrome">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">{title}</span>
      </div>
      <div className="terminal__body">
        {lines.map((line, i) => {
          if (animated && i >= visibleLines) return null;

          return (
            <div
              key={i}
              className="terminal__line"
              style={animated ? { animation: 'terminalFadeIn 0.4s ease forwards' } : undefined}
            >
              {line.type === 'command' && (
                <>
                  <span className="terminal__prompt">$</span>
                  <span className="terminal__text" style={{ color: 'var(--text-primary)' }}>{line.text}</span>
                </>
              )}
              {line.type === 'success' && (
                <>
                  <span className="terminal__check">✓</span>
                  <span className="terminal__text">{line.text}</span>
                </>
              )}
              {line.type === 'info' && (
                <>
                  <span className="terminal__arrow">→</span>
                  <span className="terminal__text">{line.text}</span>
                </>
              )}
              {line.type === 'text' && (
                <span className="terminal__text">{line.text}</span>
              )}
              {line.type === 'accent' && (
                <span className="terminal__text" style={{ color: 'var(--accent)' }}>{line.text}</span>
              )}
              {line.type === 'cursor' && (
                <>
                  <span className="terminal__prompt">$</span>
                  <span className="terminal__cursor">_</span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
