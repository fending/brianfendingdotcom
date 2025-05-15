export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.brianfending.com/sitemap.xml',
    // Reference to llms.txt for LLM crawlers
    llmsTxt: 'https://www.brianfending.com/llms.txt',
  };
}