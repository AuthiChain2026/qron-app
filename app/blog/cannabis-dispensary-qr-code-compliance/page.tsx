import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis Dispensary QR Code Requirements by State 2026',
  description: 'Michigan, California, Colorado require QR codes on cannabis packaging. What is required and how to stay compliant.',
}

export default function Page() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/blog" style={{color:'#555',fontSize:'12px',fontWeight:700,textDecoration:'none',display:'block',marginBottom:'24px'}}>
          Blog
        </Link>
        <h1 style={{fontSize:'2rem',fontWeight:900,lineHeight:1.15,marginBottom:'40px'}}>Cannabis QR Code Compliance Guide 2026</h1>
        <article>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>Michigan, California, Colorado, Illinois, Nevada, and Washington all require QR codes on cannabis packaging that link to batch-specific lab results and Certificates of Analysis.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>All compliant cannabis QR codes must link to verifiable lab results for the specific batch, be batch-specific rather than generic product pages, and scan reliably for both regulators and customers at point of sale.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>QRON Living Portals solve the reprint problem. When your testing lab updates the COA portal URL, update the QR destination without reprinting thousands of packages. Track batch verification scans in your dashboard.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>The Cannabis Botanical style was designed for dispensary packaging: emerald green, high contrast for reliable scanning, premium aesthetic. Customers share photos of well-branded packaging, turning a compliance requirement into marketing.</p>
        <p style={{lineHeight:1.75,marginBottom:"20px",color:"#ccc"}}>For blockchain-verified batch authentication: StrainChain at strainchain.io provides on-chain provenance using Polygon NFTs, aligned with DSCSA compliance frameworks.</p>
        </article>
        <div style={{marginTop:'48px',paddingTop:'32px',borderTop:'1px solid #1e1e1e',display:'flex',gap:'12px',justifyContent:'center'}}>
          <Link href="/free-qr-generator" style={{background:'#c9a227',color:'#000',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>Try Free</Link>
          <Link href="/gig" style={{border:'1px solid #c9a227',color:'#c9a227',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>Order $49</Link>
        </div>
      </div>
    </div>
  )
}
