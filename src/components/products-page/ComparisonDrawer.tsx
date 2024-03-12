import React from 'react';
import { Button, Drawer } from 'antd';
import { FaTimes } from 'react-icons/fa';
import Image from 'antd/lib/image';
import { Eye } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
    comparisonData: any;
    handleDelete: (id: string) => void;
}

const ComparisonDrawer: React.FC<Props> = ({ open, onClose, comparisonData, handleDelete }) => {


    const product = comparisonData?.productsInfo?.map((product: any) => {
        return {
            id: product._id,
            image: product.product_image,
            name: product.product_name,
            price: product.vendor_prices[0].price,
            specifications: product.product_specifications,
            description: product.product_description,
        };
    }
    );

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
            width={800}
        >
            <div className="flex w-[800px] justify-center items-center flex-col h-fit overflow-x-auto">
                <table className="table-auto border border-gray-300 shadow-md">
                    <thead>
                        <tr className="bg-yellow-500 text-white">
                            <th className="px-4 py-2">Product</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Specifications</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product?.map((product: any) => (
                            <tr key={product.id} className="border-t border-gray-300">
                                <td className="px-4 py-2  items-center h-full">
                                    <div className="flex items-center">
                                        <div className='w-10 h-10 mr-2'>
                                            <Image src={product.image} className='flex my-auto justify-center' />
                                        </div>
                                        <p>
                                            {product.name}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{product.price}</td>
                                <td className="px-4 py-2">
                                    {product?.specifications?.map((spec: { key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                                        <span key={index} className="flex justify-start items-start text-start my-auto space-x-1 h-full">
                                            <span className='font-bold'>{spec.key}:</span> <span>{spec.value}</span>
                                        </span>
                                    ))}
                                </td>
                                <td className="px-4 py-2">
                                    {(product?.description)?.length > 140 ? product?.description?.substring(0, 140) + "..." : product.description}

                                </td>
                                <td className="px-4 py-2  items-center">
                                    <div className='flex'>
                                        <Button
                                            onClick={() => handleView(product.id)}
                                         className='viewButton primary border-none'>
                                            <Eye/>
                                        </Button>
                                    <Button 
                                    onClick={() => handleDelete(product.id)}
                                    className="text-red-500 hover:text-red-700 border-none">
                                        <FaTimes />
                                    </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Drawer>
    );
};

export default ComparisonDrawer;
