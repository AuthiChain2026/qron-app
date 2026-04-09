/**
 * Demo: Cannabis QRON
 * Problem: Legal cannabis consumers and dispensaries cannot easily verify seed-to-sale provenance, lab results, or licensed origin — exposing regulated markets to diversion, untested product, and regulator penalties.
 * Solution: AuthiChain verifies authenticity in 2.1 seconds using QRON identities.
 * Business Value: Every package ships with a branded QRON that links to cultivator licence, lab results, and terpene profile, enabling compliant dispensary scanning, brand loyalty, and regulator-ready audit trails across state lines.
 */
'use client'

import Link from 'next/link'
import { Shield, ArrowRight, CheckCircle, Leaf, FlaskConical, MapPin, BadgeCheck } from 'lucide-react'

const STEPS = [
  {
    icon: Leaf,
    title: 'Cultivator mints the QRON',
    body: 'At packaging, the licensed cultivator mints a QRON bound to the batch, cultivar, and grow licence. The art reflects the strain family.',
  },
  {
    icon: FlaskConical,
    title: 'Lab results attach',
    body: 'THC/CBD potency, terpene profile, pesticide screens, and lab attestations are linked to the QRON and anchored to AuthiChain.',
  },
  {
    icon: MapPin,
    title: 'Dispensary scans to stock',
    body: 'Budtenders scan on receipt to confirm licensed origin and lab compliance before the product hits the shelf — no paperwork.',
  },
  {
    icon: BadgeCheck,
    title: 'Consumer verifies at purchase',
    body: 'Customers scan the QRON with any phone to see lab results, grow story, and licensed provenance in 2.1 seconds.',
  },
]

const OUTCOMES = [
  'Seed-to-sale provenance in one scan',
  'Lab results, terpenes, and licence bound to the package',
  'Regulator-ready audit trail for every SKU',
  'Branded strain art that doubles as a marketing asset',
]

export default function CannabisDemoPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a', color: '#e8e8e8' }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link href="/demos" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: '#c9a227' }}>
          ← Back to industry demos
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
               style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.3)', color: '#c9a227' }}>
            <Leaf className="w-3.5 h-3.5" /> Industry · Cannabis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cannabis QRON — seed to sale, lab to consumer</h1>
          <p className="text-lg max-w-3xl" style={{ color: '#a8a8a8' }}>
            Legal cannabis is one of the fastest-growing regulated categories in the world — and one of the hardest
            to audit. QRON binds every package to its cultivator licence, lab results, and terpene profile, giving
            dispensaries and consumers instant, scannable proof.
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
            Order a custom strain QRON <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/marketing/intake.md"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ background: 'transparent', border: '1px solid rgba(201,162,39,0.4)', color: '#c9a227' }}>
            Book a cannabis briefing
          </Link>
        </div>
      </div>
    </main>
  )
}
