import {Image} from '@mantine/core';
import {redirect} from 'next/navigation';
import {MainColumn} from '@/components/layout/MainColumn';
import '../globals.css';
import dynamic from "next/dynamic";
import {ArticleDetail} from "@/type/article";
import {fetchArticleDetail} from "@/utils/api";

const PostRenderComponent = dynamic(() => import('@/components/PostRender'), {
    ssr: false,
});
const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
    ssr: false,
});
export default async function PostPage({params}: { params: { id: Number } }) {
    const {id} = params;
    const data = (await fetchArticleDetail(id)) as ArticleDetail
    return (
        <>
            <MainColumn>
                <article>
                    <header className="px-[36px] pt-8 pb-6 relative">
                        <div className="mb-5 text-xs font-medium text-[#ababac] overflow-hidden">
                            <span>
                                <i className="fa-regular fa-folder-open"/>
                                <span className="ml-1">{data.detail.categories[0].name}</span>
                            </span>
                            <span className="pl-2">
                                <i className="fa-regular fa-calendar"/>
                                <span className="ml-1">{data.detail.date}</span>
                            </span>
                        </div>
                        <h1 className="text-2xl mb-4">
                            <span>{data.detail.title}</span>
                        </h1>
                        <div
                            className="mb-6 text-center bg-[#F5F5F5] max-w-[100%] h-40 md:h-60 rounded-md top-0 left-0 object-cover inline">
                            <Image className="w-full object-cover" radius="md" src={data.detail.cover}
                                   alt="post cover"/>
                        </div>
                    </header>
                    <div id="post-content">
                        <div id="single_content">
                            <PostRenderComponent data={data}/>
                        </div>
                    </div>
                </article>
            </MainColumn>
            <Sidebar/>
        </>
    );
}
export const dynamicParams = true;
