import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO }  from '@/components/SEO'
import siteMetadata from '@/data/siteMetatdata'

export default function Proyectos() {
    return (
        <>
            <PageSEO title={`Proyecto | ${siteMetadata.author}`} description={siteMetadata.description} />
            <div className="divide-y divide-gray-200 dark:divide-gray-700 w-5/6 justify-items-center mx-auto">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Projects
                    </h1>
                    
                </div>
                <div className="container py-12">
                    <div className="-m-4 flex flex-wrap mx-auto">
                        {projectsData.map((d) => (
                            <Card
                                key={d.title}
                                title={d.title}
                                description={d.description}
                                imgSrc={d.imgSrc}
                                href={d.href}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}