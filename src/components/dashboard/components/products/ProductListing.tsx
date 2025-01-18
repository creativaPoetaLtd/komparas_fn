import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../api/product";
import { deleteProduct } from "../../../../api/product";
import { FaEdit, FaTrashAlt, FaImage } from "react-icons/fa";
interface AddProductProps {
  setIsAddProduct: (isAddProduct: boolean) => void;
  setIsEditProduct: (isEditProduct: boolean) => void;
  setIsAddProductImage: (isAddProductImage: boolean) => void;
}

const ProductListing = ({
  setIsAddProduct,
  setIsEditProduct,
  setIsAddProductImage,
}: AddProductProps) => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const fetchProducts = async () => {
    setLoading(true);
    const products = await getAllProducts();
    setProducts(products?.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, [refresh]);
  const handleDeleteProduct = async (id: any) => {
    await deleteProduct(id);
    setRefresh((prev) => !prev);
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

          <tbody className="w-full mt-3">
            {products?.products?.reverse().map((product: any, index: any) => (
              <tr className="w-full mt-3 shadow-sm">
                <td className="w-[10%] text-sm font-medium py-2 px-2">
                  {index + 1}
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
                  {(product?.product_description).length > 50
                    ? (product?.product_description).substring(0, 50) + "..."
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
                      onClick={() => handleDeleteProduct(product?._id)}
                    >
                      <FaTrashAlt className="h-8 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="w-full mt-3 shadow-sm">
            <td className="text-sm font-medium py-2 flex justify-center items-center m-auto text-center  w-full px-2">
              Loading...
            </td>
          </div>
        )}
        {!loading && products?.products?.length === 0 && (
          <tr className="w-full mt-3 shadow-sm">
            <td className="text-sm font-medium py-2 flex justify-center items-center m-auto text-center w-full px-2">
              No Products
            </td>
          </tr>
        )}
      </div>
    </>
  );
};

export default ProductListing;
