import PropTypes from 'prop-types'

/**
 * Componente que representa un contenedor de sección.
 */
export default function SectionContainer({ children }) {
    return <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-7xl xl:px-0">{children}</div>
}

SectionContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
