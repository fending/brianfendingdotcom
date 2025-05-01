# Context Documentation

This directory contains comprehensive documentation for the brianfending.com Next.js implementation, including content strategies, workflows, and design principles.

## Overview

These documents serve as the source of truth for:
- Content syndication strategy and implementation
- Podcast and video production workflows
- Technical deployment procedures
- Design system specifications

All documentation has been updated to reflect the Next.js implementation (rather than the previous Vite version).

## Documentation Files

### Content Strategy & Implementation

- [**Content Syndication Strategy**](./content-syndication-strategy.md)
  - Multi-platform content publishing approach
  - SEO optimization and cross-platform attribution
  - Analytics and performance tracking strategy

- [**Content Syndication Implementation**](./content-syndication-implementation.md)
  - Technical implementation of the content strategy
  - Next.js data fetching patterns for content
  - SEO and cross-platform integration details

- [**Content Syndication Workflow**](./content-syndication-workflow.md)
  - Detailed workflow diagrams and processes
  - GitHub repository structure for content
  - End-to-end process for content creation and publishing

### Media Production Workflows

- [**Shorts Production Workflow**](./shorts-production-workflow.md)
  - Standard workflow for short-form video content
  - Cross-platform distribution strategy
  - Platform-specific optimization guidelines

- [**Shorts Production Workflow (Updated)**](./shorts-production-workflow-updated.md)
  - Enhanced production workflow with automated processes
  - Detailed content selection philosophy
  - Technical implementation with GitHub Actions

- [**Acast Podcast Workflow**](./acast-podcast-workflow.md)
  - Complete podcast production and publishing workflow
  - Integration with Acast for distribution
  - Cross-promotion between platforms

### Technical Implementation

- [**GitHub Workflows & Actions**](./github-workflows-actions.md)
  - Automated deployment and content synchronization
  - Technical details of GitHub Actions implementation
  - API integrations for cross-platform publishing

### Design

- [**Design System Guide**](./design-system-guide.md)
  - Comprehensive design system for the website
  - Typography, colors, component specifications
  - Next.js-specific design considerations

## Using This Documentation

These documents should be referenced when:
- Making changes to content strategy or workflow
- Adding new features to the website
- Implementing new automation and integration
- Designing new UI components
- Training new team members on the project

## Maintenance

All documentation should be kept up-to-date with current implementation. When making significant changes to the codebase, please update the corresponding documentation file.

## Next.js Implementation Notes

All documentation has been updated to reflect the Next.js implementation:
- React components have been converted to Server and Client Components
- Data fetching follows Next.js patterns with proper caching and revalidation
- SEO implementation uses the Next.js Metadata API
- Image optimization uses the Next.js Image component
- Styling is implemented with Tailwind CSS
- Deployment is handled through Vercel