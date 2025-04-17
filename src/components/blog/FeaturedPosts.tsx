import data from "../../lib/data.json";
import PostCard from "./PostCard";

const FeaturedPosts = () => {
  return (
    <div className=" px-[8%] xl:px-[10%]">
      <h2 className="mb-12 text-3xl font-bold text-center">Featured Posts</h2>
      <div className="grid grid-cols-3 gap-8 ">
        {data.slice(0,3).map((post) => (
          <PostCard  post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
