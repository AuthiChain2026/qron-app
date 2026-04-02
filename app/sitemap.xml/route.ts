import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://qron.space</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://qron.space/pricing</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://qron.space/gig</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://qron.space/order</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/free-qr-generator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://qron.space/ai-qr-code-generator</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://qron.space/qr-code-art</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/cannabis-qr-code</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/restaurant-qr-code</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/contact</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://qron.space/for/restaurants</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/for/cannabis</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/for/events</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/for/real-estate</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://qron.space/blog</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://qron.space/blog/how-ai-qr-codes-work</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://qron.space/blog/cannabis-dispensary-qr-code-guide</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://qron.space/blog/restaurant-menu-qr-code-guide</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
