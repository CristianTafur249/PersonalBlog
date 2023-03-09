import siteMetadata from '@/data/siteMetatdata'
import '@/styles/globals.css'
import '@/styles/tailwind.css'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  
  )
}
