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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,900;1,100;1,400;1,900&display=swap" rel="stylesheet"></link>
        </Head>
        <body className='bg-gray-100 text-black antialiased dark:bg-gray-900 dark:text-white'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument