/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Re-enable SWC minifier since we're not using Babel
  swcMinify: true,
  
  // Image configuration 
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS 
      ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') 
      : ['localhost', 'brianfending.com', 'www.brianfending.com'],
    unoptimized: false // Enable image optimization
  },
  
  // Use standalone output for deployment
  output: 'standalone',
  
  // Enable font optimization
  optimizeFonts: true,
  
  // Increase timeouts for build
  staticPageGenerationTimeout: 180,
  
  // Configure experimental features
  experimental: {
    cpus: 4, // Use more CPUs for better build performance
    optimizeCss: false, // Disable CSS optimization to prevent critters issues
    optimizeServerReact: true, // Enable server-side React optimization
    scrollRestoration: true // Enable scroll restoration
  },
  
  // Define page extensions
  pageExtensions: ['tsx', 'ts', 'js', 'jsx'],
  
  // Explicitly mark files to exclude from compilation
  excludeDefaultMomentLocales: true,
  
  // Enhanced webpack configuration
  webpack(config) {
    // Configure for production builds
    if (process.env.NODE_ENV === 'production') {
      // Improve CSS processing
      const cssRule = config.module.rules.find(
        (rule) => rule.test && rule.test.toString().includes('css')
      );
      
      if (cssRule) {
        cssRule.use = [
          ...cssRule.use,
        ];
      }
    }
    
    // Keep minimal logging for cleaner output
    config.infrastructureLogging = {
      level: 'error'
    };
    
    // Production optimization
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    };
    
    return config;
  }
};

module.exports = nextConfig;