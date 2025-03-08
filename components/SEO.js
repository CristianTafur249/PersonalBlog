import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import PropTypes from 'prop-types'

/**
 * Componente para configurar las etiquetas SEO comunes en el encabezado de la página.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.title - El título de la página.
 * @param {string} props.description - La descripción de la página.
 * @param {string} props.ogType - El tipo de objeto Open Graph.
 * @param {string | Array} props.ogImage - La imagen o imágenes Open Graph.
 * @param {string} props.twImage - La imagen para Twitter.
 * @param {string} props.canonicalUrl - La URL canónica de la página.
 * @returns {JSX.Element} - El componente de configuración SEO.
 */
const CommonSEO = ({
    title,
    description,
    ogType,
    ogImage,
    twImage,
    canonicalUrl,
    metaKeywords,
}) => {
    const router = useRouter()
    return (
        <Head>
            <title>{title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}</title>
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <meta name="robots" content="follow, index" />
            <link rel="icon" href={siteMetadata.siteico} crossOrigin="true" />
            <meta name="description" content={description} />
            {metaKeywords && <meta name="keywords" content={metaKeywords} />}
            <meta name="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
            <meta name="og:type" content={ogType} />
            <meta name="og:description" content={description} />
            <meta name="og:site_name" content={siteMetadata.site_name} />
            <meta property="og:title" content={title} />
            {ogImage.constructor.name === 'Array' ? (
                ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
            ) : (
                <meta property="og:image" content={ogImage} key={ogImage} />
            )}
            <meta name="twitter:site" content="siteMetadata.twitter" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:image" content={twImage} />
            <meta name="twitter:description" content={description} />
            <link rel="canonical" href={canonicalUrl || `${siteMetadata.siteUrl}${router.asPath}`} />
        </Head>
    )
}
CommonSEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    ogType: PropTypes.string,
    ogImage: PropTypes.string,
    twImage: PropTypes.string,
    canonicalUrl: PropTypes.string,
}

/**
 * Genera metadatos SEO para una página.
 * @param {Object} props - El objeto de props.
 * @param {string} props.title - El título de la página.
 * @param {string} props.description - La descripción de la página.
 * @returns {JSX.Element} - El componente SEO.
 */
export const PageSEO = ({ title, description, metaKeywords }) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            ogImage={ogImageUrl}
            twImage={twImageUrl}
            metaKeywords={metaKeywords}
        />
    )
}

PageSEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

/**
 * Componente para la optimización de motores de búsqueda (SEO).
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.title - El título de la página.
 * @param {string} props.description - La descripción de la página.
 * @returns {JSX.Element} El componente SEO.
 */
export const TagSEO = ({ title, description, metaKeywords }) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    const router = useRouter()
    return (
        <>
            <CommonSEO
                title={title}
                description={description}
                metaKeywords={metaKeywords}
                ogType="website"
                ogImage={ogImageUrl}
                twImage={twImageUrl}
            />
            <Head>
                <link
                    rel="alternate"
                    type="aplication/rss +xml"
                    title={`${description} -RSS feed`}
                    href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
                />
            </Head>
        </>
    )
}

TagSEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

/**
 * Componente para generar metadatos SEO y datos estructurados para una publicación de blog.
 *
 * @param {Object} props - El objeto de props.
 * @param {Array} props.authorDetails - Los detalles del autor(es) de la publicación del blog.
 * @param {string} props.title - El título de la publicación del blog.
 * @param {string} props.summary - Un resumen de la publicación del blog.
 * @param {string} props.date - La fecha en que se publicó la publicación del blog.
 * @param {string} props.lastmod - La fecha en que se modificó por última vez la publicación del blog.
 * @param {string} props.url - La URL de la publicación del blog.
 * @param {Array} [props.images=[]] - Un array de imágenes asociadas con la publicación del blog.
 * @param {string} props.canonicalUrl - La URL canónica de la publicación del blog.
 * @returns {JSX.Element} El componente renderizado.
 */
export const BlogSEO = ({
    authorDetails,
    title,
    summary,
    date,
    lastmod,
    url,
    images = [],
    canonicalUrl,
    tags,
    metaKeywords,
}) => {
    const publishedAt = new Date(date).toISOString()
    const modifiedAt = new Date(lastmod || date).toISOString()
    let imagesArr

    if (images.length === 0) {
        imagesArr = [siteMetadata.socialBanner]
    } else if (typeof images === 'string') {
        imagesArr = [images]
    } else {
        imagesArr = images
    }
    const featureImages = imagesArr.map((img) => {
        return {
            '@type': 'ImageObject',
            url: img.includes('http') ? img : siteMetadata.siteUrl + img,
        }
    })
    let authorList
    if (authorDetails) {
        authorList = authorDetails.map((author) => {
            return {
                '@type': 'Person',
                name: author.name,
            }
        })
    } else {
        authorList = {
            '@type': 'Person',
            name: siteMetadata.author,
        }
    }
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
            '@type': 'webpage',
            '@id': url,
        },
        headline: title,
        image: featureImages,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: authorList,
        publisher: {
            '@type': 'Organization',
            name: siteMetadata.author,
            logo: {
                '@type': 'ImageObject',
                url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
            },
        },
        description: summary,
    }
    const twImageUrl = featureImages[0].url
    return (
        <>
            <CommonSEO
                title={title}
                description={summary}
                ogType="website"
                ogImage={twImageUrl}
                twImage={twImageUrl}
                canonicalUrl={canonicalUrl}
                metaKeywords={metaKeywords}
            />
            <Head>
                {date && <meta property="article:published_time" content={publishedAt} />}
                {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
                {<meta name="keywords" content={tags} />}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData, null, 2),
                    }}
                />
            </Head>
        </>
    )
}

BlogSEO.propTypes = {
    authorDetails: PropTypes.array,
    title: PropTypes.string,
    summary: PropTypes.string,
    date: PropTypes.string,
    lastmod: PropTypes.string,
    url: PropTypes.string,
    images: PropTypes.array,
    canonicalUrl: PropTypes.string,
    tags: PropTypes.string,
    metaKeywords: PropTypes.string,
}
