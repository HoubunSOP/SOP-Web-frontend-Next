// components/LoadingScreen.tsx
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    isLoaded: boolean;
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isLoaded) {
            // 当加载完成时，快速将进度条更新到 100%
            setProgress(100);
            // 等待一段时间后隐藏加载屏幕
            setTimeout(() => setIsVisible(false), 1000); // 保持加载屏幕可见 1 秒
        } else {
            // 模拟进度条的加载
            interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 95) {
                        clearInterval(interval);
                        return 95;
                    }
                    return Math.min(oldProgress + Math.random() * 10, 95);
                });
            }, 100);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isLoaded]);

    return (
        <div className={`loading-screen ${isVisible ? '' : 'fade-out'}`}>
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <p>加载中... {Math.round(progress)}%</p>
        </div>
    );
}
