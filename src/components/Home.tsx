import HomeBurner from "./home/HomeBurner";
import HomeNav from "./home/HomeNav";
import ProductOfTheDay from "./home/ProductOfTheDay";
import SlidingCards from "./home/SlidingCards";
import TimingProduct from "./home/TimingProduct";
import ShopCards from "./home/ShopCards";
import CategoryCards from "./home/CategoryCards";
import NewProduct from "./home/NewProduct";
import RadioSection from "./home/Radio";
import DifferentProduct from "./home/DifferentProduct";
import NewArrival from "./home/NewArrival";
import Parteners from "./home/Parteners";
import Questions from "./home/Questions";
import MobileHomeNav from "./home/HomeMobileNav";
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/product";

const Home = () => {
  const [searchValue, ] = useState("");
  // const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      const allProducts = response?.data?.products;
      // const productNames = allProducts.map((product: any) => product.product_name);
      // setAutocompleteOptions(productNames);
      const filteredProducts = allProducts.filter((product: any) =>
        product.product_name.toLowerCase().includes(searchValue.toLowerCase())
      ).map((product: any) => ({
        ...product,
      }));
      setProductsData(filteredProducts);
    };
    fetchProducts();
  }, [searchValue]);

  return (
    <div className='w-full bg-white h-fit justify-between flex flex-col'>
      <HomeNav />
      <MobileHomeNav />
      <HomeBurner />
      <SlidingCards />
      <ProductOfTheDay productData={productsData} />
      <ShopCards />
      <TimingProduct />
      <CategoryCards />
      <NewProduct />
      <RadioSection />
      <DifferentProduct productData={productsData} />
      <NewArrival productData={productsData} />
      <Parteners />
      <Questions />
    </div>
  );
};

export default Home;
