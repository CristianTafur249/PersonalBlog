module.exports = {
    siteUrl: process.env.SITE_URL || 'https://ejemplo.com',
    changefreq: 'daily',
    priority: 0.5,
    transform: async (config, path) => {
        return {
          loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
          alternateRefs: config.alternateRefs ?? [],
        }
      },
    sitemapSize: 5000,
    generateRobotsTxt: true,
};