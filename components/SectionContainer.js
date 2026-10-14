import PropTypes from 'prop-types'

/**
 * Componente que representa un contenedor de sección.
 */
export default function SectionContainer({ children }) {
    return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
}

SectionContainer.propTypes = {
    children: PropTypes.node.isRequired,
}
