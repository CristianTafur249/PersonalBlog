import SectionContainer from "./SectionContainer";

export default function PageTitle({ children }) {
    return (
        <SectionContainer>
            <div className=" text-3xl leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl lg:text-6xl xl:text-7xl md:leading-14">
                {children}
            </div>
        </SectionContainer>
    )
}