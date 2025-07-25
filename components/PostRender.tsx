'use client';
import React from 'react';
import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import {Image} from "@mantine/core";
import {ArticleDetail} from "@/type/article";

const extractImageUrls = (html: string) => {
    const imgRegex = /<p[^>]*><img[^>]+src="([^">]+)"/g;
    const urls = [];
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        urls.push(match[1]);
    }
    return urls;
};

const extractTags = (html: string) => {
    return html.split('\n').map((tag) => tag.trim()).filter((tag) => tag !== '');
};

const renderTag = ({tag, imageUrls, cindex}: { tag: string, imageUrls: string[], cindex: number }) => {
    if (tag.startsWith('<p') && tag.includes('<img')) {
        const srcMatch = tag.match(/src="([^"]+)"/);
        if (srcMatch) {
            const src = srcMatch[1];
            const index = imageUrls.indexOf(src);
            if (index !== -1) {
                return (
                    <PhotoView key={cindex} src={src}>
                        <Image className="!w-1/2 object-cover" radius="md" src={src} alt="Image Viewer"/>
                    </PhotoView>
                );
            }
        }
    }
    if (tag.includes('<img')) {
        const srcMatch = tag.match(/src="([^"]+)"/);
        if (srcMatch) {
            const src = srcMatch[1];
            const index = imageUrls.indexOf(src);
            if (index !== -1) {
                return (
                    <PhotoView key={cindex} src={src}>
                        <Image className="!w-1/2 object-cover" radius="md" src={src} alt="Image Viewer"/>
                    </PhotoView>
                );
            }
        }
    }
    return <div key={cindex} dangerouslySetInnerHTML={{__html: tag}}/>;
};

const PostRender = ({data}: { data: ArticleDetail }) => {
    const imageUrls = extractImageUrls(data.detail.content);
    const tags = extractTags(data.detail.content);

    return (
        <PhotoProvider maskOpacity={0.5}>
            {tags.map((tag, index) => renderTag({tag, imageUrls, cindex: index}))}
        </PhotoProvider>
    );
};

export default PostRender;