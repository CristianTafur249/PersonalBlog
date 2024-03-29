import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
import Image from '@/components/Image'
import PropTypes from 'prop-types'

/**
 * Componente de diseño para el diseño del autor.
 * @param {Object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - Los elementos hijos del componente.
 * @param {Object} props.frontMatter - Los metadatos del autor.
 * @param {string} props.frontMatter.name - El nombre del autor.
 * @param {string} props.frontMatter.avatar - La URL del avatar del autor.
 * @param {string[]} props.frontMatter.lengs - Los lenguajes manejados por el autor.
 * @param {string} props.frontMatter.occupation - La ocupación del autor.
 * @param {string} props.frontMatter.twitter - El enlace al perfil de Twitter del autor.
 * @param {string} props.frontMatter.LinkedIn - El enlace al perfil de LinkedIn del autor.
 * @param {string} props.frontMatter.github - El enlace al perfil de GitHub del autor.
 * @returns {ReactNode} El componente de diseño del autor.
 */
export default function AutorLayout({ children, frontMatter }) {
  const {
    name,
    avatar,
    lengs,
    occupation: ocupation,
    twitter,
    LinkedIn: linkedin,
    github,
  } = frontMatter
  const isAboveTheFold = true
  return (
    <>
      <PageSEO title={`Sobre Mi - ${name}`} description={`Sobre Mi - ${name}`} />
      <SectionContainer>
        <div
          className="dark:border-gray-500 border-b-2 space-y-2 pt-6 pb-8 md:space-y-5"
          style={{ borderColor: '#ccc', borderBottom: '1px solid #ccc' }}
        >
          <h1 className="dark:text-white md:text-6xl text-4xl w-full 2xl:text-7xl fond-bold tracking-tight">
            Sobre nosotros
          </h1>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-y-16 gap-x-8 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="mx-auto my-auto flex-col justify-items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width={198}
              priority={isAboveTheFold}
              height={198}
              loading={isAboveTheFold ? 'eager' : 'lazy'}
              className="m-auto rounded-full border ava object-cover"
            />
            <h3 className="pt-4 m-auto pb-2 text-2xl font-bold leading-8 text-center tracking-tight">
              {name}
            </h3>
            <div className="m-auto text-center dark:text-white text-gray-700">{ocupation}</div>
            <div className="m-auto tracking-widest">
              <p className="m-auto siteT text-center dark:text-white text-gray-700">
                {' '}
                Lenguajes manejados:
              </p>
              {lengs.map((leng) => (
                <button
                  key={leng}
                  className="transition ease-in-out duration-700 hover:border-b-2 relative z-10 rounded-full m-auto ml-3 my-4 p-2 text-center  border-green-700 text-green-700 hover:border-gray-800 hover:text-blue-800 dark:hover:border-gray-50 dark:hover:text-blue-50 "
                >
                  {leng}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={twitter}
                type="button"
                className="ava m-1 h-9 w-9 rounded-full border-2 lg:h-14 xl:w-14 
                                    lg:border-2 xl:border-4 uppercase leading-normal  transition 
                                    duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 
                                    focus:outline-none focus:ring-0"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto transition ease-in-out duration-700 hover:text-blue-800 h-full xl:w-8 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  alt="twitter"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a
                href={linkedin}
                type="button"
                className="ava m-1 h-9 w-9 rounded-full border-2 lg:h-14 xl:w-14 lg:border-2 xl:border-4 uppercase leading-normal transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-full transition ease-in-out duration-700 hover:text-blue-800  xl:w-8 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  alt="linkedin"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>

              <a
                href={github}
                type="button"
                className="m-1 h-9 w-9 ava  rounded-full border-2 lg:h-14 xl:w-14 lg:border-2 xl:border-4 uppercase leading-normal  transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-full xl:w-8 w-4 transition ease-in-out duration-700 hover:text-orange-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  alt="github"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className=" prose w-2/3 pt-8 pb-8 gap-8 markdownau">{children}</div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
AutorLayout.propTypes = {
  children: PropTypes.node.isRequired,
  frontMatter: PropTypes.object,
}
