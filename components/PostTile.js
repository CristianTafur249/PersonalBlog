import Link from './Link'
import Tag from './Tag'
import Tile from './Tile'
import Cover from './Cover'
import formatDate from '@/lib/utils/formatDate'
import PropTypes from 'prop-types'

/**
 * Pieza de una entrada del blog. `featured` la agranda; `showCover` añade la portada.
 */
export default function PostTile({
    post,
    featured = false,
    showCover = true,
    headingLevel: Heading = 'h2',
    className = '',
    style,
}) {
    const { slug, date, title, summary, tags = [], cover, readingMinutes } = post

    return (
        <Tile
            as="article"
            interactive
            className={`group flex flex-col p-3 ${className}`}
            style={style}
        >
            {showCover && (
                <Cover
                    src={cover}
                    label={tags[0]}
                    className={featured ? 'aspect-[16/9] lg:aspect-[2/1]' : 'aspect-[16/9]'}
                />
            )}
            <div className="flex flex-1 flex-col gap-3 p-3">
                <Heading
                    className={`font-bold tracking-tight text-ink ${
                        featured ? 'text-2xl md:text-4xl md:leading-tight' : 'text-xl leading-snug'
                    }`}
                >
                    <Link
                        href={`/blog/${slug}`}
                        className="stretched-link transition-colors duration-200 group-hover:text-accent"
                    >
                        {title}
                    </Link>
                </Heading>
                {summary && (
                    <p
                        className={`text-muted line-clamp-3 ${
                            featured ? 'max-w-2xl text-base' : 'text-sm leading-relaxed'
                        }`}
                    >
                        {summary}
                    </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-sm text-muted">
                    <time dateTime={date}>{formatDate(date)}</time>
                    {readingMinutes > 0 && <span>{readingMinutes} min de lectura</span>}
                </div>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.slice(0, featured ? 5 : 3).map((tag) => (
                            <Tag key={tag} text={tag} />
                        ))}
                    </div>
                )}
            </div>
        </Tile>
    )
}

PostTile.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string,
        summary: PropTypes.string,
        tags: PropTypes.array,
        cover: PropTypes.string,
        readingMinutes: PropTypes.number,
    }).isRequired,
    featured: PropTypes.bool,
    showCover: PropTypes.bool,
    headingLevel: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
}
