export interface Product {
  id: string;
  name: string;
  description?: string;
  manufacturer: string;
  model_number?: string;
  category?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  product_id: string;
  serial_number: string;
  status: 'pending' | 'approved' | 'revoked';
  qr_data?: string;
  qr_image_url?: string;
  seal_svg_url?: string;
  approved_by?: string;
  approved_at?: string;
  revoked_by?: string;
  revoked_at?: string;
  revocation_reason?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CertificationWithProduct extends Certification {
  product: Product;
}
