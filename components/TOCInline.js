import PropTypes from 'prop-types'

/**
 * Renderiza una tabla de contenido en línea.
 *
 * @param {Object[]} toc - El array de elementos de la tabla de contenido.
 * @param {number} [indentDepth=3] - La profundidad a la que se debe indentar los elementos de la tabla de contenido.
 * @param {number} [fromHeading=1] - El nivel mínimo de encabezado a incluir en la tabla de contenido.
 * @param {number} [toHeading=6] - El nivel máximo de encabezado a incluir en la tabla de contenido.
 * @param {boolean} [asDisclosure=false] - Si se debe renderizar la tabla de contenido como un elemento de divulgación.
 * @param {string|string[]} [exclude=''] - Los encabezados a excluir de la tabla de contenido.
 * @returns {JSX.Element} La tabla de contenido renderizada.
 */
const TOInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
}) => {
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
      {asDisclosure ? (
        <details open>
          <summary className="ml-16 pb-2 text-xl font-bold">Tabla de contenido</summary>
          <div className="ml-6"> {tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  )
}
TOInline.propTypes = {
  toc: PropTypes.array.isRequired,
  indentDepth: PropTypes.number,
  fromHeading: PropTypes.number,
  toHeading: PropTypes.number,
  asDisclosure: PropTypes.bool,
  exclude: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

export default TOInline
