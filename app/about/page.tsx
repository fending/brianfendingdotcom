import { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Brian Fending is the Managing Director of Ordovera Advisory, focused on AI governance, cybersecurity, and enterprise IT strategy.',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="pt-8 pb-16 md:pb-20">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12">
          <div className="md:max-w-[65%]">
            <h1 className="page-header text-gray-900 dark:text-white">About</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I build and mature technology programs for organizations where IT, cybersecurity, and AI governance need to work as one discipline instead of three. My work connects what most organizations keep siloed: infrastructure and security operations alongside AI governance and the enablement programs that get people actually using the tools.
            </p>
          </div>
          <div className="mb-8 md:mb-0 flex justify-center shrink-0">
            <div className="w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0">
              <Image
                src="/images/fending_profile_headshot.jpg"
                alt="Brian Fending"
                width={480}
                height={480}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Grid */}
      <section className="pb-16 md:pb-20">
        <div className="border-t border-gray-200 dark:border-gray-800 pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">

            {/* Background */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-white mb-4">Background</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                <li>Nine years building security programs and governance frameworks across multiple regulatory regimes</li>
                <li>Full software development lifecycle ownership from infrastructure through product delivery</li>
                <li>Background spans startups and established enterprises across infrastructure, application development, data engineering, and security operations</li>
              </ul>
            </div>

            {/* Credentials */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-white mb-4">Credentials</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                <li>CISM (Certified Information Security Manager)</li>
                <li>ISO/IEC 42001 Practitioner in AI Management Systems</li>
                <li>Master&apos;s degree, Miami University</li>
                <li>Bachelor&apos;s degree, SUNY Fredonia</li>
              </ul>
            </div>

            {/* Publishing */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-white mb-4">Publishing</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                <li>
                  <Link href="/articles/implementing-nist-ai-rmf-governing-part-1-4" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    Implementing NIST AI RMF
                  </Link>
                  {' '}&mdash; four-part series on AI risk management
                </li>
                <li>
                  <Link href="/articles/shadow-ai-discovery-containment-practitioners-guide" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    Shadow AI Discovery & Containment
                  </Link>
                  {' '}&mdash; practitioner&apos;s guide
                </li>
                <li>
                  <Link href="/articles/ai-enablement-not-ai-governance" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    AI Enablement Is Not AI Governance
                  </Link>
                </li>
                <li>
                  <Link href="/articles/mcp-security-problem-supply-chain" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    MCP Has a Security Problem
                  </Link>
                  {' '}&mdash; supply chain risk in AI tooling
                </li>
                <li>
                  Writing regularly on{' '}
                  <Link href="https://linkedin.com/in/brianfending" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    LinkedIn
                  </Link>
                  {' '}and{' '}
                  <Link href="https://brianfending.substack.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    Substack
                  </Link>
                </li>
              </ul>
            </div>

            {/* Speaking */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-white mb-4">Speaking</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                <li>AAPL Fall Institute keynote on AI governance in healthcare (2023)</li>
                <li>Available for conferences, workshops, and panels on AI governance, security, and technology leadership</li>
                <li>
                  <Link href="/speaking" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                    View all engagements
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-12 py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interested in Working Together?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          I&apos;m Managing Director of{' '}
          <Link href="https://ordovera.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline">
            Ordovera Advisory
          </Link>
          , where I help organizations build AI governance and enablement programs. I also lead{' '}
          <Link href="https://madeinc.xyz" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline">
            MADE, Inc.
          </Link>
          , providing fractional technology leadership, implementation, and managed delivery. Open to speaking engagements and advisory conversations.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
