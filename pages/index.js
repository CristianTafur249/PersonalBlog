import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import formatDate from '@/lib/utils/formatDate'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import {PageSEO} from '@/components/SEO'
import siteMetadata from '@/data/siteMetatdata'
import { getAllFilesMetadata } from '@/lib/mdx'
import Tag from '@/components/Tag'

const inter = Inter({ subsets: ['latin'] })

const MAX_DISPLAY = 6

export async function getStaticProps(){
  const posts = await getAllFilesMetadata('blog');
  console.log(posts);
  return{
    props: {posts},
  };
}

export default function Home({posts}) {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Header/>
      <>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              Inicio
            </h2>
            <p className='mt-2 text-lg leading-8 ligth:text-gray-600 '>
              Publicaciones recientes
            </p>
          </div>
          <div className='mx-auto mt-10 grid max-w-2xl  grid-cols-1 gap-y-16 gap-x-8 border-t-2 border-gray-300 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {!posts.length && 'No post found.'}
            {posts.slice(0,MAX_DISPLAY).map((frontMatter)=>{
              const {slug, date, title, summary,tags}= frontMatter
              return(
                <article key={slug}className=' flex max-w-xl flex-col items-start justify-between'>
                  <div className='flex text-gray-500 items-center grap-x-4 text-xs'>
                    <time dateTime={date}>
                      {formatDate(date)}
                    </time>
                    {tags.map((tag)=>(
                      <Tag key={tag} text={tag} />
                      /*<a 
                      className='relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100'
                    >
                    </a>*/
                    ))}
                  </div>
                  <div className='group relative'>
                    <h3 className='mt-3 text-lg font-semibold leading-6  group-hover:text-green-600'>
                      <a href={slug}>
                        <span className='absolute inset-0'/>
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

        </div>
      </>
    </>
  )
}
