import { ClientReload } from '@/components/ClientReload'
import Navbar from '@/components/Navbar'
import siteMetadata from '@/data/siteMetatdata'
import '@/styles/globals.css'
import '@/styles/blogs.css'
import '@/styles/author.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import AdSense from '@/components/analitics/AdSense'
import React from 'react'
import { GAScrip, logPageView } from '@/components/analitics/Google'
import Script from 'next/script'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

class App extends React.Component {

  componentDidMount() {
    GAScrip()
    logPageView()
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
        <Head>
          <meta name="google-site-verification" content="f_QfdxqHEcMWPI9hLORb4DBUe8V3CqlbkcUblXOMu6Y" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5012441343452330"
            crossorigin="anonymous"></Script>
        </Head>
        <AdSense/>
        {isDevelopment && isSocket && <ClientReload />}
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </ThemeProvider>
    )
  }
}
export default App;