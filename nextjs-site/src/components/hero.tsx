'use client';

import dynamic from 'next/dynamic';
import DecryptedText from '@/components/ui/decrypted-text';
import BlurText from '@/components/ui/blur-text';
import StarBorder from '@/components/ui/star-border';
import AnimatedContent from '@/components/ui/animated-content';
import Terminal from '@/components/terminal';

const Aurora = dynamic(() => import('@/components/ui/aurora'), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Aurora
          colorStops={['#00e5a0', '#0d1117', '#00e5a0']}
          amplitude={1.2}
          blend={0.6}
          speed={0.5}
        />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <DecryptedText
                text="We Build the Agents That Do the Work."
                animateOn="view"
                sequential
                speed={30}
                revealDirection="start"
                className="text-[var(--text-primary)]"
                encryptedClassName="text-[var(--accent)]"
              />
            </h1>

            <BlurText
              text="AI automation, agentic workflows, and intelligent web systems for businesses ready to scale without adding headcount."
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl"
              delay={100}
              animateBy="words"
            />

            <AnimatedContent delay={0.3}>
              <div className="flex flex-wrap gap-4 pt-2">
                <StarBorder
                  as="a"
                  href="#contact"
                  color="#00e5a0"
                  speed="6s"
                  className="!rounded-lg"
                >
                  <span className="px-4 py-2 font-semibold">
                    Book a Free Discovery Call →
                  </span>
                </StarBorder>
                <a href="#services" className="btn btn--ghost">
                  See What We Build
                </a>
              </div>
            </AnimatedContent>

            <AnimatedContent delay={0.4}>
              <p className="text-xs text-[var(--text-muted)]">
                Free discovery call — no pitch deck
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.5}>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-1 text-lg" aria-hidden="true">
                  <span>🏢</span>
                  <span>🏗️</span>
                  <span>🏥</span>
                  <span>🍽️</span>
                </div>
                <span className="text-sm text-[var(--text-secondary)]">
                  Trusted by businesses across 12 industries
                </span>
              </div>
            </AnimatedContent>
          </div>

          {/* Terminal */}
          <AnimatedContent delay={0.2} distance={30}>
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
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
