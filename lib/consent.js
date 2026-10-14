const KEY = 'cookies-consent'
const LEGACY_KEY = 'cookies-aceptadas'
const EVENT = 'consent-change'

export const ACCEPTED = 'aceptadas'
export const REJECTED = 'rechazadas'

// Devuelve la decisión guardada o null si el visitante aún no ha elegido
export function getConsent() {
    if (typeof window === 'undefined') return null
    try {
        const value = localStorage.getItem(KEY)
        if (value === ACCEPTED || value === REJECTED) return value
        if (localStorage.getItem(LEGACY_KEY)) return ACCEPTED
    } catch (e) {
        return null
    }
    return null
}

export function setConsent(value) {
    try {
        localStorage.setItem(KEY, value)
        localStorage.removeItem(LEGACY_KEY)
    } catch (e) {
        // sin almacenamiento disponible la decisión dura solo esta visita
    }
    window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
}

// Borra la decisión y las cookies de analítica ya escritas
export function clearConsent() {
    try {
        localStorage.removeItem(KEY)
        localStorage.removeItem(LEGACY_KEY)
    } catch (e) {
        // nada que borrar
    }
    const host = window.location.hostname
    document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim()
        if (/^_(ga|gid|gat|gcl)/.test(name)) {
            const expired = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
            document.cookie = expired
            document.cookie = `${expired}; domain=${host}`
            document.cookie = `${expired}; domain=.${host}`
        }
    })
    window.dispatchEvent(new CustomEvent(EVENT, { detail: null }))
}

export function onConsentChange(callback) {
    const handler = (event) => callback(event.detail)
    window.addEventListener(EVENT, handler)
    return () => window.removeEventListener(EVENT, handler)
}
