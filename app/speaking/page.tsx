import { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTalksContent } from '@/lib/content'
import AnimatedElement from '@/components/AnimatedElement'

export const metadata: Metadata = {
  title: 'Talks & Workshops',
  description: 'Available talks and workshops on AI governance, society, privacy, and applied technology leadership from Brian Fending.',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function SpeakingPage() {
  const content = await getTalksContent()

  const engagementsByYear = content.pastEngagements.reduce((acc, engagement) => {
    const year = new Date(engagement.date).getFullYear().toString()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(engagement)
    return acc
  }, {} as Record<string, typeof content.pastEngagements>)

  const years = Object.keys(engagementsByYear).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <AnimatedElement animation="fade-in" duration={150}>
        <div className="mb-12 pt-8">
          <h1 className="page-header text-gray-900 dark:text-white">{content.title}</h1>
          <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
            {content.intro}
          </p>
        </div>
      </AnimatedElement>

      {/* Talks & Workshops */}
      <section className="mb-16">
        {content.talks.map((talk, index) => (
          <AnimatedElement
            key={talk.id}
            animation="slide-up"
            delay={index * 80}
            duration={150}
          >
            <div className="border-t border-gray-200 dark:border-gray-700 py-10">
              <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {talk.title}
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
                {talk.hook}
              </p>
              <ul className="space-y-2 mb-5">
                {talk.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {takeaway}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                {talk.formats.map((format) => (
                  <span
                    key={format}
                    className="badge-primary"
                  >
                    {format}
                  </span>
                ))}
                {talk.relatedArticle && (
                  <Link
                    href={talk.relatedArticle}
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ml-auto"
                  >
                    Related article &rarr;
                  </Link>
                )}
              </div>
            </div>
          </AnimatedElement>
        ))}
      </section>

      {/* Past Engagements */}
      <section className="mb-12">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Past Engagements</h2>

          {years.map(year => (
            <div key={year} className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">{year}</h3>
              <div className="grid gap-8">
                {engagementsByYear[year]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((engagement, index) => (
                    <div key={index} className="card p-6">
                      <div className="md:flex md:items-start">
                        {engagement.imageUrl && (
                          <div className="md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            <div className="relative h-48 w-full md:w-64 rounded-lg overflow-hidden flex items-center justify-center">
                              <Image
                                src={engagement.imageUrl}
                                alt={engagement.event}
                                fill={false}
                                width={engagement.imageUrl.endsWith('.svg') ? 200 : 100}
                                height={100}
                                className="object-contain"
                                style={{
                                  filter: engagement.imageUrl.endsWith('.svg')
                                    ? 'invert(45%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%) var(--tw-invert-light)'
                                    : 'none',
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{engagement.title}</h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{engagement.event}</p>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                            <svg className="icon-sm mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(engagement.date)}</span>
                            {engagement.location && (
                              <>
                                <span className="mx-2">&bull;</span>
                                <svg className="icon-sm mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{engagement.location}</span>
                              </>
                            )}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{engagement.description}</p>
                          <div className="flex flex-wrap gap-4">
                            {engagement.slideUrl && (
                              <a
                                href={engagement.slideUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                              >
                                <svg className="icon-sm mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Slides
                              </a>
                            )}
                            {engagement.videoUrl && (
                              <a
                                href={engagement.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                              >
                                <svg className="icon-sm mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Watch Video
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 mb-12 py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Book a Talk</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Interested in bringing one of these talks to your conference, leadership offsite, or team workshop?
            Each session is tailored to your audience and format.
          </p>
          <Link href="/contact?subject=speaking" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
