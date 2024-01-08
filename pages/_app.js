import { ClientReload } from '@/components/ClientReload'
import Navbar from '@/components/Navbar'
import siteMetadata from '@/data/siteMetadata'
import '@/styles/blogs.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import React from 'react'
import { initGTM, logPageView } from '@/components/analytics/Google'
import Cookies from '@/components/Cookies'
import Scrollbar from '@/components/Scrollbar'
import PropTypes from 'prop-types'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

class App extends React.Component {
  componentDidMount() {
    initGTM()
    logPageView() /* 
    const timeOnPage = new Date().getTime() - performance.timing.navigationStart */
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta
            name="google-site-verification"
            content="f_QfdxqHEcMWPI9hLORb4DBUe8V3CqlbkcUblXOMu6Y"
          />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <Navbar>
          <Scrollbar />
          <Component {...pageProps} />
          <Cookies />
        </Navbar>
      </ThemeProvider>
    )
  }
}
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
export default App
