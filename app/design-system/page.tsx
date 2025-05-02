import { Metadata } from 'next'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Component library and design guidelines for brianfending.com',
}

export default function DesignSystemPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mb-12 pt-8">
        <h1 className="page-header text-gray-900 dark:text-white">Design System</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          This page documents the components, styles, and patterns used throughout brianfending.com.
        </p>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Typography
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Font Families</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-serif text-2xl mb-2 text-gray-900 dark:text-white">Fraunces</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Used for headings (h1, h2, h3)
                </p>
                <div className="mt-3 space-y-2">
                  <p className="font-serif font-normal">Regular - The quick brown fox jumps over the lazy dog</p>
                  <p className="font-serif font-medium">Medium - The quick brown fox jumps over the lazy dog</p>
                  <p className="font-serif font-bold">Bold - The quick brown fox jumps over the lazy dog</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-sans text-2xl mb-2 text-gray-900 dark:text-white">Inter</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Used for body text and UI elements
                </p>
                <div className="mt-3 space-y-2">
                  <p className="font-sans font-normal">Regular - The quick brown fox jumps over the lazy dog</p>
                  <p className="font-sans font-medium">Medium - The quick brown fox jumps over the lazy dog</p>
                  <p className="font-sans font-bold">Bold - The quick brown fox jumps over the lazy dog</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Typographic Scale</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h1 className="mb-2">Heading 1</h1>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  font-serif text-4xl sm:text-5xl font-bold
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h2 className="mb-2">Heading 2</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  font-serif text-3xl font-bold
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="mb-2">Heading 3</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  font-serif text-2xl font-bold
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="mb-2">Heading 4</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  font-sans text-xl font-semibold
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="mb-2">Body Text</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  font-sans text-base
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm mb-2">Small Text</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  font-sans text-sm
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Fluid Typography</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-fluid-sm mb-2">Small Text (text-fluid-sm)</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  clamp(0.875rem, 0.8rem + 0.2vw, 1rem)
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-fluid-base mb-2">Base Text (text-fluid-base)</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-fluid-2xl mb-2">2XL Text (text-fluid-2xl)</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  clamp(1.5rem, 1.25rem + 1vw, 1.875rem)
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-fluid-5xl mb-2">5XL Text (text-fluid-5xl)</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  clamp(3rem, 2.5rem + 2.5vw, 4rem)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Colors
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Primary Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div>
                <div className="h-20 bg-primary-900 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">primary-900</p>
                  <p className="text-gray-500 dark:text-gray-400">#1e3a8a</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-primary-700 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">primary-700</p>
                  <p className="text-gray-500 dark:text-gray-400">#1d4ed8</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-primary-600 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">primary-600</p>
                  <p className="text-gray-500 dark:text-gray-400">#2563eb</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-primary-400 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">primary-400</p>
                  <p className="text-gray-500 dark:text-gray-400">#60a5fa</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-primary-200 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">primary-200</p>
                  <p className="text-gray-500 dark:text-gray-400">#bfdbfe</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Secondary Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div>
                <div className="h-20 bg-secondary-900 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">secondary-900</p>
                  <p className="text-gray-500 dark:text-gray-400">#134e4a</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-secondary-700 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">secondary-700</p>
                  <p className="text-gray-500 dark:text-gray-400">#0f766e</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-secondary-600 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">secondary-600</p>
                  <p className="text-gray-500 dark:text-gray-400">#0d9488</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-secondary-400 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">secondary-400</p>
                  <p className="text-gray-500 dark:text-gray-400">#2dd4bf</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-secondary-200 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">secondary-200</p>
                  <p className="text-gray-500 dark:text-gray-400">#99f6e4</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Gray Scale</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <div>
                <div className="h-20 bg-gray-900 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">gray-900</p>
                  <p className="text-gray-500 dark:text-gray-400">#111827</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-gray-700 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">gray-700</p>
                  <p className="text-gray-500 dark:text-gray-400">#374151</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-gray-500 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">gray-500</p>
                  <p className="text-gray-500 dark:text-gray-400">#6b7280</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-gray-300 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">gray-300</p>
                  <p className="text-gray-500 dark:text-gray-400">#d1d5db</p>
                </div>
              </div>
              <div>
                <div className="h-20 bg-gray-100 rounded-t-lg"></div>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-b-lg text-xs">
                  <p className="font-medium">gray-100</p>
                  <p className="text-gray-500 dark:text-gray-400">#f3f4f6</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Components
        </h2>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Buttons</h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="btn-secondary">Secondary Button</button>
                <button className="btn-outline">Outline Button</button>
                <button className="btn-neutral">Neutral Button</button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Standard Card</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This is the default card style used throughout the site.
                </p>
                <button className="btn-primary">Action</button>
              </div>
              
              <div className="card-compact">
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Compact Card</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A more compact version with less padding.
                </p>
                <button className="btn-outline">Action</button>
              </div>
              
              <div className="feature-card">
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Feature Card</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Used to highlight important features or services.
                </p>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Badges</h3>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex flex-wrap gap-2">
                <span className="badge-primary">Primary Badge</span>
                <span className="badge-secondary">Secondary Badge</span>
                <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  Neutral Badge
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Newsletter Signup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Default Variant</h4>
                <NewsletterSignup 
                  variant="default"
                  substackUrl="brianfending.substack.com"
                  title="Newsletter Example"
                  description="This is an example of the default newsletter signup component."
                />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Minimal Variant</h4>
                <NewsletterSignup 
                  variant="minimal"
                  substackUrl="brianfending.substack.com"
                  title="Newsletter Minimal"
                  description="This is an example of the minimal newsletter signup component."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Design Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Typography</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use fluid typography to ensure readability across devices</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Maintain balanced text with text-wrap: balance</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use serif fonts for headings, sans-serif for body text</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Color Psychology</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Primary blue conveys trustworthiness and professionalism</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secondary teal adds creativity and optimism</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Maintain a 4.5:1 contrast ratio for accessibility</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Motion Design</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Keep transitions brief (150ms) for UI responsiveness</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use subtle entrance animations for content</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Apply consistent motion patterns across the site</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Spatial Design</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Utilize generous white space to improve readability</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Maintain consistent spacing (margin/padding)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use consistent grid layouts across different pages</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}