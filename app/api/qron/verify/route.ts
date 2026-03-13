import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nacl from 'tweetnacl'
import { decodeUTF8 } from 'tweetnacl-util'

/**
 * QRON Verification Endpoint
 * --------------------------------
 * Hybrid verification flow:
 *  1. Validate QRON signature (Ed25519)
 *  2. Lookup product + certification in Supabase
 *  3. Call AuthiChain API for deeper verification
 *  4. Compute hybrid trust score
 *  5. Log verification event
 */
export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const PUBLIC_KEY = Buffer.from(process.env.QRON_PUBLIC_KEY!, 'hex')

  try {
    const body = await req.json()
    const { product_id, payload, signature } = body

    if (!product_id || !payload || !signature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify Ed25519 signature
    const signatureBytes = Buffer.from(signature, 'hex')
    const payloadBytes = decodeUTF8(payload)

    const isValid = nacl.sign.detached.verify(
      payloadBytes,
      signatureBytes,
      PUBLIC_KEY
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    // Lookup product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Lookup certification
    const { data: certification } = await supabase
      .from('certifications')
      .select('*')
      .eq('product_id', product_id)
      .order('issued_at', { ascending: false })
      .limit(1)
      .single()

    // Call AuthiChain API for deeper verification
    const authichainRes = await fetch(`${process.env.AUTHICHAIN_API_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id, payload, signature })
    })

    const authichainData = await authichainRes.json()

    // Compute hybrid trust score
    const trustScore = (() => {
      let score = 0
      if (isValid) score += 40
      if (product) score += 20
      if (certification) score += 20
      if (authichainData?.verified) score += 20
      return score
    })()

    // Log verification event
    const verificationToken = crypto.randomUUID()

    await supabase.from('verification_logs').insert({
      product_id,
      payload,
      signature,
      trust_score: trustScore,
      authichain_status: authichainData?.status || null,
      verification_token: verificationToken,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      ok: true,
      product,
      certification,
      authichain: authichainData,
      trust_score: trustScore,
      verification_token: verificationToken,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
