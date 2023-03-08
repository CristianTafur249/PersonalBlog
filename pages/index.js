import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <main className='' > 
      <Navbar/>
      <div className='flex justify-center'>
      <Footer/>
      </div> 
      </main>
    </>
  )
}
