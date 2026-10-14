import fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import getAllFilesRecursively from './utils/files'
import getCover from './utils/getCover'
import { getPostSources } from './content'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
import remarkExtractFrontmatter from './remark-extract-frontmatter'
import remarkCodeTitles from './remark-code-title'
import remarkTocHeadings from './remark-toc-headings'
import remarkImgToJsx from './remark-img-to-jsx'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.cwd()

//obtiene todos los archivos
export const getFiles = (type) => {
    const prefixPaths = path.join(root, 'data', type)
    const files = getAllFilesRecursively(prefixPaths)
    // Only want to return blog/path and ignore root, replace is needed to work on Windows
    return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function dateSortDesc(a, b) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
}

// Lee el código fuente de una entrada (local o Dropbox) o de un autor (disco)
async function readSource(type, slug) {
    if (type === 'blog') {
        const post = (await getPostSources()).find((p) => p.slug === slug)
        return post ? { source: post.source, fileName: post.fileName } : null
    }
    const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
    const mdPath = path.join(root, 'data', type, `${slug}.md`)
    if (fs.existsSync(mdxPath))
        return { source: fs.readFileSync(mdxPath, 'utf-8'), fileName: `${slug}.mdx` }
    if (fs.existsSync(mdPath))
        return { source: fs.readFileSync(mdPath, 'utf-8'), fileName: `${slug}.md` }
    return null
}

//recoge los blogs por medio del link; devuelve null si no existe
export const getFilesBySlug = async (type, slug) => {
    const file = await readSource(type, String(slug))
    if (!file) return null
    const { source, fileName } = file

    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe')
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            root,
            'node_modules',
            'esbuild',
            'bin',
            'esbuild'
        )
    }

    let toc = []
    const { code, frontmatter } = await bundleMDX({
        source,
        cwd: path.join(root, 'components'),
        mdxOptions(options, frontmatter) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkExtractFrontmatter,
                [remarkTocHeadings, { exportRef: toc }],
                remarkGfm,
                [
                    remarkCodeTitles,
                    {
                        jsx: (props) => {
                            return <div className="remark-code-title my-custom-class">{props}</div>
                        },
                    },
                ],
                [remarkFootnotes, { inlineNotes: true }],
                remarkMath,
                remarkImgToJsx,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                rehypeSlug,
                rehypeAutolinkHeadings,
                rehypeKatex,
                [rehypeCitation, { path: path.join(root, 'data') }],
                [rehypePrismPlus, { ignoreMissing: true }],
                rehypePresetMinify,
            ]
            return options
        },
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                '.js': 'jsx',
            }
            return options
        },
    })
    return {
        mdxSource: code,
        toc,
        frontMatter: {
            readingTime: readingTime(code),
            readingMinutes: Math.ceil(readingTime(matter(source).content).minutes),
            slug: slug || null,
            fileName,
            ...frontmatter,
            date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        },
    }
}

export function formatSlug(slug) {
    return slug.replace(/\.(mdx|md)/, '')
}

// Metadatos de todas las entradas publicadas (locales y de Dropbox), de la más nueva a la más vieja
export const getAllFilesMetadata = async () => {
    const posts = await getPostSources()
    const allFrontMatter = []
    posts.forEach(({ slug, source }) => {
        const { data: frontmatter, content } = matter(source)
        if (frontmatter.draft !== true) {
            allFrontMatter.push({
                ...frontmatter,
                tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
                cover: getCover(frontmatter.images),
                readingMinutes: Math.ceil(readingTime(content).minutes),
                slug,
                date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
                lastmod: frontmatter.lastmod ? new Date(frontmatter.lastmod).toISOString() : null,
            })
        }
    })

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
