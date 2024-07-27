import { List } from 'postcss/lib/list';
import {Image} from '@mantine/core';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import '../globals.css';
import ComicInfo from '@/components/comic/ComicInfo';
import React from "react";

const PhotoClientComponent = dynamic(() => import('@/components/ImageView'), {
    ssr: false,
});

export default async function Content({ id }: { id: number  }) {
    // revalidate表示在指定的秒数内缓存请求，和pages目录中revalidate配置相同
    const res = await fetch(`https://api.fwgxt.top/api/comic/${id}`, {
        next: {
            revalidate: 60,
            tags: ['collection'],
        },
        headers: {'Content-Type': 'application/json', 'user-agent': 'HoubunSOPWebResponse'},
    });
    const data = (await res.json()) as {
        status: string;
        message: {
            comic_id: number;
            comic_name: string;
            comic_author: string;
            comic_date: string;
            comic_intro: string;
            comic_cover: string;
            comic_magazine: string;
            categories: List;
        };
    };
    if (data.status === 'error') {
        redirect('/not-found');
    }

    return (
        <div className="p-6 overflow-hidden box-border relative">
            <div className="flex flex-col md:flex-row ">
                <div className="info order-last md:order-first md:mr-4">
                    <div className="mb-2 mt-2 md:mt-0">
                        <h1 className="mb-[3px] text-lg m-0">
                            <span className="font-bold text-[#242a36]">{data.message.comic_name}</span>
                        </h1>
                    </div>
                    <p className="mb-2.5 m-0 text-sm tracking-wide">
                        <a className="inline-block h-7 leading-7 py-0 px-3 bg-[#F2F2F2] rounded-2xl text-[#606060] text-xs mr-2">
                            <i className="fa-regular fa-user" />
                            <span>{data.message.comic_author}</span>
                        </a>
                        <a className="inline-block h-7 leading-7 py-0 px-3 bg-[#F2F2F2] rounded-2xl text-[#606060] text-xs">
                            <i className="fa-regular fa-star" />
                            <span>{data.message.comic_magazine}</span>
                        </a>
                    </p>
                    <p className="mt-2 text-xs font-medium">
                        发售日：
                        <span>{data.message.comic_date}</span>
                    </p>
                    <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
                        <h2 className="mb-3.5">
                            <span className="font-bold text-base text-[#242a36] tracking-wide">漫画简介</span>
                        </h2>
                        <div
                            id="post-content"
                            dangerouslySetInnerHTML={{ __html: data.message.comic_intro }}
                        />
                    </div>
                    <ComicInfo data={data} />
                </div>
                <div className="w-[174px] order-first mx-auto md:ml-auto md:mb-auto md:mx-0 md:order-last md:self-end h-[245px] ">
                    <PhotoClientComponent photoSrc={data.message.comic_cover}>
                        <Image
                            className="h-[245px] w-[174px] !rounded-xl"
                            src={data.message.comic_cover}
                            alt="comic image"
                        />
                    </PhotoClientComponent>
                </div>
            </div>
        </div>
);
}

