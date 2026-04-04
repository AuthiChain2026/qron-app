# AuthiChain API — RapidAPI Marketplace Submission Guide

## Overview

Submit the AuthiChain Product Verification API to [RapidAPI Hub](https://rapidapi.com/provider) to generate passive API subscription revenue.

- **Spec Version**: 2.5.0
- **Endpoints**: 11 paths (15 operations)
- **Pricing Tiers**: $0 / $299 / $599 / $799 per month
- **Category**: Data > Blockchain

---

## Step-by-Step Submission

### 1. Create Provider Account

1. Go to [rapidapi.com/provider](https://rapidapi.com/provider)
2. Sign in or create a RapidAPI account
3. Complete provider profile:
   - **Provider Name**: AuthiChain
   - **Website**: https://authichain.com
   - **Email**: authichain@gmail.com
   - **Logo**: Upload from https://authichain.com/logo.png

### 2. Add New API

1. Click **"Add New API"** in the provider dashboard
2. Select **"Import from OpenAPI Spec"**
3. Upload `docs/rapidapi-openapi-v2.5.0.yaml` OR paste the URL:
   ```
   https://authichain.com/openapi.json
   ```
4. RapidAPI will parse the spec and create endpoint definitions automatically

### 3. Configure API Settings

| Setting | Value |
|---------|-------|
| **API Name** | AuthiChain Product Verification |
| **API Slug** | `authichain-product-verification` |
| **Category** | Data > Blockchain |
| **Short Description** | Verify product authenticity in real-time using blockchain. Anti-counterfeit API for luxury, pharma & electronics. |
| **Long Description** | *(use the description from the OpenAPI spec)* |
| **Base URL** | `https://authichain.com/api/v1` |
| **Logo** | https://authichain.com/logo.png |

### 4. Configure Authentication

RapidAPI handles authentication automatically via proxy:
- **Header**: `X-RapidAPI-Key` (auto-injected by RapidAPI)
- **Header**: `X-RapidAPI-Host` → `authichain-product-verification.p.rapidapi.com`

On the AuthiChain server side, validate incoming requests by checking:
```javascript
// middleware/rapidapi.js
function validateRapidAPI(req, res, next) {
  const rapidApiProxy = req.headers['x-rapidapi-proxy-secret'];
  if (rapidApiProxy !== process.env.RAPIDAPI_PROXY_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
}
```

Set `RAPIDAPI_PROXY_SECRET` in your environment from the RapidAPI provider dashboard.

### 5. Configure Pricing Plans

| Plan | Price | Requests/Month | Overage | Target |
|------|-------|----------------|---------|--------|
| **Basic** | Free | 50 | — | Testing & evaluation |
| **Starter** | $299/mo | 5,000 | $0.08/call | Startups, small marketplaces |
| **Business** | $599/mo | 25,000 | $0.04/call | Growing platforms |
| **Enterprise** | $799/mo | 100,000 | $0.02/call | Enterprise volume |

In the RapidAPI dashboard:
1. Go to **Monetization** → **Pricing**
2. Create each plan with the rate limits above
3. Enable overage billing for paid plans

### 6. Test Endpoints

Before publishing, test each endpoint in the RapidAPI dashboard:

```bash
# Quick test via RapidAPI
curl -X GET "https://authichain-product-verification.p.rapidapi.com/verify?id=AC-LVMH-2024-001" \
  -H "X-RapidAPI-Key: YOUR_KEY" \
  -H "X-RapidAPI-Host: authichain-product-verification.p.rapidapi.com"
```

Verify all 11 paths respond correctly:
- [x] `GET /verify` — single product verification
- [x] `POST /verify` — verification with NFC hash
- [x] `POST /verify/batch` — batch verification
- [x] `POST /scan` — QR/NFC scan verification
- [x] `GET /products/{productId}` — product details
- [x] `GET /products/{productId}/history` — scan history
- [x] `GET /products/{productId}/certificate` — authenticity certificate
- [x] `GET /brands` — list brands
- [x] `GET /brands/{brandId}/products` — brand products
- [x] `POST /register` — register product on blockchain
- [x] `GET /analytics/summary` — verification analytics
- [x] `GET /health` — health check (no auth)

### 7. Publish

1. Review all settings in the RapidAPI dashboard
2. Click **"Make API Public"** or **"Request Review"**
3. RapidAPI typically reviews within 1-3 business days
4. Once approved, API is live on the marketplace

---

## Revenue Projections

| Scenario | Subscribers | Monthly Revenue |
|----------|-------------|-----------------|
| Conservative | 5 Starter + 2 Business | $2,693/mo |
| Moderate | 10 Starter + 5 Business + 2 Enterprise | $7,588/mo |
| Growth | 20 Starter + 10 Business + 5 Enterprise | $15,975/mo |

*Plus overage revenue from high-volume users.*

---

## Server-Side Checklist

Before submission, ensure the AuthiChain server:

- [ ] All 11 API endpoints are deployed and responding
- [ ] CORS headers allow RapidAPI proxy origin
- [ ] Rate limiting is implemented per plan tier
- [ ] `RAPIDAPI_PROXY_SECRET` environment variable is set
- [ ] Proxy secret validation middleware is active
- [ ] Error responses follow the OpenAPI spec format
- [ ] Health endpoint returns correct version (2.5.0)

---

## Files

| File | Purpose |
|------|---------|
| `docs/rapidapi-openapi-v2.5.0.yaml` | OpenAPI 3.0.3 spec for RapidAPI import (v2.5.0, 11 paths) |
| `docs/rapidapi-openapi.yaml` | Previous v1.0.0 spec (archived) |
| `outputs/authichain-openapi.json` | Full API spec (JSON format) |

---

## Support

- **Email**: authichain@gmail.com
- **Website**: https://authichain.com
- **API Docs**: https://authichain.com/api/v1
