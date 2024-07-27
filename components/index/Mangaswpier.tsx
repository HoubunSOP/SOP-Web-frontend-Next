'use client';

import { useDisclosure } from '@mantine/hooks';
import { Box, Image, LoadingOverlay } from '@mantine/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Mangaswpier.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

const objData = [
  {
    id: 0,
    name: 'test',
    date: '2024-1-2',
    mv_img: '/images/label_6.webp',
    cover: '/images/now_printing.webp',
  },
  {
    id: 1,
    name: 'qwq',
    date: '2024-1-2',
    mv_img: '/images/label_4.webp',
    cover: '/images/now_printing.webp',
  },
  {
    id: 2,
    name: 'qwq',
    date: '2024-1-2',
    mv_img: '/images/label_4.webp',
    cover: '/images/now_printing.webp',
  },
  {
    id: 3,
    name: 'qwq',
    date: '2024-1-2',
    mv_img: '/images/label_4.webp',
    cover: '/images/now_printing.webp',
  },
  {
    id: 4,
    name: 'qwq',
    date: '2024-1-2',
    mv_img: '/images/label_4.webp',
    cover: '/images/now_printing.webp',
  },
  {
    id: 5,
    name: 'qwq',
    date: '2024-1-2',
    mv_img: '/images/label_4.webp',
    cover: '/images/now_printing.webp',
  },
];

const formatTime = (time: string) => time.slice(5).replace(/-/g, '/');

const TimeFormatter: React.FC<{ time: string }> = ({ time }) => {
  const formattedTime = formatTime(time);
  return (
    <div className="rounded-tl-md absolute w-12 h-5 text-center text-white bg-black/[0.5]">
      {formattedTime}
    </div>
  );
};

export default TimeFormatter;

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
          {objData.map((item) => (
            <SwiperSlide key={item.id} className="transition-opacity ease-in-out">
              <div className="SwiperCard hover:opacity-80 transition-opacity ease-in-out">
                <div className="rounded-tl-md absolute w-12 h-5 text-center text-white bg-black/[0.5]">
                  <TimeFormatter time={item.date} />
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
                      src={item.mv_img}
                      width={32}
                      height={16}
                      alt="mv_img"
                    />
                  </a>
                </div>
                <div className="text-sm text-center">{item.name}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-scrollbar !h-2.5 my-2" />
      </Box>
    </div>
  );
}
