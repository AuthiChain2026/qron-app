-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  manufacturer TEXT NOT NULL,
  model_number TEXT,
  category TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_manufacturer ON products(manufacturer);
CREATE INDEX idx_products_category ON products(category);

-- Certifications table
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  serial_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','revoked')),
  qr_data TEXT,
  qr_image_url TEXT,
  seal_svg_url TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  revoked_by TEXT,
  revoked_at TIMESTAMPTZ,
  revocation_reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  issued_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_certifications_product_id ON certifications(product_id);
CREATE INDEX idx_certifications_serial_number ON certifications(serial_number);
CREATE INDEX idx_certifications_status ON certifications(status);

-- QRON Codes table
CREATE TABLE qron_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_qron_codes_product_id ON qron_codes(product_id);
CREATE INDEX idx_qron_codes_certification_id ON qron_codes(certification_id);
CREATE INDEX idx_qron_codes_code ON qron_codes(code);

-- Verification Logs table
CREATE TABLE verification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  payload TEXT NOT NULL,
  signature TEXT NOT NULL,
  trust_score INT NOT NULL,
  authichain_status TEXT,
  verification_token TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_verification_logs_product_id ON verification_logs(product_id);
CREATE INDEX idx_verification_logs_verification_token ON verification_logs(verification_token);

-- Ownership Claims table
CREATE TABLE ownership_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL,
  claimed_at TIMESTAMPTZ DEFAULT NOW(),
  verification_token TEXT NOT NULL
);

CREATE INDEX idx_ownership_claims_product_id ON ownership_claims(product_id);
CREATE INDEX idx_ownership_claims_owner_id ON ownership_claims(owner_id);

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at on products, certifications and qron_codes
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
BEFORE UPDATE ON certifications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_qron_codes_updated_at
BEFORE UPDATE ON qron_codes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sequence and function for generating certification serial numbers
CREATE SEQUENCE certification_serial_seq START 1000;

CREATE OR REPLACE FUNCTION generate_serial_number()
RETURNS TEXT AS $$
DECLARE
  seq_val BIGINT;
  year_code TEXT;
  serial TEXT;
BEGIN
  seq_val := nextval('certification_serial_seq');
  year_code := TO_CHAR(NOW(), 'YY');
  serial := 'QRON-' || year_code || '-' || LPAD(seq_val::TEXT, 8, '0');
  RETURN serial;
END;
$$ LANGUAGE plpgsql;
