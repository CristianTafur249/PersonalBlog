import { MDXLayoutRender } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { formatSlug, getAllFilesMetadata, getFiles, getFilesBySlug } from '@/lib/mdx'
import fs from 'fs'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPots = await getAllFilesMetadata('blog')
  const postIndex = allPots.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const anterior = allPots[postIndex + 1] || null
  const posterior = allPots[postIndex - 1] || null
  const post = await getFilesBySlug('blog', params.slug.join('/'))
  const authorList = post.frontMatter.author || ['tafur']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFilesBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)
  //rss
  if (allPots.length > 0) {
    const rss = generateRss(allPots)
    fs.writeFileSync('./public/feed.xml', rss)
  }
  return { props: { post, authorDetails, anterior, posterior } }
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
        <div className="mt-24 text-center">
          <PageTitle>
            En Costruccion{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
