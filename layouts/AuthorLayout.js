import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import SocialLinks from '@/components/SocialLinks'
import Tile from '@/components/Tile'
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
 * @param {string} props.frontMatter.ocupation - La ocupación del autor.
 * @param {string} props.frontMatter.email - El correo del autor.
 * @param {string} props.frontMatter.twitter - El enlace al perfil de Twitter del autor.
 * @param {string} props.frontMatter.linkedin - El enlace al perfil de LinkedIn del autor.
 * @param {string} props.frontMatter.github - El enlace al perfil de GitHub del autor.
 * @returns {ReactNode} El componente de diseño del autor.
 */
export default function AutorLayout({ children, frontMatter }) {
    const { name, avatar, lengs = [], email, twitter, github } = frontMatter
    // El frontmatter usa `ocupation` y `linkedin`; se aceptan también las variantes antiguas
    const ocupation = frontMatter.ocupation || frontMatter.occupation
    const linkedin = frontMatter.linkedin || frontMatter.LinkedIn
    return (
        <>
            <PageSEO
                title={`Sobre Mi - ${name}`}
                description={`Sobre Mi - ${name}`}
                metaKeywords={`Sobre Mi, ${name}, ${ocupation}, ${lengs.join(', ')}`}
            />
            <SectionContainer>
                <PageTitle>Sobre mí</PageTitle>
                <div className="grid items-start gap-4 lg:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <Tile className="flex flex-col items-center p-8 text-center">
                            <Image
                                src={avatar}
                                alt=""
                                width={160}
                                height={160}
                                priority
                                className="h-40 w-40 rounded-full object-cover"
                            />
                            <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink">
                                {name}
                            </h2>
                            {ocupation && <p className="mt-1 text-muted">{ocupation}</p>}
                            <SocialLinks
                                className="mt-4"
                                email={email}
                                twitter={twitter}
                                linkedin={linkedin}
                                github={github}
                            />
                        </Tile>
                        {lengs.length > 0 && (
                            <Tile className="p-6">
                                <h2 className="text-xl font-bold tracking-tight text-ink">
                                    Lenguajes
                                </h2>
                                <ul className="mt-4 flex flex-wrap gap-2">
                                    {lengs.map((leng) => (
                                        <li
                                            key={leng}
                                            className="rounded-full bg-sunken px-3 py-1 text-sm font-medium text-ink"
                                        >
                                            {leng}
                                        </li>
                                    ))}
                                </ul>
                            </Tile>
                        )}
                    </div>
                    <Tile className="p-6 md:p-10 lg:col-span-2">
                        <div className="prose md:prose-lg">{children}</div>
                    </Tile>
                </div>
            </SectionContainer>
        </>
    )
}
AutorLayout.propTypes = {
    children: PropTypes.node.isRequired,
    frontMatter: PropTypes.object,
}
