'use client';

import { type FC, type CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = true,
  className = '',
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-2px 0 #00e5a0' : 'none',
    '--before-shadow': enableShadows ? '2px 0 #58a6ff' : 'none',
  };

  const baseClasses = 'relative select-none cursor-pointer';

  const pseudoClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[2px] after:bg-[var(--bg-base)] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-[glitch_var(--after-duration)_infinite_linear_alternate-reverse] ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-2px] before:bg-[var(--bg-base)] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-[glitch_var(--before-duration)_infinite_linear_alternate-reverse]'
    : "after:content-[''] after:absolute after:top-0 after:left-[2px] after:bg-[var(--bg-base)] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-2px] before:bg-[var(--bg-base)] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-[glitch_var(--after-duration)_infinite_linear_alternate-reverse] ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-[glitch_var(--before-duration)_infinite_linear_alternate-reverse]';

  return (
    <div
      style={inlineStyles}
      data-text={children}
      className={`${baseClasses} ${pseudoClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlitchText;
