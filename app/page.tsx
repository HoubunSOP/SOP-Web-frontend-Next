'use client';
import {Mangaswiper} from '@/components/index/Mangaswpier';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import {Topswiper} from '@/components/index/Topswiper';
import {MainColumn} from '@/components/layout/MainColumn';
import {PostList} from "@/components/index/PostList";
import {PostListLoading} from "@/components/index/PostList.loading";

export default function HomePage() {

    return (
        <>
            <MainColumn>
                <Topswiper/>
                <Mangaswiper/>
                <PostList/>
            </MainColumn>
            <Sidebar/>
        </>
    );
}
