import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesMetadata, getFilesBySlug } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import { getProjects, REVALIDATE_SECONDS } from '@/lib/content'
import Header from '@/components/Header'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PostTile from '@/components/PostTile'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import Tile from '@/components/Tile'
import PropTypes from 'prop-types'

const MAX_DISPLAY = 6
const BESIDE_FEATURED = 2
const MAX_TAGS = 10
const MAX_PROJECTS = 4

export async function getStaticProps() {
    const posts = await getAllFilesMetadata()
    const tagCount = await getAllTags()
    const projects = await getProjects()
    const tags = Object.keys(tagCount)
        .sort((a, b) => tagCount[b] - tagCount[a])
        .slice(0, MAX_TAGS)
    const { frontMatter } = await getFilesBySlug('authors', ['tafur'])
    const author = {
        name: frontMatter.name || siteMetadata.author,
        avatar: frontMatter.avatar || null,
        occupation: frontMatter.occupation || frontMatter.ocupation || null,
    }
    return {
        props: { posts, tags, author, projects },
        revalidate: REVALIDATE_SECONDS,
    }
}

const moreLinkClass =
    'relative z-10 inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline'

export default function Home({ posts, tags, author, projects }) {
    const [featured, ...rest] = posts.slice(0, MAX_DISPLAY)
    const beside = rest.slice(0, BESIDE_FEATURED)
    const below = rest.slice(BESIDE_FEATURED)

    return (
        <>
            <PageSEO
                title={'Inicio'}
                description={siteMetadata.description}
                metaKeywords={siteMetadata.metaKeywords}
            />
            <SectionContainer>
                <Header />
                <div className="grid gap-4 lg:grid-cols-12">
                    <div className="flex flex-col gap-4 lg:col-span-8">
                        {featured ? (
                            <PostTile
                                post={featured}
                                featured
                                className="tile-in"
                                style={{ '--i': 0 }}
                            />
                        ) : (
                            <Tile className="p-8 text-lg text-muted">
                                Todavía no hay entradas publicadas.
                            </Tile>
                        )}
                        {beside.length > 0 && (
                            <div className="grid flex-1 gap-4 sm:grid-cols-2">
                                {beside.map((post, index) => (
                                    <PostTile
                                        key={post.slug}
                                        post={post}
                                        showCover={false}
                                        headingLevel="h3"
                                        className="tile-in"
                                        style={{ '--i': index + 3 }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 lg:col-span-4">
                        <Tile
                            interactive
                            className="tile-in flex items-center gap-4 p-6"
                            style={{ '--i': 1 }}
                        >
                            {author.avatar && (
                                <Image
                                    src={author.avatar}
                                    width={72}
                                    height={72}
                                    alt=""
                                    className="h-[72px] w-[72px] flex-none rounded-full object-cover"
                                />
                            )}
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-ink">
                                    <Link href="/sobre-mi" className="stretched-link">
                                        {author.name}
                                    </Link>
                                </h2>
                                {author.occupation && (
                                    <p className="mt-1 text-sm text-muted">{author.occupation}</p>
                                )}
                            </div>
                        </Tile>

                        <Tile className="tile-in p-6" style={{ '--i': 2 }}>
                            <h2 className="text-xl font-bold tracking-tight text-ink">Etiquetas</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                ))}
                            </div>
                            <Link href="/etiquetas" className={`${moreLinkClass} mt-5`}>
                                Ver todas
                                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </Tile>

                        <div
                            className="tile-in flex flex-1 flex-col rounded-3xl bg-gradient-to-br from-teal-700 to-teal-900 p-6 text-white"
                            style={{ '--i': 4 }}
                        >
                            <h2 className="text-xl font-bold tracking-tight">Proyectos</h2>
                            <ul className="mt-4 flex flex-col divide-y divide-white/20">
                                {projects.slice(0, MAX_PROJECTS).map((project) => {
                                    const Wrapper = project.href ? Link : 'div'
                                    return (
                                        <li key={project.title}>
                                            <Wrapper
                                                {...(project.href ? { href: project.href } : {})}
                                                className="group block py-4 focus-visible:outline-white"
                                            >
                                                <span
                                                    className={`flex items-center justify-between gap-3 text-lg font-medium underline-offset-4 ${
                                                        project.href ? 'group-hover:underline' : ''
                                                    }`}
                                                >
                                                    {project.title}
                                                    {project.href && (
                                                        <ArrowUpRightIcon
                                                            className="h-5 w-5 flex-none"
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                </span>
                                                <span className="mt-1 block text-sm leading-relaxed text-teal-50 line-clamp-2">
                                                    {project.description}
                                                </span>
                                            </Wrapper>
                                        </li>
                                    )
                                })}
                            </ul>
                            <Link
                                href="/proyectos"
                                className="mt-auto inline-flex items-center gap-1 self-start pt-6 text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-white"
                            >
                                Ver los {projects.length} proyectos
                                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
                {below.length > 0 && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {below.map((post, index) => (
                            <PostTile
                                key={post.slug}
                                post={post}
                                showCover={false}
                                headingLevel="h3"
                                className="tile-in"
                                style={{ '--i': index + 5 }}
                            />
                        ))}
                    </div>
                )}
                {posts.length > MAX_DISPLAY && (
                    <Link href="/blog" className={`${moreLinkClass} mt-6 px-3`}>
                        Todas las entradas ({posts.length})
                        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </Link>
                )}
            </SectionContainer>
        </>
    )
}

Home.propTypes = {
    posts: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    author: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
}
