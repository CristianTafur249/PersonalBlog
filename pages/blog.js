import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetatdata'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesMetadata } from '@/lib/mdx'
import PropTypes from 'prop-types'

export const POSTS_PER_PAGE = 6

export async function getStaticProps() {
  const posts = await getAllFilesMetadata('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  return { props: { posts, initialDisplayPosts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blogs`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Publicaciones"
      />
    </>
  )
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  initialDisplayPosts: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
}
