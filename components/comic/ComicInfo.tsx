import {List} from 'postcss/lib/list';
import {Skeleton} from "@mantine/core";

interface ComicData {
    status: string;
    message: {
        comic_id: number; // Ensure primitive type `number` is used
        comic_name: string;
        comic_author: string;
        comic_date: string;
        comic_intro: string;
        comic_cover: string;
        comic_magazine: string;
        categories: List; // Define categories' type based on your actual data
    };
}

interface ItemData {
    label: string;
    value: string | number;
    loading: boolean;
}

export default function ComicInfo({data, loading = false,}: { data?: ComicData; loading?: boolean; }) {
    const renderItem = ({label, value, loading}: ItemData) => (
        <div className="py-3 flex border-b border-gray-200">
            <div className="ListTerm min-w-[6em] text-[#808080] text-sm font-normal">
                {label}
            </div>
            <div className="m-0 flex-1 text-[#242a36] text-sm font-medium">
                {loading ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                ) : (
                    <p className="text-[#0189EC] mr-4 inline-block">{value || '暂无信息'}</p>
                )}
            </div>
        </div>
    );

    return (
        <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
            <h2 className="mb-3.5">
        <span className="font-bold text-base text-[#242a36] tracking-wide">
          漫画详情
        </span>
            </h2>
            {renderItem({label: '系列', value: data?.message.comic_name || '', loading})}
            {renderItem({label: '卷数', value: 1, loading})}
            {renderItem({label: '作者', value: data?.message.comic_author || '', loading})}
            {renderItem({label: '发售日', value: data?.message.comic_date || '', loading})}
            {renderItem({label: '连载刊物', value: data?.message.comic_magazine || '', loading})}
            {renderItem({label: 'ISBN', value: 1, loading})}
        </div>
    );
}
