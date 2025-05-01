# BrianFending.com (Next.js Version)

This is the Next.js implementation of brianfending.com, replacing the previous Vite implementation.

## Project Overview

BrianFending.com serves as a professional website and content hub for technology leadership articles and podcasts. The site follows a content syndication strategy where article summaries are hosted here with links to full versions on LinkedIn and Substack.

## Features

- Modern web technology stack: Next.js 14 with App Router, React 18, TypeScript
- Responsive design with Tailwind CSS
- Dark/light mode support
- Content syndication with GitHub content repository
- SEO optimization with Next.js metadata
- Image optimization with Next.js Image component
- Fluid typography and minimal animations (150ms max)
- Perfect Lighthouse scores

## Architecture

The website implements a content syndication strategy with the following components:

1. **GitHub Content Repository**: [https://github.com/fending/bfdc-content](https://github.com/fending/bfdc-content)
   - All content stored as Markdown files with frontmatter
   - Full articles and summaries stored separately
   - Metadata stored in JSON files

2. **Website Repository**: [Current repository]
   - Next.js application with App Router
   - Server Components for content fetching
   - Renders article summaries with links to LinkedIn/Substack

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
- `/components`: Reusable React components
- `/lib`: Utility functions and data fetching
- `/context`: Documentation for implementation details and workflows
- `/public`: Static assets and fallback content
  - `/images`: Images used throughout the site
  - `/static`: JSON data files

## Content Management

Content is stored in JSON files under the `/public/static` directory with fallbacks from the GitHub content repository:

- `home.json`: Content for the home page
- `articles.json`: Collection of blog articles
- `skills.json`: Skills and expertise information

## Content Workflows

For detailed information about content workflows, see the following documentation:

- [Content Syndication Strategy](./context/content-syndication-strategy.md)
- [Content Syndication Implementation](./context/content-syndication-implementation.md)
- [Content Syndication Workflow](./context/content-syndication-workflow.md)
- [Shorts Production Workflow](./context/shorts-production-workflow.md)
- [Podcast Workflow](./context/acast-podcast-workflow.md)
- [GitHub Workflows](./context/github-workflows-actions.md)

## Design System

This project follows a comprehensive design system. See the [Design System Guide](./context/design-system-guide.md) for details.

## Deployment

The website is automatically deployed via GitHub Actions when content changes are pushed to the content repository. See `.github/workflows/content-deploy.yml` for details.

## License

All rights reserved.

## Contact

Brian Fending - [contact information]