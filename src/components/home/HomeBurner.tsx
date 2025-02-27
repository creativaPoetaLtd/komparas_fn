import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchParentCategoriesm } from "../../api/getAllCategories";
import { Phone } from "@phosphor-icons/react";
import { Menu, MenuProps } from 'antd';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getAllAds } from "../../api/ads";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

// Recursive function to generate menu items
const generateMenuItems = (categories: any[]): MenuItem[] => {
  return categories.map((category) => {
    const hasChildren = category.children && category.children.length > 0;

    return getItem(
      category.name,
      category._id,
      <Phone className="text-green-500" />,
      hasChildren ? generateMenuItems(category.children) : undefined
    );
  });
};

const HomeBurner = () => {
  const [categories, setCategories] = useState<any>([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const navigate = useNavigate();
  const [ads, setAds] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchParentCategoriesm();
        setCategories(data?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getAllAds();
        setAds(response?.data?.advertisements);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoadingAds(false);
      }
    };
    fetchAds();
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

  const categoryItems = generateMenuItems(categories || []);

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

  let slider: Slider | null = null;

  return (
    <div className='bunnerPage mb-12 flex z-10 md:w-[100%] w-[92%] m-auto md:px-16 px-0'>
      {/* Categories Menu Skeleton */}
      <div className='sideCategories w-fit hidden bg-white lg:flex h-full'>
        {loadingCategories ? (
          <div className="flex flex-col space-y-2 mt-5 mr-2"> 
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton 
                key={index} 
                height={30} 
                width={180} 
                style={{ borderRadius: 2 }} 
              />
            ))}
          </div>
        ) : (
          <Menu
            style={{ width: 200, boxShadow: 'white', border: 'none', borderRight: "white", marginTop:12 }}
            mode="vertical"
            items={categoryItems}
            onClick={handleMenuClick}
          />
        )}
      </div>

      {/* Ads Slider Skeleton */}
      {loadingAds ? (
        <Slider {...sliderSettings} className='lg:w-[80%] w-[100%] self-center h-full'>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="w-full flex justify-center">
            <Skeleton height={300} width="100%" style={{ marginTop: 14 }} />
          </div>
        ))}
      </Slider>
      ) : (
        <Slider {...sliderSettings} className='lg:w-[80%] w-[100%] self-center h-full' ref={sliderRef => slider = sliderRef}>
          {ads.map((ad: any) => (
            <div key={ad._id} className={`relative bunnerPAgeDiv lg:w-3/4 w-[90%] ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} mt-6 md:h-full h-[35rem] md:py-4 py-4 md:pl-4 pl-0 px-0`}>
              <div className={`mainPage flex md:flex-row flex-col md:h-[275px] h-fit relative`}>
                <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
                  {ad?.description?.length > 200 ? (
                    <p className="text-white text-lg">{ad?.description?.slice(0, 200)}...</p>
                  ) : (
                    <p className="text-white text-lg">{ad?.description}</p>
                  )}
                  <button
                    onClick={() => {
                      if (ad?.product_id) {
                        navigate(`/product/${ad.product_id}`);
                      } else if (ad.shop_id) {
                        navigate(`/shop/${ad.shop_id}`);
                      } else if (ad.service_id) {
                        navigate(`/services/${ad.service_id}`);
                      } else {
                        navigate(`/`);
                      }
                    }}
                    className="bg-[#FFD700] text-black px-12 py-2 mt-4 rounded-md"
                  >
                    Yirebe
                  </button>
                </div>
                <div
                  onClick={() => {
                    if (ad.product_id) {
                      navigate(`/product/${ad.product_id}`);
                    } else if (ad.shop_id) {
                      navigate(`/shop/${ad.shop_id}`);
                    } else if (ad.service_id) {
                      navigate(`/services/${ad.service_id}`);
                    } else {
                      navigate("/");
                    }
                  }}
                  className="image md:w-[60%] w-full h-full md:p-4 p-1 pb-12"
                >
                  <div
                    onClick={() => {
                      if (ad.product_id) {
                        navigate(`/product/${ad.product_id}`);
                      }
                      if (ad.shop_id) {
                        navigate(`/shop/${ad.shop_id}`);
                      } else if (ad.service_id) {
                        navigate(`/services/${ad.service_id}`);
                      } else {
                        navigate("/");
                      }
                    }}
                    className="w-full cursor-pointer h-full object-cover"
                  >
                    <img src={ad?.image} height={100} width={100} alt="" className="w-full h-[254px] object-contain" />
                  </div>
                </div>
              </div>
              <button className="absolute top-1/2 left-2" onClick={prevSlide}>
                <CiCircleChevLeft className="bg bg-gray-300 rounded-full hover:bg-slate-800" />
              </button>
              <button className="absolute top-1/2 right-2" onClick={nextSlide}>
                <CiCircleChevRight className="bg bg-gray-300 rounded-full hover:bg-slate-800" />
              </button>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeBurner;