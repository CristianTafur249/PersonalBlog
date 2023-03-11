const TOInline = ({
    toc,
    indentDepth = 3,
    fromHeading = 1,
    toHeading = 6,
    asDisclosure = false,
    exclude = '',
})=>{
    const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

    const filterredToc = toc.filter(
        (heading) =>
        heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
    )

    const tocList = (
        <ul>
            {filterredToc.map((heading) => (
                <li key={heading.value} className={`${heading.depth >= indentDepth && 'ml-6'}`}>
                    <a href={heading.url}>{heading.value}</a>
                </li>
            ))}
        </ul>
    )
    return (
        <>
            {isDisclosure ? (
                <details open>
                    <summary className="ml-16 pb-2 text-xl font-bold">Tabla de contenido</summary>
                    <div className="ml-6"> {tocList}</div>
                </details>
            ) :(
                tocList
            )}
        </>
    )
}
export default TOInline