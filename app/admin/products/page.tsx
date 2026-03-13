export const dynamic = 'force-dynamic';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + New Product
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error.message}
        </div>
      )}

      {!products || products.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg">No products yet.</p>
          <Link href="/admin/products/new" className="text-blue-500 hover:underline mt-2 inline-block">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Manufacturer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Created</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{product.name}</div>
                    {product.model_number && (
                      <div className="text-sm text-slate-500">{product.model_number}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{product.manufacturer}</td>
                  <td className="px-6 py-4 text-slate-500">{product.category || '-'}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(product.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/certifications?product_id=${product.id}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Certify
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
