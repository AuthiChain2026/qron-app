import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free AI QR Code Generator That Actually Scans',
  description: 'QRON is a free AI QR code generator. No signup. Scans on iPhone and Android. Custom styles. Download PNG instantly.',
}

export default function Page() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/blog" style={{color:'#555',fontSize:'12px',fontWeight:700,textDecoration:'none',display:'block',marginBottom:'24px'}}>
          Blog
        </Link>
        <h1 style={{fontSize:'2rem',fontWeight:900,lineHeight:1.15,marginBottom:'40px'}}>Free AI QR Code Generator</h1>
        <article>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>QRON makes AI-powered QR codes that look great and actually scan. No signup required. Generate up to 2 per day free at qron.space/free-qr-generator.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>The technology uses ControlNet, which constrains diffusion model output to preserve QR code structure. Standard QR codes tolerate 30% visual error correction, and QRON targets that threshold precisely.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Styles available: Cosmic Space (galaxy, purple and gold), Cannabis Botanical (emerald green), Cyberpunk Neon (electric blue), Nature Botanical (watercolor), Abstract Geometric (black and gold), Retro Vintage (americana).</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Every code is scan-tested before download. Works on iPhone and Android at 1.5 inch print size and larger.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>For commercial use or custom prompts: order at qron.space/gig for $49. Includes commercial license and 24-hour delivery.</p>
        </article>
        <div style={{marginTop:'48px',paddingTop:'32px',borderTop:'1px solid #1e1e1e',display:'flex',gap:'12px',justifyContent:'center'}}>
          <Link href="/free-qr-generator" style={{background:'#c9a227',color:'#000',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>Try Free</Link>
          <Link href="/gig" style={{border:'1px solid #c9a227',color:'#c9a227',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>Order $49</Link>
        </div>
      </div>
    </div>
  )
}
