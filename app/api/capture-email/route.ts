import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    // Store in leads table (or create if not exists)
    await supabase.from('email_leads').upsert({
      email: email.toLowerCase().trim(),
      source: source || 'unknown',
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    }, { onConflict: 'email', ignoreDuplicates: true })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('email capture:', e)
    return NextResponse.json({ success: true }) // fail silently
  }
}
