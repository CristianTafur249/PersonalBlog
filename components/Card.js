import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import Link from './Link'
import Tile from './Tile'
import Cover from './Cover'
import PropTypes from 'prop-types'

const Card = ({ title, description, imgSrc, href }) => {
    return (
        <Tile as="article" interactive={Boolean(href)} className="group flex h-full flex-col p-3">
            <Cover src={imgSrc} label={title} className="aspect-[16/9]" />
            <div className="flex flex-1 flex-col gap-2 p-3">
                <h2 className="text-xl font-bold leading-snug tracking-tight text-ink">
                    {href ? (
                        <Link
                            href={href}
                            className="stretched-link transition-colors duration-200 group-hover:text-accent"
                        >
                            {title}
                        </Link>
                    ) : (
                        title
                    )}
                </h2>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
                {href && (
                    <span
                        aria-hidden="true"
                        className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-accent"
                    >
                        Visitar
                        <ArrowUpRightIcon className="h-4 w-4" />
                    </span>
                )}
            </div>
        </Tile>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imgSrc: PropTypes.string,
    href: PropTypes.string,
}
export default Card
