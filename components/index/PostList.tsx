'use client';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {fetchPosts} from "@/utils/api";

interface Post {
    category_id: number;
    category_name: string;
    id: number;
    title: string;
    date: string;
    cover: string;
}

export function PostList() {
    const [articles, setArticles] = useState<Post[]>([]);

    useEffect(() => {
        const loadFetch = async () => {
            try {
                const {items} = await fetchPosts(1);
                setArticles(items);
            } catch (error) {
                console.error('获取文章失败:', error);
            }
        };

        loadFetch();
    }, []);

    return (
        <div>
            <div>
                <h3 className="text-white mb-2 mt-10 mx-5 py-2.5 bg-[#4453c1] rounded-2xl text-center">
                    <i className="fa-solid fa-stars"/>
                    观星资讯
                    <i className="fa-solid fa-moon-stars"/>
                </h3>
                <div className="ContentContainer">
                    {articles.map((article) => (
                        <div
                            key={article.id} // 使用唯一的 id 作为 key
                            className="pt-[26px] pb-[15px] px-6 relative rounded-md flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
                        >
                            <Link href={`/post/${article.id}`}
                                  className="aText overflow-hidden h-[3.8rem] mr-5 text-sm font-medium line-clamp-3">
                                {article.title}
                            </Link>
                            <div
                                className="justify-self-end ml-auto w-[120px] h-[72px] md:w-[142px] md:h-[88px] rounded-md overflow-hidden relative">
                                <div className="h-full relative">
                                    <Link href={`/post/${article.id}`}>
                                        <img
                                            loading="lazy"
                                            className="w-[100%] h-[100%] absolute top-0 left-0 object-cover"
                                            src={article.cover}
                                            alt="post cover"
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute bottom-2.5">
                                <Link
                                    href={`/list/post?category_id=${article.category_id}`} // 使用合适的查询参数
                                    className="text-xs md:text-sm font-medium tracking-wide text-[#808080]"
                                >
                                    <i className="fa-solid fa-list-tree"/>
                                    {article.category_name}
                                </Link>
                                <span className="text-xs md:text-sm font-medium tracking-wide text-[#808080] pl-2">
                                    <i className="fa-solid fa-calendar-week"/>
                                    {article.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
