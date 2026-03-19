'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Certification {
  id: string;
  serial_number: string;
  status: 'pending' | 'approved' | 'revoked';
  created_at: string;
  approved_at?: string;
  products: { name: string; manufacturer: string };
}

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await fetch('/api/admin/certifications');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCertifications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/certifications/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved_by: 'admin' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchCertifications();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevoke = async (id: string) => {
    const reason = prompt('Enter revocation reason:');
    if (!reason) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/certifications/${id}/revoke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revoked_by: 'admin', revocation_reason: reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchCertifications();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreate = async (productId: string) => {
    try {
      const res = await fetch('/api/admin/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await fetchCertifications();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    revoked: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-slate-600 hover:text-slate-900">
            &larr; Products
          </Link>
          <Link
            href="/admin/certifications/new"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + New Certification
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
      )}

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : certifications.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-lg">No certifications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Serial</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Product</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Created</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {certifications.map((cert) => (
                <tr key={cert.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-sm">{cert.serial_number}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{cert.products?.name}</div>
                    <div className="text-sm text-slate-500">{cert.products?.manufacturer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[cert.status]}`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(cert.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {cert.status === 'pending' && (
                        <button
                          onClick={() => handleApprove(cert.id)}
                          disabled={actionLoading === cert.id}
                          className="text-xs bg-green-600 text-white px-3 py-1 rounded font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoading === cert.id ? '...' : 'Approve'}
                        </button>
                      )}
                      {cert.status === 'approved' && (
                        <>
                          <a
                            href={`/p/${cert.serial_number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded font-medium hover:bg-blue-200"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleRevoke(cert.id)}
                            disabled={actionLoading === cert.id}
                            className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded font-medium hover:bg-red-200 disabled:opacity-50"
                          >
                            {actionLoading === cert.id ? '...' : 'Revoke'}
                          </button>
                        </>
                      )}
                    </div>
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
