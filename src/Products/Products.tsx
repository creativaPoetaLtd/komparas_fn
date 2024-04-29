import { Faders } from '@phosphor-icons/react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { getAllProductsWithCategoryNames } from '../api/product';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
interface Product {
  n_shops: number;
  id: number;
  name: string;
  category: string;
  image: string;
}

const Products: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [categoryPages, setCategoryPages] = useState<{ [key: string]: number }>({});
    const [mockProducts, setMockProducts] = useState<Product[]>([]);
    const productsPerPage = 6;

    React.useEffect(() => {
        const fetchProducts = async () => {
            const data:any = await getAllProductsWithCategoryNames();
            setMockProducts(data);
        };
        fetchProducts();
    }, []);    
    const filteredProducts = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const categories = Array.from(new Set(filteredProducts.map((product) => product.category)));
  
    const paginate = (array: Product[], category: string) => {
      const startIndex = (categoryPages[category] || 1) * productsPerPage - productsPerPage;
      return array.slice(startIndex, startIndex + productsPerPage);
    };
  
    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category === selectedCategory ? null : category);
      setModalIsOpen(false);
    };
  
    const handleOpenModal = () => {
      setModalIsOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalIsOpen(false);
    };
  
    const handleClearFilters = () => {
      setSelectedCategory(null);
      setModalIsOpen(false);
    };
  
    const shouldDisplayPagination = (category: string) => {
      const categoryProducts = filteredProducts.filter(
        (product) => product.category === category && (selectedCategory ? product.category === selectedCategory : true)
      );
      return categoryProducts.length > productsPerPage;
    };
  
    const handlePreviousPage = (category: string) => {
      setCategoryPages((prev) => ({ ...prev, [category]: Math.max(1, (prev[category] || 1) - 1) }));
    };
  
    const handleNextPage = (category: string, totalPages: number) => {
      setCategoryPages((prev) => ({
        ...prev,
        [category]: Math.min((prev[category] || 1) + 1, totalPages),
      }));
    };
  
    return (
      <><div className="min-h-screen w-full bg-gray-100">
        <div className="max-w-screen-xl mx-auto p-8">
          <div className="mb-4 mt-16">
            <input
              type="text"
              placeholder="Search products..."
              className="w-1/2 justify-end float-right p-2 border border-gray-300 rounded-md mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-4">Filter by Category</h2>
            <div className="flex space-x-4 items-center rounded-md w-fit">
              <div className="flex space-x-1 px-1 py-1 items-center bg-blue-500">
                <Faders size={16} color='white' />
                <button
                  className={` ${selectedCategory ? ' text-white' : 'bg-blue-500 text-white'}`}
                  onClick={handleOpenModal}
                >
                  {selectedCategory ? selectedCategory : 'Filter'}
                </button>
              </div>
              {selectedCategory && (
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-4">
              Selected Category: {selectedCategory || 'Default'}
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-red-500 justify-center mt-44  w-full items-center font-bold">
              No products found for the search term.
            </div>
          ) : (
            categories.map((category) => {
              const totalPages = Math.ceil(
                filteredProducts.filter(
                  (product) => product.category === category &&
                    (selectedCategory ? product.category === selectedCategory : true)
                ).length / productsPerPage
              );

              return (
                <div key={category} className="mb-8">
                  <h2 className="text-lg font-bold text-blue-700 mb-4">{category}</h2>
                  <div className="grid grid-cols-6 gap-6">
                    {paginate(
                      filteredProducts
                        .filter((product) => product.category === category)
                        .filter((product) => selectedCategory ? product.category === selectedCategory : true
                        ),
                      category
                    ).map((product) => (
                      <Link to={`/product/${product?.id}`} key={product.id} className="bg-white hover:bg-blue-200 p-4 rounded-md shadow-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-56 object-cover mb-4 rounded-md" />
                        <h3 className="text-xs font-semibold mb-2">{product?.name}</h3>
                        <p className="text-gray-600">Located in {product?.n_shops} {product?.n_shops > 1 ? 'shops' : 'shop'}</p>
                      </Link>
                    ))}
                  </div>
                  {shouldDisplayPagination(category) && (
                    <div className="mt-4 flex justify-center">
                      <button
                        className={`px-2 py-1 mx-1 ${(categoryPages[category] || 1) === 1
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500'} text-white rounded-md`}
                        onClick={() => handlePreviousPage(category)}
                        disabled={(categoryPages[category] || 1) === 1}
                      >
                        Previous
                      </button>
                      <button
                        className={`px-2 py-1 mx-1 ${(categoryPages[category] || 1) === totalPages
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500'} text-white rounded-md`}
                        onClick={() => handleNextPage(category, totalPages)}
                        disabled={(categoryPages[category] || 1) === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            className="modal absolute top-44 left-8 bg-white p-4 rounded-md shadow-md"
            overlayClassName="overlay"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold">Filter by Category</h2>
            </div>
            <div className="flex flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-2 text-sm py-1 rounded-md m-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </Modal>
        </div>
      </div><Footer /></>
    );
  };
  
  export default Products;
  