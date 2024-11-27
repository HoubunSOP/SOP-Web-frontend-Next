'use client';
import {Mangaswiper} from '@/components/index/Mangaswpier';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import {Topswiper} from '@/components/index/Topswiper';
import {MainColumn} from '@/components/layout/MainColumn';
import {PostList} from "@/components/index/PostList";

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
