'use client';

import { useState } from 'react';
import Image from 'next/image';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navPages = [
    { name: '文章列表', path: '/list/post' },
    { name: '文章分类', path: '/category/post' },
    { name: '漫画列表', path: '/list/comic' },
    { name: '漫画分类', path: '/category/comic' },
    { name: '特典', path: '/list/post?c=6' },
  ];

  return (
    <>
      <div className="flex flex-col transition-all ease-in-out">
        <nav
          className={`sticky top-0 z-[100] w-full backdrop-blur-md flex-none transition-colors duration-500 lg:z-50 lg:border-b bg-[#3752abb3] shadow-lg md:rounded-none z-50 ${
            isMobileMenuOpen ? '' : 'rounded-b-lg'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a className="flex-shrink-0" href="/">
                  <Image src="/logo.svg" alt="Logo" width={32} height={32} loading="lazy" />
                </a>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navPages.map((navPage) => (
                      <a
                        key={navPage.name}
                        href={navPage.path}
                        className="text-white hover:text-sky-500 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {navPage.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  type="button"
                  className="bg-[#3752aba1] inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-[#3752abe8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#3752ab] focus:ring-white"
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">打开菜单</span>
                  <svg
                    className={isMobileMenuOpen ? 'hidden' : 'block h-6 w-6'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <svg
                    className={isMobileMenuOpen ? 'block h-6 w-6' : 'hidden'}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={isMobileMenuOpen ? 'block' : 'hidden'} id="mobile-menu">
            <div className="fixed px-2 pt-2 pb-3 w-full space-y-1 sm:px-3 bg-[#3752abb3] rounded-b-lg">
              {navPages.map((navPage) => (
                <a
                  key={navPage.name}
                  href={navPage.path}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {navPage.name}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
