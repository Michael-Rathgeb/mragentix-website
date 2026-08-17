import { cn } from '@/lib/cn';

type SectionDividerProps = {
  label?: string;
  className?: string;
};

export default function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn('container', className)}>
      <div className="divider-status">
        <span className="divider-status__led" />
        <span>{label ?? 'system · operational'}</span>
        <span className="divider-status__line" />
      </div>
    </div>
  );
}
