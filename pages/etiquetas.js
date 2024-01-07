import { PageSEO } from '@/components/SEO'
import { getAllTags } from '@/lib/tags'
import Tag from '@/components/Tag'
import Link from 'next/link'
import formatWord from '@/lib/utils/formatWord'
import PropTypes from 'prop-types'
export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`Etiquetas`} description="Etiquetas del que blog" />
      <div className="mx-auto my-auto w-4/5  px-6 lg:px-8">
        <section className="mb-16 text-center lg:text-left">
          <div className="border-b-2 grid lg:grid-cols-2 gap-6 xl:gap-12 items-center">
            <div className="mb-6 lg:mb-0 py-1">
              <h1 className="text-4xl md:text-5xl xl:text-6xl fond-bold mix-blend-difference tracking-tight">
                Etiquetas
              </h1>
            </div>
          </div>
        </section>
        <div className=" rounded-full grid grid-cols-2 gap-6 lg:grid-cols-3 mb-20 justify-items-start items-center text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
          {Object.keys(tags).length === 0 && 'No se encontraron etiquetas.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="-mt-2 m-auto  mb-2 w-full mr-5">
                <Tag
                  text={t}
                  class="transition ease-in-out duration-700 hover:border-b-2 mx-2 rounded-full uppercase relative z-10  m-auto my-1 p-1 text-center text-green-700 dark:text-green-400 hover:border-gray-800 hover:text-blue-800"
                />
                <Link href={`/etiquetas/${formatWord(t)}`} className="-ml-2 font-semibold ">
                  {`(${tags[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

Tags.propTypes = { tags: PropTypes.object }
Tags.defaultProps = { tags: {} }
