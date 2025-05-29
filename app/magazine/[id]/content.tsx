import {Image} from '@mantine/core';
import dynamic from 'next/dynamic';
import '../globals.css';
import React from "react";
import Link from "next/link";
import {MangazineDetail} from "@/type/mangazine";
import MangazineInfo from "@/components/mangazine/MangazineInfo";

const PhotoClientComponent = dynamic(() => import('@/components/ImageView'), {
    ssr: false,
});
const WalineComment = dynamic(() => import('@/components/Comment'), {
    ssr: false,
});

export default async function Content({data}: { data: MangazineDetail }) {

    return (
        <div className="p-6 overflow-hidden box-border relative">
            <div className="flex flex-col md:flex-row ">
                <div className="info order-last md:order-first md:mr-4">
                    <div className="mb-2 mt-2 md:mt-0">
                        <h1 className="mb-[3px] text-lg m-0">
                            <span
                                className="font-bold text-[#242a36]">{data.detail.magazine.name}</span>
                        </h1>
                    </div>
                    <p className="mb-2.5 m-0 text-sm tracking-wide">
                        <Link href={"/list/comic?category_id=" + data.detail.categories[0].id}
                              className="inline-block h-7 leading-7 py-0 px-3 bg-[#F2F2F2] rounded-2xl text-[#606060] text-xs">
                            <i className="fa-regular fa-star"/>
                            <span>{data.detail.categories[0].name}</span>
                        </Link>
                    </p>
                    <p className="mt-2 text-xs font-medium">
                        发售日：
                        <span>{data.detail.magazine.publish_date}</span>
                    </p>
                    <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
                        <h2 className="mb-3.5">
                            <span className="font-bold text-base text-[#242a36] tracking-wide">杂志简介</span>
                        </h2>
                        <div
                            id="post-content"
                            dangerouslySetInnerHTML={{__html: data.detail.magazine.intro}}
                        />
                    </div>
                    <MangazineInfo data={data}/>
                </div>
                <div
                    className="w-[174px] order-first mx-auto md:ml-auto md:mb-auto md:mx-0 md:order-last md:self-end h-[245px] ">
                    <PhotoClientComponent photoSrc={data.detail.magazine.cover}>
                        <Image
                            className="h-[245px] w-[174px] !rounded-xl"
                            src={data.detail.magazine.cover}
                            alt="magazine image"
                        />
                    </PhotoClientComponent>
                </div>
            </div>
            <WalineComment/>
        </div>
    );
}

