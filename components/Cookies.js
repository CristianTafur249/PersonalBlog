import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Cookies() {
  const [showCookies, setShowCookies] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('cookies-aceptadas')) {
      setShowCookies(true)
    } else {
      dataLayer.push({ event: 'cookies-aceptadas' })
    }
  }, [])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookies-aceptadas', true)
    setShowCookies(false)
    dataLayer.push({ event: 'cookies-aceptadas' })
  }

  return (
    <>
      {showCookies && (
        <div className="avisoCookies block shadow-xl shadow-gray-700 dark:shadow-gray-600 dark:bg-gray-300">
          <Image
            alt="galleta"
            height={100}
            width={100}
            className="max-w-px absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2/3"
            src="/static/images/cookie.svg"
          />
          <h2 className="titulo mb-4 text-lg text-gray-800">Cookies</h2>
          <p className="parrafo mb-4 text-gray-800">
            Utilizamos cookies propias y de terceros para mejorar nuestros servicios.
          </p>
          <button
            className=" w-full bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
            onClick={handleAcceptCookies}
          >
            De acuerdo
          </button>
          <Link
            className="underline hover:text-purple-600 dark:hover:text-purple-900 text-cyan-800"
            href="/cookies"
          >
            Aviso de Cookies
          </Link>
        </div>
      )}
      {showCookies && router.pathname !== '/cookies' && <div className="fondo"></div>}
    </>
  )
}
