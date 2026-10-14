import Link from 'next/link'
import formatWord from '@/lib/utils/formatWord'
import PropTypes from 'prop-types'

const DEFAULT_CLASS =
    'relative z-10 inline-flex items-center rounded-full bg-sunken px-3 py-1 text-xs font-medium text-ink transition-colors duration-200 hover:bg-accent hover:text-accent-ink'

/**
 * Renderiza un componente de etiqueta.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.text - El texto de la etiqueta.
 * @param {string} props.clas - Clases que sustituyen al estilo de píldora por defecto.
 * @returns {JSX.Element} El componente de etiqueta renderizado.
 */
const Tag = ({ text, clas }) => {
    return (
        <Link href={`/etiquetas/${formatWord(text)}`} className={clas || DEFAULT_CLASS}>
            {text.split(' ').join('-')}
        </Link>
    )
}

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    clas: PropTypes.string,
}
export default Tag
