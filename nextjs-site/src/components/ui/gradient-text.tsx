import { cn } from '@/lib/cn';

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  /** Tailwind/any color value for the gradient start */
  from?: string;
  to?: string;
};

/**
 * Renders text with an animated, emerald-leaning gradient fill.
 * Uses background-clip: text so it works on any font weight/size.
 */
export default function GradientText({
  children,
  className,
  from = 'var(--accent)',
  to = '#5eead4',
}: GradientTextProps) {
  return (
    <span
      className={cn('text-gradient', className)}
      style={
        {
          backgroundImage: `linear-gradient(110deg, ${from} 0%, ${to} 45%, ${from} 100%)`,
          backgroundSize: '200% auto',
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
