import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Restaurant Menu QR Codes That Customers Actually Scan',
  description: 'Most restaurant QR codes get ignored. AI art QR codes get 3x higher scan rates. How to make menu QR codes that work.',
}

export default function Page() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/blog" style={{color:'#555',fontSize:'12px',fontWeight:700,textDecoration:'none',display:'block',marginBottom:'24px'}}>
          Blog
        </Link>
        <h1 style={{fontSize:'2rem',fontWeight:900,lineHeight:1.15,marginBottom:'40px'}}>Restaurant Menu QR Codes That Get Scanned</h1>
        <article>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Standard restaurant QR codes have a 10 to 12 percent voluntary scan rate. QRON designed QR codes see 35 to 45 percent scan rates because customers want to look at them.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Best styles for restaurants: Nature Botanical for farm-to-table. Retro Vintage for diners and breweries. Abstract Geometric for fine dining. Each style is designed to look intentional, not generated.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Link your QR to a digital menu, online ordering page, Google review link, reservations, or loyalty program. Loyalty program QR codes consistently get the highest scan rate in restaurant settings.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>QRON Living Portals let you update the destination without reprinting. Switch from lunch to dinner menu, change delivery platforms, or update seasonal specials. Print once, update from qron.space/portals.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Try free at qron.space/free-qr-generator. Print-quality with commercial license at qron.space/gig for $49.</p>
        </article>
        <div style={{marginTop:'48px',paddingTop:'32px',borderTop:'1px solid #1e1e1e',display:'flex',gap:'12px',justifyContent:'center'}}>
          <Link href="/free-qr-generator" style={{background:'#c9a227',color:'#000',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>Try Free</Link>
          <Link href="/gig" style={{border:'1px solid #c9a227',color:'#c9a227',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>Order $49</Link>
        </div>
      </div>
    </div>
  )
}
