import img7 from "../../assets/img7.png";
import { FaApple } from "react-icons/fa";
import { ArrowRight } from "@phosphor-icons/react";

const HomeBurner = () => {
  return (
    <div className='bunnerPage flex w-full lg:px-20 px-0 h-[344px]'>
    <div className='sideCategories w-1/4 hidden lg:flex h-full border-black border-r '>
      <ul className='flex flex-col space-y-4 py-4'>
        <li>Category 1</li>
        <li>Category 2</li>
        <li>Category 3</li>
        <li>Category 4</li>
        <li>Category 5</li>
      </ul>
    </div>
    <div className='bunner lg:w-3/4 w-full h-full md:py-4 py-4 md:pl-4 px-2'>
      <div className='mainPage flex md:flex-row flex-col bg-[#0C203B] md:h-full h-fit relative'>
        <div className='mainPageContent md:w-[44%] w-full h-full md:p-12 p-5'>
          <div className='flex'>
            <FaApple className='text-white md:text-5xl text-2xl my-auto justify-center' />
            <p className='text-white text-sm ml-2 my-auto font-thin justify-center'>iPhone 14 Series</p>
          </div>
          <p className='lg:text-5xl text-3xl mt-6 text-white'>
            Up to 10% off Voucher
          </p>
          <button className="flex space-x-2 pl-1 text-sm mt-1 text-[#EDB62E]">
            <p className="underline underline-offset-4">Shop Now</p>
            <ArrowRight className="m-auto justify-center" />
          </button>
        </div>
        <div className="image md:w-[60%] w-full h-full md:p-4 p-1 pb-12">
          <div className="w-full h-full object-cover">
            <img src={img7} height={100} width={100} alt="" className="w-full h-full " />
          </div>
        </div>
        <div className="circles w-full absolute bottom-0 flex justify-center mb-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className={`w-3 h-3 rounded-full mx-1 bg-white cursor-pointer ${index === 3 ? 'bg-[#EDB62E]': ''}`}></div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeBurner
