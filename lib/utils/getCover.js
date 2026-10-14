// Normaliza `images` del frontmatter (arreglo, cadena, [''] o ausente) a una URL o null
const getCover = (images) => {
    const first = Array.isArray(images) ? images[0] : images
    return typeof first === 'string' && first.trim() ? first.trim() : null
}

export default getCover
