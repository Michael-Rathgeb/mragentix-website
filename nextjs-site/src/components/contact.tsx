'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedContent from '@/components/ui/animated-content';

/* ─── Data ────────────────────────────────────────── */

interface ServiceOption {
  id: string;
  emoji: string;
  label: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'ai-agents', emoji: '🤖', label: 'AI Agents & Automation' },
  { id: 'website', emoji: '🌐', label: 'Website Design / Redesign' },
  { id: 'sms-leads', emoji: '📱', label: 'SMS & Lead Automation' },
  { id: 'seo-aeo', emoji: '🔍', label: 'SEO / AEO' },
  { id: 'local-seo', emoji: '📍', label: 'Local SEO' },
  { id: 'custom-software', emoji: '🛠️', label: 'Custom Software' },
  { id: 'other', emoji: '💡', label: 'Something Else' },
];

const TOOL_OPTIONS = [
  'GoHighLevel', 'HubSpot', 'Twilio', 'Calendly',
  'Zapier', 'n8n', 'Slack', 'Salesforce', 'Custom / Other',
];

const AGENT_TASKS = [
  'Lead Qualification', 'Content Generation', 'Research & Analysis',
  'Data Processing', 'Customer Support', 'Scheduling / Booking', 'Other',
];

const SEO_MARKETS = ['Local', 'National', 'Both'];

const TOTAL_STEPS = 4;

/* ─── Slide animation variants ─────────────────────── */

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    filter: 'blur(4px)',
  }),
};

/* ─── Terminal Success ─────────────────────────────── */

function SuccessTerminal() {
  const lines = [
    { delay: 0, prompt: '$', text: 'mragentix intake --new-lead', color: 'var(--text-primary)' },
    { delay: 0.5, prompt: '✓', text: 'Lead received...', color: '' },
    { delay: 1.0, prompt: '✓', text: 'Qualifying request...', color: '' },
    { delay: 1.5, prompt: '✓', text: 'Routing to team...', color: '' },
    { delay: 2.0, prompt: '✓', text: 'Scheduling discovery call...', color: '' },
    { delay: 2.5, prompt: '→', text: 'You\'ll hear from us within 24 hours.', color: '#58a6ff' },
  ];

  return (
    <div className="terminal max-w-lg mx-auto">
      <div className="terminal__chrome">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">mragentix-intake</span>
      </div>
      <div className="terminal__body">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="terminal__line"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: line.delay, duration: 0.35 }}
          >
            <span className={line.prompt === '$' ? 'terminal__prompt' : line.prompt === '→' ? 'terminal__arrow' : 'terminal__check'}>
              {line.prompt}
            </span>
            <span className="terminal__text" style={line.color ? { color: line.color } : undefined}>
              {line.text}
            </span>
          </motion.div>
        ))}
        <motion.div
          className="terminal__line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
        >
          <span className="terminal__prompt">$</span>
          <span className="terminal__cursor">_</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Chip Selector ────────────────────────────────── */

function ChipSelect({
  options,
  selected,
  onToggle,
  multi = true,
}: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  multi?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
              isActive
                ? 'bg-[var(--accent-glow)] border-[var(--accent)] text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]'
                : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {opt}
            {isActive && multi && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block ml-1.5 text-xs"
              >
                ✕
              </motion.span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Progress Bar ─────────────────────────────────── */

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-[var(--text-muted)]">
          Step {step + 1} of {total}
        </span>
        <span className="text-xs font-mono text-[var(--accent)]">{Math.round(pct)}%</span>
      </div>
      <div className="h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--accent)] rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────── */

interface FormData {
  services: string[];
  websiteUrl: string;
  tools: string[];
  agentTasks: string[];
  seoMarket: string;
  seoUrl: string;
  customDesc: string;
  otherDesc: string;
  name: string;
  email: string;
  phone: string;
}

export default function Contact() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    services: [],
    websiteUrl: '',
    tools: [],
    agentTasks: [],
    seoMarket: '',
    seoUrl: '',
    customDesc: '',
    otherDesc: '',
    name: '',
    email: '',
    phone: '',
  });

  /* helpers */
  const toggleService = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }, []);

  const toggleInList = useCallback((key: keyof FormData, val: string) => {
    setFormData((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
      };
    });
  }, []);

  const updateField = useCallback((key: keyof FormData, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && step < TOTAL_STEPS - 1) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'TEXTAREA') return;
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, goNext]);

  /* submit */
  const handleSubmit = async () => {
    setStatus('sending');
    const payload = {
      services: formData.services,
      websiteUrl: formData.websiteUrl,
      tools: formData.tools,
      agentTasks: formData.agentTasks,
      seoMarket: formData.seoMarket,
      seoUrl: formData.seoUrl,
      customDesc: formData.customDesc,
      otherDesc: formData.otherDesc,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      // TODO: Replace with your real webhook URL
      const webhookUrl = 'https://your-webhook-url.example.com/webhook';
      const isPlaceholder = webhookUrl.includes('example.com');

      if (isPlaceholder) {
        // Dev mode: simulate a successful send so you can preview the success animation
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
        return;
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus('error');
    }
  };

  /* derived */
  const hasService = (id: string) => formData.services.includes(id);
  const needsFollowUp =
    hasService('website') ||
    hasService('sms-leads') ||
    hasService('ai-agents') ||
    hasService('seo-aeo') ||
    hasService('local-seo') ||
    hasService('custom-software') ||
    hasService('other');

  const canProceedStep0 = formData.services.length > 0;
  const canProceedStep2 = formData.name.trim() !== '' && formData.email.trim() !== '';

  /* ─── Render Steps ─────────────────────────────────── */

  const renderStep = () => {
    switch (step) {
      /* ── Step 0: What do you need? ── */
      case 0:
        return (
          <motion.div
            key="step-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              What can we help you with?
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Select all that apply — we&apos;ll tailor the next questions.
            </p>
            <div className="flex flex-wrap gap-3">
              {SERVICE_OPTIONS.map((svc) => {
                const isActive = formData.services.includes(svc.id);
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => toggleService(svc.id)}
                    className={`group flex items-center gap-2.5 px-5 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--accent-glow)] border-[var(--accent)] text-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]'
                        : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="text-lg">{svc.emoji}</span>
                    {svc.label}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="ml-1 text-xs"
                      >
                        ✓
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      /* ── Step 1: Dynamic follow-ups ── */
      case 1:
        return (
          <motion.div
            key="step-1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Tell us a bit more
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Based on your selections, a few quick follow-ups.
              </p>
            </div>

            {/* Website */}
            {hasService('website') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  🌐 What&apos;s your current website URL?
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => updateField('websiteUrl', e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </motion.div>
            )}

            {/* SMS & Lead Automation → Tools */}
            {hasService('sms-leads') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                  📱 What tools are you currently using?
                </label>
                <ChipSelect
                  options={TOOL_OPTIONS}
                  selected={formData.tools}
                  onToggle={(val) => toggleInList('tools', val)}
                />
              </motion.div>
            )}

            {/* AI Agents → Tasks */}
            {hasService('ai-agents') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                  🤖 What should the agent handle?
                </label>
                <ChipSelect
                  options={AGENT_TASKS}
                  selected={formData.agentTasks}
                  onToggle={(val) => toggleInList('agentTasks', val)}
                />
              </motion.div>
            )}

            {/* SEO / AEO */}
            {(hasService('seo-aeo') || hasService('local-seo')) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                    🔍 What&apos;s your target market?
                  </label>
                  <ChipSelect
                    options={SEO_MARKETS}
                    selected={formData.seoMarket ? [formData.seoMarket] : []}
                    onToggle={(val) => updateField('seoMarket', formData.seoMarket === val ? '' : val)}
                    multi={false}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Website URL (if you have one)
                  </label>
                  <input
                    type="url"
                    value={formData.seoUrl}
                    onChange={(e) => updateField('seoUrl', e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Custom Software */}
            {hasService('custom-software') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  🛠️ Describe what you need built
                </label>
                <textarea
                  value={formData.customDesc}
                  onChange={(e) => updateField('customDesc', e.target.value)}
                  rows={3}
                  placeholder="Internal dashboard, API integration, mobile app..."
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                />
              </motion.div>
            )}

            {/* Something Else */}
            {hasService('other') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  💡 Tell us what you have in mind
                </label>
                <textarea
                  value={formData.otherDesc}
                  onChange={(e) => updateField('otherDesc', e.target.value)}
                  rows={3}
                  placeholder="We're open to anything — surprise us..."
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                />
              </motion.div>
            )}

            {/* If nothing needs follow-up, show a brief message */}
            {!needsFollowUp && (
              <p className="text-sm text-[var(--text-muted)]">
                No additional details needed — let&apos;s get your info!
              </p>
            )}
          </motion.div>
        );

      /* ── Step 2: Contact info ── */
      case 2:
        return (
          <motion.div
            key="step-2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Almost there — how do we reach you?
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              We&apos;ll reach out within 1 business day. No spam, ever.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                  Phone <span className="text-[var(--text-muted)]">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  autoComplete="tel"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>
        );

      /* ── Step 3: Review & Submit ── */
      case 3:
        return (
          <motion.div
            key="step-3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Review & send
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Here&apos;s a summary of what you told us. Hit send when it looks good.
            </p>

            <div className="space-y-4 mb-6">
              {/* Services */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                <span className="text-xs font-mono text-[var(--accent)] block mb-2">Services</span>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((id) => {
                    const svc = SERVICE_OPTIONS.find((s) => s.id === id);
                    return svc ? (
                      <span key={id} className="tag">
                        {svc.emoji} {svc.label}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Dynamic details */}
              {(formData.websiteUrl || formData.tools.length > 0 || formData.agentTasks.length > 0 || formData.seoMarket || formData.seoUrl || formData.customDesc || formData.otherDesc) && (
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4 space-y-3">
                  <span className="text-xs font-mono text-[var(--accent)] block">Details</span>
                  {formData.websiteUrl && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">Website:</span> {formData.websiteUrl}
                    </p>
                  )}
                  {formData.tools.length > 0 && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">Tools:</span> {formData.tools.join(', ')}
                    </p>
                  )}
                  {formData.agentTasks.length > 0 && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">Agent tasks:</span> {formData.agentTasks.join(', ')}
                    </p>
                  )}
                  {formData.seoMarket && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">Market:</span> {formData.seoMarket}
                    </p>
                  )}
                  {formData.seoUrl && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">SEO URL:</span> {formData.seoUrl}
                    </p>
                  )}
                  {formData.customDesc && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">Custom build:</span> {formData.customDesc}
                    </p>
                  )}
                  {formData.otherDesc && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-[var(--text-muted)]">Other:</span> {formData.otherDesc}
                    </p>
                  )}
                </div>
              )}

              {/* Contact */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
                <span className="text-xs font-mono text-[var(--accent)] block mb-2">Contact</span>
                <p className="text-sm text-[var(--text-primary)]">{formData.name}</p>
                <p className="text-sm text-[var(--text-secondary)]">{formData.email}</p>
                {formData.phone && (
                  <p className="text-sm text-[var(--text-secondary)]">{formData.phone}</p>
                )}
              </div>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-400 mb-4" role="alert">
                Something went wrong. Email us directly at{' '}
                <a href="mailto:hello@mragentix.ai" className="underline">hello@mragentix.ai</a>
              </p>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  /* ─── Success state ─────────────────────────────── */

  if (status === 'success') {
    return (
      <section id="contact" className="py-[var(--section-pad)]">
        <div className="container">
          <AnimatedContent>
            <span className="section-label">// message received</span>
          </AnimatedContent>
          <AnimatedContent delay={0.1}>
            <h2 className="section-title">We&apos;re On It.</h2>
          </AnimatedContent>
          <AnimatedContent delay={0.2}>
            <SuccessTerminal />
          </AnimatedContent>
          <AnimatedContent delay={0.4}>
            <div className="text-center mt-8">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                We&apos;ll be in touch within 24 hours. In the meantime —
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#projects" className="btn btn--ghost btn--sm">
                  See Our Work
                </a>
                <a href="#open-source" className="btn btn--ghost btn--sm">
                  Explore Open Source
                </a>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    );
  }

  /* ─── Main form ─────────────────────────────────── */

  return (
    <section id="contact" className="py-[var(--section-pad)]">
      <div className="container">
        <AnimatedContent>
          <span className="section-label">// let&apos;s talk</span>
        </AnimatedContent>
        <AnimatedContent delay={0.1}>
          <h2 className="section-title">Stop Doing Manually What AI Can Handle</h2>
        </AnimatedContent>
        <AnimatedContent delay={0.15}>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 -mt-4">
            Every hour your team spends on repetitive tasks is an hour lost to growth.
            Tell us what needs automating — we&apos;ll show you how to get it done in weeks, not months.
          </p>
        </AnimatedContent>

        <AnimatedContent delay={0.2}>
          <div className="grid lg:grid-cols-5 gap-8" ref={formRef}>
            {/* Interactive form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 md:p-8">
                <ProgressBar step={step} total={TOTAL_STEPS} />

                <div className="min-h-[320px] relative">
                  <AnimatePresence mode="wait" custom={direction}>
                    {renderStep()}
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={goBack}
                    className={`text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ${
                      step === 0 ? 'invisible' : ''
                    }`}
                  >
                    ← Back
                  </button>

                  <div className="flex items-center gap-3">
                    {/* Step dots */}
                    <div className="flex gap-1.5 mr-4">
                      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === step
                              ? 'bg-[var(--accent)] scale-125'
                              : i < step
                                ? 'bg-[var(--accent)] opacity-40'
                                : 'bg-[var(--border)]'
                          }`}
                        />
                      ))}
                    </div>

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={step === 0 && !canProceedStep0}
                        className="btn btn--primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                      >
                        Continue →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canProceedStep2 || status === 'sending'}
                        className="btn btn--primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                      >
                        {status === 'sending' ? (
                          <span className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block w-4 h-4 border-2 border-[var(--bg-base)] border-t-transparent rounded-full"
                            />
                            Sending...
                          </span>
                        ) : (
                          'Send Message →'
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Keyboard hint */}
                <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] font-mono text-[10px]">Enter</kbd> to continue
                </p>
              </div>
            </div>

            {/* Info card */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Get in Touch</h3>
                <a
                  href="mailto:hello@mragentix.ai"
                  className="text-[var(--accent)] font-mono text-sm hover:underline block mb-3"
                >
                  hello@mragentix.ai
                </a>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Response within 1 business day.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-6">
                  Based in St. Louis, MO. Working with clients nationwide.
                </p>

                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                  What happens next?
                </h4>
                <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-2">
                    <span className="text-[var(--accent)] font-mono font-bold flex-shrink-0">1.</span>
                    We review your message within 24 hours
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--accent)] font-mono font-bold flex-shrink-0">2.</span>
                    30-minute discovery call — no pitch deck
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--accent)] font-mono font-bold flex-shrink-0">3.</span>
                    We send a custom proposal within 48 hours
                  </li>
                </ol>

                {/* Live preview of selections */}
                {formData.services.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[var(--border)]">
                    <span className="text-xs font-mono text-[var(--accent)] block mb-2">Your selections</span>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.services.map((id) => {
                        const svc = SERVICE_OPTIONS.find((s) => s.id === id);
                        return svc ? (
                          <motion.span
                            key={id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="tag"
                          >
                            {svc.emoji} {svc.label}
                          </motion.span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
