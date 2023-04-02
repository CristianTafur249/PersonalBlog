import { ClientReload } from '@/components/ClientReload'
import Navbar from '@/components/Navbar'
import siteMetadata from '@/data/siteMetatdata'
import '@/styles/globals.css'
import '@/styles/blogs.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import React from 'react'
import { GAScrip, initGTM, logPageTime, logPageView } from '@/components/analitics/Google'
import Script from 'next/script'
import Cookies from '@/components/Cookies'
import Scrolbr from '@/components/Scrolbr'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

const handleSetCookie = async () => {

  const cookieValue = Cookies.get('SL_G_WPT_TO');
  Cookies.set('SL_G_WPT_TO', cookieValue, { SameSite: 'None', Secure: true });
};


class App extends React.Component {

  componentDidMount() {
    handleSetCookie
    initGTM()
    logPageView()
    const timeOnPage = new Date().getTime() - performance.timing.navigationStart;
    /* logPageTime('Page', 'Time', timeOnPage); */
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
        <Head>
          <meta name="google-site-verification" content="f_QfdxqHEcMWPI9hLORb4DBUe8V3CqlbkcUblXOMu6Y" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Navbar>
          <Scrolbr />
          <Component {...pageProps} />
          <Cookies />
        </Navbar>
      </ThemeProvider>
    )
  }
}
export default App;