# Video Production Workflows: Podcast & Shorts

## Overview

This document consolidates the workflows for creating, managing, and distributing video content including full podcast episodes and short-form video content derived from podcasts. The workflows are designed to leverage GitHub Actions for automation and distribute content across multiple platforms while maintaining centralized management in the GitHub content repository.

## Podcast Content Workflow with Acast Integration

### Architecture Overview

The podcast workflow implements a hub-and-spoke model where all content is centrally managed:

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
│  Publish Episode    │◀────│  Publish to         │────▶│  Create Shorts      │
│  Page to Website    │     │  YouTube (Video)    │     │  from Video         │
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

### Step-by-Step Podcast Process

#### 1. Create Podcast Content Offline
- Record podcast episode (audio and video)
- Edit and produce final versions
- Prepare show notes and transcript
- Create featured images and episode artwork
- Extract key segments for Shorts creation

#### 2. Add Content to GitHub Repository
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

#### 3. Automated Publishing via GitHub Actions
- GitHub Actions workflow triggered by content changes
- Workflow authenticates with Acast API
- Audio file uploaded to Acast
- Episode metadata and show notes provided to Acast
- Metadata updated with returned Acast URLs and distribution links

#### 4. Distribution to Podcast Platforms
- Acast automatically distributes to:
  - Spotify
  - Apple Podcasts
  - Google Podcasts
  - Other podcast directories
- Distribution links are collected by GitHub Actions
- Episode metadata is updated with these links

#### 5. YouTube Publication
- Separate GitHub Actions workflow uploads video version to YouTube
- Full episode uploaded to main YouTube channel
- Episode metadata updated with YouTube URL
- Shorts created from key segments (see Shorts workflow)

#### 6. Website Episode Page Publication
- Website pulls updated content from GitHub repository
- Episode page displays:
  - Acast embedded player
  - Show notes and transcript
  - Platform links (Spotify, Apple, YouTube)
  - Links to related articles
  - Guest information

#### 7. Bluesky Promotion
- GitHub Actions workflow creates post on Bluesky
- Post includes:
  - Episode title and excerpt
  - Link to website episode page
  - Relevant hashtags
  - External embed for podcast

### GitHub Repository Structure for Podcasts

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

### Website Integration

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

## Short-Form Video Content Production Workflow

### Content Selection Philosophy: "One Minute of Value"

Each short must deliver complete, standalone value to viewers in approximately 60 seconds. We select segments based on:

1. **Complete Thought**: The segment must contain a full, coherent insight that works independently
2. **Distinct Topics**: Each short from the same episode should cover different subject matter
3. **High-Value Content**: Focus on actionable advice, surprising insights, or powerful explanations
4. **Visual Interest**: Segments with engaging visual elements or dynamic presenter movement
5. **Strong Emotional Moments**: Authentic reactions, passionate explanations, or impactful statements

### 2-3 Distinct Segments Approach

For each full podcast episode, we identify 2-3 completely different segments that:
- Cover separate topics or distinct aspects of the overall episode theme
- Feature different visual presentations or settings when possible
- Appeal to slightly different audience interests or needs
- Can be understood without requiring context from the other shorts

### Detailed Shorts Production Workflow

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  1. Full Podcast    │────▶│  2. Content Review  │────▶│  3. Segment         │
│     Production      │     │     & Selection     │     │     Documentation   │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └──────────┬──────────┘
                                                                    │
                                                                    ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  6. Distribution &  │◀────│  5. Post-Production │◀────│  4. Raw Segment     │
│     Promotion       │     │     Enhancement     │     │     Extraction      │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

#### 1. Full Podcast Production
- Record high-quality podcast episode (audio and video)
- Edit and produce the complete episode
- Add to GitHub repository under `content/podcasts/media/`
- Publish to Acast and cross-platform (as per the podcast workflow)

#### 2. Content Review & Selection
- Watch the full episode specifically to identify potential shorts segments
- Tag 3-5 potential segments noting:
  - Start and end timestamps
  - Core insight/value
  - Visual dynamics
  - Potential title
  - Target audience
- Select the final 2-3 distinct segments based on quality, diversity, and audience appeal

#### 3. Segment Documentation
- Create structured metadata files in the GitHub repository:
  - Location: `content/podcasts/shorts-metadata/[episode-slug]-shorts.json`
  - Format:
  ```json
  {
    "episode": "risk-management-ai-podcast",
    "shorts": [
      {
        "id": "risk-management-ai-short1",
        "title": "3 AI Risk Mitigation Strategies",
        "startTimestamp": "12:42",
        "endTimestamp": "13:38",
        "description": "Key strategies for mitigating AI risk in enterprise environments.",
        "tags": ["AI risk", "enterprise technology", "risk management"],
        "status": "pending"
      },
      {
        "id": "risk-management-ai-short2",
        "title": "Why Traditional Risk Models Fail",
        "startTimestamp": "07:15",
        "endTimestamp": "08:05",
        "description": "How n^a workflows complicate traditional risk assessment",
        "tags": ["risk assessment", "AI complexity", "enterprise risk"],
        "status": "pending"
      }
    ]
  }
  ```

#### 4. Raw Segment Extraction
- Automated process via GitHub Actions to extract the raw video segments
- Process triggered by changes to shorts metadata files
- Raw clips saved to `content/podcasts/shorts/raw/`
- Confirmation logs generated to verify successful extraction

#### 5. Post-Production Enhancement
- Convert to vertical format (9:16 ratio)
- Add consistent branded elements:
  - 3-5 second intro animation
  - Lower-third graphics for key points
  - Subtle branded watermark
  - End card with call-to-action
- Add captions and text emphasis
- Enhance audio quality if needed

#### 6. Distribution & Promotion
- Automated upload to YouTube Shorts via GitHub Actions
- Manual native upload to LinkedIn (optimal performance)
- Automated sharing to Bluesky with appropriate content
- Update metadata with platform URLs
- Staggered release schedule to maximize audience touchpoints

### GitHub Repository Structure for Shorts

```
bfdc-content/
├── content/
│   ├── podcasts/
│   │   ├── episodes/              # Podcast episode metadata
│   │   ├── transcripts/           # Episode transcripts
│   │   ├── media/                 # Full episode media files
│   │   │   ├── audio/
│   │   │   └── video/
│   │   └── shorts/                # Short-form content
│   │       ├── metadata/          # Shorts selection metadata
│   │       │   └── risk-management-ai-shorts.json
│   │       ├── raw/               # Raw extracted clips
│   │       ├── processed/         # Formatted vertical videos
│   │       ├── final/             # Completed shorts with branding
│   │       └── assets/            # Reusable branding elements
│   │           ├── intros/
│   │           ├── outros/
│   │           └── graphics/
├── .github/
│   └── workflows/
│       ├── shorts-extraction.yml  # Extract raw clips
│       ├── shorts-processing.yml  # Format and enhance 
│       └── shorts-publishing.yml  # Distribute to platforms
└── scripts/
    ├── extract_shorts.py          # Raw clip extraction
    ├── format_shorts.py           # Vertical formatting
    ├── brand_shorts.py            # Add branding elements
    └── publish_shorts.py          # Platform distribution
```

### Video Processing Technology

#### Core Technologies
- **FFmpeg**: Primary tool for video extraction and manipulation
- **Python**: Scripting language for workflow automation
- **Node.js**: Alternative for certain API integrations
- **Git LFS**: For managing large media files in repository

#### Example: Raw Clip Extraction Script

```python
# scripts/extract_shorts.py
import json
import os
import subprocess
from pathlib import Path

def extract_all_shorts():
    """Process all pending shorts extraction tasks"""
    metadata_dir = Path("content/podcasts/shorts-metadata")
    output_dir = Path("content/podcasts/shorts/raw")
    output_dir.mkdir(exist_ok=True, parents=True)
    
    # Find all shorts metadata files
    metadata_files = list(metadata_dir.glob("*.json"))
    print(f"Found {len(metadata_files)} shorts metadata files")
    
    for metadata_file in metadata_files:
        # Load metadata
        with open(metadata_file, "r") as f:
            metadata = json.load(f)
        
        episode_slug = metadata.get("episode")
        shorts_data = metadata.get("shorts", [])
        
        # Find the full episode video
        episode_video = Path(f"content/podcasts/media/video/{episode_slug}.mp4")
        if not episode_video.exists():
            print(f"ERROR: Source video not found for {episode_slug}")
            continue
            
        print(f"Processing {len(shorts_data)} shorts for episode {episode_slug}")
        
        # Process each short
        for short in shorts_data:
            if short.get("status") != "pending":
                continue
                
            short_id = short.get("id")
            start_time = short.get("startTimestamp")
            end_time = short.get("endTimestamp")
            
            # Output file path
            output_file = output_dir / f"{short_id}.mp4"
            
            print(f"Extracting {short_id} from {start_time} to {end_time}")
            
            # FFmpeg command for precise extraction
            cmd = [
                "ffmpeg", "-y",
                "-i", str(episode_video),
                "-ss", start_time,
                "-to", end_time,
                "-c:v", "libx264", "-crf", "18",
                "-preset", "fast",
                "-c:a", "aac", "-b:a", "192k",
                str(output_file)
            ]
            
            result = subprocess.run(cmd, check=True)
            
            if result.returncode == 0:
                # Update status in metadata
                short["status"] = "extracted"
                print(f"Successfully extracted {short_id}")
            else:
                print(f"Failed to extract {short_id}")
        
        # Save updated metadata
        with open(metadata_file, "w") as f:
            json.dump(metadata, f, indent=2)

if __name__ == "__main__":
    extract_all_shorts()
```

### Platform-Specific Optimizations

#### YouTube Shorts
- **Title Format**: Action-oriented, under 60 characters
- **Description Structure**:
  ```
  [Hook question/statement]
  
  From the podcast episode: "[Episode Title]"
  
  Listen to the full episode:
  🎧 Website: [URL]
  🎧 Spotify: [URL]
  🎧 Apple Podcasts: [URL]
  
  Subscribe for more technology leadership insights:
  🔔 YouTube: [URL]
  📱 LinkedIn: [URL]
  📧 Newsletter: [URL]
  ```
- **Tags**: 5-8 relevant hashtags
- **End Screen**: Call-to-action to subscribe and watch full episode

#### Bluesky
- **Post Format**:
  ```
  🎦 New short: [Title]

  [Brief description]

  Watch now: [YouTube URL]

  Full episode: [Website URL]

  #TechnologyLeadership #AI #EnterpriseIT
  ```
- **Timing**: Schedule posts during high-engagement periods
- **Hashtag Strategy**: Use consistent branded hashtags plus topic-specific tags

#### LinkedIn (Manual Sharing Strategy)
- **Upload Type**: Native video upload (not shared links)
- **Post Structure**:
  ```
  [Provocative question/statement]
  
  In this short clip from my latest podcast episode, I break down:
  
  • [Key point 1]
  • [Key point 2]
  • [Key point 3]
  
  [Brief context or insight]
  
  Want the full breakdown? Listen to the complete episode with [Guest Name] (link in comments).
  
  #AIRisk #EnterpriseAI #TechnologyLeadership
  ```
- **Timing**: Post 1-2 days after episode release, Tuesday-Thursday, 8-10am or 4-6pm
- **Engagement**: Respond to comments quickly, seed discussion with questions

## Automation Capabilities Summary

### Fully Automated Processes

1. **Raw Clip Extraction**: ✅ Fully automatable 
   - Triggered by updates to shorts metadata
   - Extracts precise segments from full episodes

2. **Vertical Format Conversion**: ✅ Fully automatable
   - Converts horizontal video to vertical format
   - Applies consistent formatting

3. **Basic Branding**: ✅ Fully automatable
   - Adds standard intro/outro
   - Applies watermark and basic text

4. **YouTube Publishing**: ✅ Fully automatable
   - Uploads to YouTube Shorts
   - Updates metadata with platform URLs

5. **Bluesky Sharing**: ✅ Fully automatable
   - Creates posts with appropriate formatting
   - Includes links to content

6. **Acast Integration**: ✅ Fully automatable
   - Uploads audio to Acast
   - Distributes to podcast platforms
   - Updates metadata with platform URLs

### Manual Processes

1. **LinkedIn Sharing**: ❌ Requires manual upload
   - Native video uploads perform significantly better
   - Requires customized messaging
   - Benefits from active engagement after posting

2. **Content Selection**: ❌ Requires manual curation
   - Identifying high-value segments
   - Ensuring distinct topics across shorts
   - Maintaining quality standards

## Staged Production Schedule

For optimal audience engagement, implement a staggered release schedule:

1. **Full Episode Release**: Day 0
2. **First Short**: Day 2-3 (strongest segment)
3. **Second Short**: Day 5-7 (different topic/angle)
4. **Third Short**: Day 9-10 (if available/needed)

This approach maximizes visibility while preventing audience fatigue.

## Cross-Content Integration

The video workflows integrate with the article workflow through:

1. **Related Content**: Link to related articles from podcast show notes
2. **Content Repurposing**: Create articles that expand on podcast topics
3. **Cross-Promotion**: Mention podcasts in articles and vice versa
4. **Unified Tagging**: Use consistent tags across both content types

## Analytics and Performance Tracking

Track video content performance across platforms:

### Podcast Analytics
- **Acast Analytics**: Comprehensive listening data across all platforms
- **YouTube Analytics**: Video views and engagement
- **Website Analytics**: Page views and traffic sources
- **Cross-Referral Tracking**: Traffic between content types

### Shorts Analytics
1. **Engagement Metrics**:
   - Views per platform
   - Watch time/retention rate
   - Social interactions (likes, comments, shares)
   - Click-through rate to full episode

2. **Cross-Platform Performance**:
   - Platform-specific audience response
   - Optimal content types by platform
   - Time-of-day effectiveness

3. **Content Effectiveness**:
   - Topic performance
   - Hook effectiveness
   - Call-to-action conversion rate

This comprehensive video production workflow creates a sustainable, scalable process that efficiently produces high-quality content from podcast episodes while maintaining centralized management through the GitHub repository and leveraging automation for efficient distribution across multiple platforms.