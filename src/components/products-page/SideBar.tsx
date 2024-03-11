import { FaTimes } from 'react-icons/fa';

import RadioInputMain from './RadioButtonMain'
import SliderBar from './Slider'
interface SideBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    categories: any;
    shops: any;
    handleCategoryClick: (name: string) => void;
    handleShopCkik: (id: string, name:string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, categories, shops, handleCategoryClick, handleShopCkik }) => {

  return (
    <div className={`lg:w-[25%] md:hiddenf hiddenf min-h-screen  lg:flex flex-col h-fit pr-4 ${isOpen ? 'md:flex flex w-full z-30':'h hidden'}`}>
    <div className='flex flex-col relative'>
        <p className='text-sm font-semibold text-gray-600'>Categories</p>
        <button className='' onClick={toggleSidebar}>
            <FaTimes className='text-xl cursor-pointer flex lg:hidden my-auto mr-4 absolute top-3 right-3' />
        </button>
        <div className='flex flex-col mt-4'>
            {categories?.map((category: any) => (
                <RadioInputMain key={category._id} label={category.name} name='category' onClick={() => handleCategoryClick(category?.name)} />
            ))}
        </div>
    </div>
   <SliderBar />
    <div className='brands flex flex-col mt-3'>
        <p className='text-sm font-semibold text-gray-600'>Shops</p>
        <div className='flex-col grid grid-cols-2 mt-5'>
            {shops?.map((shop: any) => (
                <RadioInputMain key={shop._id} label={shop.name} name='category' onClick={() => handleShopCkik(shop?._id, shop?.name)} />
            ))}
        </div>
    </div>
</div>
  )
}

export default SideBar