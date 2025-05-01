# Podcast Content Workflow with Acast Integration

## Overview

This document outlines the complete workflow for creating and publishing podcast content using Acast as the primary hosting platform while maintaining brianfending.com as a content hub. The workflow incorporates GitHub Actions for automated distribution and implements a hub-and-spoke model where all content is centrally managed.

## Detailed Workflow

```
┌─────────────────────┐
│                     │
│  Create Podcast     │
│  Content Offline    │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│                     │
│  Add Content to     │
│  GitHub Repository  │
│                     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│  GitHub Actions     │────▶│  Publish to Acast   │
│  Workflow           │     │  (Audio)            │
│                     │     │                     │
└──────────┬──────────┘     └──────────┬──────────┘
           │                            │
           │                            ▼
           │                  ┌─────────────────────┐
           │                  │                     │
           │                  │  Distribute to      │
           │                  │  Podcast Platforms  │
           │                  │                     │
           │                  └─────────────────────┘
           ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  Publish Episode    │     │  Publish to         │     │  Create Shorts      │
│  Page to Website    │◀────┤  YouTube (Video)    │────▶│  from Video         │
│                     │     │                     │     │                     │
└──────────┬──────────┘     └─────────────────────┘     └──────────┬──────────┘
           │                                                        │
           │                                                        ▼
           │                                              ┌─────────────────────┐
           │                                              │                     │
           │                                              │  Distribute Shorts  │
           │                                              │  to Social Platforms│
           │                                              │                     │
           │                                              └─────────────────────┘
           ▼
┌─────────────────────┐
│                     │
│  Push to Bluesky    │
│                     │
│                     │
└─────────────────────┘
```

## Step-by-Step Process

### 1. Create Podcast Content Offline
- Record podcast episode (audio and video)
- Edit and produce final versions
- Prepare show notes and transcript
- Create featured images and episode artwork
- Extract key segments for Shorts creation

### 2. Add Content to GitHub Repository
- Using Git LFS for large media files:
  - Store audio in `/content/podcasts/media/audio/`
  - Store video in `/content/podcasts/media/video/`
- Create episode markdown file in `/content/podcasts/episodes/` with metadata:
  ```yaml
  ---
  title: "Risk Management in AI-Driven Organizations"
  slug: "risk-management-ai-podcast"
  date: "2025-04-17"
  episode: 1
  season: 1
  duration: "32:45"
  audioFile: "content/podcasts/media/audio/risk-management-ai-podcast.mp3"
  videoFile: "content/podcasts/media/video/risk-management-ai-podcast.mp4"
  acastId: ""               # Will be populated by GitHub Actions
  acastEmbedUrl: ""         # Will be populated by GitHub Actions
  spotifyUrl: ""            # Will be populated by GitHub Actions
  appleUrl: ""              # Will be populated by GitHub Actions
  youtubeUrl: ""            # Will be populated by GitHub Actions
  guests:
    - name: "Sarah Chen"
      title: "Chief Risk Officer at TechCorp"
      linkedinUrl: "https://linkedin.com/in/sarahchen"
    - name: "David Martinez"
      title: "AI Ethics Lead at EnterpriseAI"
      linkedinUrl: "https://linkedin.com/in/davidmartinez"
  tags: ["AI", "risk management", "technology leadership"]
  excerpt: "A discussion on implementing risk frameworks for enterprise AI deployments"
  featuredImage: "podcast-s01e01.jpg"
  relatedArticles: ["risk-management-ai"]
  ---
  
  # Episode content and show notes...
  ```
- Add transcript to `/content/podcasts/transcripts/` if available
- Commit and push changes to GitHub

### 3. Automated Publishing via GitHub Actions
- GitHub Actions workflow triggered by content changes
- Workflow authenticates with Acast API
- Audio file uploaded to Acast
- Episode metadata and show notes provided to Acast
- Metadata updated with returned Acast URLs and distribution links

### 4. Distribution to Podcast Platforms
- Acast automatically distributes to:
  - Spotify
  - Apple Podcasts
  - Google Podcasts
  - Other podcast directories
- Distribution links are collected by GitHub Actions
- Episode metadata is updated with these links

### 5. YouTube Publication
- Separate GitHub Actions workflow uploads video version to YouTube
- Full episode uploaded to main YouTube channel
- Episode metadata updated with YouTube URL
- Shorts created from key segments (see Shorts workflow)

### 6. Website Episode Page Publication
- Website pulls updated content from GitHub repository
- Episode page displays:
  - Acast embedded player
  - Show notes and transcript
  - Platform links (Spotify, Apple, YouTube)
  - Links to related articles
  - Guest information

### 7. Bluesky Promotion
- GitHub Actions workflow creates post on Bluesky
- Post includes:
  - Episode title and excerpt
  - Link to website episode page
  - Relevant hashtags
  - External embed for podcast

## GitHub Repository Structure

The GitHub content repository maintains this structure for podcasts:

```
bfdc-content/
├── content/
│   ├── podcasts/
│   │   ├── episodes/              # Podcast episode metadata and show notes
│   │   │   └── risk-management-ai-podcast.md
│   │   ├── transcripts/           # Episode transcripts
│   │   │   └── risk-management-ai-podcast-transcript.md
│   │   └── media/                 # Media files (managed with Git LFS)
│   │       ├── audio/
│   │       │   └── risk-management-ai-podcast.mp3
│   │       └── video/
│   │           └── risk-management-ai-podcast.mp4
│   │   └── shorts/                # Short-form content derived from episodes
│   │       ├── metadata/          # Shorts metadata
│   │       │   └── risk-management-ai-short1.json
│   │       └── video/             # Short video files
│   │           └── risk-management-ai-short1.mp4
└── metadata/
    ├── podcasts.json              # Podcast index with metadata
    └── shorts.json                # Index of all shorts
```

## GitHub Actions Workflows

Two primary workflows support podcast publishing:

1. **podcast-publish.yml**: Uploads to Acast and updates metadata
2. **podcast-youtube-publish.yml**: Publishes full episodes to YouTube

## Acast Integration Benefits

- **Professional podcast hosting**: CDN-optimized delivery
- **Broad distribution**: Automatic publishing to all major platforms
- **Monetization options**: Access to Acast's advertising marketplace
- **Detailed analytics**: Cross-platform performance metrics
- **Dynamic ad insertion**: Revenue opportunities with minimal management

## Website Integration

The website displays embedded Acast players with Next.js server components:

```jsx
// app/podcasts/[slug]/page.tsx
import { getPodcastEpisode } from '@/lib/podcasts';

export default async function PodcastEpisodePage({ params }: { params: { slug: string } }) {
  const episode = await getPodcastEpisode(params.slug);
  
  return (
    <div className="episode-container">
      <h1>{episode.title}</h1>
      
      {/* Acast Player Embed */}
      <div className="episode-player">
        <iframe 
          src={episode.acastEmbedUrl} 
          frameBorder="0" 
          width="100%" 
          height="110px"
          allow="autoplay"
          title={episode.title}
        ></iframe>
      </div>
      
      {/* Episode details and show notes */}
      <div className="episode-content">
        {/* Show notes, guest info, etc. */}
      </div>
      
      {/* Platform links */}
      <div className="platform-links">
        {episode.spotifyUrl && (
          <a href={episode.spotifyUrl} target="_blank" rel="noopener noreferrer">
            Listen on Spotify
          </a>
        )}
        {/* Other platform links */}
      </div>
    </div>
  );
}
```

This approach:
- Reduces bandwidth costs on the website
- Provides accurate play count analytics
- Maintains consistent player experience
- Allows for dynamic ad insertion

## Cross-Content Integration

The podcast workflow integrates with the article workflow through:

1. **Related Content**: Link to related articles from podcast show notes
2. **Content Repurposing**: Create articles that expand on podcast topics
3. **Cross-Promotion**: Mention podcasts in articles and vice versa
4. **Unified Tagging**: Use consistent tags across both content types

## Analytics and Performance Tracking

Track podcast performance across platforms:
- **Acast Analytics**: Comprehensive listening data across all platforms
- **YouTube Analytics**: Video views and engagement
- **Website Analytics**: Page views and traffic sources
- **Cross-Referral Tracking**: Traffic between content types

This workflow creates a sustainable, scalable podcast process that leverages Acast for distribution while maintaining brianfending.com as the content hub and GitHub as the central content repository.