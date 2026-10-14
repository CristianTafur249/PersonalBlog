import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import SectionContainer from './SectionContainer'
import SocialLinks from './SocialLinks'

export default function Footer() {
    return (
        <footer className="border-t border-line py-6">
            <SectionContainer>
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-muted">
                        © {new Date().getFullYear()} {siteMetadata.author}
                        <Link
                            href="/cookies"
                            className="ml-4 underline underline-offset-4 transition-colors duration-200 hover:text-accent"
                        >
                            Aviso de cookies
                        </Link>
                    </p>
                    <SocialLinks
                        email={siteMetadata.email}
                        twitter={siteMetadata.twitter}
                        linkedin={siteMetadata.linkedin}
                        github={siteMetadata.github}
                    />
                </div>
            </SectionContainer>
        </footer>
    )
}
