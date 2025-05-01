import fs from 'fs'
import path from 'path'

// Define article interface
export interface Article {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  tags: string[]
  featuredImage?: string
  metaDescription?: string
  linkedinUrl?: string
  substackUrl?: string
}

/**
 * Gets all articles from the static JSON file
 */
export async function getAllArticles(): Promise<Article[]> {
  const filePath = path.join(process.cwd(), 'public', 'static', 'articles.json')
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const articles = JSON.parse(fileContent) as Article[]
    
    // Sort articles by date (newest first)
    return articles.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

/**
 * Gets the most recent articles
 * @param count Number of articles to return
 */
export async function getRecentArticles(count: number): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.slice(0, count)
}

/**
 * Gets a single article by its slug
 * @param slug The article slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles()
  const article = articles.find(article => article.slug === slug)
  return article || null
}

/**
 * Gets articles by tag
 * @param tag The tag to filter by
 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.tags.includes(tag))
}