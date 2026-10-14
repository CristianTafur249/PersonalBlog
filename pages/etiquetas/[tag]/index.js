import { TagSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesMetadata } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import { REVALIDATE_SECONDS } from '@/lib/content'
import formatWord from '@/lib/utils/formatWord'
import PropTypes from 'prop-types'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticPaths() {
    const tags = await getAllTags()

    return {
        paths: Object.keys(tags).map((tag) => ({
            params: {
                tag,
            },
        })),
        // Las etiquetas nuevas de Dropbox se generan en la primera visita
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }) {
    const allPosts = await getAllFilesMetadata()
    const filteredPosts = allPosts.filter((post) =>
        post.tags.map((t) => formatWord(t)).includes(params.tag)
    )
    if (filteredPosts.length === 0) return { notFound: true, revalidate: REVALIDATE_SECONDS }
    return { props: { posts: filteredPosts, tag: params.tag }, revalidate: REVALIDATE_SECONDS }
}

export default function Tag({ posts, tag }) {
    const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
    const keywords = posts.map((post) => post.title).join(', ')
    return (
        <>
            <TagSEO
                title={`${tag} - ${siteMetadata.author}`}
                description={`${tag} tags - ${siteMetadata.author}`}
                metaKeywords={keywords}
            />
            <ListLayout posts={posts} title={title} />
        </>
    )
}
Tag.propTypes = {
    posts: PropTypes.array.isRequired,
    tag: PropTypes.string.isRequired,
}
