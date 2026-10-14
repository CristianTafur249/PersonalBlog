import { getAllFilesMetadata } from './mdx'
import formatWord from '@/lib/utils/formatWord'

// Cuenta las entradas publicadas por etiqueta (locales y de Dropbox)
export async function getAllTags() {
    const posts = await getAllFilesMetadata()
    const tagCount = {}
    posts.forEach((post) => {
        post.tags.forEach((tag) => {
            const formattedTag = formatWord(tag)
            tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1
        })
    })
    return tagCount
}
