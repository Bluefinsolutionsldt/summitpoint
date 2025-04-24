import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['summitpoint.co.tz', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'summitpoint.co.tz',
        pathname: '/uploads/events/**',
      },
      {
        protocol: 'https',
        hostname: 'summitpoint.co.tz',
        pathname: '/api/v2/events/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
