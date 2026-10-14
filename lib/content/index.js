import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getAllFilesRecursively from '@/lib/utils/files'
import localProjects from '@/data/projectsData'
import { isDropboxConfigured, readMarkdownFolder } from './dropbox'

const root = process.cwd()
const CACHE_MS = 60 * 1000
const cache = new Map()

// Segundos entre regeneraciones de las páginas con contenido
export const REVALIDATE_SECONDS = Number(process.env.CONTENT_REVALIDATE_SECONDS) || 300

const formatSlug = (fileName) => fileName.replace(/\.(mdx|md)$/, '')

// Evita consultar Dropbox en cada página que se regenera
async function cached(key, load) {
    const hit = cache.get(key)
    if (hit && hit.expiresAt > Date.now()) return hit.value
    const value = await load()
    cache.set(key, { value, expiresAt: Date.now() + CACHE_MS })
    return value
}

// Lee una subcarpeta de Dropbox; ante cualquier fallo devuelve [] y el sitio sigue
async function readRemote(subfolder) {
    if (!isDropboxConfigured()) return []
    try {
        return await readMarkdownFolder(subfolder)
    } catch (error) {
        console.warn(`[contenido] Dropbox no disponible (${subfolder}): ${error.message}`)
        return []
    }
}

// El MDX remoto no puede importar ni exportar código
const hasModuleCode = (source) => /^\s*(import|export)\s/m.test(matter(source).content)

function readLocalPosts() {
    const folder = path.join(root, 'data', 'blog')
    return getAllFilesRecursively(folder)
        .map((file) => file.slice(folder.length + 1).replace(/\\/g, '/'))
        .filter((fileName) => /\.mdx?$/.test(fileName))
        .map((fileName) => ({
            slug: formatSlug(fileName),
            fileName,
            source: fs.readFileSync(path.join(folder, fileName), 'utf-8'),
            origin: 'local',
        }))
}

/**
 * Entradas del blog: las de data/blog más las de Dropbox (carpeta "entradas").
 * Si un slug existe en ambos lados gana el local.
 * @returns {Promise<Array<{slug: string, fileName: string, source: string, origin: string}>>}
 */
export function getPostSources() {
    return cached('posts', async () => {
        const posts = readLocalPosts()
        const slugs = new Set(posts.map((p) => p.slug))

        for (const file of await readRemote('entradas')) {
            const slug = formatSlug(file.fileName)
            if (slugs.has(slug)) {
                console.warn(
                    `[contenido] ${file.fileName} de Dropbox se ignora: ya existe en data/blog`
                )
                continue
            }
            if (hasModuleCode(file.source)) {
                console.warn(
                    `[contenido] ${file.fileName} de Dropbox se ignora: contiene import/export`
                )
                continue
            }
            slugs.add(slug)
            posts.push({ slug, fileName: file.fileName, source: file.source, origin: 'dropbox' })
        }
        return posts
    })
}

const isHttps = (value) => typeof value === 'string' && value.startsWith('https://')

/**
 * Proyectos: los de data/projectsData.js en su orden y después los de Dropbox
 * (carpeta "proyectos"), ordenados por `order` y título.
 */
export function getProjects() {
    return cached('projects', async () => {
        const projects = localProjects.map(
            ({ title, description, imgSrc, href, technologies }) => ({
                title,
                description: description || null,
                imgSrc: imgSrc || null,
                href: href || null,
                technologies: technologies || [],
            })
        )
        const titles = new Set(projects.map((p) => p.title.toLowerCase()))

        const remote = []
        for (const file of await readRemote('proyectos')) {
            const { data, content } = matter(file.source)
            const title = typeof data.title === 'string' ? data.title.trim() : ''
            const description = content.trim()
            if (data.draft === true) continue
            if (!title || !description) {
                console.warn(
                    `[contenido] proyecto ${file.fileName} se ignora: falta title o descripción`
                )
                continue
            }
            if (titles.has(title.toLowerCase())) {
                console.warn(`[contenido] proyecto ${file.fileName} se ignora: el título ya existe`)
                continue
            }
            if ((data.href && !isHttps(data.href)) || (data.imgSrc && !isHttps(data.imgSrc))) {
                console.warn(
                    `[contenido] proyecto ${file.fileName} se ignora: href o imgSrc no es https://`
                )
                continue
            }
            titles.add(title.toLowerCase())
            remote.push({
                title,
                description,
                imgSrc: data.imgSrc || null,
                href: data.href || null,
                technologies: Array.isArray(data.technologies) ? data.technologies.map(String) : [],
                order: Number.isFinite(data.order) ? data.order : Number.MAX_SAFE_INTEGER,
            })
        }

        remote.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'es'))
        return [...projects, ...remote.map(({ order, ...project }) => project)]
    })
}
