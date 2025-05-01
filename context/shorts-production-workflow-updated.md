# Short-Form Video Content Production Workflow

## Overview

This document outlines the complete process for creating, managing, and distributing high-quality short-form video content derived from podcast episodes. The workflow is designed to identify 2-3 distinct, high-value segments from each podcast episode, transform them into standalone short videos, and distribute them across platforms while maintaining centralized content management in the GitHub repository.

## Content Selection and Production Philosophy

### Selection Philosophy: "One Minute of Value"

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

## Detailed Workflow Process

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
│  6. Distribution &  │◀────┤  5. Post-Production │◀────┤  4. Raw Segment     │
│     Promotion       │     │     Enhancement     │     │     Extraction      │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

### 1. Full Podcast Production

- Record high-quality podcast episode (audio and video)
- Edit and produce the complete episode
- Add to GitHub repository under `content/podcasts/media/`
- Publish to Acast and cross-platform (as per the podcast workflow)

### 2. Content Review & Selection

- Watch the full episode specifically to identify potential shorts segments
- Tag 3-5 potential segments noting:
  - Start and end timestamps
  - Core insight/value
  - Visual dynamics
  - Potential title
  - Target audience
- Select the final 2-3 distinct segments based on quality, diversity, and audience appeal

### 3. Segment Documentation

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

### 4. Raw Segment Extraction

- Automated process via GitHub Actions to extract the raw video segments
- Process triggered by changes to shorts metadata files
- Raw clips saved to `content/podcasts/shorts/raw/`
- Confirmation logs generated to verify successful extraction

### 5. Post-Production Enhancement

- Convert to vertical format (9:16 ratio)
- Add consistent branded elements:
  - 3-5 second intro animation
  - Lower-third graphics for key points
  - Subtle branded watermark
  - End card with call-to-action
- Add captions and text emphasis
- Enhance audio quality if needed

### 6. Distribution & Promotion

- Automated upload to YouTube Shorts via GitHub Actions
- Manual native upload to LinkedIn (optimal performance)
- Automated sharing to Bluesky with appropriate content
- Update metadata with platform URLs
- Staggered release schedule to maximize audience touchpoints

## Technical Implementation 

### GitHub Repository Structure

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

#### Raw Clip Extraction Script

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

#### Vertical Format Conversion

```python
# scripts/format_shorts.py
import os
import subprocess
from pathlib import Path

def format_to_vertical():
    """Convert raw clips to vertical 9:16 format"""
    raw_dir = Path("content/podcasts/shorts/raw")
    output_dir = Path("content/podcasts/shorts/processed")
    output_dir.mkdir(exist_ok=True, parents=True)
    
    # Process all raw clips
    for video_file in raw_dir.glob("*.mp4"):
        short_id = video_file.stem
        output_file = output_dir / f"{short_id}.mp4"
        
        print(f"Converting {short_id} to vertical format")
        
        # FFmpeg command for vertical transformation
        cmd = [
            "ffmpeg", "-y",
            "-i", str(video_file),
            # Create black background (1080x1920)
            "-f", "lavfi", "-i", "color=c=black:s=1080x1920",
            # Scale and position video on background
            "-filter_complex",
            "[0:v]scale=1080:-1,setsar=1,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black[v];" +
            "[1:v][v]overlay=0:0[outv]",
            # Map the video and audio streams
            "-map", "[outv]",
            "-map", "0:a",
            # Encoding settings
            "-c:v", "libx264", "-crf", "22",
            "-c:a", "copy",
            str(output_file)
        ]
        
        subprocess.run(cmd, check=True)
        
        print(f"Successfully converted {short_id}")

if __name__ == "__main__":
    format_to_vertical()
```

#### Branding Application

```python
# scripts/brand_shorts.py
import os
import json
import subprocess
from pathlib import Path
import tempfile

def add_branding_to_shorts():
    """Add intro, outro, watermark and captions to shorts"""
    processed_dir = Path("content/podcasts/shorts/processed")
    final_dir = Path("content/podcasts/shorts/final")
    metadata_dir = Path("content/podcasts/shorts-metadata")
    assets_dir = Path("content/podcasts/shorts/assets")
    
    final_dir.mkdir(exist_ok=True, parents=True)
    
    # Find all metadata files to get short information
    for metadata_file in metadata_dir.glob("*.json"):
        with open(metadata_file, "r") as f:
            metadata = json.load(f)
        
        shorts_data = metadata.get("shorts", [])
        
        for short in shorts_data:
            if short.get("status") != "extracted":
                continue
                
            short_id = short.get("id")
            title = short.get("title")
            
            # Source processed video
            processed_video = processed_dir / f"{short_id}.mp4"
            if not processed_video.exists():
                print(f"ERROR: Processed video not found for {short_id}")
                continue
            
            # Asset paths
            intro_video = assets_dir / "intros/standard-intro.mp4"
            outro_video = assets_dir / "outros/cta-outro.mp4"
            watermark = assets_dir / "graphics/corner-logo.png"
            
            # Output file
            output_file = final_dir / f"{short_id}.mp4"
            
            print(f"Adding branding to {short_id}")
            
            # First add watermark and title
            with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as temp_file:
                watermarked_file = temp_file.name
            
            # Add watermark and title overlay
            watermark_cmd = [
                "ffmpeg", "-y",
                "-i", str(processed_video),
                "-i", str(watermark),
                "-filter_complex",
                # Position watermark and add title text
                "[0:v][1:v]overlay=W-w-20:H-h-20:format=auto,drawtext=text='" + 
                title + "':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.5:" +
                "boxborderw=10:x=(w-text_w)/2:y=h-text_h-60[v]",
                "-map", "[v]",
                "-map", "0:a",
                "-c:v", "libx264", "-crf", "22",
                "-c:a", "copy",
                watermarked_file
            ]
            
            subprocess.run(watermark_cmd, check=True)
            
            # Create file list for concat
            with tempfile.NamedTemporaryFile('w', suffix='.txt', delete=False) as f:
                concat_list = f.name
                f.write(f"file '{intro_video}'\n")
                f.write(f"file '{watermarked_file}'\n")
                f.write(f"file '{outro_video}'\n")
            
            # Concatenate intro, watermarked clip, and outro
            concat_cmd = [
                "ffmpeg", "-y",
                "-f", "concat",
                "-safe", "0",
                "-i", concat_list,
                "-c:v", "libx264", "-crf", "22",
                "-c:a", "aac", "-b:a", "192k",
                str(output_file)
            ]
            
            subprocess.run(concat_cmd, check=True)
            
            # Clean up temporary files
            os.remove(concat_list)
            os.remove(watermarked_file)
            
            # Update status in metadata
            short["status"] = "branded"
            print(f"Successfully branded {short_id}")
        
        # Save updated metadata
        with open(metadata_file, "w") as f:
            json.dump(metadata, f, indent=2)

if __name__ == "__main__":
    add_branding_to_shorts()
```

## GitHub Actions Workflows

### 1. Shorts Extraction Workflow

```yaml
# .github/workflows/shorts-extraction.yml
name: Shorts Extraction Workflow

on:
  push:
    branches: [ main ]
    paths:
      - 'content/podcasts/shorts-metadata/**'

jobs:
  extract_shorts:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          lfs: true     # Download LFS files
          
      - name: Setup Python
        uses: actions/setup-python@v3
        with:
          python-version: '3.10'
          
      - name: Install dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y ffmpeg
          pip install pathlib
          
      - name: Extract raw shorts
        run: python scripts/extract_shorts.py
        
      - name: Commit extracted shorts
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/podcasts/shorts/raw/
          git add content/podcasts/shorts-metadata/
          git commit -m "Extract shorts from episodes" || echo "No changes to commit"
          git push
```

### 2. Shorts Processing Workflow

```yaml
# .github/workflows/shorts-processing.yml
name: Shorts Processing Workflow

on:
  push:
    branches: [ main ]
    paths:
      - 'content/podcasts/shorts/raw/**'
      - 'content/podcasts/shorts-metadata/**'

jobs:
  process_shorts:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          lfs: true
          
      - name: Setup Python
        uses: actions/setup-python@v3
        with:
          python-version: '3.10'
          
      - name: Install dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y ffmpeg
          pip install pathlib
          
      - name: Convert to vertical format
        run: python scripts/format_shorts.py
        
      - name: Add branding elements
        run: python scripts/brand_shorts.py
        
      - name: Commit processed shorts
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git lfs track "content/podcasts/shorts/processed/*.mp4"
          git lfs track "content/podcasts/shorts/final/*.mp4"
          git add .gitattributes
          git add content/podcasts/shorts/processed/
          git add content/podcasts/shorts/final/
          git add content/podcasts/shorts-metadata/
          git commit -m "Process and brand shorts" || echo "No changes to commit"
          git push
```

### 3. Shorts Publishing Workflow

```yaml
# .github/workflows/shorts-publishing.yml
name: Shorts Publishing Workflow

on:
  push:
    branches: [ main ]
    paths:
      - 'content/podcasts/shorts/final/**'

jobs:
  publish_shorts:
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
        run: |
          npm install googleapis @atproto/api
          
      - name: Publish to YouTube Shorts
        run: node scripts/publish_youtube_shorts.js
        env:
          YOUTUBE_CLIENT_ID: ${{ secrets.YOUTUBE_CLIENT_ID }}
          YOUTUBE_CLIENT_SECRET: ${{ secrets.YOUTUBE_CLIENT_SECRET }}
          YOUTUBE_REFRESH_TOKEN: ${{ secrets.YOUTUBE_REFRESH_TOKEN }}
          
      - name: Share to Bluesky
        run: node scripts/share_to_bluesky.js
        env:
          BLUESKY_EMAIL: ${{ secrets.BLUESKY_EMAIL }}
          BLUESKY_PASSWORD: ${{ secrets.BLUESKY_PASSWORD }}
          
      - name: Commit updated metadata
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/podcasts/shorts-metadata/
          git add metadata/shorts.json
          git commit -m "Update shorts with platform URLs" || echo "No changes to commit"
          git push
```

## Workflow Automation Capabilities

The following processes can be fully automated through GitHub Actions:

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

6. **LinkedIn Sharing**: ❌ Requires manual upload
   - Native video uploads perform significantly better
   - Requires customized messaging
   - Benefits from active engagement after posting

## Required Assets for Implementation

1. **Video Elements**:
   - Standard intro animation (3-5 seconds)
   - End card/outro with call-to-action
   - Watermark/logo (transparent PNG)

2. **Design Elements**:
   - Lower-third template
   - Typography specifications
   - Color palette guidelines

3. **Technical Requirements**:
   - GitHub LFS setup for large media files
   - FFmpeg installed on GitHub Actions runner
   - API credentials for YouTube and Bluesky

## Staged Production Schedule

For optimal audience engagement, implement a staggered release schedule:

1. **Full Episode Release**: Day 0
2. **First Short**: Day 2-3 (strongest segment)
3. **Second Short**: Day 5-7 (different topic/angle)
4. **Third Short**: Day 9-10 (if available/needed)

This approach maximizes visibility while preventing audience fatigue.

## Metrics and Analytics

Track the following metrics to optimize performance:

1. **Engagement Metrics**:
   - View-through rate
   - Engagement rate (likes, comments, shares)
   - Click-through to full content

2. **Platform Comparison**:
   - Performance differences between platforms
   - Optimal timing on each platform
   - Content type preferences by platform

3. **Content Effectiveness**:
   - Which topics generate highest engagement
   - Optimal length for retention
   - Style elements that drive performance

## Implementation Timeline

1. **Setup Phase** (1-2 weeks):
   - Create repository structure
   - Develop extraction and processing scripts
   - Design branded templates
   - Configure GitHub Actions workflows

2. **Testing Phase** (1 week):
   - Test with sample content
   - Verify automation processes
   - Adjust scripts as needed

3. **Production Launch** (ongoing):
   - Begin with one episode
   - Monitor performance
   - Adjust timing and format based on data

By implementing this comprehensive workflow, you'll create a system that efficiently produces high-quality, distinct short-form video content from your podcast episodes while maintaining centralized management through your GitHub repository.