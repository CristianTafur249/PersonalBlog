import siteMetadata from "@/data/siteMetatdata";
import colors, { gray } from "tailwindcss/colors";
import Link from "./Link";
import SectionContainer from "./SectionContainer";


export default function Header() {
    return (
        <>
            <section className=" mx-auto my-auto w-full xl:max-w-full text-center lg:text-left ">
                <div
                    className=" grid lg:grid-cols-2 border-b-2 gap-6 xl:gap-12 items-center"
                    style={{ borderColor: '#ccc', borderBottom: '1px solid #ccc' }}
                >
                    <div className="mb-6 lg:mb-0 ">
                        <h1 className=" hed text-5xl text-gray-900 dark:text-gray-50 m-auto md:text-6xl xl:text-6xl 2xl:text-10xl fond-bold  tracking-tight">
                            <Link className=" hover:uppercase transition-colors animate-pulse ease-in-out duration-1000 " href='/'>
                                {siteMetadata.title}
                            </Link>
                        </h1>
                    </div>
                    <div className="mb-6 lg:mb-0 ">
                        <p className="text-lg dark:text-gray-50 sm:text-lg md:text-xl xl:text-xl 2xl:text-6xl">
                            {siteMetadata.description}
                        </p>
                    </div>
                </div>
            </section>
        </>

    );
}