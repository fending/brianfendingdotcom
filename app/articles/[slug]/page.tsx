import { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import NewsletterSignup from '@/components/NewsletterSignup'
import ShareButtons from '@/components/ShareButtons'

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }
  
  return {
    title: article.title,
    description: article.metaDescription || article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getAllArticles()
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <article className="py-8 max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="md:flex md:items-start md:gap-8">
            <div className="md:flex-1">
              <h1 className="page-header text-gray-900 dark:text-white mb-4">{article.title}</h1>
              
              <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6">
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
              
              {/* Share buttons */}
              <div className="mb-6">
                <ShareButtons
                  title={article.title}
                  url={`https://www.brianfending.com/articles/${article.slug}`}
                  summary={article.excerpt}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/tags/${tag}`}
                    className="badge-primary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            
            {article.featuredImage && (
              <div className="mb-6 md:mb-0 md:w-1/3 md:flex-shrink-0">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/${article.featuredImage}`}
                    alt={article.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </header>
        
        <div className="article-content text-lg leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
        
        <div className="my-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Continue Reading</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            This article continues on my preferred publishing platforms. 
            Choose your platform to read the full article:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {article.linkedinUrl && (
              <a 
                href={article.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-linkedin text-white hover:bg-linkedin/80 hover:text-white focus:ring-linkedin/70 inline-flex items-center justify-center"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Read on LinkedIn
              </a>
            )}

            {article.substackUrl && (
              <a 
                href={article.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-substack border border-substack hover:bg-substack/10 focus:ring-substack/30 inline-flex items-center justify-center dark:bg-gray-800 dark:hover:bg-substack/20"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                Read on Substack
              </a>
            )}
          </div>
        </div>
        
        {/* Newsletter Signup - inline variant for articles */}
        <div className="my-12">
          <NewsletterSignup 
            variant="embed"
            substackUrl="brianfending.substack.com"
          />
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <Link 
              href="/articles"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}