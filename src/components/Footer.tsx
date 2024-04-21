
import React from 'react';
import { IoMdSend } from "react-icons/io";

const Footer: React.FC = () => {
  return (
    <footer className="flex md:text-base text-sm flex-col justify-center items-center text-white w-full lg:px-[8Telefoni zitandukanye
      rem] px-2 bg-[#0C203B] py-8">
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-16 border-gray-700 border-b pb-5'>
        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold text-[#EDB62E]'>Komparas</h1>
          <p className='flex font-semibold'>Subscribe</p>
          <p className='flex font-semibold'>Get 10% off your first order</p>
          <div className='md:w-[217px] w-[180px] flex border border-white p-2 rounded-md justify-between'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex outline-none bg-[#0C203B] w-[85%]'
            />
            <IoMdSend className="flex justify-center my-auto w-[15%]" />
          </div>
        </div>
        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold'>Support</h1>
          <p className='flex'>Kigali,Rwanda</p>
          <p className='flex'>komparas@gmail.com</p>
          <p className='flex'>+250 987 656 078</p>
        </div>
        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold'>Support</h1>
          <p className='flex'>Kigali,Rwanda</p>
          <p className='flex'>komparas@gmail.com</p>
          <p className='flex'>+250 987 656 078</p>
        </div>
        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold'>Quick Link</h1>
          <p className='flex'>Privacy Policy</p>
          <p className='flex'>Terms Of Use</p>
          <p className='flex'>FAQ</p>
          <p className='flex'>Contact</p>
        </div>
      </div>
      <div className="mt-12 m-auto justify-center items-center">
        <p className="text-base leading-6 text-gray-400 xl:text-center">
          &copy; 2023 Copyright Komparas 2023. All right reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
