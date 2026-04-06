import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'qron-ai-api.undone-k.workers.dev' },
    ],
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;






















