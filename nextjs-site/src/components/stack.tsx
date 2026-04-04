'use client';

import AnimatedContent from '@/components/ui/animated-content';
import ScrollVelocity from '@/components/ui/scroll-velocity';

const GROUPS = [
  { label: 'AI', pills: ['Claude API', 'OpenAI API', 'LangChain', 'MCP Protocol'] },
  { label: 'Backend', pills: ['Python', 'FastAPI', 'PostgreSQL'] },
  { label: 'Frontend', pills: ['React', 'Ink 6', 'TypeScript', 'Webflow'] },
  { label: 'Infra', pills: ['Docker', 'Google Cloud', 'pnpm', 'Vitest', 'n8n', 'Twilio', 'Playwright'] },
  { label: 'Open Source', pills: ['@mragentix/ai', '@mragentix/agent', '@mragentix/cli'] },
];

const ALL_TECH = GROUPS.flatMap((g) => g.pills);

export default function Stack() {
  return (
    <section id="stack" className="py-[var(--section-pad)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// under the hood</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">Built on Tools That Actually Work</h2>
        </AnimatedContent>
      </div>

      {/* Scrolling marquee */}
      <div className="mb-12 overflow-hidden">
        <ScrollVelocity
          texts={[ALL_TECH.join('  ·  '), ALL_TECH.join('  ·  ')]}
          velocity={40}
          className="text-[var(--text-muted)] font-mono text-sm"
          scrollerClassName="font-mono text-sm font-normal tracking-normal text-[var(--text-muted)] drop-shadow-none !text-base !leading-normal md:!text-lg md:!leading-normal"
        />
      </div>

      <div className="container">
        <AnimatedContent delay={0.2}>
          <div className="space-y-6">
            {GROUPS.map((group) => (
              <div key={group.label} className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-semibold text-[var(--accent)] w-24 flex-shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.pills.map((pill) => (
                    <span key={pill} className="pill">{pill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedContent>

        <AnimatedContent delay={0.3}>
          <p className="mt-8 text-sm italic text-[var(--text-muted)]">
            — &ldquo;We don&apos;t chase frameworks. We use what ships fastest and breaks least.&rdquo;
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
