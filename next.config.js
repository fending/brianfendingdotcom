/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Re-enable SWC minifier since we're not using Babel
  swcMinify: true,
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      }
    ];
  },
  
  // Ultra simplified image config - use unoptimized to bypass image processing
  // Use environment variables for domains
  images: {
    unoptimized: true,
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS 
      ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') 
      : ['localhost', 'brianfending.com', 'www.brianfending.com']
  },
  
  // Don't use standalone output - it's causing CSS issues
  // output: 'standalone',
  
  // Disable unnecessary features
  optimizeFonts: false,
  
  // Increase timeouts for build
  staticPageGenerationTimeout: 180,
  
  // Disable all non-essential experimental features
  experimental: {
    optimizeCss: false,
    optimizeServerReact: false,
  },
  
  // Disable unnecessary page extensions 
  pageExtensions: ['tsx', 'ts'],
  
  // Explicitly mark files to exclude from compilation
  excludeDefaultMomentLocales: true,
  
  // Minimal webpack configuration for consistent CSS processing
  webpack(config) {
    // Ensure CSS processing happens properly
    if (config.module && config.module.rules) {
      const cssRule = config.module.rules.find(
        rule => rule.oneOf && rule.oneOf.some(
          oneOf => oneOf.test && oneOf.test.toString().includes('css')
        )
      );
      
      if (cssRule && cssRule.oneOf) {
        cssRule.oneOf.forEach(rule => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach(loader => {
              if (loader.options && loader.options.url === false) {
                delete loader.options.url;
              }
            });
          }
        });
      }
    }
    
    return config;
  }
};

module.exports = nextConfig;