/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    missingSuspenseWithCSRBailout: false,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'houbunsha.co.jp',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'www.dokidokivisual.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'krr.cherry-takuan.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.dokidokivisual.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
