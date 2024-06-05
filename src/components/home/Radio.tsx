import { useState, useEffect } from 'react';
import { ArrowRight, UploadSimple } from '@phosphor-icons/react';
// import Frame9 from '../../assets/Frame9.png';
import Modal from 'react-modal';
import { addDayProduct1, getDayProduct1, updateDayProduct1 } from '../../api/offer';
import { getAllProducts } from '../../api/product';
import React from 'react';

const RadioSection = () => {
  // const calculateTimeLeft = () => {
  //   const difference = +new Date("2024-05-24") - +new Date();
  //   let timeLeft: any = {};
  //   if (difference > 0) {
  //     timeLeft = {
  //       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //       minutes: Math.floor((difference / 1000 / 60) % 60),
  //       seconds: Math.floor((difference / 1000) % 60)
  //     };
  //   }
  //   return timeLeft;
  // };
  const [products, setProducts] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products);
    }
    fetchProducts();
  }
    , []);
  const prod3 = products[(products?.length) - 3]
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dayProduct, setDayProduct] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    const fetchDayProduct = async () => {
      const data = await getDayProduct1();
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
    product:""
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
       await updateDayProduct1(updatedData);
      } else {
       await addDayProduct1(newImageData);
      }
      // Clear the form after submitting
      setNewImageData({
        name: "",
        description: "",
        offer: "",
        price: "",
        image: undefined,
        product:''
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
      product:''
    });
    setIsFormVisible(false);
  };

  const handleImageUpload = () => {
    const image: HTMLElement | null =
      document.getElementById("image");
    image?.click();
  };

  const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;

  return (
    <div className='flex flex-col w-full lg:px-[4rem] lg:mt-0 2xl:mt-0 xl:mt-0 md:mt-96 px-2'>
      <div className='flex md:flex-row flex-col w-full justify-between md:h-[520px] h-fit'>
        <div className='bunner w-full h-full  py-4 lg:pl-1 pl-1'>
          <div className={`mainPage flex md:flex-row flex-col m-auto items-center ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"}  justify-between h-full relative`}>
            <div className='mainPageContent lg:w-[30%] md:w-[50%] w-full flex flex-col m-auto justify-center items-start h-full p-8'>

              <div className='flex mt-6'>
                <p className='my-auto font-thin text-[#EDB62E] justify-center'>
                  {prod3?.product_name}
                </p>
              </div>
              {prod3?.product_description && (
                <p className='text-sm mt-4 text-white'>
                  {prod3.product_description.length > 70 ? `${prod3.product_description.substring(0, 70)}...` : prod3.product_description}
                </p>
              )}
              <div className='timers py-5 justify-between flex w-full'>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                <p className="">Reba byose</p>
                <ArrowRight className="m-auto justify-center" />
              </button>
            </div>
            <div className="image md:w-[50%] w-full h-full  flex  justify-center items-center m-auto pt-5 relative">

              <div className="lg:w-[600px] lg:h-[420px] md:w-[359px] md:h-[218px] w-[358px] h-[217.39px] justify-center items-center m-auto object-cover">
                <img src={
                  prod3?.product_image
                } height={420} width={600} alt="" className="w-full h-full " />
                {/* <button onClick={() => setIsModalOpen(true)} className="bg-[#EDB62E] absolute right-3 bottom-2 text-white px-4 py-2 rounded mt-4">Update Info</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
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
                          Upload Profile
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
                  type="price"
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
                  <option value="">Select Product</option>
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
      </Modal>
    </div>
  );
};

export default RadioSection;
