
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import { FaApple } from "react-icons/fa";
// import { ArrowRight } from "@phosphor-icons/react";
import { fetchParentCategories } from "../../api/getAllCategories";
import { Phone } from "@phosphor-icons/react";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import dummyData from "./dummData";

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



const onClick: MenuProps['onClick'] = () => {
};
const HomeBurner = () => {

  const settings: { current: number, customPaging: (i: any) => JSX.Element, dots: boolean, dotsClass: string, infinite: boolean, speed: number, slidesToShow: number, slidesToScroll: number, autoplay:boolean, autoplaySpeed:number, pauseOnHover: boolean  } = {
    current: 0,
    customPaging: function (i: any) {
      return (
        <a className="ab absolute mb md:-top-4 top-28">
          <div className={`smallCircle flex justify-center items-center ${i === this.current ? 'bg-yellow-600' : 'bg-white'} w-3 h-3 rounded-full`}></div>
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
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
    return getItem(category.name, category._id, <Phone className="text-green-500" />,  !hasChildren ? category.id ? category.id : null : category.children.map((child: any) => {
      return getItem(child.name, child._id, <Phone />)
    }
    ));
  }
  );


  console.log("jjjj", dummyData);
  

  
  return (
    <div className='bunnerPage flex md:w-[100%] w-[92%] m-auto md:px-16 px-0'>
      <div className='sideCategories w-fit hidden bg-white lg:flex h-full  '>
        <Menu onClick={onClick} style={{ width: 200, boxShadow: 'white', border: 'none', borderRight:"white" }} mode="vertical" items={cagetoryItems} />
      </div>
      <Slider {...settings} className='lg:w-[80%] w-[100%] self-center h-full'>
        {dummyData?.map((data, index) => (
          <div key={index+1} className='bunner lg:w-3/4 w-[90%] bg-[#0C203B] mt-6 h-full md:py-4 py-4 md:pl-4 pl-0 px-0'>
            <div className='mainPage flex md:flex-row flex-col  md:h-[275px] h-fit relative'>
              <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
                {/* <div className='flex'>
                  <FaApple className='text-white md:text-5xl text-2xl my-auto justify-center' />
                  <p className='text-white text-sm ml-2 my-auto font-thin justify-center'> ibyiciro bya iPhone 14</p>
                </div> */}
                <img src='/cc.png' alt='logo' className='h-12 mt-4' />
                <p className='lg:text-md text-sm mt-6 bg-black p-2 text-white'>
                  Ishakiro rya telephone zizewe
                </p>
                {/* <button className="flex space-x-2 pl-1 text-sm mt-1 text-[#EDB62E]">
                  <p className="underline underline-offset-4">Reba aho wayigurira</p>
                  <ArrowRight className="m-auto justify-center" />
                </button> */}
              </div>
              <div className="image md:w-[60%] w-full h-full md:p-4 p-1 pb-12">
                <div className="w-full h-full object-cover">
                  <img src={data?.image} height={100} width={100} alt="" className="w-full h-[254px] object-contain" />
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
