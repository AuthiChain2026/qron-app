import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { serial: string } }
) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*, products(*)')
      .eq('serial_number', params.serial)
      .single();
    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Certification not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
