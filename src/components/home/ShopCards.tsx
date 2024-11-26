/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaShoppingBag } from 'react-icons/fa';
import { getAllShops } from '../../api/getAllShops';
import { Link } from 'react-router-dom';

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
  const settings: { current: number, prevArrow:any,nextArrow:any, responsive:any, dots: boolean, dotsClass: string, infinite: boolean, speed: number, slidesToShow: number, slidesToScroll: number, autoplay:boolean, autoplaySpeed:number, pauseOnHover: boolean  } = {
    current: 0,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
          slidesToShow: 3,
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
  const [shops, setShops] = React.useState<any>([]);
  React.useEffect(() => {
    const fetchShops = async () => {
      const response = await getAllShops();
      setShops(response?.data);
    }
    fetchShops();
  }, []);  
  return (
    <div className="lg:px-8 px-2 py-10">
      <div className='flex flex-col md:px-5 px-3 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
          </div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Amaduka yose</h1>
        </div>
      </div>
      {shops.length > 0 ? (
      <Slider {...settings}
        className="flex justify-center"
      >
          {shops.map((category: any) => (
          <Link
            key={category?._id}
            className="bg-white p-2 md:px-6 px-3  w-32 h-32 rounded-md " to={`/products?shopId=${category?._id}`}>
            <div className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
              <FaShoppingBag className="text-5xl" />
              <h1 className='text-sm'>{category?.name}</h1>
            </div>
          </Link>
        ))}
      </Slider>
      ) : (
        <div className="loading flex justify-center items-center h-40">
          <div className="loader"></div>  
          </div>
      )}

    </div>
  );
};

export default ShopCards;