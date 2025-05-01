import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
    refresh: boolean;
    handleRemoveProductIdFromLocalStorageCompare: (productId: string) => void;
}

const BottomDrawer: React.FC<Props> = ({ open, onClose, refresh, handleRemoveProductIdFromLocalStorageCompare }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchCompareProducts = async () => {
        const idsToCompare = JSON.parse(localStorage.getItem("compareProductIds") || "[]");
        
        if (!idsToCompare || idsToCompare.length === 0) {
            setProducts([]);
            return;
        }
        
        setLoading(true);
        try {
            const response = await getProductByMultpleIdsInQueryParams(idsToCompare);
            if (response && response.data && response.data.product) {
                setProducts(response.data.product);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchCompareProducts();
        }
    }, [open, refresh]);
    
    // This effect will run when the component is open and localStorage changes
    useEffect(() => {
        if (open) {
            const handleStorageChange = () => {
                fetchCompareProducts();
            };
            
            window.addEventListener('storage', handleStorageChange);
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }
    }, [open]);

    const handleRemoveProduct = (productId: string) => {
        handleRemoveProductIdFromLocalStorageCompare(productId);
        // Update local state immediately to reflect the change
        setProducts(currentProducts => currentProducts.filter(product => product._id !== productId));
    };

    return (
        <Drawer
            title="Products for Comparison"
            style={{ overflow: 'auto' }}
            onClose={onClose}
            open={open}
            placement="bottom"
            height={300}
        >
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p>Loading products...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="flex justify-center items-center h-32">
                    <p>No products selected for comparison yet.</p>
                </div>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex overflow-x-auto justify-center items-center gap-4 p-3">
                        {products.map((product) => (
                            <div key={product._id} className="flex flex-col items-start justify-start rounded-md border border-gray-200 min-w-[18rem]">
                                <div className="flex p-2 w-full border border-green-500 rounded-md h-[5rem]">
                                    <div className="image w-[30%] h-full">
                                        <Link to={`/product/${product._id}`}>
                                            <img src={product.product_image} alt={product.product_name} className="h-full object-contain w-full" />
                                        </Link>
                                    </div>
                                    <div className="productname flex flex-col w-[70%] h-full relative">
                                        <Link to={`/product/${product._id}`} className="my-auto items-center font-semibold text-sm">
                                            {product.product_name.length > 60 
                                                ? `${product.product_name.substring(0, 60)}...` 
                                                : product.product_name}
                                        </Link>
                                        <button 
                                            onClick={() => handleRemoveProduct(product._id)} 
                                            className="closeIcon absolute top-1 right-1 hover:scale-110 transition-transform"
                                            aria-label="Remove from comparison"
                                        >
                                            <FaTimesCircle className="text-red-500 text-lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {products.length >= 2 && (
                        <div className="mt-4 flex justify-center">
                            <Link 
                                to="/products/compare" 
                                className="bg-black text-yellow-500 py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Compare {products.length} Products
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </Drawer>
    );
};

export default BottomDrawer;