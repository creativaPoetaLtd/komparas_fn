import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import { Phone } from '@phosphor-icons/react';
import { isAdminFromLocalStorage } from '../Footer';

const SlidingCards: React.FC = () => {
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow absolute -bottom-8 md:flex hidden md:right-6 right-0 z-10 text-gray-900 rounded-full w-8 h-8 items-center justify-center"
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
        className="slick-arrow absolute -bottom-8 md:flex hidden right-14 z-10 text-gray-900 rounded-full w-8 h-8  items-center justify-center"
        onClick={onClick}
      >
        <GoArrowLeft />
      </button>
    );
  };
  const settings: { current: number, prevArrow: any, nextArrow: any, responsive: any, dots: boolean, dotsClass: string, infinite: boolean, speed: number, slidesToShow: number, slidesToScroll: number, autoplay: boolean, autoplaySpeed: number, pauseOnHover: boolean } = {
    current: 0,
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
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products?.reverse());
    };
    fetchProducts();
  }, []);


  const navigate = useNavigate();
  const handleViewAllProducts = () => {
    navigate("/products");
  };

  return (
    <div className="lg:w-[96%] z-0 w-full justify-center self-center py-12 lg:mt-4 md:mt-4 xl:mt-4 2xl:mt-4 mt-[1%] m  flex-col lg:relative block px-3">
      {products.length > 0 ? (
        <Slider {...settings}
          className="flex justify-center"
        >
          {products.slice(0,7).map((product: any) => (
            <Link key={product?._id} className="bg-white p-2 md:px-6 px-3  rounded-md "  to={`/product/${product?._id}`}>
              <div className="flex flex-col space-y-2 py-2 rounded-md border-gray-300 border-[1px] items-center justify-center">
                {product?.product_image ? (
                  <div className="flex justify-center w-[172px] h-[152px] self-center">
                    <img
                      src={product?.product_image}
                      height={152}
                      width={172}
                      alt=""
                      className=" h-full w-full object-contain mb-4"
                    />
                  </div>) : (
                  <Phone className="text-5xl" />
                )} 
                <p className="flex text-sm font-semibold">{product?.product_name}</p>
                 <p className="flex text-sm text-red-500 mt-1 line-through">
                   {product?.vendor_prices?.length >=1 && product?.vendor_prices
                    ?.reduce((prev: any, current: any) =>
                      prev.price < current.price ? prev : current
                    )
                    .price.toLocaleString("en-US", { maximumFractionDigits: 4 })}{" "}
                  Rwf
                </p>
                <h1 className="realprice text-green-500 text-sm font-semibold">
                  Igiciro:{" "}
                  {product?.our_price.toLocaleString("en-US", { maximumFractionDigits: 4 })} Rwf
                </h1>
              </div>
            </Link>
          ))}
        </Slider>
      ) : (
        <div className="loading flex justify-center items-center h-40">
          <div className="loader"></div>
        </div>
      )}

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