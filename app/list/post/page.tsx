'use client';

import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {Image, Pagination} from '@mantine/core';
import {useScrollIntoView} from '@mantine/hooks';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import {MainColumn} from '@/components/layout/MainColumn';
import {useSearchParams} from "next/navigation";
import {fetchPosts} from "@/utils/api";

interface Post {
    category_id: number;
    category_name: string;
    id: number;
    title: string;
    date: string;
    cover: string;
}

export default function PostListPage() {
    const searchParams = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, toggle] = useState(true);
    const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();

    // 获取URL中的查询参数
    const category_id = searchParams.get('category_id');
    const pageParam = searchParams.get('p');

    useEffect(() => {
        if (pageParam) {
            const initialPage = Number(pageParam);
            if (initialPage !== currentPage) {
                setCurrentPage(initialPage);
            }
        }
    }, []);

    const loadFetch = useCallback(async () => {
        toggle(true);
        const { items, total_pages, error } = await fetchPosts(currentPage, category_id);
        if (error) {
            setCurrentPage(1);
            return;
        }

        setPosts(items);
        toggle(false);
        setTotalPages(total_pages);
    }, [currentPage, category_id]);

    useEffect(() => {
        const fetchLoad = async () => {
            try {
                toggle(true);
                await loadFetch();
                scrollIntoView();

                const queryParams = new URLSearchParams(window.location.search);
                queryParams.set('p', String(currentPage));
                const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
                window.history.replaceState(null, '', newUrl);
            } catch (error) {
                console.error('加载文章失败:', error);
            }
        }
        const loadPosts = async () => {
            if (pageParam) {
                const initialPage = Number(pageParam);
                if (initialPage !== currentPage) {
                    await fetchLoad()
                }
                if (Number(pageParam) === 1) {
                    const queryParams = new URLSearchParams(window.location.search);
                    queryParams.delete('p');
                    await fetchLoad()
                }
            } else {
                await fetchLoad()
            }
        };


        loadPosts();
    }, [currentPage, fetchPosts, scrollIntoView]);

    return (
        <>
            <MainColumn>
                <div
                    className="px-[22px] pt-[18px] border-b-[2px] border-gray-200 overflow-hidden bg-white box-border relative mb-3">
                    <h1 className="m-0 flex">
                            <span className="inline-block text-gray-900 text-xl font-bold tracking-wide">
                                <i className="fa-solid fa-list mr-1"/>
                                文章列表
                             </span>
                    </h1>
                </div>
                <div>
                    {articles.map((article) => (
                        <Link href={`/post/${article.id}`} key={article.id} passHref>
                            <div
                                className="pt-6 pb-4 px-6 relative rounded-md flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-105 ease-in-out">
                                <p className="overflow-hidden h-16 mr-5 text-sm font-medium line-clamp-3" style={{
                                    width: 'calc(100%-162px)'
                                }}>
                                    {article.title}
                                </p>
                                <div
                                    className="justify-self-end ml-auto w-30 h-18 md:w-36 md:h-22 rounded-md overflow-hidden relative">
                                    <Image
                                        src={article.cover}
                                        alt="post cover"
                                    />
                                </div>
                                <div className="absolute bottom-2.5">
                                    <Link className="mr-2"
                                          href={{pathname: '/list/post', query: {c: article.category_id}}}>
                                        <span className="text-xs md:text-sm tracking-wide text-gray-500">
                                            <i className="fa-solid fa-list-ul mr-1"></i>
                                            {article.category_name}
                                        </span>
                                    </Link>
                                    <span className="text-xs md:text-sm tracking-wide text-gray-500">
                                        <i className="fa-solid fa-calendar-week mr-1"></i>
                                        {article.date}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Pagination
                    className="flex justify-center mt-10"
                    total={totalPages}
                    value={currentPage}
                    onChange={setCurrentPage}
                    color="indigo"
                    radius="md"
                    withEdges
                />
            </MainColumn>
            <Sidebar/>
        </>
    )
        ;
}
