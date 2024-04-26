import { FaAngleDown } from "react-icons/fa6";

const SubNav = () => {
    return (
        <div className='lg:flex md:flex-row flex-col md:px-32 px-2  m-auto p-2 text-white justify-end md:space-x-16 space-x-5 items-end w-full bg-black'>
            <div className='flex justify-end w-full items-end'>
                <p className='md:text-sm text-xs text-[10px]'>Summer Sale For All Swim And Free Express Delivery - OFF 50%! <span className='ml-3'>
                    <a href='#' className='md:text-sm text-[10px] underline'>Shop Now</a>
                </span></p>
            </div>
            <div className='locales flex justify-end items-end space-x-1'>
                <p className='md:text-sm text-[10px]'>English</p>
                <FaAngleDown className='md:text-sm text-[10px] flex justify-center items-center my-auto' />
            </div>
        </div>
    )
}

export default SubNav