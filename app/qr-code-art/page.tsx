import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QR Code Art Generator — AI-Powered Artistic QR Codes | QRON',
  description: 'Generate artistic QR codes powered by AI diffusion models. Space, cyberpunk, nature, abstract styles. Scannable and beautiful. Free to try.',
  openGraph: { title: 'QR Code Art Generator — AI-Powered Artistic QR Codes | QRON', description: 'Generate artistic QR codes powered by AI diffusion models. Space, cyberpunk, nature, abstract styles. Scannable and beautiful. Free to try.', url: 'https://qron.space/qr-code-art', type: 'website' },
  alternates: { canonical: 'https://qron.space/qr-code-art' },
}

export default function Page() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AI-Powered QR Code Art Generator
        </h1>
        <p style={{ fontSize: '17px', color: '#888', maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Create QR codes that are works of art. Powered by HuggingFace and Replicate diffusion models. Every code is unique, scannable, and beautiful.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '13px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Try Free →</Link>
          <Link href="/pricing" style={{ background: 'transparent', color: '#e5e5e5', padding: '13px 26px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>See Pricing</Link>
        </div>
        <p style={{ color: '#555', fontSize: '12px', marginTop: '14px' }}>No signup required · $49/design for commercial use</p>
      </section>
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>How does AI generate QR code art?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>QRON uses ControlNet diffusion models that understand QR code structure. The AI applies artistic styles while preserving the data pattern, so every code is genuinely scannable.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Is QR code art readable by all phone cameras?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. We test every generated code for scannability. The dark/light module contrast is maintained even with artistic styling.</div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px' }}>Can I request a custom art style?</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>Yes. On Creator and Studio plans you can submit a custom prompt to guide the AI generation. Common requests include brand colors, specific textures, and thematic elements.</div>
            </div>
        </div>
      </section>
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '48px 24px', textAlign: 'center' }}>
        <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
          Generate Your AI QR Code →
        </Link>
      </section>
    </div>
  )
}
