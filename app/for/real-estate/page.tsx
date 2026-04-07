import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QR Codes for Real Estate — Yard Sign AI Art That Tracks Leads | QRON',
  description: 'Real estate yard sign QR codes that track scans by neighborhood. AI art that gets noticed. Living Portals update instantly.',
  alternates: { canonical: 'https://qron.space/for/real-estate' },
}

const PORTFOLIO = [
  '/media/gallery-static-portal-1080.svg',
  '/media/gallery-event-poster-1350x1080.svg',
  '/media/gallery-ecommerce-card-1080.svg',
]

export default function RealestatePage() {
  const gold = '#c9a227'
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      
      {/* Hero */}
      <section style={{maxWidth:'900px',margin:'0 auto',padding:'72px 24px 48px',textAlign:'center'}}>
        <Link href="/for/real-estate" style={{fontSize:'12px',color:'#555',letterSpacing:'.12em',fontWeight:700,textTransform:'uppercase',textDecoration:'none',display:'block',marginBottom:'20px'}}>
          QRON · FOR REAL ESTATE
        </Link>
        <h1 style={{fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,lineHeight:1.1,marginBottom:'16px'}}>
          Real Estate QR Codes That Track Every Lead
        </h1>
        <p style={{color:'#888',fontSize:'17px',maxWidth:'600px',margin:'0 auto 32px',lineHeight:1.6}}>
          Replace the plain QR code on your yard sign with AI art that gets noticed — then see exactly when and where buyers are scanning. Update the listing URL instantly when the property sells.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px'}}>
          <Link href="/free-qr-generator?style=abstract"
            style={{background:gold,color:'#000',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px'}}>
            Design Listing QR →
          </Link>
          <Link href="/gig"
            style={{background:'transparent',color:'#e5e5e5',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px',border:'1px solid #333'}}>
            Order Custom Design
          </Link>
        </div>
        {/* Stat */}
        <div style={{display:'inline-flex',gap:'8px',alignItems:'baseline',background:'rgba(201,162,39,.08)',border:'1px solid rgba(201,162,39,.2)',borderRadius:'12px',padding:'16px 24px'}}>
          <span style={{fontSize:'2.4rem',fontWeight:900,color:gold}}>5x</span>
          <span style={{color:'#888',fontSize:'14px'}}>more scans than plain yard sign codes</span>
        </div>
      </section>

      {/* Portfolio strip */}
      <section style={{maxWidth:'900px',margin:'0 auto',padding:'0 24px 64px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2px',borderRadius:'12px',overflow:'hidden'}}>
          {PORTFOLIO.map((url,i) => (
            <div key={i} style={{aspectRatio:'1',background:'#111',overflow:'hidden'}}>
              <img src={url} alt={`QRON QR art example ${i+1}`}
                style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" />
            </div>
          ))}
        </div>
        <p style={{textAlign:'center',color:'#444',fontSize:'12px',marginTop:'12px'}}>
          Every code is AI-generated and scan-tested · Free to try at qron.space
        </p>
      </section>

      {/* Use cases */}
      <section style={{background:'#0d0d0d',borderTop:'1px solid #1a1a1a',padding:'64px 24px'}}>
        <div style={{maxWidth:'840px',margin:'0 auto'}}>
          <h2 style={{textAlign:'center',fontSize:'1.4rem',fontWeight:800,marginBottom:'32px'}}>
            How Real Estate Use QRON
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
          <div key="Yard Signs" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Yard Signs</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Track scans by neighborhood, time of day, and device.</p>
          </div>
          <div key="Listing Links" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Listing Links</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Update the destination instantly when price changes.</p>
          </div>
          <div key="Open House" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Open House</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>RSVP links and directions via QR art.</p>
          </div>
          <div key="Agent Cards" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Agent Cards</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Business cards with AI QR art — people keep them.</p>
          </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{maxWidth:'700px',margin:'0 auto',padding:'64px 24px 80px',textAlign:'center'}}>
        <h2 style={{fontSize:'1.5rem',fontWeight:800,marginBottom:'12px'}}>Ready to try it free?</h2>
        <p style={{color:'#888',fontSize:'15px',marginBottom:'28px'}}>
          Generate your first AI QR code in 60 seconds. No signup required.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/free-qr-generator?style=abstract"
            style={{background:gold,color:'#000',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px'}}>
            Try Free →
          </Link>
          <Link href="/pricing"
            style={{background:'transparent',color:gold,padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px',border:`1px solid ${gold}`}}>
            View Pricing
          </Link>
        </div>
        <p style={{color:'#444',fontSize:'13px',marginTop:'16px'}}>
          2 free QR codes per day · No credit card · Instant download
        </p>
      </section>

    </div>
  )
}
