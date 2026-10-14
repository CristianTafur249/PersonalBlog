import { MDXLayoutRender } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { getAllFilesMetadata, getFilesBySlug } from '@/lib/mdx'
import { REVALIDATE_SECONDS } from '@/lib/content'
import PropTypes from 'prop-types'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
    const posts = await getAllFilesMetadata()
    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.slug.split('/'),
            },
        })),
        // Las entradas nuevas de Dropbox se generan en la primera visita
        fallback: 'blocking',
    }
}

export async function getStaticProps({ params }) {
    const slug = params.slug.join('/')
    const post = await getFilesBySlug('blog', slug)
    // Los borradores no se publican: su contenido viajaría en los props de la página
    if (!post || post.frontMatter.draft === true) {
        return { notFound: true, revalidate: REVALIDATE_SECONDS }
    }

    const allPosts = await getAllFilesMetadata()
    const postIndex = allPosts.findIndex((p) => p.slug === slug)
    const anterior = (postIndex >= 0 && allPosts[postIndex + 1]) || null
    const posterior = (postIndex > 0 && allPosts[postIndex - 1]) || null
    const authorList = post.frontMatter.author || ['tafur']
    const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFilesBySlug('authors', [author])
        return authorResults.frontMatter
    })
    const authorDetails = await Promise.all(authorPromise)
    return {
        props: { post, authorDetails, anterior, posterior },
        revalidate: REVALIDATE_SECONDS,
    }
}
export default function Blog({ post, authorDetails, anterior, posterior }) {
    const { mdxSource, toc, frontMatter } = post

    return (
        <>
            {frontMatter.draft !== true ? (
                <MDXLayoutRender
                    layout={frontMatter.layout || DEFAULT_LAYOUT}
                    toc={toc}
                    mdxSource={mdxSource}
                    frontMatter={frontMatter}
                    authorDetails={authorDetails}
                    anterior={anterior}
                    posterior={posterior}
                />
            ) : (
                <SectionContainer>
                    <PageTitle>
                        En Construcción{' '}
                        <span role="img" aria-label="roadwork sign">
                            🚧
                        </span>
                    </PageTitle>
                </SectionContainer>
            )}
        </>
    )
}

Blog.propTypes = {
    post: PropTypes.object.isRequired,
    authorDetails: PropTypes.array,
    anterior: PropTypes.object,
    posterior: PropTypes.object,
}
Blog.defaultProps = {
    anterior: null,
    posterior: null,
    authorDetails: [],
}
