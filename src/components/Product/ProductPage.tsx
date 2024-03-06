import Footer from "../Footer"
import SubNav from "../Navigations/SubNav"
import MobileHomeNav from "../home/HomeMobileNav"
import HomeNav from "../home/HomeNav"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPoductById, getProductOnCategory } from "../../api/product";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const [products, setProduct] = React.useState<any>([]);
    const { productId }: any = useParams();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
          const { data } = await getPoductById(productId);
          setProduct(data);
        };
        fetchProduct();
      }, [productId]);
      console.log("cccc",productId);
      

      console.log('Product', products?.product?.product_image);
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
  }
    , [category]);

    return (
        <div className="flex flex-col h-fit">
            <SubNav />
            <HomeNav />
            <MobileHomeNav />
            <div className='w-full bg-white h-fit justify-between lg:px-6 px-2 lg:pl-10 pl-2 flex flex-col'>
                <div className="navs flex mt-8 lg:ml-11 ml-4 w-fit">
                    <a href="/home" className="text-[#0C203B] text-sm">Home</a>
                    <p className="text-[#0C203B] text-sm mx-1">/</p>
                    <a href="/product" className="text-[#0C203B] text-sm">Product</a>
                    <p className="text-[#0C203B] text-sm mx-1">/</p>
                    <a href="/product" className="text-[#EDB62E] text-sm">{products?.product?.product_name}</a>
                </div>
                <div className='w-full flex flex-col h-fit'>
                    <div className="w-full h-fit flex lg:flex-row  flex-col ">
                        <div className="flex md:flex-row flex-col-reverse lg:w-[65%] w-full m-auto justify-center items-center h-full">
                            <div className="flex md:[w-20%] w-full md:flex-col justify-between flex-row">
                            {products?.product?.product_images?.map((image: any, index: any) => (

                                <div key={index} className="md:w-[170px] w-[77px] m-auto items-center flex justify-center md:h-[138px] h-[79px]">
                                    <img src={image.product_image} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-cover" />
                                </div>
                            ))}
                            </div>
                            <div className="md:w-[80%] w-full h-full">
                                <div className="md:w-[500px] w-[350px] md:h-[600px] h-[285px] flex m-auto justify-center items-center">
                                    <img src={products?.product?.product_image} alt="" className="md:w-[446px] w-[296px] md:h-[315px] h-[228px] object-contain" />
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:flex-col md:flex-row sm:flex-col flex-col space-y-4 m-auto items-center justify-center lg:w-[40%] w-full ">
                            <div className="md:w-[415px] w-full p-2 flex flex-col space-y-3">
                                <h1 className="text-xl font-semibold">{products?.product?.product_name}</h1>
                                <h1 className="text-base font-light">Rwf 100,000</h1>
                                <p className="text-sm">{products?.product?.product_description}</p>
                            </div>
                            <div className="line md:w-[412px] w-full h-[1px] md:hidden flex lg:flex bg-[#EDB62E]"></div>
                            <div className="flex flex-col shopTable">
                                <table className="md:w-[415px] w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">Shop logo</th>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">Price</th>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">Working hours</th>
                                            <th className="text-[#353535] item-start m-auto p-2 text-start">
                                                Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {products?.product?.vendors?.map((shop: any, index: any) => (

                                        <tr key={index}>
                                            <td className="text-[#353535] item-start m-auto p-2">{shop?.name}</td>
                                            {products?.product?.vendor_prices?.map((price: any, index: any) => (
                price?.vendor_id === shop?._id && (
                                            <td key={index} className="text-[#353535] item-start m-auto p-2">
                                                 {price?.price}
                                            </td>
                                            )
                                            ))}
                                            <td className="text-[#353535] item-start m-auto p-2">{shop?.working_hours}</td>
                                            <td className="text-[#353535] item-start m-auto p-2 text-start">
                                                <button className="w-fit p-2 text-white bg-[#353535] rounded-md font-light text-sm">Shop Here</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit flex md:flex-row flex-col mt-12">
                    <div className="lg:w-[60%] md:w-[50%] flex flex-col">
                        <div className="flex flex-col space-y-5 xl:w-[637px] lg:w-[537px] md:w-[337px] m-auto justify-center">
                            <div className="threeButtons flex flex-row justify-between">
                                <button className="w-[30%] bg-[#EDB62E] text-white p-2 rounded-md">Our Review</button>
                                <button className="w-[30%] bg-[#0C203B] text-white p-2 rounded-md">Specification</button>
                                <button className="w-[30%] bg-[#0C203B] text-white p-2 rounded-md">Other Review</button>
                            </div>
                            <p className="text-[#0C203B] text-sm">
                            {products?.product?.our_review}
                            </p>
                            {/* <p className="text-[#0C203B] text-sm">
                                Lorem ipsum dolor sit amet consectetur. Faucibus pulvinar ut ut morbi. Diam bibendum egestas mi tempus metus rhoncus aliquet tortor sit. Turpis sed platea imperdiet duis sem. Sit nunc in penatibus in molestie viverra.
                            </p> */}

                        </div>

                    </div>
                    <div className="md:w-[40%] w-full md:mt-0 mt-4 flex flex-col">
                        <div className="compareDiv border border-[#0C203B] p-2 rounded-md lg:w-[414px] md:w-[360px] flex flex-col">
                            <div className="treePic flex flex-row justify-between items-center">
                                <div className="flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md">
                                    <img src={products?.product?.product_image} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-contain" />
                                </div>
                                <div className="flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md border">
                                    {/* <img src={productImages} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-cover" /> */}
                                    +
                                </div>
                                <div className="flex w-[124px] h-[161px] m-auto justify-center items-center bg-white rounded-md border">
                                    {/* <img src={productImages} width={100} height={100} alt="" className="md:w-[100px] w-[55px] md:h-[89px] h-[49px] object-cover" /> */}
                                    +
                                </div>
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
                                    <p className='flex text-sm'>HAVIT HV-G92 Gamepad</p>
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
        </div>
    )
}

export default ProductPage