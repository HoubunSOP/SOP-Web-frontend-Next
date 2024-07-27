'use client';

import {Suspense} from 'react';
import IndexCalendar from '../index/IndexCalendar';
import '@mantine/dates/styles.css';

export function Sidebar() {
    return (
        <>
            <div className="flex gap-10 flex-col w-full md:w-3/6 mt-4 md:mt-0 px-4">
                <div className="bg-white bg-opacity-75 rounded-lg">
                    <div className="flex items-center justify-center pt-4">
                        <span className="text-center font-bold text-[#242a36]">发售日历</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <Suspense fallback={<p>Loading weather...</p>}>
                            <IndexCalendar/>
                        </Suspense>
                    </div>
                </div>
                <div className="bg-white bg-opacity-75 rounded-lg">
                    <div className="flex items-center justify-center pt-4">
                        <span className="text-center font-bold text-[#242a36]">推荐文章</span>
                    </div>
                    <div className="block">qwq</div>
                </div>
            </div>
        </>
    );
}
