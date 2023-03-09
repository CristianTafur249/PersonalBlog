import siteMetadata from '@/data/siteMetatdata'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={siteMetadata.language}>
      <Head>
        
      </Head> 
      <body className='bg-white text-black dark:bg-black'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
