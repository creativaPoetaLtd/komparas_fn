/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
// import { IoMdSend } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook, FaPhoneSquareAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';





const Footer: React.FC = () => {
  const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
  const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;

  return (
    <footer className={`flex md:text-base text-sm flex-col justify-between items-center text-white w-full lg:px-[8
      rem] px-2 ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"}  py-8`}>
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-10 md:gap-32 lg:gap-44 pb-8'>
        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold text-[#EDB62E]'>Komparas</h1>
          <Link to="/about_us">
          <p className='flex'>Abo turibo</p>
          </Link>
          <Link to="/serivisi">
          <p className='flex'>Serivisi</p>
          </Link>
          <Link to="/sobanukirwa">
          <p className='flex'>Sobanukirwa</p>
          </Link>
          <Link to="/contact_us">
          <p className='flex'>Twandikire</p>
          </Link>
        </div>
        <div className='flex card1 flex-col space-y-3'>
  <h1 className='flex font-bold'>Ubufatanyabikorwa</h1>
  <Link to="/partnership#ndi_umucuruzi">
    <p className='flex'>Ndi umucuruzi</p>
  </Link>
  <Link to="/partnership#umuguzi">
    <p className='flex'>Ndi umuguzi</p>
  </Link>
  <Link to="/partnership#kwamamaza">
    <p className='flex'>Kwamamaza</p>
  </Link>
  <Link to="akazi">
    <p className='flex'>Akazi</p>
  </Link>
</div>

        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold'>Ubufasha mu gukoresha uru rubuga</h1>
          <div className='flex gap-2 items-center'><MdOutlineEmail/> 
            <p className=''>contact@Komparas.com</p>
          </div>
          <div className='flex gap-2 items-center'><FaPhoneSquareAlt/> 
            <p className=''>+250 987 656 078</p>
          </div>
          <p className=''>Kigali-Rwanda</p>
          <p className=''>Gukoresha uru rubuga</p>
        </div>
        <div className='flex card1 flex-col space-y-3'>
          <h1 className='flex font-bold'>Impamvu ukwiye gukoresha Kompras</h1>
          <p className='flex'>Ku batanga serivisi cyangwa abacuruzi</p>
          <p className='flex'>Ku bakeneye serivisi cyangwa abaguzi</p>
          <p className='flex'>Ibibazo bikunze kwibazwa(F.A.Q)</p>
        </div>
      </div>

     <div className='h-16 w-full self-center justify-center m-auto items-center flex relative'>
      <div className='w-[90%] h-[2px] bg-stone-700 absolute top-1/2 '></div>
      <div className='w-fit h-fit  lg:w-[40%] self-center justify-between flex bg-[#192733] m-auto gap-4 p-4 z-10'>
      <FaFacebook fontSize='1.2rem'/>
        <FaInstagram fontSize='1.2rem'/>
        <FaLinkedin fontSize='1.2rem'/>
        <FaXTwitter fontSize='1.2rem'/>
        <FaYoutube fontSize='1.2rem'/>
        <FaTiktok fontSize='1.2rem'/>
        <FaWhatsapp fontSize='1.2rem'/>
      </div>

     </div>
      <div className="mt-12 justify-between flex items-center w-full md:px-[5rem]">
        <p className="text-base leading-6 text-gray-400 xl:text-center">
          &copy; 2024 Kompras
        </p>

        <img src="/cc.png" alt="logo" className=' h-6 md:h-10' />

        <p className="text-base leading-6 text-gray-400 xl:text-center pl-7">
        Amategeko N'amabwiriza
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;
