// Products.jsx

import { useState } from "react";
import ProductListing from "./products/ProductListing";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditPRoduct";
import AddProductImage from "./products/AddProductImage";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [isAddProductImage, setIsAddProductImage] = useState(false)
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {addProduct ? (
        <AddProduct setIsAddProduct={setAddProduct} />
      ) : editProduct ?(
        <EditProduct setIsEditProduct={setEditProduct} />
      )  : isAddProductImage ?(
        <AddProductImage setIsAddProductImage={setIsAddProductImage} />
      ) : (
        <ProductListing
          setIsAddProduct={setAddProduct}
          setIsEditProduct={setEditProduct}
          setIsAddProductImage={setIsAddProductImage}
        />
      )}
    </div>
  );
};

export default Products;
