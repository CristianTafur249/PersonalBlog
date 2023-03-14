import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import matter from "gray-matter";
import path, { join } from "path";
import readingTime from 'reading-time'
import { serialize } from "next-mdx-remote";
import getAllFilesRecursively from './utils/files'
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
import { rehypeKatex } from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'


const root = process.cwd();

//obtiene todos los archivos
export const getFiles = (type) => {
    const prefixPaths = path.join(root, 'data', type)
    const files = getAllFilesRecursively(prefixPaths)
    // Only want to return blog/path and ignore root, replace is needed to work on Windows
    return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
};

export function dateSortDesc(a, b) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
}

//recoge los blogs por medio del link
export const getFilesBySlug = async (type, slug) => {
    const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
    const mdPath = path.join(root, 'data', type, `${slug}.md`)
    const source = fs.existsSync(mdxPath)
        ? fs.readFileSync(mdxPath, 'utf-8')
        : fs.readFileSync(mdPath, 'utf-8');

    let toc = []
    //const {data, content} = await matter(sources);
    //const source = await serialize(content,{});
    const { code, frontmatter } = await bundleMDX({
        source,
        cwd: path.join(root, 'components'),
        xdmOptions(options, frontmatter) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkExtractFrontmatter,
                [remarkTocHeadings, { exportRef: toc }],
                remarkGfm,
                remarkCodeTitles,
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
    /*return{
        source,
        frontmatter: {
            slug,
            ...data,
        },
    }*/
    return {
        mdxSource: code,
        toc,
        frontMatter: {
            readingTime: readingTime(code),
            slug: slug || null,
            fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
            ...frontmatter,
            date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        },
    };
};
export function formatSlug(slug) {
    return slug.replace(/\.(mdx|md)/, '')
}



export const getAllFilesMetadata = (folder) => {
    const prefixPaths = path.join(root, 'data', folder)
    const files = getAllFilesRecursively(prefixPaths);
    const allFrontMatter = []
    files.forEach((file) => {
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\g/, '/')
        if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
            return
        }
        const source = fs.readFileSync(file, 'utf-8')
        const { data: frontmatter } = matter(source)
        if (frontmatter.draft !== true) {
            allFrontMatter.push({
                ...frontmatter,
                slug: formatSlug(fileName),
                date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
            })
        }
    })

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
    /*return files.reduce((allPots, postSlug)=>{
        const mdxSource = fs.readFileSync(path.join(root,'data','blog',postSlug),
        'utf-8'
        );
        const {data} = matter(mdxSource);
        return [{...data,slug: formatSlug(postSlug)},...allPots]
    },[])*/
};