import SectionContainer from './SectionContainer'

export default function PageTitle({ children }) {
  return (
    <SectionContainer>
      <div className=" text-gray-900 dark:text-gray-50 text-3xl tracking-tight sm:text-4xl  md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
        <h1>{children}</h1>
      </div>
    </SectionContainer>
  )
}
