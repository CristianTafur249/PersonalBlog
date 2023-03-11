import Link from "next/link";
const CustomLink = ({href,...rest})=> {
    const isInternalLink = href && href.startsWith('/')
    const isAnchortLink = href && href.startsWith('#')


    if (isInternalLink){
        return (
            <Link href={href}>
                <a {...rest} />
            </Link>
        )
    }

    if (isAnchortLink){
        return (
            <a href={href} {...rest}/>
        )
    }

    return <a target="_blank" rel="noopener noreferrer" href={href}{...rest}/>
}
export default CustomLink;