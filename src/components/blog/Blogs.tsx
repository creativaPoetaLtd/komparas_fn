import { useEffect, useState } from 'react';
import HighlightPostCard from './HighlightPostCard';
import PostCard from './PostCard';
import Categories from './Categories';
import Archive from './Archive';
import HomeNav from '../home/HomeNav';
import Footer from '../Footer';
import MobileHomeNav from '../home/HomeMobileNav';
import SubNav from '../Navigations/SubNav';
import axios from 'axios';

// Define the type for a blog post
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  blogImage: string;
  date: string;
  language: string;
  // Add other fields as necessary
}


const baseURL = import.meta.env.VITE_BASE_URL;

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  console.log("igor")

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
    <div className="flex flex-col">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />

      {/* <div className="flex flex-col pt-12 px-[8%] xl:px-[10%]">
        <div className="flex flex-col lg:flex-row gap-8">
          {blogs.slice(0, 2).map((post) => (
            <HighlightPostCard key={post._id} className="" post={post} />
          ))}
        </div>
      </div> */}
      {/* <div className="flex flex-col gap-10 py-12 px-[8%] xl:px-[10%]">
        <h2 className="text-3xl font-bold">Recent Posts</h2>
        <div className="grid grid-rows-[auto] lg:grid-rows-2 grid-cols-1 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <PostCard key={post._id} className="h-fit" post={post} />
          ))}
        </div>
      </div> */}
      <div className="grid grid-rows-[auto_auto_auto] lg:grid-rows-[auto_1fr_auto] grid-cols-3 px-[8%] xl:px-[10%] gap-10 h-fit mt-4">
        <div className="flex flex-col col-start-1 row-start-1 lg:row-span-2 gap-10 col-span-3 lg:col-span-2">
        {/* <HighlightPostCard post={blogs[n-1]} className="hidden md:block md:h-[30rem]" /> */}
        <HighlightPostCard post={blogs[blogs.length - 1]} className="hidden md:block md:h-[30rem]" />
          <div className="grid grid-rows-2 md:grid-cols-2 gap-8">
            {blogs.map((post) => (
              <PostCard key={post._id}  post={post} />
            ))}
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1 lg:col-start-3 flex row-start-3 lg:row-start-1 lg:row-span-2 flex-col gap-12">
          {/* Most Read */}
          <div className="">
            <h2 className="text-3xl mb-12 font-bold">Recent Posts</h2>
            <div className="grid grid-cols-1 gap-8">
              {blogs.slice(0, 4).map((post) => (
                <PostCard small key={post._id}  description className="flex-col !gap-2 sm:flex-row" post={post} />
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {/* <div className="">
            <h2 className="text-3xl mb-12 font-bold">Featured Posts</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {blogs.slice(0, 2).map((post) => (
                <HighlightPostCard key={post._id} post={post} className="!h-[15rem]" />
              ))}
            </div>
          </div> */}
          <div className="w-[19rem] h-[16rem] mx-auto border border-gray-200" />
        </div>
        {/* FEATURED POSTS */}
        <div className="row-start-2 lg:row-start-3 row-span-1 h-fit col-span-3">
          <h2 className="mb-12 text-3xl font-bold text-center">Featured Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((post) => (
              <PostCard key={post._id} className="h-fit" post={post} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 border-y my-12 py-12 border-gray-200">
        <div className="grid lg:grid-cols-3 gap-12 px-[8%] xl:px-[10%]">
          <div className="lg:col-span-2">
            <div className="">
              <h2 className="text-3xl mb-12 font-bold">Most Read</h2>
              <div className="grid grid-cols-1 gap-8">
                {blogs.slice(0, 3).map((post) => (
                  <PostCard key={post._id} description className="h-fit sm:flex-row" post={post} />
                ))}
              </div>
            </div>
            <button type="button" className="bg-gray-800 block text-white py-3 px-8 my-10 mx-auto font-medium">
              LOAD MORE
            </button>
          </div>
          <div className="flex flex-col gap-16">
            <div className="w-[19rem] h-[16rem] mx-auto border border-gray-200" />
            <Categories />
            <Archive />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
