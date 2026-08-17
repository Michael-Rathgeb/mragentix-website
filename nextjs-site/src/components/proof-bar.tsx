'use client';

import CountUp from '@/components/ui/count-up';
import AnimatedContent from '@/components/ui/animated-content';

const STATS = [
  { number: 47, suffix: '+', label: 'Workflows shipped' },
  { number: 13, suffix: '', label: 'Agents in production' },
  { number: 3, suffix: '', label: 'npm packages' },
  { number: 4, suffix: '', label: 'LLM providers' },
];

export default function ProofBar() {
  return (
    <section id="proof-bar" className="relative border-y border-[var(--border)] bg-[var(--bg-surface)]/40">
      {/* top accent hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.5 }}
        aria-hidden
      />
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-6 items-center">
          {/* Live tag */}
          <AnimatedContent delay={0}>
            <div className="flex items-center gap-2">
              <span className="divider-status__led" />
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                systems · operational
              </span>
            </div>
          </AnimatedContent>

          {STATS.map((stat, i) => (
            <AnimatedContent key={i} delay={0.05 * (i + 1)}>
              <div className="space-y-1">
                <div className="flex items-baseline gap-0.5">
                  <span className="metric-number text-gradient">
                    <CountUp to={stat.number} duration={2.2} />
                  </span>
                  <span className="text-2xl font-bold text-[var(--accent)]">{stat.suffix}</span>
                </div>
                <span className="block text-xs text-[var(--text-muted)] font-[var(--font-mono)] uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            </AnimatedContent>
          ))}

          <AnimatedContent delay={0.3}>
            <div className="col-span-2 md:col-span-1 md:text-right space-y-1">
              <div className="text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-tight">
                St. Louis <span className="text-[var(--accent)]">→</span> Nationwide
              </div>
              <span className="block text-xs text-[var(--text-muted)] font-[var(--font-mono)] uppercase tracking-wide">
                reach
              </span>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
