import React from "react";
import {MainColumn} from "@/components/layout/MainColumn";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
    ssr: false,
});
const Content = dynamic(() => import('@/app/category/[slug]/content'), {
    ssr: false,
});


export async function generateMetadata({params}: { params: { slug: string } }) {
    let title = "";
    switch (params.slug) {
        case 'comic':
            title = "漫画分类";
            break;
        case 'post':
            title = "文章分类";
            break;
        case 'magazine':
            title = "杂志分类";
            break;
    }
    return {
        title: `${title} | 芳文观星台`,
    }
}

export default function CategoryPage({params}: { params: { slug: string } }) {
    let title = "";
    switch (params.slug) {
        case 'comic':
            title = "漫画分类";
            break;
        case 'post':
            title = "文章分类";
            break;
        case 'magazine':
            title = "杂志分类";
            break;
    }
    return (
        <>
            <MainColumn>
                <div
                    className="px-[22px] pt-[18px] border-b-[2px] border-gray-200 overflow-hidden bg-white box-border">
                    <div className="relative mb-0">
                        <h1 className="m-0 flex">
                            <span className="inline-block text-[#242a36] text-base font-bold tracking-wide">
                                <i className="fa-duotone fa-list-tree"/>
                                {title}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="pt-2">
                    <ul className="list-none">
                        <Content slug={params.slug}/>
                    </ul>
                </div>
            </MainColumn>
            <Sidebar/>
        </>
    );
}
export const dynamicParams = true;