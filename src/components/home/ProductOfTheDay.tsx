import { useEffect, useState } from "react";
import {
  addDayProduct,
  getDayProduct,
  updateDayProduct,
} from "../../api/offer";
import { UploadSimple } from "@phosphor-icons/react";
import { getAllProducts } from "../../api/product";
import { getAllShops } from "../../api/getAllShops";
import React from "react";
import { Link } from "react-router-dom";
import { isAdminFromLocalStorage } from "../Footer";
interface ProductOfTheDayProps {
  productData: any;
}
const ProductOfTheDay: React.FC<ProductOfTheDayProps> = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dayProduct, setDayProduct] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const [products, setProducts] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchDayProduct = async () => {
      const data = await getDayProduct();
      setDayProduct(data?.data?.dayProducts);
    };
    fetchDayProduct();
  }, [refresh]);
  const [newImageData, setNewImageData] = useState({
    name: "",
    description: "",
    offer: "",
    price: "",
    image: undefined,
    product: "",
    shop: "",
  });
  const [shops, setShops] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const response = await getAllShops();
      setShops(response?.data);
    };
    fetchShops();
  }, []);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImageData((prevFormData: any) => ({
        ...prevFormData,
        image: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };
  const handleSubmit = async () => {
    try {
      if (dayProduct.length > 0) {
        setLoading(true);
        const updatedData = {
          name: newImageData.name || dayProduct[0].name,
          description: newImageData.description || dayProduct[0].description,
          offer: newImageData.offer || dayProduct[0].offer,
          price: newImageData.price || dayProduct[0].price,
          image: newImageData.image || dayProduct[0].image,
          product: newImageData.product || dayProduct[0].product,
          shop: newImageData?.shop || dayProduct[0].shop,
        };
        await updateDayProduct(updatedData);
      } else {
        await addDayProduct(newImageData);
      }
      setNewImageData({
        name: "",
        description: "",
        offer: "",
        price: "",
        image: undefined,
        product: "",
        shop: "",
      });
      handleRefresh();
      setLoading(false);
      setIsFormVisible(false);
    } catch (error) {
      handleRefresh();
      setLoading(false);
    }
    handleRefresh();
    setLoading(false);
  };

  const handleCancel = () => {
    setNewImageData({
      name: "",
      description: "",
      offer: "",
      price: "",
      image: undefined,
      product: "",
      shop: "",
    });
    setIsFormVisible(false);
  };

  const handleImageUpload = () => {
    const image: HTMLElement | null = document.getElementById("image");
    image?.click();
  };

  return (
    <div className="flex flex-col w-full lg:px-[4.5rem] lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-12 px-2">
      <div
        className={`mainPage flex md:flex-row flex-col justify-between ${
          isAdminFromLocalStorage() ? "bg-[#848482]" : "bg-[#0C203B]"
        } h-[100vh] md:h-full relative md:px-20 px-6 pt-2 sm:pt-6`}
      >
        <div className="mainPageContent md:w-[60%] w-full min-h-fit md:h-full md:p-12 px-1 py-3 my-auto sm:justify-center justify-start flex flex-col">
          <div className="flex">
            <p className="text-[#b6b4b4] text-3xl md:ml-1 my-auto font-thin justify-center">
              Telefoni y'umunsi
            </p>
          </div>
          <p className="lg:text-4xl md:text-3xl text-2xl mt-2 md:mt-6 text-white">
            {dayProduct[0]?.name}
          </p>
          <p className="text-[#b6b4b4] text-sm font-thin my-1 md:my-4">
            {dayProduct[0]?.description}
          </p>
          <Link
            to={
              dayProduct[0]?.shop?._id
                ? `/product/${dayProduct[0]?.product?._id}/shop/${dayProduct[0]?.shop?._id}?shop=shop`
                : `/product/${dayProduct[0]?.product?._id}`
            }
            className={`flex space-x-2 rounded w-fit h-fit bg-[#EDB62E] ${
              dayProduct[0]?.shop?._id
                ? "p-2 px-4 mt-2 text-sm"
                : "px-12 py-2 mt-4 text-base"
            }`}
          >
            <p>{dayProduct[0]?.shop?._id ? "Reba aho wayigurira" : "Yirebe"}</p>
          </Link>
        </div>
        
        <div className="image w-full h-3/4 md:w-[406px] md:h-[568px] pt-4 pb-14 overflow-hidden">
          <div className="w-full h-full object-cover">
            <img
              src={dayProduct[0]?.image}
              height={998}
              width={406}
              alt=""
              className="w-[406px] object-contain h-full"
            />
          </div>
          {isAdminFromLocalStorage() && (
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-[#EDB62E] absolute right-3 bottom-2 text-white px-4 py-2 rounded mt-4"
            >
              Upload New Product
            </button>
          )}
        </div>
      </div>
      {isFormVisible && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 flex flex-col z-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Upload New Product</h2>
            <div className="flex w-full space-x-9">
              <div className="laptop:w-full desktop:w-full tablet:w-full laptop:mt-0 tablet:mt-0 desktop:mt-0  mt-2 justify-between w-[50%] flex felx-col space-y-4">
                <div className="flex flex-col w-full">
                  <label className="text-sm mb-1 font-normal text-grey-700 ">
                    Profile Image
                  </label>
                  {newImageData?.image ? (
                    <div className="relative w-full h-[250px]">
                      <img
                        src={imageUrl || ""}
                        width={300}
                        height={400}
                        alt="Selected Profile"
                        className="w-full h-full object-fill rounded-lg"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex flex-col text-center items-center justify-center m-auto w-full h-[250px] bg-grey-200 border-2  border-grey-500 rounded-lg relative hover:cursor-pointer "
                      onClick={handleImageUpload}
                    >
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <div className="absolute flex flex-col gap-5 items-center">
                        <UploadSimple color="#90A8A2" size={22} />
                        <p className="text-sm text-grey-700">Upload product</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-[50%] flex flex-col">
                <input
                  type="text"
                  placeholder="Name"
                  value={newImageData.name}
                  onChange={(e) =>
                    setNewImageData({ ...newImageData, name: e.target.value })
                  }
                  className="border border-gray-300 p-2 mb-4"
                />
                <input
                  type="text"
                  placeholder="Offer"
                  value={newImageData.offer}
                  onChange={(e) =>
                    setNewImageData({ ...newImageData, offer: e.target.value })
                  }
                  className="border border-gray-300 p-2 mb-4"
                />
                <input
                  type="number"
                  placeholder="price"
                  value={newImageData.price}
                  name="price"
                  onChange={(e) =>
                    setNewImageData({ ...newImageData, price: e.target.value })
                  }
                  className="border border-gray-300 p-2 mb-4"
                />
                <select
                  className="border border-gray-300 p-2 mb-4"
                  onChange={(e) =>
                    setNewImageData({
                      ...newImageData,
                      product: e.target.value,
                    })
                  }
                >
                  <option value="">Select related Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.product_name}
                    </option>
                  ))}
                </select>
                <select
                  className="border border-gray-300 p-2 mb-4"
                  onChange={(e) =>
                    setNewImageData({ ...newImageData, shop: e.target.value })
                  }
                >
                  <option value="">Select related Shop</option>
                  {shops?.map((shop) => (
                    <option key={shop._id} value={shop._id}>
                      {shop.name}
                    </option>
                  ))}
                  <option value="NA">N/A</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={newImageData.description}
                  onChange={(e) =>
                    setNewImageData({
                      ...newImageData,
                      description: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 mb-4"
                ></textarea>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 w-fit justify-end self-end flex items-end text-white px-4 py-2 rounded"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            <button
              onClick={() => {
                setIsFormVisible(false);
                handleCancel();
              }}
              className="bg-gray-300 w-fit justify-end mt-3 self-end flex items-end text-gray-700 px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOfTheDay;
