import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.kicks.com.co',
      },
      {
        protocol: 'https',
        hostname: 'kicks.com.co',
      },
    ],
  },
};

export default nextConfig;
