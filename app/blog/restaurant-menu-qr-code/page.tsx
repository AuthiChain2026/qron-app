import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Restaurant Menu QR Codes That Customers Actually Scan (2026 Guide)',
  description: 'Most restaurant QR codes get ignored. AI art QR codes get 3x higher scan rates. Here is how to make menu QR codes that work.',
  alternates: { canonical: 'https://qron.space/blog/restaurant-menu-qr-code' },
}

export default function Page() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/blog" style={{color:'#555',fontSize:'12px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',textDecoration:'none'}}>
          <- QRON Blog
        </Link>
        <h1 style={{fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:900,lineHeight:1.15,margin:'24px 0 16px'}}>
          Restaurant Menu QR Codes That Actually Get Scanned
        </h1>
        <p style={{color:'#555',fontSize:'13px',marginBottom:'40px'}}>QRON Team &middot; April 2026</p>
        <article>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>After two years of QR codes on every restaurant table, customers have learned to ignore them. The standard black square on a sticker has become invisible. There is a simple fix: make it worth looking at.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>The Scan Rate Problem</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Standard QR codes have a 10 to 12% voluntary scan rate in restaurant settings. That means 9 out of 10 customers do not look at your digital menu, daily specials, or loyalty program. The reason is design — a black square looks like a mandatory form, not an invitation.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>Best Styles for Restaurants</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Nature Botanical works for farm-to-table and upscale casual. Retro Vintage works for diners, breweries, and comfort food. Abstract Geometric works for fine dining and modern concepts. Each style is designed to look intentional, not generated.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>What to Link To</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Digital menu — most common. Link to Toast, Square, or a PDF. Online ordering — link directly to delivery or pickup. Google reviews — a how-was-your-meal QR on the check increases review volume significantly. Reservations — OpenTable, Resy, or direct booking. Loyalty program — scan to earn points gets the highest scan rate of any restaurant use case.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>Living Portals — Update Without Reprinting</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>QRON Living Portals let you update your QR destination any time without reprinting. Switch from lunch to dinner menu. Update seasonal specials. Change delivery platforms. You print once. The redirect updates in seconds from your dashboard at qron.space/portals.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>Get Started</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Try the free generator at qron.space/free-qr-generator to see your URL in different styles. For print-quality with commercial license: order a custom design for $49 at qron.space/gig. For chains and multi-location groups, contact us at qron.space/contact about bulk pricing.</p>
        </article>
        <div style={{borderTop:'1px solid #1e1e1e',marginTop:'48px',paddingTop:'32px',textAlign:'center'}}>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/free-qr-generator" style={{background:'#c9a227',color:'#000',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>
              Try Free
            </Link>
            <Link href="/gig" style={{background:'transparent',color:'#c9a227',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none',border:'1px solid #c9a227'}}>
              Order $49
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
