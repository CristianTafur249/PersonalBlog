import siteMetadata from '@/data/siteMetadata'
import Link from './Link'

/**
 * Renderiza el componente de encabezado.
 * @returns {JSX.Element} El componente de encabezado renderizado.
 */
export default function Header() {
  return (
    <section className=" mx-auto my-auto w-full xl:max-w-full text-center lg:text-left ">
      <div
        className=" grid lg:grid-cols-2 border-b-2 gap-6 xl:gap-12 items-center"
        style={{ borderColor: '#ccc', borderBottom: '1px solid #ccc' }}
      >
        <div className="mb-6 lg:mb-0 ">
          <h1 className=" hed text-5xl text-gray-900 dark:text-gray-50 m-auto md:text-3xl xl:text-7xl 2xl:text-8xl fond-bold  tracking-tight">
            <Link
              className="siteT transition-colors animate-pulse ease-in-out duration-1000 "
              href="/"
            >
              {siteMetadata.title}
            </Link>
          </h1>
        </div>
        <div className="mb-6 lg:mb-0 ">
          <p className="text-lg dark:text-gray-50 sm:text-lg md:text-xl xl:text-xl 2xl:text-5xl">
            {siteMetadata.description}
          </p>
        </div>
      </div>
    </section>
  )
}
