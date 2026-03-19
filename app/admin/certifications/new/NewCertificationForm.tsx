'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  model_number?: string;
}

interface Props {
  products: Product[];
  fetchError?: string;
}

export default function NewCertificationForm({ products, fetchError }: Props) {
  const router = useRouter();
  const [productId, setProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      setError('Please select a product.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create certification');
      router.push('/admin/certifications');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create New Certification</h1>
        <Link href="/admin/certifications" className="text-slate-600 hover:text-slate-900">
          &larr; Back to Certifications
        </Link>
      </div>

      {fetchError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Failed to load products: {fetchError}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <label className="block text-sm font-medium mb-2">
            Product <span className="text-red-500">*</span>
          </label>
          {products.length === 0 ? (
            <p className="text-slate-500 text-sm">
              No products available.{' '}
              <Link href="/admin/products/new" className="text-blue-600 hover:underline">
                Create a product first
              </Link>
              .
            </p>
          ) : (
            <select
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">— Select a product —</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — {product.manufacturer}
                  {product.model_number ? ` (${product.model_number})` : ''}
                </option>
              ))}
            </select>
          )}
        </div>

        <p className="text-sm text-slate-500">
          A unique serial number will be generated automatically. The certification will start in
          <span className="font-semibold"> pending</span> status and must be approved before a QR
          seal is issued.
        </p>

        <button
          type="submit"
          disabled={isLoading || products.length === 0}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Creating...' : 'Create Certification'}
        </button>
      </form>
    </>
  );
}
