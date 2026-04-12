import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | QRON by AuthiChain',
  description: 'Terms of Service for QRON (qron.space), the AI-powered QR code generation platform operated by AuthiChain.',
  openGraph: { title: 'Terms of Service | QRON by AuthiChain', description: 'Terms of Service for QRON (qron.space), the AI-powered QR code generation platform operated by AuthiChain.', url: 'https://qron.space/terms', type: 'website' },
  alternates: { canonical: 'https://qron.space/terms' },
}

const sectionStyle: React.CSSProperties = { marginBottom: '40px' }
const h2Style: React.CSSProperties = { fontSize: '1.3rem', fontWeight: 700, marginBottom: '14px', color: '#e5e5e5' }
const pStyle: React.CSSProperties = { fontSize: '15px', color: '#999', lineHeight: 1.75, marginBottom: '12px' }
const ulStyle: React.CSSProperties = { fontSize: '15px', color: '#999', lineHeight: 1.75, paddingLeft: '24px', marginBottom: '12px' }

export default function TermsPage() {
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <section style={{ padding: '80px 24px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '15px', color: '#666', marginBottom: '4px' }}>Effective Date: April 12, 2026</p>
        <p style={{ fontSize: '14px', color: '#555' }}>
          QRON (qron.space) is operated by AuthiChain, Michigan, USA
        </p>
      </section>

      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px 80px' }}>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p style={pStyle}>
            By accessing or using QRON at qron.space (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the Service. These Terms constitute a legally binding agreement between you and AuthiChain (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Service</h2>
          <p style={pStyle}>
            QRON is an AI-powered QR code generation platform. The Service allows users to create artistic, functional QR codes using artificial intelligence models. Features include but are not limited to:
          </p>
          <ul style={ulStyle}>
            <li>AI-generated QR code art from text prompts and URLs</li>
            <li>Customizable styles, colors, and design parameters</li>
            <li>High-resolution image export</li>
            <li>Optional blockchain minting of QR code art as NFTs on the Polygon network</li>
            <li>User dashboard and generation history</li>
          </ul>
          <p style={pStyle}>
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. User Accounts</h2>
          <p style={pStyle}>
            To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update it as necessary.
          </p>
          <p style={pStyle}>
            You must be at least 13 years of age to create an account. If you are under 18, you represent that you have your parent or legal guardian&apos;s consent to use the Service.
          </p>
          <p style={pStyle}>
            We reserve the right to suspend or terminate accounts that violate these Terms or that have been inactive for an extended period.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Payment Terms</h2>
          <p style={pStyle}>
            Certain features of the Service require payment. All payments are processed securely through Stripe. By making a purchase, you agree to Stripe&apos;s terms of service in addition to these Terms.
          </p>
          <ul style={ulStyle}>
            <li>Prices are displayed in USD unless otherwise stated and are subject to change with notice.</li>
            <li>Subscription plans renew automatically unless cancelled before the renewal date.</li>
            <li>One-time purchases (such as individual QR code designs) are non-refundable once the generated image has been delivered, except where required by applicable law.</li>
            <li>If you believe a charge is in error, contact us at z@authichain.com within 30 days.</li>
          </ul>
          <p style={pStyle}>
            We do not store your full payment card details. All payment information is handled directly by Stripe in accordance with PCI-DSS standards.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Intellectual Property</h2>
          <p style={pStyle}>
            <strong style={{ color: '#ccc' }}>Your content:</strong> You retain ownership of the QR code art generated through the Service using your prompts and inputs. You are granted a perpetual, worldwide, non-exclusive license to use, reproduce, modify, and distribute your generated QR code art for any lawful purpose, including commercial use (subject to your subscription or purchase tier).
          </p>
          <p style={pStyle}>
            <strong style={{ color: '#ccc' }}>Our platform:</strong> All rights, title, and interest in the QRON platform, including its software, algorithms, user interface, branding, trademarks, documentation, and underlying AI models and integrations, remain the exclusive property of AuthiChain. Nothing in these Terms grants you any right to use QRON&apos;s brand name, logos, or proprietary technology except as expressly permitted.
          </p>
          <p style={pStyle}>
            <strong style={{ color: '#ccc' }}>AI-generated output:</strong> AI-generated content may not be eligible for copyright protection in all jurisdictions. AuthiChain makes no representation regarding the copyrightability of AI-generated QR code art under any particular legal framework.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Acceptable Use</h2>
          <p style={pStyle}>You agree not to use the Service to:</p>
          <ul style={ulStyle}>
            <li>Generate content that is illegal, defamatory, obscene, or that promotes violence or hatred</li>
            <li>Infringe upon any third party&apos;s intellectual property or privacy rights</li>
            <li>Distribute malware, phishing links, or other harmful content via QR codes</li>
            <li>Attempt to reverse-engineer, decompile, or extract source code from the platform</li>
            <li>Circumvent rate limits, access controls, or other technical restrictions</li>
            <li>Use automated tools to scrape or bulk-generate content beyond your plan limits</li>
            <li>Impersonate any person or entity, or misrepresent your affiliation</li>
          </ul>
          <p style={pStyle}>
            We reserve the right to remove content and suspend accounts that violate this policy, at our sole discretion.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Blockchain and NFT Terms</h2>
          <p style={pStyle}>
            QRON offers optional minting of QR code art as non-fungible tokens (NFTs) on the Polygon blockchain network. By using this feature, you acknowledge and agree to the following:
          </p>
          <ul style={ulStyle}>
            <li>Blockchain transactions are irreversible. Once an NFT is minted, it cannot be un-minted or deleted from the blockchain.</li>
            <li>You are solely responsible for the security of your blockchain wallet and private keys. AuthiChain cannot recover lost wallet access.</li>
            <li>Gas fees or transaction costs associated with minting may apply and are your responsibility.</li>
            <li>The value of NFTs is speculative and not guaranteed. AuthiChain makes no promises regarding the future value of any minted asset.</li>
            <li>Minting an NFT does not transfer QRON platform IP rights to you; it represents ownership of the specific digital asset on-chain.</li>
            <li>You are responsible for compliance with applicable tax laws related to blockchain assets in your jurisdiction.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Third-Party Services</h2>
          <p style={pStyle}>
            The Service integrates with third-party providers including Stripe (payments), Supabase (authentication and data), Fal.ai (AI image generation), Polygon (blockchain), and others. Your use of these services is subject to their respective terms and privacy policies. AuthiChain is not responsible for the availability, accuracy, or conduct of third-party services.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Limitation of Liability</h2>
          <p style={pStyle}>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AUTHICHAIN AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
          </p>
          <p style={pStyle}>
            OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO AUTHICHAIN IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
          </p>
          <p style={pStyle}>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Indemnification</h2>
          <p style={pStyle}>
            You agree to indemnify, defend, and hold harmless AuthiChain and its affiliates from any claims, liabilities, damages, losses, or expenses (including reasonable attorney&apos;s fees) arising from your use of the Service, your violation of these Terms, or your infringement of any third-party rights.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>11. Dispute Resolution</h2>
          <p style={pStyle}>
            Any dispute arising out of or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved within thirty (30) days of written notice, either party may pursue resolution through binding arbitration administered under the rules of the American Arbitration Association (AAA), conducted in the State of Michigan.
          </p>
          <p style={pStyle}>
            You agree to waive any right to participate in a class action lawsuit or class-wide arbitration against AuthiChain.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>12. Governing Law</h2>
          <p style={pStyle}>
            These Terms shall be governed by and construed in accordance with the laws of the State of Michigan, United States of America, without regard to its conflict of law provisions. Any legal proceedings shall be brought exclusively in the state or federal courts located in the State of Michigan.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>13. Modifications to Terms</h2>
          <p style={pStyle}>
            We may update these Terms from time to time. When we make material changes, we will notify users by posting the revised Terms on this page and updating the &quot;Effective Date&quot; above. Your continued use of the Service after changes are posted constitutes acceptance of the revised Terms.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>14. Termination</h2>
          <p style={pStyle}>
            Either party may terminate this agreement at any time. You may delete your account through your account settings or by contacting us. We may terminate or suspend your access immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the Service.
          </p>
          <p style={pStyle}>
            Upon termination, your right to use the Service ceases immediately. Sections that by their nature should survive termination (including Intellectual Property, Limitation of Liability, Indemnification, Dispute Resolution, and Governing Law) will remain in effect.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>15. Severability</h2>
          <p style={pStyle}>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
          </p>
        </div>

        <div style={{ ...sectionStyle, marginBottom: '0' }}>
          <h2 style={h2Style}>16. Contact Information</h2>
          <p style={pStyle}>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <p style={pStyle}>
            AuthiChain<br />
            Michigan, USA<br />
            Email: <a href="mailto:z@authichain.com" style={{ color: '#7c3aed', textDecoration: 'none' }}>z@authichain.com</a>
          </p>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '48px', paddingTop: '24px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <Link href="/privacy" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Privacy Policy</Link>
          <Link href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '14px' }}>Back to QRON</Link>
        </div>
      </article>
    </div>
  )
}
