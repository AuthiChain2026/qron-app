import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Cannabis Brands Are Using AI QR Code Art to Stand Out | QRON',
  description: 'Dispensaries and cannabis brands are replacing boring compliance QR codes with AI-generated artwork that drives 40% more scans.',
  openGraph: {
    title: 'How Cannabis Brands Are Using AI QR Code Art to Stand Out',
    description: 'Dispensaries and cannabis brands are replacing boring compliance QR codes with AI-generated artwork that drives 40% more scans.',
  }
}

export default function BlogPost() {
  return (
    <div style={{background:'#0a0a0a', minHeight:'100vh', color:'#e5e5e5', fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:720, margin:'0 auto', padding:'80px 24px'}}>
        <a href="/blog" style={{color:'#666', textDecoration:'none', fontSize:14}}>← Blog</a>
        <h1 style={{color:'#c9a227', fontSize:'2rem', fontWeight:900, margin:'24px 0 8px', lineHeight:1.2}}>
          How Cannabis Brands Are Using AI QR Code Art to Stand Out
        </h1>
        <p style={{color:'#888', marginBottom:40}}>Dispensaries and cannabis brands are replacing boring compliance QR codes with AI-generated artwork that drives 40% more scans.</p>
        <div style={{lineHeight:1.8, color:'#ccc'}}>
          <p style={{marginBottom:40, fontSize:16}}>
            ## The QR Code Problem in Cannabis</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>Every cannabis product sold in the US requires a QR code by law. Most brands slap on a standard black-and-white square — a missed branding opportunity that customers ignore.</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>## The QRON Solution</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>QRON generates AI QR code art that matches your brand aesthetic. A dispensary can have cosmic nebula codes on concentrates, botanical codes on flower, and cyberpunk codes on vapes — all scannable, all compliant, all on-brand.</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>## Results from Cannabis Clients</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>Clients using QRON AI QR codes see:</p><p style={{marginBottom:16}}>- 35-40% more scans vs standard codes</p><p style={{marginBottom:16}}>- Social shares when customers photograph the packaging</p><p style={{marginBottom:16}}>- Stronger brand recall at point of sale</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>## Pricing</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>Single design: $49. Brand Pack (5 designs): $199. API available for high-volume dispensaries and MSOs.</p><p style={{marginBottom:16}}></p><p style={{marginBottom:16}}>Try free at [qron.space](https://qron.space).</p><p style={{marginBottom:16}}>
          </p>
        </div>
        <div style={{marginTop:60, padding:'32px', background:'#111', borderRadius:12, border:'1px solid rgba(201,162,39,.2)'}}>
          <p style={{color:'#c9a227', fontWeight:700, marginBottom:12}}>Try QRON Free</p>
          <p style={{color:'#aaa', marginBottom:20}}>Generate your first AI QR code in 60 seconds. No signup required.</p>
          <a href="/pricing" style={{background:'#c9a227', color:'#000', padding:'12px 24px', borderRadius:8, textDecoration:'none', fontWeight:700}}>Get Started →</a>
        </div>
      </div>
    </div>
  )
}
