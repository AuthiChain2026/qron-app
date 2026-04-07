import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI QR Codes for Restaurants — Menu QR Art That Gets Scanned | QRON',
  description: 'Replace boring menu QR codes with AI-generated art. 3x higher scan rate. Restaurant-themed styles. Free trial.',
  alternates: { canonical: 'https://qron.space/for/restaurants' },
}

const PORTFOLIO = [
  '/media/gallery-event-badge-1080.svg',
  '/media/gallery-creator-merch-1080.svg',
  '/media/gallery-chromatic-portal-1080.svg',
]

export default function RestaurantsPage() {
  const gold = '#c9a227'
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      
      {/* Hero */}
      <section style={{maxWidth:'900px',margin:'0 auto',padding:'72px 24px 48px',textAlign:'center'}}>
        <Link href="/for/restaurants" style={{fontSize:'12px',color:'#555',letterSpacing:'.12em',fontWeight:700,textTransform:'uppercase',textDecoration:'none',display:'block',marginBottom:'20px'}}>
          QRON · FOR RESTAURANTS
        </Link>
        <h1 style={{fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,lineHeight:1.1,marginBottom:'16px'}}>
          Restaurant QR Codes That Actually Get Scanned
        </h1>
        <p style={{color:'#888',fontSize:'17px',maxWidth:'600px',margin:'0 auto 32px',lineHeight:1.6}}>
          Every table in your restaurant has a QR code. Most customers ignore them. QRON turns your menu QR into AI-generated art — customers scan because they want to.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px'}}>
          <Link href="/free-qr-generator?style=nature"
            style={{background:gold,color:'#000',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px'}}>
            Design Restaurant QR →
          </Link>
          <Link href="/gig"
            style={{background:'transparent',color:'#e5e5e5',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px',border:'1px solid #333'}}>
            Order Custom Design
          </Link>
        </div>
        {/* Stat */}
        <div style={{display:'inline-flex',gap:'8px',alignItems:'baseline',background:'rgba(201,162,39,.08)',border:'1px solid rgba(201,162,39,.2)',borderRadius:'12px',padding:'16px 24px'}}>
          <span style={{fontSize:'2.4rem',fontWeight:900,color:gold}}>3x</span>
          <span style={{color:'#888',fontSize:'14px'}}>higher scan rate vs standard codes</span>
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
            How Restaurants Use QRON
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
          <div key="Menu Link" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Menu Link</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Link to your digital menu, specials, or reservations.</p>
          </div>
          <div key="Table Numbers" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Table Numbers</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Each table gets a unique, scannable art piece.</p>
          </div>
          <div key="Loyalty Program" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Loyalty Program</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Scan to earn points — customers actually do it.</p>
          </div>
          <div key="Review Requests" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Review Requests</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Post-meal scan for Google / Yelp review.</p>
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
          <Link href="/free-qr-generator?style=nature"
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
