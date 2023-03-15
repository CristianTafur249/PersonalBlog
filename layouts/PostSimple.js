import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import { BlogSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetatdata";
import formatDate from "@/lib/utils/formatDate";
import Link from "@/components/Link";

export default function PostLayout({ frontmatter, authorDetails, siguiente, anterior, children }) {
    const { date, title } = frontmatter;

    return (
        <SectionContainer>
            <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontmatter.slug}`} {...frontmatter} />
            <article>
                <div>
                    <header>
                        <div>
                            <dl>
                                <div>
                                    <dt className="sr-only">
                                        Publicado en
                                    </dt>
                                    <dd>
                                        <time datetime={date}>{formatDate()}</time>
                                    </dd>

                                </div>
                            </dl>
                            <div>
                                <PageTitle>{title}</PageTitle>
                            </div>
                        </div>
                    </header>
                    <div
                        className="divide-y divide-gray-200 pb-8 xl:divide-y-0 "
                    >
                        <div>
                            <div> {children} </div>
                        </div>
                        <footer>
                            <div>
                                {anterior && (
                                    <div>
                                        <Link
                                            href={`/blog/${anterior.slug}`}
                                            className=""
                                        >
                                            &larr; {anterior.title}
                                        </Link>
                                    </div>
                                )}
                                {siguiente && (
                                    <div>
                                        <Link
                                            href={`/blog/${siguiente.slug}`}
                                            className=""
                                        >
                                            {siguiente.title} &rarr;
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </footer>
                    </div>
                </div>
            </article>
        </SectionContainer>
    )
}