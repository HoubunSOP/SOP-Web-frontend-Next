'use client';

import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Box, Image, Skeleton } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Topswiper.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Suspense } from 'react';

const objData = {
  1: '我是第一条数据',
  2: '我是第二条数据',
  3: '我是第三条数据',
  4: '我是第三条数据',
};
export function Mangaswiper() {
  const [visible, { toggle }] = useDisclosure(true);
  return (
    <div>
      <div className="pb-1 pt-5 px-5 my-4">
        <span className="text-lg text-white -ml-1.5 py-1 px-2.5 bg-[#4453c1] rounded">
          未来发售的单行本 <i data-v-ac73f5b4="" className="fa-duotone fa-telescope" />
        </span>
      </div>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
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
          pagination={{ type: 'progressbar' }}
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
