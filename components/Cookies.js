import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ACCEPTED, REJECTED, getConsent, onConsentChange, setConsent } from '@/lib/consent'

const buttonClass =
    'flex-1 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200'

/**
 * Aviso de cookies no bloqueante: la página se puede leer y usar mientras está abierto.
 * La analítica solo se carga al aceptar (ver components/analytics/Analytics.js).
 */
export default function Cookies() {
    const [showCookies, setShowCookies] = useState(false)

    useEffect(() => {
        setShowCookies(getConsent() === null)
        return onConsentChange((value) => setShowCookies(value === null))
    }, [])

    if (!showCookies) return null

    return (
        <section
            aria-label="Aviso de cookies"
            className="fixed inset-x-4 bottom-4 z-40 rounded-3xl border border-line bg-surface p-5 shadow-xl sm:right-auto sm:max-w-sm"
        >
            <h2 className="text-base font-bold text-ink">Cookies</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
                Usamos cookies de analítica solo si las aceptas. Las necesarias para que el sitio
                funcione, como tu preferencia de tema, se guardan siempre.{' '}
                <Link href="/cookies" className="text-accent underline underline-offset-4">
                    Aviso de cookies
                </Link>
            </p>
            <div className="mt-4 flex gap-2">
                <button
                    type="button"
                    className={`${buttonClass} border-muted text-ink hover:border-ink`}
                    onClick={() => setConsent(REJECTED)}
                >
                    Solo necesarias
                </button>
                <button
                    type="button"
                    className={`${buttonClass} border-accent bg-accent text-accent-ink hover:opacity-90`}
                    onClick={() => setConsent(ACCEPTED)}
                >
                    Aceptar
                </button>
            </div>
        </section>
    )
}
