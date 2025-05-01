import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | Brian Fending',
    default: 'Brian Fending | Technology Leadership',
  },
  description: 'Technology Leadership insights and experiences from Brian Fending',
  authors: [{ name: 'Brian Fending' }],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow pt-24 md:pt-28">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}