import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, source, metadata } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // Store in email_leads
    await supabase.from('email_leads').upsert({
      email,
      source: source || 'homepage',
      metadata: metadata || {},
      converted: false
    }, { onConflict: 'email' })

    // Enroll in nurture drip (fire-and-forget)
    fetch('https://qron-automation.undone-k.workers.dev/enroll-nurture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).catch(() => {})

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('capture-email error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
