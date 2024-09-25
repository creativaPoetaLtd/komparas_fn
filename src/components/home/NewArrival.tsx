/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getAllProducts } from "../../api/product";
import { Link } from "react-router-dom";
interface NewArrivalProps {
    productData: any;
}
const NewArrival: React.FC<NewArrivalProps> = ({}) => {
    const isAdminFromLocalStorag:any = JSON.parse(localStorage.getItem("KomparasLoginsInfo") as any) || {};
    const isAdminFromLocalStorage = isAdminFromLocalStorag.role === "admin" ? true : false;
    const [products, setProducts] = React.useState<any[]>([]);
    React.useEffect(() => {
      const fetchProducts = async () => {
        const response = await getAllProducts();
        const productsData = response?.data?.products?.map((product: any) => {
            return {
                id: product?._id,
                product_name: product?.product_name,
                product_image: product?.product_image,
                released_year: product?.product_specifications.find((spec:any) => spec?.key === "Umwaka yakorewemo" || spec?.key === "Umwaka yakorewemo ")?.value?.split(" ")[2],
                product_description: product?.product_description,
            }
        }
        );
        setProducts(productsData);
      };
      fetchProducts();
    }, []);
    const sortedProducts = products.sort((a: any, b: any) => {
        return b.released_year - a.released_year; 
    });
    const top3Products = Math.random() > 0.5 ? sortedProducts.slice(0, 4) : sortedProducts.slice(1, 5);
    return (
        <div className='flex flex-col w-full lg:px-[3rem] px-2 py-12'>
            <div className='flex flex-col px-2 pb-6'>
                <div className="flex justify-start items-start">
                    <div className="flex w-[20px] h-[40px] rounded-md bg-[#EDB62E]">
                    </div>
                    <h1 className="text-lg flex my-auto justify-center font-bold ml-2 text-[#EDB62E]">Telefoni zigisohoka</h1>
                </div>
                {/* <h1 className='flex text-2xl text-[#0C203B] mt-3 font-semibold'>Telefoni zikigera ku isoko</h1> */}
            </div>
            <div className="flex lg:flex-row px-2 md:flex-col flex-col w-full lg:space-x-8 lg:space-y-0 space-y-3">
                <div className={`flex lg:w-1/2 md:w-full w-full h-[600px] relative ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
                <div className="absolute w-[70%] left-12 md:w-[40%] md:left-8 bottom-32 rounded-lg shadow-md justify-center items-center m-auto text-white bg-black bg-opacity-50 flex flex-col">
    <h1 className="flex font-semibold">
        {
            top3Products[0]?.product_name
        }
    </h1>
    <p className="flex text-xs mt-3 w-[242px]">
        {
            top3Products[0]?.product_description?.length > 100 ? top3Products[0]?.product_description?.slice(0, 100) + "..." : top3Products[0]?.product_description
        }
    </p>
    <Link className="flex underline underline-offset-4 mt-4 text-[#FFAD33]" to={ `/product/${top3Products[0]?.id}` }>
        REBA BYOSE
    </Link>
</div>

                    <div className="flex h-[511px] w-[511px]  justify-center items-center m-auto">
                        <img src={
                            top3Products[0]?.product_image
                        } width={100} height={100} className="w-full h-full object-contain" />
                    </div>
                </div>
                <div className="flex lg:w-1/2 w-full flex-col lg:space-y-8 space-y-3 h-[600px]"> 
                    <div className={`flex h-1/2 relative w-full ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} items-end`}>
                    <div className="absolute md:bottom-8 bottom-4 md:w-[40%] w-[60%] md:left-6 left-1 z-1 text-white bg-black bg-opacity-50 py-2 items-center shadow-md rounded-lg flex flex-col">
    <h1 className="flex font-semibold">
        {
            top3Products[1]?.product_name
        }
    </h1>
    <p className="flex text-xs mt-3 md:w-[242px] w-[150px]">
        {
            top3Products[1]?.product_description?.length > 100 ? top3Products[1]?.product_description?.slice(0, 100) + "..." : top3Products[1]?.product_description
        }
    </p>
    <Link className="flex underline underline-offset-4 mt-4 text-[#FFAD33]" to={ `/product/${top3Products[1]?.id}` }>
        REBA BYOSE
    </Link>
</div>

                        <div className="flex p-2  md:h-[286px] md:w-[290px] w-[180px] h-[200px] float-right absolute right-0">
                            <img src={
                                top3Products[1]?.product_image
                            } width={100} height={100} className="w-full object-contain  h-full right-0" />
                        </div>
                    </div>
                    <div className="w-full h-1/2 flex md:space-x-8 space-x-2">
                        <div className={`flex w-1/2 relative ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
                        <div className="absolute bg-black bg-opacity-50 w-[100%] md:w-[80%] p-2 items-center md:bottom-6 bottom-3 md:left-6 left-1 text-white shadow-md rounded-lg flex flex-col">
    <h1 className="flex font-semibold">
        {
            top3Products[2]?.product_name
        }
    </h1>
    <p className="flex text-xs mt-2 md:w-[242px]">
        {
            top3Products[2]?.product_description?.length > 100 ? top3Products[2]?.product_description?.slice(0, 100) + "..." : top3Products[2]?.product_description
        }
    </p>
    <Link className="flex underline underline-offset-4 mt-4 text-[#FFAD33]" to={ `/product/${top3Products[2]?.id}` }>
        REBA BYOSE
    </Link>
</div>

                            <div className="flex h-[221px] w-[190px] justify-center items-center m-auto">
                                <img src={
                                    top3Products[2]?.product_image
                                }width={100} height={100} className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className={`flex w-1/2 relative ${!isAdminFromLocalStorage ? "bg-[#0C203B]" : "bg-[#848482]"} `}>
                           <div className="absolute md:bottom-6 w-[98%] left-1 bottom-3 md:left-6 md:w-[80%] text-white bg-black bg-opacity-50 rounded-lg shadow-md items-center flex flex-col">
    <h1 className="flex font-semibold">
        {
            top3Products[3]?.product_name
        }
    </h1>
    <p className="flex text-xs mt-2 md:w-[242px]">
        {
            top3Products[3]?.product_description?.length > 100 ? top3Products[3]?.product_description?.slice(0, 100) + "..." : top3Products[3]?.product_description
        }
    </p>
    <Link className="flex underline underline-offset-4 mt-4 text-[#FFAD33]" to={ `/product/${top3Products[3]?.id}` }>
        REBA BYOSE
    </Link>
</div>

                            <div className="flex h-[221px] w-[190px] justify-center items-center m-auto">
                                <img src={
                                    top3Products[3]?.product_image
                                } width={100} height={100} className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewArrival