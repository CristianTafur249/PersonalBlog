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
        <div className='mx-auto my-auto pb-12 w-3/4 px-6 lg:px-8'>
          <div className='mx-auto mt-6 grid max-w-2xl  grid-cols-1 gap-y-16 gap-x-8 pt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
            {!posts.length && 'No se encontraron publicaciones.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article key={slug} className=' border-gray-400 max-w-xl flex-col items-start justify-between'>
                  <div className=' text-gray-500 items-center grap-x-4 text-xs'>
                    <time dateTime={date}>
                      {formatDate(date)}
                    </time>
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                      /*<a 
                      className='relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100'
                    >
                    </a>*/
                    ))}
                  </div>
                  <div className='group relative'>
                    <h3 className='mt-3 text-lg font-semibold leading-6  group-hover:text-green-600'>
                      <a href={`/blog/${slug}`}>
                        <span className='absolute inset-0' />
                        {title}
                      </a>
                    </h3>
                    <p className='mt-5 text-sm leading-6 text-gray-500 line clam-3'>
                      {summary}
                    </p>
                    <p className='text-blue-500 hover:text-green-400 mt-5'>
                      <a href={`/blog/${slug}`}>Leer más...</a>
                    </p>
                  </div>
                  
                </article>
              )

            })}

          </div>
          {posts.length > MAX_DISPLAY && (
            <div className='flex justify-end text-base font-medium leading-6'>
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
