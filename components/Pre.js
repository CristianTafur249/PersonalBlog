import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Componente que muestra un bloque de código preformateado con la opción de copiarlo al portapapeles.
 */
const Pre = (props) => {
    const preRef = useRef(null)
    const [copied, setCopied] = useState(false)

    const onCopy = () => {
        setCopied(true)
        navigator.clipboard.writeText(preRef.current.textContent)
        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    return (
        <div className="group/pre relative">
            <button
                aria-label={copied ? 'Copiado' : 'Copiar código'}
                type="button"
                className={`absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-lg border bg-surface opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover/pre:opacity-100 [@media(hover:none)]:opacity-100 ${
                    copied ? 'border-accent text-accent' : 'border-line text-muted hover:text-ink'
                }`}
                onClick={onCopy}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                >
                    {copied ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    )}
                </svg>
            </button>

            <pre ref={preRef}>{props.children}</pre>
        </div>
    )
}
Pre.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Pre
