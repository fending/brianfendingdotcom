/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Simplified image configuration with all domains
  images: {
    domains: [
      'localhost',
      'brianfending.com',
      'brianfending.vercel.app',
      'brianfendingcom.vercel.app'
    ]
  },
  
  // For AWS Lightsail and Vercel deployment
  output: 'standalone',
  
  // Optimize build process
  staticPageGenerationTimeout: 120,
  
  // Simplified webpack configuration with explicit ignores
  webpack(config) {
    // Add explicit ignore patterns for directories that might cause issues
    config.watchOptions = {
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/public/favicon/**'
      ]
    };
    
    return config;
  }
};

module.exports = nextConfig;