import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { revoked_by, revocation_reason } = await request.json();

    const { data, error } = await supabase
      .from('certifications')
      .update({
        status: 'revoked',
        revoked_by,
        revoked_at: new Date().toISOString(),
        revocation_reason,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
