import { TagSEO } from '@/components/SEO'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesMetadata } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import fs from 'fs'
import path from 'path'
import formatWord from '@/lib/utils/formatWord'
import PropTypes from 'prop-types'


const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPots = getAllFilesMetadata('blog')
  const filteredPosts = allPots.filter(
    (post) => post.draft !== true && post.tags.map((t) => formatWord(t)).includes(params.tag)
  )
  //rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `etiquetas/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'etiquetas', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }
  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }) {
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag}`}
        description={`${tag} Etiquetas`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
Tag.propTypes = {
  posts: PropTypes.array.isRequired,
  tag: PropTypes.string.isRequired,
}
