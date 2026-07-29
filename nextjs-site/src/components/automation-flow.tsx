'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import AnimatedContent from '@/components/ui/animated-content';
import SectionHeader from '@/components/ui/section-header';

const NODES = [
  { icon: '📩', title: 'New lead captured', sub: 'web · call · form' },
  { icon: '🤖', title: 'Claude qualifies', sub: 'intent · score' },
  { icon: '🔧', title: 'Enrich & score', sub: 'crm · apis · data' },
  { icon: '🔀', title: 'Branch & route', sub: 'hot / warm / cold' },
  { icon: '💬', title: 'Instant SMS reply', sub: 'twilio · <60s' },
  { icon: '✅', title: 'Booked & logged', sub: 'crm · calendar' },
];

const CYCLE = 9000; // ms per full pipeline run

export default function AutomationFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // separate refs per variant so both stay in sync
  const dNode = useRef<Array<HTMLDivElement | null>>([]);
  const mNode = useRef<Array<HTMLDivElement | null>>([]);
  const dPacket = useRef<Array<HTMLSpanElement | null>>([]); // horizontal
  const vPacket = useRef<Array<HTMLSpanElement | null>>([]); // vertical
  const runsRef = useRef<HTMLSpanElement>(null);

  const inView = useInView(wrapRef, { amount: 0.3, margin: '0px 0px -15% 0px' });
  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = NODES.length;
    const seg = 1 / N;
    const fire = seg * 0.45;

    const setNode = (k: number, active: boolean) => {
      dNode.current[k]?.classList.toggle('flow__node--active', active);
      mNode.current[k]?.classList.toggle('flow__node--active', active);
    };
    const setPacket = (k: number, progress: number, vis: boolean) => {
      const op = vis ? '1' : '0';
      const pct = `${progress * 100}%`;
      const dh = dPacket.current[k];
      if (dh) {
        dh.style.left = pct;
        dh.style.opacity = op;
      }
      const vv = vPacket.current[k];
      if (vv) {
        vv.style.top = pct;
        vv.style.opacity = op;
      }
    };

    const renderPhase = (phase: number) => {
      for (let k = 0; k < N; k++) {
        const start = k * seg;
        setNode(k, phase >= start && phase < start + fire);
      }
      for (let k = 0; k < N - 1; k++) {
        const start = k * seg;
        const local = (phase - start) / seg;
        setPacket(k, Math.max(0, Math.min(1, local)), local >= 0 && local <= 1);
      }
    };

    if (reduce) {
      renderPhase(0.0001);
      if (runsRef.current) runsRef.current.textContent = '1,284';
      return;
    }

    let raf = 0;
    const startT = performance.now();
    let runs = 1284;
    let lastPhase = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!inViewRef.current) return;
      const phase = ((now - startT) % CYCLE) / CYCLE;
      renderPhase(phase);
      if (phase < lastPhase) {
        runs += 1;
        if (runsRef.current) runsRef.current.textContent = runs.toLocaleString();
      }
      lastPhase = phase;
    };
    raf = requestAnimationFrame(loop);
    if (runsRef.current) runsRef.current.textContent = runs.toLocaleString();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="automation" className="section">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 420, height: 420, top: '10%', right: '-6%' }} />
        <div className="glow-orb glow-orb--emerald" style={{ width: 360, height: 360, bottom: '0%', left: '-8%', opacity: 0.4 }} />
        <div className="bg-grid-faint absolute inset-0" />
      </div>

      <div className="container">
        <SectionHeader
          eyebrow="// automations in motion"
          title={
            <>
              Watch a workflow <span className="text-gradient">fire end-to-end.</span>
            </>
          }
          lede="This is what we build — autonomous pipelines that capture, qualify, enrich, route, and act in seconds. No human in the loop until it actually matters."
        />

        <AnimatedContent delay={0.15}>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="flow__hud">
              <span className="divider-status__led" /> pipeline live
            </span>
            <span
              className="flow__hud"
              style={{ background: 'rgba(139,148,158,0.05)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              runs today · <span ref={runsRef} className="text-[var(--accent)]">1,284</span>
            </span>
            <span
              className="flow__hud"
              style={{ background: 'rgba(139,148,158,0.05)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              avg latency · 1.6s / node
            </span>
          </div>
        </AnimatedContent>

        <div ref={wrapRef} className={`flow ${inView ? 'flow--running' : ''}`}>
          {/* Desktop: horizontal row */}
          <div className="flow__row">
            {NODES.map((node, i) => (
              <div className="contents" key={`r-${i}`}>
                <div ref={(el) => { dNode.current[i] = el; }} className="flow__node">
                  <span className="flow__led" />
                  <div className="flow__node-icon">{node.icon}</div>
                  <div className="flow__node-title">{node.title}</div>
                  <div className="flow__node-sub">{node.sub}</div>
                </div>
                {i < NODES.length - 1 && (
                  <div className="flow__wire">
                    <span className="flow__packet" ref={(el) => { dPacket.current[i] = el; }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical column */}
          <div className="flow__col">
            {NODES.map((node, i) => (
              <div key={`c-${i}`}>
                <div ref={(el) => { mNode.current[i] = el; }} className="flow__node" style={{ width: '100%', maxWidth: 320 }}>
                  <span className="flow__led" />
                  <div className="flow__node-icon">{node.icon}</div>
                  <div className="flow__node-title">{node.title}</div>
                  <div className="flow__node-sub">{node.sub}</div>
                </div>
                {i < NODES.length - 1 && (
                  <div className="flow__wire-v">
                    <span className="flow__packet-v" ref={(el) => { vPacket.current[i] = el; }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatedContent delay={0.2}>
          <p className="mt-12 text-sm text-[var(--text-muted)] font-[var(--font-mono)] max-w-2xl">
            {`// trigger → agent → tools → route → action → result. `}
            <span className="text-[var(--text-secondary)]">
              Every step observable, logged, and overrideable. We wire it to your stack — GoHighLevel, HubSpot, Twilio, Calendly, or custom.
            </span>
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
