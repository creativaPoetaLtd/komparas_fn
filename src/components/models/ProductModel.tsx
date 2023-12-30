import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import {  useParams } from "react-router-dom";
import { getPoductById, getProductOnCategory } from "../../api/product";

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: () => void;
}

const ProductModel: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {

    const [products1, setProducts] = useState<any>([]);
    const productId: any = useParams().id;

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await getPoductById(productId);
            setProducts(data);
        };
        fetchProduct();
    }, [productId]);


    const category = products1?.product?.category?.name;


    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [, setLoading] = useState(false);
    const [, setError] = useState(false);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            setLoading(true);
            try {
                const { data } = await getProductOnCategory(category);
                setRelatedProducts(data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        fetchRelatedProducts();
    }
        , [category]);
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white rounded-lg w-[95%] desktop:w-[50%] laptop:[w-50%] tablet:w-[80%] md:w-[80%] shadow-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-50"
        >
            <div className="w-full m-auto justify-center text-center items-center">
                <div className="flex flex-row justify-between items-center mb-4  px-3">
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
                <div className="products w-full h-fit flex flex-col space-y-3 m-auto justify-center text-center items-center">
                    <div className="productCard flex flex-wrap gap-2 w-full h-fit">
                        {relatedProducts?.products?.map((product: any, index: any) => (
                            <div key={index} className="w-[12rem] h-[12rem] space-x-3 border-bg-gray-400 border text-gray-500 rounded-sm">
                                <img src={product.product_image} alt='product' className='w-full cursor-pointer h-full rounded-sm object-cover' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModel;