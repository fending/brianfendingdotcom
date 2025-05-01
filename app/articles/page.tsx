import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles about technology leadership, software engineering, and more.',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 pt-8">
        <h1 className="text-gray-900 dark:text-white">Articles</h1>
        <p className="text-xl mt-4 text-gray-700 dark:text-gray-300 max-w-3xl">
          Thoughts and insights on technology, leadership, and software engineering.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No articles found. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="card overflow-hidden">
              <div className="md:flex">
                {article.featuredImage && (
                  <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
                    <div className="relative w-full h-64 md:h-full">
                      <Image
                        src={`/images/${article.featuredImage}`}
                        alt={article.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                
                <div className="p-6 md:p-8 md:flex-1">
                  <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                    <Link href={`/articles/${article.slug}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                      {article.title}
                    </Link>
                  </h2>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-5">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-xl leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag) => (
                      <Link 
                        key={tag} 
                        href={`/tags/${tag}`}
                        className="badge-primary text-sm"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="text-xl font-semibold mb-2 sm:mb-0">Read full article on:</div>
                    
                    {article.linkedinUrl && (
                      <a 
                        href={article.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}

                    {article.substackUrl && (
                      <a 
                        href={article.substackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary inline-flex items-center"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                        </svg>
                        Substack
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}