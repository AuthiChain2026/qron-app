import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | QRON by AuthiChain',
  description: 'Privacy Policy for QRON (qron.space). Learn how we collect, use, and protect your personal information.',
  openGraph: { title: 'Privacy Policy | QRON by AuthiChain', description: 'Privacy Policy for QRON (qron.space). Learn how we collect, use, and protect your personal information.', url: 'https://qron.space/privacy', type: 'website' },
  alternates: { canonical: 'https://qron.space/privacy' },
}

const sectionStyle: React.CSSProperties = { marginBottom: '40px' }
const h2Style: React.CSSProperties = { fontSize: '1.3rem', fontWeight: 700, marginBottom: '14px', color: '#e5e5e5' }
const h3Style: React.CSSProperties = { fontSize: '1.05rem', fontWeight: 600, marginBottom: '10px', color: '#ccc' }
const pStyle: React.CSSProperties = { fontSize: '15px', color: '#999', lineHeight: 1.75, marginBottom: '12px' }
const ulStyle: React.CSSProperties = { fontSize: '15px', color: '#999', lineHeight: 1.75, paddingLeft: '24px', marginBottom: '12px' }
const tableWrapStyle: React.CSSProperties = { overflowX: 'auto', marginBottom: '16px' }
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: '14px' }
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid #222', color: '#ccc', fontWeight: 600 }
const tdStyle: React.CSSProperties = { padding: '10px 14px', borderBottom: '1px solid #1a1a1a', color: '#999' }

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '4px' }}>Effective Date: April 12, 2026</p>
        <p style={{ fontSize: '14px', color: '#555' }}>
          QRON (qron.space) is operated by AuthiChain, Michigan, USA
        </p>
      </section>

      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px 80px' }}>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Introduction</h2>
          <p style={pStyle}>
            AuthiChain (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates QRON at qron.space (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Service.
          </p>
          <p style={pStyle}>
            By using QRON, you consent to the data practices described in this policy. If you do not agree with these practices, please do not use the Service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Information We Collect</h2>

          <h3 style={h3Style}>2.1 Information You Provide</h3>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#ccc' }}>Account information:</strong> Name, email address, and optional profile details when you create an account</li>
            <li><strong style={{ color: '#ccc' }}>Payment information:</strong> Billing details processed securely through Stripe. We do not store full credit card numbers on our servers.</li>
            <li><strong style={{ color: '#ccc' }}>Generated content:</strong> Text prompts, URLs, and configuration settings you provide to generate QR codes, as well as the resulting images</li>
            <li><strong style={{ color: '#ccc' }}>Blockchain addresses:</strong> Wallet addresses if you use optional NFT minting features on the Polygon network</li>
            <li><strong style={{ color: '#ccc' }}>Communications:</strong> Content of messages when you contact our support</li>
          </ul>

          <h3 style={h3Style}>2.2 Information Collected Automatically</h3>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#ccc' }}>Usage data:</strong> Pages visited, features used, generation history, timestamps, and interaction patterns</li>
            <li><strong style={{ color: '#ccc' }}>Device information:</strong> Browser type, operating system, screen resolution, and device identifiers</li>
            <li><strong style={{ color: '#ccc' }}>Network data:</strong> IP address, approximate geographic location, and referral URLs</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. Cookies and Tracking Technologies</h2>
          <p style={pStyle}>We use the following cookies and tracking technologies:</p>
          <div style={tableWrapStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Technology</th>
                  <th style={thStyle}>Provider</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>Auth cookies</td>
                  <td style={tdStyle}>Supabase</td>
                  <td style={tdStyle}>Session management and authentication</td>
                  <td style={tdStyle}>Essential</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Analytics</td>
                  <td style={tdStyle}>PostHog</td>
                  <td style={tdStyle}>Product analytics, feature usage, and session replay</td>
                  <td style={tdStyle}>Analytics</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Analytics</td>
                  <td style={tdStyle}>Google Analytics (GA4)</td>
                  <td style={tdStyle}>Traffic analysis, acquisition channels, and user behavior</td>
                  <td style={tdStyle}>Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            You can manage cookie preferences through your browser settings. Disabling essential cookies may affect the functionality of the Service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. How We Use Your Information</h2>
          <p style={pStyle}>We use the information we collect to:</p>
          <ul style={ulStyle}>
            <li>Provide, maintain, and improve the Service</li>
            <li>Process payments and manage subscriptions</li>
            <li>Authenticate users and secure accounts</li>
            <li>Generate AI QR codes based on your inputs</li>
            <li>Facilitate blockchain minting when requested</li>
            <li>Send transactional emails (receipts, account notifications)</li>
            <li>Analyze usage patterns to improve features and performance</li>
            <li>Detect and prevent fraud, abuse, or security incidents</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Third-Party Services</h2>
          <p style={pStyle}>
            We share data with the following third-party service providers, each of which processes data in accordance with their own privacy policies:
          </p>
          <div style={tableWrapStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Provider</th>
                  <th style={thStyle}>Purpose</th>
                  <th style={thStyle}>Data Shared</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>Stripe</td>
                  <td style={tdStyle}>Payment processing</td>
                  <td style={tdStyle}>Billing name, email, payment method details</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Supabase</td>
                  <td style={tdStyle}>Authentication and database</td>
                  <td style={tdStyle}>Account data, generated content metadata</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Fal.ai</td>
                  <td style={tdStyle}>AI image generation</td>
                  <td style={tdStyle}>Text prompts and generation parameters</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Polygon</td>
                  <td style={tdStyle}>Blockchain / NFT minting</td>
                  <td style={tdStyle}>Wallet addresses, token metadata</td>
                </tr>
                <tr>
                  <td style={tdStyle}>PostHog</td>
                  <td style={tdStyle}>Product analytics</td>
                  <td style={tdStyle}>Usage events, device info, anonymized user IDs</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Google Analytics</td>
                  <td style={tdStyle}>Traffic analytics</td>
                  <td style={tdStyle}>Page views, referral data, anonymized IP</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Vercel</td>
                  <td style={tdStyle}>Hosting and CDN</td>
                  <td style={tdStyle}>Request logs, IP addresses</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Cloudflare</td>
                  <td style={tdStyle}>DNS, CDN, and edge functions</td>
                  <td style={tdStyle}>Request metadata, IP addresses</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={pStyle}>
            We do not sell your personal information to third parties.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Data Retention</h2>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#ccc' }}>Account data:</strong> Retained for as long as your account is active, plus 30 days after deletion request</li>
            <li><strong style={{ color: '#ccc' }}>Generated images:</strong> Stored for the duration of your account. Free-tier images may be removed after 90 days of inactivity.</li>
            <li><strong style={{ color: '#ccc' }}>Payment records:</strong> Retained for 7 years as required for tax and legal compliance</li>
            <li><strong style={{ color: '#ccc' }}>Analytics data:</strong> Aggregated and anonymized data may be retained indefinitely. Identifiable analytics data is retained for up to 24 months.</li>
            <li><strong style={{ color: '#ccc' }}>Blockchain data:</strong> Data written to the Polygon blockchain is permanent and cannot be deleted due to the nature of blockchain technology.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Your Rights</h2>
          <p style={pStyle}>
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#ccc' }}>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong style={{ color: '#ccc' }}>Correction:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong style={{ color: '#ccc' }}>Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
            <li><strong style={{ color: '#ccc' }}>Portability:</strong> Request your data in a structured, machine-readable format</li>
            <li><strong style={{ color: '#ccc' }}>Restriction:</strong> Request that we limit how we process your data</li>
            <li><strong style={{ color: '#ccc' }}>Objection:</strong> Object to processing of your data for certain purposes</li>
            <li><strong style={{ color: '#ccc' }}>Withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time</li>
          </ul>
          <p style={pStyle}>
            To exercise any of these rights, contact us at <a href="mailto:z@authichain.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>z@authichain.com</a>. We will respond within 30 days.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. GDPR Compliance (EEA Users)</h2>
          <p style={pStyle}>
            If you are located in the European Economic Area (EEA), we process your personal data under the following legal bases:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#ccc' }}>Contractual necessity:</strong> Processing required to provide the Service you requested (account management, QR code generation, payment processing)</li>
            <li><strong style={{ color: '#ccc' }}>Legitimate interest:</strong> Analytics, fraud prevention, and service improvement, where our interests do not override your rights</li>
            <li><strong style={{ color: '#ccc' }}>Consent:</strong> Optional analytics cookies and marketing communications, which you may opt out of at any time</li>
            <li><strong style={{ color: '#ccc' }}>Legal obligation:</strong> Tax records and compliance requirements</li>
          </ul>
          <p style={pStyle}>
            Data may be transferred to the United States. We rely on standard contractual clauses and service provider agreements to safeguard international data transfers.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. CCPA Compliance (California Residents)</h2>
          <p style={pStyle}>
            If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: '#ccc' }}>Right to know:</strong> You may request disclosure of the categories and specific pieces of personal information we have collected about you</li>
            <li><strong style={{ color: '#ccc' }}>Right to delete:</strong> You may request deletion of your personal information, subject to certain exceptions</li>
            <li><strong style={{ color: '#ccc' }}>Right to opt out:</strong> We do not sell personal information. If this changes, we will provide a &quot;Do Not Sell My Personal Information&quot; link.</li>
            <li><strong style={{ color: '#ccc' }}>Non-discrimination:</strong> We will not discriminate against you for exercising your CCPA rights</li>
          </ul>
          <p style={pStyle}>
            To submit a CCPA request, email <a href="mailto:z@authichain.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>z@authichain.com</a> with the subject line &quot;CCPA Request.&quot;
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Data Security</h2>
          <p style={pStyle}>
            We implement reasonable administrative, technical, and physical safeguards to protect your personal information, including:
          </p>
          <ul style={ulStyle}>
            <li>Encryption of data in transit (TLS/SSL) and at rest</li>
            <li>Secure authentication via Supabase with support for multi-factor authentication</li>
            <li>Regular access reviews and principle of least privilege</li>
            <li>PCI-DSS compliant payment processing through Stripe</li>
          </ul>
          <p style={pStyle}>
            No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Children&apos;s Privacy</h2>
          <p style={pStyle}>
            QRON is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13 without verified parental consent, we will take steps to delete that information promptly.
          </p>
          <p style={pStyle}>
            If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:z@authichain.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>z@authichain.com</a>.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy from time to time. When we make material changes, we will update the &quot;Effective Date&quot; at the top of this page and, where appropriate, notify you via email or through the Service. Your continued use of QRON after changes are posted constitutes acceptance of the revised policy.
          </p>
        </div>

        <div style={{ ...sectionStyle, marginBottom: '0' }}>
          <h2 style={h2Style}>13. Contact Information</h2>
          <p style={pStyle}>
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <p style={pStyle}>
            AuthiChain<br />
            Michigan, USA<br />
            Email: <a href="mailto:z@authichain.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>z@authichain.com</a>
          </p>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '48px', paddingTop: '24px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <Link href="/terms" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Terms of Service</Link>
          <Link href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>Back to QRON</Link>
        </div>
      </article>
    </div>
  )
}
