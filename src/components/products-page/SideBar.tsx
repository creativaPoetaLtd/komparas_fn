import { FaTimes } from 'react-icons/fa';
import ads from '../../assets/ads.png'
import RadioInputMain from './RadioButtonMain'
import SliderBar from './Slider'
import CheckboxInput from './CheckboxButton';
interface SideBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    categories: any;
    shops: any;
    handleCategoryClick: (name: string) => void;
    handleShopCkik: (id: string, name:string) => void;
    onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
}
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, categories, shops, handleCategoryClick, handleShopCkik, onPriceRangeChange }) => {
  return (
    <div className={`lg:w-[25%] md:hiddenf hiddenf min-h-screen  lg:flex flex-col h-fit pr-4 ${isOpen ? 'md:flex flex w-full z-30':'h hidden'}`}>
    <div className='flex flex-col relative'>
        <p className='text-sm font-semibold text-gray-600'>Categories</p>
        <button className='' onClick={toggleSidebar}>
            <FaTimes className='text-xl cursor-pointer flex lg:hidden my-auto mr-4 absolute top-3 right-3' />
        </button>
        <div className='flex flex-col mt-4'>
            {categories?.map((category: any) => (
                <RadioInputMain key={category._id} label={category.name} name='category' onClick={() => handleCategoryClick(category?._id)} />
            ))}
        </div>
    </div>
   <SliderBar onPriceRangeChange={onPriceRangeChange}/>
    <div className='brands flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>Shops</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            {shops?.map((shop: any) => (
                <RadioInputMain key={shop._id} label={shop.name} name='category' onClick={() => handleShopCkik(shop?._id, shop?.name)} />
            ))}
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