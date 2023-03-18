import { ClientReload } from '@/components/ClientReload'
import Navbar from '@/components/Navbar'
import siteMetadata from '@/data/siteMetatdata'
import '@/styles/globals.css'
import '@/styles/blogs.css'
import '@/styles/author.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Analytics from '@/components/analitics/Analytics'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Head>
        <meta name="google-site-verification" content="f_QfdxqHEcMWPI9hLORb4DBUe8V3CqlbkcUblXOMu6Y" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </ThemeProvider>

  )
}
