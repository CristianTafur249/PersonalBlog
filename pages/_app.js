import { ClientReload } from '@/components/ClientReload'
import Navbar from '@/components/Navbar'
import siteMetadata from '@/data/siteMetadata'
import '@/styles/blogs.css'
import '@/styles/prism.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import React from 'react'
import Analytics from '@/components/analytics/Analytics'
import Cookies from '@/components/Cookies'
import Scrollbar from '@/components/Scrollbar'
import PropTypes from 'prop-types'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

class App extends React.Component {
    render() {
        const { Component, pageProps, router } = this.props
        // Check if we are on the hidden Valentine's page
        const isHiddenPage = router.pathname === '/para-ti'

        return (
            <ThemeProvider
                attribute="class"
                defaultTheme={siteMetadata.theme}
                disableTransitionOnChange
            >
                <Head>
                    <meta
                        name="google-site-verification"
                        content="f_QfdxqHEcMWPI9hLORb4DBUe8V3CqlbkcUblXOMu6Y"
                    />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                </Head>
                {isDevelopment && isSocket && <ClientReload />}
                <Analytics />
                {isHiddenPage ? (
                    <>
                        <Scrollbar />
                        <Component {...pageProps} />
                        <Cookies />
                    </>
                ) : (
                    <Navbar>
                        <Scrollbar />
                        <Component {...pageProps} />
                        <Cookies />
                    </Navbar>
                )}
            </ThemeProvider>
        )
    }
}
App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}
export default App
