import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.candlesticker.com',
        port: '',
        pathname: '/Images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tradingview.com',
        port: '',
        pathname: '/x/**',
      },
      {
        protocol: 'https',
        hostname: 'www.investopedia.com',
        port: '',
        pathname: '/thmb/**',
      },
    ],
  },
};

export default nextConfig;
