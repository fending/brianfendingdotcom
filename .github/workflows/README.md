# GitHub Workflows for brianfending-nextjs

This directory contains GitHub Actions workflows that automate the deployment and content management processes for the Next.js version of brianfending.com.

## Workflows

### content-deploy.yml

Triggered when:
- Content repository sends a repository_dispatch event
- Manual trigger via workflow_dispatch

Actions:
1. Checks out the website code
2. Sets up Node.js environment
3. Installs dependencies
4. Builds the Next.js application
5. Deploys to Vercel

## Environment Variables

The following environment variables are used:
- `GITHUB_CONTENT_URL`: URL to the GitHub content repository

## Secrets Required

To use the Vercel deployment, add these secrets to your GitHub repository:
- `VERCEL_TOKEN`: API token from Vercel
- `VERCEL_ORG_ID`: Organization ID from Vercel
- `VERCEL_PROJECT_ID`: Project ID from Vercel

## Next.js Specific Details

- The workflow uses `npm` instead of `yarn`
- Node.js version is updated to 20
- Environment variables are adapted for Next.js
- Deployment uses the official Vercel action