export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--bg-base)' }}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] animate-spin"
          style={{ boxShadow: '0 0 18px rgba(0,229,160,0.4)' }}
        />
        <span className="font-[var(--font-mono)] text-xs text-[var(--text-muted)] uppercase tracking-[0.2em]">
          booting agents…
        </span>
      </div>
    </div>
  );
}
