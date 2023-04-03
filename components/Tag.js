const { default: Link } = require('next/link')
import formatWord from '@/lib/utils/formatWord'

const Tag = ({ text, clas }) => {
  return (
    <Link href={`/tags/${formatWord(text)}`} legacyBehavior>
      <a className={clas}>{text.split(' ').join('-')}</a>
    </Link>
  )
}
export default Tag
