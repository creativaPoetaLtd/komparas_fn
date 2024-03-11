
interface ProductOfTheDayProps {
  productData: any;
}

const ProductOfTheDay: React.FC<ProductOfTheDayProps> = ({ productData }) => {  
  return (
    <div className='bunner flex flex-col self-center m-auto justify-center lg:w-[90%] w-full lg:h-[632px] h-full p-4 pl-4'>
      <div className='mainPage flex md:flex-row flex-col justify-between bg-[#0C203B] h-full relative md:px-20 px-6 pt-6'>
        <div className='mainPageContent md:w-[60%] w-full h-full md:p-12 p-1 my-auto justify-center flex flex-col'>
          <div className='flex'>
            <p className='text-[#FFFFFF] text-sm md:ml-1 my-auto font-thin justify-center'>Product of the day</p>
          </div>
          <p className='lg:text-4xl md:text-3xl text-2xl md:mt-6 mt-5 text-white'>
          {productData[4]?.product_name}
          </p>
          <p className='text-[#FFFFFF] text-sm mt-2 font-thin '>Created to change everything for the better. For everyone</p>
          <button className="flex space-x-2 p-2 px-4 rounded w-fit h-fit text-sm mt-2 bg-[#EDB62E]">
            <p className="">Shop Now</p>
          </button>
        </div>
        <div className="image md:w-[40%] w-full h-full pt-4 pbm-12">
          <div className="w-full h-full object-cover">
            <img src={productData[4]?.product_image} height={998} width={406} alt="" className="w-[406px] object-contain h-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductOfTheDay