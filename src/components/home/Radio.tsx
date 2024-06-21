import { useEffect } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { getAllProducts } from '../../api/product';
import React from 'react';
import { Link } from 'react-router-dom';

const RadioSection = () => {
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
              <Link to={`product/${prod3?._id}`} className="flex space-x-2 rounded-md text-sm mt-8 p-3 px-4 font-semibold bg-[#EDB62E] text-white">
                <p className="">Reba byose</p>
                <ArrowRight className="m-auto justify-center" />
              </Link>
            </div>
            <div className="image md:w-[50%] w-full h-full  flex  justify-center items-center m-auto pt-5 relative">

              <div className="lg:w-[600px] lg:h-[420px] md:w-[359px] md:h-[218px] w-[358px] h-[217.39px] justify-center items-center m-auto object-cover">
                <img src={
                  prod3?.product_image
                } height={420} width={600} alt="" className="w-full h-full " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioSection;
