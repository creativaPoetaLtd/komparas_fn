import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
// import { FaCarSide, FaChair } from 'react-icons/fa';
// import { FaComputer } from "react-icons/fa6";
// import { TbShoppingBagSearch } from "react-icons/tb";
// import { GiConverseShoe, GiLoincloth } from "react-icons/gi";
// import {  IoPhonePortraitOutline } from "react-icons/io5";
import { Phone } from '@phosphor-icons/react';
// import { MdNoDrinks, MdOutlineElectricCar } from 'react-icons/md';
// import { CgGirl } from 'react-icons/cg';
import { fetchParentCategories } from '../../api/getAllCategories';
import { Link } from 'react-router-dom';

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

  const settings: { current: number, prevArrow:any,nextArrow:any, responsive:any, dots: boolean, dotsClass: string, infinite: boolean, speed: number, slidesToShow: number, slidesToScroll: number, autoplay:boolean, autoplaySpeed:number, pauseOnHover: boolean  } = {
    current: 0,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
    ],
  };
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
      const fetchCategories = async () => {
          const data = await fetchParentCategories();            
          setCategories(data?.data);          
      }
      fetchCategories();
  }
  , []);

  return (
    <div className="lg:px-14 px-2 py-10">
      <div className='flex flex-col md:px-4 px-3 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
          </div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Amoko yose</h1>
        </div>
        {/* <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Hitamo telefoni ugendeye ku bwoko</h1> */}
      </div>
      {categories.length > 0 ? (
      <Slider {...settings}
        className="flex justify-center"
      >
          {categories.map((category: any) => (
          <Link  className="bg-white p-2 md:px-4 px-3  w-32 h-32 rounded-md " to={`/products?categoryId=${category?._id}`}>
            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
              <Phone className="text-5xl" />
              <h1 className='text-sm'>{category?.name}</h1>
            </div>
          </Link>
        ))}
      </Slider>
      ) : (
        <div>Loading...</div>
      )}
      
    </div>
  );
};


export default CategoryCards;