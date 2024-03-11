import { Button, Image, Modal } from 'antd';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPoductById, getProductOnCategory } from "../../api/product";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SubNav from "../Navigations/SubNav";
import HomeNav from "../home/HomeNav";
import MobileHomeNav from "../home/HomeMobileNav";
import ProdNavigations from "./NavIgations";
import MainProductPage from "./MainProductPage";
import ThreeButtons from "./ThreeButtons";
import Footer from "../Footer";

const ProductPage = () => {
    const [products, setProduct] = useState<any>([]);
    const { productId }: any = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(productId);
            setProduct(data);
        };
        fetchProduct();
    }, [productId]);

    const category = products?.product?.category?.name;
    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [, setLoading] = useState(false);
    const [, setError] = useState(false);
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            setLoading(true);
            try {
                const { data } = await getProductOnCategory(category);
                setRelatedProducts(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchRelatedProducts();
    }, [category]);

    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedProductId2, setSelectedProductId2] = useState<string | null>(null);

    const handleButtonClick = (productId: string, productImage: string) => {
        localStorage.setItem('selectedProductId', productId);
        localStorage.setItem('selectedProductImage', productImage);
        setSelectedProductId(productId);
    };
    const handleButtonClick2 = (productId: string, productImage: string) => {
        localStorage.setItem('selectedProductId2', productId);
        localStorage.setItem('selectedProductImage2', productImage);
        setSelectedProductId2(productId);
    };

const selectedProductImage = localStorage.getItem('selectedProductImage');
const selectedProductImage2 = localStorage.getItem('selectedProductImage2');
    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-10 pl-2 flex flex-col'>
                <ProdNavigations products={products} />
                <MainProductPage products={products} />
                <div className="w-full h-fit flex md:flex-row flex-col mt-12">
                    <ThreeButtons products={products} />
                    <div className="md:w-[40%] w-full md:mt-0 mt-4 flex flex-col">
                        <div className="compareDiv border border-[#0C203B] p-2 rounded-md lg:w-[414px] md:w-[360px] flex flex-col">
                            <div className="treePic flex flex-row justify-between items-center">
                                <div className="flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md">
                                    <Image src={products?.product?.product_image} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" />
                                </div>
                                <button className="Prod1 flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md border" onClick={() => handleButtonClick('prod1', products?.product?.product_image)}>
                                    {selectedProductImage ? <Image src={selectedProductImage} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" /> : '+' }
                                </button>
                                <button className="Prod2 flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md border" onClick={() => handleButtonClick2('prod2', products?.product?.product_image)}>
                                    {selectedProductImage2 ? <Image src={selectedProductImage2} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" /> : '+' }
                                </button>
                            </div>
                            <button className="w-fit bg-[#0C203B] mt-2 text-white p-2 px-3 rounded-md self-end">Compare</button>
                        </div>
                    </div>
                </div>
                <div className="w-full py-12 lg:mt-0 md:mt-0 xl:mt-0 2xl:mt-0 mt-[20%]">
                    <div className='flex flex-col md:px-7 px-12 lg:ml-5 pb-6'>
                        <div className="flex justify-start items-start">
                            <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                            </div>
                            <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Related products</h1>
                        </div>
                    </div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className='w-full h-full flex justify-center items-center px-12 '
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                        }}
                    >
                        {relatedProducts?.products?.map((product: any, index: any) => (
                            <SwiperSlide key={index}>
                                <Link className="p-4 flex flex-col rounded-md border-[1px] border-gray-300" to={`/product/${product?._id}`}>
                                    <div className="flex justify-center">
                                        <img src={product.product_image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-contain mb-4" />
                                    </div>
                                    <p className='flex text-sm'>{product.product_name}</p>
                                    <p className='flex text-sm text-[#EDB62E] mt-1'>Shops(5)</p>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='flex justify-center mt-12 w-full'>
                        <Link className='bg-[#0C203B] text-white p-2 rounded-md' to={"/products"}>View All Products</Link>
                    </div>
                </div>
            </div>
            <Footer />
            <Modal
                title="Related Products"
                visible={selectedProductId !== null}
                onCancel={() => setSelectedProductId(null)}
                footer={[
                    <Button key="cancel" onClick={() => setSelectedProductId(null)}>Cancel</Button>,
                    <Button key="ok" type="primary" onClick={() => setSelectedProductId(null)}>
                        OK
                    </Button>,
                ]}
            >
               {relatedProducts?.products?.map((product: any, index: any) => (
                     <div key={index}>
                          <div className="flex justify-between items-center">
                            <img src={product.product_image} width={100} height={100} alt="" />
                            <p>{product.product_name}</p>
                            <Button onClick={() => handleButtonClick(product._id, product.product_image)}>Select</Button>
                          </div>
                     </div>
                ))}
            </Modal>
            <Modal
                title="Related Products"
                visible={selectedProductId2 !== null}
                onCancel={() => setSelectedProductId2(null)}
                footer={[
                    <Button key="cancel" onClick={() => setSelectedProductId2(null)}>Cancel</Button>,
                    <Button key="ok" type="primary" onClick={() => setSelectedProductId2(null)}>
                        OK
                    </Button>,
                ]}
            >
               {relatedProducts?.products?.map((product: any, index: any) => (
                     <div key={index}>
                          <div className="flex justify-between items-center">
                            <img src={product.product_image} width={100} height={100} alt="" />
                            <p>{product.product_name}</p>
                            <Button onClick={() => handleButtonClick2(product._id, product.product_image)}>Select</Button>
                          </div>
                     </div>
                ))}
            </Modal>
        </div>
    );
};

export default ProductPage;
