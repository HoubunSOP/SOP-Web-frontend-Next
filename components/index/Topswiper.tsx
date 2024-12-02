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
    1: {
        title:"问题报告&功能反馈",
        image:"https://s2.loli.net/2023/09/27/AGI8xiK5qPMj7ma.webp"
    },
    4: {
        title:"【观星台汉化】饿肚子少女和侦探 - 09",
        image:"https://s3.fwgxt.top/s3-houbunsop/%E7%AC%AC06%E8%A9%B1/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-11-30%20191358.png"
    },
    3: {
        title:"再谈《银盐少许》——孤独的我们，要走向何方？",
        image:"https://s2.loli.net/2024/10/30/PVHkqgpW2R7eGMx.png"
    }
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
                            <a href={`/post/${id}`} style={{
                                width: '100%',
                                borderRadius: '9px',
                                height: '100%',
                            }}>
                                <Image
                                    src={text.image}
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
                                        <span>{text.title}</span>
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
