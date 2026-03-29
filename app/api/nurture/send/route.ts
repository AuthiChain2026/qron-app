import { NextRequest, NextResponse } from 'next/server'
import { getNextEmail } from '@/lib/nurture-sequences'
import type { SequenceId } from '@/lib/nurture-sequences'

export const dynamic = 'force-dynamic'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ''
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'hello@qron.space'
const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''

async function sendViaSendGrid(to: string, subject: string, html: string, text: string) {
  if (!SENDGRID_API_KEY) {
    console.log('[nurture] SENDGRID_API_KEY not set — skipping:', subject, '->', to)
    return false
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL, name: 'QRON' },
      subject,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html },
      ],
    }),
  })

  if (!res.ok) {
    console.error('[nurture] SendGrid error:', await res.text())
    return false
  }
  return true
}

async function updateHubSpotTimestamp(email: string) {
  if (!HUBSPOT_TOKEN) return
  const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
    method: 'POST',
    headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
    }),
  })
  const data = await searchRes.json()
  const contactId = data.results?.[0]?.id
  if (!contactId) return

  await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ properties: { notes_last_contacted: new Date().toISOString() } }),
  })
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const adminSecret = process.env.ADMIN_SECRET || process.env.CRON_SECRET
  if (adminSecret && authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Batch mode
    if (body.contacts && Array.isArray(body.contacts)) {
      const results = []
      for (const c of body.contacts) {
        results.push(await processContact(c))
      }
      return NextResponse.json({ results, processed: results.length })
    }

    return NextResponse.json(await processContact(body))
  } catch (err) {
    console.error('[nurture] Error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

async function processContact(contact: {
  email: string
  sequence_id?: SequenceId
  emails_sent?: string[]
}) {
  const { email, sequence_id = 'new_lead', emails_sent = [] } = contact
  const nextEmail = getNextEmail(sequence_id, emails_sent)

  if (!nextEmail) {
    return { email, status: 'complete' }
  }

  const sent = await sendViaSendGrid(email, nextEmail.subject, nextEmail.html, nextEmail.text)

  if (sent) {
    await updateHubSpotTimestamp(email).catch(() => {})
    return { email, status: 'sent', emailId: nextEmail.id, subject: nextEmail.subject }
  }

  return { email, status: 'failed', emailId: nextEmail.id }
}
