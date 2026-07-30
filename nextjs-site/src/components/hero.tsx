'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import StarBorder from '@/components/ui/star-border';
import AnimatedContent from '@/components/ui/animated-content';
import MagneticButton from '@/components/ui/magnetic-button';
import TiltCard from '@/components/ui/tilt-card';
import Terminal from '@/components/terminal';

const HeroScene = dynamic(() => import('@/components/hero-scene'), { ssr: false });

const HEADLINE = ['We', 'build', 'the', 'agents', 'that', 'do', 'the', 'work.'];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.075, delayChildren: 0.15 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.5em' },
  show: {
    opacity: 1,
    y: '0em',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20"
    >
      {/* 3D WebGL background */}
      <HeroScene className="absolute inset-0 z-0 pointer-events-none" />

      {/* Decorative overlays */}
      <div className="hero-grid absolute inset-0 z-[1] pointer-events-none" aria-hidden />
      <div className="hero-vignette absolute inset-0 z-[1] pointer-events-none" aria-hidden />
      <div className="hero-glow absolute inset-0 z-[1] pointer-events-none" aria-hidden />

      <div className="container relative z-10">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-center">
          {/* ---- Copy ---- */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={word} className="mb-6">
              <span className="hero-pill">
                <span className="hero-pill__dot" />
                Now booking builds · St. Louis &amp; remote
              </span>
            </motion.div>

            <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.4rem] font-bold leading-[1.02] tracking-tight text-gradient">
              {HEADLINE.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="inline-block mr-[0.28em]"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={word}
              className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed"
            >
              AI automation, agentic workflows, and intelligent web systems for
              businesses ready to scale{' '}
              <span className="text-[var(--text-primary)]">without adding headcount.</span>
            </motion.p>

            <motion.div variants={word} className="flex flex-wrap gap-4 mt-9">
              <MagneticButton strength={0.4}>
                <StarBorder
                  as="a"
                  href="#contact"
                  color="#00e5a0"
                  speed="5s"
                  className="!rounded-xl hero-cta"
                >
                  <span className="px-5 py-2.5 font-semibold inline-flex items-center gap-2">
                    Book a Free Discovery Call
                    <span className="hero-cta__arrow">→</span>
                  </span>
                </StarBorder>
              </MagneticButton>
              <a href="#services" className="btn btn--ghost btn--lg">
                See what we build
              </a>
            </motion.div>

            <motion.div variants={word} className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2" aria-hidden>
                {['🏢', '🏗️', '🏥', '🍽️', '⚖️'].map((e, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 rounded-full grid place-items-center bg-[var(--bg-elevated)] border border-[var(--border)] text-sm"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <span className="text-sm text-[var(--text-secondary)]">
                Trusted across{' '}
                <span className="text-[var(--text-primary)] font-semibold">12 industries</span>
              </span>
            </motion.div>

            <motion.p variants={word} className="mt-6 text-xs text-[var(--text-muted)] font-[var(--font-mono)]">
              {'// free discovery call · no pitch deck · ships in weeks, not quarters'}
            </motion.p>
          </motion.div>

          {/* ---- Floating terminal ---- */}
          <AnimatedContent delay={0.25} distance={30} className="relative">
            <div className="hero-terminal-wrap">
              <motion.div
                className="hero-terminal-float"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TiltCard className="hero-terminal-card">
                  <Terminal
                    title="mragentix-cli"
                    animated
                    lines={[
                      { type: 'command', text: 'mragentix deploy --agent seo-crawler' },
                      { type: 'success', text: 'Scraping People Also Ask data...' },
                      { type: 'success', text: 'Clustering 847 questions...' },
                      { type: 'success', text: 'Generating schema markup...' },
                      { type: 'success', text: 'Building static site...' },
                      { type: 'info', text: 'Deployed to mragentix.ai/client/austin-hvac' },
                      { type: 'cursor' },
                    ]}
                  />
                </TiltCard>
              </motion.div>
            </div>
          </AnimatedContent>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a href="#services" className="hero-scroll-cue" aria-label="Scroll to services">
        <span className="hero-scroll-cue__mouse">
          <span className="hero-scroll-cue__wheel" />
        </span>
        <span className="hero-scroll-cue__label">scroll</span>
      </a>
    </section>
  );
}
