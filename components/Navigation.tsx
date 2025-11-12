'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/ThemeProvider'

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Detect scroll position for navigation styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (!pathname) return false
    if (path === '/' && pathname !== '/') return false
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Navigation link classes
  const navLinkClasses = (path: string) => {
    return isActive(path)
      ? 'relative text-primary-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500 dark:text-primary-400 dark:after:bg-primary-400'
      : 'text-gray-600 hover:text-primary-600 transition-colors duration-150 dark:text-gray-400 dark:hover:text-primary-400'
  }

  // Mobile navigation link classes
  const mobileNavLinkClasses = (path: string) => {
    return `block py-3 px-4 text-lg ${
      isActive(path) 
        ? 'text-primary-600 font-medium dark:text-primary-400' 
        : 'text-gray-600 dark:text-gray-400'
    }`
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'nav-glass py-3' 
        : 'bg-transparent py-5 dark:bg-transparent'
    }`}>
      <div className="content-container flex justify-between items-center h-20 md:h-20">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <span className="font-serif text-2xl font-bold transition-colors duration-150 text-gray-900 dark:text-white">
              Brian<span className="text-primary-600 dark:text-primary-400">Fending</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/articles" className={navLinkClasses('/articles')}>
            Articles
          </Link>
          <Link href="/speaking" className={navLinkClasses('/speaking')}>
            Speaking
          </Link>
          <Link href="/about" className={navLinkClasses('/about')}>
            About
          </Link>

          {/* Dark mode toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-300 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Dark mode toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-300 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Hamburger menu */}
          <button 
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-300 dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <svg className="icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-[70vh] opacity-100 shadow-lg dark:shadow-gray-900/50' : 'max-h-0 opacity-0'
      }`}>
        <nav className="py-4">
          <Link href="/articles" className={mobileNavLinkClasses('/articles')} onClick={() => setIsMenuOpen(false)}>
            Articles
          </Link>
          <Link href="/speaking" className={mobileNavLinkClasses('/speaking')} onClick={() => setIsMenuOpen(false)}>
            Speaking
          </Link>
          <Link href="/about" className={mobileNavLinkClasses('/about')} onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <div className="px-4 py-4 mt-2 border-t border-gray-200 dark:border-gray-700">
            <Link href="/contact" 
              className="btn-primary w-full block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}