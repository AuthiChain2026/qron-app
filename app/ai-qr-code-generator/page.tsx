import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI QR Code Generator — Free, Instant, No Signup | QRON',
  description: 'Generate beautiful AI-powered QR codes instantly — free, no account needed. 8 art styles including cosmic, cannabis, cyberpunk, and nature. Blockchain-verified. Try QRON.',
  keywords: 'ai qr code generator free, ai qr code art, qr code generator no signup, beautiful qr codes, custom qr code design, qr code art generator',
  openGraph: {
    title: 'AI QR Code Generator — Free & Instant | QRON',
    description: 'Turn any URL into stunning AI art QR codes. Free to try, no signup.',
    url: 'https://qron.space/ai-qr-code-generator',
    siteName: 'QRON',
    type: 'website',
  },
  alternates: { canonical: 'https://qron.space/ai-qr-code-generator' },
}

const STYLES = [
  { id: 'space',    label: 'Cosmic Space',    emoji: '🚀', desc: 'Deep space nebula, purple and gold' },
  { id: 'cannabis', label: 'Cannabis',         emoji: '🌿', desc: 'Premium botanical, emerald green' },
  { id: 'cyberpunk',label: 'Cyberpunk',        emoji: '⚡', desc: 'Neon grid, electric blue circuits' },
  { id: 'nature',   label: 'Nature',           emoji: '🍃', desc: 'Watercolor botanical, earthy tones' },
  { id: 'abstract', label: 'Abstract',         emoji: '◆',  desc: 'Geometric minimalist, gold and black' },
  { id: 'retro',    label: 'Retro',            emoji: '📻', desc: 'Vintage americana, warm sepia' },
]

const FAQS = [
  { q: 'Is the AI QR code generator really free?', a: 'Yes. You get 2 free AI QR generations per day with no signup required. For unlimited generations, sign up free for 10/month, or choose a paid plan.' },
  { q: 'Do AI-generated QR codes actually scan?', a: 'Every QRON code is tested for scannability before delivery. Our ControlNet AI model preserves the QR data structure while applying art styles, so every code is 100% scannable.' },
  { q: 'What makes QRON different from other QR generators?', a: 'QRON uses HuggingFace AI and Replicate diffusion models to generate art around your QR code — not just a frame or border. The result is a genuinely unique AI artwork that functions as a QR code.' },
  { q: 'Can I use QRON for my business?', a: 'Absolutely. Restaurants, cannabis brands, retail stores, and events use QRON QR codes on menus, packaging, signage, and business cards. Starting at $49 per design.' },
  { q: 'What formats do I get?', a: 'You receive a high-resolution PNG download. For commercial use, our Studio and Business plans include vector exports and brand color matching.' },
  { q: 'Is the QRON blockchain verification required?', a: 'No. Blockchain verification is optional. Your AI QR code works as a standard QR code. AuthiChain verification adds a tamper-evident authenticity layer for brands that need it.' },
]

export default function AIQRCodeGeneratorPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,.15)', border: '1px solid rgba(124,58,237,.3)', color: '#a78bfa', padding: '6px 18px', borderRadius: '100px', fontSize: '13px', marginBottom: '28px' }}>
          ✨ Free AI QR Code Generator — No Signup Required
        </div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', background: 'linear-gradient(135deg,#c9a227,#f0d060,#fff 65%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Turn Any URL Into<br />AI-Generated QR Art
        </h1>
        <p style={{ fontSize: '18px', color: '#888', maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.6 }}>
          QRON uses AI diffusion models to generate beautiful, scannable QR codes. 
          Free to try — 8 art styles — results in under 60 seconds.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
            Generate Free QR →
          </Link>
          <Link href="/demo" style={{ background: 'transparent', color: '#e5e5e5', padding: '14px 28px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600, fontSize: '16px' }}>
            See Examples
          </Link>
        </div>
        <p style={{ color: '#555', fontSize: '13px', marginTop: '16px' }}>No credit card · No account · 2 free generations daily</p>
      </section>

      {/* Style grid */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 60px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '32px' }}>8 AI Art Styles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '16px' }}>
          {STYLES.map(s => (
            <Link key={s.id} href={`/free-qr-generator?style=${s.id}`} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', textDecoration: 'none', color: '#e5e5e5', display: 'block', transition: 'border-color .2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '13px', color: '#666' }}>{s.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '60px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '40px' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '32px' }}>
            {[
              ['1', 'Enter Your URL', 'Any web address — your website, menu, product page, or social profile.'],
              ['2', 'Choose a Style', 'Pick from 8 AI art styles: space, cyberpunk, nature, cannabis, abstract, and more.'],
              ['3', 'Generate', 'AI creates a unique scannable artwork. Takes 20–60 seconds.'],
              ['4', 'Download & Use', 'Get a high-resolution PNG ready for print, packaging, or digital use.'],
            ].map(([num, title, desc]) => (
              <div key={num}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 12px', fontSize: '16px' }}>{num}</div>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px' }}>
            <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
              Try It Free →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — important for SEO */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', color: '#e5e5e5' }}>{faq.q}</div>
              <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', padding: '60px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, marginBottom: '14px' }}>Ready to create yours?</h2>
        <p style={{ color: '#888', marginBottom: '28px' }}>Join thousands of brands using QRON AI QR codes on packaging, menus, and signage.</p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Generate Free →</Link>
          <Link href="/pricing" style={{ background: 'transparent', color: '#e5e5e5', padding: '14px 28px', borderRadius: '10px', border: '1px solid #333', textDecoration: 'none', fontWeight: 600 }}>See Pricing</Link>
        </div>
      </section>

    </div>
  )
}
