import { ArrowRight, UploadSimple } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { addDayProduct2, getDayProduct2, updateDayProduct2 } from '../../api/offer';

const Time2 = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const [dayProduct, setDayProduct] = useState<any>([]);
    const [refresh, setRefresh] = useState(false);
  
    const handleRefresh = () => {
      setRefresh(!refresh);
    }
  
  
    useEffect(() => {
      const fetchDayProduct = async () => {
        const data = await getDayProduct2();
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
      image: undefined
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
    const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;
  
    
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
          };
          await updateDayProduct2(updatedData);
        } else {
          await addDayProduct2(newImageData);
        }
        // Clear the form after submitting
        setNewImageData({
          name: "",
          description: "",
          offer: "",
          price: "",
          image: undefined
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
        image: undefined
      });
      setIsFormVisible(false);
    };
  
    const handleImageUpload = () => {
      const image: HTMLElement | null =
        document.getElementById("image");
      image?.click();
    };
  return (
    <div className=' relative h-[50%] sm:h-[50%] lg:h-[50%] 2xl:h-[50%] md:h-[100%] w-full flex p-4 bg-[#F2F4F5]'>
    <div className="image w-[50%] h-full pl-2 relative">
        <div className="w-[140px]  h-[160px] object-cover flex justify-start self-start float-left">
            <img src={ dayProduct[0]?.image } height={160} width={160} alt="" className="w-full flex justify-start items-start self-start float-left h-full " />
        </div>
    </div>
    {
        isAdminFromLocalStorage && (
            <button onClick={() => setIsFormVisible(true)} className="absolute bottom-1 right-1 bg-black text-white p-1 text-sm rounded-md">Add Product</button>
        )
    }

    <div className='mainPageContent pl-2 items-start flex flex-col justify-start w-[50%] h-full pr-1 py-2'>
        <p className='text-xl mt-1 '>
       {dayProduct[0]?.name}
        </p>
        <div className='flex justify-center text-start'>
            <p className=' font-thin justify-start text-start flex'>{dayProduct[0]?.price} Rwf</p>
        </div>
        <button className="flex space-x-2 rounded-md text-sm mt-6 md:p-3 p-2 md:px-4 px-2 font-semibold bg-[#EDB62E] text-white">
            <p className="">View More</p>
            <ArrowRight className="m-auto justify-center" />
        </button>
    </div>
    {isFormVisible && (
        <div className="fixed top-0 left-0 z-50 w-[55%] h-full bg-black bg-opacity-50 flex items-center justify-center">
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

export default Time2