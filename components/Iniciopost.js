import React, { useState, useEffect } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function InicioPost() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => setShowButton(window.scrollY > 500)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <button
            type="button"
            aria-label="Volver arriba"
            onClick={handleClick}
            className={`fixed bottom-4 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink text-canvas shadow-lg transition-opacity duration-200 hover:bg-accent hover:text-accent-ink ${
                showButton ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
            }`}
        >
            <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
        </button>
    )
}
