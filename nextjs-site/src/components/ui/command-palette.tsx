'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

const ICON = {
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  copy: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  ),
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386C24 5.373 18.627 0 12 0z"/></svg>
  ),
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>
  ),
};

const SECTIONS = [
  ['services', 'Services'],
  ['automation', 'Live automation demo'],
  ['how-it-works', 'Process'],
  ['stack', 'Stack'],
  ['projects', 'Projects'],
  ['open-source', 'Open source'],
  ['results', 'Results'],
  ['contact', 'Contact / book a call'],
] as const;

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const goto = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const commands = useMemo<Cmd[]>(() => {
    const nav: Cmd[] = SECTIONS.map(([id, label]) => ({
      id,
      label,
      hint: 'jump',
      icon: ICON.arrow,
      run: () => goto(id),
    }));
    return [
      ...nav,
      {
        id: 'book',
        label: 'Book a free discovery call',
        icon: ICON.bolt,
        run: () => goto('contact'),
      },
      {
        id: 'copy-install',
        label: 'Copy install command',
        hint: 'npm i -g @mragentix/cli',
        icon: ICON.copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText('npm i -g @mragentix/cli');
          } catch {
            /* clipboard unavailable */
          }
        },
      },
      {
        id: 'github',
        label: 'Open MR Agentix on GitHub',
        icon: ICON.github,
        run: () => window.open('https://github.com/Michael-Rathgeb/MRagentix-framework', '_blank', 'noopener'),
      },
      {
        id: 'npm',
        label: 'Open @mragentix/cli on npm',
        icon: ICON.arrow,
        run: () => window.open('https://www.npmjs.com/package/@mragentix/cli', '_blank', 'noopener'),
      },
    ];
  }, [goto]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(term) || c.id.includes(term));
  }, [q, commands]);

  // toggle with Cmd/Ctrl+K (opening resets state + focuses), Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (openRef.current) {
          setOpen(false);
        } else {
          setQ('');
          setActive(0);
          setOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const runActive = useCallback(() => {
    const cmd = filtered[active];
    if (!cmd) return;
    setOpen(false);
    cmd.run();
  }, [filtered, active]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runActive();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="k-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="k-panel"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Command palette"
          >
            <input
              ref={inputRef}
              className="k-input"
              placeholder="Type a command or search…"
              value={q}
              onChange={(e) => { setQ(e.target.value); setActive(0); }}
              onKeyDown={onListKey}
            />
            <div ref={listRef} style={{ maxHeight: 320, overflowY: 'auto', padding: '0.4rem 0' }}>
              {filtered.length === 0 && (
                <div style={{ padding: '1rem 1.1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No matches.
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  className={`k-item ${i === active ? 'k-item--active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    setOpen(false);
                    cmd.run();
                  }}
                >
                  <span className="k-item__icon">{cmd.icon}</span>
                  <span>{cmd.label}</span>
                  {cmd.hint && <span className="k-item__hint">{cmd.hint}</span>}
                </button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                padding: '0.55rem 1.1rem',
                borderTop: '1px solid var(--border)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
