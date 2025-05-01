# GitHub Actions Workflows for Podcast Distribution

## Overview

This document details the GitHub Actions workflows that automate podcast and shorts distribution from the content repository to various platforms. These workflows handle uploading to Acast, YouTube, and Bluesky while maintaining all content and metadata in a centralized GitHub repository.

## Workflow Architecture

```
┌─────────────────────────────────────────────────────┐
│ GitHub Content Repository                           │
│                                                     │
│ ┌─────────────────┐     ┌───────────────────────┐   │
│ │                 │     │                       │   │
│ │ Podcast Content │     │ Shorts Content        │   │
│ │ Updates         │     │ Updates               │   │
│ │                 │     │                       │   │
│ └─────────┬───────┘     └───────────┬───────────┘   │
│           │                         │               │
└───────────┼─────────────────────────┼───────────────┘
            │                         │
            ▼                         ▼
┌───────────────────────┐   ┌─────────────────────────┐
│                       │   │                         │
│ podcast-publish.yml   │   │ shorts-publish.yml      │
│                       │   │                         │
└───────────┬───────────┘   └───────────┬─────────────┘
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌─────────────────────────┐
│                       │   │                         │
│ Acast Upload          │   │ YouTube Shorts Upload   │
│ podcast-youtube.yml   │   │ Bluesky Share           │
│                       │   │                         │
└───────────┬───────────┘   └───────────┬─────────────┘
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌─────────────────────────┐
│                       │   │                         │
│ Update Metadata       │   │ Update Metadata         │
│ Trigger Website Update│   │ Trigger Website Update  │
│                       │   │                         │
└───────────────────────┘   └─────────────────────────┘
```

## Podcast Publishing Workflow

```yaml
# .github/workflows/podcast-publish.yml
name: Podcast Publishing Workflow

on:
  push:
    branches: [ main ]
    paths:
      - 'content/podcasts/episodes/**'
      - 'content/podcasts/media/**'

jobs:
  publish_to_acast:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          lfs: true     # Download LFS files
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install axios form-data
        
      - name: Identify new or updated episodes
        id: find_episodes
        run: |
          # Script to find new/updated episodes by comparing commits
          node scripts/identify-podcast-updates.js
          
      - name: Upload to Acast
        id: acast_upload
        if: steps.find_episodes.outputs.updated_episodes != ''
        run: |
          # Script to upload episodes to Acast via API
          node scripts/acast-upload.js
        env:
          ACAST_API_KEY: ${{ secrets.ACAST_API_KEY }}
          ACAST_SHOW_ID: ${{ secrets.ACAST_SHOW_ID }}
          UPDATED_EPISODES: ${{ steps.find_episodes.outputs.updated_episodes }}
          
      - name: Update episode metadata with Acast URLs
        if: steps.acast_upload.outputs.success == 'true'
        run: |
          # Script to update episode markdown files with Acast URLs
          node scripts/update-episode-metadata.js
        env:
          ACAST_RESULTS: ${{ steps.acast_upload.outputs.results }}
          
      - name: Commit updated metadata
        if: steps.acast_upload.outputs.success == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/podcasts/episodes/
          git add metadata/podcasts.json
          git commit -m "Update podcast metadata with Acast URLs [skip ci]"
          git push
          
      - name: Trigger website update
        if: steps.acast_upload.outputs.success == 'true'
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_ACCESS_TOKEN }}
          repository: fending/brianfending-nextjs
          event-type: podcast-update
          client-payload: '{"episodes": ${{ steps.acast_upload.outputs.updated_episodes_json }}}'
```

## YouTube Publishing Workflow

```yaml
# .github/workflows/podcast-youtube-publish.yml
name: Podcast YouTube Publishing Workflow

on:
  push:
    branches: [ main ]
    paths:
      - 'content/podcasts/episodes/**'
      - 'content/podcasts/media/video/**'

jobs:
  publish_to_youtube:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          lfs: true
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install googleapis
        
      - name: Identify new video episodes
        id: find_episodes
        run: |
          node scripts/identify-video-episodes.js
          
      - name: Upload to YouTube
        id: youtube_upload
        if: steps.find_episodes.outputs.new_episodes != ''
        run: |
          node scripts/youtube-episode-upload.js
        env:
          YOUTUBE_CLIENT_ID: ${{ secrets.YOUTUBE_CLIENT_ID }}
          YOUTUBE_CLIENT_SECRET: ${{ secrets.YOUTUBE_CLIENT_SECRET }}
          YOUTUBE_REFRESH_TOKEN: ${{ secrets.YOUTUBE_REFRESH_TOKEN }}
          NEW_EPISODES: ${{ steps.find_episodes.outputs.new_episodes }}
          
      - name: Update episode metadata with YouTube URLs
        if: steps.youtube_upload.outputs.success == 'true'
        run: |
          node scripts/update-episode-youtube-urls.js
        env:
          YOUTUBE_RESULTS: ${{ steps.youtube_upload.outputs.results }}
          
      - name: Commit updated metadata
        if: steps.youtube_upload.outputs.success == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/podcasts/episodes/
          git add metadata/podcasts.json
          git commit -m "Update podcast metadata with YouTube URLs [skip ci]"
          git push
```

## Shorts Publishing Workflow

```yaml
# .github/workflows/shorts-publish.yml
name: Shorts Publishing Workflow

on:
  push:
    branches: [ main ]
    paths:
      - 'content/podcasts/shorts/**'

jobs:
  publish_to_youtube:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          lfs: true
          
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install googleapis @atproto/api
        
      - name: Identify new shorts
        id: find_shorts
        run: |
          node scripts/identify-new-shorts.js
          
      - name: Upload to YouTube Shorts
        id: youtube_upload
        if: steps.find_shorts.outputs.new_shorts != ''
        run: |
          node scripts/youtube-shorts-upload.js
        env:
          YOUTUBE_CLIENT_ID: ${{ secrets.YOUTUBE_CLIENT_ID }}
          YOUTUBE_CLIENT_SECRET: ${{ secrets.YOUTUBE_CLIENT_SECRET }}
          YOUTUBE_REFRESH_TOKEN: ${{ secrets.YOUTUBE_REFRESH_TOKEN }}
          NEW_SHORTS: ${{ steps.find_shorts.outputs.new_shorts }}
          
      - name: Update shorts metadata with YouTube URLs
        if: steps.youtube_upload.outputs.success == 'true'
        run: |
          node scripts/update-shorts-metadata.js
        env:
          YOUTUBE_RESULTS: ${{ steps.youtube_upload.outputs.results }}
          
      - name: Share to Bluesky
        if: steps.youtube_upload.outputs.success == 'true'
        run: |
          node scripts/bluesky-share.js
        env:
          BLUESKY_EMAIL: ${{ secrets.BLUESKY_EMAIL }}
          BLUESKY_PASSWORD: ${{ secrets.BLUESKY_PASSWORD }}
          YOUTUBE_RESULTS: ${{ steps.youtube_upload.outputs.results }}
          
      - name: Commit updated metadata
        if: steps.youtube_upload.outputs.success == 'true'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/podcasts/shorts/metadata/
          git add metadata/shorts.json
          git commit -m "Update shorts metadata with YouTube URLs [skip ci]"
          git push
          
      - name: Trigger website update
        if: steps.youtube_upload.outputs.success == 'true'
        uses: peter-evans/repository-dispatch@v2
        with:
          token: ${{ secrets.REPO_ACCESS_TOKEN }}
          repository: fending/brianfending-nextjs
          event-type: shorts-update
          client-payload: '{"shorts": ${{ steps.youtube_upload.outputs.updated_shorts_json }}}'
```

## Key Implementation Scripts

### 1. Acast Upload Script

```javascript
// scripts/acast-upload.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const matter = require('gray-matter');

// Configuration
const ACAST_API_BASE = 'https://api.acast.com/v2';
const ACAST_API_KEY = process.env.ACAST_API_KEY;
const ACAST_SHOW_ID = process.env.ACAST_SHOW_ID;
const UPDATED_EPISODES = process.env.UPDATED_EPISODES.split(',');

async function uploadEpisode(episodeSlug) {
  // Get episode metadata
  const episodePath = path.join('content', 'podcasts', 'episodes', `${episodeSlug}.md`);
  const fileContent = fs.readFileSync(episodePath, 'utf8');
  const { data: metadata, content } = matter(fileContent);
  
  // Get audio file
  const audioPath = path.join(metadata.audioFile);
  const audioFileName = path.basename(audioPath);
  
  // Create form data for upload
  const formData = new FormData();
  formData.append('audio', fs.createReadStream(audioPath), audioFileName);
  formData.append('title', metadata.title);
  formData.append('description', metadata.excerpt);
  formData.append('publishingDate', new Date(metadata.date).toISOString());
  
  try {
    // Upload to Acast
    const response = await axios.post(
      `${ACAST_API_BASE}/shows/${ACAST_SHOW_ID}/episodes`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'X-API-Key': ACAST_API_KEY,
        }
      }
    );
    
    // Return episode info from Acast
    return {
      slug: episodeSlug,
      acastId: response.data.id,
      acastEmbedUrl: response.data.embedUrl,
      spotifyUrl: response.data.spotify?.url || '',
      appleUrl: response.data.apple?.url || ''
    };
  } catch (error) {
    console.error(`Error uploading episode ${episodeSlug}:`, error.message);
    return {
      slug: episodeSlug,
      error: error.message
    };
  }
}

async function main() {
  try {
    const results = [];
    
    for (const episodeSlug of UPDATED_EPISODES) {
      const result = await uploadEpisode(episodeSlug);
      results.push(result);
    }
    
    // Set output for GitHub Actions
    const successfulUploads = results.filter(r => !r.error);
    console.log(`::set-output name=success::${successfulUploads.length > 0}`);
    console.log(`::set-output name=results::${JSON.stringify(results)}`);
    console.log(`::set-output name=updated_episodes_json::${JSON.stringify(
      successfulUploads.map(r => ({ 
        slug: r.slug, 
        acastId: r.acastId, 
        acastEmbedUrl: r.acastEmbedUrl 
      }))
    )}`);
  } catch (error) {
    console.error('Error in upload process:', error);
    console.log('::set-output name=success::false');
  }
}

main();
```

### 2. YouTube Shorts Upload Script

```javascript
// scripts/youtube-shorts-upload.js
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Parse new shorts from environment
const NEW_SHORTS = process.env.NEW_SHORTS.split(',');

// YouTube API authentication
async function authenticate() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    'http://localhost'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
  });

  return oauth2Client;
}

async function uploadShort(shortId) {
  try {
    // Read short metadata
    const metadataPath = path.join('content', 'podcasts', 'shorts', 'metadata', `${shortId}.json`);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    
    // Get video file path
    const videoPath = path.join('content', 'podcasts', 'shorts', 'video', `${shortId}.mp4`);
    
    // Set up YouTube API
    const auth = await authenticate();
    const youtube = google.youtube({ version: 'v3', auth });
    
    // Read episode metadata to get related info
    const episodesDir = path.join('content', 'podcasts', 'episodes');
    const episodeFile = fs.readdirSync(episodesDir)
      .find(file => file.includes(metadata.parentEpisode) && file.endsWith('.md'));
    
    let episodeMetadata = {};
    if (episodeFile) {
      const episodePath = path.join(episodesDir, episodeFile);
      const episodeContent = fs.readFileSync(episodePath, 'utf8');
      const frontmatterMatch = episodeContent.match(/---\s*([\s\S]*?)\s*---/);
      if (frontmatterMatch) {
        const frontmatterStr = frontmatterMatch[1];
        const frontmatterLines = frontmatterStr.split('\n');
        frontmatterLines.forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            episodeMetadata[key.trim()] = value.replace(/^['"]|['"]$/g, '');
          }
        });
      }
    }
    
    // Prepare video upload
    const fileSize = fs.statSync(videoPath).size;
    
    // Construct a good description with links
    const description = `${metadata.description}\n\n` +
      `From the podcast episode: "${episodeMetadata.title}"\n\n` +
      `Listen to the full episode:\n` +
      `🎧 Website: https://brianfending.com/podcasts/${metadata.parentEpisode}\n` +
      (episodeMetadata.spotifyUrl ? `🎧 Spotify: ${episodeMetadata.spotifyUrl}\n` : '') +
      (episodeMetadata.appleUrl ? `🎧 Apple Podcasts: ${episodeMetadata.appleUrl}\n` : '') +
      `\nSubscribe for more technology leadership insights:\n` +
      `🔔 YouTube: https://youtube.com/channel/YOUR_CHANNEL_ID\n` +
      `📱 LinkedIn: https://linkedin.com/in/brianfending\n` +
      `📧 Newsletter: https://brianfending.substack.com`;
    
    // Create tags array, adding standard channel tags
    const tags = [
      ...metadata.tags,
      'technology leadership',
      'enterprise technology',
      'Brian Fending'
    ];
    
    // Upload parameters
    const requestBody = {
      snippet: {
        title: metadata.title,
        description: description,
        tags: tags,
        categoryId: '28' // Science & Technology category
      },
      status: {
        privacyStatus: 'public',
        selfDeclaredMadeForKids: false
      }
    };
    
    // Create resumable upload session
    const res = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody,
      media: {
        body: fs.createReadStream(videoPath)
      }
    });
    
    return {
      shortId: shortId,
      youtubeId: res.data.id,
      youtubeUrl: `https://youtube.com/shorts/${res.data.id}`
    };
  } catch (error) {
    console.error(`Error uploading short ${shortId}:`, error.message);
    return {
      shortId: shortId,
      error: error.message
    };
  }
}

async function main() {
  try {
    const results = [];
    
    for (const shortId of NEW_SHORTS) {
      const result = await uploadShort(shortId);
      results.push(result);
    }
    
    // Set output for GitHub Actions
    const successfulUploads = results.filter(r => !r.error);
    console.log(`::set-output name=success::${successfulUploads.length > 0}`);
    console.log(`::set-output name=results::${JSON.stringify(results)}`);
    console.log(`::set-output name=updated_shorts_json::${JSON.stringify(
      successfulUploads.map(r => ({ 
        shortId: r.shortId, 
        youtubeId: r.youtubeId, 
        youtubeUrl: r.youtubeUrl 
      }))
    )}`);
  } catch (error) {
    console.error('Error in upload process:', error);
    console.log('::set-output name=success::false');
  }
}

main();
```

### 3. Bluesky Sharing Script

```javascript
// scripts/bluesky-share.js
const { BskyAgent } = require('@atproto/api');
const fs = require('fs');
const path = require('path');

// Parse YouTube results from environment
const YOUTUBE_RESULTS = JSON.parse(process.env.YOUTUBE_RESULTS);

async function shareToBluesky(shortId, youtubeId, youtubeUrl) {
  try {
    // Read short metadata
    const metadataPath = path.join('content', 'podcasts', 'shorts', 'metadata', `${shortId}.json`);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    
    // Authenticate with Bluesky
    const agent = new BskyAgent({ service: 'https://bsky.social' });
    await agent.login({
      identifier: process.env.BLUESKY_EMAIL,
      password: process.env.BLUESKY_PASSWORD
    });
    
    // Create post text
    const postText = `🎬 New short: ${metadata.title}\n\n` +
      `${metadata.description}\n\n` +
      `Watch now: ${youtubeUrl}\n\n` +
      `Full episode: https://brianfending.com/podcasts/${metadata.parentEpisode}\n\n` +
      `#TechnologyLeadership #AI #EnterpriseIT`;
    
    // Create post
    const response = await agent.post({
      text: postText,
      embed: {
        $type: 'app.bsky.embed.external',
        external: {
          uri: youtubeUrl,
          title: metadata.title,
          description: metadata.description
        }
      }
    });
    
    return {
      shortId: shortId,
      blueskyPostId: response.uri
    };
  } catch (error) {
    console.error(`Error sharing to Bluesky for short ${shortId}:`, error.message);
    return {
      shortId: shortId,
      error: error.message
    };
  }
}

async function main() {
  try {
    const results = [];
    
    for (const result of YOUTUBE_RESULTS) {
      if (result.error) continue;
      
      const blueskyResult = await shareToBluesky(
        result.shortId, 
        result.youtubeId, 
        result.youtubeUrl
      );
      
      results.push(blueskyResult);
    }
    
    console.log('Bluesky sharing results:', JSON.stringify(results));
  } catch (error) {
    console.error('Error in Bluesky sharing process:', error);
  }
}

main();
```

### 4. Metadata Update Script

```javascript
// scripts/update-shorts-metadata.js
const fs = require('fs');
const path = require('path');

// Get results from environment
const YOUTUBE_RESULTS = JSON.parse(process.env.YOUTUBE_RESULTS);

// Update shorts metadata index
const shortsJsonPath = path.join('metadata', 'shorts.json');
let shortsData = [];

if (fs.existsSync(shortsJsonPath)) {
  shortsData = JSON.parse(fs.readFileSync(shortsJsonPath, 'utf8'));
}

// Update individual short metadata files
for (const result of YOUTUBE_RESULTS) {
  if (result.error) continue;
  
  const shortPath = path.join('content', 'podcasts', 'shorts', 'metadata', `${result.shortId}.json`);
  const shortContent = fs.readFileSync(shortPath, 'utf8');
  const shortMetadata = JSON.parse(shortContent);
  
  // Update metadata with YouTube data
  shortMetadata.youtubeId = result.youtubeId;
  shortMetadata.youtubeUrl = result.youtubeUrl;
  
  // Write back to file
  fs.writeFileSync(shortPath, JSON.stringify(shortMetadata, null, 2));
  
  // Update shorts.json
  const shortIndex = shortsData.findIndex(s => s.id === result.shortId);
  if (shortIndex >= 0) {
    shortsData[shortIndex] = {
      ...shortsData[shortIndex],
      youtubeId: result.youtubeId,
      youtubeUrl: result.youtubeUrl
    };
  } else {
    // Add new short to index
    shortsData.push({
      id: shortMetadata.id,
      title: shortMetadata.title,
      parentEpisode: shortMetadata.parentEpisode,
      duration: shortMetadata.duration,
      description: shortMetadata.description,
      publishedDate: shortMetadata.publishedDate,
      youtubeId: result.youtubeId,
      youtubeUrl: result.youtubeUrl,
      tags: shortMetadata.tags
    });
  }
}

// Sort by date (newest first)
shortsData.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

// Write updated shorts.json
fs.writeFileSync(shortsJsonPath, JSON.stringify(shortsData, null, 2));
```

## GitHub Secrets Configuration

This implementation requires the following GitHub Secrets:

### Acast Integration
- `ACAST_API_KEY`: Your Acast API key
- `ACAST_SHOW_ID`: The ID of your podcast show in Acast

### YouTube Integration
- `YOUTUBE_CLIENT_ID`: OAuth client ID from Google Developer Console
- `YOUTUBE_CLIENT_SECRET`: OAuth client secret from Google Developer Console
- `YOUTUBE_REFRESH_TOKEN`: Long-lived refresh token for authentication

### Bluesky Integration
- `BLUESKY_EMAIL`: Your Bluesky account email
- `BLUESKY_PASSWORD`: Your Bluesky account password

### Repository Integration
- `REPO_ACCESS_TOKEN`: GitHub token with repository dispatch permissions

## Setup and Configuration Steps

1. **Create API Credentials**
   - Set up Acast API access in your Acast account
   - Create a Google Cloud project and set up YouTube Data API v3
   - Generate OAuth credentials in Google Developer Console
   - Set up a Bluesky account for automated sharing

2. **Install Dependencies**
   ```bash
   npm install googleapis axios form-data @atproto/api
   ```

3. **Configure Git LFS**
   ```bash
   git lfs install
   git lfs track "content/podcasts/media/audio/*.mp3"
   git lfs track "content/podcasts/media/video/*.mp4"
   git lfs track "content/podcasts/shorts/video/*.mp4"
   git add .gitattributes
   ```

4. **Create Directory Structure**
   ```bash
   mkdir -p content/podcasts/episodes
   mkdir -p content/podcasts/transcripts
   mkdir -p content/podcasts/media/audio
   mkdir -p content/podcasts/media/video
   mkdir -p content/podcasts/shorts/metadata
   mkdir -p content/podcasts/shorts/video
   mkdir -p metadata
   ```

5. **Add Workflow Files**
   - Create `.github/workflows/` directory
   - Add the workflow files defined above
   - Create script files in a `/scripts` directory

6. **Set up GitHub Secrets**
   - Navigate to repository Settings > Secrets
   - Add all required secrets for API access

## Benefits of GitHub Actions Automation

1. **Centralized Content Management**: All content and metadata managed in one repository
2. **Automated Multi-Platform Distribution**: Single push triggers distribution across platforms
3. **Metadata Synchronization**: Platform URLs and IDs automatically updated in repository
4. **Version Control**: Complete history of all content and distribution activities
5. **Workflow Orchestration**: Coordinated publishing across multiple platforms
6. **Reduced Manual Steps**: Minimize repetitive publishing tasks

This GitHub Actions implementation streamlines the entire podcast and shorts distribution process, allowing you to focus on creating quality content while automation handles the distribution and platform integration.