import PageTitle from '@/components/PageTitle'
import { BlogSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetatdata'
import InicioPost from '@/components/Iniciopost'
import PropTypes from 'prop-types'

const { siteRepo, siteUrl } = siteMetadata

const editUrl = (fileName) => `${siteRepo}/blog/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteUrl}/blog/${slug}`)}`
const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

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
  const { slug, date, title, tags } = frontMatter

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
        title={`Blog | ${title} |`}
        tagsString={tags.map((tag) => `"${tag}"`).join(', ')}
      />
      <div className="mx-auto my-auto w-5/6">
        <article>
          <div className="xl:divide-y  xl:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Publicado en</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 ">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>

            <div className="mx-auto px-3 my-auto  justify-center divide-y  pb-8 xl:divide-y-0">
              <dl className="pt-6 my-16 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Autor</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="h-14 w-14 rounded-full"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter.replace('https://twitter.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <div className="divide-y chil xl:col-span-3 xl:row-span-2 w-full mx-auto xl:pb-0">
                <div className="prose mt-10 mb-4 pt-10 pb-8 markdown">{children}</div>
              </div>

              <footer className="mt-4">
                <div className=" divide-x divide-gray-500  text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  {tags && (
                    <div className="py-4 xl:py-8 mb-14">
                      <h2 className="text-xs mb-10 mx-auto text-center my-auto uppercase tracking-wide text-gray-600 dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="grid grid-cols-1 uppercase text-center ">
                        {tags.map((tag) => (
                          <Tag
                            clas={
                              ' transition ease-in-out duration-700 hover:border-b-2 relative z-10 rounded-full mx-auto mt-2 mb-2 text-center  py-1.5 px-3 font-medium text-green-700 hover:border-gray-700 hover:text-blue-700 tag '
                            }
                            key={tag}
                            text={tag}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {(posterior || anterior) && (
                    <div className="flex w-full mt-5 mb-10 mx-auto  justify-items-center py-4 xl:block xl:space-y-8 xl:py-8">
                      {anterior && (
                        <div className="mx-auto">
                          <h2 className="text-xs  uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Articulo anterior
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${anterior.slug}`}>{`< ${anterior.title}`}</Link>
                          </div>
                        </div>
                      )}
                      {posterior && (
                        <div className="mx-auto">
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Articulo siguiente{`>`}
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${posterior.slug}`}>{`${posterior.title} >`}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className=" pt-4 mt-5 xl:pt-8">
                  <Link
                    href="/blog"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; Volver a los blogs
                  </Link>
                </div>
                <InicioPost />
              </footer>
            </div>
          </div>
        </article>
      </div>
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
