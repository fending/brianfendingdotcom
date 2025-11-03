'use client'

import Image from 'next/image'

const LLM_PROMPT = `I'm evaluating Brian Fending as a technology leadership consultant and want to understand his credibility and unique capabilities. What are his areas of expertise, what kind of problems does he solve, and what makes his approach different from typical IT consultants? Summarize the highlights from brianfending.com`

interface LLMPlatform {
  name: string
  url: string
  imagePath: string
  paramName: 'q' | 'text'
}

export function LLMPriming() {
  const trackLLMClick = (platform: string) => {
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'llm_prompt_click', {
        'llm_platform': platform,
        'site': 'brianfending',
        'prompt_version': 'v1_2025_11'
      })
    }
  }

  const platforms: LLMPlatform[] = [
    {
      name: 'ChatGPT',
      url: 'https://chat.openai.com/',
      paramName: 'q',
      imagePath: '/llm-icons/chatgpt.webp'
    },
    {
      name: 'Claude',
      url: 'https://claude.ai/new',
      paramName: 'q',
      imagePath: '/llm-icons/claude.webp'
    },
    {
      name: 'Perplexity',
      url: 'https://www.perplexity.ai/search/new',
      paramName: 'q',
      imagePath: '/llm-icons/perplexity.webp'
    },
    {
      name: 'Gemini',
      url: 'https://www.google.com/search?udm=50&aep=11',
      paramName: 'q',
      imagePath: '/llm-icons/gemini.webp'
    },
    {
      name: 'Grok',
      url: 'https://x.com/i/grok',
      paramName: 'text',
      imagePath: '/llm-icons/grok.webp'
    }
  ]

  const getLLMUrl = (platform: LLMPlatform) => {
    const encodedPrompt = encodeURIComponent(LLM_PROMPT)
    const separator = platform.url.includes('?') ? '&' : '?'
    return `${platform.url}${separator}${platform.paramName}=${encodedPrompt}`
  }

  return (
    <div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Ask these LLMs about me:
      </p>
      <div className="flex items-center gap-4 flex-wrap mb-6">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={getLLMUrl(platform)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackLLMClick(platform.name.toLowerCase())}
            aria-label={`Ask ${platform.name} about Brian Fending`}
            className="transition-opacity duration-200 hover:opacity-80 transform hover:scale-105"
            title={platform.name}
          >
            <Image
              src={platform.imagePath}
              alt={`${platform.name} AI search`}
              width={50}
              height={50}
              className="rounded-lg"
            />
          </a>
        ))}
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        ...or chat with my RAG-powered AI assistant:
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        <a
          href="https://ai.brianfending.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLLMClick('brianfending-ai')}
          aria-label="Chat with Brian's AI Assistant"
          className="transition-opacity duration-200 hover:opacity-80 transform hover:scale-105"
          title="Brian's AI Assistant"
        >
          <Image
            src="/llm-icons/brianfending-ai.webp"
            alt="Brian's AI Assistant"
            width={50}
            height={50}
            className="rounded-lg"
          />
        </a>
      </div>
    </div>
  )
}
