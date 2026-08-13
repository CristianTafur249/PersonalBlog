import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Footer from './Footer'
import ThemeSwitch from './ThemeSwitch'
import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import Image from './Image'
import PropTypes from 'prop-types'

const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Etiquetas', href: '/etiquetas' },
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Sobre mí', href: '/sobre-mi' },
]

const linkClass = (current) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        current ? 'bg-sunken text-ink' : 'text-muted hover:bg-sunken hover:text-ink'
    }`

/**
 * Componente de barra de navegación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Contenido del componente.
 * @returns {ReactNode} El componente de barra de navegación.
 */
export default function Navbar({ children }) {
    const { pathname } = useRouter()
    const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

    return (
        <div className="flex min-h-screen flex-col">
            <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
                <Disclosure
                    as="nav"
                    aria-label="Principal"
                    className="mx-auto max-w-6xl rounded-3xl border border-line bg-surface/80 backdrop-blur-md"
                >
                    {({ open }) => (
                        <>
                            <div className="flex h-14 items-center gap-1 pl-4 pr-2">
                                <Link
                                    href="/"
                                    className="mr-auto flex items-center gap-2 rounded-full text-lg font-bold tracking-tight text-ink"
                                >
                                    <Image
                                        className="h-7 w-7 rounded-lg"
                                        src={siteMetadata.siteLogo}
                                        width={28}
                                        height={28}
                                        alt=""
                                    />
                                    TechCode
                                </Link>
                                <div className="hidden items-center gap-1 md:flex">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={linkClass(isCurrent(item.href))}
                                            aria-current={isCurrent(item.href) ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <ThemeSwitch />
                                {/* Botón de menú de celular */}
                                <Disclosure.Button className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-sunken hover:text-ink md:hidden">
                                    <span className="sr-only">
                                        {open ? 'Cerrar menú' : 'Abrir menú'}
                                    </span>
                                    {open ? (
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <Disclosure.Panel className="border-t border-line p-2 md:hidden">
                                <div className="flex flex-col gap-1">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as={NextLink}
                                            href={item.href}
                                            className={`${linkClass(
                                                isCurrent(item.href)
                                            )} text-base`}
                                            aria-current={isCurrent(item.href) ? 'page' : undefined}
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

            <main className="flex-1 pb-16 pt-24 md:pb-24 md:pt-28">{children}</main>
            <Footer />
        </div>
    )
}
Navbar.propTypes = {
    children: PropTypes.node.isRequired,
}
