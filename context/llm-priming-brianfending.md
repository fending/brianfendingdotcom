# LLM Priming Strategy: brianfending.com

## Context

Super (hiresuper.com - property management AI receptionist) added footer links that send visitors to ChatGPT, Claude, and other LLMs with pre-crafted prompts. Their co-founder Lindsay Liu reports strong lead quality from visitors who researched them via AI first, plus potential SEO benefits from AI indexing.

**Super's actual implementation:**

- Simple footer with LLM icons
- Single prompt per site using persona-based framing
- Example: "As a property manager, I want to know what makes Super the best way to handle our phone lines and stop missing calls, and why an AI receptionist could be a fit for my business. Summarize the highlights from Super's website: <https://hiresuper.com>"

The strategic insight: people are already asking LLMs about solutions. We can pre-frame how those LLMs describe us by providing prompts that position us against actual considerations.

## Core Hypothesis

Prospects researching Brian Fending via LLMs will get better, more relevant information if we provide the prompt rather than letting them craft something generic. This creates:

- Third-party credibility (AI recommendation vs. self-promotion)
- Higher-quality leads (pre-qualified understanding)
- Reduced sales cycle (they show up informed)
- Discovery by people who wouldn't find the site via traditional search

## Implementation Approach

### Technical Specs

**Footer placement:**

```text
Ask AI about Brian Fending
[ChatGPT icon] [Claude icon] [Perplexity icon] [Gemini icon] [Grok icon]
```

Each icon links to the LLM's interface with a pre-populated prompt via URL parameters:

- ChatGPT: `https://chat.openai.com/?q=[encoded_prompt]`
- Claude: `https://claude.ai/new?q=[encoded_prompt]`
- Perplexity: `https://www.perplexity.ai/search/new?q=[encoded_prompt]`
- Gemini: `https://www.google.com/search?udm=50&aep=11&q=[encoded_prompt]`
- Grok: `https://x.com/i/grok?text=[encoded_prompt]`

Note: Grok uses `text=` parameter while others use `q=`. Gemini accessed via Google Search with special AI parameters.

### Prompt Strategy

**Single prompt (no persona segmentation):**

```text
I'm evaluating Brian Fending as a technology leadership consultant and want to understand his credibility and unique capabilities. What are his areas of expertise, what kind of problems does he solve, and what makes his approach different from typical IT consultants? Summarize the highlights from brianfending.com
```

**Why this works:**

- Credibility-focused (background, expertise, differentiation)
- Open-ended to surface diverse capabilities (MCP security research, IT leadership, governance)
- "What makes his approach different" prompts competitive positioning
- Lets LLMs naturally pull together the breadth of work without forcing narrow framing
- No persona needed - Brian's work spans too many domains to segment artificially

### Footer Copy

```text
Ask AI about Brian Fending
[ChatGPT] [Claude] [Perplexity] [Gemini] [Grok]
```

Simple, clean, mirrors Super's implementation.

## Success Metrics

**Leading indicators:**

1. Referrer data showing LLM source traffic
2. Time-on-site for LLM-sourced visitors vs. organic
3. Consultation booking rates by source
4. Quality of initial outreach (do they reference specific expertise?)

**Validation approach:**

- Track footer link clicks via analytics events
- UTM parameters on return visits if prospects click through from LLM
- Qualification questions in booking form: "How did you find us?" (add LLM option)

**Expected outcomes:**

- Higher lead quality (they've researched via third party)
- Longer initial conversations (they arrive informed)
- Reduced qualification time in sales process
- Better targeting (they self-select based on relevant expertise)

## Analytics Implementation

**Required tracking:**

```javascript
// Footer link click event
gtag('event', 'llm_prompt_click', {
  'llm_platform': 'chatgpt', // or claude, perplexity, gemini, grok
  'site': 'brianfending',
  'prompt_version': 'v1_2025_11'
});

// Return visitor detection
// Check referrer contains chatgpt.com, claude.ai, perplexity.ai, google.com/search, x.com
// Tag session with 'llm_researched' property
```

**Dashboard questions:**

- What % of consultation bookings researched via LLM first?
- Which LLM platforms drive highest quality leads?
- Do LLM-researched visitors spend more time on specific pages?
- What's the conversion rate difference for LLM-sourced vs organic traffic?

## Implementation Phases

### Phase 1: MVP (Week 1)

- Design footer component with LLM icons
- Finalize and test prompt across all five LLM platforms
- Implement basic click tracking
- Deploy to brianfending.com

### Phase 2: Validation (Weeks 2-4)

- Monitor click patterns and referrer data
- Manual testing: what does each LLM actually return for the prompt?
- Gather qualitative feedback from consultation bookings
- Document any prompt adjustments needed

### Phase 3: Optimization (Month 2)

- Analyze which LLMs drive best quality leads
- A/B test prompt variations if needed
- Refine based on conversion data
- Integrate learnings into other marketing channels

## Technical Notes

**Prompt encoding:**
Ensure prompts are properly URL-encoded, especially:

- Question marks
- Ampersands  
- Apostrophes
- Forward slashes (in URLs within the prompt)

**Testing checklist:**

- Test each LLM link to ensure prompt pre-fills correctly
- Verify mobile deep linking works (apps vs. web)
- Check that prompts aren't truncated on mobile screens
- Confirm icon sizes are appropriate for footer on mobile

**URL validation script:**

Run this Node.js script to verify URL encoding is working correctly:

```bash
node << 'NODESCRIPT'
const prompt = "I'm evaluating Brian Fending as a technology leadership consultant and want to understand his credibility and unique capabilities. What are his areas of expertise, what kind of problems does he solve, and what makes his approach different from typical IT consultants? Summarize the highlights from brianfending.com";
const encoded = encodeURIComponent(prompt);

console.log("Sample LLM URLs:");
console.log("");
console.log("ChatGPT:");
console.log("https://chat.openai.com/?q=" + encoded);
console.log("");
console.log("Claude:");
console.log("https://claude.ai/new?q=" + encoded);
console.log("");
console.log("Perplexity:");
console.log("https://www.perplexity.ai/search/new?q=" + encoded);
console.log("");
console.log("Gemini:");
console.log("https://www.google.com/search?udm=50&aep=11&q=" + encoded);
console.log("");
console.log("Grok (uses 'text' param):");
console.log("https://x.com/i/grok?text=" + encoded);
NODESCRIPT
```

This outputs properly encoded URLs for each platform. Copy and test them in your browser to verify the prompt pre-fills correctly.

**Mobile considerations:**

- Icon sizing on mobile
- Deep linking to LLM apps vs. web interfaces
- Touch target sizing for icons

## Content Dependencies

**brianfending.com needs:**

- Recent articles remain accessible and crawlable for LLM indexing
- About page clearly states positioning and differentiators
- MCP security article stays prominent (key differentiator for AI governance work)
- Technical depth visible (security research, engineering expertise)
- Executive communication capability evident (board presentation, risk translation)

## Risk Mitigation

**Potential issues:**

1. **LLM hallucination:** AI makes up details about services or expertise
   - Mitigation: Prompt explicitly requests "summarize highlights from brianfending.com"
   - Monitor and document hallucinations, adjust prompt if needed
   - Strong, clear content on site reduces hallucination risk

2. **Competitor copycat:** Strategy is visible, could be replicated
   - Mitigation: Execution matters more than idea
   - Prompt is customized to actual positioning
   - First-mover advantage in niche

3. **LLM policy changes:** Platforms block or modify pre-filled prompts
   - Mitigation: Fallback to copy-to-clipboard approach
   - Five platforms provides redundancy
   - Not sole lead generation mechanism

4. **Inaccurate responses:** LLM provides wrong or outdated information
   - Mitigation: Regular spot-checking of LLM responses
   - Prompt refinement based on actual outputs
   - Keep site content current and authoritative

## Success Definition

**Launch success = 90 days post-implementation:**

- At least 5% of consultation bookings cite LLM research
- LLM-sourced leads show 20%+ higher qualification scores
- Zero negative feedback about the implementation
- Documented examples of LLM responses aligning with positioning

**Long-term success = 6 months:**

- LLM priming becomes standard part of prospect research journey
- Prompts inform content strategy (what questions drive best responses?)
- Model potentially extends to other marketing channels
- Measurable reduction in discovery call length (they arrive informed)

---

## Implementation Status

**Completed (2025-11-03):**

1. ✅ Finalized prompt content
2. ✅ Created `components/LLMPriming.tsx` with all 5 platform icons and links
3. ✅ Integrated component into `components/Footer.tsx`
4. ✅ Implemented analytics tracking (gtag events for click tracking)
5. ✅ Verified URL encoding and link generation
6. ✅ Added official brand images for all 5 LLM platforms (76KB total)
7. ✅ Processed ChatGPT logo to transparent background (eliminated white corners)
8. ✅ Positioned LLM icons left-aligned below social icons in footer
9. ✅ Build passed successfully (TypeScript validation)

**Implementation Details:**

**Visual Assets:**

- Official LLM brand images (50x50px) for all platforms
- All images stored in `public/llm-icons/` directory as WebP format
- ChatGPT logo processed with transparent background to eliminate white corners
- Total asset size: ~96KB (53KB ChatGPT, 13KB Claude, 19KB Gemini, 7.4KB Grok, 3.6KB Perplexity)
- Using Next.js Image component for automatic optimization

**Layout & Positioning:**

- Placed in left column of footer, directly below social icons (GitHub, LinkedIn, Substack)
- Left-aligned to match social icon alignment
- "Ask AI about Brian Fending" label above icons

**Rationale for Placement:**

1. **Social proof grouping**: LLM icons are conceptually similar to social links - they're ways to learn about Brian through third-party platforms
2. **Mobile UX priority**: On mobile, the footer collapses to single column. Placing LLM icons with social links keeps them at the top where users actively look for connection points, rather than buried below navigation items
3. **Visual hierarchy**: Users scan the left column first for brand identity and social presence - LLM icons fit naturally in this context
4. **Reduced cognitive load**: Grouping all "ways to connect/research" together is more intuitive than creating a separate centered section

**Technical Implementation:**

- Component: `components/LLMPriming.tsx`
- Images: `public/llm-icons/*.webp`
- Analytics: Click tracking via gtag events with platform identifier
- URL construction: Proper encoding for all 5 platforms (note Grok uses `text=` vs `q=` parameter)

**Next Steps:**

1. Deploy to production
2. Manual test each LLM link in production to verify prompt pre-fills correctly
3. Monitor analytics for:
   - Click patterns by platform
   - Referrer data from LLM sites
   - Time-on-site for LLM-sourced visitors
4. Test mobile deep linking behavior (apps vs web)
5. Gather qualitative feedback from consultation bookings
6. Document actual LLM responses after 2 weeks
7. Iterate based on data
