'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {Box, Image, LoadingOverlay, Pagination} from '@mantine/core';
import {useScrollIntoView} from '@mantine/hooks';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import {MainColumn} from '@/components/layout/MainColumn';

interface Comic {
    id: number;
    name: string;
    date: string;
    cover: string;
    auto: number;
}

export default function ComicListPage() {
    const [totalPages, setTotalPages] = useState(1);
    const [comics, setComics] = useState<Comic[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, toggle] = useState(true);
    const searchParams = useSearchParams();
    const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();
    const category_id = searchParams.get('category_id');

    const fetchComics = async () => {
        let url = `/comic/list?limit=12&page=${currentPage}`;
        if (category_id != null) {
            url += `&category_id=${category_id}`;
        }

        try {
            const response = await fetch(`https://api.fwgxt.top/api/${url}`);
            const data = await response.json();
            if (data.status === 'error') {
                console.log('error');
            }
            setComics(data.message.comics);
            toggle(false);
            setTotalPages(data.message.total_pages);
        } catch (error) {
        }
    };

    useEffect(() => {
        toggle(true);
        fetchComics();
        scrollIntoView();
    }, [currentPage]);
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
              <span className="inline-block text-[#242a36] text-base font-bold tracking-wide">
                <i className="fa-duotone fa-books"/>
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
                        {comicsWithFallback.map((index, i) => (
                            <div
                                key={i}
                                className="comic max-w-none mt-0 mx-[5px] mb-[18px] rounded-md list-none transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
                                style={{width: 'calc(100% / 4 - 10px)'}}
                            >
                                <Link href={`/comic/${index.id}`}>
                                    <figure className="rounded-md m-0 overflow-hidden relative">
                    <span className="relative block h-0 w-full pt-[150%] overflow-hidden ">
                      <Image
                          alt="manga cover"
                          className="object-cover !rounded-md h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
                          height={134}
                          src={index.cover || '/img/now_printing.webp'}
                          width={96}
                          fallbackSrc="/img/now_printing.webp"
                      />
                    </span>
                                    </figure>
                                </Link>
                                <p className="text-center whitespace-nowrap text-ellipsis text-[15px] h-[25px] font-normal overflow-hidden">
                                    <span className="text-[#ef4444]">*</span>
                                    {index.name || '占位文本'}
                                </p>
                                <p className="mt-[8px] text-center whitespace-nowrap text-[#808080] text-[10px] font-normal">
                                    {index.date || '占位文本'}发布
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
                    mt="sm"
                />
            </MainColumn>
            <Sidebar/>
        </>
    );
}
