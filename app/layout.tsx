import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { QronThirdwebProvider } from '@/components/ThirdwebProvider';
import { WalletBar } from '@/components/WalletBar';

export const metadata: Metadata = {
  title: "QRON — Creative Layer of the AuthiChain Protocol",
  description: "Generate AI-powered, cryptographically verified QR art. The creative expression layer of AuthiChain — where authentication meets artistry.",
  keywords: ["QRON", "AuthiChain", "AI QR code", "blockchain authentication", "QR art", "anti-counterfeiting", "creative QR"],
  openGraph: {
    title: "QRON — Creative Layer of the AuthiChain Protocol",
    description: "Where authentication meets artistry. Powered by AuthiChain Protocol.",
    url: "https://qron.space",
    siteName: "QRON by AuthiChain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QronThirdwebProvider>
        {/* Protocol Header Band */}
        <div style={{
          background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1300 50%, #0a0a0a 100%)',
          borderBottom: '1px solid rgba(201,162,39,0.2)',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#9e9e9e',
        }}>
          <span style={{ color: '#c9a227', fontWeight: 700, letterSpacing: '0.08em' }}>
            ◆ AUTHICHAIN PROTOCOL
          </span>
          <span style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="https://authichain.com" target="_blank" rel="noreferrer"
               className="protocol-header-link"
               style={{ textDecoration: 'none', letterSpacing: '0.05em' }}
            >
              authichain.com ↗
            </a>
            <span style={{ color: '#3a3a3a' }}>|</span>
            <span style={{ color: '#6b6b6b' }}>QRON Creative Studio</span>
            <WalletBar />
          </span>
        </div>

        {/* Nav */}
        <nav style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(201,162,39,0.1)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '13px',
          height: '44px',
        }}>
          <a href="/" style={{ color: '#e8c547', fontWeight: 800, letterSpacing: '-0.5px', marginRight: '12px', textDecoration: 'none' }}>QRON</a>
          {[
            { href: '/', label: 'Create' },
            { href: '/demo', label: 'Gallery' },
            { href: '/targeted', label: 'Targeted' },
            { href: '/#pricing', label: 'Pricing' },
          ].map(({ href, label }) => (
            <a key={href} href={href} style={{ color: '#6b6b6b', textDecoration: 'none', padding: '6px 10px', borderRadius: '6px', transition: 'color 0.15s' }}
               onMouseEnter={e => (e.currentTarget.style.color = '#c9a227')}
               onMouseLeave={e => (e.currentTarget.style.color = '#6b6b6b')}>
              {label}
            </a>
          ))}
          <div style={{ flex: 1 }} />
          <a href="/dashboard" style={{ color: '#9e9e9e', textDecoration: 'none', padding: '5px 10px', borderRadius: '6px', border: '1px solid rgba(201,162,39,0.2)', fontSize: '12px' }}
             onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c9a227'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,162,39,0.5)'; }}
             onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9e9e9e'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,162,39,0.2)'; }}>
            Dashboard
          </a>
        </nav>

        {children}

        {/* Protocol Footer Band */}
        <footer style={{
          borderTop: '1px solid rgba(201,162,39,0.15)',
          padding: '20px 24px',
          background: '#0d0d0d',
          display: 'flex',
          flexWrap: 'wrap' as const,
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '12px',
          color: '#6b6b6b',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#c9a227', fontWeight: 700, fontSize: '13px' }}>QRON</span>
            <span style={{ color: '#3a3a3a' }}>|</span>
            <span>Creative Layer of the</span>
            <a href="https://authichain.com" target="_blank" rel="noreferrer"
               style={{ color: '#c9a227', textDecoration: 'none', fontWeight: 600 }}>
              AuthiChain Protocol
            </a>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
            <a href="/demo" style={{ color: '#6b6b6b', textDecoration: 'none' }}>Gallery</a>
            <a href="/targeted" style={{ color: '#6b6b6b', textDecoration: 'none' }}>Targeted</a>
            <a href="/#pricing" style={{ color: '#6b6b6b', textDecoration: 'none' }}>Pricing</a>
            <a href="https://authichain.com" target="_blank" rel="noreferrer"
               style={{ color: '#6b6b6b', textDecoration: 'none' }}>Enterprise</a>
            <a href="mailto:Z@authichain.com"
               style={{ color: '#6b6b6b', textDecoration: 'none' }}>Contact</a>
            <span>© {new Date().getFullYear()} AuthiChain, Inc.</span>
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
        </QronThirdwebProvider>
      </body>
    </html>
  );
}
