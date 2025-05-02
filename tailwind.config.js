/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Safelist critical classes that might be purged
  safelist: [
    // Colors
    {
      pattern: /^(bg|text|border|ring)-(primary|secondary|gray|white|black)(-\d+)?/,
      variants: ['hover', 'dark', 'dark:hover']
    },
    // Standard utilities
    {
      pattern: /^(m|p)(t|r|b|l|x|y)?-\d+/,
    },
    'dark:bg-gray-800',
    'dark:bg-gray-900',
    'dark:text-white',
    'dark:text-gray-300',
    'dark:text-gray-400',
    'dark:text-primary-400',
    'dark:text-primary-300',
    'dark:border-gray-700',
    'dark:border-gray-800',
    'btn-primary',
    'btn-secondary',
    'card',
    'icon-md',
    'icon-lg',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'ui-serif', 'serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        linkedin: '#0a66c2',
        substack: '#ff6719',
        github: '#24292e',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  darkMode: 'class',
}