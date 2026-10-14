import generateRss from '@/lib/generate-rss'
import { getAllFilesMetadata } from '@/lib/mdx'

// RSS general, generado al pedirlo (incluye entradas de Dropbox)
export async function getServerSideProps({ res }) {
    const posts = await getAllFilesMetadata()
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600')
    res.end(generateRss(posts))
    return { props: {} }
}

export default function Feed() {
    return null
}
