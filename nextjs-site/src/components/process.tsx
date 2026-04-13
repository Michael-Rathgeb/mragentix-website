'use client';

import AnimatedContent from '@/components/ui/animated-content';
import SpotlightCard from '@/components/ui/spotlight-card';
import GlareHover from '@/components/ui/glare-hover';

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'We audit your current workflow, tools, and goals. Free, no pitch deck.',
  },
  {
    number: '02',
    title: 'Architecture',
    desc: 'We design the system: which agents, what triggers, what outputs.',
  },
  {
    number: '03',
    title: 'Build',
    desc: 'Rapid development with weekly check-ins. No black boxes — you see everything.',
  },
  {
    number: '04',
    title: 'Deploy & Automate',
    desc: 'Ship it, monitor it, hand off documentation. Or we run it for you.',
  },
];

function ConnectorLine() {
  return (
    <div className="hidden lg:flex items-center justify-center -mx-3 z-0">
      <svg width="40" height="2" viewBox="0 0 40 2" className="overflow-visible">
        <line
          x1="0"
          y1="1"
          x2="40"
          y2="1"
          stroke="var(--border-accent)"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-dash-flow"
        />
      </svg>
    </div>
  );
}

export default function Process() {
  return (
    <section id="how-it-works" className="py-[var(--section-pad)] bg-[var(--bg-surface)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// the process</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">Your Automation Goes Live in 4 Steps</h2>
        </AnimatedContent>

        {/* Desktop layout */}
        <div className="hidden md:flex items-stretch justify-center">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-stretch">
              <AnimatedContent delay={i * 0.15} distance={30}>
                <GlareHover className="rounded-lg h-full">
                  <SpotlightCard className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-6 h-full transition-colors duration-300 hover:border-[var(--border-accent)]">
                    <div className="relative z-10 flex flex-col gap-3">
                      <span
                        className="font-mono text-3xl font-bold text-[var(--accent)]"
                        style={{ textShadow: '0 0 20px var(--accent-glow)' }}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </GlareHover>
              </AnimatedContent>
              {i < STEPS.length - 1 && <ConnectorLine />}
            </div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: 'var(--border-accent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-6">
            {STEPS.map((step, i) => (
              <AnimatedContent key={i} delay={i * 0.12} distance={20}>
                <div className="flex items-start gap-4">
                  {/* Step number on the left */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-accent)] flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-[var(--accent)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <GlareHover className="rounded-lg flex-1">
                    <SpotlightCard className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-colors duration-300 hover:border-[var(--border-accent)]">
                      <div className="relative z-10">
                        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </SpotlightCard>
                  </GlareHover>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
