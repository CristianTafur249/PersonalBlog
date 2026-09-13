import PropTypes from 'prop-types'

/**
 * Superficie base del mosaico. Con `interactive` responde al cursor y al foco.
 */
export default function Tile({
    as: Element = 'div',
    interactive = false,
    className = '',
    children,
    ...rest
}) {
    return (
        <Element
            className={`relative rounded-3xl border border-line bg-surface ${
                interactive ? 'tile-interactive' : ''
            } ${className}`}
            {...rest}
        >
            {children}
        </Element>
    )
}

Tile.propTypes = {
    as: PropTypes.elementType,
    interactive: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
}
