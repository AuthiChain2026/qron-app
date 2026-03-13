import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateQRWithSeal } from '@/lib/qr-generator';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { approved_by } = await request.json();

    // Get certification with product data
    const { data: cert, error: certError } = await supabase
      .from('certifications')
      .select('*, products(*)')
      .eq('id', params.id)
      .single();
    if (certError) throw certError;

    if (cert.status !== 'pending') {
      return NextResponse.json(
        { error: 'Certification is not in pending status' },
        { status: 400 }
      );
    }

    // Generate QR code and seal
    const qrData = `https://qron.space/p/${cert.serial_number}`;
    const { qrImageUrl, sealSvgUrl } = await generateQRWithSeal({
      data: qrData,
      serialNumber: cert.serial_number,
      productName: cert.products.name,
      manufacturer: cert.products.manufacturer,
    });

    // Update certification to approved
    const { data, error } = await supabase
      .from('certifications')
      .update({
        status: 'approved',
        qr_data: qrData,
        qr_image_url: qrImageUrl,
        seal_svg_url: sealSvgUrl,
        approved_by,
        approved_at: new Date().toISOString(),
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
