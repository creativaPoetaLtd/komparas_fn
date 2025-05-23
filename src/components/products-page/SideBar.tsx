import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SliderBar from './Slider';
import CheckboxInput from './CheckboxButton';
import { RedComponent } from './ColorsComponent';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../api/product';

interface CategoryType {
  _id: string;
  name: string;
  children?: CategoryType[];
  image?: string;
}

interface SideBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    categories: CategoryType[];
    shops: any;
    handleCategoryClick: (id: string, name: string) => void;
    handleShopCkik: (id: string, name: string) => void;
    onPriceRangeChange: (minPrice: number, maxPrice: number) => void;
    handleSelectRam: (ram: string) => void;
    handleSelectStorage: (storage: string) => void;
    handleSelectCamera: (camera: string) => void;
    handleSelectColors: (colors: string) => void;
    handleSelectscreen: (type: string) => void;
    selectedCategories: string[];
    selectedStorage: string[];
    selectedColors: string[];
    selectedscreen: string[];
    selectedRam: string[];
    selectedCamera: string[];
    selectedShops: string[];
    productsData: any;
    totalProducts: any;
    clearFilters: () => void;
}

// Component to render a category and its subcategories recursively
const CategoryItem: React.FC<{
  category: CategoryType;
  selectedCategories: string[];
  handleCategoryClick: (id: string, name: string) => void;
  level: number;
}> = ({ category, selectedCategories, handleCategoryClick, level }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  
  return (
    <div className={`my-1 ${level > 0 ? 'ml-4' : ''}`}>
      <div className="flex items-center">
        <CheckboxInput 
          label={category.name}
          name="category"
          checked={selectedCategories?.includes(category._id)}
          onChange={() => handleCategoryClick(category._id, category.name)}
        />
        
        {hasChildren && (
          <button 
            className="ml-1 p-1 rounded hover:bg-gray-100 focus:outline-none transition-colors flex items-center self-start mt-0.5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            aria-label={expanded ? "Collapse category" : "Expand category"}
          >
            {expanded ? 
              <FaChevronUp size={10} className="text-gray-600" /> : 
              <FaChevronDown size={10} className="text-gray-600" />
            }
          </button>
        )}
      </div>
      
      {expanded && hasChildren && (
        <div className="mt-1 pl-2 border-l-2 border-gray-200">
          {category.children?.map((child) => (
            <CategoryItem
              key={child._id}
              category={child}
              selectedCategories={selectedCategories}
              handleCategoryClick={handleCategoryClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SideBar: React.FC<SideBarProps> = ({
    totalProducts,
    isOpen,
    toggleSidebar,
    categories,
    shops,
    handleCategoryClick,
    handleShopCkik,
    onPriceRangeChange,
    handleSelectRam,
    handleSelectStorage,
    handleSelectCamera,
    handleSelectColors,
    handleSelectscreen,
    selectedCategories,
    selectedStorage,
    selectedColors,
    selectedscreen,
    selectedRam,
    selectedCamera,
    selectedShops,
    clearFilters,
}) => {
    const [color, setColor] = useState<string[]>([]);
    const [sections, setSections] = useState({
        ram: false,
        storage: false,
        category: false,
        colors: false,
        camera: false,
        screen: false,
        shops: false,
    });

    const toggleSection = (section: string) => {
        setSections((prevSections: any) => ({
            ...prevSections,
            [section]: !prevSections[section],
        }));
    };

    const fetchProducts = async () => {
        const response = await getAllProducts();
        const allProducts = response?.data?.products;
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
    const filteredColors = color.filter(color => !['#', '/', '-'].includes(color.charAt(0)));
    const allColors = filteredColors.join(',').split(',');
    const cleanedColors = allColors.map(color => color.trim().toLowerCase());
    const removeDuplicationColor = Array.from(new Set(cleanedColors)).filter(color => color !== '');
    return (
        <div className={`relative md:mx-2 mx-0 lg:w-[25%] md:hiddenf hiddenf mb-3 lg:flex flex-col h-fit pr-4 border border-green-600 rounded-md p-3 ${isOpen ? 'md:flex flex w-full z-30' : 'h hidden'}`}>
            <div className='flex justify-between items-center cursor-pointer' onClick={toggleSidebar}>
                <p className='text-sm font-semibold text-gray-600'>Akayunguruzo</p>
                <FaTimes />
            </div>
            <SliderBar onPriceRangeChange={onPriceRangeChange} />
            <div className='part1 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('ram')}>
                    <p className='text-sm font-semibold text-gray-600'>Ingano ya RAM</p>
                    {sections.ram ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.ram && (
                    <div className='flex-col grid grid-cols-2 mt-5 pb-3'>
                        {['1GB','2GB', '4GB', '8GB','12GB', '16GB', '32GB', '64GB', '128GB'].map((ram, i) => (
                            <CheckboxInput key={i} label={ram} name='ram' checked={selectedRam?.includes(ram)} onChange={() => handleSelectRam(ram)} />
                        ))}
                    </div>
                )}
            </div>
            <div className='part2 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('storage')}>
                    <p className='text-sm font-semibold text-gray-600'>Ububiko</p>
                    {sections.storage ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.storage && (
                    <div className='flex-col grid grid-cols-2 mt-5'>
                        {['32GB', '64GB', '128GB', '256GB', '512GB', '1TB', '2TB'].map((storage, i) => (
                            <CheckboxInput key={i} label={storage} name='storage' checked={selectedStorage?.includes(storage)} onChange={() => handleSelectStorage(storage)} />
                        ))}
                    </div>
                )}
            </div>
            <div className='part3 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('category')}>
                    <p className='text-sm font-semibold text-gray-600'>Ubwoko</p>
                    {sections.category ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.category && (
                    <div className='flex-col mt-3 space-y-1 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                        {categories?.map((category: CategoryType) => (
                            <CategoryItem 
                                key={category._id}
                                category={category}
                                selectedCategories={selectedCategories}
                                handleCategoryClick={handleCategoryClick}
                                level={0}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className='part4 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('colors')}>
                    <p className='text-sm font-semibold text-gray-600'>Amabara</p>
                    {sections.colors ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.colors && (
                    <div className='flex-col grid grid-cols-2 mt-5'>
                        {removeDuplicationColor.map((color, i) => (
                            <p key={i}>
                                <CheckboxInput label={<RedComponent color={color} />} name='color' checked={selectedColors?.includes(color)} onChange={() => handleSelectColors(color)} />
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <div className='part5 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('camera')}>
                    <p className='text-sm font-semibold text-gray-600'>Camera</p>
                    {sections.camera ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.camera && (
                    <div className='flex-col grid grid-cols-2 mt-5'>
                        {[ '16MP', '20MP', '24MP', '32MP', '48MP','50Mp', '64MP'].map((camera, i) => (
                            <CheckboxInput key={i} label={camera} name='camera' checked={selectedCamera?.includes(camera)} onChange={() => handleSelectCamera(camera)} />
                        ))}
                    </div>
                )}
            </div>
            <div className='part6 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('screen')}>
                    <p className='text-sm font-semibold text-gray-600'>Ikirahuri</p>
                    {sections.screen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.screen && (
                    <div className='flex-col grid grid-cols-2 mt-5'>
                        {['1080×2400', '1366×768', '1284×720', '2796×2160', '1290×1440', '1170×1200', '1179×1600','1440×1600','720×1600'].map((screen, i) => (
                            <CheckboxInput key={i} label={screen} name='screen' checked={selectedscreen?.includes(screen)} onChange={() => handleSelectscreen(screen)} />
                        ))}
                    </div>
                )}
            </div>
            <div className='part7 flex flex-col mt-3 border-b pb-3'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => toggleSection('shops')}>
                    <p className='text-sm font-semibold text-gray-600'>Shops</p>
                    {sections.shops ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {sections.shops && (
                    <div className='flex-col grid grid-cols-2 mt-5'>
                        {shops?.map((shop: any) => (
                            <CheckboxInput key={shop._id} label={shop.name} name='shops' checked={selectedShops?.includes(shop._id)} onChange={() => handleShopCkik(shop._id, shop.name)} />
                        ))}
                    </div>
                )}
            </div>
            <div className='flex justify-between mt-3'>
                <button onClick={clearFilters} className='flex w-fit rounded-md text-red-700 flex-row'>
                    <p className='text-sm md:text-xs my-auto font-semibold'>Siba utuyunguruzo</p>
                </button>
                <button onClick={toggleSidebar} className='flex bg-black w-fit p-2 px-1 rounded-md text-white flex-row'>
                    <p className='text-sm md:text-xs my-auto font-semibold'>
                     Reba {totalProducts} Zabonetse
                    </p>
                </button>
            </div>
        </div>
    );
};

export default SideBar;