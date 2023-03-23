import { ClientReload } from '@/components/ClientReload'
import Navbar from '@/components/Navbar'
import siteMetadata from '@/data/siteMetatdata'
import '@/styles/globals.css'
import '@/styles/blogs.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import AdSense from '@/components/analitics/AdSense'
import React from 'react'
import { GAScrip, logPageTime, logPageView } from '@/components/analitics/Google'
import Script from 'next/script'
import Cookies from '@/components/Cookies'
import Cookie from 'js-cookie';
import { Analitics } from '@/components/analitics/Analitiscs'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

const handleSetCookie = async () => {
  let dic={
    _ga_98D755MZH9:"GS1.1.1679448866.4.1.1679448963.0.0.0",
    _gat:"1",
    _ga:"GA1.1.740928458.1679201760",
    _gid:"GA1.3.76255144.1679448865",
  }
  for (let clave in dic) {
    console.log(clave + ": " + dic[clave]);
    Cookies.set(clave , diccionario[clave], { SameSite: 'None', Secure: true });
  }
  const cookieValue = Cookies.get('SL_G_WPT_TO');
  Cookies.set('SL_G_WPT_TO', cookieValue, { SameSite: 'None', Secure: true });
};


class App extends React.Component {

  componentDidMount() {
    handleSetCookie
    GAScrip()
    logPageView()
    const timeOnPage = new Date().getTime() - performance.timing.navigationStart;
    logPageTime('Page', 'Time', timeOnPage);
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
        <Head>
          <meta name="google-site-verification" content="f_QfdxqHEcMWPI9hLORb4DBUe8V3CqlbkcUblXOMu6Y" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        
        <Script
          async
          src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></Script>
        {isDevelopment && isSocket && <ClientReload />}
        <Navbar>
          <Component {...pageProps} />
          <Cookies />
        </Navbar>
      </ThemeProvider>
    )
  }
}
export default App;