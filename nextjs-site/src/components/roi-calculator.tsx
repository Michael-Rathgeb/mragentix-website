'use client';

import { useMemo, useState } from 'react';
import AnimatedContent from '@/components/ui/animated-content';
import AnimatedNumber from '@/components/ui/animated-number';
import SectionHeader from '@/components/ui/section-header';
import StarBorder from '@/components/ui/star-border';

const WEEKS = 52;
const RECLAIM = 0.8; // share of manual work automation typically handles

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm text-[var(--text-secondary)]">{label}</label>
        <span className="font-[var(--font-mono)] text-sm text-[var(--accent)]">{display}</span>
      </div>
      <input
        className="roi-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(45);
  const [procs, setProcs] = useState(5);

  const { savingsYearly, savingsMonthly, hoursBack } = useMemo(() => {
    const manualYearly = hours * WEEKS * rate;
    const sy = Math.round(manualYearly * RECLAIM);
    return {
      savingsYearly: sy,
      savingsMonthly: Math.round(sy / 12),
      hoursBack: Math.round(hours * RECLAIM * WEEKS),
    };
  }, [hours, rate]);

  return (
    <section id="roi" className="section">
      <div className="section__bg">
        <div className="glow-orb glow-orb--emerald" style={{ width: 420, height: 420, top: '10%', right: '-12%', opacity: 0.3 }} />
        <div className="bg-grid-faint absolute inset-0" />
      </div>
      <div className="container">
        <SectionHeader
          eyebrow="// do the math"
          title={
            <>
              What could you <span className="text-gradient">stop doing?</span>
            </>
          }
          lede="Drag the sliders to match your team. This is the repetitive work we typically automate away — and what it’s quietly costing you every year."
        />

        <AnimatedContent delay={0.1}>
          <div className="card p-6 md:p-8 grid lg:grid-cols-2 gap-10 items-center">
            {/* Inputs */}
            <div className="space-y-7">
              <Slider
                label="Hours of manual work / week"
                value={hours}
                min={1}
                max={40}
                onChange={setHours}
                display={`${hours} hrs`}
              />
              <Slider
                label="Fully-loaded hourly cost"
                value={rate}
                min={15}
                max={200}
                step={5}
                onChange={setRate}
                display={`$${rate}/hr`}
              />
              <Slider
                label="Repetitive processes to automate"
                value={procs}
                min={1}
                max={20}
                onChange={setProcs}
                display={`${procs} process${procs === 1 ? '' : 'es'}`}
              />
              <p className="text-xs text-[var(--text-muted)] font-[var(--font-mono)]">
                {'// assumes ~80% of repetitive work is automatable'}
              </p>
            </div>

            {/* Result */}
            <div className="text-center lg:text-left lg:border-l lg:border-[var(--border)] lg:pl-10">
              <div className="font-[var(--font-mono)] text-xs uppercase tracking-wide text-[var(--text-muted)] mb-2">
                estimated yearly savings
              </div>
              <div className="metric-number text-gradient" style={{ fontSize: 'clamp(2.6rem, 7vw, 4.5rem)' }}>
                <AnimatedNumber value={savingsYearly} prefix="$" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-xl font-bold text-[var(--text-primary)]">
                    <AnimatedNumber value={savingsMonthly} prefix="$" />
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-[var(--font-mono)] uppercase">/ month</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[var(--text-primary)]">
                    <AnimatedNumber value={hoursBack} />
                    <span className="text-[var(--accent)]"> hrs</span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] font-[var(--font-mono)] uppercase">reclaimed / yr</div>
                </div>
              </div>

              <div className="mt-7">
                <StarBorder as="a" href="#contact" color="#00e5a0" speed="5s" className="!rounded-xl">
                  <span className="px-5 py-2.5 font-semibold">Automate this →</span>
                </StarBorder>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
