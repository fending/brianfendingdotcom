import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getHomeContent } from '@/lib/content'
import { getRecentArticles } from '@/lib/articles'
import NewsletterSignup from '@/components/NewsletterSignup'
import AnimatedElement from '@/components/AnimatedElement'

export const metadata: Metadata = {
  title: 'Technology Leadership',
  description: 'Technology Leadership insights and experiences from Brian Fending',
}

export default async function HomePage() {
  const content = await getHomeContent()
  const recentArticles = await getRecentArticles(3)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <AnimatedElement animation="fade-in" duration={150}>
        <section className="mb-12 pt-8">
          <h1 className="text-gray-900 dark:text-white text-fluid-5xl text-balanced">{content.title}</h1>
          <p className="text-fluid-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">{content.description}</p>
        </section>
      </AnimatedElement>

      {content.sections.map((section, index) => (
        <AnimatedElement 
          key={index} 
          animation="slide-up" 
          delay={index * 50} 
          duration={150}
        >
          <section className="mb-12">
            <h2 className="text-gray-900 dark:text-white text-fluid-3xl text-balanced">{section.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-fluid-base">{section.content}</p>
          </section>
        </AnimatedElement>
      ))}

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