import React from 'react'
import { useParams } from "react-router-dom";
import { getPoductById } from '../../api/product';

interface ComparisonModelProps {
    onClose: () => void
}
const ComparisonModel = ({ onClose }: ComparisonModelProps) => {
    const [products, setProducts] = React.useState<any>([]);
    const [selectedProduct, setSelectedProduct] = React.useState<string | any>(null);
    const productId: any = useParams().id;
    const selectedProductId: any = localStorage.getItem('selectedProductId');

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






    return (
        <div className="w-full h-full overflow-y-auto bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center">
            <div className="w-[80%] h-fit bg-gray-300 pb-10 rounded-md flex flex-col justify-center items-center">
                <div className="w-full flex flex-row justify-between items-center mb-4  px-3">
                    <h1 className="text-xl"></h1>
                    <h1 className="text-xl">
                        <button
                            className="text-xl"
                            onClick={onClose}
                        >
                            X
                        </button>
                    </h1>
                </div>
                <div className='w-full flex justify-between space-x-5 p-2'>
                    <div className="products  w-1/2 h-fit flex flex-col space-y-3 m-auto justify-center text-center items-center">
                        <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
                            <div className='w-full px-10 flex flex-col  h-fit p-2 space-y-2'>
                                <h1 className='text-xl justify-start flex font-bold'>{products?.product?.product_name}</h1>
                                <div className='line  w-full h-[1px] bg-blue-700' />
                            </div>
                            <h1 className='text-xl font-bold mt-3 ml-10 pb-4 flex text-blue-700'>Full specification</h1>
                            <div className="flex flex-col w-full text-gray-500 px-10">
                            {products?.product?.product_specifications?.map((specification: any, index: any) => (
                                <div className="flex justify-between w-full py-2 border-b-4" key={index}>
                                    <div className="flex w-1/2 font-bold">{specification?.key}</div>
                                    <div className="flex w-1/2">{specification?.value}</div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>

                    <div className="products  w-1/2 h-fit flex flex-col space-y-3 m-auto justify-center text-center items-center">
                        <div className='w-full bg-white rounded-md flex flex-col h-fit pb-10'>
                            <div className='w-full px-10 flex flex-col  h-fit p-2 space-y-2'>
                                <h1 className='text-xl justify-start flex font-bold'>{selectedProduct?.product?.product_name}</h1>
                                <div className='line  w-full h-[1px] bg-blue-700' />
                            </div>
                            <h1 className='text-xl font-bold mt-3 ml-10 pb-4 flex text-blue-700'>Full specification</h1>
                            <div className="flex flex-col w-full text-gray-500 px-10">
                            {selectedProduct?.product?.product_specifications?.map((specification: any, index: any) => (
                                <div className="flex justify-between w-full py-2 border-b-4" key={index}>
                                    <div className="flex w-1/2 font-bold">{specification?.key}</div>
                                    <div className="flex w-1/2">{specification?.value}</div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComparisonModel