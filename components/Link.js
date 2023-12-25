import Link from 'next/link'
import PropTypes from 'prop-types'

const CustomLink = ({ href, children, ...rest }) => {
  const isInternalLink = href?.startsWith('/')
  const isAnchortLink = href?.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} legacyBehavior>
        <a {...rest}>{children}</a>
      </Link>
    )
  }

  if (isAnchortLink) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  )
}
CustomLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
}
export default CustomLink
