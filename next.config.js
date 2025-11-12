/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // SWC minifier enabled for better performance
  swcMinify: true,
  
  // Default output mode instead of standalone to avoid CSS issues
  // output: 'standalone',
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/skills',
        destination: '/about',
        permanent: true,
      }
    ];
  },
  
  // Image optimization settings
  images: {
    unoptimized: true,
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS 
      ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') 
      : ['localhost', 'brianfending.com', 'www.brianfending.com']
  },
  
  // Font optimization disabled for simplified builds
  optimizeFonts: false,
  
  // Increase timeout for static page generation
  staticPageGenerationTimeout: 180,
  
  // Experimental features configuration
  experimental: {
    // Development options
    optimizeCss: false,
    optimizeServerReact: true,
  },
  
  // Only compile .tsx and .ts files
  pageExtensions: ['tsx', 'ts'],
  
  // Reduce bundle size
  excludeDefaultMomentLocales: true,
  
  // Webpack configuration for CSS processing
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