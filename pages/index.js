import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import formatDate from '@/lib/utils/formatDate'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
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
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Header />
      <>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto mt-10 grid max-w-2xl  grid-cols-1 gap-y-16 gap-x-8 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {!posts.length && 'No se encontraron publicaciones.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article key={slug} className=' border-gray-400  flex max-w-xl flex-col items-start justify-between'>
                  <div className='flex text-gray-500 items-center grap-x-4 text-xs'>
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
                  </div>
                  <div className='text-blue-500 hover:text-green-400 mt-10'>
                    <p>
                      <a href={slug}>Leer más...</a>
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
