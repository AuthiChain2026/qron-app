/**
 * Demo: Supply Chain QRON
 * Problem: Global supply chains suffer from tamper, substitution, and diversion fraud across dozens of hand-offs, with importers and retailers unable to prove that what left the factory is what reached the dock.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: Every pallet and carton carries a QRON that signs every custody event — factory, port, customs, DC, retailer — on-chain with GPS and actor identity, flagging tamper attempts in real time and generating full audit trails on demand.
 */
'use client'

import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle, Ship, Package, Factory, AlertTriangle } from 'lucide-react'

const STEPS = [
  {
    icon: Factory,
    title: 'Factory seals with a QRON',
    body: 'At the line, each carton receives a QRON tied to batch, GPS, and the operator&rsquo;s AuthiChain identity. The seal is cryptographically bound from this point.',
  },
  {
    icon: Ship,
    title: 'Every handoff is signed',
    body: 'Port of origin, ocean leg, customs, and destination DC each scan and sign the transfer. AuthiChain records an immutable custody ledger.',
  },
  {
    icon: AlertTriangle,
    title: 'Tamper attempts raise alerts',
    body: 'If a seal is swapped, skipped, or duplicated anywhere on the route, AuthiChain flags the anomaly in real time to the operations team.',
  },
  {
    icon: Package,
    title: 'Retailer receives with confidence',
    body: 'The final scan at the store or DC confirms a complete, unbroken custody chain — and produces a customs- and insurance-ready audit trail on demand.',
  },
]

const OUTCOMES = [
  'Every hand-off signed on-chain with actor + GPS',
  'Real-time tamper, diversion, and skip detection',
  'One-click customs and insurance audit trails',
  'No EDI integration — works with a phone scan',
]

export default function SupplyChainDemoPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a', color: '#e8e8e8' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/demos" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: '#c9a227' }}>
          ← Back to industry demos
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
               style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#c9a227' }}>
            <Ship className="w-3.5 h-3.5" /> Industry · Supply Chain
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Supply Chain QRON — factory to dock, signed</h1>
          <p className="text-lg max-w-3xl" style={{ color: '#a8a8a8' }}>
            Global supply chains are drowning in tamper, substitution, and diversion fraud. QRON turns every pallet
            into a scannable identity with an immutable custody log, so shippers, carriers, and retailers can prove
            what left the factory is exactly what reached the dock.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <div key={i} className="rounded-2xl p-6"
                 style={{ background: '#0d0d0d', border: '1px solid rgba(201,162,39,0.15)' }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(201,162,39,0.1)', color: '#c9a227' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: '#6b6b6b' }}>Step {i + 1}</div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm" style={{ color: '#a8a8a8' }}>{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-8 mb-12"
             style={{ background: 'linear-gradient(180deg, rgba(201,162,39,0.08), rgba(201,162,39,0.02))', border: '1px solid rgba(201,162,39,0.3)' }}>
          <h2 className="text-2xl font-bold mb-4">What you get</h2>
          <ul className="space-y-2">
            {OUTCOMES.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#c9a227' }} />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: '#c9a227', color: '#0a0a0a' }}>
            Order a custom supply chain QRON <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/marketing/intake.md"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
            Book a supply chain briefing
          </Link>
        </div>
      </div>
    </main>
  )
}
