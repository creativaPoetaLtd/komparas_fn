import React, { useEffect, useState } from 'react';
import { Button, Drawer } from 'antd';
import { Eye, Minus, Plus } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';
import { useParams } from 'react-router-dom';
interface Props {
    open: boolean;
    onClose: () => void;
    comparisonData: any;
}


const ComparisonDrawer: React.FC<Props> = ({ open, onClose }) => {
    const id1 = localStorage.getItem('selectedProductId') as string;
    const id2: string = localStorage.getItem('selectedProductId2') as string;
    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});
    const handleValueClick = (index: number) => {
        setShowValueMap({
            ...showValueMap,
            [index]: !showValueMap[index]
        });
    };
    const { productId }: any = useParams();
    const [product, setProduct] = React.useState<any>([]);
    useEffect(() => {
        const ids = [id1, id2, productId].filter((id) => id !== null);
        const fetchData = async () => {
            const response = await getProductByMultpleIdsInQueryParams(ids);
            setProduct(response.data);
            // Populate showValueMap with true values for each index
            const initialShowValueMap: { [key: number]: boolean } = {};
            response.data?.product?.forEach((_product: any, index: number) => {
                initialShowValueMap[index] = true;
            });
            setShowValueMap(initialShowValueMap);
        }
        fetchData();
    }, [id1, id2, productId]);

    const navigate = useNavigate();
    const handleView = (id: string) => {
        navigate(`/product/${id}`);
    }
    function addSpaceBetweenWords(str: any) {
        return str.replace(/\//g, ' /');
    }

    return (
        <Drawer
            title="Comparison Section"
            onClose={onClose}
            visible={open}
            placement="right"
            width={1000}
        >
            <div className="flex overflow-x-auto justify-center items-center flex-col h-fit w-full">
                <div className='ProductCards overflow-x-auto flex flex-row scr lg:w-[900px] w-fit mx-auto gap-4'>
                    {product?.product?.map((product: any) => (
                        <div key={product._id} className="flex flex-col items-start justify-start rounded-md border md:p-5 p-2">
                            <div className="flex justify-center">
                                <img src={product.product_image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-contain mb-4" />
                            </div>
                            <div className='flex flex-col items-strt h-fit  md:w-[13rem] w-[7rem] justify-start mt-4 '>
                                <h1 className="md:text-xl text-base font-semibold text-start items-start flex float-left self-start">{product.product_name}</h1>
                                <p className='text-sm w-full'>{(product.product_description).length > 100 ? (product.product_description).substring(0, 100) + '...' : product.product_description}</p>
                                <h1 className='md:text-lg text-sm font-bold mt-4 self-start text-[#EDB62E]'>Ibiziranga</h1>
                                <ul className='text-sm w-full flex-wrap flex'>
                                    {product?.product_specifications?.map((spec: { key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => (
                                        <div key={index + 1} className='ourReview flex-wrap rounded-md border border-black  w-full space-y-3 mb-2 mt-2 flex flex-col'>
                                            <div className="maindiv text-sm font-semibold text-start rounded-md bg-slate-200 p-2 flex" onClick={() => handleValueClick(index)}>
                                                <p className='KeyDiv flex-wrap flex text-sm overflow-hidden'>{addSpaceBetweenWords(spec?.key)}</p>
                                                {showValueMap[index] ? <Minus className='ml-auto' /> : <Plus className='ml-auto' />}
                                            </div>
                                            {showValueMap[index] && <p className='ValusePargrapth text-sm p-3'>{spec?.value}</p>}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <Button type="primary" onClick={() => handleView(product._id)} icon={<Eye />} className="mt-2 w-full bg-yellow-500">View</Button>
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
};

export default ComparisonDrawer;
