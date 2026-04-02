import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis Dispensary QR Code Requirements by State (2026)',
  description: 'Michigan, California, Colorado require QR codes on cannabis packaging. Here is what is required and how to make them compliant and branded.',
  alternates: { canonical: 'https://qron.space/blog/cannabis-dispensary-qr-code-compliance' },
}

export default function Page() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/blog" style={{color:'#555',fontSize:'12px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',textDecoration:'none'}}>
          <- QRON Blog
        </Link>
        <h1 style={{fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:900,lineHeight:1.15,margin:'24px 0 16px'}}>
          Cannabis Dispensary QR Code Compliance Guide (2026)
        </h1>
        <p style={{color:'#555',fontSize:'13px',marginBottom:'40px'}}>QRON Team &middot; April 2026</p>
        <article>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Cannabis packaging regulations increasingly require QR codes. In Michigan, California, Colorado, Illinois, Nevada, and Washington they are already mandatory. This guide covers requirements by state and how dispensaries are turning compliance QR codes into brand assets.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>State Requirements</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Michigan: required on all adult-use and medical products, must link to Certificate of Analysis. California: required under CDTFA regulations, must link to THC/CBD content and testing data. Colorado: required on retail products, must link to lab results. Illinois: required, must include batch number. Nevada: required, must link to COA. Washington: required, must link to lab test results for the specific batch.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>What Your QR Code Must Do</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Link to verifiable lab results — the COA for the specific batch. Be batch-specific — each production run gets its own QR. Scan reliably — regulators and customers need to be able to verify at point of sale and inspection.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>Turning Compliance Into Marketing</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>The QR code is already on your packaging — it is required. The question is whether it looks like a legal checkbox or a brand element. Dispensaries using QRON cannabis-specific art report that customers photograph packaging and share it on social. The QR becomes part of the brand story rather than a regulatory footnote.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>Living Portals for Cannabis</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>QRON Living Portals are specifically useful for cannabis compliance. Update the destination when your testing lab updates the COA portal — without reprinting thousands of packages. Track which batches customers are verifying and when. For multi-state operators, redirect Michigan customers to METRC data and California customers to CDTFA format from the same printed QR.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>StrainChain Blockchain Authentication</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>For dispensaries that want on-chain batch authentication in addition to QR art: StrainChain at strainchain.io provides blockchain-verified provenance for each batch using Polygon NFTs. Each scan returns a cryptographic verification — not just a document link, but an immutable on-chain record aligned with DSCSA compliance frameworks.</p>
          <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"#e5e5e5",marginTop:"36px",marginBottom:"12px"}}>Get a Compliant Cannabis QR Code</h2>
          <p style={{lineHeight:1.75,marginBottom:"18px",color:"#ccc"}}>Try the free generator at qron.space/free-qr-generator with the cannabis style. For commercial packaging use: $49 custom order at qron.space/gig includes commercial license and print-ready PNG.</p>
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
