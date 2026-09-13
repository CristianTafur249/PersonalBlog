/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Portada con zoom al pasar el cursor sobre la pieza (`group`) que la contiene.
 * Usa <img> porque las portadas vienen de hosts arbitrarios; si falta o falla,
 * muestra una portada de reserva con `label`.
 */
export default function Cover({ src, alt = '', label, className = '' }) {
    const imgRef = useRef(null)
    const [failed, setFailed] = useState(false)

    // Cubre el caso en que la imagen falló antes de hidratar
    useEffect(() => {
        const img = imgRef.current
        if (img && img.complete && img.naturalWidth === 0) setFailed(true)
    }, [])

    return (
        <div className={`overflow-hidden rounded-2xl bg-sunken ${className}`}>
            {src && !failed ? (
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
            ) : (
                <div
                    aria-hidden="true"
                    className="cover-fallback flex h-full w-full items-end p-5 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
                >
                    {label && (
                        <span className="text-3xl font-bold tracking-tight text-white/90">
                            {label}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

Cover.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
}
