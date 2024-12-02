'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './Navbar.css'
import { useDisclosure } from '@mantine/hooks'
import { Burger, Center, Menu } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'

const links = [
  {
    link: '#post',
    label: '文章',
    links: [
      {
        link: '/list/post',
        label: '文章列表',
      },
      {
        link: '/category/post',
        label: '文章分类',
      },
    ],
  },
  {
    link: '#comic',
    label: '漫画',
    links: [
      {
        link: '/list/comic',
        label: '漫画列表',
      },
      {
        link: '/category/comic',
        label: '漫画分类',
      },
    ],
  },
  {
    link: '#magazine',
    label: '杂志',
    links: [
      {
        link: '/list/magazine',
        label: '杂志列表',
      },
      {
        link: '/category/magazine',
        label: '杂志分类',
      },
    ],
  },
  {
    link: '#magazine',
    label: '特典',
  },
]
const navPages = [
  {
    name: '文章列表',
    path: '/list/post',
  },
  {
    name: '文章分类',
    path: '/category/post',
  },
  {
    name: '漫画列表',
    path: '/list/comic',
  },
  {
    name: '漫画分类',
    path: '/category/comic',
  },
  {
    name: '杂志列表',
    path: '/list/magazine',
  },
  {
    name: '杂志分类',
    path: '/category/magazine',
  },
  {
    name: '特典',
    path: '/list/post?c=6',
  },
]

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (currentScrollPos > prevScrollPos && isVisible) {
        setIsVisible(false)
      } else if (currentScrollPos < prevScrollPos && !isVisible) {
        setIsVisible(true)
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, prevScrollPos])

  const [opened, { toggle }] = useDisclosure(false)

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link href={item.link}> {item.label}</Link>
      </Menu.Item>
    ))

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{
            duration: 150,
            transition: 'fade',
          }}
          withinPortal
        >
          <Menu.Target>
            <Link
              href={link.link}
              className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-md font-semibold "
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-md font-semibold"
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    )
  })
  return (
    <>
      <div className="flex flex-col transition-all ease-in-out">
        <nav
          className={`navbar sticky top-0 z-[100] w-full backdrop-blur-md grow shrink-0 transition-colors duration-500 lg:border-b bg-[#3752abb3] shadow-lg md:rounded-none ${
            opened ? '' : 'rounded-b-lg'
          } ${isVisible ? 'visible' : 'hidden'} `}
        >
          <div className="grow  w-full max-w-md:mx-auto md:mx-24 px-4 sm:px-6 lg:px-8">
            <div className="flex  items-center justify-between h-16">
              <div className="flex items-center">
                <Link className="flex-shrink-0" href="/">
                  <Image
                    src="/images/logo/logo.svg"
                    alt="Logo"
                    width={165}
                    height={32}
                  />
                </Link>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {items}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Burger
                  className="!bg-[#3752aba1] rounded-md !text-white hover:text-gray-200 hover:bg-[#3752abe8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#3752ab] focus:ring-white"
                  opened={opened}
                  onClick={toggle}
                  size="md"
                  hiddenFrom="md"
                />
              </div>
            </div>
          </div>
          <div
            className={opened ? 'block absolute top-[64px]' : 'hidden'}
            id="mobile-menu"
          >
            <div className="fixed px-2 pt-2 pb-3 w-full space-y-1 sm:px-3 bg-[#3752abb3] rounded-b-lg">
              {navPages.map((navPage) => (
                <Link
                  key={navPage.name}
                  href={navPage.path}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {navPage.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
