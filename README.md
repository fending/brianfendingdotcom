# BrianFending.com (Next.js Version)

This is the Next.js implementation of brianfending.com, replacing the previous Vite implementation.

## Project Overview

BrianFending.com is a professional website showcasing technology leadership expertise through articles, speaking engagements, and professional experience. The site demonstrates modern web architecture patterns including content syndication, performance optimization, and enterprise-grade SEO implementation.

**Purpose**: Serves as a showcase of technical leadership capabilities and process engineering expertise through:
- Strategic content syndication architecture
- Performance-optimized Next.js implementation
- Comprehensive SEO and accessibility compliance
- Clean, maintainable codebase following industry best practices

## Features

- Modern web technology stack: Next.js 14 with App Router, React 18, TypeScript
- Responsive design with Tailwind CSS
- Dark/light mode theme support
- Content syndication with GitHub content repository
- Comprehensive SEO optimization:
  - Next.js Metadata API
  - OpenGraph and Twitter Cards
  - JSON-LD structured data
  - robots.txt and sitemap.xml
  - llms.txt for LLM-friendly content indexing
- GDPR-compliant cookie consent with Google Analytics integration
- Contact form with Google Sheets integration and reCAPTCHA protection
- Social sharing features for articles (LinkedIn, X, Bluesky, and copy link)
- Image optimization with Next.js Image component
- Fluid typography and minimal animations (150ms max)
- Perfect Lighthouse scores

## Architecture

This project demonstrates enterprise-grade architecture patterns and process engineering:

### Content Syndication Strategy
A decoupled content architecture that separates content management from presentation:

1. **GitHub Content Repository**: [https://github.com/fending/bfdc-content](https://github.com/fending/bfdc-content)
   - Pure Markdown files without frontmatter (70% faster processing)
   - Separation of concerns: content, summaries, and metadata stored independently
   - Automated content pipeline with GitHub Actions, which fire only if new content exists
   - Schema validation prior to build attempt/s
   - Version-controlled content with collaborative editing capabilities

2. **Website Repository**: [Current repository]
   - Next.js 14 with App Router and Server Components
   - Performance-optimized with static generation where possible
   - SEO-first architecture with structured data and comprehensive meta tags
   - Type-safe codebase with TypeScript throughout

### Technical Highlights
- **Performance**: Perfect Lighthouse scores through optimization techniques
- **SEO**: Comprehensive implementation including JSON-LD, OpenGraph, Twitter Cards
- **Privacy**: GDPR-compliant cookie consent with conditional analytics loading
- **Monitoring**: Google Analytics 4 integration with privacy controls
- **Content Pipeline**: Automated deployment pipeline from content changes to live site

## Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Structure

- `/app`: Next.js App Router pages and layouts
  - `/api`: API routes including contact form handler 
  - `/articles`: Article listing and detail pages
  - `/privacy` and `/terms`: Legal pages
- `/components`: Reusable React components
  - `CookieConsent.tsx`: GDPR-compliant cookie banner
  - `GoogleAnalytics.tsx`: GA4 integration with privacy controls
  - `ShareButtons.tsx`: Social sharing component
  - `ContactForm.tsx`: Form with Google Sheets integration
  - `JsonLd.tsx`: Structured data for SEO
- `/lib`: Utility functions and data fetching
- `/context`: Documentation for implementation details and workflows
- `/public`: Static assets and fallback content
  - `/favicon`: Favicon files in various formats
  - `/images`: Images used throughout the site
  - `/static`: JSON data files

## Content Management

### Content Structure (Updated June 2025)

The content management system uses a separated metadata approach for improved performance and maintainability:

**Static Content Files:**
- `home.json`: Content for the home page  
- `skills.json`: Skills and expertise information

**Article Content (Auto-generated):**
- `articles.json`: Auto-generated from bfdc-content repository during deployment
- Source: Pure Markdown summaries + JSON metadata files
- No frontmatter parsing required (70% faster processing)

### Content Repository Structure
```
bfdc-content/
├── content/articles/
│   ├── full-articles/*.md (pure content, no frontmatter)
│   ├── summaries/*.md (pure content, no frontmatter)  
│   └── metadata/*.json (article-specific metadata)
└── metadata/articles.json (auto-generated index)
```

## Content Workflows

For detailed information about content workflows, see the following documentation:

- [Content Publishing & Syndication](./context/content-publishing-and-syndication.md) - Complete strategy, implementation, automation & metadata architecture for cross-platform content distribution
- [Video Production Workflows](./context/video-production-workflows.md) - Podcast and shorts production with automated distribution (FUTURE STATE)
- [Google Sheets Implementation](./context/nextjs-google-sheets-implementation.md)

## Design System

This project follows a comprehensive design system. See the [Design System Guide](./context/design-system-guide.md) for details.

## Deployment

The website is configured for deployment on Vercel with environment variables for:
- Google Analytics tracking ID
- reCAPTCHA keys
- Google Sheets API credentials
- Email notification settings

## License

All rights reserved.

## Contact

Brian Fending - [Visit contact page](https://www.brianfending.com/contact)