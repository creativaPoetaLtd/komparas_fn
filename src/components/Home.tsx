import HomeBurner from "./home/HomeBurner";
import HomeNav from "./home/HomeNav";
import ProductOfTheDay from "./home/ProductOfTheDay";
import SlidingCards from "./home/SlidingCards";

const Home = () => {
  
  return (
    <div className='w-full bg-white h-full flex flex-col'>
      <HomeNav />
      <HomeBurner />
      <SlidingCards />
      <ProductOfTheDay />
    </div>
  );
};

export default Home;
