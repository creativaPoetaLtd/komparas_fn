import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaCarSide, FaChair } from 'react-icons/fa';
import { FaComputer } from "react-icons/fa6";
import { TbShoppingBagSearch } from "react-icons/tb";
import { GiConverseShoe, GiLoincloth } from "react-icons/gi";
import { IoFastFood, IoPhonePortraitOutline } from "react-icons/io5";
import { MdNoDrinks, MdOutlineElectricCar } from 'react-icons/md';
import { CgGirl } from 'react-icons/cg';


const CategoryCards: React.FC = () => {


  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow absolute -top-8 right-5 z-10 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center"
        onClick={onClick}
      >
        <GoArrowRight />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow absolute -top-8 right-12 z-10 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center"
        onClick={onClick}
      >
        <GoArrowLeft />
      </button>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    gap: 10,
    slidesToScroll: 3,
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
  };

  return (
    <div className="px-16 py-10">
      <div className='flex flex-col px-7 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
          </div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Categories</h1>
        </div>

        <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Browse By Categories</h1>

      </div>
      <Slider {...settings}
        className="flex justify-center"
      >
       
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <IoPhonePortraitOutline className="text-5xl" />
          <h1 className='text-sm'>Phone</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaComputer className="text-5xl" />
          <h1 className='text-sm'>Computer</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <GiConverseShoe className="text-5xl" />
          <h1 className='text-sm'>Shoes</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <GiLoincloth className="text-5xl" />
          <h1 className='text-sm'>Clothes</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <MdNoDrinks className="text-5xl" />
          <h1 className='text-sm'>Drinks</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <IoFastFood className="text-5xl" />
          <h1 className='text-sm'>Food</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaCarSide className="text-5xl" />
          <h1 className='text-sm'>Cars</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <CgGirl className="text-5xl" />
          <h1 className='text-sm'>Beauty</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <TbShoppingBagSearch className="text-5xl" />
          <h1 className='text-sm'>Chairs</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaChair className="text-5xl" />
          <h1 className='text-sm'>Tables</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <MdOutlineElectricCar className="text-5xl" />
          <h1 className='text-sm'>Electronics</h1>
          </div>
        </div>

      </Slider>
    </div>
  );
};

export default CategoryCards;