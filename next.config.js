/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brianfending.com',
        pathname: '/**',
      },
    ],
  },
  // For AWS Lightsail deployment
  output: 'standalone',
};

module.exports = nextConfig;