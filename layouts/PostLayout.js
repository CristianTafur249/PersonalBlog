import { ArrowLeftIcon } from '@heroicons/react/20/solid'
import { BlogSEO } from '@/components/SEO'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import Tile from '@/components/Tile'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import InicioPost from '@/components/Iniciopost'
import PropTypes from 'prop-types'

const postDateTemplate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
}

/**
 * Renderiza el diseño para una publicación de blog.
 *
 * @param {Object} props - Las props del componente.
 * @param {Object} props.frontMatter - Los metadatos de la publicación de blog.
 * @param {Array} props.authorDetails - Los detalles del autor(es) de la publicación de blog.
 * @param {Object} props.posterior - La publicación de blog siguiente.
 * @param {Object} props.anterior - La publicación de blog anterior.
 * @param {ReactNode} props.children - El contenido de la publicación de blog.
 * @returns {ReactNode} El diseño renderizado de la publicación de blog.
 */
export default function PostLayout({ frontMatter, authorDetails, posterior, anterior, children }) {
    const { slug, date, title, tags, readingMinutes } = frontMatter
    const metaKeywords = tags ? tags.join(', ') : ''
    return (
        <>
            <BlogSEO
                url={`${siteMetadata.siteUrl}/blog/${slug}`}
                authorDetails={authorDetails}
                {...frontMatter}
                title={`${title} | Blog`}
                metaKeywords={`${title}, ${metaKeywords}`}
            />
            <SectionContainer>
                <article className="mx-auto max-w-[44rem]">
                    <header className="mb-10 md:mb-12">
                        {tags && tags.length > 0 && (
                            <div className="mb-5 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                ))}
                            </div>
                        )}
                        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-5xl md:leading-[1.1]">
                            {title}
                        </h1>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
                            {authorDetails.map((author) => (
                                <div className="flex items-center gap-3" key={author.name}>
                                    {author.avatar && (
                                        <Image
                                            src={author.avatar}
                                            width={40}
                                            height={40}
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-ink">{author.name}</p>
                                        {author.twitter && (
                                            <Link
                                                href={author.twitter}
                                                className="transition-colors duration-200 hover:text-accent"
                                            >
                                                {author.twitter.replace(
                                                    'https://twitter.com/',
                                                    '@'
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div>
                                <time dateTime={date} className="block first-letter:uppercase">
                                    {new Date(date).toLocaleDateString(
                                        siteMetadata.locale,
                                        postDateTemplate
                                    )}
                                </time>
                                {readingMinutes > 0 && <span>{readingMinutes} min de lectura</span>}
                            </div>
                        </div>
                    </header>

                    <div className="prose md:prose-lg">{children}</div>

                    <footer className="mt-16 border-t border-line pt-8">
                        {(posterior || anterior) && (
                            <nav aria-label="Otros artículos" className="grid gap-4 sm:grid-cols-2">
                                {anterior && (
                                    <Tile interactive className="p-5">
                                        <p className="text-sm text-muted">Artículo anterior</p>
                                        <Link
                                            href={`/blog/${anterior.slug}`}
                                            className="stretched-link mt-1 block text-lg font-bold leading-snug tracking-tight text-ink"
                                        >
                                            {anterior.title}
                                        </Link>
                                    </Tile>
                                )}
                                {posterior && (
                                    <Tile interactive className="p-5 sm:col-start-2 sm:text-right">
                                        <p className="text-sm text-muted">Artículo siguiente</p>
                                        <Link
                                            href={`/blog/${posterior.slug}`}
                                            className="stretched-link mt-1 block text-lg font-bold leading-snug tracking-tight text-ink"
                                        >
                                            {posterior.title}
                                        </Link>
                                    </Tile>
                                )}
                            </nav>
                        )}
                        <Link
                            href="/blog"
                            className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                        >
                            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                            Volver al blog
                        </Link>
                    </footer>
                </article>
                <InicioPost />
            </SectionContainer>
        </>
    )
}
PostLayout.propTypes = {
    frontMatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
    }).isRequired,
    authorDetails: PropTypes.array.isRequired,
    posterior: PropTypes.object,
    anterior: PropTypes.object,
    children: PropTypes.node.isRequired,
}
PostLayout.defaultProps = {
    posterior: null,
    anterior: null,
}
