'use client';
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Detail} from "@/type/article";
import {redirect} from "next/navigation";
import {fetchCategories} from "@/utils/api";

export default function Content({slug}: { slug: string }) {
    const [categories, setCategories] = useState<Detail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let type_id = null
        switch (slug) {
            case 'comic':
                type_id = 1;
                break;
            case 'post':
                type_id = 2;
                break;
            case 'magazine':
                type_id = 3;
                break;
            default:
                redirect('/not-found');
        }
        const loadFetch = async () => {
            try {
                const data = await fetchCategories(type_id)
                setCategories(data);
            } catch (error) {
                console.error('获取文章失败:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFetch();
    }, []);
    return (
        <li>
            <Link href="/list/post?c=5"
                  className="mb-0 flex rounded-full transition-all ease-in-out text-zinc-950 py-2 px-3 items-center justify-between hover:bg-[#f5f5f5]">
                <span className="level-start flex items-center justify-between">
                    未分类
                </span>
                <span className="level-end bg-[#f5f5f5] flex items-center justify-between text-xs h-8 px-3">
	            	2
	            </span>
            </Link>
        </li>
    )
}