import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetatdata";
import Link from 'next/link';


export default function FourZeroFour() {
    return (
        <>
            <PageSEO title={`Pagina no encontrada - ${siteMetadata.site_name}`} />
            <main className=" t grid min-w-full min-h-full place-items-center mix-blend-difference py-24 px-6 sm:py-32 lg:px-8 ">
                <div className="text-center">
                    <p className="text-6xl  font-semibold text-yellow-400">
                        404
                    </p>
                    <h1 className="text-3xl mix-blend-difference mt-4 font-extrabold leading-9 tracking-tight  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Página no Encontrada
                    </h1>
                    <p className="mt-6 text-base leading-7 ">
                        Lo siento, no podemos encontrar la pagina que buscas
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6" >
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Volver al inicio

                        </Link>

                    </div>

                </div>
            </main>
        </>
    )
}