import Badge from "../ui/Badge";
import { IPost } from "./PostCard";

const HighlightPostCard = ({
  className,
  post,
}: {
  className?: string;
  post: IPost;
}) => {
  return (
    <div
      className={
        "group hover:cursor-pointer relative bg-red-200 h-[17rem] sm:h-[22rem] md:h-[30rem] lg:h-[22rem] w-full " +
        className
      }
    >
      <div className="absolute group-hover:bg-black/10 top-0 size-full bg-black/30 z-10" />
      <a href="blogs/xyz" className=" size-full block bg-red-100">
        <img src={post.photo} className="size-full" alt="" />
      </a>
      <div className="p-5 absolute bottom-0  mb-auto z-20">
        <div className="flex items-center gap-3 mb-3">
          <Badge title={post.language} className="bg-orange-500" />
          <p className="font-medium text-gray-100">March 27, 2018</p>
        </div>
        <a
          href="blogs/xyz"
          className={`text-white font-bold text-base md:text-xl hover:underline`}
        >
          {post.title}
        </a>
      </div>
    </div>
  );
};

export default HighlightPostCard;
