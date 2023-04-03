import Pagination from '@/components/Pagination'
import Paginatioon from '@/components/Pagination'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import Link from 'next/link'
import { useState } from 'react'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="mx-auto my-auto px-6 lg:px-8">
        <section className="mx-auto my-auto  text-center lg:text-left">
          <div
            className=" grid w-full gap-6 xl:gap-12 mx-auto items-center"
            style={{ borderColor: '#ccc', borderBottom: '1px solid #ccc' }}
          >
            <div className="mb-3 lg:mb-0 py-1">
              <h2 className="dark:text-white  text-3xl md:text-6xl xl:text-5xl  w-full 2xl:text-7xl fond-bold tracking-tight">
                {title}
              </h2>
              <div className="relative flex w-2/4 items-stretch">
                <input
                  aria-label="Buscar articulo"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Buscar articulo"
                  className="block rounded-md border w-2/5 border-gray-700 dark:bg-gray-800 dark:text-gray-50 px-3 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                />

                <svg
                  className="w-6 "
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    fillRule="even"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto my-auto pb-12 w-full px-6  lg:px-8">
          <div className=" mt-6   xl:w-4/6 justify-items-center  gap-y-16 gap-x-8 pt-6 sm:pt-6 mx-auto lg:max-w-none ">
            {!filteredBlogPosts.length && 'No se encontraron publicaciones.'}
            {displayPosts.map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <article
                  key={slug}
                  className="shadow-primary-200 mx-auto transition ease-in-out duration-700  mb-8 p-5 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 border-gray-400 items-start justify-between"
                >
                  <div className=" text-gray-500 items-center grap-x-4 text-xs group-hover:text-blue-700">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </div>
                  <div className="group relative ">
                    <h3 className="mt-3 text-lg mb-3 font-semibold leading-6  group-hover:text-green-600">
                      <a href={`/blog/${slug}`}>
                        <span className="absolute inset-0 " />
                        {title}
                      </a>
                    </h3>
                    <div className=" justify-start mb-3 flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag
                          clas={
                            'transition ease-in-out duration-700 hover:border-b-2 relative z-10 rounded-full m-auto ml-3 my-1 p-2 text-center  border-green-700 text-green-700 hover:border-gray-800 hover:text-blue-800 dark:hover:border-gray-50 dark:hover:text-blue-50 '
                          }
                          key={tag}
                          text={tag}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-gray-600 line clam-3 ">{summary}</p>
                  </div>
                  <p>
                    <a className="text-blue-500 hover:text-green-400 mt-5" href={`/blog/${slug}`}>
                      Leer más...
                    </a>
                  </p>
                </article>
              )
            })}
          </div>
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </>
  )
}
