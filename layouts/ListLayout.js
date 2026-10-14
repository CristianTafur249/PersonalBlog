import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import ListP from '@/components/List'
import PageTitle from '@/components/PageTitle'
import Pagination from '@/components/Pagination'
import SectionContainer from '@/components/SectionContainer'
import { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Renderiza un diseño de lista para las publicaciones del blog.
 */
export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
    const [searchValue, setSearchValue] = useState('')
    const filteredBlogPosts = posts.filter((frontMatter) => {
        const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
    })

    const displayPosts =
        initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

    return (
        <SectionContainer>
            <PageTitle>{title}</PageTitle>
            <div className="relative mb-8 max-w-md">
                <label htmlFor="buscar-articulo" className="sr-only">
                    Buscar artículo
                </label>
                <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                    aria-hidden="true"
                />
                <input
                    id="buscar-articulo"
                    type="search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Buscar por título, resumen o etiqueta"
                    className="block w-full rounded-full border border-muted bg-surface py-2.5 pl-11 pr-4 text-ink placeholder:text-muted focus:border-accent focus:ring-accent"
                />
            </div>
            <ListP
                posts={displayPosts}
                emptyMessage={
                    searchValue
                        ? `Ninguna entrada coincide con «${searchValue}». Prueba con otra palabra.`
                        : undefined
                }
            />
            {pagination && pagination.totalPages > 1 && !searchValue && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                />
            )}
        </SectionContainer>
    )
}
ListLayout.propTypes = {
    posts: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    initialDisplayPosts: PropTypes.array,
    pagination: PropTypes.object,
}
ListLayout.defaultProps = {
    initialDisplayPosts: [],
    pagination: null,
}
