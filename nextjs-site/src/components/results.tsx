'use client';

import AnimatedContent from '@/components/ui/animated-content';

const TESTIMONIALS = [
  {
    before: 'Our team spent 12+ hours a week manually qualifying leads from web forms and phone calls.',
    after: 'MR Agentix built us an AI lead qualification agent. Response time dropped from 4 hours to 47 seconds. Our close rate jumped 31% in the first month.',
    name: 'Sarah Mitchell',
    role: 'Operations Director, Midwest Property Group',
  },
  {
    before: 'We were paying $2,400/month for an SEO agency that sent us spreadsheets. Rankings barely moved.',
    after: "Their AEO system generated 340+ optimized pages with schema markup in a single week. We're in the map pack for 23 new keywords — and climbing.",
    name: 'Jason Torres',
    role: 'Owner, Torres HVAC Services — Austin, TX',
  },
  {
    before: 'Our intake process was a mess — sticky notes, missed follow-ups, and leads going cold overnight.',
    after: 'Now every lead gets an instant SMS response, a smart drip sequence, and auto-routing to the right team member. We booked 19 extra appointments in the first two weeks.',
    name: 'Dr. Lisa Chen',
    role: 'Practice Manager, Lakewood Dental — St. Louis, MO',
  },
];

export default function Results() {
  return (
    <section id="results" className="py-[var(--section-pad)] bg-[var(--bg-surface)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// the proof</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">The Results Speak for Themselves</h2>
        </AnimatedContent>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedContent key={i} delay={i * 0.12}>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-6 h-full flex flex-col">
                <div className="flex-1 space-y-3 mb-4">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Before:</strong> {t.before}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--accent)]">After:</strong> {t.after}
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border)]">
                  <span className="block text-sm font-semibold text-[var(--text-primary)]">{t.name}</span>
                  <span className="block text-xs text-[var(--text-muted)]">{t.role}</span>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={0.4}>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-[var(--text-secondary)]">
            <span>Built 47+ automated workflows</span>
            <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
            <span>13 AI agents in production</span>
            <span className="text-[var(--text-muted)]" aria-hidden="true">·</span>
            <span>Based in St. Louis, MO</span>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
