import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOInline from './TOCInline'
import Pre from './Pre'
import PropTypes from 'prop-types'
export const MDXComponents = {
  Image,
  TOInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}
MDXComponents.propTypes = {
  components: PropTypes.object,
  layout: PropTypes.string.isRequired,
}
export const MDXLayoutRender = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
MDXLayoutRender.propTypes = {
  href: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  mdxSource: PropTypes.string.isRequired,
}
