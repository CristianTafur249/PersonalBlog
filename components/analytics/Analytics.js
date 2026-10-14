import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initGTM, pageview } from './Google'
import { ACCEPTED, getConsent, onConsentChange } from '@/lib/consent'

/**
 * Carga la analítica solo con consentimiento y registra cada cambio de página.
 */
export default function Analytics() {
    const router = useRouter()

    useEffect(() => {
        let started = false
        const start = () => {
            if (started) return
            started = true
            initGTM()
            window.dataLayer.push({ event: 'cookies-aceptadas' })
            pageview(window.location.pathname + window.location.search)
        }

        if (getConsent() === ACCEPTED) start()
        const stopListening = onConsentChange((value) => {
            if (value === ACCEPTED) start()
        })
        const handleRouteChange = (url) => {
            if (started) pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            stopListening()
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return null
}
