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
            <div>
                <section className="mb-32 text-center lg:text-left">
                    <div className="border-b-2 grid lg:grid-cols-2 gap-6 xl:gap-12 items-center">
                        <div className="mb-6 lg:mb-0">
                            <h1 className="text-5xl md:text-6xl xl:text-7xl fond-bold mix-blend-difference tracking-tight">
                                {title}
                            </h1>
                            <div className="relative max-w-lg">
                                <input
                                    aria-label="Articulo buscado"
                                    type="text"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Articulo buscado"
                                    className="block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
                                />
                                <svg
                                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
                <ul>
                    {!filteredBlogPosts.length && 'No posts found.'}
                    {displayPosts.map((frontMatter) => {
                        const { slug, date, title, summary, tags } = frontMatter;
                        return (
                            <li key={slug} className="py4">
                                <article>
                                    <dl>
                                        <dt>Publicado en</dt>
                                        <dd>
                                            <time dateTime={date}>
                                                {formatDate(date)}
                                            </time>
                                        </dd>
                                    </dl>
                                    <div>
                                        <div>
                                            <h3>
                                                <Link href={`/blog/${slug}`} className="">
                                                    {title}
                                                </Link>

                                            </h3>
                                            <div>
                                                {tags.map((tag) => (
                                                    <Tag key={tag} text={tag} />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            {summary}
                                        </div>
                                    </div>
                                </article>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {pagination && pagination.tottalPages > 1 && !searchValue && (
                <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
        </>
    )
}