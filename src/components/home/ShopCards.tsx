import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaShopify, FaShoppingBag } from 'react-icons/fa';
import { FiShoppingBag } from "react-icons/fi";
import { FaBasketShopping } from "react-icons/fa6";
import { TbShoppingBagSearch } from "react-icons/tb";
import { GiShop } from "react-icons/gi";


const ShopCards: React.FC = () => {


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
    slidesToScroll: 1,
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
  };

  return (
    <div className="px-16 py-10">
      <div className='flex flex-col px-7 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
          </div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Shops</h1>
        </div>
        <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Browse By Shop</h1>
      </div>
      <Slider {...settings}
        className="flex justify-center"
      >
       
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShoppingBag className="text-5xl" />
          <h1 className='text-sm'>Ibanga Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FiShoppingBag className="text-5xl" />
          <h1 className='text-sm'>Ishami Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaBasketShopping className="text-5xl" />
          <h1 className='text-sm'>Ikibondo Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShopify className="text-5xl" />
          <h1 className='text-sm'>Ineza Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShopify className="text-5xl" />
          <h1 className='text-sm'>Ineza Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <GiShop className="text-5xl" />
          <h1 className='text-sm'>Impamo Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShopify className="text-5xl" />
          <h1 className='text-sm'>Ineza Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShopify className="text-5xl" />
          <h1 className='text-sm'>Ineza Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <TbShoppingBagSearch className="text-5xl" />
          <h1 className='text-sm'>Icyeza Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShopify className="text-5xl" />
          <h1 className='text-sm'>Ineza Shop</h1>
          </div>
        </div>
        <div className="bg-white p-2 px-6  w-32 h-32 rounded-md shadow-md">
          <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
          <FaShopify className="text-5xl" />
          <h1 className='text-sm'>Ineza Shop</h1>
          </div>
        </div>

      </Slider>
    </div>
  );
};

export default ShopCards;