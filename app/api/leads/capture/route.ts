import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const MAKE_WEBHOOK_URL = process.env.MAKE_LEAD_WEBHOOK_URL || ''
const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || ''

interface LeadData {
  email: string
  name?: string
  source?: string
  page_url?: string
  product_interest?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

async function syncToHubSpot(lead: LeadData) {
  if (!HUBSPOT_TOKEN) return null

  const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
    method: 'POST',
    headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: lead.email }] }],
    }),
  })
  const searchData = await searchRes.json()

  const properties: Record<string, string> = {
    email: lead.email,
    hs_lead_status: 'NEW',
    lifecyclestage: 'lead',
    lead_score: '10',
  }

  if (lead.name) {
    const parts = lead.name.split(' ')
    properties.firstname = parts[0]
    if (parts.length > 1) properties.lastname = parts.slice(1).join(' ')
  }

  if (searchData.results?.length > 0) {
    const id = searchData.results[0].id
    const currentScore = parseInt(searchData.results[0].properties?.lead_score || '0', 10)
    properties.lead_score = String(currentScore + 10)

    await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    })
    return id
  } else {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    })
    const created = await res.json()
    return created.id || null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadData = await req.json()
    if (!body.email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Sync to Supabase profile (if user exists)
    let profileCreated = false
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (supabaseUrl && serviceKey) {
        const supabase = createClient(supabaseUrl, serviceKey)
        // Check if profile exists by email in auth.users
        const { data: users } = await supabase.auth.admin.listUsers({ perPage: 1 })
        const existingUser = (users?.users || []).find(u => u.email === body.email)

        if (!existingUser) {
          // Store as a lead in a leads table or just track the event
          await supabase.from('lead_captures').insert({
            email: body.email,
            name: body.name || null,
            source: body.source || 'website',
            page_url: body.page_url || null,
            utm_source: body.utm_source || null,
            utm_medium: body.utm_medium || null,
            utm_campaign: body.utm_campaign || null,
            created_at: new Date().toISOString(),
          }).then(() => { profileCreated = true })
            .catch(() => { /* table might not exist yet, that's ok */ })
        }
      }
    } catch {
      // Supabase sync is best-effort
    }

    // Sync to HubSpot and Make.com in parallel
    const [hubspotId] = await Promise.all([
      syncToHubSpot(body).catch(err => {
        console.error('[lead-capture] HubSpot error:', err)
        return null
      }),
      MAKE_WEBHOOK_URL ? fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          event: 'lead_captured',
          product_interest: 'qron',
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {}) : Promise.resolve(),
    ])

    return NextResponse.json({ ok: true, hubspotId, profileCreated })
  } catch (err) {
    console.error('[lead-capture] Error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
