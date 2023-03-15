import { Children, Fragment } from "react";
import Header from "./Header";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { current } from "tailwindcss/colors";
import Footer from "./Footer";
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from "@/data/siteMetatdata";

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Blogs', href: './blog' },
  {name: 'Etiquetas', href: './tags'},
  { name: 'Sobre mi', href: './sobre-mi' },
  
];

function className(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ children }) {
  return (
    <>
      <header className="mix-blend-difference">
        <Disclosure as="nav" className='bg-gray-800 '>
          {({ open }) => (
            <>
              <div className="text-black dark:text-white mix-blend-difference mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                      <a href="/" >
                        <img
                          className="sm:block h-8 w-auto lg:hidden"
                          src={siteMetadata.siteLogo}
                          alt="techcode"
                        />
                        <img
                          className="hidden h-8 min-w-min w-auto lg:block"
                          src={siteMetadata.siteLogo}
                          alt="techcode"
                        />
                      </a>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={className(
                              item.current ? 'dark:bg-gray-900 dark:text-white' : 'dark:text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <ThemeSwitch />
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={className(
                        item.current ? 'dark:bg-gray-900 dark:text-white' : 'dark:text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
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
      </header>
      <main className="mb-auto">{children}</main>
      <div className='flex justify-center'>
        <Footer />
      </div>
    </>
  );
}