module.exports = {
    siteUrl: process.env.SITE_URL || 'https://ejemplo.com',
    exclude: ['/cookies', '/blog/page/*',  ],
    changefreq: 'weekly',
    autoLastmod: true,
    generateIndexSitemap: true,
    transform: async (config, path) => {
        return {
          loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
          alternateRefs: config.alternateRefs ?? [],
        }
      },
    sitemapSize: 7000,
    generateRobotsTxt: false,
    robotsTxtOptions: {
      
      additionalSitemaps: [
        'https://thechcode.netlify.app/feed.xml',
      ],
    },
};