import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';
import { FaTimesCircle } from 'react-icons/fa';
interface Props {
    open: boolean;
    onClose: () => void;
    refresh: boolean;
    handleRemoveProductIdFromLocalStorageCompare:any
}


const BottomDrawer: React.FC<Props> = ({ open, onClose, refresh, handleRemoveProductIdFromLocalStorageCompare }) => {
    const idsToCompare = JSON.parse(localStorage.getItem("compareProductIds") || "[]");
    
    const [product, setProduct] = React.useState<any>([]);
    useEffect(() => {
        // const ids = [id1, id2, productId].filter((id) => id !== null);
        const fetchData = async () => {
            const response = await getProductByMultpleIdsInQueryParams(idsToCompare);
            setProduct(response.data);
            // Populate showValueMap with true values for each index
            const initialShowValueMap: { [key: number]: boolean } = {};
            response.data?.product?.forEach((_product: any, index: number) => {
                initialShowValueMap[index] = true;
            });
        }
        fetchData();
    }, [refresh]);
    return (
        <Drawer
            title=""
            style={{ overflow: 'auto' }}
            onClose={onClose}
            visible={open}
            placement="bottom"
            width={1000}
        >
            <div className="flex overflow-x-auto justify-center items-center flex-col h-fit w-full">
                <div className='ProductCards overflow-x-auto flex flex-row flex-wrap w-fit mx-auto gap-4'>
                    {product?.product?.map((product: any) => (
                        <div key={product._id} className="flex flex-col items-start justify-start rounded-md border md:p-5 p-2">
                            <div className="flex p-2 w-[18rem] border border-green-500 rounded-md h-[5rem]">
                                <div className='image w-[30%] h-full'>
                                    <img src={product.product_image} height={300} width={300} className="h-full object-contain w-full" />
                                </div>
                                <div className='productname flex flex-col w-[70%] h-full relative'>
                                    <p className=' my-auto items-center font-semibold'>{product.product_name}</p>
                                    <button onClick={()=>handleRemoveProductIdFromLocalStorageCompare(product?._id)} className='closeIcon absolute top-0 right-0'>
                                        <FaTimesCircle className='text-red-500' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
};

export default BottomDrawer;
