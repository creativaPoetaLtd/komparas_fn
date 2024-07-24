import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const RelatedProfducts = ({shopProducts, vendorID, shopData}:any) => {
    const settings: { current: number, responsive: any, dots: boolean, dotsClass: string, infinite: boolean, speed: number, slidesToShow: number, slidesToScroll: number, autoplay: boolean, autoplaySpeed: number, pauseOnHover: boolean } = {
        current: 0,
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          }
        ],
      };
  return (
    <div className="flex w-full flex-col text-sm relatedProd">
    <h1 className="text-sm text-yellow-500">Izindi Terefone dufite - {' '}
        {shopData?.name}
    </h1>
    {shopProducts?.data?.products.length > 2 ? (
        <Slider {...settings}
          className="flex justify-center"
        >
             {shopProducts?.data?.products?.slice(0,3).map((product: any, index: number) => product?.vendor_prices?.map((vendor: any) => (
            vendor?.vendor_id === vendorID && (
            <Link className="bg-white p-2 md:px-6 px-3  rounded-md "  to={`/product/${product?._id}`}>
               <div key={index} className="Card py-2 px-1 rounded-md bg-[#F7F7F7] flex md:w-[13rem] flex-col">
                    <div className="h-[10rem] mx-auto justify-center flex md:w-full">
                        <img src={product?.product_image} height={300} width={300} className="h-full object-contain w-full" />
                    </div>
                    <h1 className="flex font-semibold mt-8">{product?.product_name}</h1>
                    <p className="text-xs text-[#909090] mt-2 text-justify">{
                        product?.product_description?.length > 100 ? product?.product_description?.slice(0, 100) + '...' : product?.product_description
                    }</p>
                    <Link className="bg-[#EDB62E] mt-2 w-full text-center text-white h-fit p-1 md:px-4 px-2 md:py-2 rounded-md" to={
                        `/product/${product?._id}`
                    }>Yimenye neza</Link>
                </div>
            </Link>
            )
        )))}
        </Slider>
      ) : (
        <div className="grid gap-8 grid-cols-2 w-full">
        {shopProducts?.data?.products?.map((product: any, index: number) => product?.vendor_prices?.map((vendor: any) => (
            vendor?.vendor_id === vendorID && (
                <div key={index} className="Card py-2 px-1 rounded-md bg-[#F7F7F7] flex md:w-[13rem] flex-col">
                    <div className="h-[10rem] mx-auto justify-center flex md:w-full">
                        <img src={product?.product_image} height={300} width={300} className="h-full object-contain w-full" />
                    </div>
                    <h1 className="flex font-semibold mt-8">{product?.product_name}</h1>
                    <p className="text-xs text-[#909090] mt-2 text-justify">{
                        product?.product_description?.length > 100 ? product?.product_description?.slice(0, 100) + '...' : product?.product_description
                    }</p>
                    <Link className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md" to={
                        `/product/${product?._id}`
                    }>Read more</Link>
                </div>
            )
        )))}
    </div>
      )}

    {/* <div className="grid gap-8 grid-cols-2 w-full">
        {shopProducts?.data?.products?.map((product: any, index: number) => product?.vendor_prices?.map((vendor: any) => (
            vendor?.vendor_id === vendorID && (
                <div key={index} className="Card py-2 px-1 rounded-md bg-[#F7F7F7] flex md:w-[13rem] flex-col">
                    <div className="h-[10rem] mx-auto justify-center flex md:w-full">
                        <img src={product?.product_image} height={300} width={300} className="h-full object-contain w-full" />
                    </div>
                    <h1 className="flex font-semibold mt-8">{product?.product_name}</h1>
                    <p className="text-xs text-[#909090] mt-2 text-justify">{
                        product?.product_description?.length > 100 ? product?.product_description?.slice(0, 100) + '...' : product?.product_description
                    }</p>
                    <Link className="bg-[#EDB62E] mt-2 w-fit h-fit p-1 md:px-4 px-2 md:py-2 rounded-md" to={
                        `/product/${product?._id}`
                    }>Read more</Link>
                </div>
            )
        )))}
    </div> */}
    {
        shopProducts?.data?.products.length > 3 && (
            <div className="flex justify-center mt-12 w-full">
                <Link to={`/products?shopId=${vendorID}`}
                    className="bg-[#0C203B] text-white p-2 text-sm rounded-md underline underline-offset-4"
                >
                    Reba zose
                </Link>
            </div>
        )
    }
</div>
  )
}

export default RelatedProfducts