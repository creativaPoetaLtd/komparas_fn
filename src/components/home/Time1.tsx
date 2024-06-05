import { ArrowRight, UploadSimple } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
// import image5 from '../../assets/image5.png'
import { addDayProduct1, getDayProduct1, updateDayProduct1 } from '../../api/offer';
import { getAllProducts } from '../../api/product';
import { Link } from 'react-router-dom';


const Time1 = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const [dayProduct, setDayProduct] = useState<any>([]);
    const [refresh, setRefresh] = useState(false);
  
    const handleRefresh = () => {
      setRefresh(!refresh);
    }
  const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;
  const [products, setProducts] = React.useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response?.data?.products);
    }
    fetchProducts();
  }
    , []);
  
  
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
    <div className={`h-[50%] sm:h-[50%] lg:h-[50%] 2xl:h-[50%] md:h-[100%] flex w-full  justify-between ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"}  relative`}>
    <div className='absolute top-8 rounded-md p-2 right-12 w-fit h-fit bg-[#EDB62E] text-white'>
        <p className='text-lg'>{dayProduct[0]?.offer}% OFF</p>
    </div>
    <div className='mainPageContent w-[45%] h-full md:p-4 p-3 flex justify-center m-auto flex-col'>
        <div className='flex'>
            <p className='text-[#EDB62E] md:text-base text-sm my-auto justify-center'>
            {dayProduct[0]?.description}
            </p>
        </div>
        <p className='md:text-xl test-base mt-5 text-white'>
        {dayProduct[0]?.name}

        </p>
        <Link to={`/product/${dayProduct[0]?.product?._id}`} className="flex space-x-2 rounded-md text-sm mt-6 md:p-2 p-2 md:px-2 px-2 font-semibold bg-[#EDB62E] text-white">
            <p className="">Reba Byose</p>
            <ArrowRight className="m-auto justify-center" />
        </Link>
    </div>
    <div className="image w-[55%] flex justify-end  h-full pl-4 pt-12">
        <div className="w-full h-full object-cover">
            <img src={ dayProduct[0]?.image } height={312} width={312} alt="" className="w-[312px] h-full" />
            {
                isAdminFromLocalStorage && (
                    <button onClick={() => setIsFormVisible(true)} className="absolute bottom-1 right-1 bg-black text-white p-1 text-sm rounded-md">Add Product</button>
                )
            }
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

export default Time1