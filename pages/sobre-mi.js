import { MDXLayoutRender } from "@/components/MDXComponents";
import { getFilesBySlug } from "@/lib/mdx";

const DEFAULT_LAYOUT = 'AuthorLayout';

export async function getStaticProps() {
    const authorDetails = await getFilesBySlug('authors', ['tafur'])
    return { props: { authorDetails } }
}

export default function SobreMi({ authorDetails }) {
    const { mdxSource, frontMatter } = authorDetails

    return (
        <MDXLayoutRender
            layout={frontMatter.layout || DEFAULT_LAYOUT}
            mdxSource={mdxSource}
            frontMatter={frontMatter}
        />
    )
}