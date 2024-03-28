'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import './Topswiper.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const objData = {
  1: '我是第一条数据',
  2: '我是第二条数据',
  3: '我是第三条数据',
  4: '我是第三条数据',
};
export function Topswiper() {
  return (
    <>
      <div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          loop
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
            <SwiperSlide className="transition-opacity ease-in-out">
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
      </div>
    </>
  );
}
