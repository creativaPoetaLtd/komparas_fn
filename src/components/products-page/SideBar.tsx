import { FaTimes } from 'react-icons/fa';
import ads from '../../assets/ads.png'
import RadioInputMain from './RadioButtonMain'
import SliderBar from './Slider'
interface SideBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    categories: any;
    shops: any;
    handleCategoryClick: (id:string, name: string) => void;
    handleShopCkik: (id: string, name: string) => void;
    onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
    handleSelectRam: (ram: string) => void;
    handleSelectStorage: (storage: string) => void;
    handleSelectCamera: (camera: string) => void;
    handleSelectType: (type: string) => void;
}
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, categories, shops, handleCategoryClick, handleShopCkik, onPriceRangeChange, handleSelectRam, handleSelectStorage, handleSelectCamera, handleSelectType }) => {
    return (
        <div className={`lg:w-[25%] md:hiddenf hiddenf min-h-screen  lg:flex flex-col h-fit pr-4 ${isOpen ? 'md:flex flex w-full z-30' : 'h hidden'}`}>
            <div className='flex flex-col relative'>
                <p className='text-sm font-semibold text-gray-600'>Categories</p>
                <button className='' onClick={toggleSidebar}>
                    <FaTimes className='text-xl cursor-pointer flex lg:hidden my-auto mr-4 absolute top-3 right-3' />
                </button>
                <div className='flex flex-col mt-4'>
                    {categories?.map((category: any) => (
                        <RadioInputMain key={category._id} label={category.name} name='category' onClick={() => handleCategoryClick(category?._id, category?.name)} />
                    ))}
                </div>
            </div>
            <SliderBar onPriceRangeChange={onPriceRangeChange} />
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
                    <RadioInputMain label='Smartphones' name='type' onClick={() => handleSelectType('Smartphones')} />
                    <RadioInputMain label='mobile' name='type' onClick={() => handleSelectType('mobile')} />
                    <RadioInputMain label='Tablet' name='type' onClick={() => handleSelectType('Tablet')} />
                    <RadioInputMain label='Sumsung' name='type' onClick={() => handleSelectType('Sumsung')} />
                    <RadioInputMain label='Apple' name='type' onClick={() => handleSelectType('Apple')} />
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Storage</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <RadioInputMain label='32GB' name='storage' onClick={() => handleSelectStorage('32GB')} />
                    <RadioInputMain label='64GB' name='storage' onClick={() => handleSelectStorage('64GB')} />
                    <RadioInputMain label='128GB' name='storage' onClick={() => handleSelectStorage('128GB')} />
                    <RadioInputMain label='256GB' name='storage' onClick={() => handleSelectStorage('256GB')} />
                    <RadioInputMain label='512GB' name='storage' onClick={() => handleSelectStorage('512GB')} />
                    <RadioInputMain label='1TB' name='storage' onClick={() => handleSelectStorage('1TB')} />
                    <RadioInputMain label='2TB' name='storage' onClick={() => handleSelectStorage('2TB')} />
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>RAM Size</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <RadioInputMain label='2GB' name='ram' onClick={() => handleSelectRam('2GB')} />
                    <RadioInputMain label='4GB' name='ram' onClick={() => handleSelectRam('4GB')} />
                    <RadioInputMain label='8GB' name='ram' onClick={() => handleSelectRam('8GB')} />
                    <RadioInputMain label='16GB' name='ram' onClick={() => handleSelectRam('16GB')} />
                    <RadioInputMain label='32GB' name='ram' onClick={() => handleSelectRam('32GB')} />
                    <RadioInputMain label='64GB' name='ram' onClick={() => handleSelectRam('64GB')} />
                    <RadioInputMain label='128GB' name='ram' onClick={() => handleSelectRam('128GB')} />
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Camera</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <RadioInputMain label='12MP' name='camera' onClick={() => handleSelectCamera('12MP')} />
                    <RadioInputMain label='16MP' name='camera' onClick={() => handleSelectCamera('16MP')} />
                    <RadioInputMain label='20MP' name='camera' onClick={() => handleSelectCamera('20MP')} />
                    <RadioInputMain label='24MP' name='camera' onClick={() => handleSelectCamera('24MP')} />
                    <RadioInputMain label='32MP' name='camera' onClick={() => handleSelectCamera('32MP')} />
                    <RadioInputMain label='48MP' name='camera' onClick={() => handleSelectCamera('48MP')} />
                    <RadioInputMain label='64MP' name='camera' onClick={() => handleSelectCamera('64MP')} />
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