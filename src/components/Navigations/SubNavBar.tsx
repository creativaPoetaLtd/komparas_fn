import { ArrowDown } from '@phosphor-icons/react'
const SubNavBar = () => {
  return (
    <div className='flex  m-auto p-2 text-white justify-end space-x-8 items-end w-full bg-[#0C203B]'>
        <div className='flex justify-end items-end'>
            <p className='text-sm'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className='ml-6'>
                <a href='#' className='text-sm underline'>Shop Now</a>
                </span></p>
        </div>
        <div className='locales flex justify-end items-end'>
            <p className='text-sm'>English</p>
            <ArrowDown className='text-sm'/>
            </div>
    </div>
  )
}

export default SubNavBar