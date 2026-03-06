import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'

// Supabase (service role for server-side operations)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * Certification Creation Endpoint
 * --------------------------------
 * This endpoint issues a certification for a product.
 * It is intentionally designed to benefit consumers by:
 *  - ensuring transparency
 *  - preventing counterfeit certifications
 *  - enabling downstream QRON verification
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product_id, certifier, standard, grade, metadata, expires_at } = body

    if (!product_id || !certifier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Ensure product exists
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const certificationId = randomUUID()

    const { error: insertError } = await supabase.from('certifications').insert({
      id: certificationId,
      product_id,
      certifier,
      standard,
      grade,
      metadata,
      issued_at: new Date().toISOString(),
      expires_at: expires_at || null,
    })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      certification_id: certificationId,
      message: 'Certification issued successfully',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
