'use client'

import { useEffect, useRef } from 'react'

interface NewsletterSignupProps {
  variant?: 'default' | 'minimal' | 'embed'
  substackUrl?: string
  title?: string
  description?: string
  className?: string
  darkMode?: boolean
}

export default function NewsletterSignup({
  variant = 'default',
  substackUrl = 'brianfending.substack.com',
  title,
  description,
  className = '',
  darkMode,
}: NewsletterSignupProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  // Format the URL correctly
  const formattedUrl = substackUrl.startsWith('http') 
    ? substackUrl
    : `https://${substackUrl}`
  
  // Clean the domain for the embed
  const domain = formattedUrl
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .split('/')[0]

  useEffect(() => {
    // This helps Substack's script resize the iframe properly
    const handleMessage = (event: MessageEvent) => {
      if (event.origin.includes('substack.com') && iframeRef.current) {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'resize' && data.height) {
            iframeRef.current.style.height = `${data.height}px`
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // Different styles based on the variant
  const containerClasses = {
    default: 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 p-8 rounded-xl border border-primary-100 dark:border-primary-900',
    minimal: '',
    embed: 'bg-gray-50 dark:bg-gray-800 p-6 rounded-lg',
  }[variant]

  // Only show custom title and description if not using the embedded version
  if (variant === 'embed') {
    return (
      <div className={`${containerClasses} ${className}`}>
        <iframe
          ref={iframeRef}
          src={`https://${domain}/embed`}
          width="100%"
          height="320"
          style={{ 
            border: 'none',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
          frameBorder="0"
          scrolling="no"
          title="Substack newsletter signup"
          className="rounded-md"
        ></iframe>
      </div>
    )
  }

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Custom title and description */}
      {title && (
        <h3 className={`${variant === 'minimal' ? 'text-lg' : 'text-2xl'} font-bold mb-2 text-gray-900 dark:text-white`}>
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {description}
        </p>
      )}

      {/* Embedded Substack form */}
      <iframe
        ref={iframeRef}
        src={`https://${domain}/embed${darkMode ? '?theme=dark' : ''}`}
        width="100%"
        height="120"
        style={{ 
          border: 'none', 
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        frameBorder="0"
        scrolling="no"
        title="Substack newsletter signup"
      ></iframe>
    </div>
  )
}