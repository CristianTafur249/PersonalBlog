import siteMetadata from '@/data/siteMetatdata'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={siteMetadata.language} className="bg-white dark:bg-black">
      <Head>
        </Head> 
      <body className='bg-white dark:bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
