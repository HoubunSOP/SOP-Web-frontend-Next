'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Sidebar } from '@/components/index/Sidebar';
import { MainColumn } from '@/components/layout/MainColumn';

interface Comic {
  id: number;
  name: string;
  date: string;
  cover: string;
  auto: number;
}

const MainPage: React.FC = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [comics, setComics] = useState<Comic[]>([
    {
      id: 0,
      name: '',
      date: '',
      cover: '',
      auto: 0,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchComics = async () => {
    let url = `/comic/list?limit=10&page=${currentPage}`;
    if (router.query.c != null) {
      url += `&category_id=${router.query.c}`;
    }

    try {
      const response = await fetch(`https://api.fwgxt.top/api/${url}`);
      const data = await response.json();
      setComics(data.message.comics);
      if (data.status === 'error') {
        router.push('/');
      }
      setTotalPages(data.message.total_pages);
    } catch (error) {}
  };

  useEffect(() => {
    fetchComics();
  }, [currentPage]);

  const onPageChanged = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <MainColumn>
        <div className="px-[22px] pt-[18px] border-b-[2px] border-gray-200 overflow-hidden bg-white box-border">
          <div className="relative mb-0">
            <h1 className="m-0 flex">
              <span className="inline-block text-[#242a36] text-base font-bold tracking-wide">
                <i className="fa-duotone fa-books" />
                漫画列表
              </span>
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap margin-[-5px] mt-[10px]">
          {comics.map((index) => (
            <div
              key={index.id}
              className="comic max-w-none mt-0 mx-[5px] mb-[18px] rounded-md list-none transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
              style={{ width: 'calc(100% / 4 - 10px)' }}
            >
              <Link href={`/comic/${index.id}`}>
                <figure className="rounded-md m-0 overflow-hidden relative">
                  <span className="relative block h-0 w-full pt-[150%] overflow-hidden">
                    <img
                      alt="manga cover"
                      loading="lazy"
                      className="object-cover rounded-md h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
                      height="134"
                      src="index.cover"
                      width="96"
                      placeholder="/img/now_printing.webp"
                    />
                  </span>
                </figure>
              </Link>
              <p className="text-center whitespace-nowrap text-ellipsis text-[15px] h-[25px] font-normal overflow-hidden">
                <span className="text-[#ef4444]">*</span>
                {index.name}
              </p>
              <p className="mt-[8px] text-center whitespace-nowrap text-[#808080] text-[10px] font-normal">
                {index.date}发布
              </p>
            </div>
          ))}
        </div>
      </MainColumn>
      <Sidebar />
    </div>
  );
};

export default MainPage;
