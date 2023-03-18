import siteMetadata from '@/data/siteMetatdata'
import Document, { Html, Head, Main, NextScript } from 'next/document'

//export default function Document
class MyDocument extends Document {
  render() {
    return (
      <Html className='scroll-smooth' lang='es'>
        <Head>
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className='bg-gray-200 text-black dark:text-white dark:bg-black'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument