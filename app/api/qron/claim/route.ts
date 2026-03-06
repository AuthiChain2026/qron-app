import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

// Supabase client (service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * QRON Ownership Claim Endpoint
 * --------------------------------
 * This endpoint allows a user to claim ownership of a product
 * after a successful QRON verification.
 *
 * Human-beneficial logic:
 *  - Prevents fraudulent ownership claims
 *  - Ensures transparent chain of custody
 *  - Protects consumer rights with audit logs
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product_id, owner_id, verification_token } = body

    if (!product_id || !owner_id || !verification_token) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Validate verification token
    const { data: lastVerification, error: verificationError } = await supabase
      .from('verification_logs')
      .select('*')
      .eq('product_id', product_id)
      .order('timestamp', { ascending: false })
      .limit(1)
      .single()

    if (verificationError || !lastVerification) {
      return NextResponse.json({ error: 'No verification record found' }, { status: 400 })
    }

    if (lastVerification.verification_token !== verification_token) {
      return NextResponse.json({ error: 'Invalid verification token' }, { status: 403 })
    }

    // Create ownership claim record
    const claimId = randomUUID()

    const { error: claimError } = await supabase.from('ownership_claims').insert({
      id: claimId,
      product_id,
      owner_id,
      claimed_at: new Date().toISOString(),
      verification_token,
    })

    if (claimError) {
      return NextResponse.json({ error: claimError.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      claim_id: claimId,
      message: 'Ownership successfully claimed',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
