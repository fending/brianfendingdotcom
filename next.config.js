/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Re-enable SWC minifier since we're not using Babel
  swcMinify: true,
  
  // Ultra simplified image config - use unoptimized to bypass image processing
  // Use environment variables for domains
  images: {
    unoptimized: true,
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS 
      ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') 
      : ['localhost', 'brianfending.com', 'www.brianfending.com']
  },
  
  // Use standalone output for deployment
  output: 'standalone',
  
  // Disable unnecessary features
  optimizeFonts: false,
  
  // Increase timeouts for build
  staticPageGenerationTimeout: 180,
  
  // Use default experimental features
  experimental: {
    optimizeCss: false, // Disable CSS optimization to use standard CSS processing
  },
  
  // Disable unnecessary page extensions 
  pageExtensions: ['tsx', 'ts'],
  
  // Explicitly mark files to exclude from compilation
  excludeDefaultMomentLocales: true,
  
  // Simplified webpack configuration
  webpack(config) {
    // More aggressive ignores
    config.watchOptions = {
      ignored: ['**/*']
    };
    
    // Disable file watching during build
    config.infrastructureLogging = {
      level: 'error'
    };
    
    // Production optimization
    config.optimization = {
      ...config.optimization,
      minimize: true
    };
    
    return config;
  }
};

module.exports = nextConfig;