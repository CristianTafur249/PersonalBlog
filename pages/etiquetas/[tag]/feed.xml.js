import generateRss from '@/lib/generate-rss'
import { getAllFilesMetadata } from '@/lib/mdx'
import formatWord from '@/lib/utils/formatWord'

// RSS de una etiqueta, generado al pedirlo (incluye entradas de Dropbox)
export async function getServerSideProps({ params, res }) {
    const posts = (await getAllFilesMetadata()).filter((post) =>
        post.tags.map((t) => formatWord(t)).includes(params.tag)
    )
    if (posts.length === 0) return { notFound: true }

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600')
    res.end(generateRss(posts, `etiquetas/${params.tag}/feed.xml`))
    return { props: {} }
}

export default function TagFeed() {
    return null
}
