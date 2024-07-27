'use client';

import React from 'react';
import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

type ImageViewProps = {
    photoSrc: string;
    children: React.ReactElement;
};

export default function ImageView({photoSrc, children}: ImageViewProps) {
    return (
        <PhotoProvider maskOpacity={0.5}>
            <PhotoView src={photoSrc}>{children}</PhotoView>
        </PhotoProvider>
    );
}
