import { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import NewsletterSignup from '@/components/NewsletterSignup'

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string }}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  
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

export default async function ArticleDetailPage({ params }: { params: { slug: string }}) {
  const article = await getArticleBySlug(params.slug)
  
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
          <p>
            Have you noticed it's been hard to keep pace with AI news lately? In this article, 
            I examine how traditional risk frameworks apply to emerging AI technologies, with a particular 
            focus on Google's Agent-to-Agent (A2A) communication and Anthropic's Multi-Context Planning (MCP).
          </p>
          
          <p className="mt-4">
            This piece explores:
          </p>
          
          <ul className="list-disc list-inside mt-2 mb-4 space-y-1">
            <li>The n^a potential workflows created by Agent-to-Agent communication</li>
            <li>How traditional GRC frameworks fall short with modern AI implementations</li>
            <li>Three practical risk mitigation strategies for enterprise AI deployment</li>
          </ul>
          
          <p className="mt-4">
            If you're responsible for technology risk management in your organization, this analysis 
            provides a practical framework for approaching AI integration with appropriate safeguards.
          </p>
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
            
            {/* Share links */}
            <div className="flex space-x-3">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://brianfending.com/articles/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#1da1f2] dark:text-gray-400 dark:hover:text-[#1da1f2]"
                aria-label="Share on Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.023 10.023 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://brianfending.com/articles/${article.slug}`)}&title=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-linkedin dark:text-gray-400 dark:hover:text-linkedin"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.4 18.3H5.7V9.8h2.7v8.5zM7 8.4a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zm11.3 9.9h-2.7v-4.2c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.3h-2.7V9.8h2.6v1.2a2.8 2.8 0 012.5-1.4c2.7 0 3.2 1.8 3.2 4v4.7z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}