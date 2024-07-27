'use client';

import {useDisclosure} from '@mantine/hooks';
import {Box, Image, LoadingOverlay} from '@mantine/core';
import {Swiper, SwiperSlide} from 'swiper/react';
import './Topswiper.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

const objData = {
    1: '我是第一条数据',
    2: '我是第二条数据',
    3: '我是第三条数据',
    4: '我是第三条数据',
};

export function Topswiper() {
    const [visible, {toggle}] = useDisclosure(true);
    return (
        <div>
            <Box pos="relative">
                <LoadingOverlay
                    visible={visible}
                    zIndex={10}
                    overlayProps={{
                        radius: 'sm',
                        blur: 2,
                    }}
                />

                <Swiper
                    slidesPerView="auto"
                    spaceBetween={30}
                    loop
                    onInit={() => {
                        toggle();
                    }}
                    slides-per-view="3"
                    centeredSlides
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{type: 'progressbar'}}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="TopSwiper"
                >
                    {Object.entries(objData).map(([id, text]) => (
                        <SwiperSlide key={id} className="transition-opacity ease-in-out">
                            <a href={`/post/${id}`}>
                                <Image
                                    src="https://s2.loli.net/2023/09/27/AGI8xiK5qPMj7ma.webp"
                                    alt="封面"
                                    width={560}
                                    height={280}
                                    style={{
                                        width: '100%',
                                        borderRadius: '9px',
                                        height: '100%',
                                    }}
                                />

                                <div className="caption-wrap">
                                    <div className="caption">
                                        <span>{text}</span>
                                    </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </div>
    );
}
