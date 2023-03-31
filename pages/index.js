import Link from 'next/link'
import formatDate from '@/lib/utils/formatDate'
import { Inter } from 'next/font/google'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetatdata'
import { getAllFilesMetadata } from '@/lib/mdx'
import Tag from '@/components/Tag'

const inter = Inter({ subsets: ['latin'] })

const MAX_DISPLAY = 6

export async function getStaticProps() {
  const posts = await getAllFilesMetadata('blog');
  return {
    props: { posts },
  };
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={'Inicio'} description={siteMetadata.description} />
      <>
        <div className='mx-auto my-auto pb-12 w-11/12 xl:w-4/6  px-6 lg:px-8'>
          <div className='mx-auto mt-6  w-full  gap-y-16 gap-x-8 pt-6 sm:pt-6 lg:mx-0 lg:max-w-none '>
            {!posts.length && 'No se encontraron publicaciones.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article key={slug} className='shadow-primary-200 transition ease-in-out duration-700  mb-8 p-5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 border-gray-400 items-start justify-between'>
                  <div className=' text-gray-500 items-center grap-x-4 text-xs group-hover:text-blue-700'>
                    <time dateTime={date}>
                      {formatDate(date)}
                    </time>
                  </div>
                  <div className='group relative '>
                    <h3 className='mt-3 text-lg mb-3 font-semibold leading-6  group-hover:text-green-600'>
                      <a href={`/blog/${slug}`}>
                        <span className='absolute inset-0 '  />
                        {title}
                      </a>
                    </h3>
                    
                    <div className=' justify-start mb-3 flex flex-wrap'>
                      {tags.map((tag) => (
                        <Tag clas={"transition ease-in-out duration-700 hover:border-b-2 relative z-10 rounded-full m-auto ml-2 my-1  text-center  border-green-700 text-green-700 hover:border-gray-800 hover:text-blue-800 dark:hover:border-gray-50 dark:hover:text-blue-50 "} key={tag} text={tag} />
                      ))}
                    </div>
                    <p className='mt-1 text-sm leading-6 text-gray-600 line clam-3 '>
                      {summary}
                    </p>
                    
                  </div>
                  <p >
                      <a className='text-blue-500 hover:text-green-400 mt-5' href={`/blog/${slug}`}>Leer más...</a>
                    </p>
                </article>
              )

            })}

          </div>
          {posts.length > MAX_DISPLAY && (
            <div className='flex justify-end text-base  font-medium leading-6'>
              <Link
                href='/blog'
                className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                aria-label='Todos los Posts'
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
