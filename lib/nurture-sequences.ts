// ─── QRON Nurture Email Sequences ────────────────────────────────────────────
// Sent via SendGrid. Triggered by Make.com automation scenarios.

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://qron.space'

export type SequenceId = 'new_lead' | 'free_user' | 'abandoned_checkout' | 'upsell'

export interface NurtureEmail {
  id: string
  subject: string
  delayDays: number
  html: string
  text: string
}

export interface NurtureSequence {
  id: SequenceId
  name: string
  emails: NurtureEmail[]
}

function qronWrap(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    body{font-family:Arial,sans-serif;background:#0a0a0a;color:#ededed;margin:0;padding:0}
    .wrap{max-width:600px;margin:0 auto;padding:40px 24px}
    .logo{text-align:center;margin-bottom:28px;}
    .logo span{color:#c9a227;font-size:32px;font-weight:900;letter-spacing:-1px;}
    .logo p{color:#6b6b6b;font-size:12px;margin:4px 0 0;}
    .card{background:#111;border:1px solid rgba(201,162,39,0.15);border-radius:12px;padding:32px;margin:24px 0}
    .btn{display:inline-block;background:linear-gradient(135deg,#c9a227,#a07c10);color:#000!important;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:800;font-size:15px}
    .muted{color:#6b6b6b;font-size:12px}
    .gold{color:#c9a227}
    hr{border:none;border-top:1px solid rgba(201,162,39,0.15);margin:24px 0}
  </style></head><body><div class="wrap">
    <div class="logo"><span>QRON</span><p>by AuthiChain Protocol</p></div>
    ${body}
    <hr>
    <p class="muted" style="text-align:center">
      <a href="https://qron.space" style="color:#c9a227;text-decoration:none;">qron.space</a> &middot;
      <a href="https://authichain.com" style="color:#c9a227;text-decoration:none;">authichain.com</a>
    </p>
  </div></body></html>`
}

export const SEQUENCES: NurtureSequence[] = [
  {
    id: 'new_lead',
    name: 'New Lead Welcome',
    emails: [
      {
        id: 'qron_new_1',
        subject: 'Welcome to QRON — Your 10 Free AI QR Codes Await',
        delayDays: 0,
        html: qronWrap(`
          <div class="card">
            <h1 style="color:#fff;margin:0 0 12px;">Welcome to QRON</h1>
            <p style="color:#9e9e9e;">You've got <strong style="color:#c9a227;">10 free AI QR code generations</strong>. Here's how to get started:</p>
            <ol style="line-height:2.2;color:#c8c8c8;">
              <li><a href="${APP_URL}/login" style="color:#c9a227;">Create your account</a></li>
              <li>Enter any URL and choose a style</li>
              <li>AI generates a stunning, scannable QR art piece</li>
              <li>Download or share instantly</li>
            </ol>
            <div style="text-align:center;margin:24px 0;">
              <a href="${APP_URL}/login" class="btn">Create Your First QRON &rarr;</a>
            </div>
          </div>`),
        text: `Welcome to QRON! You have 10 free AI QR code generations. Get started: ${APP_URL}/login`,
      },
      {
        id: 'qron_new_2',
        subject: '5 Ways to Use AI QR Codes for Your Brand',
        delayDays: 3,
        html: qronWrap(`
          <div class="card">
            <h2 style="color:#fff;margin:0 0 12px;">5 Powerful Uses for QRONs</h2>
            <ol style="line-height:2.2;color:#c8c8c8;">
              <li><strong class="gold">Product Packaging</strong> — Replace boring QR codes with branded art</li>
              <li><strong class="gold">Business Cards</strong> — Stand out with a QR portrait</li>
              <li><strong class="gold">Marketing Materials</strong> — 25% more scans vs standard QR</li>
              <li><strong class="gold">Event Tickets</strong> — Unique, collectible QR art for each attendee</li>
              <li><strong class="gold">Social Media</strong> — Eye-catching link-in-bio QR codes</li>
            </ol>
            <div style="text-align:center;margin:24px 0;">
              <a href="${APP_URL}" class="btn">Try It Now &rarr;</a>
            </div>
          </div>`),
        text: `5 ways to use QRON AI QR codes. Try now: ${APP_URL}`,
      },
      {
        id: 'qron_new_3',
        subject: 'Upgrade to Pro — 100 QRONs for $29',
        delayDays: 7,
        html: qronWrap(`
          <div class="card">
            <h2 style="color:#fff;margin:0 0 12px;">Ready for More?</h2>
            <p style="color:#9e9e9e;">Love your QRONs? Upgrade to the Starter Pack:</p>
            <div style="background:rgba(201,162,39,0.05);border:1px solid rgba(201,162,39,0.15);border-radius:8px;padding:16px;margin:16px 0;">
              <p style="margin:0 0 8px;"><strong class="gold">Starter Pack — $29</strong></p>
              <ul style="color:#c8c8c8;margin:0;padding-left:20px;">
                <li>100 AI QR generations (never expire)</li>
                <li>Holographic &amp; Memory modes</li>
                <li>Ed25519 AuthiChain verification</li>
              </ul>
            </div>
            <div style="text-align:center;margin:24px 0;">
              <a href="${APP_URL}/pricing" class="btn">View Plans &rarr;</a>
            </div>
          </div>`),
        text: `Upgrade to QRON Starter: 100 generations for $29. ${APP_URL}/pricing`,
      },
      {
        id: 'qron_new_4',
        subject: 'Your QRONs Miss You — New Styles Available',
        delayDays: 14,
        html: qronWrap(`
          <div class="card">
            <h2 style="color:#fff;margin:0 0 12px;">New Styles Just Dropped</h2>
            <p style="color:#9e9e9e;">We've added new AI styles to QRON. Come back and try:</p>
            <ul style="line-height:2;color:#c8c8c8;">
              <li>Cyberpunk neon aesthetics</li>
              <li>Watercolor paintings</li>
              <li>Miniature tilt-shift worlds</li>
              <li>Luxury gold-embossed seals</li>
            </ul>
            <p style="color:#9e9e9e;">Your free generations are still waiting.</p>
            <div style="text-align:center;margin:24px 0;">
              <a href="${APP_URL}" class="btn">Generate a QRON &rarr;</a>
            </div>
          </div>`),
        text: `New QRON styles available! Generate: ${APP_URL}`,
      },
    ],
  },
  {
    id: 'abandoned_checkout',
    name: 'Abandoned Checkout',
    emails: [
      {
        id: 'qron_abandon_1',
        subject: 'Complete Your QRON Purchase',
        delayDays: 0,
        html: qronWrap(`
          <div class="card">
            <h2 style="color:#fff;margin:0 0 12px;">Your QRON Pack is Waiting</h2>
            <p style="color:#9e9e9e;">Looks like you started a purchase but didn't finish. Your selection is still saved.</p>
            <div style="text-align:center;margin:24px 0;">
              <a href="${APP_URL}/pricing" class="btn">Complete Purchase &rarr;</a>
            </div>
          </div>`),
        text: `Complete your QRON purchase: ${APP_URL}/pricing`,
      },
      {
        id: 'qron_abandon_2',
        subject: 'RETURN10 — 10% Off Your QRON Pack',
        delayDays: 2,
        html: qronWrap(`
          <div class="card">
            <h2 style="color:#fff;margin:0 0 12px;">Here's 10% Off</h2>
            <p style="color:#9e9e9e;">Use code <strong class="gold">RETURN10</strong> at checkout:</p>
            <div style="text-align:center;margin:24px 0;">
              <div style="display:inline-block;background:rgba(201,162,39,0.1);border:2px dashed #c9a227;border-radius:8px;padding:12px 24px;">
                <span style="font-size:24px;font-weight:700;color:#c9a227;">RETURN10</span>
              </div>
            </div>
            <div style="text-align:center;">
              <a href="${APP_URL}/pricing" class="btn">Claim Discount &rarr;</a>
            </div>
          </div>`),
        text: `10% off QRON with RETURN10. ${APP_URL}/pricing`,
      },
    ],
  },
  {
    id: 'upsell',
    name: 'Customer Upsell',
    emails: [
      {
        id: 'qron_upsell_1',
        subject: 'Go Unlimited with QRON Business',
        delayDays: 14,
        html: qronWrap(`
          <div class="card">
            <h2 style="color:#fff;margin:0 0 12px;">Unlimited QRONs — $49/month</h2>
            <p style="color:#9e9e9e;">You've been creating great QRONs. Go unlimited with Business:</p>
            <ul style="line-height:2;color:#c8c8c8;">
              <li>Unlimited generations</li>
              <li>All modes including Enterprise</li>
              <li>API access (1,000 calls/mo)</li>
              <li>AuthiChain verification dashboard</li>
              <li>5 team seats</li>
            </ul>
            <div style="text-align:center;margin:24px 0;">
              <a href="${APP_URL}/pricing" class="btn">Start Business Plan &rarr;</a>
            </div>
          </div>`),
        text: `Go unlimited with QRON Business: $49/mo. ${APP_URL}/pricing`,
      },
    ],
  },
]

export function getNextEmail(sequenceId: SequenceId, emailsSent: string[]): NurtureEmail | null {
  const sequence = SEQUENCES.find(s => s.id === sequenceId)
  if (!sequence) return null
  for (const email of sequence.emails) {
    if (!emailsSent.includes(email.id)) return email
  }
  return null
}
