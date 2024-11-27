import {Alert, Skeleton} from "@mantine/core";
import React from "react";
import Link from "next/link";
import {MangazineDetail} from "@/type/mangazine";

interface ItemData {
    label: string;
    value: string | number | string[];
    loading: boolean;
    link_url?: string;
}

export default function MangazineInfo({data, loading = false,}: { data?: MangazineDetail; loading?: boolean; }) {
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
                        <Link target="_blank" className="text-[#0189EC] mr-4 inline-block" href={link_url}>
                            {value || '暂无信息'}
                        </Link>
                    ) : (
                        <p className="text-[#0189EC] mr-4 inline-block"> {value || '暂无信息'}</p>
                    )
                )}
            </div>
        </div>
    );

    const renderComicItem = ({label, value, loading}: ItemData) => (
        <div className="py-3 flex border-b border-gray-200">
            <div className="ListTerm min-w-[6em] text-[#808080] text-sm font-normal">
                {label}
            </div>
            <div className="m-0 flex-1 text-[#242a36] text-sm font-medium">
                {value?.map((item: string) => (
                    <div key={item} className="p-1">
                        {loading ? (
                            <Skeleton height={8} mt={6} width="70%" radius="xl"/>
                        ) : (
                            <Link className="text-[#0189EC] mr-4 inline-block" href="">
                                {item}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const icon = <i className="fa-solid fa-triangle-exclamation"></i>;
    return (
        <div className="border-t-2 border-solid border-gray-300 py-6 mt-6">
            <h2 className="mb-3.5">
                <span className="font-bold text-base text-[#242a36] tracking-wide">
                  杂志详情
                </span>
            </h2>
            <Alert className="mb-3.5" variant="light" color="yellow" title="杂志信息为自动获取" icon={icon}>
                杂志的相关信息均为从Manga Time Kirara官网获取，可能会存在一定的误差(如发售时间的波动等)，还请谅解
            </Alert>
            {renderItem({label: '名称', value: data?.detail.magazine.name || '', loading})}
            {renderItem({label: '发售时间', value: data?.detail.magazine.publish_date || '', loading})}
            {renderItem({
                label: '官网链接',
                value: data?.detail.magazine.link || '',
                loading,
                link_url: data?.detail.magazine.link
            })}
            {renderComicItem({
                label: '登场漫画',
                value: data?.detail.comics || '',
                loading,
                link_url: "/list/comic?category_id=" + data?.detail.categories[0].id
            })}
        </div>
    );
}
