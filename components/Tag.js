const { default: Link } = require('next/link')
import formatWord from '@/lib/utils/formatWord'
import PropTypes from 'prop-types'

/**
 * Renderiza un componente de etiqueta.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.text - El texto de la etiqueta.
 * @param {string} props.clas - La clase CSS para la etiqueta.
 * @returns {JSX.Element} El componente de etiqueta renderizado.
 */
const Tag = ({ text, clas }) => {
  return (
    <Link href={`/tags/${formatWord(text)}`} legacyBehavior>
      <a className={clas}>{text.split(' ').join('-')}</a>
    </Link>
  )
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  clas: PropTypes.string,
}
export default Tag
