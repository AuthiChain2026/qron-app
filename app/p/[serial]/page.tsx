export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ serial: string }>;
}

export default async function CertificationPage({ params }: PageProps) {
  const { serial } = await params;
  const supabase = await createClient();
  const { data: cert, error } = await supabase
    .from('certifications')
    .select('*, products(*)')
    .eq('serial_number', serial)
    .single();

  if (error || !cert) {
    notFound();
  }

  const isValid = cert.status === 'approved';
  const isRevoked = cert.status === 'revoked';
  const isPending = cert.status === 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Status Badge */}
        <div className="text-center mb-8">
          {isValid && (
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Authentic
            </div>
          )}
          {isRevoked && (
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-6 py-3 rounded-full font-semibold">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Certification Revoked
            </div>
          )}
          {isPending && (
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full font-semibold">
              Pending Review
            </div>
          )}
        </div>

        {/* Seal Display */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex justify-center mb-6">
            {cert.seal_svg_url ? (
              <Image
                src={cert.seal_svg_url}
                alt="Certification Seal"
                width={600}
                height={700}
                className="max-w-full h-auto"
                unoptimized
              />
            ) : cert.qr_image_url ? (
              <Image
                src={cert.qr_image_url}
                alt="QR Code"
                width={300}
                height={300}
                className="max-w-full h-auto"
                unoptimized
              />
            ) : (
              <div className="w-64 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">QR Code Pending</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {cert.products.name}
          </h1>
          <p className="text-slate-600 mb-6">{cert.products.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Manufacturer</h3>
              <p className="text-lg text-slate-900">{cert.products.manufacturer}</p>
            </div>
            {cert.products.model_number && (
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Model Number</h3>
                <p className="text-lg text-slate-900">{cert.products.model_number}</p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Serial Number</h3>
              <p className="text-lg font-mono text-slate-900">{cert.serial_number}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Certified Date</h3>
              <p className="text-lg text-slate-900">
                {new Date(cert.approved_at || cert.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {isRevoked && cert.revocation_reason && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-semibold text-red-800 uppercase mb-1">Revocation Reason</h3>
              <p className="text-red-700">{cert.revocation_reason}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-400">
          <p>Powered by <a href="https://qron.space" className="text-blue-500 hover:underline">QRON</a> &bull; Blockchain-verified product authentication</p>
        </div>
      </div>
    </div>
  );
}
