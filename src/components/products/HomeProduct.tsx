import React, { useEffect, useState } from 'react';
import ProdCategories from './ProdCategories';
import { getAllProducts, getPoductByCategory } from '../../api/product';
import { Link } from 'react-router-dom';
interface IProduct {
  _id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  product_stars: number;
  product_reviews: number;
  product_category: string;
  product_store: string;
  product_link: string;
  product_description: string;
}

const HomeProduct: React.FC<IProduct> = () => {
  const [products, setProducts] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 15;

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = (category: string) => {
    if (category === 'all') {
      getAllProducts().then((res) => {
        setProducts(res.data.products);
      });
    } else {
      getPoductByCategory(category).then((res) => {
        setProducts(res.data.products);
      });
    }
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='w-full px-3 h-fit flex flex-col'>
      <ProdCategories onCategoryChange={handleCategoryChange} />

      {currentProducts?.length === 0 && (
          <div className='w-full h-full flex justify-center m-auto items-center mt-12 '>
            <p className='text-2xl font-bold flex justify-center w-full items-center text-center m-auto'>No products found on that category</p>
          </div>
        )}
      <div className='productCard grid desktop:grid-cols-5 laptop:grid-cols-5 tablet:grid-cols-3 grid-cols-2 gap-6 mt-7 mb-7' >
        {currentProducts.map((product: IProduct, index: number) => (
          <Link to={`product/${product._id}`} className='productCard1 min-h-[20rem] h-fit   w-full flex flex-col' key={index}>
            <div className='productCard1Img h-[10rem] bg-white w-full'>
              <img src={product?.product_image} alt='product' className='w-full h-full object-cover' />
            </div>
            <div className='productCard1Text  p-2 h-[7rem] bg-gray-400  w-full flex flex-col justify-start text-start items-start'>
              <p className='productStarsRevew text-center text-xs text-yellow-300'>product Stars</p>
              <p className='text-stert'>{product?.product_name?.length > 40 ? product?.product_name?.substring(0, 40) +'...': product?.product_name?.substring(0, 40) }</p>
              <p className='text-start'>From <span className='font-bold'>${product.product_price}</span> in  <span className='font-bold'>5</span> stores</p>
            </div>
          </Link>
        ))}
      </div>
      <div className='pagination flex m-auto justify-center items-center text-center space-x-12 mb-5'>
        {Array.from({ length: Math.ceil(products?.length / productsPerPage) }, (_, i) => (
          <button  key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active bg-blue-700 px-3 py-1 text-white font-bold' : 'bg-blue-500 px-3 py-1 text-white font-thin' }>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeProduct;
