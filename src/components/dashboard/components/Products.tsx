// Products.jsx

import { useState } from "react";
import ProductListing from "./products/ProductListing";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditPRoduct";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {addProduct ? (
        <AddProduct setIsAddProduct={setAddProduct} />
      ) : editProduct ?(
        <EditProduct setIsEditProduct={setEditProduct} />
      ) : (
        <ProductListing
          setIsAddProduct={setAddProduct}
          setIsEditProduct={setEditProduct}
        />
      )}
    </div>
  );
};

export default Products;
