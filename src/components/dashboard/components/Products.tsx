// Products.jsx

import { useState } from "react";
import ProductListing from "./products/ProductListing";
import AddProduct from "./products/AddProduct";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  return (
    <div className="users flex flex-col w-full min-h-screen h-fit p-4 mt-2">
      {addProduct ? (
        <AddProduct setIsAddProduct={setAddProduct} />
      ) : (
        <ProductListing
          setIsAddProduct={setAddProduct}
        />
      )}
    </div>
  );
};

export default Products;
