import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
// import { FaTimes } from 'react-icons/fa';
import { Eye, Minus, Plus, Trash } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
    comparisonData: any;
    handleDelete: (id: string) => void;
}

const ComparisonDrawer: React.FC<Props> = ({ open, onClose, comparisonData, handleDelete }) => {

    const [showValueMap, setShowValueMap] = useState<{ [key: number]: boolean }>({});
    const handleValueClick = (index: number) => {
        setShowValueMap({
            ...showValueMap,
            [index]: !showValueMap[index]
        });
    };
    const product = comparisonData?.productsInfo?.map((product: any) => {
        return {
            id: product._id,
            image: product.product_image,
            name: product.product_name,
            price: product.vendor_prices?.reduce((prev: any, current: any) => (prev.price < current.price) ? prev : current).price,
            specifications: product.product_specifications,
            description: product.product_description,
        };
    }
    );

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
            width={900}
        >
            {/* <div className="flex w-[800px] justify-center items-center flex-col h-fit overflow-x-auto">
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
            </div> */}
            <div className="flex justify-center items-center overflow-x-auto flex-col h-fit w-full">
                <div className='ProductCards flex overflow-x-auto lg:w-[900px] w-[900px] p-12  gap-4'>
                    {product?.map((product: any) => (
                        <div key={product._id} className="flex flex-col items-center w-[15rem] py-0 p-2 justify-center rounded-md border">
                            <div className="flex justify-center">
                                        <img src={product?.image} height={152} width={172} alt="" className="w-[172px] h-[152px] object-contain mb-4" />
                                    </div>
                            <div className='flex flex-col items-center h-fit  w-[13rem] justify-start mt-4 '>
                                <h1 className="text-xl font-semibold text-start items-start flex float-left self-start">{product.product_name}</h1>
                                <div className='flex justify-start w-full'>
                                    <p className='text-lg mt-4 self-start'>Minimum Price:</p> <p className='text-gray-800 font-bold mt-5 ml-2 self-start'>${product.price}</p>
                                </div>
                                <h1 className='text-lg font-bold mt-4 self-start text-[#EDB62E]'>Specifications</h1>
                                <ul className='text-sm'>
                                    {product?.specifications?.map((spec: { key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => (
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
                            <div className='flex w-full mt-3 bg-[#EDB62E] justify-between'>
                                <Button type="primary" onClick={() => handleView(product.id)} icon={<Eye className='m-aut h-full m-auto justify-center rounded-none items-center mt-[2px]' />} className=" m-auto w-1/2 bg-yellow-500 flex justify-center items-center">View</Button>
                                <Button type="primary" onClick={() => handleDelete(product.id)} icon={<Trash className='m-aut h-full m-auto justify-center items-center mt-[2px]' />} className=" m-auto w-1/2 bg-red-500 flex justify-center items-center">Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </Drawer>
    );
};

export default ComparisonDrawer;
