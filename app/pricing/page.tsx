import type { Metadata } from 'next'
import { PLANS, type Plan } from '@/lib/plans'
import { CheckoutModal } from './pricing-client'

export const metadata: Metadata = {
  title: 'QRON Pricing — AI QR Code Art from $29 | Bitcoin Ordinals',
  description: 'QRON AI QR code art: Starter $29 (100 gens), Creator $99 (500 gens), Studio $299 (2,000 gens), Business $49/mo unlimited. Bitcoin Ordinal inscriptions from $49. 100% scannable, signed on AuthiChain.',
  openGraph: {
    title: 'QRON Pricing — AI QR Code Art + Bitcoin Ordinals',
    description: 'Beautiful, scannable AI QR codes. One-time packs from $29, Business subscription $49/mo, Bitcoin Ordinals from $49. Blockchain-verified.',
    url: 'https://qron.space/pricing',
  }
}

export default function PricingPage() {
  return (
    <div style={{background:'#0a0a0a',color:'#e5e5e5',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{maxWidth:'1080px',margin:'0 auto',padding:'80px 24px'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:60}}>
          <h1 style={{fontSize:'2.5rem',fontWeight:900,color:'#c9a227',marginBottom:12}}>
            Simple, transparent pricing
          </h1>
          <p style={{color:'#888',fontSize:18,maxWidth:560,margin:'0 auto'}}>
            Start free. Scale as you grow. Every QRON is 100% scan-guaranteed AI QR art, signed on AuthiChain.
          </p>
        </div>

        {/* Pricing cards — driven by lib/plans.ts (single source of truth) */}
        <PricingCards />

        {/* ─── Bitcoin Ordinal Inscriptions ─── */}
        <div style={{marginTop:60,borderTop:'1px solid #1e1e1e',paddingTop:48}}>
          <div style={{textAlign:'center',marginBottom:32}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(247,147,26,0.1)',border:'1px solid rgba(247,147,26,0.3)',borderRadius:20,padding:'6px 16px',marginBottom:16}}>
              <span style={{fontSize:14}}>₿</span>
              <span style={{color:'#F7931A',fontSize:13,fontWeight:700}}>Bitcoin Ordinals — New</span>
            </div>
            <h2 style={{color:'#F7931A',fontWeight:700,fontSize:'1.5rem',marginBottom:8}}>
              Inscribe to Bitcoin L1
            </h2>
            <p style={{color:'#888',fontSize:15,maxWidth:520,margin:'0 auto'}}>
              Your AI QR art, permanently stored on Bitcoin — the world&apos;s most trusted blockchain. Each piece becomes a transferable digital artifact tradeable on Magic Eden.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
            <OrdinalCard
              plan="ordinal_single"
              label="Ordinal Single"
              price="$49"
              badge={null}
              features={[
                "1 AI QR art inscription",
                "Bitcoin Ordinal on L1",
                "ordinals.com verification",
                "Transferable Bitcoin NFT",
                "Magic Eden listing ready",
                "Pixel-clamped scannability"
              ]}
              paymentLink="https://buy.stripe.com/14A00jbjz9Ns5ia5fe1Nu1d"
            />
            <OrdinalCard
              plan="ordinal_auth"
              label="AuthiChain BTC Auth"
              price="$299"
              badge="Enterprise"
              features={[
                "Product cert on Bitcoin",
                "Dual-chain proof (Polygon + BTC)",
                "authichain.com/verify page",
                "Brand + serial inscription",
                "ordinals.com permanent link",
                "Resend delivery email"
              ]}
              paymentLink="https://buy.stripe.com/dRm3cv0EV6BgeSKdLK1Nu1e"
            />
            <OrdinalCard
              plan="ordinal_collection"
              label="Collection (25 pieces)"
              price="$799"
              badge="Best Value"
              features={[
                "25 Bitcoin Ordinal inscriptions",
                "Batch inscription order",
                "Magic Eden collection listing",
                "AuthiChain brand certificate",
                "Co-marketing opportunity",
                "10% secondary royalties"
              ]}
              paymentLink="https://buy.stripe.com/eVq9AT5Zff7MbGy8rq1Nu1f"
            />
          </div>
          <p style={{color:'#444',fontSize:12,textAlign:'center',marginTop:16}}>
            Inscriptions use OrdinalsBot API. BTC miner fees included. Confirms within ~30 minutes on Bitcoin mainnet.
          </p>
        </div>

        {/* AuthiChain */}
        <div style={{marginTop:60,background:'#111',border:'1px solid rgba(201,162,39,.2)',borderRadius:16,padding:40,textAlign:'center'}}>
          <h2 style={{color:'#c9a227',fontWeight:700,marginBottom:8}}>Need blockchain authentication?</h2>
          <p style={{color:'#888',marginBottom:20}}>AuthiChain adds ERC-721 certificates of authenticity to every QRON code — now with Bitcoin L1 dual-chain proof.</p>
          <a href="https://authichain.com" style={{color:'#c9a227',fontWeight:700}}>Explore AuthiChain →</a>
        </div>
      </div>
    </div>
  )
}

// ── Paid tiers grid — single source of truth is lib/plans.ts ────────────────
function PricingCards() {
  const paidPlans = PLANS.filter(p => p.tier !== 'free')
  const freePlan = PLANS.find(p => p.tier === 'free')

  return (
    <>
      {/* Free tier — compact CTA strip */}
      {freePlan && (
        <div style={{marginBottom:32,textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:20,flexWrap:'wrap',justifyContent:'center',background:'#111',border:'1px solid rgba(201,162,39,.15)',borderRadius:12,padding:'14px 24px'}}>
            <div style={{textAlign:'left'}}>
              <div style={{color:'#888',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em'}}>Free</div>
              <div style={{color:'#e5e5e5',fontSize:14}}>{freePlan.generations} generations/month · {freePlan.features.slice(0,2).join(' · ')}</div>
            </div>
            <a href="/login" style={{background:'rgba(201,162,39,.1)',border:'1px solid rgba(201,162,39,.3)',color:'#c9a227',padding:'10px 20px',borderRadius:8,textDecoration:'none',fontWeight:700,fontSize:13,whiteSpace:'nowrap'}}>
              {freePlan.cta} →
            </a>
          </div>
        </div>
      )}

      {/* Paid tier grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
        {paidPlans.map(p => <PlanCard key={p.id} plan={p} />)}
      </div>
    </>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  const isSubscription = plan.stripe_mode === 'subscription'
  const periodLabel = isSubscription ? (plan.price_suffix || '/month') : ' one-time'
  const generationsLabel = plan.generations === 0
    ? 'Unlimited generations'
    : `${plan.generations.toLocaleString()} generations${isSubscription ? '/mo' : ' · never expire'}`

  return (
    <div style={{background:'#111',border:`1px solid ${plan.highlighted?'#c9a227':'rgba(201,162,39,.15)'}`,borderRadius:16,padding:32,position:'relative'}}>
      {plan.highlighted && (
        <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#c9a227',color:'#000',padding:'4px 16px',borderRadius:20,fontSize:12,fontWeight:700,whiteSpace:'nowrap'}}>
          MOST POPULAR
        </div>
      )}
      <div style={{color:'#888',fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:8}}>{plan.name}</div>
      <div style={{fontSize:'2.5rem',fontWeight:900,color:'#c9a227',lineHeight:1}}>
        ${plan.price}
        <span style={{fontSize:14,color:'#666'}}>{periodLabel}</span>
      </div>
      <div style={{color:'#aaa',fontSize:13,margin:'8px 0 4px',fontWeight:600}}>{generationsLabel}</div>
      <div style={{color:'#666',fontSize:12,margin:'0 0 20px',lineHeight:1.4}}>{plan.description}</div>
      <ul style={{listStyle:'none',padding:0,margin:'0 0 24px'}}>
        {plan.features.map((f,i) => <li key={i} style={{color:'#aaa',fontSize:13,padding:'6px 0',borderBottom:'1px solid #1a1a1a'}}>✓ {f}</li>)}
      </ul>
      <CheckoutModal plan={plan.id} label={plan.name} price={`$${plan.price}${periodLabel}`} />
    </div>
  )
}

function OrdinalCard({ plan, label, price, badge, features, paymentLink }: { plan:string, label:string, price:string, badge:string|null, features:string[], paymentLink:string }) {
  return (
    <div style={{background:'#0f0c07',border:'1px solid rgba(247,147,26,0.35)',borderRadius:16,padding:28,position:'relative'}}>
      {badge && (
        <div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#F7931A',color:'#000',padding:'4px 14px',borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:'nowrap'}}>
          {badge}
        </div>
      )}
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
        <span style={{fontSize:14}}>₿</span>
        <div style={{color:'#F7931A',fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em'}}>{label}</div>
      </div>
      <div style={{fontSize:'2rem',fontWeight:900,color:'#F7931A',marginBottom:12}}>{price}</div>
      <ul style={{listStyle:'none',padding:0,margin:'0 0 20px'}}>
        {features.map((f,i) => <li key={i} style={{color:'#aaa',fontSize:13,padding:'5px 0',borderBottom:'1px solid #1a1208'}}>₿ {f}</li>)}
      </ul>
      <a
        href={paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{display:'block',width:'100%',background:'#F7931A',color:'#000',border:'none',borderRadius:10,padding:'13px',fontSize:15,fontWeight:700,cursor:'pointer',textAlign:'center',textDecoration:'none',boxSizing:'border-box'}}
      >
        Get {label} →
      </a>
      <p style={{color:'#555',fontSize:11,textAlign:'center',marginTop:8}}>Direct Stripe checkout · Confirms on Bitcoin in ~30 min</p>
    </div>
  )
}
