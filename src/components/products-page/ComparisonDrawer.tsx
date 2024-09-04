import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
interface Props {
    open: boolean;
    onClose: () => void;
    refresh: boolean;
}

const ComparisonDrawer: React.FC<Props> = ({ open, onClose, refresh }) => {
    const idsToCompare = JSON.parse(localStorage.getItem("compareProductIds") || "[]");
    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});
    const handleValueClick = (index: number) => {
        setShowValueMap({
            ...showValueMap,
            [index]: !showValueMap[index]
        });
    };
    const [product, setProduct] = React.useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getProductByMultpleIdsInQueryParams(idsToCompare);
            setProduct(response.data);
            const initialShowValueMap: { [key: number]: boolean } = {};
            response.data?.product?.forEach((_product: any, index: number) => {
                initialShowValueMap[index] = true;
            });
            setShowValueMap(initialShowValueMap);
        }
        fetchData();
    }, [refresh]);

    const navigate = useNavigate();
    const handleView = (id: string) => {
        navigate(`/product/${id}`);
    }
    function addSpaceBetweenWords(str: any) {
        return str.replace(/\//g, ' /');
    }

    return (
        <Drawer
            title="Zigereranye"
            style={{ overflow: 'auto' }}
            onClose={onClose}
            visible={open}
            placement="right"
            width={1000}
            footer={
                <div className="flex  justify-between">
                    <Button className='closeBtn' onClick={onClose}  size='large'>
                        <span className='text-red-500'>Funga</span>
                    </Button>
                    <Button className='clearBtn bg-black' onClick={()=> {
                            localStorage.removeItem('selectedProductId');
                            localStorage.removeItem('selectedProductId2');
                            onClose();
                        }
                    }  size='large'>
                        <span className='text-white'>Siba</span>
                    </Button>
                </div>
            }
        >
            <div className="flex overflow-x-auto justify-center items-center flex-col h-fit w-full">
                <div className='ProductCards overflow-x-auto flex flex-row scr lg:w-[1000px] w-fit mx-auto gap-2 md:gap-1'>
                    {product?.product?.map((product: any) => (
                        <div key={product._id} className="flex flex-col items-start justify-start rounded-md border border-green-600 md:p-3 p-2">
                            <div className="flex justify-center">
                                <img src={product.product_image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-contain mb-4" />
                            </div>
                            <div className='flex flex-col items-strt h-fit  md:w-[12rem] w-[7rem] justify-start mt-4 '>
                                <h1 className="md:text-xl h-20 text-base font-semibold text-start items-start flex float-left self-start">{product.product_name}</h1>
                                <p className='flex font-semibold text-green-600 mt-4 mb-4'>
                                    {product?.vendor_prices?.length>=1 && product?.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price
                                        .toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                                </p>
                                <ul className='text-sm w-full flex-wrap flex'>
                                    {product?.product_specifications?.map((spec: { key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => (
                                        <div key={index + 1} className='ourReview flex-wrap rounded-md   w-full space-y-3 mb-2 mt-2 flex flex-col'>
                                            <div className="maindiv text-sm font-semibold text-start rounded-md p-2 flex" onClick={() => handleValueClick(index)}>
                                                <p className='KeyDiv flex-wrap justify-center ml-auto flex text-sm overflow-hidden'>{addSpaceBetweenWords(spec?.key)}</p>
                                                {showValueMap[index] ? <FaAngleUp className='ml-auto text-xl' /> : <FaAngleDown className='ml-auto text-xl font-thin' />}
                                            </div>
                                            {showValueMap[index] && <p className='ValusePargrapth justify-center mx-auto text-sm p-3 text-green-600'>{spec?.value}</p>}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <div className='flex flex-col bottom-0 justify-center'>
                                <p className='flex font-semibold text-green-600 mt-4 mb-4'>
                                    {product?.vendor_prices?.length >= 1 && product?.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price
                                        .toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf
                                </p>
                                    <button onClick={() => handleView(product._id)} className="mt-2 rounded-md w-full bg-black px-2 py-1 text-yellow-500">Yirebe</button>
                                </div>                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
};

export default ComparisonDrawer;
