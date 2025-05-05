'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  summary?: string;
  className?: string;
}

export default function ShareButtons({ title, url, summary = '', className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Encode parameters for sharing URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);

  // Handle copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">Share:</span>
      
      <div className="flex items-center gap-4">
        {/* X (formerly Twitter) */}
        <a 
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          aria-label="Share on X"
          title="Share on X"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
          </svg>
        </a>
        
        {/* LinkedIn */}
        <a 
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#0077b5] dark:text-gray-400 dark:hover:text-[#0077b5] transition-colors"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.4 18.3H5.7V9.8h2.7v8.5zM7 8.4a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zm11.3 9.9h-2.7v-4.2c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.3h-2.7V9.8h2.6v1.2a2.8 2.8 0 012.5-1.4c2.7 0 3.2 1.8 3.2 4v4.7z"/>
          </svg>
        </a>
        
        {/* Bluesky */}
        <a 
          href={`https://bsky.app/intent/compose?text=${encodedTitle}%0A%0A${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-[#0085ff] dark:text-gray-400 dark:hover:text-[#0085ff] transition-colors"
          aria-label="Share on Bluesky"
          title="Share on Bluesky"
        >
          <svg className="h-4 w-4" viewBox="0 0 568 501" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z" />
          </svg>
        </a>
        
        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors relative"
          aria-label="Copy link"
          title="Copy link to clipboard"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          
          {/* Copy confirmation tooltip */}
          {copied && (
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              Link copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}