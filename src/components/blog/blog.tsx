import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LeaveAReply from './LeaveAReply';
import { BiSolidUser } from 'react-icons/bi';
import Footer from '../Footer';
import HighlightPostCard from './HighlightPostCard';
import MobileHomeNav from '../home/HomeMobileNav';
import HomeNav from '../home/HomeNav';
import SubNav from '../Navigations/SubNav';
import Categories from './Categories';
import { Linkedin, LucideFacebook, Twitter } from 'lucide-react';
import { FaGooglePlusG, FaPinterest, FaEnvelope } from 'react-icons/fa';
import Archive from './Archive';

// Define the type for a blog
interface Blog {
  _id: string;
  title: string;
  content: string;
  blogImage: string;
  date: string;
  contentPhotos: string[];
  comments: Comment[];
}

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  blogImage: string;
  date: string;
  language: string;
  // Add other fields as necessary
}

// Define the type for a comment
interface Comment {
  name: string;
  comment: string;
  date: string;
}

const baseURL = import.meta.env.VITE_BASE_URL;

const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  console.log('Blog ID:', blogId);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${baseURL}/blogs/${blogId}`);
        setBlog(response.data);
        const responses = await axios.get(`${baseURL}/blogs`);
        setBlogs(responses.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
     
    fetchBlog();
  }, [blogId]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  function fetchComments(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="relative">
      <SubNav />
      <HomeNav />
      <MobileHomeNav />

      <div className="relative h-[18rem] md:h-[20rem] lg:h-[22rem] w-full">
        <img src={blog.blogImage} className="size-full object-cover" alt="" />
        <div className="absolute top-0 size-full bg-black/20 z-10" />
        <div className="px-[5%] md:px-[10%] pb-6 md:pb-12 absolute bottom-0 mb-auto z-20">
          <div className="flex items-center gap-3 mb-3">
            <p className="font-medium text-gray-100">{new Date(blog.date).toLocaleDateString()}</p>
          </div>
          <a href="#" className="text-white font-bold text-2xl md:text-3xl hover:underline">
            {blog.title}
          </a>
        </div>
      </div>
      <div className="px-[4%] md:px-[8%] xl:px-[10%] mt-12 gap-12 flex flex-col lg:flex-row">
        <div className="flex flex-col gap-12">
          <div className="flex gap-6 md:gap-12">
            <div className="flex flex-col h-fit gap-3 items-center col-span-1 sticky top-10">
            <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <LucideFacebook
                  size={20}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <Twitter size={20} className=" fill-gray-300 text-gray-300" />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <FaGooglePlusG
                  size={25}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <FaPinterest
                  size={22}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <Linkedin size={20} className=" fill-gray-300 text-gray-300" />
              </div>
              <div className="size-12 rounded-full flex items-center justify-center border border-gray-200 bg-gray-100/60">
                <FaEnvelope
                  size={20}
                  className=" fill-gray-300 text-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 text-[.95rem] text-gray-600">
              <h2 className="font-bold text-xl md:text-2xl">{blog.title}</h2>
              <p>{blog.content}</p>
              {blog.contentPhotos.map((photo, index) => (
                <figure key={index} className="bg-green-300 md:h-[22rem] lg:h-[20rem]">
                  <img src={photo} className="size-full" alt="" />
                </figure>
              ))}
            </div>
          </div>
          <div className="h-[10rem] bg-gray-100 border border-gray-200" />
          <div className="flex flex-col gap-10 text-gray-700">
            <div className="flex gap-8">
              <div>
                <div className="size-[8rem] overflow-hidden rounded-full flex items-center justify-center bg-gray-200">
                  <BiSolidUser className="size-full mt-5 text-gray-400" />
                </div>
              </div>
              <div className="flex gap-4 w-fit flex-col">
                <h3 className="text-2xl font-bold">Office of Komprass</h3>
                <p className="text-[.9rem]">
                  Written by Komprass on {new Date(blog.date).toLocaleDateString()} at {new Date(blog.date).toLocaleTimeString()}
                </p>
                <div className="flex h-fit gap-3 items-center col-span-1 sticky top-0">
                  {/* Social media icons */}
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <LucideFacebook
                      size={20}
                      className=" fill-white text-white"
                    />
                  </div>
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <Twitter size={20} className=" fill-white text-white" />
                  </div>
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <FaGooglePlusG
                      size={25}
                      className=" fill-white text-white"
                    />
                  </div>
                  <div className="size-11  flex items-center justify-center border border-gray-200 bg-slate-400 rounded-sm">
                    <FaEnvelope size={20} className=" fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="text-2xl font-bold mb-6">{blog.comments.length} Comments</h3>
              <div className="flex flex-col gap-6 *:border-t *:first:border-t-0 *:border-gray-200">
                {blog.comments.map((comment, index) => (
                  <div key={index} className="flex gap-4 md:gap-8 py-3">
                    <div>
                      <div className="size-[4rem] md:size-[5rem] overflow-hidden rounded-full flex items-center justify-center bg-gray-200">
                        <BiSolidUser className="size-full mt-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex gap-2 w-fit flex-col">
                      <h3 className="text-lg font-semibold">{comment.name}</h3>
                      <div className="flex gap-5">
                        <p className="text-slate-400">{new Date(comment.date).toLocaleDateString()} at {new Date(comment.date).toLocaleTimeString()}</p>
                        <p className="text-slate-400 hover:text-gray-600 font-semibold">Reply</p>
                      </div>
                      <p className="text-[.9rem]">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {blogId && <LeaveAReply blogId={blogId} onCommentAdded={fetchComments} />}

          </div>
        </div>
        <div className="flex flex-col gap-16 lg:w-1/3">
          <div className="w-[19rem] h-[16rem] mx-auto border border-gray-200" />
          <div className="">
           
            <div className="grid grid-cols-1 gap-8">
              {/* Render featured posts */}
              <div className="">
            <h2 className="text-3xl mb-12 font-bold">Featured Posts</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {blogs.slice(0, 2).map((post) => (
                <HighlightPostCard key={post._id} post={post} className="!h-[15rem]" />
              ))}
            </div>
          </div>
            </div>
          </div>
          <Categories />
          <Archive />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
