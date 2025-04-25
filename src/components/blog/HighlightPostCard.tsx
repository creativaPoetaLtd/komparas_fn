// import React from 'react';
import Badge from '../ui/Badge';
import { IPost } from './PostCard';
import { ClipLoader } from "react-spinners";

const HighlightPostCard = ({
  className = '',
  post,
}: {
  className?: string;
  post?: IPost;
}) => {
  // Early return if post is undefined or null
  if (!post) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  const postId = post._id || '';
  const blogImage = post.blogImage || '';
  const title = post.title || 'Untitled';
  const date = post.date ? new Date(post.date).toLocaleDateString() : 'No date';

  return (
    <div
      className={
        'group hover:cursor-pointer relative bg-gray-200 h-64 sm:h-96 md:h-96 lg:h-80 w-full ' +
        className
      }
    >
      <div className="absolute group-hover:bg-black/10 top-0 size-full bg-black/30 z-10" />
      <a href={`/blogs/${postId}`} className="size-full block">
        <img src={blogImage} className="size-full object-cover" alt={title} />
      </a>
      <div className="p-5 absolute bottom-0 mb-auto z-20">
        <div className="flex items-center gap-3 mb-3">
        <Badge title={post.language} className="bg-orange-500" />
          <p className="font-medium text-gray-100">{date}</p>
        </div>
        <a
          href={`/blogs/${postId}`}
          className="text-white font-bold text-base md:text-xl hover:underline"
        >
          {title}
        </a>
      </div>
    </div>
  );
};

export default HighlightPostCard;