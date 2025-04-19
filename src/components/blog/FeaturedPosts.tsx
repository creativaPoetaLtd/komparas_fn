import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import axios from 'axios';

// Define the type for a blog post
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  blogImage: string;
  language: string;
  date: string;
}


const baseURL = import.meta.env.VITE_BASE_URL;
const FeaturedPosts = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseURL}/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="px-[8%] xl:px-[10%]">
      <h2 className="mb-12 text-3xl font-bold text-center">Featured Posts</h2>
      <div className="grid grid-cols-3 gap-8">
        {blogs.slice(0, 3).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
