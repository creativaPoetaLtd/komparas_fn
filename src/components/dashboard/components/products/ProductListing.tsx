import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getAllProducts } from "../../../../api/product";
import { deleteProduct } from "../../../../api/product";
import { FaEdit, FaTrashAlt, FaImage, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ConfirmModal from "../../../models/ConfirmModal";

interface AddProductProps {
  setIsAddProduct: (isAddProduct: boolean) => void;
  setIsEditProduct: (isEditProduct: boolean) => void;
  setIsAddProductImage: (isAddProductImage: boolean) => void;
}

const ProductListingSkeleton = () => {
  return (
    <tbody className="w-full mt-3">
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="w-full mt-3 shadow-sm">
          <td className="w-[10%] text-sm font-medium py-2 px-2">
            <Skeleton width={30} />
          </td>
          <td className="w-[10%] text-sm font-medium py-2 px-2">
            <Skeleton width={50} height={50} circle />
          </td>
          <td className="w-[20%] text-sm font-medium py-2 px-2">
            <Skeleton width={100} />
          </td>
          <td className="w-[20%] text-sm font-medium py-2 px-2">
            <Skeleton width={150} />
          </td>
          <td className="w-[20%] text-sm font-medium py-2 px-2">
            <Skeleton width={100} />
          </td>
          <td className="w-[20%] text-sm font-medium py-2 px-2">
            <Skeleton width={50} />
          </td>
          <td className="w-[10%] text-sm font-medium py-2 px-2">
            <div className="flex flex-row justify-between items-center gap-2">
              <Skeleton width={30} height={30} />
              <Skeleton width={30} height={30} />
              <Skeleton width={30} height={30} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const ProductListing = ({
  setIsAddProduct,
  setIsEditProduct,
  setIsAddProductImage,
}: AddProductProps) => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [cardsPerPage] = useState(20);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        undefined, 
        currentPage, 
        cardsPerPage
      );

      const { 
        products: fetchedProducts, 
        currentPage: page, 
        totalPages: pages, 
      } = response?.data || {};

      setProducts(fetchedProducts);
      setCurrentPage(page);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh, currentPage]);

  const handleDeleteProduct = async (id: any) => {
    await deleteProduct(id);
    setRefresh((prev) => !prev);
  };

  const handleDeleteClick = (id: string) => {
    setCurrentProductId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (currentProductId) {
      handleDeleteProduct(currentProductId);
      setModalOpen(false);
    }
  };

  const handleEdit = async (id: any) => {
    setIsAddProduct(false);
    setIsEditProduct(true);
    localStorage.setItem("editProductID", id);
  };

  const handleAddProductImage = async (id: any) => {
    setIsAddProduct(false);
    setIsEditProduct(false);
    setIsAddProductImage(true);
    localStorage.setItem("editProductID", id);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="users flex flex-col w-fit rounded-md shadow p-1 px-2">
          <div className="users__day text-sm font-bold">Total Products</div>
          <div className="users__users text-sm font-medium text-blue-700 flex justify-center items-center text-center">
            1000
          </div>
        </div>
        <div className="users__list flex rounded-md space-x-3">
          <button className="shadow px-6">Export</button>
          <button className="shadow px-6 ">Print</button>
          <button className="shadow px-6" onClick={() => setIsAddProduct(true)}>
            Ongeramo telefoni
          </button>
        </div>
      </div>
      <div className="users__table flex flex-col w-full rounded-md py-2 mt-2">
        <table className="w-full rounded-md">
          <thead className="w-full bg-slate-200 rounded-md">
            <tr className="w-full shadow-sm rounded-md">
              <th className="w-[10%] text-sm font-bold text-start py-3 px-2">
                No
              </th>
              <th className="w-[10%] text-sm font-bold text-start py-3 px-2">
                Ifoto
              </th>
              <th className="w-[20%] text-sm font-bold text-start py-3 px-2">
                Name
              </th>
              <th className="w-[20%] text-sm font-bold text-start py-3 px-2">
                Amakuru
              </th>
              <th className="w-[20%] text-sm font-bold text-start py-3 px-2">
                Ubwoko
              </th>
              <th className="w-[20%] text-sm font-bold text-start py-3 px-2">
                Igiciro
              </th>
              <th className="w-[10%] text-sm font-bold text-start py-3 px-2">
                Igikorwa
              </th>
            </tr>
          </thead>

          {loading ? (
            <ProductListingSkeleton />
          ) : (
            <tbody className="w-full mt-3">
              {products?.map((product: any, index: any) => (
                <tr key={product?._id} className="w-full mt-3 shadow-sm">
                  <td className="w-[10%] text-sm font-medium py-2 px-2">
                    {(currentPage - 1) * cardsPerPage + index + 1}
                  </td>
                  <td className="w-[10%] text-sm font-medium py-2 px-2">
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-400">
                      <img
                        src={
                          product?.product_image
                            ? product?.product_image
                            : "https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                        }
                        alt="product"
                        className="w-full h-full rounded-sm object-cover"
                      />
                    </div>
                  </td>
                  <td className="w-[20%] text-sm font-medium py-2 px-2">
                    {product?.product_name}
                  </td>
                  <td className="w-[20%] text-sm font-medium py-2 px-2">
                    {(product?.product_description || '').length > 50
                      ? (product?.product_description || '').substring(0, 50) + "..."
                      : product?.product_description}
                  </td>
                  <td className="w-[20%] text-sm font-medium py-2 px-2">
                    {product?.product_category}
                  </td>
                  <td className="w-[20%] text-sm font-medium py-2 px-2">
                    {product?.vendor_prices?.length > 0
                      ? product?.vendor_prices[0]?.price
                      : "-"}
                  </td>
                  <td className="w-[10%] text-sm font-medium py-2 px-2">
                    <div className="flex flex-row justify-between items-center gap-2">
                      <button
                        className="shadow px-2"
                        onClick={() => handleAddProductImage(product?._id)}
                      >
                        <FaImage className="h-8 w-4 text-yellow-500" />
                      </button>
                      <button
                        className="shadow px-2"
                        onClick={() => handleEdit(product?._id)}
                      >
                        <FaEdit className="h-8 w-4 text-blue-500" />
                      </button>
                      <button
                        className="shadow px-2"
                        onClick={() => handleDeleteClick(product?._id)}
                      >
                        <FaTrashAlt className="h-8 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          {!loading && products?.length === 0 && (
            <tbody>
              <tr className="w-full mt-3 shadow-sm">
                <td colSpan={7} className="text-sm font-medium py-2 text-center w-full px-2">
                  No Products
                </td>
              </tr>
            </tbody>
          )}

          <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="flex justify-between items-center mt-4 px-4">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handlePreviousPage} 
                      disabled={currentPage === 1}
                      className={`flex items-center px-4 py-2 border rounded ${
                        currentPage === 1 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      <FaChevronLeft className="mr-2" /> Previous
                    </button>
                    <button 
                      onClick={handleNextPage} 
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-4 py-2 border rounded ${
                        currentPage === totalPages 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      Next <FaChevronRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
    </>
  );
};

export default ProductListing;