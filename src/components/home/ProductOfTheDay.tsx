import { useEffect, useState } from "react";
import { addDayProduct, getDayProduct, updateDayProduct } from "../../api/offer";
import { UploadSimple } from "@phosphor-icons/react";
import { getAllProducts } from "../../api/product";
import React from "react";
import { Link } from "react-router-dom";
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
  }
  const [products, setProducts] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products);
    }
    fetchProducts();
  }
    , []);
  const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;
  useEffect(() => {
    const fetchDayProduct = async () => {
      const data = await getDayProduct();
      setDayProduct(data?.data?.dayProducts);
    };
    fetchDayProduct();
  }
    , [refresh]);
  const [newImageData, setNewImageData] = useState({
    name: "",
    description: "",
    offer: "",
    price: "",
    image: undefined,
    product: ""
  });
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
          product: newImageData.product || dayProduct[0].product
        };
        await updateDayProduct(updatedData);
      } else {
        await addDayProduct(newImageData);
      }
      // Clear the form after submitting
      setNewImageData({
        name: "",
        description: "",
        offer: "",
        price: "",
        image: undefined,
        product: ""
      });
      handleRefresh();
      setLoading(false);
        setIsFormVisible(false)

    } catch (error) {
      handleRefresh();
      setLoading(false);
    }
    handleRefresh();
    setLoading(false);

  };

  const handleCancel = () => {
    // Clear the form on cancel
    setNewImageData({
      name: "",
      description: "",
      offer: "",
      price: "",
      image: undefined,
      product: ""
    });
    setIsFormVisible(false);
  };

  const handleImageUpload = () => {
    const image: HTMLElement | null =
      document.getElementById("image");
    image?.click();
  };

  return (
    <div className='bunner flex flex-col self-center m-auto justify-center lg:w-[94%] w-full lg:h-[632px] h-full p-4 pl-4'>
      <div className={`mainPage  flex md:flex-row flex-col justify-between ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"}  h-full relative md:px-20 px-6 pt-6`}>
        <div className='mainPageContent md:w-[60%] w-full h-full md:p-12 p-1 my-auto justify-center flex flex-col'>
          <div className='flex'>
            <p className='text-[#FFFFFF] text-sm md:ml-1 my-auto font-thin justify-center'>Telefoni y'umunsi</p>
          </div>
          <p className='lg:text-4xl md:text-3xl text-2xl md:mt-6 mt-5 text-white'>
            {dayProduct[0]?.name}
          </p>
          <p className='text-[#FFFFFF] text-sm mt-2 font-thin '>
            {dayProduct[0]?.description}
          </p>
          <Link to={`/product/${dayProduct[0]?.product?._id}`} className="flex space-x-2 p-2 px-4 rounded w-fit h-fit text-sm mt-2 bg-[#EDB62E]">
            <p className="">Reba aho wayigurira</p>
          </Link>
        </div>
        <div className="image md:w-[40%] w-full h-full pt-4 pbm-12">
          <div className="w-full h-full object-cover">
            <img src={dayProduct[0]?.image} height={998} width={406} alt="" className="w-[406px] object-contain h-full" />
          </div>
          {isAdminFromLocalStorage && (
            <button onClick={() => setIsFormVisible(true)} className="bg-[#EDB62E] absolute right-3 bottom-2 text-white px-4 py-2 rounded mt-4">Upload New Product</button>
          )}
          {/* <button onClick={() => setIsFormVisible(true)} className="bg-[#EDB62E] absolute right-3 bottom-2 text-white px-4 py-2 rounded mt-4">Upload New Product</button> */}
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
                        <UploadSimple
                          color="#90A8A2"
                          size={22}
                        />
                        <p className="text-sm text-grey-700">
                          Upload product
                        </p>
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
                  onChange={(e) => setNewImageData({ ...newImageData, name: e.target.value })}
                  className="border border-gray-300 p-2 mb-4"
                />
                <input
                  type="text"
                  placeholder="Offer"
                  value={newImageData.offer}
                  onChange={(e) => setNewImageData({ ...newImageData, offer: e.target.value })}
                  className="border border-gray-300 p-2 mb-4"
                />
                <input
                  type="number"
                  placeholder="price"
                  value={newImageData.price}
                  name="price"
                  onChange={(e) => setNewImageData({ ...newImageData, price: e.target.value })}
                  className="border border-gray-300 p-2 mb-4"
                />
                 <select
                  className="border border-gray-300 p-2 mb-4"
                  onChange={(e) => setNewImageData({ ...newImageData, product: e.target.value })}
                >
                  <option value="">Select related Product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.product_name}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Description"
                  value={newImageData.description}
                  onChange={(e) => setNewImageData({ ...newImageData, description: e.target.value })}
                  className="border border-gray-300 p-2 mb-4"
                ></textarea>
              </div>
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 w-fit justify-end self-end flex items-end text-white px-4 py-2 rounded">
              {
                loading ? "Loading..." : "Submit"
              }
            </button>
            <button onClick={() => {
              setIsFormVisible(false)
              handleCancel()
            }} className="bg-gray-300 w-fit justify-end mt-3 self-end flex items-end text-gray-700 px-4 py-2 rounded ml-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductOfTheDay;