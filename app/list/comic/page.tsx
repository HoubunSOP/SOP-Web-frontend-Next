'use client';

import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import {Box, Image, LoadingOverlay, Pagination} from '@mantine/core';
import {useScrollIntoView} from '@mantine/hooks';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import {MainColumn} from '@/components/layout/MainColumn';
import {useSearchParams} from "next/navigation";
import {fetchComics} from "@/utils/api";

interface Comic {
    id: number;
    name: string;
    date: string;
    cover: string;
    auto: number;
}

export default function ComicListPage() {
    const searchParams = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [comics, setComics] = useState<Comic[]>([]);
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
        const {items, total_pages, error} = await fetchComics(currentPage, category_id);
        if (error) {
            setCurrentPage(1);
            return;
        }

        setComics(items);
        toggle(false);
        setTotalPages(total_pages);
    }, [currentPage, category_id]);

    useEffect(() => {
        const fetchLoad = async () => {
            scrollIntoView();
            try {
                toggle(true);

                await loadFetch();

                if (currentPage !== 1) {
                    const queryParams = new URLSearchParams(window.location.search);
                    queryParams.set('p', String(currentPage));
                    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
                    window.history.replaceState(null, '', newUrl);
                }
            } catch (error) {
                console.error('加载漫画失败:', error);
            }
        }
        const loadComics = async () => {
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


        loadComics();
    }, [currentPage, fetchComics, scrollIntoView]);

    // 创建一个包含 12 个空对象的数组
    const emptyComics = Array.from({length: 12}, () => ({
        id: 0,
        name: '正在获取中',
        date: '请稍后',
        cover: 'https://houbunsha.co.jp/img/mv_img/con_item_nPrn_1.png',
        auto: 1,
    }));

    // 如果 comics 数组为空，使用 emptyComics 替代
    const comicsWithFallback = comics.length > 0 ? comics : emptyComics;

    return (
        <>
            <MainColumn>
                <div
                    className="px-[22px] pt-[18px] border-b-[2px] border-gray-200 overflow-hidden bg-white box-border"
                    ref={targetRef}
                >
                    <div className="relative mb-0">
                        <h1 className="m-0 flex">
              <span className="inline-block text-gray-900 text-xl font-bold tracking-wide">
                <i className="fa-solid fa-book mr-1"/>
                漫画列表
              </span>
                        </h1>
                    </div>
                </div>

                <Box pos="relative">
                    <LoadingOverlay
                        visible={visible}
                        zIndex={1000}
                        overlayProps={{
                            radius: 'sm',
                            blur: 2,
                        }}
                    />
                    <div className="flex flex-wrap margin-[-5px] mt-[10px]">
                        {comicsWithFallback.map((comic, i) => (
                            <div
                                key={i}
                                className="comic max-w-none mt-0 mx-[5px] mb-[18px] rounded-md list-none transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
                                style={{width: 'calc(100% / 4 - 10px)'}}
                            >
                                <Link href={`/comic/${comic.id}`}>
                                    <figure className="rounded-md m-0 overflow-hidden relative">
                    <span className="relative block h-0 w-full pt-[150%] overflow-hidden ">
                      <Image
                          alt="manga cover"
                          className="object-cover !rounded-md h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
                          height={134}
                          src={comic.cover || '/img/now_printing.webp'}
                          width={96}
                          fallbackSrc="/img/now_printing.webp"
                      />
                    </span>
                                    </figure>
                                </Link>
                                <p className="text-center whitespace-nowrap text-ellipsis text-[15px] h-[25px] font-normal overflow-hidden">
                                    <span className="text-[#ef4444]">*</span>
                                    {comic.name || '占位文本'}
                                </p>
                                <p className="mt-[8px] text-center whitespace-nowrap text-[#808080] text-[10px] font-normal">
                                    {comic.date || '占位文本'}发布
                                </p>
                            </div>
                        ))}
                    </div>
                </Box>
                <Pagination
                    className="flex justify-center"
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
    );
}
