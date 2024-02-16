import HomeNav from "./Navigations/HomeNav";
import img7 from "../assets/img7.png";
import { FaApple } from "react-icons/fa";
import { ArrowRight } from "@phosphor-icons/react";

const Home = () => {
  return (
    <div className='w-full bg-white h-full flex flex-col'>
      <HomeNav />
      <div className='bunnerPage flex w-full px-20 h-[344px]'>
        <div className='sideCategories w-1/4 h-full border-black border-r '>
          <ul className='flex flex-col space-y-4 py-4'>
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
            <li>Category 4</li>
            <li>Category 5</li>
          </ul>
        </div>
        <div className='bunner w-3/4 h-full py-4 pl-4'>
          <div className='mainPage flex bg-[#0C203B] h-full relative'>
            <div className='mainPageContent w-[44%] h-full p-12'>
              <div className='flex'>
                <FaApple className='text-white text-5xl my-auto justify-center' />
                <p className='text-white text-sm ml-2 my-auto font-thin justify-center'>iPhone 14 Series</p>
              </div>
              <p className='text-6xl mt-6 text-white'>
                Up to 10% off Voucher
              </p>
              <button className="flex space-x-2 pl-1 text-sm mt-1 text-[#EDB62E]">
                <p className="underline underline-offset-4">Shop Now</p>
                <ArrowRight className="m-auto justify-center" />
              </button>
            </div>
            <div className="image w-[60%] h-full p-4 pb-12">
              <div className="w-full h-full object-cover">
                <img src={img7} height={100} width={100} alt="" className="w-full h-full " />
              </div>
            </div>
            <div className="circles w-full absolute bottom-0 flex justify-center mb-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className={`w-3 h-3 rounded-full mx-1 bg-white cursor-pointer ${index === 2 ? 'bg-[#EDB62E]': ''}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
