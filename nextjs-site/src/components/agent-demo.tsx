'use client';

import { useRef, useState } from 'react';
import AnimatedContent from '@/components/ui/animated-content';
import SectionHeader from '@/components/ui/section-header';

type LineType = 'command' | 'success' | 'info' | 'accent' | 'text';
interface Line {
  type: LineType;
  text: string;
}

const EXAMPLES = [
  'Qualify leads from our website and reply by SMS',
  'Generate SEO content and rank in Austin',
  'Turn a weekly spreadsheet into an emailed report',
  'Auto-invoice and chase unpaid invoices',
];

export default function AgentDemo() {
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = async (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    setPrompt('');
    clearTimers();
    setLines([
      { type: 'command', text: `> ${value}` },
      { type: 'info', text: 'agent online · reading request…' },
    ]);

    try {
      const res = await fetch('/api/agent-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value }),
      });
      const data = (await res.json()) as { plan: string[]; summary: string; est: string };

      data.plan.forEach((step, i) => {
        const t = setTimeout(() => {
          setLines((l) => [...l, { type: 'success', text: step }]);
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }, 650 + i * 560);
        timers.current.push(t);
      });

      const done = setTimeout(() => {
        setLines((l) => [
          ...l,
          { type: 'accent', text: `✓ ${data.summary}` },
          { type: 'info', text: data.est },
        ]);
        setBusy(false);
      }, 650 + data.plan.length * 560 + 200);
      timers.current.push(done);
    } catch {
      setLines((l) => [...l, { type: 'text', text: '(demo offline — please try again)' }]);
      setBusy(false);
    }
  };

  const colorFor = (t: LineType) =>
    t === 'command'
      ? 'var(--text-primary)'
      : t === 'success'
        ? 'var(--text-secondary)'
        : t === 'accent'
          ? 'var(--accent)'
          : t === 'info'
            ? '#58a6ff'
            : 'var(--text-muted)';

  return (
    <section id="agent-demo" className="section section--surface">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 380, height: 380, top: '0%', left: '-10%', opacity: 0.28 }} />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow="// talk to an agent"
          title={
            <>
              Describe a task. Watch it <span className="text-gradient">plan it back.</span>
            </>
          }
          lede="A tiny taste of what we build. Type any repetitive job and the agent drafts a real automation plan, step by step."
        />

        <AnimatedContent delay={0.1}>
          <div className="card overflow-hidden max-w-3xl">
            {/* Terminal header */}
            <div className="terminal__chrome">
              <span className="terminal__dot terminal__dot--red" />
              <span className="terminal__dot terminal__dot--yellow" />
              <span className="terminal__dot terminal__dot--green" />
              <span className="terminal__title">mragentix · agent-demo</span>
            </div>

            {/* Output */}
            <div
              ref={scrollRef}
              className="font-[var(--font-mono)] text-sm p-4 md:p-5 space-y-1.5"
              style={{ minHeight: 180, maxHeight: 280, overflowY: 'auto' }}
            >
              {lines.length === 0 && (
                <p className="text-[var(--text-muted)]">
                  {'// try: “qualify our inbound leads and text them back in under a minute”'}
                </p>
              )}
              {lines.map((line, i) => (
                <div key={i} className="flex gap-2 leading-relaxed">
                  {line.type === 'success' && <span className="text-[var(--accent)]">✓</span>}
                  {line.type === 'info' && <span className="text-[#58a6ff]">→</span>}
                  <span style={{ color: colorFor(line.type) }} className={line.type === 'accent' ? 'font-semibold' : ''}>
                    {line.text}
                  </span>
                </div>
              ))}
              {busy && (
                <div className="flex gap-2 text-[var(--accent)]">
                  <span className="terminal__cursor">▮</span>
                  <span className="text-[var(--text-muted)]">working…</span>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              className="flex gap-2 p-3 border-t border-[var(--border)] bg-[var(--bg-base)]/40"
              onSubmit={(e) => {
                e.preventDefault();
                run(prompt);
              }}
            >
              <input
                className="flex-1 bg-transparent outline-none px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-[var(--font-mono)]"
                placeholder="Describe a task to automate…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                aria-label="Describe a task to automate"
              />
              <button type="submit" className="btn btn--primary btn--sm" disabled={busy}>
                {busy ? 'Thinking…' : 'Run agent →'}
              </button>
            </form>
          </div>

          {/* Example chips */}
          <div className="flex flex-wrap gap-2 mt-4 max-w-3xl">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                className="pill text-xs disabled:opacity-50"
                disabled={busy}
                onClick={() => run(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
