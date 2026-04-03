'use client'

'use client'
import { useState } from 'react'

// Email capture before Stripe checkout — eliminates anonymous cart abandonment
function CheckoutModal({ plan, label, price, onClose }: { plan: string, label: string, price: string, onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      const r = await fetch('https://qron-checkout-capture.undone-k.workers.dev/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan })
      })
      const d = await r.json()
      if (d.url) window.location.href = d.url
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <div style={{ background:'#111', border:'1px solid rgba(201,162,39,.3)', borderRadius:16, padding:32, maxWidth:400, width:'100%', margin:'0 24px' }}>
        <h3 style={{ color:'#c9a227', marginBottom:8 }}>Get {label}</h3>
        <p style={{ color:'#888', fontSize:14, marginBottom:20 }}>Enter your email to continue to checkout. We'll send your receipt and access details here.</p>
        <input
          type="email" placeholder="your@email.com" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCheckout()}
          style={{ width:'100%', background:'rgba(255,255,255,.06)', border:'1px solid rgba(201,162,39,.3)', borderRadius:8, color:'#e5e5e5', padding:'10px 12px', fontSize:14, outline:'none', marginBottom:12 }}
        />
        <button onClick={handleCheckout} disabled={loading || !email.includes('@')}
          style={{ width:'100%', background:'#c9a227', color:'#000', border:'none', borderRadius:8, padding:'12px', fontSize:15, fontWeight:700, cursor:'pointer', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Loading...' : `Continue to ${price} →`}
        </button>
        <button onClick={onClose} style={{ width:'100%', background:'transparent', color:'#666', border:'none', padding:'10px', cursor:'pointer', marginTop:8, fontSize:13 }}>
          Cancel
        </button>
      </div>
    </div>
  )
}
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'QRON Pricing — AI QR Code Generator',
  description: 'Simple pricing for AI QR codes. $9 starter, $39 creator, $99 business. One-time purchase, no subscription, commercial license included.',
}

export default function Page() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'56px 24px 80px'}}>
        <Link href="/" style={{color:'#555',fontSize:'12px',fontWeight:600,textDecoration:'none',letterSpacing:'.1em',textTransform:'uppercase'}}>← Back</Link>
        <h1 style={{marginTop:'32px',fontSize:'2.2rem',fontWeight:900,textAlign:'center'}}>Simple, Honest Pricing</h1>
        <p style={{color:'#888',textAlign:'center',marginBottom:'48px',marginTop:'12px'}}>One-time purchase. Commercial license included. 100% scan guarantee.</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>

          <div style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'12px',padding:'28px'}}>
            <div style={{color:'#888',fontSize:'12px',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'8px'}}>Starter</div>
            <div style={{fontSize:'2.4rem',fontWeight:900,color:'#fff',marginBottom:'4px'}}>$9</div>
            <div style={{color:'#555',fontSize:'13px',marginBottom:'20px'}}>one-time</div>
            <ul style={{listStyle:'none',padding:0,margin:'0 0 24px',color:'#ccc',fontSize:'14px'}}>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ 50 AI QR generations</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ All standard styles</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ PNG download</li>
              <li style={{padding:'6px 0'}}>◆ Commercial license</li>
            </ul>
            <a href="https://buy.stripe.com/5kQ3cv1IZ5xc4e60YY1Nu14" style={{display:'block',background:'#1e1e1e',color:'#fff',textAlign:'center',padding:'12px',borderRadius:'8px',textDecoration:'none',fontWeight:700}}>Buy Starter →</a>
          </div>

          <div style={{background:'#111',border:'2px solid #c9a227',borderRadius:'12px',padding:'28px',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#c9a227',color:'#000',fontSize:'11px',fontWeight:900,padding:'4px 12px',borderRadius:'20px',textTransform:'uppercase',letterSpacing:'.08em',whiteSpace:'nowrap'}}>Most Popular</div>
            <div style={{color:'#c9a227',fontSize:'12px',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'8px'}}>Creator</div>
            <div style={{fontSize:'2.4rem',fontWeight:900,color:'#fff',marginBottom:'4px'}}>$39</div>
            <div style={{color:'#555',fontSize:'13px',marginBottom:'20px'}}>one-time</div>
            <ul style={{listStyle:'none',padding:0,margin:'0 0 24px',color:'#ccc',fontSize:'14px'}}>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ 250 AI QR generations</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ All styles incl. holographic</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ Living Portals (dynamic URLs)</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ Scan analytics</li>
              <li style={{padding:'6px 0'}}>◆ Commercial license</li>
            </ul>
            <a href="https://buy.stripe.com/eVqcN51IZ0cSeSKfTS1Nu0W" style={{display:'block',background:'#c9a227',color:'#000',textAlign:'center',padding:'12px',borderRadius:'8px',textDecoration:'none',fontWeight:700}}>Buy Creator →</a>
          </div>

          <div style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'12px',padding:'28px'}}>
            <div style={{color:'#888',fontSize:'12px',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:'8px'}}>Business</div>
            <div style={{fontSize:'2.4rem',fontWeight:900,color:'#fff',marginBottom:'4px'}}>$99</div>
            <div style={{color:'#555',fontSize:'13px',marginBottom:'20px'}}>one-time</div>
            <ul style={{listStyle:'none',padding:0,margin:'0 0 24px',color:'#ccc',fontSize:'14px'}}>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ 1000 AI QR generations</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ API access</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ White-label option</li>
              <li style={{padding:'6px 0',borderBottom:'1px solid #1e1e1e'}}>◆ Blockchain authentication</li>
              <li style={{padding:'6px 0'}}>◆ Priority support</li>
            </ul>
            <a href="https://buy.stripe.com/9B68wP4Vb1gW6mefTS1Nu0X" style={{display:'block',background:'#1e1e1e',color:'#fff',textAlign:'center',padding:'12px',borderRadius:'8px',textDecoration:'none',fontWeight:700}}>Buy Business →</a>
          </div>

        </div>

        <div style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:'12px',padding:'28px',textAlign:'center',marginBottom:'32px'}}>
          <div style={{fontSize:'1.1rem',fontWeight:700,color:'#fff',marginBottom:'8px'}}>Need a single design?</div>
          <p style={{color:'#888',fontSize:'14px',marginBottom:'16px'}}>Custom AI QR code with full commercial license. Delivered in 24 hours.</p>
          <a href="https://buy.stripe.com/8x25kDcnD5xc11Uazy1Nu0T" style={{display:'inline-block',background:'#1e1e1e',color:'#fff',padding:'10px 24px',borderRadius:'8px',textDecoration:'none',fontWeight:700,border:'1px solid #333'}}>Single Design — $49 →</a>
        </div>

        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <p style={{color:'#555',fontSize:'13px',marginBottom:'8px'}}>All purchases include: 100% scan guarantee · commercial license · PNG download · no subscription</p>
          <p style={{color:'#555',fontSize:'13px'}}>Enterprise / white-label: <a href="mailto:qron@qron.space" style={{color:'#c9a227',textDecoration:'none'}}>qron@qron.space</a></p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px'}}>
          <div style={{textAlign:'center',padding:'16px'}}>
            <div style={{fontSize:'1.8rem',fontWeight:900,color:'#c9a227'}}>100%</div>
            <div style={{color:'#888',fontSize:'13px'}}>Scan guarantee</div>
          </div>
          <div style={{textAlign:'center',padding:'16px'}}>
            <div style={{fontSize:'1.8rem',fontWeight:900,color:'#c9a227'}}>&lt;3s</div>
            <div style={{color:'#888',fontSize:'13px'}}>Generation time</div>
          </div>
          <div style={{textAlign:'center',padding:'16px'}}>
            <div style={{fontSize:'1.8rem',fontWeight:900,color:'#c9a227'}}>Ed25519</div>
            <div style={{color:'#888',fontSize:'13px'}}>Cryptographic signing</div>
          </div>
          <div style={{textAlign:'center',padding:'16px'}}>
            <div style={{fontSize:'1.8rem',fontWeight:900,color:'#c9a227'}}>24h</div>
            <div style={{color:'#888',fontSize:'13px'}}>Custom design delivery</div>
          </div>
        </div>

      </div>
    </div>
  )
}
