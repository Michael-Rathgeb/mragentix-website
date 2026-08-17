'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import AnimatedContent from '@/components/ui/animated-content';
import SectionHeader from '@/components/ui/section-header';

interface FlowNode {
  icon: string;
  title: string;
  sub: string;
}
interface Flow {
  id: string;
  label: string;
  nodes: FlowNode[];
  caption: string;
}

const FLOWS: Flow[] = [
  {
    id: 'lead',
    label: 'Lead-to-close',
    caption: 'Every inbound lead → instant qualify → enrich → route → reply → booked. No human in the loop until it matters.',
    nodes: [
      { icon: '📩', title: 'New lead captured', sub: 'web · call · form' },
      { icon: '🤖', title: 'Claude qualifies', sub: 'intent · score' },
      { icon: '🔧', title: 'Enrich & score', sub: 'crm · apis · data' },
      { icon: '🔀', title: 'Branch & route', sub: 'hot / warm / cold' },
      { icon: '💬', title: 'Instant SMS reply', sub: 'twilio · <60s' },
      { icon: '✅', title: 'Booked & logged', sub: 'crm · calendar' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO / AEO',
    caption: 'Scrape real intent → cluster → generate → schema → build → deploy. Hundreds of authoritative pages a week, hands-off.',
    nodes: [
      { icon: '🔍', title: 'Scrape intent', sub: 'paa · serpapi' },
      { icon: '🧩', title: 'Cluster topics', sub: 'authority maps' },
      { icon: '✍️', title: 'Generate answers', sub: 'claude · sources' },
      { icon: '🏷️', title: 'Lock schema', sub: 'json-ld · kgmid' },
      { icon: '🏗️', title: 'Build pages', sub: 'static · fast' },
      { icon: '🚀', title: 'Deploy & index', sub: 'indexnow' },
    ],
  },
  {
    id: 'report',
    label: 'Reporting',
    caption: 'Raw data → clean → analyze → visualize → schedule → distribute. The weekly brief that writes itself.',
    nodes: [
      { icon: '📥', title: 'Pull sources', sub: 'apis · sheets · db' },
      { icon: '🧹', title: 'Clean & merge', sub: 'normalize · dedupe' },
      { icon: '🧠', title: 'Analyze', sub: 'claude · trends' },
      { icon: '📊', title: 'Visualize', sub: 'dashboard' },
      { icon: '⏰', title: 'Schedule', sub: 'cron · cadence' },
      { icon: '✉️', title: 'Distribute', sub: 'email · slack' },
    ],
  },
];

const CYCLE = 9000; // ms per full pipeline run

export default function AutomationFlow() {
  const [active, setActive] = useState(0);
  const flow = FLOWS[active];

  const wrapRef = useRef<HTMLDivElement>(null);
  const dNode = useRef<Array<HTMLDivElement | null>>([]);
  const mNode = useRef<Array<HTMLDivElement | null>>([]);
  const dPacket = useRef<Array<HTMLSpanElement | null>>([]);
  const vPacket = useRef<Array<HTMLSpanElement | null>>([]);
  const runsRef = useRef<HTMLSpanElement>(null);

  const inView = useInView(wrapRef, { amount: 0.3, margin: '0px 0px -15% 0px' });
  const inViewRef = useRef(inView);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = FLOWS[0].nodes.length; // constant across flows
    const seg = 1 / N;
    const fire = seg * 0.45;

    const setNode = (k: number, activeNode: boolean) => {
      dNode.current[k]?.classList.toggle('flow__node--active', activeNode);
      mNode.current[k]?.classList.toggle('flow__node--active', activeNode);
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
          lede="Three real pipelines we build. Switch between them — each one captures, decides, and acts in seconds."
        />

        {/* Tabs */}
        <AnimatedContent delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {FLOWS.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className="pill"
                style={
                  i === active
                    ? { borderColor: 'var(--accent)', color: 'var(--accent)', background: 'rgba(0,229,160,0.08)' }
                    : undefined
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </AnimatedContent>

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

        <div ref={wrapRef} className={`flow ${inView ? 'flow--running' : ''}`} key={flow.id}>
          {/* Desktop: horizontal row */}
          <div className="flow__row">
            {flow.nodes.map((node, i) => (
              <div className="contents" key={`r-${i}`}>
                <div ref={(el) => { dNode.current[i] = el; }} className="flow__node">
                  <span className="flow__led" />
                  <div className="flow__node-icon">{node.icon}</div>
                  <div className="flow__node-title">{node.title}</div>
                  <div className="flow__node-sub">{node.sub}</div>
                </div>
                {i < flow.nodes.length - 1 && (
                  <div className="flow__wire">
                    <span className="flow__packet" ref={(el) => { dPacket.current[i] = el; }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: vertical column */}
          <div className="flow__col">
            {flow.nodes.map((node, i) => (
              <div key={`c-${i}`}>
                <div ref={(el) => { mNode.current[i] = el; }} className="flow__node" style={{ width: '100%', maxWidth: 320 }}>
                  <span className="flow__led" />
                  <div className="flow__node-icon">{node.icon}</div>
                  <div className="flow__node-title">{node.title}</div>
                  <div className="flow__node-sub">{node.sub}</div>
                </div>
                {i < flow.nodes.length - 1 && (
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
            {`// ${flow.caption}`}
          </p>
        </AnimatedContent>
      </div>
    </section>
  );
}
