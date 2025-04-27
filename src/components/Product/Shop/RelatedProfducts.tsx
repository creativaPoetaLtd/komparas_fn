import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const RelatedProfducts = ({ shopProducts, vendorID }: any) => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  const hasProducts = shopProducts?.data?.products?.length > 0;

  return (
    <div className="flex w-full flex-col mb-2">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-2">
        <div className='flex flex-col md:px-4 px-3'>
            <div className="flex justify-start items-start">
                <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]"></div>
                <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">
                  Izindi telephone dufite
                </h1>
            </div>
        </div>
        {hasProducts && shopProducts?.data?.products.length > 3 && (
          <Link 
            to={`/products?shopId=${vendorID}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Reba zose →
          </Link>
        )}
      </div>

      {/* Products Display */}
      {!hasProducts ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Nta telefone zihari ubu</p>
        </div>
      ) : shopProducts?.data?.products.length > 2 ? (
        <Slider {...settings} className="pb-4">
          {shopProducts?.data?.products?.slice(0, 6).map((product: any) => 
            product?.vendor_prices?.map((vendor: any) => (
              vendor?.vendor_id === vendorID && (
                <div key={product?._id} className="px-2">
                  <ProductCard product={product} vendor={vendor} />
                </div>
              )
            ))
          )}
        </Slider>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {shopProducts?.data?.products?.map((product: any) => 
            product?.vendor_prices?.map((vendor: any) => (
              vendor?.vendor_id === vendorID && (
                <ProductCard key={product?._id} product={product} vendor={vendor} />
              )
            ))
          )}
        </div>
      )}

      {/* Mobile View: See All Button */}
      {hasProducts && shopProducts?.data?.products.length > 3 && (
        <div className="flex justify-center mt-6 md:hidden">
          <Link 
            to={`/products?shopId=${vendorID}`}
            className="bg-gray-800 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors duration-200"
          >
            Reba zose
          </Link>
        </div>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, vendor }: { product: any, vendor: any }) => (
  <Link to={`/product/${product?._id}`} className="block">
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col mb-2">
      {/* Image Container */}
      <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={product?.product_image} 
          alt={product?.product_name} 
          className="h-full object-contain" 
        />
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product?.product_name}
        </h3>
        
        {/* Price */}
        <p className="text-yellow-500 font-bold mb-2">
          RWF {vendor?.price?.toLocaleString() || "N/A"}
        </p>
        
        {/* Description */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-3">
          {product?.product_description || "No description available"}
        </p>
        
        {/* Button */}
        <div className="mt-auto">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-sm font-medium w-full transition-colors duration-200">
            Yimenye neza
          </button>
        </div>
      </div>
    </div>
  </Link>
);

export default RelatedProfducts;