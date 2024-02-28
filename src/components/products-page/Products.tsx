import HomeNav from '../home/HomeNav'
import SubNav from '../Navigations/SubNav'
import MobileHomeNav from '../home/HomeMobileNav'
import { FaSearch, FaTimes } from 'react-icons/fa'
import prod from "../../assets/prod.png"
import { Checkbox, Radio } from 'antd'
import { Slider } from 'antd';
import { useState } from 'react'
import ads from '../../assets/ads.png'


const Products = () => {
    const [disabled, setDisabled] = useState(false);
    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-10 pl-2 flex flex-col'>
                <div className='w-full mt-6 h-fit flex flex-row'>
                    <div className='w-[30%] min-h-screen  flex flex-col h-fit'>
                        <div className='flex flex-col'>
                            <p className='text-sm font-semibold text-gray-600'>Categories</p>
                            <div className='flex flex-col'>
                                <Radio>Electronic</Radio>
                                <Radio>Phones</Radio>
                                <Radio>Computers</Radio>
                                <Radio>Home Appliances</Radio>
                                <Radio>Health & Beauty</Radio>
                                <Radio>Home & Garden</Radio>
                                <Radio>Accessories</Radio>
                                <Radio>Entertainment</Radio>
                                <Radio>Others</Radio>
                            </div>
                        </div>
                        <div className='priceRange flex flex-col mt-3'>
                            <p className='text-sm font-semibold text-gray-600'>Price Range</p>
                            <Slider
                                style={{ color: '#EDB62E' }}
                                range defaultValue={[20, 50]} disabled={disabled} className='text-yellow-600' />
                            <div className='minAndMaxButtins flex justify-between'>
                                <button className='text-sm text-gray-600 py-3 px-4 rounded-md border border-gray-700'>Min Price</button>
                                <button className='text-sm text-gray-600 py-3 px-4 rounded-md border border-gray-700'>Max Price</button>
                            </div>
                            <div className='flex flex-col mt-3'>
                                <Radio>All price</Radio>
                                <Radio>Under $25</Radio>
                                <Radio>$25 to $50</Radio>
                                <Radio>$50 to $100</Radio>
                                <Radio>$100 to $200</Radio>
                                <Radio>$200 & Above</Radio>
                            </div>
                        </div>
                        <div className='brands flex flex-col mt-3'>
                            <p className='text-sm font-semibold text-gray-600'>Brands</p>
                            <div className='flex-col grid grid-cols-2'>
                                <Checkbox>Apple</Checkbox>
                                <Checkbox>Samsung</Checkbox>
                                <Checkbox>HP</Checkbox>
                                <Checkbox>Dell</Checkbox>
                                <Checkbox>Lenovo</Checkbox>
                                <Checkbox>Microsoft</Checkbox>
                                <Checkbox>LG</Checkbox>
                                <Checkbox>Sony</Checkbox>
                                <Checkbox>Canon</Checkbox>
                                <Checkbox>Philips</Checkbox>
                                <Checkbox>LG</Checkbox>
                                <Checkbox>LG</Checkbox>
                            </div>

                        </div>
                        <div className='flex flex-col mt-3'>
                            <p className='text-sm font-semibold text-gray-600'>Types</p>
                            <div className='flex-col grid grid-cols-2'>
                                <Checkbox>Smartphones</Checkbox>
                                <Checkbox>Laptops</Checkbox>
                            </div>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <p className='text-sm font-semibold text-gray-600'>Storage</p>
                            <div className='flex-col grid grid-cols-2'>
                                <Checkbox>16GB</Checkbox>
                                <Checkbox>32GB</Checkbox>
                                <Checkbox>64GB</Checkbox>
                                <Checkbox>128GB</Checkbox>
                                <Checkbox>256GB</Checkbox>
                                <Checkbox>512GB</Checkbox>
                                <Checkbox>1TB</Checkbox>
                            </div>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <p className='text-sm font-semibold text-gray-600'>RAM Size</p>
                            <div className='flex-col grid grid-cols-2'>
                                <Checkbox>2GB</Checkbox>
                                <Checkbox>4GB</Checkbox>
                                <Checkbox>8GB</Checkbox>
                                <Checkbox>16GB</Checkbox>
                                <Checkbox>32GB</Checkbox>
                                <Checkbox>64GB</Checkbox>
                                <Checkbox>128GB</Checkbox>
                            </div>
                        </div>
                        <div className='flex flex-col mt-3'>
                            <p className='text-sm font-semibold text-gray-600'>Camera</p>
                            <div className='flex-col grid grid-cols-2'>
                                <Checkbox>12MP</Checkbox>
                                <Checkbox>16MP</Checkbox>
                                <Checkbox>20MP</Checkbox>
                                <Checkbox>24MP</Checkbox>
                                <Checkbox>32MP</Checkbox>
                                <Checkbox>48MP</Checkbox>
                                <Checkbox>64MP</Checkbox>
                            </div>
                        </div>
                        <div className='flex flex-col mt-3'>
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
                    <div className='w-[70%] flex flex-col h-fit'>
                        <div className='topMenus w-full flex justify-between'>
                            <div className='searchBar w-[50%] bg-[#F5F5F5] rounded-md pr-3'>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className='p-2 outline-none w-[95%] rounded-md bg-[#F5F5F5]'
                                />
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                            <div className='w-fit flex'>
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
                                <p className='text-sm my-auto text-gray-600'>Active Filters</p>
                                <p className='text-sm my-auto ml-2 font-semibold'>Clear All</p>
                                <FaTimes className='text-sm my-auto ml-2 font-semibold' />
                            </div>
                            <div className='flex flex-row'>
                                <p className='text-sm my-auto font-semibold'>65,867</p>
                                <p className='text-sm my-auto ml-2'>Results found.</p>
                            </div>
                        </div>
                        <div className='products grid grid-cols-3 gap-4 mx-auto justify-center items-center mt-3'>
                            <div className='productCard w-[222px] border border-black rounded-md p-3 h-[296px]  m-auto justify-center flex flex-col'>
                                <div className='w-[202px] m-auto self-center justify-center flex h-[172px]  rounded-md'>
                                    <img src={prod} alt="" className='w-full h-full' />
                                </div>
                                <div className='w-full h-[124px] m-auto flex flex-col justify-center items-start bg-white rounded-md p-2'>
                                    <h1 className='text-sm font-semibold'>Phone</h1>
                                    <p className='text-sm text-gray-600'>$865.99</p>
                                    <p className='text-sm text-yellow-500'>Shops(3)</p>
                                </div>
                                <div className='checkboxWithvalues w-full flex'>
                                    <input type="checkbox" name="" id="" className='t text-yellow-600 mr-1' />
                                    <p className='text-sm text-gray-600'>Add to compare</p>
                                </div>
                            </div>
                            <div className='productCard w-[222px] h-[296px] bg-[#F2F4F5] rounded-md'></div>
                            <div className='productCard w-[222px] h-[296px] bg-[#F2F4F5] rounded-md'></div>
                            <div className='productCard w-[222px] h-[296px] bg-[#F2F4F5] rounded-md'></div>
                            <div className='productCard w-[222px] h-[296px] bg-[#F2F4F5] rounded-md'></div>
                            <div className='productCard w-[222px] h-[296px] bg-[#F2F4F5] rounded-md'></div>
                            <div className='productCard w-[222px] h-[296px] bg-[#F2F4F5] rounded-md'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products