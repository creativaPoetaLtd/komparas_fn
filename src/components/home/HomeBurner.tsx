
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaApple } from "react-icons/fa";
import { ArrowRight } from "@phosphor-icons/react";
import { getAllProducts } from "../../api/product";
import { fetchParentCategories } from "../../api/getAllCategories";
import { Phone } from "@phosphor-icons/react";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



const onClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const HomeBurner = () => {
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
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
          const data = await fetchParentCategories();            
          setCategories(data?.data);          
      }
      fetchCategories();
  }
  , []);

  const cagetoryItems = categories?.map((category: any) => {
    // Check if the category has children
    const hasChildren = category.children && category.children.length > 0;
    return getItem(category.name, category._id, <Phone />,  !hasChildren ? category.id ? category.id : null : category.children.map((child: any) => {
      return getItem(child.name, child._id, <Phone />)
    }
    ));
  }
  );

  
  return (
    <div className='bunnerPage flex w-full lg:px-20 px-0 h-[344px]'>
      <div className='sideCategories w-1/4 hidden lg:flex h-full  '>
        <Menu onClick={onClick} style={{ width: 200 }} mode="vertical" items={cagetoryItems} />
      </div>
      <Slider {...settings} className='lg:w-3/4 w-full h-full'>
        {products?.slice(0,4)?.map((slide, index) => (
          <div key={index+1} className='bunner lg:w-3/4 w-full h-full md:py-4 py-4 md:pl-4 px-0'>
            <div className='mainPage flex md:flex-row flex-col bg-[#0C203B] md:h-[344px] h-fit relative'>
              <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
                <div className='flex'>
                  <FaApple className='text-white md:text-5xl text-2xl my-auto justify-center' />
                  <p className='text-white text-sm ml-2 my-auto font-thin justify-center'> ibyiciro bya iPhone 14</p>
                </div>
                <p className='lg:text-5xl text-3xl mt-6 text-white'>
                  Kugera ku 10% byagabanyijwe
                </p>
                <button className="flex space-x-2 pl-1 text-sm mt-1 text-[#EDB62E]">
                  <p className="underline underline-offset-4">Reba aho wayigurira</p>
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
