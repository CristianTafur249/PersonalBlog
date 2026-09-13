import { PageSEO } from '@/components/SEO'
import { getAllTags } from '@/lib/tags'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Link from 'next/link'
import formatWord from '@/lib/utils/formatWord'
import PropTypes from 'prop-types'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticProps() {
    const tags = await getAllTags('blog')
    return { props: { tags } }
}

export default function Tags({ tags }) {
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
    const keywords = sortedTags.join(', ')

    return (
        <>
            <PageSEO
                title={`Tags - ${siteMetadata.author}`}
                description="Etiquetas de lo que blogueo"
                metaKeywords={keywords}
            />
            <SectionContainer>
                <PageTitle>Etiquetas</PageTitle>
                {sortedTags.length === 0 ? (
                    <p className="text-lg text-muted">Todavía no hay etiquetas.</p>
                ) : (
                    <ul className="flex flex-wrap gap-3">
                        {sortedTags.map((t) => (
                            <li key={t}>
                                <Link
                                    href={`/etiquetas/${formatWord(t)}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-2 pl-4 pr-2 text-base font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
                                >
                                    {t}
                                    <span className="rounded-full bg-sunken px-2.5 py-0.5 text-sm tabular-nums text-muted">
                                        {tags[t]}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </SectionContainer>
        </>
    )
}

Tags.propTypes = { tags: PropTypes.object }
Tags.defaultProps = { tags: {} }
