import { FaTimes } from 'react-icons/fa';
import ads from '../../assets/ads.png'
import SliderBar from './Slider'
import CheckboxInput from './CheckboxButton';
import { RedComponent } from './ColorsComponent';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/product';
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
    handleSelectColors: (colors: string) => void;
    handleSelectType: (type: string) => void;
    handleSelectscreen:(type: string) => void;
    selectedCategories: any;
    selectedStorage: any;
    selectedColors: any;
    selectedscreen:any;
    selectedRam: any;
    selectedCamera: any;
    selectedShops: any;
}
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, categories, shops, handleCategoryClick, handleShopCkik, onPriceRangeChange, handleSelectRam, handleSelectStorage, handleSelectCamera, handleSelectColors, handleSelectscreen, selectedCategories, selectedStorage,
    selectedColors, selectedscreen, selectedRam, selectedCamera, selectedShops

 }) => {
    const [color, setColor] = useState<string[]>([]);

    const fetchProducts = async () => {
        const response = await getAllProducts();
        const allProducts = response?.data?.products;
        console.log("allProducts", allProducts);

        if (allProducts) {
            const colorsSet = new Set<string>();
            allProducts.forEach((product: any) => {
                product.vendor_prices.forEach((vendor: any) => {
                    vendor.colors.forEach((color: string) => {
                        colorsSet.add(color);
                    });
                });
            });
            setColor(Array.from(colorsSet));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const removeColorStatedByHashTaga = color.filter(color=>color.charAt(0)!=='#')
    const removeColorStatedByHashslash = removeColorStatedByHashTaga.filter(color=>color.charAt(0)!=='/')
    const removeColorStatedByHashsminus = removeColorStatedByHashslash.filter(color=>color.charAt(0)!=='-')
    const splitColors = removeColorStatedByHashsminus.toString()
    const splitString = splitColors.split(',')
    const removeDuplication = Array.from(new Set(splitString))
    const removeColorStatedBySpace = removeDuplication.filter(color=>color.charAt(0)!==' ')    
    return (
        <div className={`lg:w-[25%] md:hiddenf hiddenf min-h-screen  lg:flex flex-col h-fit pr-4 ${isOpen ? 'md:flex flex w-full z-30' : 'h hidden'}`}>
            <SliderBar onPriceRangeChange={onPriceRangeChange} />
            <div className='brands flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Shops</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {shops?.map((shop: any) => (
                        <CheckboxInput key={shop._id} label={shop.name} name='shops' checked={selectedShops?.includes(shop._id)}  onChange={() => handleShopCkik(shop._id, shop.name)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col relative'>
                <p className='text-sm font-semibold text-gray-600'>Categories</p>
                <button className='' onClick={toggleSidebar}>
                    <FaTimes className='text-xl cursor-pointer flex lg:hidden my-auto mr-4 absolute top-3 right-3' />
                </button>
                <div className='flex flex-col mt-4'>
                    {categories?.map((category: any) => (
                        <CheckboxInput key={category._id} label={category.name} name='category' checked={selectedCategories?.includes(category._id)}  onChange={() => handleCategoryClick(category._id, category.name)}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Storage</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'].map((storage, i) => (
                        <CheckboxInput key={i} label={storage} name='storage'  checked={selectedStorage?.includes(storage)}
                        onChange={() => handleSelectStorage(storage)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>RAM Size</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {['2GB', '4GB', '8GB', '16GB', '32GB', '64GB', '128GB'].map((ram, i) => (
                        <CheckboxInput key={i} label={ram} name='ram' checked={selectedRam?.includes(ram)} onChange={() => handleSelectRam(ram)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Camera</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {['12MP', '16MP', '20MP', '24MP', '32MP', '48MP', '64MP'].map((camera, i) => (
                        <CheckboxInput key={i} label={camera} name='camera' checked={selectedCamera?.includes(camera)} onChange={() => handleSelectCamera(camera)} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Ecran</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {['1920×1080', '1366×768', '1280×720', '3840×2160', '2560×1440', '1600×900', '2560×1600'].map((screen, i) => (
                        <CheckboxInput key={i} label={screen} name='ecran' checked={selectedscreen?.includes(screen)} onChange={() => handleSelectscreen(screen)} />
                    ))}
                </div>
            </div>
            
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Colors</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {removeColorStatedBySpace.map((color, i)=>
                    <p key={i}>
                        <CheckboxInput label={<RedComponent color={color}/>} name='color' checked={selectedColors?.includes(color)} onChange={() => handleSelectColors(color)} />
                    </p>
                    )}
                    </div>
            </div>
            <div className='flex flex-col mt-5 items-center justify-center border-4 border-yellow-600 w-[260px] py-5'>
                <img src={ads} alt="" className='w-[150px] h-[150px]' />
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