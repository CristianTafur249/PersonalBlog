import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "@/data/siteMetatdata";

const CommonSEO = ({ title, description, ogType, ogImage, twImage, canonicalUrl }) => {
    const router = useRouter();
    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index" />
            <link rel="icon" href={siteMetadata.siteico} />
            <meta name="description" content={description} />
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
            <link rel="canonical"
                href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${router.asPath}`} />
        </Head>
    )
}

export const PageSEO = ({ title, description }) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    return (
        <CommonSEO
            title={title}
            descripcion={description}
            ogType="website"
            ogImage={ogImageUrl}
            twImage={twImageUrl}
        />
    )
}

export const TagSEO = ({ title, descripcion }) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    const router = useRouter();
    return (
        <>
            <CommonSEO
                title={title}
                descripcion={descripcion}
                ogType="website"
                ogImage={ogImageUrl}
                twImage={twImageUrl}
            />
            <Head>
                <link
                    rel="alternate"
                    type="aplication/rss +xml"
                    title={`${descripcion} -RSS feed`}
                    href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
                />
            </Head>
        </>
    )
}

export const BlogSEO = ({
    authorDetails,
    title,
    summary,
    date,
    lastmod,
    url,
    images = [],
    canonicalUrl,
}) => {
    const publishedAt = new Date(date).toISOString();
    const modifiedAt = new Date(lastmod || date).toISOString();
    const imagesArr =
        images.length === 0
            ? [siteMetadata.socialBanner]
            : typeof images === "string"
                ? [images]
                : images
    const router = useRouter();
    const featureImages = imagesArr.map((img) => {
        return {
            '@type': 'ImageObject',
            url: img.includes('http') ? img : siteMetadata.siteUrl + img,
        };
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
        '@context': 'http://schema.org',
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
                descripcion={summary}
                ogType="website"
                ogImage={twImageUrl}
                twImage={twImageUrl}
                canonicalUrl={canonicalUrl}
            />
            <Head>
                {date && <meta property="article:published_time" content={publishedAt} />}
                {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
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