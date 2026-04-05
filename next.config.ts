import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'qron-ai-api.undone-k.workers.dev' },
    ],
    unoptimized: true,
  },
};

export default nextConfig;






















