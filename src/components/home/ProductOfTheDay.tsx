import related from '../../assets/related.png'

const ProductOfTheDay = () => {
  return (
    <div className='bunner flex flex-col self-center m-auto justify-center w-[90%] h-[632px] p-4 pl-4'>
      <div className='mainPage flex justify-between bg-[#0C203B] h-full relative px-20 pt-6'>
        <div className='mainPageContent w-[60%] h-full p-12 my-auto justify-center flex flex-col'>
          <div className='flex'>
            <p className='text-[#FFFFFF] text-sm ml-2 my-auto font-thin justify-center'>Product of the day</p>
          </div>
          <p className='text-6xl mt-6 text-white'>
          IPhone 15 Pro
          </p>
          <p className='text-[#FFFFFF] text-sm mt-2 font-thin '>Created to change everything for the better. For everyone</p>
          <button className="flex space-x-2 p-2 px-4 rounded w-fit h-fit text-sm mt-1 bg-[#EDB62E]">
            <p className="">Shop Now</p>
          </button>
        </div>
        <div className="image w-[40%] h-full pt-4 pbm-12">
          <div className="w-full h-full object-cover">
            <img src={related} height={998} width={406} alt="" className="w-[406px] h-full" />
          </div>
        </div>
        </div>
        </div>
  )
}

export default ProductOfTheDay