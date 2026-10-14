import siteMetadata from '@/data/siteMetadata'

/**
 * Renderiza el componente de encabezado.
 * @returns {JSX.Element} El componente de encabezado renderizado.
 */
export default function Header() {
    return (
        <header className="mb-8 md:mb-10">
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl lg:leading-[1.1]">
                {siteMetadata.description}
            </h1>
        </header>
    )
}
