import React, { useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { Link, useParams } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import AddOtheShopsModal from './AddingOtherShopsModel';
import { removeShopFromProduct } from '../../api/shops';

interface Product {
  products: any;
}

const MainProductPage: React.FC<Product> = ({ products }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId }: any = useParams();

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % products?.product?.product_images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + products?.product?.product_images.length) % products?.product?.product_images.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
  });

  const handleAddShop = (shop: { vendor_id: string; price: number; colors: string[] }) => {
    const updatedProducts = { ...products };
    updatedProducts.product.vendors.push({ name: shop.vendor_id, _id: Math.random().toString() });
    updatedProducts.product.vendor_prices.push({
      vendor_id: Math.random().toString(),
      price: shop.price,
      colors: shop.colors,
    });
  };

  const deleteShopFromProduct = async (shopId: string) => {
    try {
      await removeShopFromProduct(productId, shopId);
      window.location.reload();
      const updatedProducts = { ...products };
      updatedProducts.product.vendors = updatedProducts.product.vendors.filter(
        (shop: any) => shop._id !== shopId
      );
      updatedProducts.product.vendor_prices = updatedProducts.product.vendor_prices.filter(
        (price: any) => price.vendor_id !== shopId
      );
    } catch (error) {
      console.error('Failed to delete shop:', error);
    }
  }



  return (
    <div className='w-full pl-0 flex flex-col h-fit'>
      <div className="w-full h-fit flex lg:flex-row flex-col ">
        <div className="flex md:flex-row flex-col lg:w-[50%] w-full m-auto justify-center items-center h-full">
          <div className="md:flex hidden md:[w-20%] md:h-[450px] md:space-y-4 space-y-0 py-4 md:overflow-y-auto w-full md:flex-col justify-between">
            {products?.product?.product_images?.map((image: any, index: number) => (
              <div key={index} className={`otherImages md:w-full w-[55px] items-start flex justify-start md:h-[138px] h-[50px] ${selectedImageIndex === index ? 'border-2x border-blue-50f0' : ''}`} onClick={() => handleImageClick(index)}>
                <img src={image.product_image} width={100} height={100} alt="" className={` ${selectedImageIndex === index ? 'border-2 border-yellow-600 rounded-md p-2' : ''} md:w-full w-[55px] md:h-[89px] h-[49px] object-contain`} />
              </div>
            ))}
          </div>
          <div className="md:w-[80%] w-full h-full">
            <div className='w-full mt-12'>
              <h1 className="text-xl w-full mt-12 justify-center items-center mx-auto text-center font-semibold">{products?.product?.product_name}</h1>
            </div>
            <div {...swipeHandlers} className="MainIMageDiv md:w-[500px] w-full md:h-[600px] h-[370px] flex m-auto justify-center items-center relative">
              <button onClick={handlePrevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-50 text-white px-2 py-1 rounded-md">
                <CiCircleChevLeft className="bg-green-300 text-2xl text-yellow-500 rounded-full hover:bg-green-800" />
              </button>
              <img src={products?.product?.product_images[selectedImageIndex]?.product_image} alt="" className="md:w-[446px] w-full md:h-[315px] h-full object-contain" />
              <button onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-50 text-white px-2 py-1 rounded-md">
                <CiCircleChevRight className="bg-green-300 text-2xl text-yellow-500 rounded-full hover:bg-green-800" />
              </button>
            </div>
          </div>
          <div className='md:hidden w-full overflow-x-auto'>
            <div className="md:hidden flex h-fit py-4 overflow-x-auto w-fit justify-between flex-row">
              {products?.product?.product_images?.map((image: any, index: number) => (
                <div key={index} className={`otherImages md:w-[170px] w-[95px] items-start flex justify-start md:h-[100px] h-[90px] ${selectedImageIndex === index ? 'bordedr-2 bordedr-blue-500' : ''}`} onClick={() => handleImageClick(index)}>
                  <img src={image.product_image} width={150} height={100} alt="" className={` ${selectedImageIndex === index ? 'border-2 border-green-600 rounded-md w-[70px] md:h-[89px] h-[75px]' : 'border-gray-600 border rounded-md'} md:w-[100px] p-[1px] w-[70px] md:h-[89px] h-[75px] object-contain`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex lg:flex-col md:flex-row sm:flex-col flex-col space-y-4 mx-auto items-start justify-start md:py-20 py-4 lg:w-[40%] w-full">
          <div className="md:w-[415px] w-full p-2 flex flex-col space-y-3">
            <div className='flex space-x-3'>
              {products?.product?.availableStorages?.map((storage: any, index: number) => (
                <div key={index} className="flex items-center justify-center text-sm w-fit px-2 py-1 h-fit border-2 border-black">
                  <p className="f font-bold">{storage?.value}</p>
                </div>
              ))}
            </div>
            <div className='flex space-x-3'>
              <h1 className="text-base text-red-500 font-light line-through">
                {products?.product?.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price.toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
              </h1>
              <div className='flex flex-col self-end mt-3 justify-center items-center space-x-2'>
                <h1 className='realprice font-semibold text-green-500'>
                  {products?.product?.our_price.toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                </h1>
                <p className='text-sm text-center items-center text-gray-400'>Ukoresheje Code ya Komparas</p>
              </div>
            </div>
            <p className="text-sm text-justify">{products?.product?.product_description}</p>
          </div>
          <div className="line md:w-[412px] w-full h-[1px] md:hidden flex lg:flex bg-[#EDB62E]"></div>
          <div className="flex flex-col text-sm shopTable">
            <table className="w-full">
              <thead>
                <p className="text-green-500 px-2 item-start m-auto text-start">Aho wayisanga</p>
              </thead>
              <tbody>
                {products?.product?.vendors?.map((shop: any, index: number) => (
                  <tr key={index + 12}>
                    <td className="text-[#353535] item-start m-auto p-2">{shop?.name}</td>
                    {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                      price?.vendor_id === shop?._id && (
                        <td key={priceIndex} className="text-[#353535] item-start m-auto p-2">
                          {price?.price}
                        </td>
                      )
                    ))}
                    {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                      price?.vendor_id === shop?._id && (
                        <>
                          {price?.colors.length >= 1 && (
                            <td key={priceIndex} className="text-[#353535] flex item-start m-auto p-2">
                              {JSON.parse(JSON.stringify(price?.colors).replace(/[\"\#]+/g, '').replace(/(\w+)/g, '"$1"')).map((color: any, colorIndex: number) => (
                                <div key={colorIndex} style={{
                                  backgroundColor: `${color ? color : '#0a0a0a'}`,
                                }} className={`bg-[#${color ? color : '#0a0a0a'}] rounded-full h-4 flex w-4 m-1`}></div>
                              ))}
                            </td>
                          )}
                          {price?.colors?.length <= 0 && (
                            <td key={priceIndex} className="text-[#353535] flex item-start m-auto p-2">
                              {[...Array(4).keys()].map((_, index) => (
                                <div key={index} style={{
                                  backgroundColor: `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0').slice(0, 6).toUpperCase()
                                    }`
                                }} className={`bg-[#0a0a0a] rounded-full h-4 flex w-4 m-1`}></div>
                              ))}
                            </td>
                          )}
                          {products?.product?.vendor_prices?.map((price: any, priceIndex: number) => (
                            price?.vendor_id === shop?._id && (
                              <td key={priceIndex} className="text-[#353535] item-start m-auto p-r2">
                                <Link to={`shop/${shop?._id}`} className="bg-black text-yellow-500 px-2 py-1 rounded-md">Yirebe</Link>
                                <button className='deleteButton bg-red-500 ml-2 text-white px-2 py-1 rounded-md'
                                  onClick={() => deleteShopFromProduct(shop?._id)}> X </button>
                              </td>
                            )
                          ))}

                        </>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
        className="bg-black text-yellow-500 px-2 py-1 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Add Other Shops
      </button>
      {/* Modal Component */}
      <AddOtheShopsModal

              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddShop={handleAddShop} productId={productId}      />          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductPage;
