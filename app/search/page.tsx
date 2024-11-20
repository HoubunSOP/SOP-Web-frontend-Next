import {MainColumn} from "@/components/layout/MainColumn";
import {PostListLoading} from "@/components/index/PostList.loading";
import Link from "next/link";
import {Image, Pagination} from "@mantine/core";
import {Sidebar} from "@/components/Sidebar/Sidebar";
import React from "react";

export default function SearchPage() {
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
            </MainColumn>
            <Sidebar/>
        </>
    )
}
