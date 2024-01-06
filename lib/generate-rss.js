import siteMetadata from '@/data/siteMetatdata'
import { escape } from '@/lib/utils/htmlEscaper'

const generateSitemapUrl = (post) => `
  <url>
    <loc>${siteMetadata.siteUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`

const generateSitemap = (posts, page = 'sitemap.xml') => `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts.map(generateSitemapUrl).join('')}
  </urlset>
`

export default generateSitemap
