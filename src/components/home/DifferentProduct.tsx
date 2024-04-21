// import image12 from "../../assets/image12.png"
// import image64 from "../../assets/image64.png"
// import image41 from "../../assets/image41.png"
// import mac from "../../assets/Macbook1.png"

interface DifferentProductProps {
  productData:any
}
const DifferentProduct: React.FC<DifferentProductProps> = ({productData}) => {
  return (
    <div className='flex flex-col w-full lg:px-[4.8rem] px-1 mt-6 py-12'>
      <div className='flex flex-col px-2 pb-6'>
        <div className="flex justify-start items-start">
          <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
          </div>
          <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Telefoni zitandukanye</h1>
        </div>
        {/* <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Telefoni zitandukanye</h1> */}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:pl-3">
        {productData?.slice(productData.length-5, productData.length-1).map((product: any, index: number) => (
          <div key={index} className="Card bg-[] flex flex-col p-3 md:px-5 px-2">
            <div className="h-[13rem] mx-auto justify-center flex md:w-[13rem]">
              <img src={product?.product_image} height={300} width={300} className="h-full object-contain w-full" />
            </div>
            <h1 className="flex font-semibold mt-8">{product?.product_name}</h1>
            <p className="text-xs text-[#909090] mt-2">{product?.product_description}</p>
            <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
          </div>
        ))}
        {/* <div className="Card bg-[#C9CFD2] flex flex-col p-3 md:px-5 px-2">
          <div className="h-[13rem] mx-auto justify-center flex md:w-[13rem]">
            <img src={image12} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">iwatch series 7</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
        </div>
        <div className="Card bg-[#FFE7D6] flex flex-col p-3 md:px-5 px-2">
          <div className="h-[13rem] mx-auto justify-center flex md:w-[13rem]">
            <img src={image64} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">Ipad Pro</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
        </div> */}
        {/* <div className="Card bg-[#EAEAEA] flex flex-col p-3 md:px-5 px-2">
          <div className="h-[13rem] mx-auto justify-center flex md:w-[13rem]">
            <img src={image41} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">Samsung Galaxy S24</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
        </div>
        <div className="Card bg-[#0C203B] flex flex-col p-3 md:px-5 px-2 text-white">
          <div className="h-[13rem] mx-auto justify-center flex md:w-[13rem]">
            <img src={mac} height={300} width={300} className="h-full object-cover w-full" />
          </div>
          <h1 className="flex font-semibold mt-8">Macbook Pro</h1>
          <p className="text-xs text-[#909090] mt-2">iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
          <button className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md">Read more</button>
        </div> */}
      </div>

    </div>
  )
}

export default DifferentProduct