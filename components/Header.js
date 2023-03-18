import siteMetadata from "@/data/siteMetatdata";
import colors, { gray } from "tailwindcss/colors";


export default function Header() {
    return (
        <section className="mb-32 text-center lg:text-left ">
            <div
                className=" grid lg:grid-cols-2 border-b-2 gap-6 xl:gap-12 items-center"
                style={{ borderColor: '#ccc' , borderBottom: '1px solid #ccc'}}
            >
                <div className="mb-6 lg:mb-0">
                    <h2 className="text-5xl text-gray-50  md:text-6xl xl:text-7xl fond-bold mix-blend-difference tracking-tight">
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