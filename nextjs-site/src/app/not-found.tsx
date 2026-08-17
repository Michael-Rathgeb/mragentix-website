import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-[var(--font-mono)] text-sm text-[var(--accent)] mb-4">{'// 404 · route_not_found'}</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">This page</span> took the day off.
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          It probably got automated. Let’s get you back to something useful.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn btn--primary">Back home →</Link>
          <Link href="/#contact" className="btn btn--ghost">Book a call</Link>
        </div>
      </div>
    </main>
  );
}
