'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export function Topswiper() {
  return (
    <>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop
          slides-per-view="auto"
          centeredSlides
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ type: 'progressbar' }}
          modules={[Autoplay, Pagination, Navigation]}
          className="TopSwiper"
        >
          <SwiperSlide className="transition-opacity ease-in-out">
            <Image
              src="https://s2.loli.net/2023/09/27/AGI8xiK5qPMj7ma.webp"
              alt="封面"
              width={960}
              height={480}
              style={{
                width: '100%',
                borderRadius: '9px',
                height: '100%',
              }}
            />

            <div className="caption-wrap">
              <div className="caption">
                <a href="'/post/' + index.id">qwq</a>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-full animate-pulse bg-gray-300 rounded">
              <svg
                className="w-10 h-10 text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
