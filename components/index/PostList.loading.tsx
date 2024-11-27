'use client';
import Link from 'next/link';
import {Skeleton} from "@mantine/core";

interface Post {
    category_id: number;
    category_name: string;
    id: number;
    title: string;
    date: string;
    cover: string;
}

export function PostListLoading() {
    return (
        <>
            {Array.from({length: 3}).map((_, index) => (
                <div key={index}
                     className="pt-[15px] pb-[15px] px-6 relative rounded-md flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
                >
                    <Skeleton height={18} mr={5} mt={6} width='50%' radius="xl"/>
                    <div
                        className="justify-self-end ml-auto w-[120px] h-[72px] md:w-[142px] md:h-[88px] rounded-md overflow-hidden relative">
                        <div className="h-full relative">
                            <Link href={`/post/`}>
                                <Skeleton height="100%" mt={6} width="100%" radius="md"/>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute bottom-2.5 w-full">
                        <Skeleton height={10} mt={6} width="30%" radius="xl"/>
                    </div>
                </div>
            ))}
        </>
    );
}
