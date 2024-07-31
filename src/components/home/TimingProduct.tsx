/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { ArrowRight, UploadSimple } from '@phosphor-icons/react';
import { RxDividerHorizontal } from "react-icons/rx";
// import headset from '../../assets/headset.png'
// import image4 from '../../assets/image4.png'
import Time1 from './Time1';
import Time2 from './Time2';
import { addDayProduct3, getDayProduct3, updateDayProduct3 } from '../../api/offer';
import { getAllProducts } from '../../api/product';
import React from 'react';
import { Link } from 'react-router-dom';

const TimingProduct = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const [dayProduct, setDayProduct] = useState<any>([]);
    const [refresh, setRefresh] = useState(false);
  
    const handleRefresh = () => {
      setRefresh(!refresh);
    }
    const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
    const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;
    
  
    useEffect(() => {
      const fetchDayProduct = async () => {
        const data = await getDayProduct3();
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
            product: newImageData.product || dayProduct[0].product,
          };
          await updateDayProduct3(updatedData);
        } else {
          await addDayProduct3(newImageData);
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

    const [products, setProducts] = React.useState<any[]>([]);
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await getAllProducts();
        setProducts(response?.data?.products);
      }
      fetchProducts();
    }
      , []);
  
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
    // const calculateTimeLeft = () => {
    //     const difference = +new Date("2024-05-24") - +new Date();
    //     let timeLeft: any = {};

    //     if (difference > 0) {
    //         timeLeft = {
    //             days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //             hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //             minutes: Math.floor((difference / 1000 / 60) % 60),
    //             seconds: Math.floor((difference / 1000) % 60)
    //         };
    //     }

    //     return timeLeft;
    // };

    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // });

    return (
        <div className='flex  flex-col w-full lg:px-[4rem] px-2'>
            <div className='flex lg:flex-row md:flex-col flex-col w-full justify-between md:h-[520px] h-fit'>
                <div className='bunner lg:w-[63%] md:w-full w-full h-full  py-4 lg:pl-2 pl-2'>
                    <div className={`mainPage flex ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} pb-5 h-full relative`}>
                        {
                            isAdminFromLocalStorage && (
                                <button onClick={() => setIsFormVisible(true)} className="absolute text-xs bottom-1 right-1 bg-green-400 text-white p-1 rounded-lg mr-2 mt-2">Add Product</button>
                            )
                        }
                        
                        <div className='mainPageContent w-[50%] h-full lg:p-8 md:p-2 p-2'>
                            {/* <div className='timers md:p-2 p-1 md:w-[18rem] w-full justify-between  flex'>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.days}</div>
                                    <div className='label'> Iminsi</div>
                                </div>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.hours}</div>
                                    <div className='label'>Amasaha</div>
                                </div>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.minutes}</div>
                                    <div className='label'>Iminota</div>
                                </div>
                                <div className='timerCircle text-xs flex-col md:p-2 p-1 items-center bg-white flex rounded-full md:h-[62px] h-[55px] md:w-[62px] w-[55px] my-auto justify-center'>
                                    <div className='circle'>{timeLeft.seconds}</div>
                                    <div className='label text-[8px]'>Amasegonda</div>
                                </div>
                            </div> */}
                            <div className='flex mt-6'>
                                <RxDividerHorizontal className='text-white text-xl my-auto justify-center' />
                                <p className='text-white text-xs ml-1 my-auto font-thin justify-center'>HUZA N'ISI IGEZWEHO KUKO NAWE UGEZWEHO</p>
                            </div>
                            <p className='md:text-4xl text-2xl md:mt-6 mt-3 text-white'>
                                {dayProduct[0]?.name}
                            </p>
                            <p className='text-sm md:mt-6 mt-3 text-white'>
                                {dayProduct[0]?.description}
                            </p>
                            {/* <p className='text-sm mt-0 text-white'>
                                Listen, its powerful.
                            </p> */}
                            <Link to={`/product/${dayProduct[0]?.product?._id}`}  className="flex space-x-2 rounded-md text-sm md:mt-8 mt-3 md:p-3 p-2 px-4 font-semibold bg-[#EDB62E] text-white">
                                <p className="">Reba byose</p>
                                <ArrowRight className="m-auto justify-center" />
                            </Link>
                        </div>
                        <div className="image w-[50%] h-full pr-12 md:pt-32 pt-24 relative">
                            <div className='timerCircle text-xs absolute bg-[#EDB62E] md:top-[26px] top-3 md:right-16 right-3 flex-col p-2 items-center border-4 border-white flex rounded-full md:h-[100px] h-[80px] md:w-[100px] w-[80px] my-auto justify-center'>
                                <div className='label text-white text-xl font-semibold'>
                                    {dayProduct[0]?.price}Rwf
                                </div>
                            </div>
                            <div className="md:w-[250px] w-[180px] md:h-[275px] h-[200px] object-cover">
                                <img src={
                                    dayProduct[0]?.image
                                } height={100} width={100} alt="" className="w-full h-full " />
                            </div>
                        </div>
                        <div className="circles w-full absolute bottom-3 left-2 flex justify-start">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className={`w-2 h-2 rounded-full mx-1 bg-white cursor-pointer ${index === 3 ? 'bg-[#EDB62E]' : ''}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='sideCategories lg:w-[35%] w-full py-4 md:px-2 px-2 lg:space-y-6 md:space-y-0 sm:space-y-3 md:space-x-5 sm:space-x-0 lg:space-x-0 h-full flex md:flex-row sm:flex-col flex-col lg:flex-col 2xl:flex-col'>
                  <Time1 />
                  <Time2 />
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
                    Product Image
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
      )}
        </div>
    )
}

export default TimingProduct;
