import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { v4 as uuidv4 } from 'uuid';
const SlideDetailPost:React.FC <{images:any}> = ({images}) => {
  return (
    <div className='flex w-full'>
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      mousewheel={true}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      allowTouchMove={false}
      navigation={true}
      className="mySwiper">
      {images?.map((e:any) => <SwiperSlide key={uuidv4()}>
        <div className='flex justify-center w-full h-[317px]  shrink-0 bg-black'> <img className='w-auto h-auto object-fill' src={e.url} alt='' /></div>
      </SwiperSlide>)}
    </Swiper>

  </div>
  )
}
export  default SlideDetailPost