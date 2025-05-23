import { Button, Image, Modal } from 'antd';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getPoductById, getRecommendedProducts } from "../../api/product";
import { useParams } from "react-router-dom";
import 'swiper/swiper-bundle.css';
import SubNav from "../Navigations/SubNav";
import HomeNav from "../home/HomeNav";
import MobileHomeNav from "../home/HomeMobileNav";
import ProdNavigations from "./NavIgations";
import MainProductPage from "./MainProductPage";
import ThreeButtons from "./ThreeButtons";
import Footer from "../Footer";
import { SlRefresh } from "react-icons/sl";
import { Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import { useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const ProductPage = () => {
    const [products, setProduct] = useState<any>([]);
    const navigate = useNavigate();
    const { productId }: any = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(productId);
            setProduct(data);
        };
        fetchProduct();
    }, [productId]);
    const [recommendedProducts, setRecommendedProducts] = useState<any>([]);
    const [allProd, setAllProd] = useState<any>([])
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            setLoading(true);
            try {
                const { data } = await getRecommendedProducts(productId);
                setRecommendedProducts(data.recommendedProducts);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        if (productId) {
            fetchRecommendedProducts();
        }
    }, [productId]);
    useEffect(() => {
        const handleProd = async () => {
            const response = await getAllProducts();
            setAllProd(response?.data?.products);
        }
        handleProd();
    }
        , []);

    const [refresh, setRefresh] = useState(false);
    const [imgeSelected, setImgeSelected] = useState<string | null>(null);
    const [img2Selected, setImg2Selected] = useState<string | null>(null);

    useEffect(() => {
        const imgeSelected = localStorage.getItem('selectedProductImage');
        const img2Selected = localStorage.getItem('selectedProductImage2');
        setImgeSelected(imgeSelected);
        setImg2Selected(img2Selected);
    }
        , [refresh, location.pathname]);
    const [openModel1, setOpenModel1] = useState(false);
    const [openModel2, setOpenModel2] = useState(false);
    const [filteredProd, setFilteredProd] = useState<any[]>([]);
    useEffect(() => {
        setFilteredProd(allProd);
    }, [allProd, setFilteredProd, refresh]);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value.toLowerCase();
        const searchWords = search.split(' ').filter(word => word);
        const filteredProducts = searchWords.length
            ? allProd.filter((product: any) =>
                searchWords.every(word =>
                    product.product_name.toLowerCase().includes(word)
                )
            )
            : allProd;
        setFilteredProd(filteredProducts);
    };
    const handelOpenModel1 = () => {
        setOpenModel1(!openModel1);
    }
    const handleOpenModel2 = () => {
        setOpenModel2(!openModel2);
    }
    const handleRefresh = () => {
        setRefresh(!refresh);
    }
    const handleButtonClick = async (productId: string, productImage: string) => {
        localStorage.setItem('selectedProductId', productId);
        localStorage.setItem('selectedProductImage', productImage);
        handelOpenModel1()
        handleRefresh()
    };
    const handleButtonClick2 = (productId: string, productImage: string) => {
        localStorage.setItem('selectedProductImage2', productImage);
        localStorage.setItem('selectedProductId2', productId);
        handleOpenModel2()
        handleRefresh()
    };
    const handleDelete = () => {
        localStorage.removeItem('selectedProductId');
        localStorage.removeItem('selectedProductImage');
        handleRefresh()
    };
    const handleDelete2 = () => {
        localStorage.removeItem('selectedProductId2')
        localStorage.removeItem('selectedProductImage2');
        handleRefresh()
    }
    const handleViewAllProducts = () => {
        navigate("/products");
    }

    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return (
          <button
            className="slick-arrow absolute -bottom-8 md:flex hidden md:right-6 right-0 z-10 text-gray-900 rounded-full w-8 h-8 items-center justify-center"
            onClick={onClick}
          >
            <GoArrowRight />
          </button>
        );
      };
    
      const NextArrow = (props: any) => {
        const { onClick } = props;
        return (
          <button
            className="slick-arrow absolute -bottom-8 md:flex hidden right-14 z-10 text-gray-900 rounded-full w-8 h-8 items-center justify-center"
            onClick={onClick}
          >
            <GoArrowLeft />
          </button>
        );
      };

      const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow: <NextArrow />,
        nextArrow: <PrevArrow />,
        responsive: [
          { breakpoint: 1280, settings: { slidesToShow: 4 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 2 } },
          { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
      };
    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-24 px-2 flex flex-col'>
                <ProdNavigations products={products} />
                <MainProductPage products={products} />
                <div className="w-full h-fit justify-between flex md:flex-row flex-col md:mt-12 mt-4">
                    <ThreeButtons products={products} />
                    <div className="md:w-[40%] w-full md:mt-0 mt-4 flex flex-col">
                        <div className="compareDiv border border-[#0C203B] p-2 rounded-md lg:w-[414px] md:w-[360px] flex flex-col">
                            <div className="treePic flex flex-row justify-between items-center">
                                <div className="flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md">
                                    <Image src={products?.product?.product_image} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" />
                                </div>
                                <button className="Prod1 relative flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md border">
                                    {imgeSelected && (
                                        <>
                                            <button type='button' className='replaceButton absolute bottom-0 left-1' onClick={handelOpenModel1} >
                                                <SlRefresh className='text-lg font-bold' />
                                            </button>
                                            <button type='button' className='deleteButton absolute bottom-0 right-1' onClick={() => handleDelete()} >
                                                <Trash className='text-lg text-red-600 font-bold' />
                                            </button>
                                        </>
                                    )
                                    }
                                    {imgeSelected ? <img src={imgeSelected} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" /> : <button onClick={handelOpenModel1} >+</button>}
                                </button>
                                <button className="Prod2 relative flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md border">
                                    {img2Selected && (
                                        <>
                                            <button className='replaceButton absolute bottom-0 left-1' onClick={handleOpenModel2} >
                                                <SlRefresh className='text-lg font-bold' />
                                            </button>
                                            <button className='deleteButton absolute bottom-0 right-1' onClick={() => handleDelete2()} >
                                                <Trash className='text-lg text-red-600 font-bold' />
                                            </button>
                                        </>
                                    )}
                                    {img2Selected ? <img src={img2Selected} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" /> : <button onClick={handleOpenModel2} >+</button>}
                                </button>
                            </div>
                            <Link
                                to={`/product/${productId}/compare`}
                                className="w-fit bg-[#0C203B] mt-2 text-white p-2 px-3 rounded-md self-end"

                            >Gereranya</Link>
                        </div>
                    </div>
                </div>
                {/* <div className="w-full py-12 lg:mt-0 md:mt-0 xl:mt-0 2xl:mt-0 mt-[20%]">
                    <div className='flex flex-col md:px-6 px-12 lg:ml-5 pb-6'>
                        <div className="flex justify-start items-start">
                            <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                            </div>
                            <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Recommended products</h1>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className='w-full h-full flex justify-center items-center md:px-10 px-12 '
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        {recommendedProducts?.map((product: any, index: any) => (
                            <SwiperSlide key={index}>
                                <Link className="p-4 flex flex-col rounded-md border-[1px] border-gray-300" to={`/product/${product?._id}`}>
                                    <div className="flex justify-center">
                                        <img src={product.product_image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-contain mb-4" />
                                    </div>
                                    <p className='flex text-sm'>{product.product_name}</p>
                                    <p className='flex text-sm text-[#EDB62E] mt-1'>
                                        Igiciro: {' '}
                                        {product?.vendor_prices?.length 
                                            ? product.vendor_prices.reduce((prev: any, current: any) => 
                                                (prev.price < current.price ? prev : current)
                                            ).price.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' Rwf'
                                            : product.our_price.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' Rwf' }
                                    </p>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='flex justify-center mt-12 w-full'>
                        <button onClick={handleViewAllProducts} className='bg-[#0C203B] text-white p-2 rounded-md'>Reba telefoni zose</button>
                    </div>
                </div> */}
                <div className="w-full py-12 lg:mt-0 md:mt-0 xl:mt-0 2xl:mt-0 mt-[20%]">
                    <div className="flex flex-col md:px-6 px-4 lg:ml-5 pb-6">
                        <div className="flex justify-start items-start">
                            <div className="flex w-5 h-10 rounded-md bg-[#EDB62E]"></div>
                            <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Recommended products</h1>
                        </div>
                    </div>
                    
                    <div className="relative w-full px-4 md:px-6">
        {loading ? (
          <Slider {...settings} className="w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="px-2">
                <div className="h-full flex flex-col justify-between p-4 rounded-md border border-gray-300">
                  <div className="flex justify-center items-center h-40 bg-gray-100 animate-pulse"></div>
                  <div className="mt-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 mt-2 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : recommendedProducts?.length > 0 ? (
          <Slider {...settings} className="w-full">
            {recommendedProducts.map((product: any, index: any) => (
              <div key={index} className="px-2">
                <Link 
                  className="h-full flex flex-col justify-between p-4 rounded-md border border-gray-300 hover:shadow-md transition-shadow"
                  to={`/product/${product?._id}`}
                >
                  <div className="flex justify-center items-center h-40">
                    <img 
                      src={product.product_image} 
                      alt={product.product_name}
                      className="w-full max-w-32 h-full max-h-32 object-contain" 
                    />
                  </div>
                  <div>
                    <p className="text-sm line-clamp-2 h-7 overflow-hidden">{product.product_name}</p>
                    <p className="text-sm text-[#EDB62E] font-medium mt-0">
                      Igiciro: {' '}
                      {product?.vendor_prices?.length 
                        ? product.vendor_prices.reduce((prev:any, current: any) => 
                            (prev.price < current.price ? prev : current)
                          ).price.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' Rwf'
                        : product.our_price.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' Rwf' }
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : null}
      </div>
                    
                    <div className="flex justify-center mt-8 w-full">
                        <button 
                            onClick={handleViewAllProducts} 
                            className="bg-[#0C203B] text-white px-6 py-2 rounded-md hover:bg-[#1a3a6d] transition-colors"
                        >
                            Reba telefoni zose
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
            {openModel1 && (
                <Modal
                    title="Choose Products"
                    visible={openModel1}
                    onCancel={handelOpenModel1}
                    footer={[
                        <button key="cancel" className='p-2 rounded-md bg-red-300 text-white hover:bg-red-600 py-1 absolute left-3' onClick={handelOpenModel1}>FUNGA</button>,
                        <button key="ok" className='border bg-green-600 text-white py-1 px-2 rounded-md' onClick={handelOpenModel1}>
                            KOMEZA
                        </button>,
                    ]}
                >
                    <input
                        type="text"
                        placeholder="Shakisha Telefoni"
                        className="border border-green-400 outline-none rounded-md p-2 w-full mb-4 "
                        onChange={handleSearch}
                    />
                    {filteredProd?.map((product: any, index: any) => (
                        <div  onClick={() => handleButtonClick(product._id, product.product_image)} key={index} className='cur cursor-pointer'>
                            <div onClick={() => handleButtonClick(product._id, product.product_image)} className="flex justify-between mt-1 p-2 border-green-600 rounded-md border items-center">
                                <img src={product.product_image} width={100} height={50} alt="" className='h-[100px] object-contain ' />
                                <p onClick={() => handleButtonClick(product._id, product.product_image)}>{product.product_name}</p>
                                <Button onClick={() => handleButtonClick(product._id, product.product_image)}>Hitamo</Button>
                            </div>
                        </div>
                    ))}
                </Modal>

            )}
            {openModel2 && (
                <Modal
                    title="Choose Products"
                    visible={openModel2}
                    onCancel={handleOpenModel2}
                    footer={[
                        <button key="cancel" className='p-2 rounded-md bg-red-300 text-white hover:bg-red-600 py-1 absolute left-3' onClick={handleOpenModel2}>FUNGA</button>,
                        <button key="ok" className='border bg-green-600 text-white py-1 px-2 rounded-md' onClick={handleOpenModel2}>
                            KOMEZA
                        </button>
                    ]}
                >
                    <input
                        type="text"
                        placeholder="Shakisha Telefoni"
                        className="border border-green-400 outline-none rounded-md p-2 w-full mb-4 "
                        onChange={handleSearch}
                    />
                    {filteredProd?.map((product: any, index: any) => (
                        <div onClick={() => handleButtonClick2(product._id, product.product_image)} key={index} className='cursor-pointer'>
                            <div onClick={() => handleButtonClick2(product._id, product.product_image)} className="flex justify-between mt-1 p-2 border-green-600 rounded-md border items-center">
                                <img src={product.product_image} width={100} height={50} alt="" className='h-[100px] object-contain ' />
                                <p onClick={() => handleButtonClick2(product._id, product.product_image)}>{product.product_name}</p>
                                <Button onClick={() => handleButtonClick2(product._id, product.product_image)}>Hitamo</Button>
                            </div>
                        </div>
                    ))}
                </Modal>
            )}
        </div>
    );
};

export default ProductPage;
