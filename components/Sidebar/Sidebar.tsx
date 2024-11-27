'use client';

import {Suspense} from 'react';
import SideCalendar from './SideCalendar';
import '@mantine/dates/styles.css';
import {PostListLoading} from "@/components/index/PostList.loading";
import {RecommendedPost} from "@/components/Sidebar/RecommendedPost";
import PostRender from "@/components/PostRender";

export function Sidebar() {
    return (
        <>
            <div className="flex gap-10 flex-col w-full md:w-2/6 mt-4 md:mt-0 px-4">
                <div className="bg-white bg-opacity-75 rounded-lg">
                    <div className="flex items-center justify-center pt-4">
                        <span className="text-center font-bold text-[#242a36]">发售日历</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <Suspense fallback={<p>正在加载日历中...</p>}>
                            <SideCalendar/>
                        </Suspense>
                    </div>
                </div>
                <div className="bg-white bg-opacity-75 rounded-lg">
                    <div className="flex items-center justify-center pt-4">
                        <span className="text-center font-bold text-[#242a36]">推荐文章</span>
                    </div>
                    <Suspense fallback={<PostListLoading/>}>
                        <RecommendedPost/>
                    </Suspense>
                </div>
            </div>
        </>
    );
}
export default Sidebar;