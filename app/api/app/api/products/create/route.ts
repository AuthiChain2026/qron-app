import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'
import nacl from 'tweetnacl'
import { encodeUTF8 } from 'tweetnacl-util'

// Initialize Supabase client (service role recommended for server-side routes)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Load Ed25519 private key from environment variable
// Must be a 64-byte hex string
const PRIVATE_KEY_HEX = process.env.QRON_PRIVATE_KEY!
const PRIVATE_KEY = Buffer.from(PRIVATE_KEY_HEX, 'hex')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description, brand, metadata } = body

    if (!name || !brand) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create product record in Supabase
    const productId = randomUUID()

    const { error: insertError } = await supabase.from('products').insert({
      id: productId,
      name,
      description,
      brand,
      metadata,
    })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Deterministic payload for QRON signing
    const payload = JSON.stringify({
      product_id: productId,
      brand,
      ts: Date.now(),
    })

    // Sign payload using Ed25519
    const signature = nacl.sign.detached(
      encodeUTF8(payload),
      PRIVATE_KEY
    )

    const signatureHex = Buffer.from(signature).toString('hex')

    // Return unsigned payload + signature for QRON generation
    return NextResponse.json({
      ok: true,
      product_id: productId,
      payload,
      signature: signatureHex,
      qron_url: `qron://${productId}?sig=${signatureHex}`,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
