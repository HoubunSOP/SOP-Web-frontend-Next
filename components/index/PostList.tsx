'use client';
import Link from 'next/link';

const data = [
    {
        id: 4,
        title: '测试ing',
        date: '2023-11-13',
        cover: 'https://s2.loli.net/2023/09/27/AGI8xiK5qPMj7ma.webp',
        recommended: 1,
        category_id: '5',
        category_name: '未分类',
    },
    {
        id: 3,
        title: 'bug报告、功能相关建议/内容反馈✨',
        date: '2023-09-27',
        cover: 'https://s2.loli.net/2023/09/27/AGI8xiK5qPMj7ma.webp',
        recommended: 1,
        category_id: '',
        category_name: '未分类',
    },
];

export function PostList() {
    return (
        <div>
            <div>
                <h3 className="text-white mb-2 mt-10 mx-5 py-2.5 bg-[#4453c1] rounded-2xl text-center">
                    <i className="fa-duotone fa-stars"/>
                    观星资讯
                    <i className="fa-duotone fa-moon-stars"/>
                </h3>
                <div className="ContentContainer">
                    {data.map((index) => (
                        <div key={index.id}
                            className="pt-[26px] pb-[15px] px-6 relative rounded-md flex flex-wrap overflow-hidden transition-all hover:bg-slate-100 hover:scale-[1.02] ease-in-out">
                            <Link href={`/post/${index.id}`} className="aText overflow-hidden h-[3.8rem] mr-5 text-sm font-medium line-clamp-3">
                                {index.title}
                            </Link>
                            <div
                                className="justify-self-end ml-auto w-[120px] h-[72px] md:w-[142px] md:h-[88px] rounded-md overflow-hidden relative">
                                <div className="h-full relative">
                                    <Link href={`/post/${index.id}`}>
                                    <img loading="lazy" className="w-[100%] h-[100%] absolute top-0 left-0 object-cover"
                                         src={index.cover} alt="post cover"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute bottom-2.5">
                                <Link href={`/list/post?${index.category_id}`}
                                      className="text-xs md:text-sm font-medium tracking-wide text-[#808080]">
                                    <i className="fa-duotone fa-list-tree"/>
                                    {index.category_name}
                                </Link>
                                <span className="text-xs md:text-sm font-medium tracking-wide text-[#808080] pl-2">
			                        <i className="fa-duotone fa-calendar-week"/>
                                    {index.date}
		                        </span>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gray-200 rounded-full w-40 bottom-2.5 h-2 absolute"/>
                </div>
            </div>
        </div>
    );
}
