'use client';

import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

export default function StarBorder<T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#00e5a0',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || 'button';

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-lg ${className}`}
      {...(rest as Record<string, unknown>)}
      style={{ padding: `${thickness}px 0`, ...(rest as Record<string, unknown>).style as React.CSSProperties }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-[star-movement-bottom_linear_infinite_alternate] z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-[star-movement-top_linear_infinite_alternate] z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-[1] border border-[var(--border)] text-white text-center rounded-lg bg-[var(--bg-surface)]">
        {children}
      </div>
    </Component>
  );
}
