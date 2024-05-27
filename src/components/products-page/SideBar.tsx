import { FaTimes } from 'react-icons/fa';
import ads from '../../assets/ads.png'
// import RadioInputMain from './RadioButtonMain'
import SliderBar from './Slider'
// import PorductCheckInput from './ProdCheck';
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
}
const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, categories, shops, handleCategoryClick, handleShopCkik, onPriceRangeChange, handleSelectRam, handleSelectStorage, handleSelectCamera, handleSelectColors, handleSelectscreen }) => {
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

    console.log("colors", color);

    const removeColorStatedByHashTaga = color.filter(color=>color.charAt(0)!=='#')
    const removeColorStatedByHashslash = removeColorStatedByHashTaga.filter(color=>color.charAt(0)!=='/')
    const removeColorStatedByHashsminus = removeColorStatedByHashslash.filter(color=>color.charAt(0)!=='-')
    const splitColors = removeColorStatedByHashsminus.toString()
    const splitString = splitColors.split(',')
    const removeDuplication = Array.from(new Set(splitString))
    const removeColorStatedBySpace = removeDuplication.filter(color=>color.charAt(0)!==' ')

    console.log(removeColorStatedBySpace);
    


    
    
    return (
        <div className={`lg:w-[25%] md:hiddenf hiddenf min-h-screen  lg:flex flex-col h-fit pr-4 ${isOpen ? 'md:flex flex w-full z-30' : 'h hidden'}`}>
          
            <SliderBar onPriceRangeChange={onPriceRangeChange} />
            <div className='brands flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Shops</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {shops?.map((shop: any) => (
                        <CheckboxInput key={shop._id} label={shop.name} name='category' onClick={() => handleShopCkik(shop?._id, shop?.name)} />
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
                        <CheckboxInput key={category._id} label={category.name} name='category' onClick={() => handleCategoryClick(category?._id, category?.name)} />
                    ))}
                </div>
            </div>
            {/* <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Types</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <CheckboxInput label='Smartphones' name='type' onClick={() => handleSelectType('Smartphones')} />
                    <CheckboxInput label='mobile' name='type' onClick={() => handleSelectType('mobile')} />
                    <CheckboxInput label='Tablet' name='type' onClick={() => handleSelectType('Tablet')} />
                    <CheckboxInput label='Sumsung' name='type' onClick={() => handleSelectType('Sumsung')} />
                    <CheckboxInput label='Apple' name='type' onClick={() => handleSelectType('Apple')} />
                </div>
            </div> */}
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Storage</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <CheckboxInput label='32GB' name='storage' onClick={() => handleSelectStorage('32GB')} />
                    <CheckboxInput label='64GB' name='storage' onClick={() => handleSelectStorage('64GB')} />
                    <CheckboxInput label='128GB' name='storage' onClick={() => handleSelectStorage('128GB')} />
                    <CheckboxInput label='256GB' name='storage' onClick={() => handleSelectStorage('256GB')} />
                    <CheckboxInput label='512GB' name='storage' onClick={() => handleSelectStorage('512GB')} />
                    <CheckboxInput label='1TB' name='storage' onClick={() => handleSelectStorage('1TB')} />
                    <CheckboxInput label='2TB' name='storage' onClick={() => handleSelectStorage('2TB')} />
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>RAM Size</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <CheckboxInput label='2GB' name='ram' onClick={() => handleSelectRam('2GB')} />
                    <CheckboxInput label='4GB' name='ram' onClick={() => handleSelectRam('4GB')} />
                    <CheckboxInput label='8GB' name='ram' onClick={() => handleSelectRam('8GB')} />
                    <CheckboxInput label='16GB' name='ram' onClick={() => handleSelectRam('16GB')} />
                    <CheckboxInput label='32GB' name='ram' onClick={() => handleSelectRam('32GB')} />
                    <CheckboxInput label='64GB' name='ram' onClick={() => handleSelectRam('64GB')} />
                    <CheckboxInput label='128GB' name='ram' onClick={() => handleSelectRam('128GB')} />
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Camera</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <CheckboxInput label='12MP' name='camera' onClick={() => handleSelectCamera('12MP')} />
                    <CheckboxInput label='16MP' name='camera' onClick={() => handleSelectCamera('16MP')} />
                    <CheckboxInput label='20MP' name='camera' onClick={() => handleSelectCamera('20MP')} />
                    <CheckboxInput label='24MP' name='camera' onClick={() => handleSelectCamera('24MP')} />
                    <CheckboxInput label='32MP' name='camera' onClick={() => handleSelectCamera('32MP')} />
                    <CheckboxInput label='48MP' name='camera' onClick={() => handleSelectCamera('48MP')} />
                    <CheckboxInput label='64MP' name='camera' onClick={() => handleSelectCamera('64MP')} />
                </div>
            </div>
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Ecran</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    <CheckboxInput label='1920×1080' name='ecran' onClick={() => handleSelectscreen(' 1920×1080')} />
                    <CheckboxInput label='1366×768' name='ecran' onClick={() => handleSelectscreen(' 1366×768')} />
                    <CheckboxInput label='1280×720' name='ecran' onClick={() => handleSelectscreen(' 1280×720')} />
                    <CheckboxInput label='3840×2160' name='ecran' onClick={() => handleSelectscreen(' 3840×2160')} />
                    <CheckboxInput label='2560×1440' name='ecran' onClick={() => handleSelectscreen(' 2560×1440')} />
                    <CheckboxInput label='1600×900' name='ecran' onClick={() => handleSelectscreen(' 1600×900')} />
                    <CheckboxInput label='2560×1600' name='ecran' onClick={() => handleSelectscreen(' 2560×1600')} />
                </div>
            </div>
            
            <div className='flex flex-col mt-3'>
                <p className='text-sm font-semibold text-gray-600'>Colors</p>
                <div className='flex-col grid grid-cols-2 mt-5'>
                    {removeColorStatedBySpace.map((color, i)=>
                    <p key={i}>
                    <CheckboxInput label={<RedComponent color={color}/>} name='color' onClick={() => handleSelectColors(color)} />
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