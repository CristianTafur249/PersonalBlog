import siteMetadata from "@/data/siteMetatdata";


export default function Header(){
    return(
            <section className="mb-32 text-center lg:text-left text-white mix-blend-difference">
                <div className="grid lg:grid-cols-2 gap-6 xl:gap-12 items-center">
                    <div className="mb-6 lg:mb-0">
                        <h2 className="tex-5xl md:text-6xl xl:text-7xl fond-bold tracking-tight">
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