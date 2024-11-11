const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const prettier = require('prettier')
require('dotenv').config()

const SITE_URL = process.env.SITE_URL
const MAX_URLS_PER_SITEMAP = 1000

;(async () => {
  try {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
    const pages = await globby([
      'pages/*.js',
      'pages/*.tsx',
      'data/blog/**/*.mdx',
      'data/blog/**/*.md',
      'public/tags/**/*.xml',
      '!pages/_*.js',
      '!pages/_*.tsx',
      '!pages/api',
    ])

    const urls = await Promise.all(
      pages.map(async (page) => {
        if (page.search('.md') >= 1 && fs.existsSync(page)) {
          const source = fs.readFileSync(page, 'utf8')
          const fm = matter(source)
          if (fm.data.draft || fm.data.canonicalUrl) {
            return null
          }
        }

        const path = page
          .replace('pages/', '/')
          .replace('data/blog', '/blog')
          .replace('public/', '/')
          .replace(/(\.js|\.tsx|\.mdx|\.md)$/, '')
          .replace('/feed.xml', '')
        const route = path === '/index' ? '' : path

        if (page.search('pages/404.') > -1 || page.search('pages/blog/[...slug].') > -1) {
          return null
        }

        const stats = fs.statSync(page)
        const lastmod = stats.mtime.toISOString()

        return `<url><loc>${SITE_URL}${route}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
      })
    )

    const filteredUrls = urls.filter(Boolean)
    const sitemapCount = Math.ceil(filteredUrls.length / MAX_URLS_PER_SITEMAP)
    const sitemapFiles = []

    for (let i = 0; i < sitemapCount; i++) {
      const sitemapUrls = filteredUrls
        .slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP)
        .join('')
      const sitemapContent = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
                    ${sitemapUrls}
                </urlset>
            `

      const formattedSitemap = prettier.format(sitemapContent, {
        ...prettierConfig,
        parser: 'html',
      })

      const sitemapFileName = `public/sitemap/sitemap-${i + 1}.xml`
      fs.writeFileSync(sitemapFileName, formattedSitemap)
      sitemapFiles.push(sitemapFileName)
    }

    const sitemapIndexContent = `
            <?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${sitemapFiles
                  .map(
                    (file) =>
                      `<sitemap><loc>${SITE_URL}/${file.replace('public/', '')}</loc></sitemap>`
                  )
                  .join('')}
                <sitemap><loc>${SITE_URL}/feed.xml</loc></sitemap>
            </sitemapindex>
        `

    const formattedSitemapIndex = prettier.format(sitemapIndexContent, {
      ...prettierConfig,
      parser: 'html',
    })

    fs.writeFileSync('public/sitemap.xml', formattedSitemapIndex)
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }
})()
