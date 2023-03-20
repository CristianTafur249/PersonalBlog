import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetatdata";
import { getAllTags } from "@/lib/tags";
import Tag from "@/components/Tag";
import Link from "next/link";

export async function getStaticProps() {
    const tags = await getAllTags('blog');

    return { props: { tags } };
}

export default function Tags({ tags }) {
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
    return (
        <>
            <PageSEO title={`Tags - ${siteMetadata.author}`} description="Etiqutas de lo que blogueo" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <section className="mb-32 text-center lg:text-left">
                    <div className="border-b-2 grid lg:grid-cols-2 gap-6 xl:gap-12 items-center">
                        <div className="mb-6 lg:mb-0 py-1">
                            <h1 className="text-5xl md:text-6xl xl:text-7xl fond-bold mix-blend-difference tracking-tight">
                                Etiquetas
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-6 mb-20 justify-items-center items-center">
                    {Object.keys(tags).length === 0 && 'No se encontraron etiqutas.'}
                    {sortedTags.map((t)=>{
                        return(
                            <div key={t} className="-mt-2 mb-2 mr-5">
                                <Tag text={t} className="mt-2 mb-2 mr-5"/>
                                <Link
                                href={`/tags/${t}`}
                                className="-ml-2 text-sm font-semibold uppercase"
                                >
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