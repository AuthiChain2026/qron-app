import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI QR Codes Work — ControlNet Technology Explained | QRON',
  description: 'AI QR codes use ControlNet diffusion models to wrap art around QR structure. Learn exactly how they work and why they scan reliably.',
  openGraph: { title: 'How AI QR Codes Work — ControlNet Technology Explained | QRON', description: 'AI QR codes use ControlNet diffusion models to wrap art around QR structure. Learn exactly how they work and why they scan reliably.', url: 'https://qron.space/blog/how-ai-qr-codes-work', type: 'article' },
  alternates: { canonical: 'https://qron.space/blog/how-ai-qr-codes-work' },
}

export default function Post() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <article style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 24px 80px' }}>
        <Link href="/blog" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>← Blog</Link>
        
        <h1 style={{{{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, margin: '24px 0 16px', lineHeight: 1.2 }}}}>How AI QR Codes Work — The Technology Behind Beautiful, Scannable Art</h1>
        <div style={{{{ color: '#555', fontSize: '13px', marginBottom: '32px' }}}}>April 2, 2026 · 5 min read · Technology</div>
        <p style={{{{ fontSize: '17px', lineHeight: 1.8, color: '#ccc', marginBottom: '24px' }}}}>Standard QR codes are ugly. They work, but nobody scans them voluntarily — they only scan when they have to. AI QR codes change that. Here's exactly how the technology works.</p>
        <h2 style={{{{ fontSize: '1.4rem', fontWeight: 800, margin: '36px 0 14px' }}}}>The Problem with Standard QR Codes</h2>
        <p style={{{{ lineHeight: 1.8, color: '#aaa', marginBottom: '20px' }}}}>A standard QR code is a grid of black and white squares. The pattern encodes data using Reed-Solomon error correction, which means a small percentage of the pattern can be damaged or obscured and the code will still scan. That "tolerance for damage" is exactly what AI QR art exploits.</p>
        <h2 style={{{{ fontSize: '1.4rem', fontWeight: 800, margin: '36px 0 14px' }}}}>How ControlNet Makes AI QR Art Possible</h2>
        <p style={{{{ lineHeight: 1.8, color: '#aaa', marginBottom: '20px' }}}}>QRON uses ControlNet diffusion models — specifically models trained for QR code preservation. ControlNet is an extension of Stable Diffusion that accepts a "control image" as a structural guide. When generating AI QR art, the control image is the QR code pattern itself. The AI generates artwork that matches the prompt while conforming to the structural constraints of the QR data.</p>
        <p style={{{{ lineHeight: 1.8, color: '#aaa', marginBottom: '20px' }}}}>The key is the "conditioning scale" parameter — typically set between 1.2 and 1.8. Higher values preserve more QR structure (better scan reliability). Lower values produce more artistic output (higher visual appeal). QRON tunes this automatically based on the selected style.</p>
        <h2 style={{{{ fontSize: '1.4rem', fontWeight: 800, margin: '36px 0 14px' }}}}>Why They Still Scan Reliably</h2>
        <p style={{{{ lineHeight: 1.8, color: '#aaa', marginBottom: '20px' }}}}>QR codes have built-in error correction at four levels: L (7%), M (15%), Q (25%), and H (30%). QRON generates codes at the H level, meaning 30% of the pattern can be visually altered while maintaining scan integrity. The AI is constrained to operate within this tolerance — it can add artistic texture and color, but the underlying dark/light module pattern remains intact enough for any phone camera to decode.</p>
        <h2 style={{{{ fontSize: '1.4rem', fontWeight: 800, margin: '36px 0 14px' }}}}>The Generation Process</h2>
        <p style={{{{ lineHeight: 1.8, color: '#aaa', marginBottom: '20px' }}}}>When you generate a QRON: 1) Your URL is encoded into a QR matrix at error correction level H. 2) The QR image is passed to the ControlNet model as the control signal. 3) A text prompt (cosmic galaxy, cannabis botanical, cyberpunk, etc.) guides the artistic style. 4) The diffusion model generates an image over 20-25 steps, with the ControlNet forcing structural conformance to the QR pattern. 5) The output is stored permanently in Cloudflare R2 and returned as a scannable PNG.</p>
        <p style={{{{ lineHeight: 1.8, color: '#aaa', marginBottom: '20px' }}}}>The full process takes 20-90 seconds depending on the generation provider. QRON uses HuggingFace Spaces as the primary provider with Replicate as an automatic fallback, ensuring uptime even during GPU shortages.</p>

        <div style={{ marginTop: '56px', background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: '20px', marginBottom: '10px' }}>Ready to create your own AI QR code?</div>
          <p style={{ color: '#888', marginBottom: '20px' }}>Free to try — no signup needed.</p>
          <Link href="/free-qr-generator" style={{ background: '#7c3aed', color: '#fff', padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Generate Free AI QR →</Link>
        </div>
      </article>
    </div>
  )
}
