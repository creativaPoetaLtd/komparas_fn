import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductByMultpleIdsInQueryParams } from '../../api/product';
import { useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

interface Props {
  open: boolean;
  onClose: () => void;
  comparisonData: any;
}

const ProductComparisonTable: React.FC<Props> = ({ onClose }) => {
  const id1 = localStorage.getItem('selectedProductId') as string;
  const id2 = localStorage.getItem('selectedProductId2') as string;
  const { productId }: any = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [expandedSpecs, setExpandedSpecs] = useState<{ [key: string]: boolean }>({});
  const [fresh, setFresh] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [columnWidths, setColumnWidths] = useState<number[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Collect all unique specification keys across all products
  const allSpecKeys = React.useMemo(() => {
    const keys = new Set<string>();
    products.forEach(product => {
      product.product_specifications?.forEach((spec: any) => {
        keys.add(spec.key);
      });
    });
    return Array.from(keys);
  }, [products]);

  useEffect(() => {
    const ids = [id1, id2, productId].filter((id) => id !== null && id !== undefined);

    if (ids.length === 0) return;

    const fetchData = async () => {
      try {
        const response = await getProductByMultpleIdsInQueryParams(ids);
        if (response && response.data && response.data.product) {
          setProducts(response.data.product);

          // Initialize expanded state for all specs
          const initialExpandedState: { [key: string]: boolean } = {};
          const allKeys = new Set<string>();

          response.data.product.forEach((product: any) => {
            product.product_specifications?.forEach((spec: any) => {
              allKeys.add(spec.key);
            });
          });

          Array.from(allKeys).forEach(key => {
            initialExpandedState[key] = true;
          });

          setExpandedSpecs(initialExpandedState);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [id1, id2, productId, fresh]);

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      if (top > 200) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate column widths from main table
  useEffect(() => {
    if (tableRef.current && products.length > 0) {
      const table = tableRef.current.querySelector('table');
      if (table) {
        const firstRow = table.querySelector('thead tr');
        if (firstRow) {
          const cells = firstRow.querySelectorAll('th');
          const widths = Array.from(cells).map(cell => cell.getBoundingClientRect().width);
          setColumnWidths(widths);
        }
      }
    }
  }, [products]);

  const handleRefresh = () => {
    setFresh(!fresh);
  };

  const removeProduct = (productIdToRemove: string) => {
    if (id1 === productIdToRemove) localStorage.removeItem('selectedProductId');
    if (id2 === productIdToRemove) localStorage.removeItem('selectedProductId2');
    localStorage.removeItem('selectedProductImage');
    localStorage.removeItem('selectedProductImage2');
    handleRefresh();
  };

  const toggleSpecVisibility = (key: string) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetAllComparison = () => {
    localStorage.removeItem('selectedProductId');
    localStorage.removeItem('selectedProductId2');
    localStorage.removeItem('compareProductIds');
    localStorage.removeItem('selectedProductImage');
    localStorage.removeItem('selectedProductImage2');
    onClose();
    navigate(-1);
  };

  // Helper function to format spec keys
  const formatSpecKey = (key: string) => {
    return key.replace(/\//g, ' / ');
  };

  // Helper function to get specification value for a product
  const getSpecValue = (product: any, specKey: string) => {
    const spec = product.product_specifications?.find((s: any) => s.key === specKey);
    return spec ? spec.value : '-';
  };

  // Get the lowest price from vendor_prices
  const getLowestPrice = (product: any) => {
    if (!product.vendor_prices || product.vendor_prices.length === 0) return 'N/A';

    const lowestPrice = product.vendor_prices.reduce(
      (prev: any, current: any) => (prev.price < current.price) ? prev : current
    ).price;

    return `${lowestPrice.toLocaleString('en-US', { maximumFractionDigits: 4 })} Rwf`;
  };

  return (
    <div className="bg-black bg-opacity-50 w-full min-h-screen">
      <div className="bg-white w-full p-4 relative rounded-md shadow-lg overflow-x-auto">
        <button
          onClick={resetAllComparison}
          className="absolute top-4 right-4 text-red-500"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Gereranya</h2>

        {/* Sticky header when scrolling */}
        <div className={`fixed top-0 left-0 w-full bg-red-50 shadow-md py-2 z-50 transform transition-transform duration-300 ${fixed ? 'translate-y-0' : '-translate-y-full'}`}>
          <div style={{ maxWidth: tableRef.current?.scrollWidth || '100%', margin: '0 auto', overflowX: 'auto' }}>
            <div className="flex items-center justify-between px-4 mb-2">
              <h3 className="font-bold">Comparing {products.length} products</h3>
              <button
                onClick={resetAllComparison}
                className="bg-black text-yellow-500 px-4 py-1 rounded-md text-sm"
              >
                Reset Comparison
              </button>
            </div>

            {/* Feature row in sticky header with matched column widths */}
            <table className="border-collapse" style={{ width: tableRef.current?.querySelector('table')?.offsetWidth || '100%' }}>
              <thead>
                <tr className="bg-white">
                  <th className="border p-2 text-left" style={{ width: columnWidths[0] || '20%' }}>Feature</th>
                  {products.map((product, index) => (
                    <th
                      key={product._id}
                      className="border p-2 text-center"
                      style={{ width: columnWidths[index + 1] || `${80/products.length}%` }}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={product.product_image}
                          alt={product.product_name}
                          className="w-10 h-10 object-contain mb-1"
                        />
                        <h3 className="font-semibold text-sm truncate md:max-w-full" style={{ maxWidth: '90%' }}>
                          {product.product_name.length > 10 ? `${product.product_name.substring(0, 10)}...` : product.product_name}
                        </h3>
                        <span className="font-bold text-green-600">{getLowestPrice(product)}</span>
                        <Link
                          to={`/product/${product._id}`}
                          className="bg-black text-yellow-500 py-1 px-2 rounded-md inline-block hover:bg-gray-800 mt-1"
                        >
                          Yirebe
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        </div>

        {/* Main comparison table */}
        <div className="overflow-x-auto" ref={tableRef}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left w-1/5">Feature</th>
                {products.map((product) => (
                  <th key={product._id} className="border p-3 text-center relative">
                    <div className="flex flex-col items-center">
                      <img
                        src={product.product_image}
                        alt={product.product_name}
                        className="w-24 h-24 object-contain mb-2"
                      />
                      <h3 className="font-semibold">{product.product_name}</h3>
                      {product._id !== productId && (
                        <button
                          onClick={() => removeProduct(product._id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                          <FaTimes size={16} />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Price row */}
              <tr className="bg-green-50">
                <td className="border p-3 font-medium">Price</td>
                {products.map((product) => (
                  <td key={product._id} className="border p-3 text-center font-bold text-green-600">
                    {getLowestPrice(product)}
                  </td>
                ))}
              </tr>

              {/* Action buttons row */}
              <tr>
                <td className="border p-3 font-medium">Actions</td>
                {products.map((product) => (
                  <td key={product._id} className="border p-3 text-center">
                    <Link
                      to={`/product/${product._id}`}
                      className="bg-black text-yellow-500 py-2 px-4 rounded-md inline-block hover:bg-gray-800"
                    >
                      Yirebe
                    </Link>
                  </td>
                ))}
              </tr>

              {/* Specifications rows */}
              {allSpecKeys.map((specKey) => (
                <tr key={specKey} className={expandedSpecs[specKey] ? "bg-gray-50" : ""}>
                  <td
                    className="border p-3 font-medium cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleSpecVisibility(specKey)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{formatSpecKey(specKey)}</span>
                      {/* {expandedSpecs[specKey] ? <FaAngleUp /> : <FaAngleDown />} */}
                    </div>
                  </td>

                  {products.map((product) => (
                    <td
                      key={`${product._id}-${specKey}`}
                      className={`border p-3 text-center ${expandedSpecs[specKey] ? "" : "hidden"}`}
                    >
                      <span className="text-green-600">
                        {getSpecValue(product, specKey)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fixed footer buttons */}
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 flex justify-between items-center z-40">
          <div className="max-w-7xl mx-auto w-full flex justify-between px-4">
            <button
              onClick={resetAllComparison}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
            >
              Siba
            </button>
            <button
              onClick={() => {
                onClose();
                navigate(-1);
              }}
              className="text-red-500 px-6 py-2 rounded-md border border-red-500 hover:bg-red-50"
            >
              Funga
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparisonTable;
