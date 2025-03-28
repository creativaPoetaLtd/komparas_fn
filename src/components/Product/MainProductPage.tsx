import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Pencil } from "lucide-react";
import AddOtheShopsModal from "./AddingOtherShopsModel";
import { removeShopFromProduct } from "../../api/shops";
import { isAdminFromLocalStorage } from "../Footer";
import { updateProduct } from "../../api/product";

interface Product {
  products: any;
}

const MainProductPage: React.FC<Product> = ({ products }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId }: any = useParams();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async () => {
    try {
      const productId = products?.product._id;
      await updateProduct({ product_description: newDescription }, productId);
      closeEditModal();
    } catch (error) {
      console.error("Failed to update description:", error);
    }
  };

  useEffect(() => {
    if (products?.product?.product_description) {
      setNewDescription(products.product.product_description);
    }
  }, [products]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % products?.product?.product_images.length,
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + products?.product?.product_images.length) %
        products?.product?.product_images.length,
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextImage,
    onSwipedRight: handlePrevImage,
  });

  const handleAddShop = (shop: {
    vendor_id: string;
    price: number;
    colors: string[];
  }) => {
    const updatedProducts = { ...products };
    updatedProducts.product.vendors.push({
      name: shop.vendor_id,
      _id: Math.random().toString(),
    });
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
        (shop: any) => shop._id !== shopId,
      );
      updatedProducts.product.vendor_prices =
        updatedProducts.product.vendor_prices.filter(
          (price: any) => price.vendor_id !== shopId,
        );
    } catch (error) {
      console.error("Failed to delete shop:", error);
    }
  };

  return (
    <div className="w-full pl-0 flex flex-col h-fit">
      <div className="w-full h-fit flex lg:flex-row flex-col ">
        <div className="flex md:flex-row flex-col lg:w-[50%] w-full m-auto justify-center items-center h-full">
          <div className="md:flex hidden md:[w-20%] md:h-[450px] md:space-y-4 space-y-0 py-4 md:overflow-y-auto w-full md:flex-col justify-between">
            {products?.product?.product_images?.map(
              (image: any, index: number) => (
                <div
                  key={index}
                  className={`otherImages md:w-full w-[55px] items-start flex justify-start md:h-[138px] h-[50px] ${selectedImageIndex === index ? "border-2x border-blue-50f0" : ""}`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image.product_image}
                    width={100}
                    height={100}
                    alt=""
                    className={` ${selectedImageIndex === index ? "border-2 border-yellow-600 rounded-md p-2" : ""} md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain`}
                  />
                </div>
              ),
            )}
          </div>
          <div className="md:w-[80%] w-full h-full">
            <div className="w-full mt-12">
              <h1 className="text-xl w-full mt-12 justify-center items-center mx-auto text-center font-semibold">
                {products?.product?.product_name}
              </h1>
            </div>
            <div {...swipeHandlers} className="MainImageDiv md:w-[500px] w-full md:h-[600px] h-[370px] flex m-auto justify-center items-center relative">
  {/* Previous button with improved styling */}
  <button 
    onClick={handlePrevImage} 
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition-all duration-200 flex items-center justify-center"
    aria-label="Previous image"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  
  {/* Product image */}
  <img 
    src={products?.product?.product_images[selectedImageIndex]?.product_image} 
    alt="Product" 
    className="md:w-[446px] w-full md:h-[315px] h-full object-contain" 
  />
  
  {/* Next button with improved styling */}
  <button 
    onClick={handleNextImage} 
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-md transition-all duration-200 flex items-center justify-center"
    aria-label="Next image"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>
          </div>
          <div className="md:hidden w-full overflow-x-auto">
            <div className="md:hidden flex h-fit py-4 overflow-x-auto w-fit justify-between flex-row">
              {products?.product?.product_images?.map(
                (image: any, index: number) => (
                  <div
                    key={index}
                    className={`otherImages md:w-[170px] w-[95px] items-start flex justify-start md:h-[100px] h-[90px] ${selectedImageIndex === index ? "bordedr-2 bordedr-blue-500" : ""}`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image.product_image}
                      width={150}
                      height={100}
                      alt=""
                      className={` ${selectedImageIndex === index ? "border-2 border-green-600 rounded-md w-[70px] md:h-[89px] h-[75px]" : "border-gray-600 border rounded-md"} md:w-[100px] p-[1px] w-[70px] md:h-[89px] h-[75px] object-contain`}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="flex lg:flex-col md:flex-row sm:flex-col flex-col space-y-4 mx-auto items-start justify-start md:py-20 py-4 lg:w-[40%] w-full">
          <div className="md:w-[415px] w-full p-2 flex flex-col space-y-3">
            <div className="flex space-x-3">
              {products?.product?.availableStorages?.map(
                (storage: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-center text-sm w-fit px-2 py-1 h-fit border-2 border-black"
                  >
                    <p className="f font-bold">{storage?.value}</p>
                  </div>
                ),
              )}
            </div>
            <div className="flex space-x-3">
              {products?.product ? (
                (() => {
                  const vendorPrices =
                    products?.product?.vendor_prices?.map(
                      (vendor: any) => vendor.price,
                    ) || [];
                  const lowestVendorPrice =
                    vendorPrices.length > 0 ? Math.min(...vendorPrices) : null;
                  const ourPrice = products?.product?.our_price ?? 0;
                  const shouldShowDiscount =
                    lowestVendorPrice !== null && lowestVendorPrice < ourPrice;

                  return (
                    <>
                      {shouldShowDiscount && (
                        <h1 className="text-base text-red-500 font-light line-through">
                          {products?.product?.our_price.toLocaleString(
                            "en-US",
                            { maximumFractionDigits: 4 },
                          )}{" "}
                          Rwf
                        </h1>
                      )}
                      <div className="flex flex-col self-end mt-3 justify-center items-center space-x-2">
                        <h1 className="realprice font-semibold text-green-500">
                          {!shouldShowDiscount && "Igiciro: "}
                          {shouldShowDiscount
                            ? `${lowestVendorPrice?.toLocaleString("en-US", { maximumFractionDigits: 4 })} Rwf`
                            : `${(lowestVendorPrice !== null ? lowestVendorPrice : products?.product?.our_price).toLocaleString("en-US", { maximumFractionDigits: 4 })} Rwf`}
                        </h1>
                        <p className="text-sm text-center items-center text-gray-400">
                          Ukoresheje Code ya Komparas
                        </p>
                      </div>
                    </>
                  );
                })()
              ) : (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>
            <div>
              <p className="text-sm text-justify">
                {products?.product?.product_description}
              </p>
              {isAdminFromLocalStorage() && (
                <button
                  onClick={openEditModal}
                  className="text-blue-600 hover:text-blue-800 transition duration-200 mt-2"
                >
                  <Pencil size={16} />
                </button>
              )}

              {isEditModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      rows={4}
                      className="border p-2 w-full"
                    />
                    <div className="mt-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white p-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={closeEditModal}
                        className="bg-gray-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="line md:w-[412px] w-full h-[1px] md:hidden flex lg:flex bg-[#EDB62E]"></div>
          <div className="flex flex-col text-sm shopTable">
            <table className="w-full">
              <thead>
                <p className="text-green-500 px-2 item-start m-auto text-start">
                  Aho wayisanga
                </p>
              </thead>
              <tbody>
                {products?.product?.vendors
                  ?.sort((a: any, b: any) => {
                    const priceA =
                      products?.product?.vendor_prices?.find(
                        (p: any) => p.vendor_id === a._id,
                      )?.price || Infinity;
                    const priceB =
                      products?.product?.vendor_prices?.find(
                        (p: any) => p.vendor_id === b._id,
                      )?.price || Infinity;
                    return priceA - priceB;
                  })
                  ?.map((shop: any, index: number) => {
                    // Find the vendor price object for this shop
                    const vendorPrice = products?.product?.vendor_prices?.find(
                      (price: any) => price.vendor_id === shop._id,
                    );

                    return (
                      <tr key={index + 12}>
                        <td className="text-[#353535] item-start m-auto p-2">
                          {shop?.name}
                        </td>

                        {/* Display price with commas */}
                        <td className="text-[#353535] item-start m-auto p-2">
                          {vendorPrice?.price?.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          Rwf
                        </td>

                        {/* Display colors (if available)*/}
                        <td className="text-[#353535] flex item-start m-auto p-2">
                          {vendorPrice?.colors.length > 0 ? (
                            vendorPrice.colors.map(
                              (color: string, colorIndex: number) => (
                                <div
                                  key={colorIndex}
                                  style={{ backgroundColor: color }}
                                  className="rounded-full h-4 flex w-4 m-1"
                                ></div>
                              ),
                            )
                          ) : (
                            // Display purple color if no colors are available(this is not how it has to be this needs to be changes asap)
                            <div
                              style={{
                                backgroundColor: "#800080",
                              }}
                              className="rounded-full h-4 flex w-4 m-1"
                            ></div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="text-[#353535] item-start m-auto p-2">
                          <Link
                            to={`shop/${shop?._id}`}
                            className="bg-black text-yellow-500 px-2 py-1 rounded-md"
                          >
                            Yirebe
                          </Link>
                          {isAdminFromLocalStorage() && (
                            <button
                              className="deleteButton bg-red-500 ml-2 text-white px-2 py-1 rounded-md"
                              onClick={() => deleteShopFromProduct(shop?._id)}
                            >
                              X
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {isAdminFromLocalStorage() && (
              <button
                className="bg-black text-yellow-500 px-2 py-1 rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                Add Other Shops
              </button>
            )}
            <AddOtheShopsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAddShop={handleAddShop}
              productId={productId}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductPage;
