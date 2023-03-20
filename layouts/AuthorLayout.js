import SectionContainer from "@/components/SectionContainer";
import { PageSEO } from "@/components/SEO";
import Image from "next/image";

export default function AutorLayout({ children, frontMatter }) {
    const { name, avatar, ocupation, email, twitter, linkedin, github } = frontMatter
    return (
        <>

            <PageSEO title={`Sobre Mi - ${name}`} description={`Sobre Mi - ${name}`} />
            <>
            <SectionContainer>
                <div
                    className=" dark:border-gray-500 border-b-2 space-y-2 pt-6 pb-8 md:space-y-5"
                    style={{ borderColor: '#ccc', borderBottom: '1px solid #ccc' }}
                >
                    <h2 className="text-2xl font- leading-9 tracking-tight sm:leading-10 md:text-5xl lg:text-6xl md:leading-14">
                        Sobre nosotros
                    </h2>
                </div>
                <div className=' mx-auto mt-10 grid   grid-cols-1 gap-y-16 gap-x-8  pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
                    <div className="flex flex-col items-center pt-8">
                        <Image
                            src={avatar}
                            alt="avatar"
                            width={192}
                            height={192}
                            className="h-48 w-48 rounded-full border shadow-2xl shadow-gray-500"
                        />
                        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
                            {name}
                        </h3>
                        <div className="dark:text-white text-gray-700">
                            {ocupation}
                        </div>
                    </div>
                    <div>
                        <div className="prose grid grid-cols-1 pt-8 pb-8 gap-8 m-2 max-w-none markdown">
                            {children}
                        </div>
                    </div>
                </div>
            </SectionContainer>
            </>
        </>
    )
}