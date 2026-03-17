import type { Metadata, Viewport } from 'next'
import './globals.css'
import './critical.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
// ReCaptchaProvider moved to contact form
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieConsentBanner from '@/components/CookieConsent'
import JsonLd from '@/components/JsonLd'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.brianfending.com'),
  title: {
    template: '%s | Brian Fending',
    default: 'Brian Fending | Technology Leadership',
  },
  description: 'Technology Leadership insights on AI, governance, and software engineering.',
  keywords: ['Technology Leadership', 'Software Engineering', 'AI', 'Governance', 'Risk Management'],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link href="/tailwind.css" rel="stylesheet" />
        <link rel="alternate" type="application/rss+xml" title="Brian Fending - Articles" href="/articles/feed.xml" />
      </head>
      <body>
        <GoogleAnalytics />
        <JsonLd />
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow pt-24 md:pt-28">
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  )
}