import image12 from "../../assets/image12.png"
import image64 from "../../assets/image64.png"
import image41 from "../../assets/image41.png"
import mac from "../../assets/Macbook1.png"
const DifferentProduct = () => {
  return (
    <div className='flex flex-col w-full px-[4.8rem] mt-6 py-12'>
      <div className='flex flex-col px-2 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
          </div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Shops</h1>
        </div>
        <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Different Product</h1>
      </div>
      <div className="grid grid-cols-4 pl-3">
        <div className="Card bg-[#C9CFD2] flex flex-col p-3 px-5">
          <div className="h-[13rem] mx-auto justify-center flex w-[13rem]">
            <img src={image12} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">iwatch series 7</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-2 px-4 rounded-md">Read more</button>
        </div>
        <div className="Card bg-[#FFE7D6] flex flex-col p-3 px-5">
          <div className="h-[13rem] mx-auto justify-center flex w-[13rem]">
            <img src={image64} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">Ipad Pro</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-2 px-4 rounded-md">Read more</button>
        </div>
        <div className="Card bg-[#EAEAEA] flex flex-col p-3 px-5">
          <div className="h-[13rem] mx-auto justify-center flex w-[13rem]">
            <img src={image41} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">Samsung Galaxy S24</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-2 px-4 rounded-md">Read more</button>
        </div>
        <div className="Card bg-[#0C203B] flex flex-col p-3 px-5 text-white">
          <div className="h-[13rem] mx-auto justify-center flex w-[13rem]">
            <img src={mac} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">Macbook Pro</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-2 px-4 rounded-md">Read more</button>
        </div>
      </div>

    </div>
  )
}

export default DifferentProduct