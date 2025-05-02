import type { Metadata } from 'next'
import './globals.css'
import './critical.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === 'production'
        ? `https://${process.env.NEXT_PUBLIC_SITE_URL || 'www.brianfending.com'}`
        : 'http://localhost:3000'
  ),
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          /* Fallback styles in case Tailwind doesn't apply */
          body {
            background-color: #0f172a;
            color: white;
            font-family: 'Inter', sans-serif;
          }
          .dark {
            background-color: #0f172a;
            color: white;
          }
          .text-gray-900 { color: #111827; }
          .dark .text-white { color: white; }
          .text-gray-700 { color: #374151; }
          .dark .text-gray-300 { color: #d1d5db; }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .min-h-screen { min-height: 100vh; }
          .flex-grow { flex-grow: 1; }
          .pt-24 { padding-top: 6rem; }
          @media (min-width: 768px) {
            .md\\:pt-28 { padding-top: 7rem; }
          }
        `}} />
      </head>
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
        <Script id="debug-styles" strategy="afterInteractive">
          {`
            console.log("Styles debug script running");
            // Check if stylesheet is loaded
            const styleSheets = document.styleSheets;
            console.log("Stylesheets loaded:", styleSheets.length);
            
            // Print all loaded style rules
            for (let i = 0; i < styleSheets.length; i++) {
              try {
                const sheet = styleSheets[i];
                console.log("Stylesheet " + i + " href:", sheet.href);
                console.log("Rules count:", sheet.cssRules ? sheet.cssRules.length : "No access to rules");
              } catch (e) {
                console.log("Cannot access stylesheet " + i + " rules:", e.message);
              }
            }
            
            // Force dark mode
            document.documentElement.classList.add('dark');
          `}
        </Script>
      </body>
    </html>
  )
}