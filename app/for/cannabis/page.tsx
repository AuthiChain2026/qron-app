import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis Dispensary QR Codes — COA & Compliance QR Art | QRON',
  description: 'Cannabis dispensaries are required to put QR codes on packaging. Make them beautiful and scannable with QRON AI art.',
  alternates: { canonical: 'https://qron.space/for/cannabis' },
}

const PORTFOLIO = [
  'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163472154-tjtjyg',
  'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163507531-5e1q81',
  'https://qron-ai-api.undone-k.workers.dev/v1/download/qr-1775163542588-1c7bgj',
]

export default function CannabisPage() {
  const gold = '#c9a227'
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      
      {/* Hero */}
      <section style={{maxWidth:'900px',margin:'0 auto',padding:'72px 24px 48px',textAlign:'center'}}>
        <Link href="/for/cannabis" style={{fontSize:'12px',color:'#555',letterSpacing:'.12em',fontWeight:700,textTransform:'uppercase',textDecoration:'none',display:'block',marginBottom:'20px'}}>
          QRON · FOR CANNABIS
        </Link>
        <h1 style={{fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,lineHeight:1.1,marginBottom:'16px'}}>
          Cannabis QR Codes That Comply and Convert
        </h1>
        <p style={{color:'#888',fontSize:'17px',maxWidth:'600px',margin:'0 auto 32px',lineHeight:1.6}}>
          Michigan, California, and Colorado law requires QR codes on cannabis packaging. Make yours an asset — AI art that matches your brand, links to COA, batch data, or loyalty programs.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px'}}>
          <Link href="/free-qr-generator?style=cannabis"
            style={{background:gold,color:'#000',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px'}}>
            Design Dispensary QR →
          </Link>
          <Link href="/gig"
            style={{background:'transparent',color:'#e5e5e5',padding:'14px 28px',borderRadius:'10px',fontWeight:700,textDecoration:'none',fontSize:'15px',border:'1px solid #333'}}>
            Order Custom Design
          </Link>
        </div>
        {/* Stat */}
        <div style={{display:'inline-flex',gap:'8px',alignItems:'baseline',background:'rgba(201,162,39,.08)',border:'1px solid rgba(201,162,39,.2)',borderRadius:'12px',padding:'16px 24px'}}>
          <span style={{fontSize:'2.4rem',fontWeight:900,color:gold}}>40%</span>
          <span style={{color:'#888',fontSize:'14px'}}>voluntary scan rate (vs 10% for plain codes)</span>
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
            How Cannabis Use QRON
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
          <div key="COA Links" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>COA Links</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Scan to view Certificate of Analysis. Required in many states.</p>
          </div>
          <div key="Batch Verification" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Batch Verification</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>AuthiChain blockchain authentication for each batch.</p>
          </div>
          <div key="Strain Info" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Strain Info</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Link to strain lineage, terpene profile, and effects.</p>
          </div>
          <div key="Loyalty Rewards" style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'10px',padding:'20px'}}>
            <div style={{fontWeight:700,marginBottom:'6px'}}>Loyalty Rewards</div>
            <p style={{color:'#888',fontSize:'14px',lineHeight:1.5}}>Scan packaging for loyalty points at your dispensary.</p>
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
          <Link href="/free-qr-generator?style=cannabis"
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
