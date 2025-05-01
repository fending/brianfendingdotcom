'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  animation?: 'fade-in' | 'slide-up' | 'slide-in' | 'scale'
  delay?: number // in ms
  duration?: number // in ms (max 150)
  className?: string
  threshold?: number // between 0 and 1, default 0.1
  once?: boolean
}

export default function AnimatedElement({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 150,
  className = '',
  threshold = 0.1,
  once = true,
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  // Ensure duration is capped at 150ms
  const safeDuration = Math.min(duration, 150)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    )
    
    observer.observe(element)
    
    return () => {
      observer.disconnect()
    }
  }, [once, threshold])

  // Animation styles
  const animationStyles = {
    'fade-in': {
      opacity: isVisible ? 1 : 0,
      transform: 'none',
    },
    'slide-up': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'translateY(10px)',
    },
    'slide-in': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'translateX(10px)',
    },
    'scale': {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'scale(0.98)',
    },
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...animationStyles[animation],
        transition: `opacity ${safeDuration}ms ease, transform ${safeDuration}ms ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}