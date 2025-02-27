import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import { Phone } from '@phosphor-icons/react';
import { isAdminFromLocalStorage } from '../Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SlidingCards: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response?.data?.products?.reverse() || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button className="slick-arrow absolute -bottom-8 md:flex hidden md:right-6 right-0 z-10 text-gray-900 rounded-full w-8 h-8 items-center justify-center" onClick={onClick}>
        <GoArrowRight />
      </button>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button className="slick-arrow absolute -bottom-8 md:flex hidden right-14 z-10 text-gray-900 rounded-full w-8 h-8 items-center justify-center" onClick={onClick}>
        <GoArrowLeft />
      </button>
    );
  };

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } }
    ],
  };

  const navigate = useNavigate();
  const handleViewAllProducts = () => {
    navigate("/products");
  };

  return (
    <div className="lg:w-[96%] z-0 w-full justify-center self-center py-8 lg:mt-4 md:mt-4 xl:mt-4 2xl:mt-4 mt-[1%] flex-col lg:relative block px-3">
      {loading ? (
        <Slider {...settings} className="flex justify-center">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="bg-white p-2 md:px-6 px-3 rounded-md max-w-xs sm:max-w-sm w-full"
          >
            <div className="flex flex-col space-y-2 py-2 rounded-md border-gray-300 border-[1px] items-center justify-center">
              <Skeleton className="w-32 h-36 sm:w-40 sm:h-44 md:w-44 md:h-52" />
              <Skeleton className="w-24 h-5 sm:w-28" />
              <Skeleton className="w-20 h-4 sm:w-24" />
              <Skeleton className="w-24 h-5 sm:w-28" />
            </div>
          </div>
        ))}
      </Slider>      
      ) : products.length > 0 ? (
        <Slider {...settings} className="flex justify-center">
          {products.slice(0, 7).map((product) => (
            <Link key={product?._id} className="bg-white p-2 md:px-6 px-3 rounded-md" to={`/product/${product?._id}`}>
              <div className="flex flex-col space-y-2 py-2 rounded-md border-gray-300 border-[1px] items-center justify-center">
                {product?.product_image ? (
                  <div className="flex justify-center w-[172px] h-[152px] self-center">
                    <img src={product?.product_image} height={152} width={172} alt="" className="h-full w-full object-contain mb-4" />
                  </div>
                ) : (
                  <Phone className="text-5xl" />
                )}
                <p className="flex text-sm font-semibold">{product?.product_name}</p>
                <p className="flex text-sm text-red-500 mt-1 line-through">
                  {product?.vendor_prices?.length >= 1 &&
                    product?.vendor_prices
                      ?.reduce((prev: any, current: any) => (prev.price < current.price ? prev : current))
                      .price.toLocaleString("en-US", { maximumFractionDigits: 4 })}{" "}
                  Rwf
                </p>
                <h1 className="realprice text-green-500 text-sm font-semibold">
                  Igiciro: {product?.our_price.toLocaleString("en-US", { maximumFractionDigits: 4 })} Rwf
                </h1>
              </div>
            </Link>
          ))}
        </Slider>
      ) : null}

      <div className="flex justify-center mt-12 w-full">
        <button
          className={`${isAdminFromLocalStorage() ? "bg-[#848482]" : "bg-[#0C203B]"} text-white p-2 text-sm rounded-md underline underline-offset-4`}
          onClick={handleViewAllProducts}
        >
          Reba zose
        </button>
      </div>
    </div>
  );
};

export default SlidingCards;
