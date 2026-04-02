import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI QR Code Art Works — ControlNet Explained | QRON',
  description: 'Learn how AI-generated QR codes are made using ControlNet diffusion. Why they scan, how to order one, and what makes them different from regular QR codes.',
  alternates: { canonical: 'https://qron.space/blog/how-ai-qr-codes-work' },
}

export default function HowAIQRCodesWork() {
  const gold = '#c9a227'
  return (
    <article style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px 80px' }}>
        <Link href="/blog" style={{ color: '#555', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '32px' }}>← Blog</Link>
        
        <div style={{ fontSize: '12px', color: gold, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '16px' }}>
          HOW IT WORKS
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          How AI QR Code Art Works — and Why It Actually Scans
        </h1>
        <p style={{ color: '#888', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px' }}>
          Standard QR codes have a 10–12% voluntary scan rate. AI art versions average 40%+. 
          Here's the technology behind the difference.
        </p>

        <img 
          src="https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163029861-yz2ndh"
          alt="AI generated QR code art example — cosmic space style"
          style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', marginBottom: '40px', display: 'block' }}
        />

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>The Problem with Standard QR Codes</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          A QR code is a matrix of black and white modules encoding a URL. Every module matters — move one and the code breaks. That constraint made QR codes notoriously ugly for 30 years. People don't scan them because there's nothing visually interesting about a black-and-white square.
        </p>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
          The key insight from the computer vision community: QR codes have error correction built in. Level H error correction allows up to 30% of the code's visual data to be altered before it becomes unreadable. That's the window AI needs.
        </p>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>How ControlNet Makes It Work</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          ControlNet is a neural network architecture that adds spatial control to diffusion models like Stable Diffusion. Instead of generating an image freely from a text prompt, ControlNet accepts a structural guide — a depth map, a pose skeleton, an edge map, or in our case, a QR code matrix.
        </p>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          The model runs diffusion normally from the text prompt ({'"vibrant cosmic galaxy, purple and gold"'}) while ControlNet enforces the QR structure at each denoising step. The result: an image that looks like a piece of art but decodes as a valid QR code when scanned.
        </p>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '20px', marginBottom: '40px', fontFamily: 'monospace', fontSize: '13px', color: '#888' }}>
          Input: URL + art prompt + style<br/>
          ↓<br/>
          QR matrix (error correction: H)<br/>
          ↓<br/>
          ControlNet conditioning → Stable Diffusion<br/>
          ↓<br/>
          Output: 768×768 PNG that scans as the original URL
        </div>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>Why They Actually Scan</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          Every QRON-generated QR is tested before delivery. The conditioning scale (how strictly ControlNet enforces the QR structure) is tuned so the art style has maximum freedom in the lighter modules while the finder patterns — the three squares in the corners — remain intact.
        </p>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
          On iPhone and Android, they scan in normal lighting conditions at sizes down to 1.5 inches. For print use, we recommend minimum 2 inches at 300 DPI.
        </p>

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px', color: gold }}>The Living Portal Layer</h2>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>
          QRON adds one more layer on top: instead of encoding your destination URL directly into the QR, every code encodes a Living Portal — a redirect URL at qron.space/p/[shortcode]. When someone scans, the portal redirects to your destination and logs the scan.
        </p>
        <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '40px' }}>
          This means you can update where the QR points without reprinting. Change your menu link, update a landing page, or redirect to a seasonal promotion — the QR code itself stays the same. And you get real scan analytics: country, device type, time of day.
        </p>

        <div style={{ background: 'rgba(201,162,39,.06)', border: `1px solid rgba(201,162,39,.2)`, borderRadius: '12px', padding: '24px', marginBottom: '40px' }}>
          <h3 style={{ fontWeight: 800, marginBottom: '8px', fontSize: '1rem' }}>Try it free</h3>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Generate your first AI QR code in 60 seconds. No signup required.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/free-qr-generator" style={{ background: gold, color: '#000', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Try Free →</Link>
            <Link href="/gig" style={{ background: 'transparent', color: '#e5e5e5', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px', border: '1px solid #333' }}>Order Custom $49</Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '32px', color: '#555', fontSize: '13px' }}>
          <strong style={{ color: '#888' }}>QRON</strong> — AI QR art platform. 
          <Link href="/for/restaurants" style={{ color: '#555', margin: '0 8px' }}>Restaurants</Link>
          <Link href="/for/cannabis" style={{ color: '#555', margin: '0 8px' }}>Cannabis</Link>
          <Link href="/for/events" style={{ color: '#555', margin: '0 8px' }}>Events</Link>
          <Link href="/for/real-estate" style={{ color: '#555', marginLeft: '8px' }}>Real Estate</Link>
        </div>
      </div>
    </article>
  )
}
