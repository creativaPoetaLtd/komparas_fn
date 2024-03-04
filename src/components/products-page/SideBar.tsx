import ads from '../../assets/ads.png'
import CheckboxInput from './CheckboxButton'
import RadioInputMain from './RadioButtonMain'
import SliderBar from './Slider'

const SideBar = () => {
  return (
    <div className='lg:w-[25%] md:hidden hidden min-h-screen  lg:flex flex-col h-fit pr-4'>
    <div className='flex flex-col'>
        <p className='text-sm font-semibold text-gray-600'>Categories</p>
        <div className='flex flex-col mt-4'>
            <RadioInputMain label='All' name='category' />
            <RadioInputMain label='Electronic' name='category' />
            <RadioInputMain label='Phones' name='category' />
            <RadioInputMain label='Computers' name='category' />
            <RadioInputMain label='Home Appliances' name='category' />
            <RadioInputMain label='Health & Beauty' name='category' />
            <RadioInputMain label='Home & Garden' name='category' />
            <RadioInputMain label='Accessories' name='category' />
            <RadioInputMain label='Entertainment' name='category' />
            <RadioInputMain label='Others' name='category' />
        </div>
    </div>
   <SliderBar />
    <div className='brands flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>Brands</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            <CheckboxInput label='Apple' name='brand' />
            <CheckboxInput label='Samsung' name='brand' />
            <CheckboxInput label='HP' name='brand' />
            <CheckboxInput label='Dell' name='brand' />
            <CheckboxInput label='Lenovo' name='brand' />
            <CheckboxInput label='Microsoft' name='brand' />
            <CheckboxInput label='LG' name='brand' />
            <CheckboxInput label='Sony' name='brand' />
            <CheckboxInput label='Canon' name='brand' />
            <CheckboxInput label='Philips' name='brand' />
            <CheckboxInput label='LG' name='brand' />
            <CheckboxInput label='LG' name='brand' />
        </div>
    </div>
    <div className='flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>Types</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            <CheckboxInput label='Smartphones' name='type' />
            <CheckboxInput label='Laptops' name='type' />
            <CheckboxInput label='Home Appliances' name='type' />
        </div>
    </div>
    <div className='flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>Storage</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            <CheckboxInput label='16GB' name='storage' />
            <CheckboxInput label='32GB' name='storage' />
            <CheckboxInput label='64GB' name='storage' />
            <CheckboxInput label='128GB' name='storage' />
            <CheckboxInput label='256GB' name='storage' />
            <CheckboxInput label='512GB' name='storage' />
            <CheckboxInput label='1TB' name='storage' />
        </div>
    </div>
    <div className='flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>RAM Size</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            <CheckboxInput label='2GB' name='ram' />
            <CheckboxInput label='4GB' name='ram' />
            <CheckboxInput label='8GB' name='ram' />
            <CheckboxInput label='16GB' name='ram' />
            <CheckboxInput label='32GB' name='ram' />
            <CheckboxInput label='64GB' name='ram' />
            <CheckboxInput label='128GB' name='ram' />
        </div>
    </div>
    <div className='flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>Camera</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            <CheckboxInput label='12MP' name='camera' />
            <CheckboxInput label='16MP' name='camera' />
            <CheckboxInput label='20MP' name='camera' />
            <CheckboxInput label='24MP' name='camera' />
            <CheckboxInput label='32MP' name='camera' />
            <CheckboxInput label='48MP' name='camera' />
            <CheckboxInput label='64MP' name='camera' />
        </div>
    </div>
    <div className='flex flex-col mt-5 items-center justify-center border-4 border-yellow-600 w-[312px] py-5'>
        <img src={ads} alt="" className='w-[180px] h-[180px]' />
        <h1 className='mt-2 font-semibold text-sm'>WATCH</h1>
        <p className='text-xs text-red-600'>The best smartwatch</p>
        <h1 className='mt-2 font-semibold text-sm'>Heavy on Features.</h1>
        <h1 className='mt-2 font-semibold text-sm'>Light on Price.</h1>
        <div className='flex mt-3'>
            <p className='text-xs font-light text-gray-600'>Only for</p>
            <p className='text-xs font-semibold bg-yellow-600 ml-1 p-2'>$99.99</p>
        </div>
        <button className='text-sm bg-yellow-600 text-white p-2 rounded-md mt-2'>Shop Now</button>
        <button className='text-sm bg-white text-yellow-600 p-2 rounded-md mt-2'>Learn More</button>
    </div>
</div>
  )
}

export default SideBar