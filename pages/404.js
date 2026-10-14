import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/SectionContainer'
import Tile from '@/components/Tile'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'

const linkClass =
    'rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-200'

export default function FourZeroFour() {
    return (
        <>
            <PageSEO title={`Pagina no encontrada - ${siteMetadata.site_name}`} />
            <SectionContainer>
                <Tile className="px-6 py-16 text-center md:py-24">
                    <h1 className="text-4xl font-bold tracking-tight text-ink md:text-6xl">
                        Página no encontrada
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-lg text-muted">
                        Error 404. La dirección no existe o cambió de sitio.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/"
                            className={`${linkClass} border-accent bg-accent text-accent-ink hover:opacity-90`}
                        >
                            Volver al inicio
                        </Link>
                        <Link
                            href="/blog"
                            className={`${linkClass} border-muted text-ink hover:border-ink`}
                        >
                            Ver el blog
                        </Link>
                    </div>
                </Tile>
            </SectionContainer>
        </>
    )
}
