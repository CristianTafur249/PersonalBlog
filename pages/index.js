import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import {PageSEO} from '@/components/SEO'
import siteMetadata from '@/data/siteMetatdata'
import ThemeSwitch from '@/components/ThemeSwitch'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Navbar/>
      <div className='flex justify-center'>
      <Footer/>
      </div> 
    </>
  )
}
