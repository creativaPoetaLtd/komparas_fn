
import React, { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { PackageX } from 'lucide-react';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';

interface Props {
  onClose?: () => void;
  refresh?: boolean;
  handleRemoveProductIdFromLocalStorageCompare: (productId: string) => void;
}

const BottomDrawer: React.FC<Props> = ({ 
  refresh = false, 
  handleRemoveProductIdFromLocalStorageCompare 
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const fetchCompareProducts = async () => {
    const idsToCompare = JSON.parse(localStorage.getItem("compareProductIds") || "[]");
    
    if (!idsToCompare || idsToCompare.length === 0) {
      setProducts([]);
      setIsVisible(false);
      return;
    }
    
    setLoading(false);
    try {
      const response = await getProductByMultpleIdsInQueryParams(idsToCompare);
      if (response && response.data && response.data.product) {
        setProducts(response.data.product);
        setIsVisible(true);
      } else {
        setProducts([]);
        setIsVisible(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch when component mounts
    fetchCompareProducts();
    
    // Set up interval to check localStorage periodically
    const intervalId = setInterval(() => {
      fetchCompareProducts();
    }, 1000); // Check every second
    
    // Listen for storage changes
    const handleStorageChange = () => {
      fetchCompareProducts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refresh]);

  const handleRemoveProduct = (productId: string) => {
    handleRemoveProductIdFromLocalStorageCompare(productId);
    // Update local state immediately to reflect the change
    setProducts(currentProducts => {
      const updatedProducts = currentProducts.filter(product => product._id !== productId);
      if (updatedProducts.length === 0) {
        setIsVisible(false);
      }
      return updatedProducts;
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border border-green-500 rounded-md z-50 transition-all duration-300 mx-2 mb-5 lg:h-[83px]">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3">
        {loading ? (
          <div className="flex justify-center items-center h-16 md:h-20">
            <ClipLoader color="#36d7b7" size={20} />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-16 md:h-20">
            <PackageX className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
            <p className="mt-1 text-sm md:text-base">Nta bikoresho bihari bigereranywa</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            <div className="flex-grow overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-2">
              <div className="flex gap-2 md:gap-4">
                {products.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-64 rounded-md border border-gray-200 ">
                    <div className="flex flex-col sm:flex-row p-1 w-full border border-green-500 rounded-md h-auto sm:h-14 ">
                      <div className="w-full sm:w-1/4 h-10 sm:h-full mb-1 sm:mb-0">
                        <Link to={`/product/${product._id}`}>
                          <img 
                            src={product.product_image} 
                            alt={product.product_name} 
                            className="h-full max-h-10 sm:max-h-12 mx-auto object-contain" 
                          />
                        </Link>
                      </div>
                      <div className="w-full sm:w-3/4 relative pl-0 sm:pl-2">
                        <Link to={`/product/${product._id}`} className="font-semibold text-xs sm:text-sm">
                          {product.product_name.length > 30 
                            ? `${product.product_name.substring(0, 30)}...` 
                            : product.product_name}
                        </Link>
                        <button 
                          onClick={() => handleRemoveProduct(product._id)} 
                          className="absolute top-0 right-0 hover:scale-110 transition-transform"
                          aria-label="Remove from comparison"
                        >
                          <FaTimesCircle className="text-red-500 text-base sm:text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {products.length >= 2 && (
              <div className="flex justify-center sm:justify-end mt-2 sm:mt-0 sm:ml-2 sm:self-center">
                <Link 
                  to="/products/compare" 
                  className="bg-black text-yellow-500 py-1 px-3 sm:py-2 sm:px-4 text-sm md:text-base rounded-md hover:bg-gray-800 transition-colors"
                >
                  Gereranya {products.length}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomDrawer;