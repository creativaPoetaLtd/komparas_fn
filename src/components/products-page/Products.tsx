import React, { SetStateAction, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import SideBar from './SideBar'
import SubNav from '../Navigations/SubNav'
import HomeNav from '../home/HomeNav'
import MobileHomeNav from '../home/HomeMobileNav'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { MdFilterList } from 'react-icons/md';
import { getAllProducts, getComparison } from '../../api/product';
import ComparisonDrawer from './ComparisonDrawer';
import { baseUrl } from '../../api';
import PorductCheckInput from './ProdCheck';
import { toast } from 'react-toastify';
import { getAllCategories } from '../../api/getAllCategories';
import { getAllShops } from '../../api/getAllShops';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useSearchParams } from 'react-router-dom';
// import { getProductOnShop } from '../../api/product';
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsData, setProductsData] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [deleteRefresh, setDeleteRefresh] = useState(false);
    const loginInfo: any = localStorage.getItem('KomparasLoginsInfo');
    const userId = JSON.parse(loginInfo)?._id;
    const [categories, setCategories] = useState<any>([]);
    const [shops, setShops] = useState<any>([]);
    const [activeFilters, setActiveFilters] = useState<any[]>([]);
    const [searchParams] = useSearchParams();
    let catId = searchParams.get('categoryId');
    let shopsId = searchParams.get('shopId');
    const clearFilter = (filterType: any) => {
        handleRefresh();
        if (filterType === categoryName) {
            handleRefresh();
            setCategoryName('');
            setCategoryId('');
            catId = '';
            handleRefresh();
        } else if (filterType === selectedShop) {
            handleRefresh();
            setSelectedShop(null);
            setSelectedShopId('');
            handleRefresh();
        } else if (filterType === `RAM: ${selectedRam}`) {
            handleRefresh();
            setSelectedRam('');
            handleRefresh();
        } else if (filterType === `Storage: ${selectedStorage}`) {
            handleRefresh();
            setSelectedStorage('');
            handleRefresh();
        } else if (filterType === `Camera: ${selectedCamera}`) {
            handleRefresh();
            setSelectedCamera('');
            handleRefresh();
        } else if (filterType === `Type: ${selectedType}`) {
            handleRefresh();
            setSelectedType('');
            handleRefresh();
        }
        handleRefresh();
    };
    const clearFilters = () => {
        handleRefresh();
        setCategoryName('');
        setCategoryId('');
        setSelectedStorage('');
        setSelectedCamera('');
        setSelectedType('');
        setSelectedShopId('');
        setSelectedShop(null);
        setSelectedRam('');
        handleRefresh();
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            setCategories(data?.data);
        }
        fetchCategories();
    }
        , []);
    useEffect(() => {
        const fetchShops = async () => {
            const data = await getAllShops();
            setShops(data?.data);
        }
        fetchShops();
    }
        , []);

    const [selectedShop, setSelectedShop] = useState<string | null>(null);
    const [selectedShopId, setSelectedShopId] = useState<string>();
    const handleShopClick = async (shopId: string, name: any) => {
        handleRefresh();
        setSelectedShop(name);
        setSelectedShopId(shopId);
        handleRefresh();
    };
    const handleRefresh = () => {
        setRefresh(!refresh);
    }
    const handleDeleteRefresh = () => {
        setDeleteRefresh(!deleteRefresh);
    }
    const [comparisonData, setComparisonData] = useState<any>([]);
    useEffect(() => {
        const fetchComparison = async () => {
            const response = await getComparison(userId);
            setComparisonData(response);
            handleRefresh();
        };
        fetchComparison();
    }, [userId, deleteRefresh]);
    const compLemgth = comparisonData?.productsInfo?.length;
    const comparedProductId = comparisonData?.productsInfo?.map((product: any) => product._id);
    const addProductToCompare = async (productData: { productId: any; }) => {
        const data = { userId, productId: productData.productId };
        const res = await fetch(`${baseUrl}/comparison`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (resData?.comparison?.userId) {
            toast.success(resData?.message);
            handleRefresh();
            getComparison(userId);
            handleDeleteRefresh();
        } else {
            toast.error(resData?.message);
        }
        return await resData;
    };
    const cardsPerPage = 10;
    const totalProducts = productsData?.length;
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
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
    const [categoryId, setCategoryId] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const handleCategoryClick = async (categoryId: string, categoryName: string) => {
        handleRefresh();
        setCategoryId(categoryId);
        setCategoryName(categoryName);
        handleRefresh();
    }
    const [selectedRam, setSelectedRam] = useState<string>();
    const handleSelectRam = async (ram: string) => {
        handleRefresh();
        setSelectedRam(ram);
        handleRefresh();
    };
    const [selectedStorage, setSelectedStorage] = useState<string>();
    const handleSelectStorage = async (storage: string) => {
        handleRefresh();
        setSelectedStorage(storage);
        handleRefresh();
    };
    const [selectedCamera, setSelectedCamera] = useState<string>();
    const handleSelectCamera = async (camera: string) => {
        handleRefresh();
        setSelectedCamera(camera);
        handleRefresh();
    };
    const [selectedType, setSelectedType] = useState<string>();
    const handleSelectType = async (type: string) => {
        handleRefresh();
        setSelectedType(type);
        handleRefresh();
    };
    const [sortOrder, setSortOrder] = useState<'ascending' | 'descending'>('ascending');
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'ascending') {
            setSortOrder('ascending');
        } else if (selectedValue === 'descending') {
            setSortOrder('descending');
        }
    };
    const categoryIdToUse = categoryId ? categoryId : catId ? catId : '';
    const shopIdToUse = selectedShopId ? selectedShopId : shopsId ? shopsId : '';
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getAllProducts(minPrice, maxPrice, categoryIdToUse, shopIdToUse, selectedRam, selectedStorage, selectedCamera, selectedType);
            const allProducts = response?.data?.products;
            let sortedProducts = allProducts;
            if (sortOrder === 'ascending') {
                sortedProducts = allProducts?.sort((a: any, b: any) => a.product_name.localeCompare(b.product_name));
            } else if (sortOrder === 'descending') {
                sortedProducts = allProducts?.sort((a: any, b: any) => b.product_name.localeCompare(a.product_name));
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
    }, [searchValue, refresh, deleteRefresh, minPrice, maxPrice, sortOrder]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    const deleteProductFromComparison = async (productIdToDelete: any) => {
        const comparisonToDelete = comparisonData?.comparisons.find((comparison: { productId: any; }) =>
            comparison.productId === productIdToDelete
        );
        if (comparisonToDelete) {
            try {
                const response = await fetch(`${baseUrl}/comparison/${comparisonToDelete._id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                toast.success(data.message);
                getComparison(userId);
                handleDeleteRefresh()
            } catch (error) {
                console.error('Error deleting product from comparison:', error);
            }
        }
    };
    let filters: any[] = [];
    const generateActiveFilters = () => {
        if (categoryName) {
            filters.push(categoryName);
        }
        if (selectedShop) {
            filters.push(selectedShop);
        }
        if (selectedRam) {
            filters.push(`RAM: ${selectedRam}`);
        }
        if (selectedStorage) {
            filters.push(`Storage: ${selectedStorage}`);
        }
        if (selectedCamera) {
            filters.push(`Camera: ${selectedCamera}`);
        }
        if (selectedType) {
            filters.push(`Type: ${selectedType}`);
        }
        return filters;
    };
    useEffect(() => {
        const activeFilters = generateActiveFilters();
        setActiveFilters(activeFilters);
    }, [categoryName, selectedShop, selectedRam, selectedCamera, selectedStorage, selectedType]);

    const [isDropDownFilter, setIsDropDownFilter] = useState(false);

    const handleSetDropDownFilter = () => {
        setIsDropDownFilter(!isDropDownFilter);
    };

    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-20 pl-2 flex flex-col'>
                <div className='w-full mt-6 h-fit flex flex-row'>
                    <SideBar handleSelectRam={handleSelectRam} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} categories={categories} shops={shops} handleCategoryClick={handleCategoryClick} handleShopCkik={handleShopClick} onPriceRangeChange={handlePriceRangeChange} handleSelectCamera={handleSelectCamera} handleSelectStorage={handleSelectStorage} handleSelectType={handleSelectType} />
                    <div className={`lg:w-[70%] md:w-full w-full flex flex-col h-fit ${isSidebarOpen ? "hidden" : ""}`}>
                        <div className='topMenus w-full flex md:flex-row flex-col justify-between'>
                            <div className='searchBar md:w-[50%] w-full bg-[#F5F5F5] rounded-md pr-3'>
                                <input
                                    type='text'
                                    placeholder='Search for product'
                                    className='p-2 outline-none w-[95%] rounded-md bg-[#F5F5F5]'
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    list="autocomplete-options"
                                />
                                <datalist draggable id="autocomplete-options" className=''>
                                    {autocompleteOptions?.map((option, index) => (
                                        <option key={index} value={option} />
                                    ))}
                                </datalist>
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                            <div className='w-fit flex md:mt-0 mt-3 self-end float-right justify-end'>
                                <p className='text-sm my-auto'>Sort by:</p>
                                <select className='ml-2 p-2 rounded-md bg-[#F5F5F5]' onChange={handleSortChange}>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </div>
                        <div className='products justify-between w-full flex bg-[#F2F4F5] p-3 mt-3'>
                            <div className='filtersDiv flex relative'>
                                <button onClick={toggleSidebar}>
                                    <MdFilterList className='text-xl cursor-pointer flex lg:hidden my-auto mr-4' />
                                </button>
                                <p className='text-sm my-auto text-gray-600'>Active Filters:</p>
                                <button className='' onClick={handleSetDropDownFilter}><div className='flex md:hidden justify-center items-center my-auto ml-3 text-sm'>
                                    {!isDropDownFilter ? <>
                                        <Eye /><p className=' text-xs flex'>View</p>
                                    </> : <><EyeSlash /><p className=' text-xs flex'>Hide</p></>}
                                </div></button>
                                {isDropDownFilter && (
                                    <div className='flex z-0 absolute top-6 left-32 flex-col bg-gray-200 p-2 h-fit w-fit rounded-sm'>

                                        {activeFilters.map((filter, index) => (
                                            <div key={index} className=" items-center flex bg-gray-200 rounded-md p-1 m-1">
                                                <p className="text-sm text-gray-800">{filter}</p>
                                                <button onClick={() => clearFilter(filter)} className="ml-1 focus:outline-none">
                                                    <FaTimes className="text-gray-500" />
                                                </button>

                                            </div>
                                        ))}
                                        <button onClick={() => {
                                            clearFilters
                                            handleSetDropDownFilter()
                                        }} className="ml-2 w-fit text-sm flex text-gray-500 focus:outline-none">
                                            <p className='text-sm'>Clear All</p>
                                            <FaTimes className='flex justify-center my-auto ml-2' />
                                        </button>
                                    </div>
                                )}
                                {activeFilters.map((filter, index) => (
                                    <div key={index} className="md:flex hidden items-center bg-gray-200 rounded-md p-1 m-1">
                                        <p className="text-sm text-gray-800">{filter}</p>
                                        <button onClick={() => clearFilter(filter)} className="ml-1 focus:outline-none">
                                            <FaTimes className="text-gray-500" />
                                        </button>
                                    </div>
                                ))}
                                <button onClick={clearFilters} className="ml-2 md:flex hidden text-gray-500 text-sm justify-center my-auto items-center focus:outline-none">
                                    Clear All
                                </button>
                            </div>
                            <div className='flex flex-row'>
                                <p className='text-sm my-auto font-semibold'>
                                    {productsData?.length}
                                </p>
                                <p className='text-sm my-auto ml-2'>Results found.</p>
                            </div>
                        </div>
                        <div className='products grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-12 md:gap-8 gap-3 mx-auto justify-center items-center mt-3'>
                            {productsData?.slice(startIndex, endIndex)?.map((product, index) => (
                                <div key={index} className='productCard md:w-[222px] w-[170px] border border-black rounded-md p-3 md:h-[296px] h-[256px]  m-auto justify-center flex flex-col'>
                                    <div className='md:w-[202px] w-[150px] m-auto self-center justify-center flex h-[172px]  rounded-md'>
                                        <img src={product?.product_image} alt="" className='w-full h-full' />
                                    </div>
                                    <div className='w-full h-[124px] m-auto flex flex-col justify-center items-start bg-white rounded-md p-2'>
                                        <h1 className='text-sm font-semibold'>{product?.product_name?.length > 40 ? product?.product_name?.substring(0, 40) + '...' : product?.product_name?.substring(0, 40)}</h1>
                                        <p className='text-sm text-gray-600'>${product.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price}</p>
                                        <p className='text-sm text-yellow-500'>Shops({product?.vendor_prices.length})</p>
                                    </div>
                                    <div className='checkboxWithvalues w-full flex'>
                                        <PorductCheckInput
                                            label='Add to compare'
                                            name='compare'
                                            productData={{ productId: product._id }}
                                            checked={product.checked}
                                            addProductToCompare={addProductToCompare}
                                            onUncheck={() => deleteProductFromComparison(product._id)}
                                        />
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
                                showSizeChanger={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={showDrawer} className='fixed bottom-10 right-10 bg-yellow-500 p-3 rounded-full text-white'>
                <p className='text-sm'>Compare {compLemgth} items</p>
            </button>
            <ComparisonDrawer
                handleDelete={deleteProductFromComparison}
                open={open}
                onClose={onClose}
                comparisonData={comparisonData}
            />
        </div>
    );
};

export default Products;
