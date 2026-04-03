import type { Metadata } from 'next'
import { CheckoutModal } from './pricing-client'

export const metadata: Metadata = {
  title: 'QRON Pricing — AI QR Code Art From $9',
  description: 'QRON AI QR code art pricing: Starter $9/mo, Creator $39/mo, Business $99/mo. Single designs $49. 100% scannable. 11 styles. Living Portals included.',
  openGraph: {
    title: 'QRON Pricing — AI QR Code Art From $9',
    description: 'Beautiful, scannable AI QR codes for brands. 11 styles, blockchain-verified, 24h delivery.',
    url: 'https://qron.space/pricing',
  }
}

export default function PricingPage() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'960px',margin:'0 auto',padding:'80px 24px'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:60}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:900,color:'#c9a227',marginBottom:12}}>
            Simple, transparent pricing
          </h1>
          <p style={{color:'#888',fontSize:18,maxWidth:500,margin:'0 auto'}}>
            Start free. Scale as you grow. Every plan includes 100% scan-guaranteed AI QR art.
          </p>
        </div>

        {/* Pricing cards */}
        <PricingCards />

        {/* One-time options */}
        <div style={{marginTop:60,borderTop:'1px solid #1e1e1e',paddingTop:48}}>
          <h2 style={{color:'#c9a227',fontWeight:700,fontSize:'1.3rem',marginBottom:24,textAlign:'center'}}>
            One-Time Designs
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
            <OneTimeCard plan="single" label="Single Design" price="$49" features={["1 AI QR design","Any style","High-res PNG","Commercial license","24h delivery"]} />
            <OneTimeCard plan="pack" label="Brand Pack" price="$199" features={["5 AI QR designs","Matched brand theme","Priority delivery","ZIP download","Living Portals included"]} />
          </div>
        </div>

        {/* AuthiChain */}
        <div style={{marginTop:60,background:'#111',border:'1px solid rgba(201,162,39,.2)',borderRadius:16,padding:40,textAlign:'center'}}>
          <h2 style={{color:'#c9a227',fontWeight:700,marginBottom:8}}>Need blockchain authentication?</h2>
          <p style={{color:'#888',marginBottom:20}}>AuthiChain adds ERC-721 certificates of authenticity to every QRON code.</p>
          <a href="https://authichain.com" style={{color:'#c9a227',fontWeight:700}}>Explore AuthiChain →</a>
        </div>
      </div>
    </div>
  )
}

function PricingCards() {
  const plans = [
    { plan:'starter', label:'Starter', price:'$9', period:'/mo', gens:50, features:['50 AI QR generations/mo','All 11 styles','PNG downloads','Email support'], popular:false },
    { plan:'creator', label:'Creator', price:'$39', period:'/mo', gens:250, features:['250 generations/mo','Living Portals','Scan analytics','Priority support','Custom domains'], popular:true },
    { plan:'business', label:'Business', price:'$99', period:'/mo', gens:1000, features:['1,000 generations/mo','Full API access','Team seats','SLA uptime','Dedicated support'], popular:false },
  ]
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
      {plans.map(p => <PlanCard key={p.plan} {...p} />)}
    </div>
  )
}

function PlanCard({ plan, label, price, period, gens, features, popular }: { plan:string,label:string,price:string,period:string,gens:number,features:string[],popular:boolean }) {
  return (
    <div style={{background:'#111',border:`1px solid ${popular?'#c9a227':'rgba(201,162,39,.15)'}`,borderRadius:16,padding:32,position:'relative'}}>
      {popular && <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#c9a227',color:'#000',padding:'4px 16px',borderRadius:20,fontSize:12,fontWeight:700}}>MOST POPULAR</div>}
      <div style={{color:'#888',fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:8}}>{label}</div>
      <div style={{fontSize:'2.5rem',fontWeight:900,color:'#c9a227',lineHeight:1}}>{price}<span style={{fontSize:14,color:'#666'}}>{period}</span></div>
      <div style={{color:'#666',fontSize:13,margin:'8px 0 20px'}}>{gens} generations/month</div>
      <ul style={{listStyle:'none',padding:0,margin:'0 0 24px'}}>
        {features.map((f,i) => <li key={i} style={{color:'#aaa',fontSize:14,padding:'6px 0',borderBottom:'1px solid #1a1a1a'}}>✓ {f}</li>)}
      </ul>
      <CheckoutModal plan={plan} label={label} price={price + period} />
    </div>
  )
}

function OneTimeCard({ plan, label, price, features }: { plan:string,label:string,price:string,features:string[] }) {
  return (
    <div style={{background:'#111',border:'1px solid rgba(201,162,39,.15)',borderRadius:16,padding:28}}>
      <div style={{color:'#888',fontSize:12,fontWeight:700,textTransform:'uppercase',marginBottom:6}}>{label}</div>
      <div style={{fontSize:'2rem',fontWeight:900,color:'#c9a227',marginBottom:12}}>{price}</div>
      <ul style={{listStyle:'none',padding:0,margin:'0 0 20px'}}>
        {features.map((f,i) => <li key={i} style={{color:'#aaa',fontSize:14,padding:'5px 0'}}>✓ {f}</li>)}
      </ul>
      <CheckoutModal plan={plan} label={label} price={price} />
    </div>
  )
}
