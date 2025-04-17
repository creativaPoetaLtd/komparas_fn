import Badge from "../ui/Badge";

export interface IPost {
  title: string;
  language: string;
  photo: string;
  date: string;
}

const PostCard = ({
  post,
  small = false,
  description = false,
  className,
}: {
  post: IPost;
  small?: boolean;
  description?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`${small ? "flex-row" : "flex-col"} gap-5 flex ${className}`}
    >
      <a
        href="blogs/xyz"
        className={`${
          small ? "min-h-[5rem] w-2/7 " : "h-[14rem] min-w-[9rem] flex-3/7"
        }  block `}
      >
        <img src={post.photo} className="size-full object-cover" alt="" />
      </a>
      <div
        className={`${
          small ? "" : ""
        } bottom-0 z-20 flex flex-col gap-3 flex-4/7`}
      >
        {!small && (
          <div className="flex items-center gap-3">
            <Badge title={post.language} />
            <p className="font-medium text-gray-600">March 27, 2018</p>
          </div>
        )}
        <a href="blogs/xyz" className=" font-bold text-lg hover:underline leading-5">
          {post.title}
        </a>
        {description && (
          <p className="text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam...
          </p>
        )}
      </div>
    </div>
  );
};

export default PostCard;
