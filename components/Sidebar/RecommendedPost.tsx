'use client';
import Link from 'next/link';
import {useEffect, useState} from "react";
import {PostListLoading} from "@/components/index/PostList.loading";
import {Detail} from "@/type/article";
import './RecommendedPost.css'

export function RecommendedPost() {
    const [articles, setArticles] = useState<Detail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const loadFetch = async () => {
            const url = `/recommended`;
            try {
                const response = await fetch(`http://127.0.0.1:8000${url}`);
                const data = await response.json()
                setArticles(data.detail);
            } catch (error) {
                console.error('获取文章失败:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFetch();
    }, []);

    return (
        <div>
            <div>
                <div className="ContentContainer">
                    {isLoading ? (
                        <PostListLoading/>
                    ) : (

                        articles.map((article) => (
                            <Link
                                href={`/post/${article.id}`}
                                key={article.id} // 使用唯一的 id 作为 key
                                className="pt-[26px] pb-[15px] px-6 relative rounded-xl flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out"
                            >
                                <p
                                    className="RPaText overflow-hidden h-[3.8rem] mr-5 text-sm font-medium line-clamp-3">
                                    {article.title}
                                </p>
                                <div
                                    className="justify-self-end ml-auto w-[70px] h-[65px] md:w-[100px] md:h-[65px] rounded-md overflow-hidden relative">
                                    <div className="h-full relative">
                                        <img
                                            loading="lazy"
                                            className="w-[100%] h-[100%] absolute top-0 left-0 object-cover"
                                            src={article.cover}
                                            alt="post cover"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
