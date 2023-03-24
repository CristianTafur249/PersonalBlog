const { default: Link } = require("next/link")


const Tag = ({ text ,clas}) => {
    return (
        <Link href={`/tags/${text}`} legacyBehavior>
            <a className={clas}>
                {text.split(" ").join('-')}
            </a>
        </Link>
    )
}
export default Tag;