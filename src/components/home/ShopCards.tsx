import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaShoppingBag } from 'react-icons/fa';
import { getAllShops } from '../../api/getAllShops';

const ShopCards: React.FC = () => {

  const [shops, setShops] = React.useState<any[]>([]);  
  React.useEffect(() => {
    const fetchShops = async () => {
      const response = await getAllShops();
      setShops(response?.data);
    }
    fetchShops();
  }, []);


  console.log('Shops....................', shops[0]?.name);
  

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
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <div className="lg:px-16 px-2 py-10">
      <div className='flex flex-col md:px-7 px-3 pb-6'>
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
        {shops.map((item, index) => (
          <div key={index} className="bg-white p-2 md:px-6 px-3  w-32 h-32 rounded-md ">
            <div  className="flex flex-col space-y-2 rounded-md border-gray-300 border-[1px] items-center justify-center h-full">
              <FaShoppingBag className="text-5xl" />
              <h1 className='text-sm'>{item.name}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ShopCards;
