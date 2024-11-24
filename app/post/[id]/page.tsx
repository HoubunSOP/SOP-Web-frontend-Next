import {Image} from '@mantine/core';
import {redirect} from 'next/navigation';
import {MainColumn} from '@/components/layout/MainColumn';
import '../globals.css';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import dynamic from "next/dynamic";
import {ArticleDetail} from "@/type/article";

const PostRenderComponent = dynamic(() => import('@/components/PostRender'), {
    ssr: false,
});
export default async function PostPage({params}: { params: { id: Number } }) {
    const {id} = params;
    // revalidate表示在指定的秒数内缓存请求，和pages目录中revalidate配置相同
    const res = await fetch(`http://127.0.0.1:8000/articles/${id}`, {
        next: {
            revalidate: 60,
            tags: ['collection'],
        },
        headers: {'Content-Type': 'application/json', 'user-agent': 'HoubunSOPWebResponse'},
    });
    const data = (await res.json()) as ArticleDetail
    if (data.status !== 200) {
        redirect('/not-found');
    }

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
                            <Image className="w-full object-cover" radius="md" src={data.detail.cover} alt="post cover"/>
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
