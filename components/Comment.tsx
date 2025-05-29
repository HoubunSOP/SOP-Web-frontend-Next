'use client'
import { useEffect } from 'react';
import { init } from '@waline/client';

import '@waline/client/style';
import '@waline/client/meta';

const WalineComment = () => {
    useEffect(() => {
        init({
            el: '#waline',
            lang: 'zh',
            emoji: [
                'https://fastly.jsdelivr.net/gh/walinejs/emojis@1.1.0/bilibili',
                'https://fastly.jsdelivr.net/gh/walinejs/emojis@1.1.0/tw-emoji',
            ],
            requiredMeta: ['nick', 'mail'],
            serverURL: 'https://waline-sop.sakurakoi.top',
        });
    }, []);

    return <div id="waline" />;
};

export default WalineComment;