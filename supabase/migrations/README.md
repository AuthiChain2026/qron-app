# Database Migrations

## Running Migrations

Apply the migrations to your Supabase project using the Supabase CLI:

```bash
supabase db push
```

Or run the SQL directly in the Supabase SQL Editor.

## Migration Files

### `20260306165900_initial_schema.sql`

Creates the full initial schema for the QRON certification system:

- **`products`** — Products registered for certification (name, manufacturer, model_number, category, metadata)
- **`certifications`** — Certification records linked to products, with serial numbers, status (`pending` / `approved` / `revoked`), QR data, seal URLs, and audit fields (approved_by, revoked_by, etc.)
- **`qron_codes`** — QRON codes linked to products and certifications
- **`verification_logs`** — Immutable log of every product verification event
- **`ownership_claims`** — Ownership claim records tied to products

Also creates:

- Indexes on all foreign keys and frequently-queried columns
- `update_updated_at_column()` trigger function and triggers on `products`, `certifications`, and `qron_codes`
- `certification_serial_seq` sequence and `generate_serial_number()` function that produces serials in the format `QRON-YY-00001000`

## Storage Buckets Required

The certification approval flow uploads generated assets to Supabase Storage. Create the following bucket before approving certifications:

| Bucket name      | Public | Notes                          |
|------------------|--------|--------------------------------|
| `certifications` | Yes    | Stores QR PNG images and SVG seals under `qr/` and `seals/` prefixes |
