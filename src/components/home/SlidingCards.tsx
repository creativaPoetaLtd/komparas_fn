import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import './slidingCards.css'; // Import the custom CSS file

const SlidingCards: React.FC = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products?.reverse());
    };
    fetchProducts();
  }, []);

  const isAdminFromLocalStorag: any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;

  const navigate = useNavigate();
  const handleViewAllProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <div className="lg:w-[89%] z-0 w-full justify-center self-center py-12 lg:mt-0 md:mt-0 xl:mt-0 2xl:mt-0 mt-[1%] md:px-[4rem] flex-col lg:relative block px-3">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.5}
          pagination={{ clickable: true }}
          className="w-full h-full flex justify-center absolutex items-center"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2.8,
            },
            1024: {
              slidesPerView: 4.5,
            },
          }}
        >
          {products?.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link
                className="p-2 relative justify-end text-end items-end flex flex-col rounded-md border-[1px] border-gray-300"
                to={`/product/${slide?._id}`}
              >
                <div className="offerCircle absolute top-0 right-0 bg-[#EDB62E] justify-center m-auto flex items-center text-sm text-white p-1 h-12 border-2 border-white w-12 rounded-full">
                  {Math.ceil(
                    (1 -
                      slide?.our_price /
                        slide?.vendor_prices?.reduce((prev: any, current: any) =>
                          prev.price < current.price ? prev : current
                        ).price) *
                      100
                  )}
                  %
                </div>
                <div className="flex justify-center self-center">
                  <img
                    src={slide.product_image}
                    height={152}
                    width={172}
                    alt=""
                    className="w-[172px] h-[152px] object-contain mb-4"
                  />
                </div>
                <p className="flex text-sm font-semibold">{slide?.product_name}</p>
                <p className="flex text-sm text-red-500 mt-1 line-through">
                  {slide.vendor_prices
                    ?.reduce((prev: any, current: any) =>
                      prev.price < current.price ? prev : current
                    )
                    .price.toLocaleString("en-US", { maximumFractionDigits: 4 })}{" "}
                  Rwf
                </p>
                <h1 className="realprice text-green-500 text-sm font-semibold">
                  Igiciro:{" "}
                  {slide?.our_price.toLocaleString("en-US", { maximumFractionDigits: 4 })} Rwf
                </h1>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation buttons, shown only on large screens */}
        <div className="swiper-button-prev custom-swiper-button -z-10 lg:text-green-600 text-white"></div>
        <div className="swiper-button-next custom-swiper-button -z-10 lg:text-green-600 text-white"></div>
      </div>
      <div className="flex justify-center mt-4 w-full">
        <button
          className={`${
            !isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"
          } text-white p-2 text-sm rounded-md underline underline-offset-4`}
          onClick={handleViewAllProducts}
        >
          Reba zose
        </button>
      </div>
    </>
  );
};

export default SlidingCards;
