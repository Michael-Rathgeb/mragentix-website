import AnimatedContent from '@/components/ui/animated-content';
import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedContent
      className={cn(
        'mb-12',
        align === 'center' && 'text-center flex flex-col items-center',
        className
      )}
    >
      <span className={cn('eyebrow', align === 'center' && 'justify-center')}>
        {eyebrow}
      </span>
      <h2 className={cn('section-heading', align === 'center' && 'mx-auto')}>{title}</h2>
      {lede && <p className={cn('section-lede', align === 'center' && 'mx-auto')}>{lede}</p>}
    </AnimatedContent>
  );
}
