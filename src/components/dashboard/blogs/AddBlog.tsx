import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BlogForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [contentPhotos, setContentPhotos] = useState<File[]>([]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (blogImage) {
      formData.append('blogImage', blogImage);
    }
    contentPhotos.forEach((photo) => {
      formData.append('contentPhotos', photo);
    });

    try {
      if (blogId) {
        await axios.put(`http://localhost:3000/api/blogs/${blogId}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/blogs', formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blogId ? 'Edit Blog' : 'Create Blog'}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Main Image</label>
          <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setBlogImage(e.target.files[0]);
              }
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content Photos</label>
          <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              if (e.target.files) {
                setContentPhotos([...contentPhotos, ...Array.from(e.target.files)]);
              }
            }}
            multiple
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {blogId ? 'Update Blog' : 'Create Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
