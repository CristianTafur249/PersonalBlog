import { Fragment } from "react";
import Header from "./Header";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    {name: 'Inicio', href: '/'},
    {name: 'Blogs', href: './blog'},
    {name: 'Sobre mi', href: './sobre-mi'},
];

function className (...classes){
    return classes.filter(Boolean).join(' ');
}

export default function Navbar(){
    return(
        <>
        <Disclosure as="nav">
            {({open}) => (
                <>
                <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Boton de menú de celular */}
                            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open main menu</span>
                                {open? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Disclosure.Button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img 
                                    className="hidden h-8 w-auto lg:hidden"
                                    src="/images/techcode.png"
                                    alt="techcode"
                                />
                                <img
                                    className="hidden h-8 w-auto lg:block"
                                    src="/images/techcode.png"
                                    alt="techcode"
                                />

                            </div>

                        </div>
                    </div>

                </div>            
            </>

            )}
        </Disclosure>
        <Header/>
        </>
    );
}