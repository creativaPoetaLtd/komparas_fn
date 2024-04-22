import { FaAngleDown } from "react-icons/fa6";

const SubNav = () => {
    return (
        <div className='lg:flex hidden px-32  m-auto p-2 text-white justify-end space-x-16 items-end w-full bg-black'>
            <div className='flex justify-end items-end'>
                <p className='text-sm'>Summer Sale For All Swim And Free Express Delivery - OFF 50%! <span className='ml-3'>
                    <a href='#' className='text-sm underline'>Shop Now</a>
                </span></p>
            </div>
            <div className='locales flex justify-end items-end space-x-1'>
                <p className='text-sm'>English</p>
                <FaAngleDown className='text-sm flex justify-center items-center my-auto' />
            </div>
        </div>
    )
}

export default SubNav