'use client';

import {useDisclosure} from '@mantine/hooks';
import {Box, Image, LoadingOverlay} from '@mantine/core';
import {Swiper, SwiperSlide} from 'swiper/react';
import './Mangaswpier.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import {Scrollbar} from 'swiper/modules';
import {useEffect, useState} from "react";
import {NewComisDetail} from "@/type/comic";
import {fetchNewComics} from "@/utils/api";

const formatTime = (time: string) => time.slice(5).replace(/-/g, '/');

const TimeFormatter: React.FC<{ time: string }> = ({time}) => {
    const formattedTime = formatTime(time);
    return (
        <div className="rounded-tl-md absolute w-12 h-5 text-center text-white bg-black/[0.5]">
            {formattedTime}
        </div>
    );
};

export default TimeFormatter;

export function Mangaswiper() {
    const [visible, {toggle}] = useDisclosure(true);
    const [newComicsDetail, setNewComicsDetail] = useState<NewComisDetail[]>([]);
    useEffect(() => {
        const fetchNewComicsAPI = async () => {
            try {
                const data = await fetchNewComics();
                setNewComicsDetail(data);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };
        fetchNewComicsAPI();
    }, []);
    return (
        <div>
            <div className="pb-1 pt-5 px-5 my-4">
        <span className="text-lg text-white -ml-1.5 py-1 px-2.5 bg-[#4453c1] rounded">
          未来发售的单行本 <i data-v-ac73f5b4="" className="fa-solid fa-telescope"/>
        </span>
            </div>
            <Box pos="relative" className="h-[256px]">
                <LoadingOverlay
                    visible={visible}
                    zIndex={1000}
                    overlayProps={{
                        radius: 'sm',
                        blur: 2,
                    }}
                />
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={30}
                    scrollbar={{
                        el: '.swiper-scrollbar',
                        draggable: true,
                        snapOnRelease: false,
                        dragSize: 'auto',
                    }}
                    onInit={() => {
                        toggle();
                    }}
                    modules={[Scrollbar]}
                    className="MangaSwiper select-none rounded-md"
                >
                    {newComicsDetail.map((item) => (
                        <SwiperSlide key={item.id} className="transition-opacity ease-in-out">
                            <div className="SwiperCard hover:opacity-80 transition-opacity ease-in-out">
                                <div className="rounded-tl-md absolute w-12 h-5 text-center text-white bg-black/[0.5]">
                                    <TimeFormatter time={item.date}/>
                                </div>
                                <div>
                                    <a href={`/comic/${item.id}`}>
                                        <Image
                                            alt={item.name}
                                            width={120}
                                            height={170}
                                            className="rounded-md max-w-full h-[170px] !w-[120px]"
                                            src={item.cover}
                                        />
                                        <Image
                                            className="rounded-md block my-1.5 mx-auto h-[16px] !w-[32px]"
                                            src="/images/label_4.webp"
                                            width={32}
                                            height={16}
                                            alt="mv_img"
                                        />
                                    </a>
                                </div>
                                <div className="text-sm text-center overflow-hidden line-clamp-2">{item.name}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-scrollbar !h-2.5 my-2"/>
            </Box>
        </div>
    );
}
