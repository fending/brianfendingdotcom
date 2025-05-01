# BrianFending.com Design System Guide

## Core Brand Principles

The BrianFending.com website design should embody these key brand principles:

1. **Professional Expertise** - Communicate thought leadership and technical credibility
2. **Clarity & Accessibility** - Present complex technical concepts with clarity
3. **Thoughtful Minimalism** - Use restraint in visual elements to focus on content
4. **Content-First Approach** - Design decisions should enhance content consumption
5. **Cross-Platform Integration** - Visual design should acknowledge the multi-platform content strategy

## Visual Identity

### Color System

#### Primary Palette
- **Primary Blue**: `#3B82F6` (use for main CTAs, links, brand highlights)
- **Primary Dark**: `#1E40AF` (use for hover states, secondary emphasis)
- **Primary Light**: `#DBEAFE` (use for backgrounds, subtle highlights)

#### Secondary Palette
- **Secondary Teal**: `#10B981` (use sparingly for contrast and highlights)
- **Secondary Dark**: `#065F46` (use for hover states when using secondary colors)
- **Secondary Light**: `#D1FAE5` (use for backgrounds, card highlights)

#### Neutral Palette
- **Background**: `#F9FAFB` (light mode) / `#111827` (dark mode)
- **Surface**: `#FFFFFF` (light mode) / `#1F2937` (dark mode)
- **Text Primary**: `#111827` (light mode) / `#F9FAFB` (dark mode)
- **Text Secondary**: `#4B5563` (light mode) / `#9CA3AF` (dark mode)
- **Border**: `#E5E7EB` (light mode) / `#374151` (dark mode)

#### Semantic Colors
- **Success**: `#10B981` (teal)
- **Error**: `#EF4444` (red)
- **Warning**: `#F59E0B` (amber)
- **Info**: `#3B82F6` (blue)

### Typography

#### Font Families
- **Headings**: Fraunces (serif)
- **Body**: Inter (sans-serif)
- **Code**: Fira Code (monospace)

#### Type Scale
- **Base**: 16px (1rem)
- **Scale Ratio**: 1.25 (major third)
- **Sizes**:
  - xs: 0.75rem (12px)
  - sm: 0.875rem (14px)
  - base: 1rem (16px)
  - lg: 1.125rem (18px)
  - xl: 1.25rem (20px)
  - 2xl: 1.5rem (24px)
  - 3xl: 1.875rem (30px)
  - 4xl: 2.25rem (36px)
  - 5xl: 3rem (48px)

#### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

#### Line Heights
- **Tight**: 1.25
- **Normal**: 1.5
- **Relaxed**: 1.75

### Spacing System

Use an 8px grid system for consistent spacing:
- **2xs**: 0.25rem (4px)
- **xs**: 0.5rem (8px)
- **sm**: 0.75rem (12px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)
- **4xl**: 6rem (96px)

### Border Radius
- **Small**: 0.25rem (4px)
- **Medium**: 0.375rem (6px)
- **Large**: 0.5rem (8px)
- **XL**: 0.75rem (12px)
- **Full**: 9999px (for pills and circles)

### Shadows
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
- **card**: `0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)`
- **card-hover**: `0 12px 20px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)`

## Components

### Buttons

#### Primary Button
- **Background**: Primary Blue
- **Text**: White
- **Border**: None
- **Padding**: 0.5rem 1rem (8px 16px)
- **Border Radius**: Medium (6px)
- **Hover State**: Primary Dark background, subtle shadow increase
- **Focus State**: White outline with 2px offset
- **Disabled State**: 60% opacity, no hover effects

#### Secondary Button
- **Background**: White (light mode) / Gray-800 (dark mode)
- **Text**: Primary Blue
- **Border**: 1px Primary Blue
- **Padding**: 0.5rem 1rem (8px 16px)
- **Border Radius**: Medium (6px)
- **Hover State**: Light Blue background, Primary Blue border
- **Focus State**: Primary Blue outline with 2px offset
- **Disabled State**: 60% opacity, no hover effects

#### Neutral Button
- **Background**: Gray-200 (light mode) / Gray-700 (dark mode)
- **Text**: Gray-800 (light mode) / White (dark mode)
- **Border**: None
- **Padding**: 0.5rem 1rem (8px 16px)
- **Border Radius**: Medium (6px)
- **Hover State**: Gray-300 background (light mode) / Gray-600 (dark mode)
- **Focus State**: Gray-400 outline with 2px offset
- **Disabled State**: 60% opacity, no hover effects

### Cards

#### Standard Card
- **Background**: White (light mode) / Gray-800 (dark mode)
- **Border Radius**: Large (8px)
- **Shadow**: card
- **Padding**: 1.5rem (24px)
- **Border**: Optional 1px Border color
- **Hover State**: card-hover shadow
- **Animation**: 150ms transition for all properties

#### Article Card
- **Background**: White (light mode) / Gray-800 (dark mode)
- **Border Radius**: Large (8px)
- **Shadow**: card
- **Image**: 100% width, aspect ratio 16:9, object-fit cover
- **Padding**: 1.5rem (24px) for content area
- **Spacing**: 1rem (16px) between elements
- **Title**: 2xl (24px), Bold, Fraunces
- **Meta**: sm (14px), Medium, Text Secondary color
- **Excerpt**: base (16px), Regular, 3 lines max with ellipsis
- **Hover State**: card-hover shadow, subtle scale transform (1.02)
- **Animation**: 200ms transition for all properties

#### Feature Card
- **Background**: White (light mode) / Gray-800 (dark mode)
- **Border Radius**: XL (12px)
- **Shadow**: lg
- **Border**: Optional 1px Border color
- **Padding**: 2rem (32px)
- **Icon/Image**: 48px height, Primary Blue or Secondary Teal
- **Title**: xl (20px), Bold, Fraunces
- **Content**: base (16px), Regular
- **Hover State**: xl shadow, subtle scale transform (1.05)
- **Animation**: 200ms transition for all properties

### Navigation

#### Main Header
- **Background**: Transparent (when at top) / Surface color with 98% opacity and blur
- **Height**: 5rem (80px) on desktop, 4rem (64px) on mobile
- **Logo**: 2rem (32px) height
- **Links**: base (16px), Medium, Text Secondary, underline on hover
- **Active Link**: Text Primary, subtle underline or highlight
- **Padding**: 0.5rem 1rem (8px 16px) for links
- **Spacing**: 2rem (32px) between nav items on desktop
- **Mobile Menu**: hamburger icon, slide-in or dropdown panel
- **Transition**: 300ms for all properties, 150ms for hover states

#### Footer
- **Background**: Gray-900
- **Text**: White for headings, Gray-400 for body text
- **Padding**: Top: 4rem (64px), Bottom: 2rem (32px)
- **Columns**: 3 columns on desktop, single column on mobile
- **Logo**: 2rem (32px) height
- **Section Title**: lg (18px), Bold, Fraunces
- **Links**: base (16px), Regular, Gray-400, White on hover
- **Social Icons**: 1.25rem (20px), Gray-400, Primary Blue on hover
- **Border Top**: 1px Gray-800 for copyright section
- **Copyright**: sm (14px), Regular, Gray-500

### Form Elements

#### Text Input
- **Height**: 2.5rem (40px)
- **Padding**: 0.5rem 0.75rem (8px 12px)
- **Border**: 1px Border color
- **Border Radius**: Medium (6px)
- **Background**: White (light mode) / Gray-800 (dark mode)
- **Text**: Text Primary color
- **Placeholder**: Text Secondary color
- **Focus State**: Primary Blue border, subtle shadow
- **Error State**: Error color border, subtle error background
- **Disabled State**: Gray-100 background, 60% opacity

#### Form Label
- **Font**: sm (14px), Medium
- **Margin Bottom**: 0.25rem (4px)
- **Color**: Text Secondary

#### Checkbox & Radio
- **Size**: 1rem (16px)
- **Border**: 1px Border color
- **Border Radius**: Small (4px) for checkbox, Full for radio
- **Checked State**: Primary Blue background, White check
- **Focus State**: Primary Blue outline with 2px offset

## Layout

### Grid System
- **Columns**: 12 columns
- **Gutters**: 1.5rem (24px)
- **Margins**: 1rem (16px) on mobile, 2rem (32px) on tablet, 4rem (64px) on desktop
- **Breakpoints**:
  - **xs**: 0px
  - **sm**: 640px
  - **md**: 768px
  - **lg**: 1024px
  - **xl**: 1280px
  - **2xl**: 1536px

### Containers
- **Container Default**: Max-width 1280px, centered with responsive padding
- **Container Narrow**: Max-width 768px, centered with responsive padding
- **Container Wide**: Max-width 1536px, centered with responsive padding

### Sections
- **Vertical Padding**: 4rem (64px) on desktop, 3rem (48px) on mobile
- **Margin Bottom**: 2rem (32px) between major sections
- **Section Dividers**: Optional 1px Border color

## Page Templates

### Homepage
- **Hero Section**: Full-width, 85vh height max, prominent headline and subheadline
- **About Section**: Two columns on desktop, image + text
- **Feature Section**: 3-column grid of Feature Cards
- **Recent Articles**: Card grid with 3 columns on desktop, 2 on tablet, 1 on mobile
- **CTA Section**: Centered content, prominent button, optional background

### Article List Page
- **Hero Section**: 50vh height max, prominent headline and description
- **Filter/Category Options**: Horizontal scrollable on mobile, row on desktop
- **Article Grid**: 3 columns on desktop, 2 on tablet, 1 on mobile
- **Pagination/Load More**: Centered at bottom
- **Newsletter Signup**: Full-width section before footer

### Article Detail Page
- **Header**: Article title, meta information, featured image
- **Content Area**: Narrow container (768px max-width)
- **Typography**: Larger base font size (18px), comfortable line height (1.8)
- **Section Spacing**: 2rem (32px) between major sections
- **Featured Image**: Full-width, responsive height
- **Related Articles**: Card grid at bottom of article
- **Author Bio**: Card with avatar, name, title, and brief bio
- **Social Sharing**: Floating or inline share buttons
- **Platform Links**: Prominent links to LinkedIn and Substack versions

## Animation & Interaction

### Timing
- **Quick**: 150ms (for hover states, small UI elements)
- **Default**: 300ms (for most transitions)
- **Complex**: 500ms (for page transitions, larger animations)

### Easing
- **Default**: cubic-bezier(0.4, 0, 0.2, 1) (smooth)
- **In**: cubic-bezier(0.4, 0, 1, 1) (acceleration)
- **Out**: cubic-bezier(0, 0, 0.2, 1) (deceleration)
- **In-Out**: cubic-bezier(0.4, 0, 0.2, 1) (acceleration then deceleration)

### Hover States
- **Scale**: Small elements: 1.05, Larger elements: 1.02
- **Opacity**: 0.8 to 1.0 for images
- **Shadow**: Increase shadow on hover for cards and buttons
- **Color**: Darken for buttons, brighten for text links

### Page Transitions
- **Fade**: 300ms fade for page transitions
- **Slide**: Optional subtle slide up (20px) combined with fade
- **Sequential Load**: Header first, then main content, then sidebar elements

## Content Specific Guidelines

### Article Thumbnails
- **Aspect Ratio**: 16:9
- **Resolution**: Minimum 1200px width
- **Style**: Abstract or conceptual imagery related to topic
- **Text Overlay**: Avoid text in thumbnails
- **Focus Point**: Center or center-top for consistent card presentation

### Profile Photos
- **Aspect Ratio**: 1:1 (square)
- **Style**: Professional, consistent background
- **Crop**: Face and shoulders visible
- **Resolution**: Minimum 400px by 400px

### Technical Diagrams
- **Style**: Clean, minimal
- **Colors**: Use brand colors for emphasis
- **Typography**: Inter for labels, consistent with body text
- **Borders**: 1px solid for lines and borders
- **Background**: Light gray or subtle grid for technical areas

## Accessibility Guidelines

### Color Contrast
- **Text**: Minimum ratio of 4.5:1 for normal text, 3:1 for large text
- **UI Components**: Minimum ratio of 3:1 for boundaries of active UI components

### Focus States
- **Visibility**: All interactive elements must have visible focus states
- **Style**: 2px outline with 2px offset, Primary Blue color
- **Consistency**: Consistent focus indicators across all components

### Text Size
- **Minimum**: 14px for secondary text, 16px for primary text
- **Scalability**: All text must scale properly when browser text size is increased

### Semantic Structure
- **Headings**: Proper hierarchy (H1 → H6) without skipping levels
- **Landmarks**: Proper use of semantic HTML (header, main, footer, aside, etc.)
- **ARIA**: Use ARIA attributes where appropriate, but prefer semantic HTML

## Design-to-Code Implementation

### CSS Architecture
- **Methodology**: Utility-first with Tailwind CSS
- **Custom Properties**: Use CSS variables for theme colors and key values
- **Naming Convention**: Follow Tailwind naming conventions for custom utilities
- **Media Queries**: Use Tailwind breakpoint system consistently

### Component Implementation
- **Approach**: Functional React components with TypeScript
- **Props**: Clear prop interfaces with proper typing
- **Variants**: Use prop-based variants for component variations
- **Composition**: Design components for composition and reusability

### Performance Considerations
- **Images**: Optimize and serve responsive images with Next.js Image component
- **Lazy Loading**: Implement for off-screen images and components
- **CSS**: Minimize unused CSS with PurgeCSS
- **Animations**: Use `will-change` and hardware-accelerated properties judiciously

## Dark Mode Implementation

- **Approach**: Use CSS variables with Tailwind's dark mode
- **Default**: Light mode with option to toggle
- **Persistence**: Save user preference in localStorage
- **System Preference**: Respect prefers-color-scheme media query
- **Transitions**: Smooth transition between modes (300ms)

## Content Syndication UI

### Platform Integration
- **Platform Icons**: Consistent icon style for LinkedIn, Substack, etc.
- **Attribution Text**: Subtle, consistent format for noting original source
- **Link Styling**: Distinct visual treatment for cross-platform links
- **Related Content**: Clear visual relationship between related articles/podcasts

### Content Hub Styling
- **Summary Cards**: Distinct from full-content cards (more compact)
- **Platform Buttons**: Prominent buttons for "Read on LinkedIn" and "Read on Substack"
- **Content Type Indicators**: Visual indicators for articles vs. podcasts vs. other content
- **Newsletter CTA**: Consistent, prominent newsletter signup component

## Next.js Specific Design Considerations

### Server Components
- **Loading UI**: Design placeholders and skeleton states for content loading
- **Progressive Enhancement**: Ensure components gracefully enhance with client-side hydration
- **Streaming UI**: Consider component streaming patterns for large page layouts

### Image Optimization
- **Next/Image Component**: Use throughout for automatic optimization
- **Image Priority**: Set priority prop for above-the-fold images
- **Placeholder Strategy**: Use blur placeholders for hero and feature images

### Animation
- **Client Components**: Use framer-motion in client components only
- **Entry Animations**: Apply to page sections as they enter viewport
- **Reduced Motion**: Support prefers-reduced-motion media query

## Implementation Checklist

When implementing designs based on this system, ensure:

1. **Consistency**: All elements follow the defined type scales, color systems, and spacing
2. **Responsiveness**: All components adapt appropriately across breakpoints
3. **Performance**: Images are optimized, animations are smooth, no layout shifts
4. **Accessibility**: Proper contrast, focus states, and semantic structure
5. **Dark Mode**: All components have appropriate dark mode variants
6. **Brand Alignment**: Visual elements reinforce the professional expertise brand
7. **Content Priority**: Design decisions enhance rather than distract from content
8. **Next.js Patterns**: Follow recommended Next.js patterns for Server Components and Client Components

## Version Control

This design system should evolve iteratively with the website. Document all changes:

- **Version**: 1.0.0
- **Last Updated**: April 30, 2025
- **Change Log**: Initial version for Next.js implementation