import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
               style={{ color: '#9e9e9e', textDecoration: 'none', letterSpacing: '0.05em' }}
               onMouseOver={(e) => (e.currentTarget.style.color = '#c9a227')}
               onMouseOut={(e) => (e.currentTarget.style.color = '#9e9e9e')}
            >
              authichain.com ↗
            </a>
            <span style={{ color: '#3a3a3a' }}>|</span>
            <span style={{ color: '#6b6b6b' }}>QRON Creative Studio</span>
          </span>
        </div>

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
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="https://authichain.com" target="_blank" rel="noreferrer"
               style={{ color: '#6b6b6b', textDecoration: 'none' }}>Enterprise Platform</a>
            <a href="mailto:Z@authichain.com"
               style={{ color: '#6b6b6b', textDecoration: 'none' }}>Contact</a>
            <span>© {new Date().getFullYear()} AuthiChain, Inc.</span>
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
