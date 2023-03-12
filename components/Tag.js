const { default: Link } = require("next/link")


const Tag = ({ text }) => {
    return (
        <Link href={`/tags/${text}`} legacyBehavior>
            <a className="relative z-10 rounded-full  py-1.5 px-3 font-medium text-green-700 hover:text-blue-400">
                {text.split(" ").join('-')}
            </a>
        </Link>
    )
}
export default Tag;