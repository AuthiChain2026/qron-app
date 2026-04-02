import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cannabis Dispensary QR Code Requirements by State (2026)',
  description: 'Michigan, California, Colorado and other states require QR codes on cannabis packaging. Here's what's required and how to make them compliant and branded.',
  alternates: { canonical: 'https://qron.space/blog/cannabis-dispensary-qr-code-compliance' },
}

export default function BlogPost() {
  const gold = '#c9a227'
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/blog" style={{color:'#555',fontSize:'12px',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',textDecoration:'none',display:'block',marginBottom:'24px'}}>
          ← QRON Blog
        </Link>
        <h1 style={{fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:900,lineHeight:1.15,marginBottom:'16px'}}>
          Cannabis Dispensary QR Code Compliance Guide (2026)
        </h1>
        <div style={{color:'#555',fontSize:'13px',marginBottom:'40px',display:'flex',gap:'16px'}}>
          <span>QRON Team</span>
          <span>·</span>
          <span>April 2026</span>
        </div>
        <article style={{fontSize:'16px'}}>
      <p style={{lineHeight:1.7,marginBottom:"16px"}}>Cannabis packaging regulations increasingly require QR codes — and in some states, they\'re already mandatory. This guide covers the requirements by state and how dispensaries are turning compliance QR codes into brand assets.</p>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,marginTop:"36px",marginBottom:"12px"}}>Which States Require QR Codes on Cannabis Packaging</h2>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**Michigan** — Required on all adult-use and medical cannabis products. Must link to the product\'s Certificate of Analysis (COA) from a licensed testing lab.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**California** — Required under CDTFA regulations. Must link to product information including THC/CBD content and testing data.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**Colorado** — Required on retail marijuana products. Must link to product information and lab results.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**Illinois** — Required. Must include product batch number and link to testing results.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**Nevada** — Required on all cannabis products. Must link to certificate of analysis.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**Washington** — Required. Must link to lab test results for the specific batch.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>Other states are moving toward similar requirements as regulatory frameworks mature.</p>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,marginTop:"36px",marginBottom:"12px"}}>What Your Cannabis QR Code Must Do</h2>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>Regardless of state, compliant cannabis QR codes must:</p>

      <li style={{lineHeight:1.7,marginBottom:"6px"}}>**Link to verifiable lab results** — The COA for the specific batch, not just general product info</li>
      <li style={{lineHeight:1.7,marginBottom:"6px"}}>**Be batch-specific** — Each production run gets its own QR, not a generic product page</li>
      <li style={{lineHeight:1.7,marginBottom:"6px"}}>**Scan reliably** — Regulators and customers need to be able to verify</li>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>Most dispensaries use a Google Doc, testing lab portal link, or compliance software URL as the destination.</p>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,marginTop:"36px",marginBottom:"12px"}}>Turning Compliance Into Marketing</h2>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>The QR code is already on your packaging — it\'s required. The question is whether it looks like a legal checkbox or a brand element.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>Dispensaries using QRON\'s cannabis-specific art style report that customers actually photograph the packaging and share it. The QR code becomes part of the brand story rather than a regulatory footnote.</p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>**Cannabis Botanical style** — Emerald green with botanical illustration. Designed specifically for cannabis packaging — high contrast for reliability, premium aesthetic for brand alignment.</p>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,marginTop:"36px",marginBottom:"12px"}}>How Living Portals Work for Cannabis</h2>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>QRON\'s Living Portal feature is specifically useful for cannabis compliance:</p>

      <li style={{lineHeight:1.7,marginBottom:"6px"}}>Same printed QR, updated destination** — When your testing lab updates the COA portal, you update the destination link without reprinting thousands of packages</li>
      <li style={{lineHeight:1.7,marginBottom:"6px"}}>Batch-level tracking** — See which batches customers are verifying, and when</li>
      <li style={{lineHeight:1.7,marginBottom:"6px"}}>Redirect by state** — Send Michigan customers to METRC data, California customers to CDTFA format</li>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,marginTop:"36px",marginBottom:"12px"}}>StrainChain Integration</h2>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>For dispensaries that want blockchain-verified batch authentication in addition to QR art: StrainChain (strainchain.io) provides on-chain provenance for each batch using Polygon NFTs. Each scan returns a cryptographic verification of authenticity — not just a document link, but an immutable on-chain record.</p>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,marginTop:"36px",marginBottom:"12px"}}>Get a Compliant, Branded Cannabis QR Code</h2>

      <p style={{marginBottom:"16px"}}><a href="https://qron.space/free-qr-generator?style=cannabis" style={{color:"#c9a227",fontWeight:700}}>Try the free generator →</a></p>

      <p style={{lineHeight:1.7,marginBottom:"16px"}}>For dispensary chains and multi-location groups, [contact us](https://qron.space/contact) about bulk pricing and StrainChain integration.</p>
        </article>
        <div style={{borderTop:'1px solid #1e1e1e',marginTop:'48px',paddingTop:'32px',textAlign:'center'}}>
          <p style={{color:'#888',marginBottom:'20px'}}>Ready to try QRON?</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/free-qr-generator" style={{background:gold,color:'#000',padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none'}}>
              Try Free →
            </Link>
            <Link href="/gig" style={{background:'transparent',color:gold,padding:'12px 24px',borderRadius:'8px',fontWeight:700,textDecoration:'none',border:`1px solid ${gold}`}}>
              Order Custom $49
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
