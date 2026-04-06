import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QRON Genesis — 10 Bitcoin Ordinals | AI QR Art on Bitcoin',
  description: 'QRON Genesis: the first 10 AI-generated QR art pieces inscribed as Bitcoin Ordinals. Each piece is a functional QR code and a permanent Bitcoin digital artifact. Get yours before they sell out.',
  openGraph: {
    title: 'QRON Genesis — 10 Bitcoin Ordinals',
    description: '10 AI QR art pieces inscribed forever on Bitcoin. Scannable. Collectible. Transferable on Magic Eden.',
    url: 'https://qron.space/collection/genesis',
  }
}

const pieces = [
  { id: 1, name: 'Genesis #1 — Nebula', style: 'Cosmic Watercolor', status: 'available', desc: 'Deep space watercolor swirling around a functional QR anchor. First of the Genesis series.' },
  { id: 2, name: 'Genesis #2 — Circuit', style: 'Cyberpunk Grid', status: 'available', desc: 'Neon-lit circuit board aesthetic wrapping a scannable QR matrix.' },
  { id: 3, name: 'Genesis #3 — Bloom', style: 'Botanical Ink', status: 'available', desc: 'Ink-wash botanical illustration with the QR pattern woven through flowering stems.' },
  { id: 4, name: 'Genesis #4 — Forge', style: 'Industrial Brutalist', status: 'available', desc: 'Raw concrete and steel brutalist geometry encasing a precision QR grid.' },
  { id: 5, name: 'Genesis #5 — Tide', style: 'Ocean Wave', status: 'available', desc: 'Japanese woodblock-inspired wave crests flowing into a QR mosaic.' },
  { id: 6, name: 'Genesis #6 — Ember', style: 'Fire Abstract', status: 'available', desc: 'Smoldering ember tones and flame gradients surrounding a readable QR core.' },
  { id: 7, name: 'Genesis #7 — Mosaic', style: 'Byzantine Tile', status: 'available', desc: 'Byzantine tile patterns in gold and cobalt, QR modules embedded in the geometry.' },
  { id: 8, name: 'Genesis #8 — Glitch', style: 'Digital Artifact', status: 'available', desc: 'Intentional digital corruption aesthetic — glitch art framing a perfect QR.' },
  { id: 9, name: 'Genesis #9 — Terra', style: 'Topographic Map', status: 'available', desc: 'Contour map elevation lines forming the QR pattern across geological formations.' },
  { id: 10, name: 'Genesis #10 — Origin', style: 'Generative Abstract', status: 'reserved', desc: 'Pure generative art — the final Genesis piece. Reserved for the QRON treasury.' },
]

const traits = [
  { label: 'Collection size', value: '10 pieces' },
  { label: 'Blockchain', value: 'Bitcoin (Ordinals)' },
  { label: 'Storage', value: '100% on-chain' },
  { label: 'Scannability', value: 'Guaranteed' },
  { label: 'Royalties', value: '10% secondary' },
  { label: 'Marketplace', value: 'Magic Eden' },
]

export default function GenesisPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
        <a href="/" style={{ color: '#C9A227', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>QRON Space</a>
        <a href="https://buy.stripe.com/14A00jbjz9Ns5ia5fe1Nu1d" style={{ background: '#F7931A', color: '#000', padding: '8px 18px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
          ₿ Inscribe your own →
        </a>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '72px 0 56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(247,147,26,0.1)', border: '1px solid rgba(247,147,26,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>₿</span>
            <span style={{ color: '#F7931A', fontSize: 13, fontWeight: 700 }}>Bitcoin Ordinals · Genesis Collection</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem,6vw,4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: '#fff' }}>
            QRON Genesis
          </h1>
          <p style={{ fontSize: 18, color: '#888', maxWidth: 560, margin: '0 auto 16px', lineHeight: 1.6 }}>
            10 AI-generated QR art pieces inscribed forever on Bitcoin. Every piece is a scannable QR code and a permanent Bitcoin digital artifact.
          </p>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 36 }}>
            100% on-chain · ordinals.com verified · 10% secondary royalties · Magic Eden listed
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://buy.stripe.com/14A00jbjz9Ns5ia5fe1Nu1d" style={{ background: '#F7931A', color: '#000', padding: '14px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              ₿ Get your Genesis Ordinal — $49
            </a>
            <a href="https://buy.stripe.com/eVq9AT5Zff7MbGy8rq1Nu1f" style={{ border: '1px solid rgba(247,147,26,0.4)', color: '#F7931A', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              25-piece collection — $799
            </a>
          </div>
        </div>

        {/* Collection traits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 64 }}>
          {traits.map(t => (
            <div key={t.label} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
              <div style={{ color: '#F7931A', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t.value}</div>
              <div style={{ color: '#555', fontSize: 12 }}>{t.label}</div>
            </div>
          ))}
        </div>

        {/* Piece grid */}
        <h2 style={{ color: '#F7931A', fontWeight: 700, fontSize: '1.3rem', marginBottom: 24 }}>The 10 Genesis pieces</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20, marginBottom: 72 }}>
          {pieces.map(p => (
            <div key={p.id} style={{
              background: '#0f0c07',
              border: `1px solid ${p.status === 'reserved' ? '#333' : 'rgba(247,147,26,0.25)'}`,
              borderRadius: 14, overflow: 'hidden'
            }}>
              {/* QR Art */}
              <div style={{
                height: 200, background: '#1a1208',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid rgba(247,147,26,0.15)'
              }}>
                <svg viewBox="0 0 200 200" style={{ width: 140, height: 140, opacity: p.status === 'reserved' ? 0.3 : 0.85 }}>
                  {/* Finder patterns */}
                  <rect x="10" y="10" width="50" height="50" rx="4" fill="none" stroke="#F7931A" strokeWidth="4"/>
                  <rect x="18" y="18" width="34" height="34" rx="2" fill="none" stroke="#F7931A" strokeWidth="2" opacity="0.6"/>
                  <rect x="24" y="24" width="22" height="22" rx="2" fill="#F7931A" opacity="0.7"/>
                  <rect x="140" y="10" width="50" height="50" rx="4" fill="none" stroke="#F7931A" strokeWidth="4"/>
                  <rect x="148" y="18" width="34" height="34" rx="2" fill="none" stroke="#F7931A" strokeWidth="2" opacity="0.6"/>
                  <rect x="154" y="24" width="22" height="22" rx="2" fill="#F7931A" opacity="0.7"/>
                  <rect x="10" y="140" width="50" height="50" rx="4" fill="none" stroke="#F7931A" strokeWidth="4"/>
                  <rect x="18" y="148" width="34" height="34" rx="2" fill="none" stroke="#F7931A" strokeWidth="2" opacity="0.6"/>
                  <rect x="24" y="154" width="22" height="22" rx="2" fill="#F7931A" opacity="0.7"/>
                  {/* Unique data pattern per piece */}
                  {[75,90,105,120,135].map(x =>
                    [75,90,105,120,135].map(y =>
                      Math.sin((x + p.id * 17) * (y + p.id * 13) * 0.02) > -0.2
                        ? <rect key={`${x}-${y}`} x={x} y={y} width="10" height="10" rx="1.5" fill="#F7931A" opacity={0.4 + Math.abs(Math.sin(x * y * p.id * 0.005)) * 0.5}/>
                        : null
                    )
                  )}
                  {/* Side modules */}
                  <rect x="70" y="20" width="8" height="8" rx="1" fill="#F7931A" opacity="0.5"/>
                  <rect x="88" y="20" width="8" height="8" rx="1" fill="#F7931A" opacity="0.4"/>
                  <rect x="106" y="20" width="8" height="8" rx="1" fill="#F7931A" opacity="0.5"/>
                  <rect x="124" y="20" width="8" height="8" rx="1" fill="#F7931A" opacity="0.4"/>
                  <rect x="20" y="70" width="8" height="8" rx="1" fill="#F7931A" opacity="0.4"/>
                  <rect x="20" y="88" width="8" height="8" rx="1" fill="#F7931A" opacity="0.5"/>
                  <rect x="20" y="106" width="8" height="8" rx="1" fill="#F7931A" opacity="0.4"/>
                  <rect x="20" y="124" width="8" height="8" rx="1" fill="#F7931A" opacity="0.5"/>
                </svg>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: p.status === 'reserved' ? '#444' : '#e5e5e5' }}>{p.name}</div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                    background: p.status === 'reserved' ? '#1a1a1a' : 'rgba(247,147,26,0.15)',
                    color: p.status === 'reserved' ? '#444' : '#F7931A'
                  }}>
                    {p.status === 'reserved' ? 'Treasury' : 'Available'}
                  </span>
                </div>
                <div style={{ color: '#F7931A', fontSize: 11, marginBottom: 8, opacity: 0.7 }}>{p.style}</div>
                <div style={{ color: '#555', fontSize: 12, lineHeight: 1.5, marginBottom: p.status !== 'reserved' ? 14 : 0 }}>{p.desc}</div>
                {p.status !== 'reserved' && (
                  <a href="https://buy.stripe.com/14A00jbjz9Ns5ia5fe1Nu1d" style={{ display: 'block', textAlign: 'center', background: '#F7931A', color: '#000', padding: '9px', borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                    ₿ Inscribe — $49
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 16, padding: 40, marginBottom: 72 }}>
          <h2 style={{ color: '#F7931A', fontWeight: 700, fontSize: '1.3rem', marginBottom: 24, textAlign: 'center' }}>How inscription works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24 }}>
            {[
              { n: 1, t: 'Choose a Genesis piece', d: 'Pick your style and pay $49 via Stripe.' },
              { n: 2, t: 'AI generation', d: 'QRON generates your pixel-clamped QR art with guaranteed scannability.' },
              { n: 3, t: 'Bitcoin inscription', d: 'OrdinalsBot inscribes your piece on Bitcoin L1 (~30 min).' },
              { n: 4, t: 'You own it forever', d: 'Your Ordinal lives in your Bitcoin wallet. Transfer, sell, or hodl on Magic Eden.' },
            ].map(s => (
              <div key={s.n} style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(247,147,26,0.15)', border: '1px solid rgba(247,147,26,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#F7931A', fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: '#e5e5e5' }}>{s.t}</div>
                <div style={{ color: '#555', fontSize: 13, lineHeight: 1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Own collection CTA */}
        <div style={{ textAlign: 'center', background: 'rgba(247,147,26,0.05)', border: '1px solid rgba(247,147,26,0.2)', borderRadius: 16, padding: 48, marginBottom: 60 }}>
          <h2 style={{ color: '#F7931A', fontWeight: 700, fontSize: '1.5rem', marginBottom: 12 }}>Want your own branded collection?</h2>
          <p style={{ color: '#888', fontSize: 15, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6 }}>
            25-piece custom Ordinal collection with your brand&apos;s QR art, AuthiChain certificate, and Magic Eden listing — $799.
          </p>
          <a href="https://buy.stripe.com/eVq9AT5Zff7MbGy8rq1Nu1f" style={{ background: '#F7931A', color: '#000', padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block', marginRight: 12 }}>
            Get 25-piece collection — $799 →
          </a>
          <a href="mailto:authichain@gmail.com" style={{ color: '#F7931A', fontSize: 14, textDecoration: 'none' }}>or email us for custom volume</a>
        </div>

        <div style={{ textAlign: 'center', padding: '20px 0 40px', color: '#333', fontSize: 12, borderTop: '1px solid #1a1a1a' }}>
          <a href="/" style={{ color: '#555', textDecoration: 'none' }}>QRON Space</a> · AI QR art inscribed on Bitcoin · Part of the Authentic Economy
        </div>
      </div>
    </div>
  )
}
