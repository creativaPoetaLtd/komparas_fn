import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import slide from '../../assets/slide.png';
import { Link } from 'react-router-dom';

const SlidingCards: React.FC = () => {
  return (
    <div className="w-full py-12 lg:mt-0 md:mt-0 xl:mt-0 2xl:mt-0 mt-[20%]">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='w-full h-full flex justify-center items-center px-12 '
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {[...Array(8)].map((_, index) => (
          <SwiperSlide key={index}>
            <Link className="p-4 flex flex-col rounded-md border-[1px] border-gray-300" to={'/product/1'}>
              <div className="flex justify-center">
                <img src={slide} height={152} width={172} alt="" className="w-[172px] h-[152px] object-cover mb-4" />
              </div>
              <p className='flex text-sm'>HAVIT HV-G92 Gamepad</p>
              <p className='flex text-sm text-[#EDB62E] mt-1'>Shops(5)</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flex justify-center mt-12 w-full'>
        <button className='bg-[#0C203B] text-white p-2 rounded-md'>View All Products</button>
      </div>
    </div>
  );
};

export default SlidingCards;
