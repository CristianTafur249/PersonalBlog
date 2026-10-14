import Link from '@/components/Link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'

const baseClass =
    'inline-flex items-center gap-1 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium'
const activeClass = `${baseClass} text-ink transition-colors duration-200 hover:border-accent hover:text-accent`
const disabledClass = `${baseClass} text-muted opacity-60`

/**
 * Renders a pagination component.
 * @param {totalPages} props.totalPages - The total number of pages.
 * @param {currentPage} props.currentPage - The current page number.
 */
export default function Pagination({ totalPages, currentPage }) {
    const prevPage = parseInt(currentPage) - 1 > 0
    const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)
    return (
        <nav aria-label="Paginación" className="mt-10 flex items-center justify-between gap-4">
            {prevPage ? (
                <Link
                    href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}
                    rel="prev"
                    className={activeClass}
                >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    Anterior
                </Link>
            ) : (
                <span aria-disabled="true" className={disabledClass}>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    Anterior
                </span>
            )}
            <span className="text-sm tabular-nums text-muted">
                Página {currentPage} de {totalPages}
            </span>
            {nextPage ? (
                <Link href={`/blog/page/${currentPage + 1}`} rel="next" className={activeClass}>
                    Siguiente
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
            ) : (
                <span aria-disabled="true" className={disabledClass}>
                    Siguiente
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </span>
            )}
        </nav>
    )
}
Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
}
