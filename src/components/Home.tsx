/* eslint-disable @typescript-eslint/no-explicit-any */
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
import AdSlider from "./home/Ads";
import AdSlider2 from "./home/Ads2";
import AdSlider3 from "./home/Ads3";
import AdSlider4 from "./home/Ads4";
import AdSlider5 from "./home/Ads5";
import AdSlider6 from "./home/Ads6";

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
      <div className="xl:px-16 lg:px-16 px-0 w-full bg-white h-fit justify-between flex flex-col">
      <MobileHomeNav />
      <HomeBurner />
      <AdSlider />
      <SlidingCards />
      <AdSlider2 />
      <CategoryCards />
      <ProductOfTheDay productData={productsData} />
      <TimingProduct />
      <AdSlider3 />
      <NewProduct />
      <RadioSection />
      <AdSlider4 />
      <DifferentProduct productData={productsData} />
      <NewArrival productData={productsData} />
      <AdSlider5 />
      <ShopCards />
      <Parteners />
      <AdSlider6 />
      <Questions />
      </div>
    </div>
  ); 
};

export default Home;
