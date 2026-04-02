import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI QR Codes Work — ControlNet Technology Explained | QRON',
  description: 'AI QR codes use ControlNet diffusion models to wrap art around QR structure. Learn exactly how they work and why they scan reliably.',
  openGraph: { title: 'How AI QR Codes Work', description: 'ControlNet technology explained.', url: 'https://qron.space/blog/how-ai-qr-codes-work', type: 'article' },
  alternates: { canonical: 'https://qron.space/blog/how-ai-qr-codes-work' },
}

const S = {
  page: { background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' } as const,
  article: { maxWidth: '760px', margin: '0 auto', padding: '80px 24px 80px' } as const,
  back: { color: '#7c3aed', textDecoration: 'none', fontSize: '13px', fontWeight: 600 } as const,
  h1: { fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, margin: '24px 0 16px', lineHeight: 1.2 } as const,
  meta: { color: '#555', fontSize: '13px', marginBottom: '32px' } as const,
  lead: { fontSize: '17px', lineHeight: 1.8, color: '#ccc', marginBottom: '24px' } as const,
  h2: { fontSize: '1.4rem', fontWeight: 800, margin: '36px 0 14px' } as const,
  p: { lineHeight: 1.8, color: '#aaa', marginBottom: '20px' } as const,
  cta: { marginTop: '56px', background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '32px', textAlign: 'center' as const },
  ctaTitle: { fontWeight: 800, fontSize: '20px', marginBottom: '10px' } as const,
  ctaSub: { color: '#888', marginBottom: '20px' } as const,
  btn: { background: '#7c3aed', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 } as const,
}

export default function Post() {
  return (
    <div style={S.page}>
      <article style={S.article}>
        <Link href="/blog" style={S.back}>← Blog</Link>
        <h1 style={S.h1}>How AI QR Codes Work — The Technology Behind Beautiful, Scannable Art</h1>
        <div style={S.meta}>April 2, 2026 · 5 min read · Technology</div>
        <p style={S.lead}>Standard QR codes are ugly. They work, but nobody scans them voluntarily. AI QR codes change that. Here is exactly how the technology works.</p>
        <h2 style={S.h2}>The Problem with Standard QR Codes</h2>
        <p style={S.p}>A standard QR code is a grid of black and white squares encoding data with Reed-Solomon error correction, meaning a small percentage of the pattern can be obscured and the code will still scan. That tolerance for damage is exactly what AI QR art exploits.</p>
        <h2 style={S.h2}>How ControlNet Makes AI QR Art Possible</h2>
        <p style={S.p}>QRON uses ControlNet diffusion models trained for QR code preservation. ControlNet extends Stable Diffusion by accepting a control image as a structural guide. When generating AI QR art, the control image is the QR code pattern itself — the AI generates artwork matching the style prompt while conforming to the QR data structure.</p>
        <p style={S.p}>The conditioning scale parameter, set between 1.2 and 1.8, controls the tradeoff. Higher values preserve more QR structure (better scan reliability). Lower values produce more artistic output. QRON tunes this automatically per style.</p>
        <h2 style={S.h2}>Why They Still Scan Reliably</h2>
        <p style={S.p}>QR codes have built-in error correction at four levels: L (7%), M (15%), Q (25%), and H (30%). QRON generates codes at level H, meaning 30% of the pattern can be visually altered while maintaining scan integrity. The AI operates within this tolerance — artistic texture and color are applied while the underlying dark/light module pattern remains intact enough for any phone camera to decode.</p>
        <h2 style={S.h2}>The Generation Process</h2>
        <p style={S.p}>When you generate a QRON: 1) Your URL is encoded into a QR matrix at error correction level H. 2) The QR image is passed to the ControlNet model as the control signal. 3) A style prompt guides the artistic output. 4) The diffusion model generates over 20-25 steps with ControlNet forcing structural conformance. 5) The result is stored permanently in Cloudflare R2 and returned as a scannable PNG.</p>
        <p style={S.p}>Generation takes 20-90 seconds depending on the provider. QRON uses HuggingFace Spaces as the primary provider with Replicate as an automatic fallback for guaranteed uptime.</p>
        <div style={S.cta}>
          <div style={S.ctaTitle}>Ready to create your own AI QR code?</div>
          <p style={S.ctaSub}>Free to try — no signup needed.</p>
          <Link href="/free-qr-generator" style={S.btn}>Generate Free AI QR →</Link>
        </div>
      </article>
    </div>
  )
}
