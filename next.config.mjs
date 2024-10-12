/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
    },
};

export default nextConfig;
