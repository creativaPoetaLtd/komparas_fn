import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {  fetchParentCategoriesm } from "../../api/getAllCategories";
import { Phone } from "@phosphor-icons/react";
import { Menu, MenuProps } from 'antd';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from "react-router-dom"
import { getAllProducts } from "../../api/product";

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
  const navigate = useNavigate();
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchParentCategoriesm();            
      setCategories(data?.data);          
    }
    fetchCategories();
  }, []);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products?.reverse());
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setTypingIndex(prevIndex => (prevIndex + 1) % (maxTitleLength + 1));
    }, 100); 
    return () => clearTimeout(typingTimer);
  }, [typingIndex]);
  const maxTitleLength = 120;
  const handleMenuClick = (e: any) => {
    const categoryId = e.key;
    navigate(`/products?categoryId=${categoryId}`);
  };

  const categoryItems = categories?.map((category: any) => {
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
    <div className='bunnerPage flex z-10 md:w-[100%] w-[92%] m-auto md:px-16 px-0'>
      <div className=' sideCategories w-fit hidden bg-white lg:flex h-full'>
        <Menu 
          style={{ width: 200, boxShadow: 'white', border: 'none', borderRight: "white" }} 
          mode="vertical" 
          items={categoryItems} 
          onClick={handleMenuClick}
        />
      </div>
      <Slider {...sliderSettings} className='lg:w-[80%] w-[100%] self-center h-full' ref={sliderRef => slider = sliderRef}>
      {products.slice(0,7).map((product: any) => (
          <div key={product._id} className={`relative bunnerPAgeDiv lg:w-3/4 w-[90%] ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} mt-6 h-full md:py-4 py-4 md:pl-4 pl-0 px-0`}>
            <div className={`mainPage flex md:flex-row flex-col  md:h-[275px] h-fit relative`}>
              <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
               {
                product?.product_description?.length > 200 ? (
                  <p className="text-white text-lg">{product?.product_description?.slice(0, 200)}...</p>
                ) : (
                  <p className="text-white text-lg">{product?.product_description}</p>
                )
               }
               <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-[#FFD700] text-black px-12 py-2 mt-4 rounded-md">Yirebe</button>
              </div>
              <div className="image md:w-[60%] w-full h-full md:p-4 p-1 pb-12">
                <div                 onClick={() => navigate(`/product/${product._id}`)}
 className="w-full cursor-pointer h-full object-cover">
                  <img src={
                    product?.product_image 
                  } height={100} width={100} alt="" className="w-full h-[254px] object-contain" />
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
