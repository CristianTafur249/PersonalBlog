// Cliente mínimo de la API de Dropbox para leer el contenido del blog.
// Usa una app con acceso "App folder": solo ve su propia carpeta.
const API_URL = process.env.DROPBOX_API_URL || 'https://api.dropboxapi.com'
const CONTENT_URL = process.env.DROPBOX_CONTENT_URL || 'https://content.dropboxapi.com'

let cachedToken = null

const REQUIRED_VARS = ['DROPBOX_APP_KEY', 'DROPBOX_APP_SECRET', 'DROPBOX_REFRESH_TOKEN']

// Nombres de las variables obligatorias que faltan (nunca sus valores)
export const missingDropboxVars = () => REQUIRED_VARS.filter((name) => !process.env[name])

export const isDropboxConfigured = () => missingDropboxVars().length === 0

// Ruta dentro de la carpeta de la app, con DROPBOX_FOLDER como prefijo opcional
export const folderPath = (subfolder) => {
    const base = (process.env.DROPBOX_FOLDER || '').replace(/^\/+|\/+$/g, '')
    return '/' + [base, subfolder].filter(Boolean).join('/')
}

async function getAccessToken() {
    if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
        client_id: process.env.DROPBOX_APP_KEY,
        client_secret: process.env.DROPBOX_APP_SECRET,
    })
    const res = await fetch(`${API_URL}/oauth2/token`, { method: 'POST', body })
    if (!res.ok) throw new Error(`token de Dropbox rechazado (${res.status})`)

    const data = await res.json()
    // Se renueva un minuto antes de que caduque
    cachedToken = {
        value: data.access_token,
        expiresAt: Date.now() + ((data.expires_in || 14400) - 60) * 1000,
    }
    return cachedToken.value
}

async function rpc(endpoint, args) {
    const token = await getAccessToken()
    const res = await fetch(`${API_URL}/2/${endpoint}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(args),
    })
    if (res.status === 409) {
        const error = await res.json().catch(() => ({}))
        // La carpeta todavía no existe: no hay contenido
        if (JSON.stringify(error).includes('not_found')) return null
        throw new Error(`Dropbox ${endpoint}: ${error.error_summary || res.status}`)
    }
    if (!res.ok) throw new Error(`Dropbox ${endpoint}: ${res.status}`)
    return res.json()
}

async function download(pathLower) {
    const token = await getAccessToken()
    const res = await fetch(`${CONTENT_URL}/2/files/download`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Dropbox-API-Arg': JSON.stringify({ path: pathLower }),
        },
    })
    if (!res.ok) throw new Error(`Dropbox download ${pathLower}: ${res.status}`)
    return res.text()
}

/**
 * Lista y descarga los archivos .md y .mdx de una subcarpeta.
 * @returns {Promise<Array<{fileName: string, source: string}>>}
 */
export async function readMarkdownFolder(subfolder) {
    let page = await rpc('files/list_folder', { path: folderPath(subfolder), recursive: false })
    if (!page) return []

    const entries = [...page.entries]
    while (page.has_more) {
        page = await rpc('files/list_folder/continue', { cursor: page.cursor })
        entries.push(...page.entries)
    }

    const files = entries.filter((e) => e['.tag'] === 'file' && /\.mdx?$/i.test(e.name))
    return Promise.all(
        files.map(async (file) => ({
            fileName: file.name,
            source: await download(file.path_lower),
        }))
    )
}
