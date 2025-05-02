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
  
  // Output mode for deployment
  output: 'export',
  
  // Disable unnecessary features
  optimizeFonts: false,
  
  // Increase timeouts for build
  staticPageGenerationTimeout: 180,
  
  // Disable experimental features that might cause issues
  experimental: {
    cpus: 1, // Force single CPU to avoid memory issues
    workerThreads: false,
    optimizeCss: false, // Disable CSS optimization
    optimizeServerReact: false,
    scrollRestoration: false
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
      nodeEnv: 'production',
      minimize: true
    };
    
    return config;
  }
};

module.exports = nextConfig;