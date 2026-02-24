import { getAllArticles } from '@/lib/articles'

const SITE_URL = 'https://www.brianfending.com'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(request: Request) {
  const articles = await getAllArticles()
  const selfUrl = new URL(request.url)
  const baseUrl = `${selfUrl.protocol}//${selfUrl.host}`

  const items = articles.map((article) => {
    const pubDate = new Date(article.date).toUTCString()
    const link = `${SITE_URL}/articles/${article.slug}`
    const description = article.metaDescription || article.excerpt

    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
      <author>hello@brianfending.com (${escapeXml(article.author)})</author>${article.tags.map((tag) => `
      <category>${escapeXml(tag)}</category>`).join('')}
    </item>`
  })

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Brian Fending - Articles</title>
    <link>${SITE_URL}/articles</link>
    <description>Technology Leadership insights on AI, governance, and software engineering.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/articles/feed.xml" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
