import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Proyectos() {
  return (
    <>
      <PageSEO title={`Proyectos`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 w-5/6 justify-items-center mx-auto">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="dark:text-white  md:text-6xl text-4xl w-full 2xl:text-7xl fond-bold tracking-tight">
            Proyectos
          </h1>
        </div>
        <div className="container py-12">
          <div className="flex flex-wrap mx-auto">
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
