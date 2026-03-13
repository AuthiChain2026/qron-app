import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { revoked_by, revocation_reason } = await request.json();

    const { data, error } = await supabase
      .from('certifications')
      .update({
        status: 'revoked',
        revoked_by,
        revoked_at: new Date().toISOString(),
        revocation_reason,
      })
      .eq('id', params.id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
