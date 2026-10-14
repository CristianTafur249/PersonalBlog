import PropTypes from 'prop-types'

/**
 * Cabecera común de página: título y descripción opcional.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - El contenido del título.
 * @param {ReactNode} props.description - Texto de apoyo bajo el título.
 * @returns {ReactNode} El componente del título de la página.
 */
export default function PageTitle({ children, description }) {
    return (
        <header className="mb-8 md:mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{children}</h1>
            {description && <p className="mt-3 max-w-2xl text-lg text-muted">{description}</p>}
        </header>
    )
}
PageTitle.propTypes = {
    children: PropTypes.node.isRequired,
    description: PropTypes.node,
}
