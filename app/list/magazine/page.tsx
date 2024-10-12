'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image'
import {useSearchParams} from 'next/navigation';
import {Box, LoadingOverlay, Pagination} from '@mantine/core';
import {useScrollIntoView} from '@mantine/hooks';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import {MainColumn} from '@/components/layout/MainColumn';
import scrollToTop from "@/components/scrollToTop";

interface Comic {
    id: number;
    name: string;
    date: string;
    cover: string;
    auto: number;
}

export default function MagazineListPage() {
    const [totalPages, setTotalPages] = useState(1);
    const [comics, setComics] = useState<Comic[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, toggle] = useState(true);
    const searchParams = useSearchParams();
    const {scrollIntoView, targetRef} = useScrollIntoView<HTMLDivElement>();
    const category_id = searchParams.get('category_id');

    const fetchComics = useCallback(async () => {
        console.log('Fetching comics...');
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
            setTotalPages(data.message.total_pages);
        } catch (error) {
            console.error(error);
        } finally {
            toggle(false);
            scrollToTop()
        }
    }, [currentPage, category_id]);

    const handlePageChange = (page: number) => {
        console.log('Page Changed:', page);
        setCurrentPage(page);
    };

    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        let isMounted = true;

        const fetchData = async () => {
            toggle(true);
            await fetchComics();
            if (isMounted) toggle(false);
        };

        fetchData().then(r => {
        });

        return () => {
            isMounted = false;
        };
    }, [fetchComics, currentPage, category_id]);

    const emptyComics = Array.from({length: 12}, () => ({
        id: 0,
        name: 'Now loading...',
        date: 'Getting Date...',
        cover: '/images/loadingAni.webp',
        auto: 0,
    }));

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
                                <i className="fa-solid fa-books"/>
                                杂志列表
                            </span>
                        </h1>
                    </div>
                </div>
                <Box pos="relative">
                    <LoadingOverlay
                        visible={visible}
                        transitionProps={{transition: 'fade', duration: 10}}
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
                                style={{width: 'calc(100% / 4 - 10px)'}}
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
                                                loading={"lazy"}
                                                placeholder={'blur'}
                                                blurDataURL={'/images/loadingAni.webp'}
                                            />
                                        </span>
                                    </figure>
                                </Link>
                                <p className="text-center whitespace-nowrap text-ellipsis text-[15px] h-[25px] font-normal overflow-hidden">
                                    <span className="text-[#ef4444]">*</span>
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
            <Sidebar/>
        </>
    );
}
