import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Proyectos() {
    const keywords = ['projects', 'portfolio', 'personal blog', 'web development', 'coding']

    return (
        <>
            <PageSEO
                title={`Proyecto | ${siteMetadata.author}`}
                description={siteMetadata.description}
                metaKeywords={keywords}
            />
            <SectionContainer>
                <PageTitle>Proyectos</PageTitle>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            </SectionContainer>
        </>
    )
}
