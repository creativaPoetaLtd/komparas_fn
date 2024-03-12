import React, { useEffect } from 'react';
import { Button, Drawer } from 'antd';
import Image from 'antd/lib/image';
import { Eye } from '@phosphor-icons/react';
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
    const id2:string = localStorage.getItem('selectedProductId2') as string;
    const {productId}:any = useParams();
    const [product, setProduct] = React.useState<any>([]);
    useEffect(() => {
        const ids = [id1, id2, productId].filter((id) => id !== null);
        const fetchData = async () => {
            const response = await getProductByMultpleIdsInQueryParams(ids);
            setProduct(response.data);
        }
        fetchData();
    }, [id1, id2, productId]);
 
    const navigate = useNavigate();
    const handleView = (id: string) => {
        navigate(`/product/${id}`);
    }


    return (
        <Drawer
            title="Comparison Section"
            onClose={onClose}
            visible={open}
            placement="right"
            width={1000}
        >
            <div className="flex justify-center items-center flex-col h-fit w-full">
                <div className='ProductCards grid overflow-x-auto lg:w-[900px] w-[800px] grid-cols-3 gap-4'>
                    {product?.product?.map((product: any) => (
                        <div key={product._id} className="flex flex-col items-center justify-center rounded-md border p-5">
                            <div className="flex justify-center items-center h-[13rem] w-[13rem]">
                                <Image src={product.product_image} alt="product image" className='h-full w-full object-contain' />
                            </div>
                            <div className='flex flex-col items-center h-fit  w-[13rem] justify-start mt-4 '>
                            <h1 className="text-xl font-semibold text-start items-start flex float-left self-start">{product.product_name}</h1>
                            <p className='text-sm'>{(product.product_description).length > 100 ? (product.product_description).substring(0, 100) + '...' : product.product_description}</p>
                            <h1 className='text-lg font-bold mt-4 self-start text-[#EDB62E]'>Specifications</h1>
                            <ul className='text-sm'>
                            {product?.product_specifications?.map((spec: { key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                                        <span key={index} className=" self-start flex justify-start items-start text-start space-x-1 float-left ">
                                            <span className='font-bold gap-2'>{spec.key}:</span> <span className='text-gray-800'>{spec.value}</span>
                                            <p className='space-x-3 w-[3rem]'>,  </p>
                                        </span>
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
