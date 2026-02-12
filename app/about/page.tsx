import { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Brian Fending is a technology executive focused on AI governance, cybersecurity, and enterprise IT strategy.',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="page-header text-gray-900 dark:text-white">About</h1>

        <div className="mt-8">
          {/* Profile image floated right */}
          <div className="float-right ml-6 mb-6 w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0">
            <Image
              src="/images/fending_profile_headshot.jpg"
              alt="Brian Fending"
              width={480}
              height={480}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-6">
            <p>
              I build and mature technology programs for organizations where IT, cybersecurity, and AI governance need to work as one discipline instead of three. My work connects what most organizations keep siloed: infrastructure and security operations alongside AI governance and the enablement programs that get people actually using the tools.
            </p>

            <p>
              Most recently I spent nine years building security programs, standing up governance frameworks across multiple regulatory regimes, and owning the full software development lifecycle. My background spans infrastructure, application development, data engineering, and security operations across both startups and established enterprises.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">My Approach</h3>

            <p>
              I believe in pragmatic practices that balance innovation with reliability, and progress with governance. My leadership style emphasizes mentorship, continuous learning, and creating an environment where teams can do their best work while staying aligned with business objectives.
            </p>

            <p>
              I write about AI governance and technology leadership on{' '}
              <Link
                href="https://linkedin.com/in/brianfending"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
              >
                LinkedIn
              </Link>
              {' '}and{' '}
              <Link
                href="https://brianfending.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
              >
                Substack
              </Link>
              , focusing on how organizations can enable AI adoption without creating ungovernable risk.
            </p>

            <p className="text-base italic text-gray-600 dark:text-gray-400">
              <strong>Credentials and Education:</strong> CISM (Certified Information Security Manager), ISO/IEC 42001 Practitioner in AI Management Systems, Master's degree from Miami University, Bachelor's from SUNY Fredonia
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <section className="mt-16 mb-12 py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center clear-both">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interested in Working Together?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          I'm currently open to technology leadership roles, advisory and fractional engagements, and speaking opportunities.
        </p>
        <Link href="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
