import React, { SetStateAction, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import CheckboxInput from './CheckboxButton'
import SideBar from './SideBar'
import SubNav from '../Navigations/SubNav'
import HomeNav from '../home/HomeNav'
import MobileHomeNav from '../home/HomeMobileNav'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { MdFilterList } from 'react-icons/md';
import { getAllProducts } from '../../api/product';

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsData, setProductsData] = useState<any[]>([]);
    const cardsPerPage = 10;
    const totalProducts = productsData.length;

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

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getAllProducts();
            const allProducts = response?.data?.products;

            // Extract product names for autocomplete options
            const productNames = allProducts.map((product: any) => product.product_name);
            setAutocompleteOptions(productNames);

            // Filter products based on search input
            const filteredProducts = allProducts.filter((product: any) =>
                product.product_name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setProductsData(filteredProducts);
        };
        fetchProducts();
    }, [searchValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-20 pl-2 flex flex-col'>
                <div className='w-full mt-6 h-fit flex flex-row'>
                    <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
                                    {autocompleteOptions.map((option, index) => (
                                        <option key={index} value={option} />
                                    ))}
                                </datalist>
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                            <div className='w-fit flex md:mt-0 mt-3 self-end float-right justify-end'>
                                <p className='text-sm my-auto'>Sort by:</p>
                                <select className='ml-2 p-2 rounded-md bg-[#F5F5F5]'>
                                    <option value="popularity">Popularity</option>
                                    <option value="price">Price</option>
                                    <option value="latest">Latest</option>
                                </select>
                            </div>
                        </div>
                        <div className='products justify-between w-full flex bg-[#F2F4F5] p-3 mt-3'>
                            <div className='flex'>
                                <button onClick={toggleSidebar}>
                                    <MdFilterList className='text-xl cursor-pointer flex lg:hidden my-auto mr-4' />
                                </button>
                                <p className='text-sm my-auto text-gray-600'>Active Filters</p>
                                <p className='text-sm my-auto ml-2 font-semibold'>Clear All</p>
                                <FaTimes className='text-sm my-auto ml-2 font-semibold' />
                            </div>
                            <div className='flex flex-row'>
                                <p className='text-sm my-auto font-semibold'>65,867</p>
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
                                        <p className='text-sm text-gray-600'>${product.vendor_prices[0].price}</p>
                                        <p className='text-sm text-yellow-500'>Shops({product?.vendor_prices.length})</p>
                                    </div>
                                    <div className='checkboxWithvalues w-full flex'>
                                        <CheckboxInput label='Add to compare' name='compare' />
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
        </div>
    );
};

export default Products;
