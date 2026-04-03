import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { QronThirdwebProvider } from '@/components/ThirdwebProvider';
import { WalletBar } from '@/components/WalletBar';

export const metadata: Metadata = {
  title: {
    default: "QRON — AI QR Code Art Generator | Free Creative QR Codes",
    template: "%s | QRON",
  },
  verification: {
    google: 'IqOgxj0MCe6FEdNhDWDdw5t340V9fgeguowtVM49J8c',
  },
  description: "Create stunning AI-powered QR code art for free. Turn boring QR codes into branded masterpieces. Blockchain-verified, cryptographically secured. The creative layer of AuthiChain Protocol.",
  keywords: ["AI QR code generator", "QR code art", "creative QR codes", "free QR generator", "branded QR codes", "artistic QR codes", "QRON", "AuthiChain", "blockchain QR", "custom QR design"],
  metadataBase: new URL("https://qron.space"),
  openGraph: {
    title: "QRON — AI QR Code Art Generator | Free Creative QR Codes",
    description: "Turn boring QR codes into AI-generated art. Free to start. Blockchain-verified.",
    url: "https://qron.space",
    siteName: "QRON by AuthiChain",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRON — AI QR Code Art Generator",
    description: "Turn boring QR codes into AI-generated art. Free to start.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://qron.space" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "QRON",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              description: "AI-powered QR code art generator. Create stunning, blockchain-verified creative QR codes.",
              url: "https://qron.space",
              offers: [
                { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "3 free AI QR codes" },
                { "@type": "Offer", name: "Starter Pack", price: "29", priceCurrency: "USD", description: "10 QR codes" },
                { "@type": "Offer", name: "Pro Pack", price: "99", priceCurrency: "USD", description: "50 QR codes" },
                { "@type": "Offer", name: "Studio Pack", price: "299", priceCurrency: "USD", description: "200 QR codes" },
              ],
              publisher: {
                "@type": "Organization",
                name: "AuthiChain, Inc.",
                url: "https://authichain.com",
              },
            }),
          }}
        />
      </head>
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
        </QronThirdwebProvider>
      
      {/* QRON Chat Widget - replaces Telegram channel */}
      <Script
        src="https://qron-chat.undone-k.workers.dev/widget.js"
        strategy="lazyOnload"
      />
    </body>
    </html>
  );
}
