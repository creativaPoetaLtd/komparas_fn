// import React from 'react';
import Badge from "../ui/Badge";
import DOMPurify from "dompurify";

export interface IPost {
  _id: string;
  title: string;  
  blogImage: string;
  date: string;
  content: string;
  language: string;
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
    <div className={`flex ${small ? 'flex-row' : 'flex-col'} gap-4 ${className} border-2 border-blue-50 rounded-lg p-2`}>
      <a
        href={`/blogs/${post._id}`}
        className={`block flex-shrink-0 ${small ? 'w-24 h-20' : 'w-78 h-60'}`}
      >
        <img
          src={post.blogImage}
          alt={post.title}
          className="w-full h-full object-cover rounded"
        />
      </a>

      <div className="flex flex-col gap-2 flex-grow">
        {!small && (
          <div className="flex items-center gap-3">
            <Badge title={post.language} />
            <p className="font-medium text-gray-600">
              {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        )}
        <a href={`/blogs/${post._id}`} className="font-bold text-lg hover:underline leading-tight">
          {post.title}
        </a>
        {small && (
          <p className="text-xs text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </p>
        )}
        {description && (
          <div
            className="text-sm text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
