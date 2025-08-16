'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Image, Pagination } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { MainColumn } from '@/components/layout/MainColumn'
import { useSearchParams } from 'next/navigation'
import { PostListLoading } from '@/components/index/PostList.loading'
import { Detail } from '@/type/article'
import { fetchArticles } from '@/utils/api'

export default function PostListPage() {
    const searchParams = useSearchParams()
    const [totalPages, setTotalPages] = useState(1)
    const [articles, setPosts] = useState<Detail[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [visible, toggle] = useState(true)
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // 获取URL中的查询参数
    const category_id = searchParams.get('category_id')

    const fetchArticlesAPI = useCallback(async () => {
        setIsLoading(true)
        console.log('Fetching articles...')
        try {
            const data = await fetchArticles(currentPage, category_id)
            if (data.status !== 200) {
                console.log('error')
            }
            setIsLoading(false)
            setPosts(data.detail.items)
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
            await fetchArticlesAPI()
            if (isMounted) toggle(false)
        }

        fetchData().then((r) => {})

        return () => {
            isMounted = false
        }
    }, [fetchArticlesAPI, currentPage, category_id])
    return (
        <>
            <MainColumn>
                <div
                    ref={targetRef}
                    className="px-[22px] pt-[18px] border-b-[2px] border-gray-200 overflow-hidden bg-white box-border relative mb-3"
                >
                    <h1 className="m-0 flex">
            <span className="inline-block text-gray-900 text-xl font-bold tracking-wide">
              <i className="fa-duotone fa-list mr-1" />
              文章列表
            </span>
                    </h1>
                </div>
                <div>
                    {isLoading ? (
                        <PostListLoading />
                    ) : (
                        articles.map((article) => (
                            <Link href={`/post/${article.id}`} key={article.id} passHref>
                                <div className="pt-6 pb-4 px-6 relative rounded-md flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-105 ease-in-out">
                                    <h2
                                        className="overflow-hidden h-16 mr-5 text-md font-medium line-clamp-3"
                                        style={{
                                            width: 'calc(100%-162px)',
                                        }}
                                    >
                                        {article.title}
                                    </h2>
                                    <div className="justify-self-end ml-auto w-30 h-18 md:w-36 md:h-22 rounded-md overflow-hidden relative">
                                        <Image src={article.cover} alt="post cover" />
                                    </div>
                                    <div className="absolute bottom-2.5">
                                        <Link
                                            className="mr-2"
                                            href={{
                                                pathname: '/list/post',
                                                query: { category_id: article.categories[0].id },
                                            }}
                                        >
                      <span className="text-xs md:text-sm tracking-wide text-gray-500">
                        <i className="fa-duotone fa-list-ul mr-1"></i>
                          {article.categories[0].name}
                      </span>
                                        </Link>
                                        <span className="text-xs md:text-sm tracking-wide text-gray-500">
                      <i className="fa-duotone fa-calendar-week mr-1"></i>
                                            {article.date}
                    </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                <Pagination
                    className="flex justify-center mt-10"
                    total={totalPages}
                    value={currentPage}
                    onChange={handlePageChange}
                    color="indigo"
                    radius="md"
                    withEdges
                />
            </MainColumn>
            <Sidebar />
        </>
    )
}
