import {Image} from '@mantine/core';
import {redirect} from 'next/navigation';
import {MainColumn} from '@/components/layout/MainColumn';
import '../globals.css';
import {Sidebar} from '@/components/Sidebar/Sidebar';
import dynamic from "next/dynamic";

const PostRenderComponent = dynamic(() => import('@/components/PostRender'), {
    ssr: false,
});
export default async function PostPage({params}: { params: { id: Number } }) {
    const {id} = params;
    // revalidate表示在指定的秒数内缓存请求，和pages目录中revalidate配置相同
    const res = await fetch(`https://api.fwgxt.top/api/post/${id}`, {
        next: {
            revalidate: 60,
            tags: ['collection'],
        },
        headers: {'Content-Type': 'application/json', 'user-agent': 'HoubunSOPWebResponse'},
    });
    const data = (await res.json()) as {
        status: string;
        message: {
            post_id: Number;
            post_name: string;
            post_date: string;
            post_content: string;
            post_cover: string;
            categories: string[];
        };
    };
    console.log(data)
    if (data.status === 'error') {
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
                                <span className="ml-1">{data.message.post_date}</span>
                            </span>
                            <span className="pl-2">
                                <i className="fa-regular fa-calendar"/>
                                <span className="ml-1">{data.message.post_date}</span>
                            </span>
                        </div>
                        <h1 className="text-2xl mb-4">
                            <span>{data.message.post_name}</span>
                        </h1>
                        <div
                            className="mb-6 text-center bg-[#F5F5F5] max-w-[100%] h-40 md:h-60 rounded-md top-0 left-0 object-cover inline">
                            <Image className="w-full object-cover" radius="md" src={data.message.post_cover} alt="post cover"/>
                        </div>
                    </header>
                    <div id="post-content">
                        <div id="single_content">
                            <PostRenderComponent data={data.message}/>
                        </div>
                    </div>
                </article>
            </MainColumn>
            <Sidebar/>
        </>
    );
}
export const dynamicParams = true;
