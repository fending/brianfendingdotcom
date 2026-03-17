import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHomeContent } from '@/lib/content'
import { getRecentArticles } from '@/lib/articles'
import NewsletterSignup from '@/components/NewsletterSignup'
import AnimatedElement from '@/components/AnimatedElement'

export const metadata: Metadata = {
  title: 'Brian Fending | Technology Leadership',
  description: 'Technology Leadership insights and experiences from Brian Fending',
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default async function HomePage() {
  const content = await getHomeContent()
  const recentArticles = await getRecentArticles(3)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <AnimatedElement animation="fade-in" duration={150}>
        <section className="pt-8 pb-16 md:pb-20">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between md:gap-12">
            <div className="md:max-w-[65%]">
              <h1 className="text-gray-900 dark:text-white text-fluid-5xl text-balanced">{content.title}</h1>
              <p className="text-fluid-xl mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                Managing Director of{' '}
                <Link href="https://ordovera.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                  Ordovera Advisory
                </Link>
                , where I help mid-market organizations build AI governance frameworks that manage risk and enablement programs that drive adoption.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Writing on</span>
                <Link href="https://linkedin.com/in/brianfending" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                  LinkedIn
                </Link>
                <span className="text-gray-400 dark:text-gray-600">/</span>
                <Link href="https://brianfending.substack.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                  Substack
                </Link>
              </div>
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
      </AnimatedElement>

      {/* What I Do - Capability Grid */}
      <AnimatedElement animation="slide-up" duration={150}>
        <section className="pb-16 md:pb-20">
          <div className="border-t border-gray-200 dark:border-gray-800 pt-12 md:pt-16">
            <h2 className="text-gray-900 dark:text-white text-fluid-3xl text-balanced mb-10">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {content.capabilities.map((capability, index) => (
                <AnimatedElement
                  key={index}
                  animation="slide-up"
                  delay={index * 75}
                  duration={150}
                >
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {capability.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-400 text-fluid-sm leading-relaxed">
                      {capability.description.includes('MADE, Inc.') ? (
                        <>
                          {capability.description.split('MADE, Inc.')[0]}
                          <Link href="https://www.madeinc.xyz" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                            MADE, Inc.
                          </Link>
                          {capability.description.split('MADE, Inc.')[1]}
                        </>
                      ) : (
                        capability.description
                      )}
                    </p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
            <p className="mt-10 text-gray-600 dark:text-gray-400 text-fluid-sm">
              This work is the foundation of{' '}
              <Link href="https://www.ordovera.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline decoration-primary-600/30 dark:decoration-primary-400/30 underline-offset-2">
                Ordovera Advisory
              </Link>
              , where I help organizations build both functions with intention.
            </p>
          </div>
        </section>
      </AnimatedElement>

      {/* Newsletter Signup */}
      <AnimatedElement animation="scale" duration={150}>
        <section className="mb-16">
          <NewsletterSignup 
            variant="default"
            substackUrl="brianfending.substack.com"
            title="Subscribe to my Newsletter"
            description="Get the latest insights on technology leadership, engineering management, and software architecture delivered straight to your inbox."
          />
        </section>
      </AnimatedElement>

      <AnimatedElement animation="fade-in" duration={150} delay={100}>
        <section className="mt-12 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-900 dark:text-white text-fluid-3xl text-balanced">Recent Articles</h2>
            <Link 
              href="/articles" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all articles →
            </Link>
          </div>
          
          {recentArticles.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No articles found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((article, index) => (
                <AnimatedElement 
                  key={article.slug} 
                  animation="slide-up" 
                  delay={150 + (index * 50)}
                  duration={150}
                >
                  <article className="card">
                    {article.featuredImage && (
                      <Link href={`/articles/${article.slug}`}>
                        <div className="relative w-full h-40">
                          <Image
                            src={`/images/${article.featuredImage}`}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-fluid-xl font-semibold mb-2 text-gray-900 dark:text-white text-balanced">
                        <Link href={`/articles/${article.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                          {article.title}
                        </Link>
                      </h3>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString()}
                        </time>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 text-fluid-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium inline-flex items-center"
                      >
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </AnimatedElement>
              ))}
            </div>
          )}
        </section>
      </AnimatedElement>
    </div>
  )
}