# Content Syndication Implementation

## Architecture Overview

The website implements a content syndication strategy with the following components:

1. **GitHub Content Repository**: [https://github.com/fending/bfdc-content](https://github.com/fending/bfdc-content)
   - All content stored as Markdown files with frontmatter
   - Full articles and summaries stored separately
   - Metadata stored in JSON files

2. **Website Repository**: [Current repository]
   - Next.js application with App Router
   - Server Components for content fetching
   - Renders article summaries with links to LinkedIn/Substack

## Key Implementation Features

1. **Content Fetching**
   - Server Components in `/app/articles/[slug]/page.tsx` fetch article content
   - Incrementally Static Regeneration for optimal performance
   - Fallback to local JSON files when GitHub content is unavailable
   - Markdown processing with remark/rehype ecosystem

2. **SEO Optimization**
   - Next.js Metadata API for comprehensive SEO implementation
   - Schema.org JSON-LD markup for articles
   - OpenGraph and Twitter Card metadata
   - Canonical URLs to manage duplicate content
   - Built-in robots.js and sitemap.js for search engine crawling
   - Semantic HTML structure for improved accessibility

3. **Cross-Platform Integration**
   - Article detail pages include links to LinkedIn and Substack
   - Newsletter subscription integration with Substack API
   - Enhanced social sharing functionality with modern platforms (X, LinkedIn, Bluesky)
   - Copy link feature for easy sharing

4. **Privacy and Compliance**
   - GDPR-compliant cookie consent banner
   - Google Analytics integration with privacy controls
   - Privacy policy and terms of service pages
   - Permanent redirects for moved pages

5. **Contact Form Integration**
   - Google Sheets API integration for form submissions
   - reCAPTCHA protection against spam
   - Server-side validation and error handling
   - Email notification system

## Deployment Workflow

1. Content updates pushed to the content repository trigger a GitHub Action
2. The Action notifies this repository via repository_dispatch event
3. Vercel webhook triggered to rebuild the Next.js site with fresh content
4. Incremental Static Regeneration updates cached pages as needed

## Content Creation Workflow

1. Write full article in content repo: `/content/articles/full-articles/`
2. Create summary version in content repo: `/content/articles/summaries/`
3. Update metadata index in content repo: `/metadata/articles.json`
4. Push changes to content repository
5. Publish to LinkedIn and Substack with attribution links

## Technical Implementation Details

### Data Fetching

```typescript
// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import matter from 'gray-matter';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  
  return {
    title: `${article.metadata.title} | Brian Fending`,
    description: article.metadata.excerpt,
    // Additional metadata...
  };
}

async function getArticle(slug: string) {
  try {
    // Fetch from GitHub
    const url = `${process.env.GITHUB_BASE_URL}/content/articles/summaries/${slug}.md`;
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    const markdown = await response.text();
    const { data, content } = matter(markdown);
    
    return { 
      metadata: data as ArticleMetadata, 
      content 
    };
  } catch (error) {
    // Fallback to static data
    // ...
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  // Render article with content and metadata
}
```

### SEO Implementation

```typescript
// app/articles/[slug]/page.tsx

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  const { metadata } = article;
  
  // Create schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': metadata.title,
    'author': {
      '@type': 'Person',
      'name': metadata.author,
      'url': 'https://brianfending.com/about'
    },
    'datePublished': metadata.date,
    'dateModified': metadata.date,
    'description': metadata.excerpt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://brianfending.com/articles/${params.slug}`
    }
    // Additional fields...
  };
  
  return {
    title: `${metadata.title} | Brian Fending`,
    description: metadata.excerpt,
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      url: `https://brianfending.com/articles/${params.slug}`,
      type: 'article',
      publishedTime: metadata.date,
      images: [{
        url: `/images/${metadata.featuredImage}`,
        width: 1200,
        height: 630,
        alt: metadata.title
      }]
    },
    alternates: {
      canonical: `https://brianfending.com/articles/${params.slug}`
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
  };
}
```

### Platform Integration

```typescript
// components/PlatformLinks.tsx
import Link from 'next/link';

export default function PlatformLinks({ 
  linkedinUrl, 
  substackUrl 
}: { 
  linkedinUrl?: string, 
  substackUrl?: string 
}) {
  if (!linkedinUrl && !substackUrl) return null;
  
  return (
    <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Read the full article:</h3>
      <div className="flex flex-wrap gap-4">
        {linkedinUrl && (
          <Link 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Read on LinkedIn
          </Link>
        )}
        {substackUrl && (
          <Link 
            href={substackUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Read on Substack
          </Link>
        )}
      </div>
    </div>
  );
}
```