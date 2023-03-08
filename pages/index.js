import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className='' > 
      <Header/>
      <div className='flex justify-center'>
      <Footer/>
      </div> 
      </main>
    </>
  )
}
