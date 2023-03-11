import siteMetadata from "@/data/siteMetatdata";


export default function Header() {
    return (
        <section className="mb-32 text-center lg:text-left ">
            <div className="border-b-2  grid lg:grid-cols-2 gap-6 xl:gap-12 items-center  ">
                <div className="mb-6 lg:mb-0">
                    <h2 className="text-5xl md:text-6xl xl:text-7xl fond-bold mix-blend-difference tracking-tight">
                        {siteMetadata.title}
                    </h2>
                </div>
                <div className="mb-6 lg:mb-0">
                    <p className="text-lg">
                        {siteMetadata.description}
                    </p>
                </div>
            </div>
        </section>
    );
}