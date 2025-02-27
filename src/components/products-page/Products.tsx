import React, { SetStateAction, useEffect, useState, useRef } from 'react';
import { Pagination } from 'antd';
import SideBar from './SideBar'
import SubNav from '../Navigations/SubNav'
import HomeNav from '../home/HomeNav'
import MobileHomeNav from '../home/HomeMobileNav'
import { FaArrowCircleUp, FaSearch, FaTimes } from 'react-icons/fa'
import { getAllProducts, getComparison } from '../../api/product';
// import ComparisonDrawer from './ComparisonDrawer';
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import PorductCheckInput from './ProdCheck';
import { toast } from 'react-toastify';
import { fetchParentCategories } from '../../api/getAllCategories';
import { getAllShops } from '../../api/getAllShops';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import AllProdNavs from '../Product/AllProdNavs';
import { HiMiniArrowsUpDown } from 'react-icons/hi2';
import BottomDrawer from './BottomDrawer';
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [deleteRefresh,] = useState(false);
    const [searchParam]: any = useSearchParams();
    const catID = searchParam.get('categoryId');
    const shopsId = searchParam.get('shopId');
    const loginInfo: any = localStorage.getItem('KomparasLoginsInfo');
    const userId = JSON.parse(loginInfo)?._id;
    const [categories, setCategories] = useState<any>([]);
    const [shops, setShops] = useState<any>([]);
    const [isDropDownFilter, setIsDropDownFilter] = useState(false);
    const [activeFilters, setActiveFilters] = useState<any[]>([]);
    const [locastorageCompareProductIds, setLocastorageCompareProductIds] = useState<any>(
        localStorage.getItem("compareProductIds")
            ? JSON.parse(localStorage.getItem("compareProductIds")!)
            : []
    );
    const [fixed, setFixed] = useState(false);

    const navigate = useNavigate();
    const clearFilter = (filter: any) => {
        handleRefresh();
        if (categoryName.includes(filter)) {
            const newCategoryName = categoryName.filter(name => name !== filter);
            setCategoryName(newCategoryName);
            setCategoryId(newCategoryName.map(name => categories.find((cat: any) => cat.name === name)._id));
        } else if (selectedShopNames.includes(filter)) {
            const newShopNames = selectedShopNames.filter(name => name !== filter);
            setSelectedShopNames(newShopNames);
            setShopst(newShopNames.map(name => shops.find((shop: any) => shop.shop_name === name)?._id));
        }
        else if (selectedRam.includes(filter)) {
            const newRam = selectedRam.filter(ram => ram !== filter);
            setSelectedRam(newRam);
            setMultipleRam(newRam);
        } else if (selectedCamera.includes(filter)) {
            const newCamera = selectedCamera.filter(camera => camera !== filter);
            setSelectedCamera(newCamera);
            setMultipleCamera(newCamera);
        } else if (selectedColors.includes(filter)) {
            const newColors = selectedColors.filter(color => color !== filter);
            setSelectedColors(newColors);
            setMultipleColors(newColors);
        }
        else if (selectedscreen.includes(filter)) {
            const newsecreen = selectedscreen.filter(secreen => secreen !== filter);
            setSelectedsecreen(newsecreen);
            setMultiplesecreen(newsecreen);
        }
        else if (selectedType === filter) {
            setSelectedType('');
        }

        else if (selectedStorage.includes(filter)) {
            const newStorage = selectedStorage.filter(storaged => storaged !== filter);
            setSelectedStorage(newStorage);
            setMultioletStorage(newStorage);
        }
        handleRefresh();
    };

    const clearFilters = () => {
        handleRefresh();
        setCategoryName([]);
        setCategoryId([]);
        setShopst([]);
        setSelectedShopNames([]);
        setSelectedStorage([]);
        setMultioletStorage([]);
        setSelectedRam([]);
        setMultipleRam([]);
        setSelectedCamera([]);
        setMultipleCamera([]);
        setSelectedColors([]);
        setMultipleColors([]);
        setSelectedType('');

    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchCategories = async () => {
        const data = await fetchParentCategories();
    
        const parentCategories = data?.data
            ?.filter((category: any) => Array.isArray(category?.children) && category?.children.length > 0)
            .sort((a: any, b: any) => a.name.localeCompare(b.name));
    
        setCategories(parentCategories);
    };
    
    const fetchShops = async () => {
        const data = await getAllShops();
        setShops(data?.data);
    };

    useEffect(() => {
        fetchCategories();
        fetchShops();
    }, []);


    const [selectedShopNames, setSelectedShopNames] = useState<string[]>([]);
    const [shopst, setShopst] = useState<string[]>([]);

    const handleShopClick = async (shopId: string, name: string) => {
        handleRefresh();
        const index = shopst.indexOf(shopId);
        if (index === -1) {
            setShopst([...shopst, shopId]);
            setSelectedShopNames([...selectedShopNames, name]);
        } else {
            setShopst(shopst.filter(id => id !== shopId));
            setSelectedShopNames(selectedShopNames.filter(shopName => shopName !== name));
        }
        handleRefresh();
    };
    const handleRefresh = () => {
        setRefresh(!refresh);
    }
    const [categoryIdt, setCategoryId] = useState<string[]>([]);
    const [categoryName, setCategoryName] = useState<string[]>([]);
    const handleCategoryClick = (categoryId: string, name: string) => {
        handleRefresh();
        const index = categoryIdt.indexOf(categoryId);
        if (index === -1) {
            setCategoryId([...categoryIdt, categoryId]);
            setCategoryName([...categoryName, name]);
        } else {
            setCategoryId(categoryIdt.filter(id => id !== categoryId));
            setCategoryName(categoryName.filter(catName => catName !== name));
        }
        handleRefresh();
    };
    const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
    const [multioletStorage, setMultioletStorage] = useState<string[]>([]);
    const handleSelectStorage = (storage: string) => {
        handleRefresh();
        const index = multioletStorage.indexOf(storage);
        if (index === -1) {
            setMultioletStorage([...multioletStorage, storage]);
            setSelectedStorage([...selectedStorage, storage]);
        } else {
            setMultioletStorage(multioletStorage.filter(storaged => storaged !== storage));
            setSelectedStorage(selectedStorage.filter(storaged => storaged !== storage));
        }
        handleRefresh();
    };
    const [selectedRam, setSelectedRam] = useState<string[]>([]);
    const [multipleRam, setMultipleRam] = useState<string[]>([]);
    const handleSelectRam = async (ram: string) => {
        handleRefresh();
        // setSelectedRam(ram);
        const index = multipleRam.indexOf(ram);
        if (index === -1) {
            setMultipleRam([...multipleRam, ram]);
            setSelectedRam([...selectedRam, ram]);
        } else {
            setMultipleRam(multipleRam.filter(ramT => ramT !== ram));
            setSelectedRam(multipleRam.filter(ramT => ramT !== ram));
        }
        handleRefresh();
    };
    const [selectedCamera, setSelectedCamera] = useState<string[]>([]);
    const [multipleCamera, setMultipleCamera] = useState<string[]>([]);
    const handleSelectCamera = async (camera: string) => {
        handleRefresh();
        const index = multipleCamera.indexOf(camera);
        if (index === -1) {
            setMultipleCamera([...multipleCamera, camera]);
            setSelectedCamera([...selectedCamera, camera]);
        } else {
            setMultipleCamera(multipleCamera.filter(cameraT => cameraT !== camera));
            setSelectedCamera(multipleCamera.filter(cameraT => cameraT !== camera));
        }
        handleRefresh();
    };
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [multipleColors, setMultipleColors] = useState<string[]>([]);
    const handleSelectColors = async (colors: string) => {
        handleRefresh();
        const index = multipleColors.indexOf(colors);
        if (index === -1) {
            setMultipleColors([...multipleColors, colors]);
            setSelectedColors([...selectedColors, colors]);
        } else {
            setMultipleColors(multipleColors.filter(colorsT => colorsT !== colors));
            setSelectedColors(multipleColors.filter(colorsT => colorsT !== colors));
        }
        handleRefresh();
    };
    const [selectedType, setSelectedType] = useState<string>();
    const [selectedscreen, setSelectedsecreen] = useState<string[]>([]);
    const [multiplesecreen, setMultiplesecreen] = useState<string[]>([]);
    const handleSelectsecreen = async (secreen: string) => {
        handleRefresh();
        const index = multiplesecreen.indexOf(secreen);
        if (index === -1) {
            setMultiplesecreen([...multiplesecreen, secreen]);
            setSelectedsecreen([...selectedscreen, secreen]);
        } else {
            setMultiplesecreen(multiplesecreen.filter(secreenT => secreenT !== secreen));
            setSelectedsecreen(multiplesecreen.filter(secreenT => secreenT !== secreen));
        }
        // setSelectedCamera(camera);
        handleRefresh();
    };
    const [comparisonData, setComparisonData] = useState<any>([]);

    useEffect(() => {
        if (!userId) return; // Prevent API call if userId is null or undefined
        const fetchComparison = async () => {
            try {
                const response = await getComparison(userId);
                setComparisonData(response);
                handleRefresh();
            } catch (error) {
                console.error("Error fetching comparison data:", error);
            }
        };
        fetchComparison();
    }, [userId, deleteRefresh]);

    const comparedProductId = comparisonData?.productsInfo?.map((product: any) => product._id);
    const handleAddProductIdToLocalStorageCompare = (productId: string) => {
        const productIds = localStorage.getItem('compareProductIds');
    
        if (productIds) {
          const productIdsArray = JSON.parse(productIds);
          
          // Check if the product is already in the comparison list
          if (productIdsArray.includes(productId)) {
            toast.warn('Product is already in comparison!');
            return;
          }
    
          // Limit comparison to 4 products
          if (productIdsArray.length < 4) {
            const updatedProductIds = [...productIdsArray, productId];
            localStorage.setItem('compareProductIds', JSON.stringify(updatedProductIds));
            setLocastorageCompareProductIds(updatedProductIds);
          } else {
            toast.error('You can only compare up to 4 products!');
          }
        } else {
          // Initialize comparison with the first product
          localStorage.setItem('compareProductIds', JSON.stringify([productId]));
          setLocastorageCompareProductIds([productId]);
        }
      };
    

    const handleRemoveProductIdFromLocalStorageCompare = (productId: any) => {
        handleRefresh()
        const productIds = localStorage.getItem('compareProductIds');
        if (productIds) {
            handleRefresh()
            const productIdsArray = JSON.parse(productIds);
            const updatedProductIdsArray = productIdsArray.filter((id: any) => id !== productId);
            localStorage.setItem('compareProductIds', JSON.stringify(updatedProductIdsArray));
            setLocastorageCompareProductIds(JSON.stringify(updatedProductIdsArray));
            handleRefresh()
        }
        handleRefresh()
    }

    const cardsPerPage = 24;
    const totalProducts = productsData?.length;
    const [, setOpen] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    // const onClose = () => {
    //     setOpen(false);
    // };
    const showBottomDrawer = () => {
        setOpenBottom(true);
    };
    const onCloseBottom = () => {
        setOpenBottom(false);
    };
    const handlePageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, totalProducts);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [searchValue, setSearchValue] = useState("");
    const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(300);
    const handlePriceRangeChange = (min: number, max: number) => {
        setMinPrice(min);
        setMaxPrice(max);
    };
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY;
            if (top > 100) {  // Adjust this value based on your layout
                setFixed(true);
            } else {
                setFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [sortOrder, setSortOrder] = useState<'ascending' | 'descending' | 'cheaper' | 'expensive'>('ascending');
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'ascending') {
            setSortOrder('ascending');
        } else if (selectedValue === 'descending') {
            setSortOrder('descending');
        } else if (selectedValue === 'cheaper') {
            setSortOrder('cheaper');
        } else if (selectedValue === 'expensive') {
            setSortOrder('expensive');
        }

    };
    const categoryIdToUse: string[] = Array.isArray(categoryIdt) && categoryIdt.length > 0 ? categoryIdt : (catID ? [catID] : []);
    const shopIdToUse: string[] = Array.isArray(shopst) && shopst.length > 0 ? shopst : (shopsId ? [shopsId] : []);
    useEffect(() => {
        const fetchProducts = async () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort('New request made');
            }
            // Create a new AbortController for the current request
            const abortController = new AbortController();
            abortControllerRef.current = abortController;

            setProductsData([]);
            const response = await getAllProducts(minPrice, maxPrice, categoryIdToUse, shopIdToUse, multipleRam,multioletStorage, multipleCamera, multipleColors,multiplesecreen, abortController.signal);
            const allProducts = response?.data?.products;
            let sortedProducts = allProducts;
            if (sortOrder === 'ascending') {
                sortedProducts = allProducts?.sort((a: any, b: any) => a.product_name.localeCompare(b.product_name));
            } else if (sortOrder === 'descending') {
                sortedProducts = allProducts?.sort((a: any, b: any) => b.product_name.localeCompare(a.product_name));
            } else if (sortOrder === 'cheaper') {
                sortedProducts = allProducts?.sort((a: any, b: any) => a.our_price - b.our_price);
            } else if (sortOrder === 'expensive') {
                sortedProducts = allProducts?.sort((a: any, b: any) => b.our_price - a.our_price);
            }
            const productNames = sortedProducts?.map((product: any) => product.product_name);
            setAutocompleteOptions(productNames);
            const filteredProducts = sortedProducts?.filter((product: any) =>
                product.product_name.toLowerCase().includes(searchValue.toLowerCase())
            ).map((product: any) => ({
                ...product,
                checked: comparedProductId?.includes(product._id)
            }));
            setProductsData(filteredProducts);
        };
        fetchProducts();
        
        // Cleanup function to cancel the request when the component unmounts
        return () => {
            if (abortControllerRef.current) {
            abortControllerRef.current.abort('Component unmounted');
            }
        };
  
    }, [searchValue, refresh, deleteRefresh, minPrice, maxPrice, sortOrder, shopst]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    let filters: any[] = [];
    const generateActiveFilters = () => {
        if (categoryName.length) {
            filters.push(...categoryName);
        }
        if (selectedShopNames.length) {
            filters.push(...selectedShopNames);
        }
        if (selectedStorage.length) {
            filters.push(...selectedStorage);
        }
        if (selectedRam.length) {
            filters.push(...selectedRam);
        }
        if (selectedCamera.length) {
            filters.push(...selectedCamera);
        }
        if (selectedType) {
            filters.push(selectedType);
        }
        if (selectedColors.length) {
            filters.push(...selectedColors);
        }
        if (selectedscreen.length) {
            filters.push(...selectedscreen);
        }
        return filters;
    };
    useEffect(() => {
        const activeFilters = generateActiveFilters();
        setActiveFilters(activeFilters);
    }, [categoryName, selectedStorage, selectedRam, selectedCamera, selectedType, selectedColors, selectedscreen, selectedShopNames]);

    const handleSetDropDownFilter = () => {
        setIsDropDownFilter(!isDropDownFilter);
    };

    return (
        <><div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <AllProdNavs />
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-20 pl-2 flex flex-col'>
                <div className='w-full mt-6 h-fit flex flex-row'>
                    <SideBar
                        clearFilters={clearFilters}
                        productsData={productsData}
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        categories={categories}
                        shops={shops}
                        handleCategoryClick={handleCategoryClick}
                        handleShopCkik={handleShopClick}
                        onPriceRangeChange={handlePriceRangeChange}
                        handleSelectRam={handleSelectRam}
                        handleSelectCamera={handleSelectCamera}
                        handleSelectStorage={handleSelectStorage}
                        handleSelectColors={handleSelectColors}
                        handleSelectscreen={handleSelectsecreen}
                        selectedCategories={categoryIdt}
                        selectedStorage={selectedStorage}
                        selectedColors={selectedColors}
                        selectedscreen={selectedscreen}
                        selectedRam={selectedRam}
                        selectedCamera={selectedCamera}
                        selectedShops={shopst} />
                    <div className={`lg:w-[70%] md:w-full w-full flex flex-col h-fit ${isSidebarOpen ? "hidden" : ""}`}>
                        <div className='topMenus w-full flex md:flex-row flex-col justify-between'>
                            <div className='searchBar md:w-[50%] w-full bg-[#F5F5F5] rounded-md pr-3'>
                                <input
                                    type='text'
                                    placeholder='Shakisha telefoni ukoresheje izina'
                                    className='p-2 outline-none w-[95%] rounded-md bg-[#F5F5F5]'
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    list="autocomplete-options" />
                                <datalist draggable id="autocomplete-options" className=''>
                                    {autocompleteOptions?.map((option, index) => (
                                        <option key={index} value={option} />
                                    ))}
                                </datalist>
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                            <div className={`${fixed ? 'fixed top-0 pb-2 px-3 left-0 z-50 w-full md:pb-0' : ''} fixAtTop w-full md:w-fit ml-auto flex justify-between bg md:justify-end bg-white`}>
                                <button onClick={toggleSidebar} className='w-fit border border-green-500  md:hidden flex md:mt-0 p-2 mt-3 rounded-md  self-end float-right justify-end'>
                                    <TbAdjustmentsHorizontal className='flex my-auto mr-1 text-lg' />
                                    Akayunguruzo
                                </button>
                                <div className='w-fit flex border border-green-500 mxc-auto md:mt-0 p-2 py-[10.5px] mt-3 rounded-md bg-[#F5F5F5] self-end float-right justify-end'>
                                    <p className='text-base my-auto'><HiMiniArrowsUpDown /></p>
                                    <select className='rounded-md w-fit outline-none bg-[#F5F5F5]' onChange={handleSortChange}>
                                        <option value="ascending">Inshya iwacu</option>
                                        <option value="descending">Izikuzwe</option>
                                        <option value="cheaper">Izihendutse</option>
                                        <option value="expensive">Izihenze</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='products justify-between w-full flex bg-yellow-100 py-3 px-2 mt-3'>
                            <div className='filtersDiv flex relative'>
                                {/* <button onClick={toggleSidebar}>
                                    <MdFilterList className='text-xl cursor-pointer flex lg:hidden my-auto mr-4' />
                                </button> */}
                                <p className='text-sm my-auto text-green-600'>
                                    {activeFilters?.length === 0 ? '' : activeFilters.length > 1 ? `Utuyunguruzo ${activeFilters.length}` : `Akayunguruzo ${activeFilters.length}`} Habonekamo {productsData?.length}
                                </p>
                                <button className='' onClick={handleSetDropDownFilter}><div className='flex md:hidden justify-center items-center my-auto ml-3 text-sm'>
                                    {!isDropDownFilter ? <>
                                        <Eye /><p className=' text-xs flex'>turebe</p>
                                    </> : <><EyeSlash /><p className=' text-xs flex'>Hisha</p></>}
                                </div></button>
                                {isDropDownFilter && (
                                    <div className='flex z-0 absolute top-6 left-32 flex-col bg-gray-200 p-2 h-fit w-fit rounded-sm'>
                                        {activeFilters.map((filter, index) => (
                                            <div key={index} className=" items-center flex bg-gray-200 rounded-md p-1 m-1">
                                                <p className="text-sm text-gray-800">{filter}</p>
                                                <button onClick={() => clearFilter(filter)} className="ml-1 focus:outline-none">
                                                    <FaTimes className="text-xs text-gray-800" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>)}
                                <div className='lg:flex hidden'>
                                    {activeFilters.map((filter, index) => (
                                        <div key={index} className="flex items-center bg-gray-200 rounded-md p-1 mx-1">
                                            <p className="text-sm text-gray-800">{filter}</p>
                                            <button onClick={() => clearFilter(filter)} className="ml-1 focus:outline-none">
                                                <FaTimes className="text-xs text-gray-800" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {catID && <div className='flex items-center bg-gray-200 rounded-md p-1 mx-1'>
                                    <p className="text-sm text-gray-800">{categories.find((cat: any) => cat._id === catID)?.name}</p>
                                    <button onClick={() => {
                                        navigate(-1)
                                        clearFilter(categories.find((cat: any) => cat._id === catID)?.name)
                                    }
                                    } className="ml-1 focus:outline-none">
                                        <FaTimes className="text-xs text-gray-800" />
                                    </button>
                                </div>}
                                {shopsId && <div className='flex items-center bg-gray-200 rounded-md p-1 mx-1'>
                                    {/* {shops.map((shop: any) => 
                                    <p className="text-sm text-gray-800">{shop.name}</p>)} */}
                                    <p className="text-sm text-gray-800">{shops.find((shop: any) => shop._id === shopsId)?.name}</p>
                                    <button onClick={() => {
                                        navigate(-1)
                                        clearFilter(shops.find((shop: any) => shop._id === shopsId)?.name)
                                    }
                                    } className="ml-1 focus:outline-none">
                                        <FaTimes className="text-xs text-gray-800" />
                                    </button>
                                </div>}
                            </div>
                            {activeFilters.length > 1 &&
                                <button className='w-fit bg-[#fa3e3e] h-fit text-xs p-1 text-white px-3 rounded-md' onClick={clearFilters}>Siba twose</button>
                            }
                        </div>
                        <div className='products grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-12 md:gap-8 gap-3 mx-auto justify-center items-center mt-3'>
                            {productsData?.slice(startIndex, endIndex)?.map((product) => (
                                <div key={product._id} className='productCard md:w-[222px] w-[170px] border border-black rounded-md p-3 md:min-h-[200px] md:h-fit min-h-[256px] h-fit  m-auto justify-center flex flex-col'>
                                    <Link to={`/product/${product?._id}`} className="flex justify-center">
                                        <img src={product.product_image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-contain mb-1" />
                                    </Link>
                                    <div className='w-full h-fit m-auto flex flex-col justify-center items-start bg-white rounded-md p-2'>
                                        <Link to={`/product/${product?._id}`} className='text-sm font-semibold'>{product?.product_name?.length > 40 ? product?.product_name?.substring(0, 40) + '...' : product?.product_name?.substring(0, 40)}</Link>
                                        <p className='text-sm text-gray-600 line-through'>{product?.vendor_prices?.length >=1 && product.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price}Rwf</p>
                                        <Link to={`/product/${product?._id}`} className='text-sm text-green-600 flex justify-end mx-auto'>{product?.our_price}Rwf</Link>
                                        <Link to={`/product/${product?._id}`} className='bg-black py-[2px] px-8 text-center mx-auto rounded-md w-fit text-yellow-500 text-sm'>Yirebe</Link>
                                    </div>
                                    <div className='checkboxWithvalues px-2 text-sm w-full flex'>
                                        <PorductCheckInput
                                            label='Gereranya'
                                            name='compare'
                                            productData={{ productId: product._id }}
                                            checked={locastorageCompareProductIds?.includes(product._id) || comparedProductId?.includes(product._id)}
                                            addProductToCompare={() => handleAddProductIdToLocalStorageCompare((product._id))}
                                            onUncheck={() => handleRemoveProductIdFromLocalStorageCompare(product._id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='pagination mt-4 flex justify-center'>
                            <Pagination
                                current={currentPage}
                                onChange={handlePageChange}
                                pageSize={cardsPerPage}
                                total={totalProducts}
                                showSizeChanger={false} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed flex space-x-3 bg-green-200 bottom-10 right-10  px-2 py-1 rounded-md text-white'>
                <button className='view flex my-auto text-black justify-center'><button onClick={showBottomDrawer}><FaArrowCircleUp /></button></button>
                <Link onClick={showDrawer} className='text-sm rounded-md p-[2px] bg-black' to={'compare'}>{!JSON.parse(localStorage.getItem("compareProductIds") as any) ? [] : JSON.parse(localStorage.getItem("compareProductIds") as any)?.length < 2 ? '(' + JSON.parse(localStorage.getItem("compareProductIds") as any)?.length + ')' + '   Yigereranye' : '(' + JSON.parse(localStorage.getItem("compareProductIds") as any)?.length + ')' + ' Zigereranye'}</Link>
            </div>
            {/* <ComparisonDrawer
                open={open}
                onClose={onClose}
                refresh={refresh}
            /> */}
            <BottomDrawer
                open={openBottom}
                onClose={onCloseBottom}
                handleRemoveProductIdFromLocalStorageCompare={handleRemoveProductIdFromLocalStorageCompare}
                refresh={refresh}
            />
        </div><Footer /></>

    );
};

export default Products;
