import { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import BlogFormModal from './AddBlog';
import BlogEditModal from './EditBlog';
import ConfirmationModal from './yesnoModal';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  blogImage: string;
  date: string;
  language: string;
  contentPhotos?: string[];
}

const baseURL = import.meta.env.VITE_BASE_URL;

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/blogs`);
      const sortedBlogs = response.data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setBlogs(sortedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to truncate text to first 20 words
  const truncateContent = (content: string) => {
    const words = content.split(' ');
    if (words.length <= 20) return content;
    return words.slice(0, 20).join(' ') + '...';
  };

  const handleEdit = (id: string) => {
    setSelectedBlogId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBlogToDelete(id);
    setConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      setDeleteLoading(blogToDelete);
      setConfirmationModalOpen(false);
      try {
        await axios.delete(`${baseURL}/blogs/${blogToDelete}`);
        // Update the blogs list without refetching
        setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      } finally {
        setDeleteLoading(null);
        setBlogToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setConfirmationModalOpen(false);
    setBlogToDelete(null);
  };

  const handleAddNewBlog = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedBlogId(null);
  };

  const handleBlogCreated = () => {
    // Refresh the blog list after successful creation
    fetchBlogs();
  };

  const handleBlogUpdated = () => {
    // Refresh the blog list after successful update
    fetchBlogs();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button
          onClick={handleAddNewBlog}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-medium flex items-center transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg font-medium text-gray-600">No blog posts found</p>
          <p className="text-gray-500 mt-2">Create your first blog post by clicking the "Add New Blog" button.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Image</th>
                <th className="py-3 px-4 text-left font-semibold">Title</th>
                <th className="py-3 px-4 text-left font-semibold">Description</th>
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Language</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="w-16 h-16 rounded overflow-hidden">
                      {blog.blogImage ? (
                        <img
                          src={blog.blogImage}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{blog.title}</td>
                  <td className="py-3 px-4"><div className="blog-content" dangerouslySetInnerHTML={{ __html: truncateContent(blog.content) }} /></td>
                  <td className="py-3 px-4">{new Date(blog.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 capitalize">{blog.language}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm transition duration-300 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        disabled={deleteLoading === blog._id}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition duration-300 flex items-center disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {deleteLoading === blog._id ? (
                          <>
                            <ClipLoader color="#ffffff" size={12} className="mr-1" />
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this blog post? This action cannot be undone."
      />

      {/* Create Modal */}
      <BlogFormModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSuccess={handleBlogCreated}
      />

      {/* Edit Modal */}
      <BlogEditModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSuccess={handleBlogUpdated}
        blogId={selectedBlogId}
      />
    </div>
  );
};

export default Blogs;
