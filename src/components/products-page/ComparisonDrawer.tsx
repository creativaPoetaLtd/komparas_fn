import React from 'react';
import { Drawer } from 'antd';
import { FaTimes } from 'react-icons/fa';

interface Props {
    open: boolean;
    onClose: () => void;
}

const ComparisonDrawer: React.FC<Props> = ({ open, onClose }) => {
    // Sample data for demonstration
    const products = [
        {
            id: 1,
            name: 'Product 1',
            image: 'https://www.cnet.com/a/img/resize/592e5101f4fee1caf72f9e0169c8784ddf9eb12a/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&fit=crop&height=576&width=768',
            price: '$100',
            specifications: ['Spec 1', 'Spec 2', 'Spec 3'],
            description: 'Product 1 description',
        },
        {
            id: 2,
            name: 'Product 2',
            image: 'https://media.4rgos.it/i/Argos/9520103_R_Z001A?w=750&h=440&qlt=70',
            price: '$200',
            specifications: ['Spec A', 'Spec B', 'Spec C'],
            description: 'Product 2 description Product 2 descriptionProduct 2 descriptionProduct 2 descriptionProduct 2 descriptionProduct 2 descriptionProduct 2 description',
        },
    ];

    return (
        <Drawer
            title="Comparison Section"
            onClose={onClose}
            visible={open}
            placement="right"
            width={800}
        >
            <div className="flex justify-center items-center flex-col h-fit w-full">
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
                        {products.map((product) => (
                            <tr key={product.id} className="border-t border-gray-300">
                                <td className="px-4 py-2  items-center h-full">
                                  <div className="flex items-center">
                                    <div className='w-10 h-10 rounded-full mr-2'>
                                    <img src={product.image} alt={product.name} className=" mr-2 object-conain rounded-full h-full w-full " />
                                    </div>
                                    <p>
                                    {product.name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-2">{product.price}</td>
                                <td className="px-4 py-2 flex flex-col">
                                    {product.specifications.map((spec, index) => (
                                        <span key={index}>{spec}</span>
                                    ))}
                                </td>
                                <td className="px-4 py-2">{product.description}</td>
                                <td className="px-4 py-2  items-center">
                                    <button className="text-red-500 hover:text-red-700">
                                        <FaTimes />
                                    </button>
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
