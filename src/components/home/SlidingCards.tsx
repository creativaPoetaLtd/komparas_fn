import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import { toast } from 'react-toastify';


const SlidingCards: React.FC = () => {
  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      console.log('SlidingCards', response);
      
      setProducts(response?.data?.products);
    }
    fetchProducts();
  }
  ,[]);

  const navigate = useNavigate();
  const handleViewAllProducts = () => {
    if (localStorage.getItem("KomparasLoginsInfo")) {
        navigate("/products");
    } else {
        toast.error("You need to login to view all products");
        navigate("/login");
        }
    }

  
  return (
    <div className="w-full py-12 lg:mt-0 md:mt-0 xl:mt-0 2xl:mt-0 mt-[35%]">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='w-full h-full flex justify-center items-center px-12 '
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {products?.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link className="p-4 flex flex-col rounded-md border-[1px] border-gray-300" to={`/product/${slide?._id}`}>
              <div className="flex justify-center">
                <img src={slide?.product_image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-cover mb-4" />
              </div>
              <p className='flex text-sm'>{slide?.product_name}</p>
              <p className='flex text-sm text-[#EDB62E] mt-1'>Shops({slide?.vendor_prices.length})</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='flex justify-center mt-12 w-full'>
        <button className='bg-[#0C203B] text-white p-2 rounded-md' onClick={handleViewAllProducts}>View All Products</button>
      </div>
    </div>
  );
};

export default SlidingCards;
