import { Children, Fragment } from 'react'
import Header from './Header'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { current } from 'tailwindcss/colors'
import Footer from './Footer'
import ThemeSwitch from './ThemeSwitch'
import siteMetadata from '@/data/siteMetatdata'
import Link from './Link'
import Image from './Image'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Blogs', href: '/blog' },
  { name: 'Etiquetas', href: '/tags' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'About', href: '/sobre-mi' },
]

function className(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
  return (
    <div>
      <header>
        <div className="fixed w-full top-0 z-10">
          <Disclosure as="nav" className="bg-gray-800 ">
            {({ open }) => (
              <>
                <div className="text-black dark:text-white  mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Boton de menú de celular */}
                      <Disclosure.Button className="text-blue-400 inline-flex items-center justify-center p-2 rounded-md dark:text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Abrir menú de inicio</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex flex-shrink-0 items-center">
                        <Link href="/">
                          <Image
                            className="block h-8 w-auto lg:hidden"
                            src={siteMetadata.siteLogo}
                            width={30}
                            height={30}
                            alt="techcode"
                          />
                        </Link>
                        <Link href="/">
                          <Image
                            className="hidden h-7 w-auto lg:block"
                            src={siteMetadata.siteLogo}
                            width={30}
                            height={30}
                            alt="techcode"
                          />
                        </Link>
                      </div>
                      <div className="hidden sm:block h-auto sm:ml-6 ">
                        <div className="flex h-full space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="transition ease-in-out duration-1000
                                hover:border-b-2 hover:border-green-500
                              hover:text-green-400 border-b-2
                                border-transparent text-primary-50
                              hover:bg-gray-900 rounded-md px-3 h-full
                                py-2 text-sm md:text-xl xl:text-xl 2xl:text-3xl 
                                font-sans"
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3 h-auto dark:text-white">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="transition ease-in-out duration-700
                          hover:border-b-2 hover:border-gray-500 
                          border-b-2 border-gray-500  
                        text-white h-full hover:bg-gray-100 hover:text-gray-900 
                          block rounded-md px-3 py-2 text-base font-medium"
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </header>
      
      <main className="mt-14 mb-36 mx-auto w-full my-auto">{children}</main>
      <div className=" bottom-0   left-0 right-0">
        <Footer />
      </div>
    </div>
  )
}
