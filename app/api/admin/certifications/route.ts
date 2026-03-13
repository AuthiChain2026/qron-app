import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { product_id, metadata } = await request.json();

    // Generate serial number using DB function
    const { data: serialData, error: serialError } = await supabase
      .rpc('generate_serial_number');
    if (serialError) throw serialError;

    const { data, error } = await supabase
      .from('certifications')
      .insert({
        product_id,
        serial_number: serialData,
        status: 'pending',
        metadata: metadata || {},
      })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabase
      .from('certifications')
      .select('*, products(*)')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
