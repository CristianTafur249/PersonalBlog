import { getContentStatus } from '@/lib/content'

// Diagnóstico de la conexión con Dropbox. No muestra credenciales, solo qué
// variables faltan, qué carpetas se leen y qué archivos se encontraron.
export default async function handler(req, res) {
    const status = await getContentStatus()
    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(status)
}
