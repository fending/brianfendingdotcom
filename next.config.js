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
  // Prevent stack overflow in file pattern matching
  staticPageGenerationTimeout: 120,
  // Exclude problematic SVG files from processing
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig;