import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchParentCategories } from "../../api/getAllCategories";
import { ArrowArcRight, Phone } from "@phosphor-icons/react";
import { Menu } from 'antd';
import dummyData from "./dummData";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";

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

const HomeBurner = () => {

  const [categories, setCategories] = useState<any>([]);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchParentCategories();            
      setCategories(data?.data);          
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setTypingIndex(prevIndex => (prevIndex + 1) % (maxTitleLength + 1));
    }, 100); // Adjust typing speed here
    return () => clearTimeout(typingTimer);
  }, [typingIndex]);

  const maxTitleLength = 120; // Adjust according to your data

  const cagetoryItems = categories?.map((category: any) => {
    const hasChildren = category.children && category.children.length > 0;
    return getItem(category.name, category._id, <Phone className="text-green-500" />, !hasChildren ? category.id ? category.id : null : category.children.map((child: any) => {
      return getItem(child.name, child._id, <Phone />)
    }));
  });

  const isAdminFromLocalStorage = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any)?.role === "admin";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true
  };

  const nextSlide = () => {
    if (slider) {
       slider.slickNext();
    }
   };
   
   const prevSlide = () => {
    if (slider) {
       slider.slickPrev();
    }
   };

  let slider: Slider | null  = null;

  return (
    <div className='bunnerPage flex md:w-[100%] w-[92%] m-auto md:px-16 px-0'>
      <div className=' sideCategories w-fit hidden bg-white lg:flex h-full'>
        <Menu style={{ width: 200, boxShadow: 'white', border: 'none', borderRight: "white" }} mode="vertical" items={cagetoryItems} />
      </div>
      <Slider {...sliderSettings} className='lg:w-[80%] w-[100%] self-center h-full' ref={sliderRef => slider = sliderRef}>
        {dummyData?.map((data, index) => (
          <div key={index + 1} className={`relative bunnerPAgeDiv lg:w-3/4 w-[90%] ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} mt-6 h-full md:py-4 py-4 md:pl-4 pl-0 px-0`}>
            <div className={`mainPage flex md:flex-row flex-col  md:h-[275px] h-fit relative`}>
              <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
                {data?.bgImage && <img src={data?.bgImage} alt='logo' className='h-12 mt-4' />}
                <p className='lg:text-md text-xl mt-6 p-2 text-white'>
                  {data?.title.slice(0, typingIndex)}
                </p>
              </div>
              <div className="image md:w-[60%] w-full h-full md:p-4 p-1 pb-12">
                <div className="w-full h-full object-cover">
                  <img src={data?.image} height={100} width={100} alt="" className="w-full h-[254px] object-contain" />
                </div>
              </div>
            </div>
            <button className="absolute top-1/2 left-2 " onClick={prevSlide}>
            <CiCircleChevLeft className="bg bg-gray-300 rounded-full hover:bg-slate-800" />
            </button>
        <button className="absolute top-1/2 right-2" onClick={nextSlide}>
        <CiCircleChevRight className="bg bg-gray-300 rounded-full hover:bg-slate-800" />

        </button>
          </div>
        ))}
      </Slider>
      <div className="prev-next-buttons">
        
      </div>
    </div>
  );
};

export default HomeBurner;
