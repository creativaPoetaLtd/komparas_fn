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

const Home = () => {
  
  return (
    <div className='w-full bg-white h-fit justify-between flex flex-col'>
      <HomeNav />
      <MobileHomeNav />
      <HomeBurner />
      <SlidingCards />
      <ProductOfTheDay />
      <ShopCards />
      <TimingProduct />
      <CategoryCards />
      <NewProduct />
      <RadioSection />
      <DifferentProduct />
      <NewArrival />
      <Parteners />
      <Questions />
    </div>
  );
};

export default Home;
