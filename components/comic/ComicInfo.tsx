import {Alert, Skeleton} from "@mantine/core";
import {ComicDetail} from "@/type/comic";
import React from "react";
import Link from "next/link";

interface ItemData {
    label: string;
    value: string | number;
    loading: boolean;
    link_url?: string;
}

export default function ComicInfo({data, loading = false,}: { data?: ComicDetail; loading?: boolean; }) {
    const renderItem = ({label, value, loading, link_url}: ItemData) => (
        <div className="py-3 flex border-b border-gray-200">
            <div className="ListTerm min-w-[6em] text-[#808080] text-sm font-normal">
                {label}
            </div>
            <div className="m-0 flex-1 text-[#242a36] text-sm font-medium">
                {loading ? (
                    <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                ) : (
                    link_url ? (
                        <Link className="text-[#0189EC] mr-4 inline-block" href={link_url}>
                            {value || '暂无信息'}
                        </Link>
                    ) : (
                        <p className="text-[#0189EC] mr-4 inline-block"> {value || '暂无信息'}</p>
                    )
                )}
            </div>
        </div>
    );

    const icon = <i className="fa-solid fa-triangle-exclamation"></i>;
    return (
        <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
            <h2 className="mb-3.5">
                <span className="font-bold text-base text-[#242a36] tracking-wide">
                  漫画详情
                </span>
            </h2>
            {data?.detail.auto &&
                <Alert className="mb-3.5" variant="light" color="yellow" title="此漫画未校对" icon={icon}>
                    此漫画并未进行校对，信息获取自芳文社官网以及日本国内图书馆，相关信息可能有误，还请谅解
                </Alert>
            }
            {renderItem({label: '系列', value: data?.detail.name || '', loading})}
            {renderItem({label: '卷数', value: data?.detail.volume || '', loading})}
            {renderItem({label: '作者', value: data?.detail.author.name || '', loading})}
            {renderItem({label: '发售日', value: data?.detail.date || '', loading})}
            {renderItem({
                label: '连载刊物',
                value: data?.detail.categories[0].name || '',
                loading,
                link_url: "/list/comic?category_id=" + data?.detail.categories[0].id
            })}
            {renderItem({label: 'ISBN', value: data?.detail.isbn || '', loading})}
        </div>
    );
}
