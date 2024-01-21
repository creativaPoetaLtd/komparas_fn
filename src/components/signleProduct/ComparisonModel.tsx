import React from 'react'
import { useParams } from "react-router-dom";
import { getPoductById } from '../../api/product';

interface ComparisonModelProps {
    onClose: () => void
}
const ComparisonModel = ({ onClose }: ComparisonModelProps) => {
    const [products, setProducts] = React.useState<any>([]);
    const [selectedProduct, setSelectedProduct] = React.useState<string | any>(null);
    const [selectedProduct1, setSelectedProduct1] = React.useState<string | any>(null);
    const productId: any = useParams().id;
    const selectedProductId: any = localStorage.getItem('selectedProductId');
    const selectedProductId1: any = localStorage.getItem('selectedProductId1');

    React.useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(productId);
            setProducts(data);
        };
        fetchProduct();
    }, [productId]);

    React.useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(selectedProductId);
            setSelectedProduct(data);
        };
        fetchProduct();
    }, [selectedProductId]);

    React.useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(selectedProductId1);
            setSelectedProduct1(data);
        };
        fetchProduct();
    }, [selectedProductId1]);

    const handleCloseModel = () => {
        localStorage.removeItem('selectedProductId');
        localStorage.removeItem('selectedProductId1');
        onClose();
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-black bg-opacity-50 fixed top-10 left-0 flex justify-center items-center">
            <div className="laptop:w-[90rem] desktop:w-[90rem] tablet:w-[40rem] w-[20rem]  h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
                <div className="w-full flex flex-row justify-between items-center mb-4  px-3">
                    <h1 className="text-xl"></h1>
                    <h1 className="text-xl">
                        <button
                            className="text-xl"
                            onClick={handleCloseModel}
                        >
                            X
                        </button>
                    </h1>
                </div>
                <div className='divComp laptop:w-[90rem] desktop:w-[90rem] tablet:w-[40rem] w-[20rem] h-[30rem] overflow-x-auto flex justify-center mx-auto space-x-5 p-2'>
                    <div className="products_div1 laptop:w-[25rem] desktop:w-[28rem] tablet:w-[20rem] w-[15rem] h-fit flex flex-col space-y-3 m-auto justify-center text-center items-center flex-shrink-0">
                        <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
                            <div className='w-full desktop:px-10 laptop:px-10 tablet:px-5 px-2 flex flex-col  h-fit p-2 space-y-2'>
                                <h1 className='text-xl justify-start flex font-bold'>{products?.product?.product_name}</h1>
                                <img src={products?.product?.product_image} alt='product' className='w-[10rem] h-[10rem] rounded-sm' />
                                <div className='line  w-full h-[1px] bg-blue-700' />
                            </div>
                            <h1 className='text-xl font-bold mt-3 desktop:ml-10 laptop:ml-10 tablet:ml-5 ml-2 pb-4 flex text-blue-700'>Full specification</h1>
                            <div className="flex flex-col w-full text-gray-500 desktop:px-10 laptop:px-10 tablet:px-5 px-2">
                                {products?.product?.product_specifications?.map((specification: any, index: any) => (
                                    <div className="flex justify-between w-full py-2 border-b-4" key={index}>
                                        <div className="flex w-1/2 font-bold">{specification?.key}</div>
                                        <div className="flex w-1/2">{specification?.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {selectedProduct && (
                        <div className="products_div1 laptop:w-[25rem] desktop:w-[28rem] tablet:w-[20rem] w-[15rem] h-fit flex flex-col space-y-3 m-auto justify-center text-center items-center flex-shrink-0">
                            <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
                                <div className='w-full desktop:px-10 laptop:px-10 tablet:px-5 px-2 flex flex-col  h-fit p-2 space-y-2'>
                                    <h1 className='text-xl justify-start flex font-bold'>{selectedProduct?.product?.product_name}</h1>
                                    <img src={selectedProduct?.product?.product_image} alt='product' className='w-[10rem] h-[10rem] rounded-sm' />
                                    <div className='line  w-full h-[1px] bg-blue-700' />
                                </div>
                                <h1 className='text-xl font-bold mt-3 desktop:ml-10 laptop:ml-10 tablet:ml-5 ml-2 pb-4 flex text-blue-700'>Full specification</h1>
                                <div className="flex flex-col w-full text-gray-500 desktop:px-10 laptop:px-10 tablet:px-5 px-2">
                                    {selectedProduct?.product?.product_specifications?.map((specification: any, index: any) => (
                                        <div className="flex justify-between w-full py-2 border-b-4" key={index}>
                                            <div className="flex w-1/2 font-bold">{specification?.key}</div>
                                            <div className="flex w-1/2">{specification?.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedProduct1 && (
                        <div className="products_div1 laptop:w-[25rem] desktop:w-[28rem] tablet:w-[20rem] w-[15rem] h-fit flex flex-col space-y-3 m-auto justify-center text-center items-center flex-shrink-0">
                            <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
                                <div className='w-full desktop:px-10 laptop:px-10 tablet:px-5 px-2 flex flex-col  h-fit p-2 space-y-2'>
                                    <h1 className='text-xl justify-start flex font-bold'>{selectedProduct1?.product?.product_name}</h1>
                                    <img src={selectedProduct1?.product?.product_image} alt='product' className='w-[10rem] h-[10rem] rounded-sm' />
                                    <div className='line  w-full h-[1px] bg-blue-700' />
                                </div>
                                <h1 className='text-xl font-bold mt-3 desktop:ml-10 laptop:ml-10 tablet:ml-5 ml-2 pb-4 flex text-blue-700'>Full specification</h1>
                                <div className="flex flex-col w-full text-gray-500 desktop:px-10 laptop:px-10 tablet:px-5 px-2">
                                    {selectedProduct1?.product?.product_specifications?.map((specification: any, index: any) => (
                                        <div className="flex justify-between w-full py-2 border-b-4" key={index}>
                                            <div className="flex w-1/2 font-bold">{specification?.key}</div>
                                            <div className="flex w-1/2">{specification?.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ComparisonModel