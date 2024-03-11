
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// export default function SimpleSlider() {
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };
//   return (
//     <Slider {...settings}>
//       <div>
//         <h3>1</h3>
//       </div>
//       <div>
//         <h3>2</h3>
//       </div>
//       <div>
//         <h3>3</h3>
//       </div>
//       <div>
//         <h3>4</h3>
//       </div>
//       <div>
//         <h3>5</h3>
//       </div>
//       <div>
//         <h3>6</h3>
//       </div>
//     </Slider>
//   );
// }


// import img7 from "../../assets/img7.png";
import { FaApple } from "react-icons/fa";
import { ArrowRight } from "@phosphor-icons/react";
import { getAllProducts } from "../../api/product";
import { getAllCategories } from "../../api/getAllCategories";
const HomeBurner = () => {
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      console.log('SlidingCards', response);

      setProducts(response?.data?.products);
    }
    fetchProducts();
  }
    , []);
  const settings: { current: number, customPaging: (i: any) => JSX.Element, dots: boolean, dotsClass: string, infinite: boolean, speed: number, slidesToShow: number, slidesToScroll: number, autoplay:boolean, autoplaySpeed:number, pauseOnHover: boolean  } = {
    current: 0,
    customPaging: function (i: any) {
      return (
        <a className="ab absolute md:-top-3 top-28">
          <div className={`smallCircle flex justify-center items-center ${i === this.current ? 'bg-yellow-600' : 'bg-white'} w-3 h-3 rounded-full`}></div>
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
      const fetchCategories = async () => {
          const data = await getAllCategories();            
          setCategories(data?.data);
      }
      fetchCategories();
  }
  , []);

  return (
    <div className='bunnerPage flex w-full lg:px-20 px-0 h-[344px]'>
      <div className='sideCategories w-1/4 hidden lg:flex h-full border-black border-r '>
        <ul className='flex flex-col space-y-4 py-4'>
          {categories?.map((category: any) => (
            <li key={category._id} className='text-sm'>{category.name}</li>
          ))}
        </ul>
      </div>
      <Slider {...settings} className='lg:w-3/4 w-full h-full'>
        {products?.slice(0,4)?.map((slide, index) => (
          <div key={index+1} className='bunner lg:w-3/4 w-full h-full md:py-4 py-4 md:pl-4 px-0'>
            <div className='mainPage flex md:flex-row flex-col bg-[#0C203B] md:h-[344px] h-fit relative'>
              <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
                <div className='flex'>
                  <FaApple className='text-white md:text-5xl text-2xl my-auto justify-center' />
                  <p className='text-white text-sm ml-2 my-auto font-thin justify-center'>iPhone 14 Series</p>
                </div>
                <p className='lg:text-5xl text-3xl mt-6 text-white'>
                  Up to 10% off Voucher
                </p>
                <button className="flex space-x-2 pl-1 text-sm mt-1 text-[#EDB62E]">
                  <p className="underline underline-offset-4">Shop Now</p>
                  <ArrowRight className="m-auto justify-center" />
                </button>
              </div>
              <div className="image md:w-[60%] w-full h-full md:p-4 p-1 pb-12">
                <div className="w-full h-full object-cover">
                  <img src={slide?.product_image} height={100} width={100} alt="" className="w-full h-[274px] object-contain" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeBurner
