# CLAUDE.md

Guidance for Claude Code in the brianfending-nextjs project.

## Overview

Professional portfolio at brianfending.com. Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS.

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Linting
```

## Structure

- `app/` - Pages and API routes (articles, contact, about, etc.)
- `components/` - React components (Navigation, Footer, ContactForm, etc.)
- `lib/` - Content helpers (articles.ts, content.ts)
- `public/static/` - JSON data (articles.json auto-generated from bfdc-content)
- `context/` - Extended documentation

## Content

Articles come from **bfdc-content** repository. Never edit `public/static/articles.json` directly.

```typescript
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
```

## Key Features

- GDPR cookie consent with Google Analytics
- Contact form with Google Sheets + reCAPTCHA
- SEO: JSON-LD, OpenGraph, sitemap.js, robots.js, llms.txt
- Dark/light theme support

## Guidelines

- Server Components by default
- Use Next.js `<Image>` for optimization
- Target perfect Lighthouse scores

## Documentation

See `/context/` for design system, content publishing, and Google Sheets setup.
