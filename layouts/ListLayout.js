import Pagination from "@/components/Pagination";
import Paginatioon from "@/components/Pagination";
import Tag from "@/components/Tag";
import formatDate from "@/lib/utils/formatDate";
import Link from "next/link";
import { useState } from "react";

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
    const [searchValue, setSearchValue] = useState('');
    const filteredBlogPosts = posts.filter((frontMatter) => {
        const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    })

    const displayPosts =
        initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

    return (
        <>
            <div className="mx-auto my-auto px-6 lg:px-8">
                <section className="mx-auto my-auto w-4/5 text-center lg:text-left">
                    <div
                        className=" grid  gap-6 xl:gap-12 mx-auto items-center"
                        style={{ borderColor: '#ccc', borderBottom: '1px solid #ccc' }}
                    >
                        <div className="mb-3 lg:mb-0 py-1">
                            <h1 className="text-white  text-3xl md:text-6xl xl:text-5xl   2xl:text-7xl fond-bold mix-blend-difference tracking-tight">
                                {title}
                            </h1>
                            <div className="relative flex flex-nowrap items-stretch">
                                <input
                                    aria-label="Buscar articulo"
                                    type="text"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Buscar articulo"
                                    className="block rounded-md border border-gray-700 dark:bg-gray-800 dark:text-gray-50 px-3 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 "

                                />

                                <svg
                                    className="w-8 "
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
                <div className="mx-auto my-auto pb-12 w-3/4 px-6 lg:px-8">
                    <div className="mx-auto mt-6 grid max-w-2xl  grid-cols-1 gap-y-16 gap-x-8 pt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        {!filteredBlogPosts.length && 'No se encontraron publicaciones.'}
                        {displayPosts.map((frontMatter) => {
                            const { slug, date, title, summary, tags } = frontMatter;
                            return (

                                <article key={slug} className="bg-gray-500 flex max-w-xl  xl:max-w-3xl  flex-col items-start " >
                                    <div className="text-gray-500 items-center grap-x-4 text-xs">
                                        <time dateTime={date}>
                                            {formatDate(date)}
                                        </time>
                                        {tags.map((tag) => (
                                            <Tag key={tag} text={tag} />
                                        ))}
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg  font-semibold p-4 group-hover:text-green-600 ">
                                            <Link href={`/blog/${slug}`} className="  inset-0">
                                                {title}
                                            </Link>
                                        </h3>
                                        <p className="mt-auto text-sm  line clam-3 text-gray-500">
                                            {summary}
                                        </p>
                                        <p className='text-blue-500 hover:text-green-400 mt-5'>
                                            <a href={slug}>
                                                Leer más...
                                            </a>
                                        </p>
                                    </div>

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