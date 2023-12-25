import Link from 'next/link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetatdata'
import { getAllFilesMetadata } from '@/lib/mdx'
import Header from '@/components/Header'
import PropTypes from 'prop-types'
import ListP from '@/components/List'

const MAX_DISPLAY = 6

export async function getStaticProps() {
  const posts = await getAllFilesMetadata('blog')
  return {
    props: { posts },
  }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={'Inicio'} description={siteMetadata.description} />
      <>
        <div className=" w-full">
          <Header />
        </div>
        <div className="mx-auto my-auto pb-12 w-11/12 xl:w-4/6  px-6 lg:px-8">
          <ListP posts={posts} MAX_DISPLAY={MAX_DISPLAY} />
          {posts.length > MAX_DISPLAY && (
            <div className="flex justify-end text-base  font-medium leading-6">
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Todos los Posts"
              >
                Todos los Posts
              </Link>
            </div>
          )}
        </div>
      </>
    </>
  )
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
}
