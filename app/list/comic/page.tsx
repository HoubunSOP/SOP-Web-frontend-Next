'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Box, LoadingOverlay, Pagination } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { MainColumn } from '@/components/layout/MainColumn'
import { fetchComics } from '@/utils/api'
import Head from 'next/head'
interface Comic {
    id: number
    name: string
    date: string
    cover: string
    auto: number
}

export default function ComicListPage() {
    const [totalPages, setTotalPages] = useState(1)
    const [comics, setComics] = useState<Comic[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [visible, toggle] = useState(true)
    const searchParams = useSearchParams()
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>()
    const category_id = searchParams.get('category_id')

    const fetchComicsAPI = useCallback(async () => {
        console.log('Fetching comics...')
        try {
            const data = await fetchComics(currentPage, category_id)
            setComics(data.detail.items)
            console.log(comics)
            setTotalPages(data.detail.total_pages)
            scrollIntoView()
        } catch (error) {
            console.error(error)
        } finally {
            toggle(false)
            scrollIntoView()
        }
    }, [currentPage, category_id])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const isInitialRender = useRef(true)

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false
            return
        }

        let isMounted = true

        const fetchData = async () => {
            toggle(true)
            await fetchComicsAPI()
            if (isMounted) toggle(false)
        }

        fetchData().then((r) => {})

        return () => {
            isMounted = false
        }
    }, [fetchComicsAPI, currentPage, category_id])

    const emptyComics = Array.from({ length: 12 }, () => ({
        id: 0,
        name: 'Now loading...',
        date: 'Getting Date...',
        cover: '/images/now_printing.webp',
        auto: 0,
    }))

    const comicsWithFallback = comics.length > 0 ? comics : emptyComics

    return (
        <>
            <Head>
                <title>漫画列表 | 芳文观星台</title>
            </Head>
            <MainColumn>
                <div
                    className="px-[22px] pt-[18px] border-b-[2px] border-gray-200 overflow-hidden bg-white box-border"
                    ref={targetRef}
                >
                    <div className="relative mb-0">
                        <h1 className="m-0 flex">
              <span className="inline-block text-[#242a36] text-base font-bold tracking-wide">
                <i className="fa-duotone fa-books" />
                漫画列表
              </span>
                        </h1>
                    </div>
                </div>
                <Box pos="relative">
                    <LoadingOverlay
                        visible={visible}
                        transitionProps={{ transition: 'fade', duration: 10 }}
                        zIndex={1000}
                        overlayProps={{
                            radius: 'sm',
                            blur: 2,
                        }}
                    />
                    <div className="flex flex-wrap margin-[-5px] mt-[10px]">
                        {comicsWithFallback.map((comic, i) => (
                            <div
                                key={comic.id || i}
                                className="comic max-w-none mt-0 mx-[5px] mb-[18px] rounded-md list-none transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
                                style={{ width: 'calc(100% / 4 - 10px)' }}
                            >
                                <Link href={`/comic/${comic.id}`}>
                                    <figure className="rounded-md m-0 overflow-hidden relative">
                    <span className="relative block h-0 w-full pt-[150%] overflow-hidden">
                      <Image
                          alt="manga cover"
                          className="object-cover !rounded-md h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
                          height={134}
                          src={comic.cover || '/images/now_printing.webp'}
                          width={96}
                          loading={'lazy'}
                          placeholder={'blur'}
                          blurDataURL={'/images/now_printing.webp'}
                      />
                    </span>
                                    </figure>
                                </Link>
                                <p className="text-center whitespace-nowrap text-ellipsis text-[15px] h-[25px] font-normal overflow-hidden">
                                    {comic.auto === 1 ? (
                                        <span className="text-[#ef4444]">*</span>
                                    ) : null}
                                    {comic.name || 'Now Loading...'}
                                </p>
                                <p className="mt-[8px] text-center whitespace-nowrap text-[#808080] text-[10px] font-normal">
                                    {comic.date + '发布' || 'Now Loading...'}
                                </p>
                            </div>
                        ))}
                    </div>
                </Box>
                <Pagination
                    className="flex justify-center"
                    total={totalPages}
                    value={currentPage}
                    onChange={handlePageChange}
                    mt="sm"
                />
            </MainColumn>
            <Sidebar />
        </>
    )
}
