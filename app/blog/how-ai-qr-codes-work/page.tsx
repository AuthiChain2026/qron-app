import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI QR Code Art Works — ControlNet Explained | QRON',
  description: 'How AI-generated QR codes are made using ControlNet diffusion. Why they actually scan, what makes them different, and how to order one.',
  alternates: { canonical: 'https://qron.space/blog/how-ai-qr-codes-work' },
}

export default function BlogAIQRPage() {
  const gold = '#c9a227'
  return (
    <article style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '64px 24px 80px' }}>
        <Link href="/blog" style={{ color: '#555', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '32px' }}>← Blog</Link>
        <div style={{ fontSize: '11px', color: gold, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '16px' }}>HOW IT WORKS</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          How AI QR Code Art Works — and Why It Actually Scans
        </h1>
        <p style={{ color: '#888', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px' }}>
          Standard QR codes have a 10-12% voluntary scan rate. AI art versions average 40%+. Here is the technology behind the difference.
        </p>

        <img src="/media/portfolio-qron-3.svg"
          alt="AI generated QR code art — cosmic space style"
          style={{ width: '100%', maxWidth: '380px', borderRadius: '12px', marginBottom: '40px', display: 'block' }} />

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>The Problem with Standard QR Codes</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          A QR code is a matrix of black and white modules encoding a URL. Every module matters. That constraint made QR codes ugly for 30 years — people do not scan them because there is nothing visually interesting about a black-and-white square.
        </p>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
          The key insight: QR codes have error correction built in. Level H error correction allows up to 30% of the visual data to be altered before the code breaks. That is the window AI needs.
        </p>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>How ControlNet Makes It Work</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          ControlNet is a neural network architecture that adds spatial control to diffusion models. Instead of generating an image freely from a text prompt, ControlNet accepts a structural guide — in this case, a QR code matrix.
        </p>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          The model runs diffusion from the art prompt while ControlNet enforces the QR structure at each denoising step. The result: an image that looks like art but decodes as a valid QR code.
        </p>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px', marginBottom: '40px', fontFamily: 'monospace', fontSize: '13px', color: '#888' }}>
          Input: URL + art prompt<br/>
          ↓ QR matrix (error correction H)<br/>
          ↓ ControlNet + Stable Diffusion<br/>
          ↓ Output: PNG that scans as your URL
        </div>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>Living Portals — Why Every QR is Updatable</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
          QRON encodes a redirect URL into the QR (not your raw destination). When someone scans, the portal logs the scan and redirects. This means you can update where the QR points without reprinting — and get real scan analytics by country, device, and time.
        </p>

        <div style={{ background: 'rgba(201,162,39,.06)', border: '1px solid rgba(201,162,39,.2)', borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h3 style={{ fontWeight: 800, marginBottom: '8px', fontSize: '1rem' }}>Try it free</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Generate your first AI QR code in 60 seconds. No signup required.</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/free-qr-generator" style={{ background: gold, color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Try Free</Link>
            <Link href="/gig" style={{ background: 'transparent', color: '#e5e5e5', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', border: '1px solid #333' }}>Order Custom $49</Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['/for/restaurants', '/for/cannabis', '/for/events', '/for/real-estate'].map(href => (
            <Link key={href} href={href} style={{ color: '#555', fontSize: '13px', textDecoration: 'none', border: '1px solid #222', borderRadius: '6px', padding: '6px 12px' }}>
              {href.split('/')[2].replace('-',' ')}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
