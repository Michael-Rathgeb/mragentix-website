import { ImageResponse } from 'next/og';

export const alt = 'MR Agentix — AI Automation & Agentic Workflows';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'radial-gradient(circle at 78% 30%, rgba(0,229,160,0.22), transparent 55%), #0d1117',
          color: '#e6edf3',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'rgba(0,229,160,0.12)',
              border: '1px solid rgba(0,229,160,0.4)',
              fontSize: 30,
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: 26, color: '#00e5a0', letterSpacing: 2 }}>MR AGENTIX</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            We build the agents that do the work.
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#8b949e', maxWidth: 880 }}>
            AI automation, agentic workflows & intelligent web systems.
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {['AI Agents', 'Automation', 'Websites', 'SEO / AEO', 'SMS & Leads'].map((t) => (
              <div
                key={t}
                style={{
                  display: 'flex',
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: 8,
                  background: 'rgba(0,229,160,0.1)',
                  border: '1px solid rgba(0,229,160,0.3)',
                  color: '#00e5a0',
                  fontSize: 22,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#6e7681' }}>
          <div style={{ display: 'flex' }}>mragentix.ai</div>
          <div style={{ display: 'flex' }}>St. Louis → Nationwide</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
