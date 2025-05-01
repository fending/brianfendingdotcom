import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Information about Brian Fending\'s speaking engagements, conference talks, workshops, and upcoming events.',
}

// Types for speaking engagements
interface SpeakingEngagement {
  title: string
  event: string
  date: string
  location: string
  description: string
  imageUrl?: string
  slideUrl?: string
  videoUrl?: string
  tags: string[]
}

// Speaking engagements
const speakingEngagements: SpeakingEngagement[] = [
  {
    title: "Generative AI, Healthcare, and Governance: Opening the black box to deliver results and safety for patients",
    event: "AAPL Fall Institute (Vanguard Meeting)",
    date: "2023-10-26",
    location: "Scottsdale, AZ",
    description: "Kicking off a day of discussion around AI disruption and governance in healthcare, attended by leaders of hospital systems and payors.",
    imageUrl: "/images/aapl_logo.svg",
    tags: ["AI", "Healthcare", "Governance"]
  },
  {
    title: "Salesforce Project Management Success",
    event: "DemandBlue Customer Success Webinar Series",
    date: "2021-07-19",
    location: "",
    description: "An interactive webinar hosted by DemandBlue, tag teaming questions with Henry Svendblad, CTO of Company Nurse.",
    imageUrl: "/images/demandblue_logo.svg",
    videoUrl: "https://www.youtube.com/watch?v=9SCUhgWu-sw",
    tags: ["Salesforce", "Project Management", "Customer Success"]
  }
];

// Function to format dates in a readable manner
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function SpeakingPage() {
  // Group engagements by year for better organization
  const engagementsByYear = speakingEngagements.reduce((acc, engagement) => {
    const year = new Date(engagement.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(engagement);
    return acc;
  }, {} as Record<string, SpeakingEngagement[]>);

  // Sort years in descending order
  const years = Object.keys(engagementsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="text-gray-900 dark:text-white">Speaking</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          Conference talks, workshops, and speaking engagements on technology leadership, 
          engineering management, and software architecture.
        </p>
      </div>

      {/* Upcoming engagements section - show if there are any future events */}
      {speakingEngagements.some(e => new Date(e.date) > new Date()) && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Upcoming Engagements</h2>
          <div className="grid gap-8">
            {speakingEngagements
              .filter(e => new Date(e.date) > new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
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
                              filter: engagement.imageUrl.endsWith('.svg') ? 
                                'invert(45%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%) var(--tw-invert-light)' : 
                                'none',
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
                        <span className="mx-2">•</span>
                        <svg className="icon-sm mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{engagement.location}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{engagement.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {engagement.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className="badge-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Past engagements section by year */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Past Engagements</h2>
        
        {years.map(year => (
          <div key={year} className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">{year}</h3>
            <div className="grid gap-8">
              {engagementsByYear[year]
                .filter(e => new Date(e.date) <= new Date())
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
                                filter: engagement.imageUrl.endsWith('.svg') ? 
                                  'invert(45%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%) var(--tw-invert-light)' : 
                                  'none',
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
                          <span className="mx-2">•</span>
                          <svg className="icon-sm mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{engagement.location}</span>
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
      </section>

      {/* Call to action for speaking inquiries */}
      <section className="mt-16 mb-12 py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Speaking Inquiries</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Interested in having me speak at your conference, workshop, or other event? 
            I'm available for talks on technology leadership, engineering management, GRC, and emerging tech.
          </p>
          <Link href="/contact?subject=speaking" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}