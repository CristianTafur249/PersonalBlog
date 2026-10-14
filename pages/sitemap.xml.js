import siteMetadata from '@/data/siteMetadata'
import { getAllFilesMetadata } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'

const STATIC_ROUTES = ['', '/blog', '/etiquetas', '/proyectos', '/sobre-mi']

const urlEntry = (route, lastmod) =>
    `<url><loc>${siteMetadata.siteUrl}${route}</loc>${
        lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
    }</url>`

// Sitemap generado al pedirlo: incluye las entradas y etiquetas de Dropbox
export async function getServerSideProps({ res }) {
    const posts = await getAllFilesMetadata()
    const tags = Object.keys(await getAllTags())

    const urls = [
        ...STATIC_ROUTES.map((route) => urlEntry(route)),
        ...posts
            .filter((post) => !post.canonicalUrl)
            .map((post) => urlEntry(`/blog/${post.slug}`, post.lastmod || post.date)),
        ...tags.map((tag) => urlEntry(`/etiquetas/${encodeURIComponent(tag)}`)),
    ]

    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600')
    res.end(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join(
            ''
        )}</urlset>`
    )
    return { props: {} }
}

export default function Sitemap() {
    return null
}
